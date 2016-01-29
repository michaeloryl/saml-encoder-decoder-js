/* global Buffer */
var zlib = require('zlib');

module.exports = {
  encodeSamlRedirect: encodeSamlRedirect,
  encodeSamlPost: encodeSamlPost,
  decodeSamlRedirect: decodeSamlRedirect,
  decodeSamlPost: decodeSamlPost
};

function encodeSamlRedirect(input, cb) {
  zlib.deflateRaw(input, function (err, deflated) {
    if (!err) {
      var b64 = deflated.toString('base64');
      return cb(null, encodeURIComponent(b64));
    } else {
      console.log("Error while deflating");
      return cb(err);
    }
  });
}

function decodeSamlRedirect(encoded, cb) {
  var deflated = new Buffer(decodeURIComponent(encoded), 'base64');

  zlib.inflateRaw(deflated, function (err, inflated) {
    if (!err) {
      return cb(null, inflated.toString('ascii'));
    } else {
      console.log("Error while inflating");
      return cb(err);
    }
  });
}

function encodeSamlPost(input, cb) {
  return cb(null, encodeURIComponent(new Buffer(input).toString('base64')));
}

function decodeSamlPost(encoded, cb) {
  return cb(null, new Buffer(decodeURIComponent(encoded), 'base64').toString('ascii'));
}
