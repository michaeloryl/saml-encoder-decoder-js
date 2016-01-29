var pako = require('pako');
var zlib = require('zlib');
// Deflate 
// 

var str = '<?xml version="1.0" encoding="UTF-8"?><samlp:AuthnRequest     xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"    ID="dghihjdeegajbpejllikgcpnkceilmnmblhaidgl"     Version="2.0"    IssueInstant="2016-01-27T19:57:05Z"    ProtocolBinding="urn:oasis:names.tc:SAML:2.0:bindings:HTTP-Redirect"    ProviderName="pennmutual.com/prodplace"    AssertionConsumerServiceURL=""/>';

console.log("ORIGINAL:\n", str);

var forUrl;
zEncodeForSaml(str, encodeCallback);

function encodeCallback(err, encoded) {
  if (err) {
    console.log("ERROR ON ENCODE");
    return;
  }
  console.log("\n\nENCODED:\n", encoded);
  zDecodeForSaml(encoded, decodeCallback);
}

function decodeCallback(err, decoded) {
  if (err) {
    console.log("ERROR ON DECODE");
    return;
  }
  
  console.log("\n\nDECODED:\n", decoded);
}

//console.log("MY SAML:", decodeForSaml("fZJRa9swEMff9ymE3m1LipM4InbJ0mwrNCM0bqF9Gap8cQW2lOnksH37ObFbWgZ9lLj76X/30/LqT9uQE3g0zuaUx4wSsNpVxtY5vS+/RRm9Kr4sUbWNOMpVF17sHfzuAANZIYIPfd/aWexa8HvwJ6Ph/u42py8hHFEmCV+ImM+ymMWCswRBd96Ev1GrrKrBJ2eueuXokUPJdc83VoVLqDPqA4lPmJwwxpLG1cZScnOd018HJeaLSsNkqhfAqql6nsyyVFQiEweWqnlfhrv+KXOCnB5Ug3C+wQ5uLAZlQ04F42nE5hHPSj6VKZc8jfmcP1Gy8y447Zqvxg6L6byVTqFBaVULKIOW+9X2VoqYyeehCOWPstxFq36yg9LhAjmZCvzPviOn352rGyAbG8AfvUEg+3E3ZDvshpKHVy3irKUXZVEOIj5PcBzj0mLwJi9z+veEzwFvRmgxLr++xI21axN4i5zUqJIyjTaP23SzftyK9Wwm/nO8TN6HKMbjx79U/AM="));

function zEncodeForSaml(input, cb) {
  zlib.deflate(input, function(err, deflated) {
    if (!err) {
      console.log('\n\nDeflated:\n', deflated);
      console.log("TypeOf deflated:", typeof deflated);

      var b64 = new Buffer(deflated).toString('base64');

      console.log('\n\nBase64 Encoded:\n', b64);
      
      return cb(null, encodeURIComponent(b64));
    } else {
      console.log("Error while deflating");
      return cb(err);
    }
  });
}

function zDecodeForSaml(str, cb) {
  var unB64 = new Buffer(decodeURIComponent(str), 'base64').toString('utf8')
  console.log('\n\nBase64 decoded:\n', unB64);

  zlib.unzip(unB64, function(err, inflated) {
    if (!err) {
      console.log('\n\nInflated:\n', inflated);
      return cb(null, inflated);
    } else {
      console.log("Error while inflating");
      return cb(err);
    }
  });
}

function encodeForSaml(str) {
  var input = stringToUA(str);

  var deflated = pako.deflate(input, { to: 'string' });
  
  //console.log('\n\nDeflated:\n', deflated);

  var b64 = new Buffer(deflated).toString('base64');

  //console.log('\n\nBase64 Encoded:\n', b64);
  
  return encodeURIComponent(b64);
}

function decodeForSaml(str) {
  var unB64 = new Buffer(decodeURIComponent(str), 'base64').toString('utf8')

  //console.log('\n\nBase64 decoded:\n', unB64);

  var compressed = stringToUA(unB64);
  
  var result = null;
   
  try {
    result = pako.inflate(compressed, { to: 'string' });
  } catch (err) {
    console.log(err);
  }
  
  return result;
}

function stringToUA(s) {
  var ua = new Uint8Array(s.length);
  for (var i = 0; i < s.length; i++) {
    ua[i] = s.charCodeAt(i);
  }
  return ua;
}

function ua2text(ua) {
  var s = '';
  for (var i = 0; i < ua.length; i++) {
    s += String.fromCharCode(ua[i]);
  }
  return s;
}
