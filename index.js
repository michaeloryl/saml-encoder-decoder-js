/* global Buffer */
var zlib = require('zlib');
var async = require('async');
// Deflate 
// 

var str = '<?xml version="1.0" encoding="UTF-8"?><samlp:AuthnRequest     xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"    ID="dghihjdeegajbpejllikgcpnkceilmnmblhaidgl"     Version="2.0"    IssueInstant="2016-01-27T19:57:05Z"    ProtocolBinding="urn:oasis:names.tc:SAML:2.0:bindings:HTTP-Redirect"    ProviderName="pennmutual.com/prodplace"    AssertionConsumerServiceURL=""/>';

console.log("ORIGINAL:\n", str);

async.waterfall([
    async.apply(encodeForSaml, str),
    encodeCallback,
    decodeForSaml,
    decodeCallback
], function (err, result) {
    // result now equals 'done'
});

function encodeCallback(encoded, callback) {
  console.log("\n\nENCODED:\n", encoded);
  callback(null, encoded);
}

function decodeCallback(decoded, callback) {
  console.log("\n\nDECODED:\n", decoded);
  callback(null, decoded);
}

function encodeForSaml(input, cb) {
  zlib.deflateRaw(input, function(err, deflated) {
    if (!err) {
      var b64 = deflated.toString('base64');
      return cb(null, encodeURIComponent(b64));
    } else {
      console.log("Error while deflating");
      return cb(err);
    }
  });
}

function decodeForSaml(encoded, cb) {
  var deflated = new Buffer(decodeURIComponent(encoded), 'base64');
  
  zlib.inflateRaw(deflated, function(err, inflated) {
    if (!err) {
      return cb(null, inflated.toString('ascii'));
    } else {
      console.log("Error while inflating");
      return cb(err);
    }
  });
}


