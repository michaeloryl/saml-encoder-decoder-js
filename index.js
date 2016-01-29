var zlib = require('zlib');
var async = require('async');
// Deflate 
// 

var str = '<?xml version="1.0" encoding="UTF-8"?><samlp:AuthnRequest     xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"    ID="dghihjdeegajbpejllikgcpnkceilmnmblhaidgl"     Version="2.0"    IssueInstant="2016-01-27T19:57:05Z"    ProtocolBinding="urn:oasis:names.tc:SAML:2.0:bindings:HTTP-Redirect"    ProviderName="pennmutual.com/prodplace"    AssertionConsumerServiceURL=""/>';

console.log("ORIGINAL:\n", str);

async.waterfall([
    async.apply(zEncodeForSaml, str),
    encodeCallback,
    zDecodeForSaml,
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

function zEncodeForSaml(input, cb) {
  zlib.deflate(input, function(err, deflated) {
    if (!err) {
      console.log('\n\nDeflated:\n', deflated);
      console.log("TypeOf deflated:", typeof deflated);

      var b64 = deflated.toString('base64');

      console.log('\n\nBase64 Encoded:\n', b64);
      
      //return cb(null, encodeURIComponent(b64));
      return cb(null, encodeURIComponent(b64));
    } else {
      console.log("Error while deflating");
      return cb(err);
    }
  });
}

function zDecodeForSaml(encoded, cb) {
  //var unB64 = new Buffer(decodeURIComponent(str), 'base64').toString('utf8')
  var deflated = new Buffer(decodeURIComponent(encoded), 'base64')
  console.log('\n\nBase64 decoded:\n', deflated);

  zlib.unzip(deflated, function(err, inflated) {
    if (!err) {
      console.log('\n\nInflated:\n', inflated);
      return cb(null, inflated.toString('ascii'));
    } else {
      console.log("Error while inflating");
      return cb(err);
    }
  });
}


