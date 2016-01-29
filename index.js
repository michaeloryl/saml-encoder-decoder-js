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

/*
var mySaml = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c2FtbHA6QXV0aG5SZXF1ZXN0IAl4bWxuczpzYW1scD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOnByb3RvY29sIglJRD0iZ29jYmlqam5wY2hkcGFpbGZjampoYWNmb2xma2NncGVwZ2htcGNkbyIgCVZlcnNpb249IjIuMCIJSXNzdWVJbnN0YW50PSIyMDE2LTAxLTI3VDE1OjU0OjI2WiIJUHJvdG9jb2xCaW5kaW5nPSJ1cm46b2FzaXM6bmFtZXMudGM6U0FNTDoyLjA6YmluZGluZ3M6SFRUUC1SZWRpcmVjdCIJUHJvdmlkZXJOYW1lPSJwZW5ubXV0dWFsLmNvbS9wcm9kcGxhY2UiCUFzc2VydGlvbkNvbnN1bWVyU2VydmljZVVSTD0iIi8%2B";

zDecodeForSaml(mySaml, function(err, decoded) {
    console.log("MySAML:", decoded);
})
*/

//console.log("MY SAML:", decodeForSaml("fZJRa9swEMff9ymE3m1LipM4InbJ0mwrNCM0bqF9Gap8cQW2lOnksH37ObFbWgZ9lLj76X/30/LqT9uQE3g0zuaUx4wSsNpVxtY5vS+/RRm9Kr4sUbWNOMpVF17sHfzuAANZIYIPfd/aWexa8HvwJ6Ph/u42py8hHFEmCV+ImM+ymMWCswRBd96Ev1GrrKrBJ2eueuXokUPJdc83VoVLqDPqA4lPmJwwxpLG1cZScnOd018HJeaLSsNkqhfAqql6nsyyVFQiEweWqnlfhrv+KXOCnB5Ug3C+wQ5uLAZlQ04F42nE5hHPSj6VKZc8jfmcP1Gy8y447Zqvxg6L6byVTqFBaVULKIOW+9X2VoqYyeehCOWPstxFq36yg9LhAjmZCvzPviOn352rGyAbG8AfvUEg+3E3ZDvshpKHVy3irKUXZVEOIj5PcBzj0mLwJi9z+veEzwFvRmgxLr++xI21axN4i5zUqJIyjTaP23SzftyK9Wwm/nO8TN6HKMbjx79U/AM="));

function zEncodeForSaml(input, cb) {
  zlib.deflate(input, function(err, deflated) {
    if (!err) {
      console.log('\n\nDeflated:\n', deflated);
      console.log("TypeOf deflated:", typeof deflated);

      var b64 = deflated.toString('base64');

      console.log('\n\nBase64 Encoded:\n', b64);
      
      //return cb(null, encodeURIComponent(b64));
      return cb(null, b64);
    } else {
      console.log("Error while deflating");
      return cb(err);
    }
  });
}

function zDecodeForSaml(encoded, cb) {
  //var unB64 = new Buffer(decodeURIComponent(str), 'base64').toString('utf8')
  var unB64 = new Buffer(encoded, 'base64')
  console.log('\n\nBase64 decoded:\n', unB64);

  zlib.unzip(unB64, function(err, inflated) {
    if (!err) {
      console.log('\n\nInflated:\n', inflated);
      return cb(null, inflated.toString('ascii'));
    } else {
      console.log("Error while inflating");
      return cb(err);
    }
  });
}


