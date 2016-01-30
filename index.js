/* global Buffer */
var zlib = require('zlib');

module.exports = {
  encodeSamlRedirect: encodeSamlRedirect,
  encodeSamlPost: encodeSamlPost,
  decodeSamlRedirect: decodeSamlRedirect,
  decodeSamlPost: decodeSamlPost
};

function encodeSamlRedirect(input, cb) {
  if (input == null || input == "") {
    return cb(new Error('Cannot encode null string'));
  }
  zlib.deflateRaw(input, function (err, deflated) {
    if (!err) {
      var b64 = deflated.toString('base64');
      return cb(null, encodeURIComponent(b64));
    } else {
      return cb(err);
    }
  });
}

function decodeSamlRedirect(encoded, cb) {
  if (encoded == null || encoded == "") {
    return cb(new Error('Cannot decode null string'));
  }
  var deflated = new Buffer(decodeURIComponent(encoded), 'base64');

  zlib.inflateRaw(deflated, function (err, inflated) {
    if (!err) {
      return cb(null, inflated.toString('ascii'));
    } else {
      return cb(err);
    }
  });
}

function encodeSamlPost(input, cb) {
  if (input == null || input == "") {
    return cb(new Error('Cannot encode null string'));
  }
  return cb(null, new Buffer(input).toString('base64'));
}

function decodeSamlPost(encoded, cb) {
  if (encoded == null || encoded == "") {
    return cb(new Error('Cannot decode null string'));
  }
  return cb(null, new Buffer(encoded, 'base64').toString('ascii'));
}
