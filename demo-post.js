/* global Buffer */
var async = require('async');
var saml = require('./');

var str = '<?xml version="1.0" encoding="UTF-8"?><samlp:AuthnRequest     xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"    ID="dghihjdeegajbpejllikgcpnkceilmnmblhaidgl"     Version="2.0"    IssueInstant="2016-01-27T19:57:05Z"    ProtocolBinding="urn:oasis:names.tc:SAML:2.0:bindings:HTTP-Redirect"    ProviderName="pennmutual.com/prodplace"    AssertionConsumerServiceURL=""/>';

console.log("ORIGINAL:\n", str);

async.waterfall([
  async.apply(saml.encodeSamlPost, str),
  encodeCallback,
  saml.decodeSamlPost,
  decodeCallback
], function (err, result) {
  console.log('\n\nFinal Result:', result);
});

function encodeCallback(encoded, callback) {
  console.log("\n\nENCODED:\n", encoded);
  callback(null, encoded);
}

function decodeCallback(decoded, callback) {
  console.log("\n\nDECODED:\n", decoded);
  callback(null, decoded);
}



