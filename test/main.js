var should = require('should');
var saml = require('../');

var encodedRedirect = "fZJbU8IwEIX%2FSibvvYCiTobioAwjM146Un3wLaRLTU2yNZtS%2FfcWkEFfeN3snvOd3Yyvv6xhG%2FCk0WV8EKecgVNYaldl%2FKWYR1f8ejImaU0jpm14d8%2Fw2QIF1s85EruHjLfeCZSkSThpgURQYjl9uBfDOBWNx4AKDWeLWcZlVeKqVmv94QCtXdfSlsqAq1WjaluV1co2VW2Rs9cD1HALtSBqYeEoSBf6UppeRul5NLwoBmdiNBCjizfO8l%2BnG%2B32%2FKewVvsmEndFkUf507LYCWx0Cf6x7854hVgZiBVazqZE4EOPc4uOWgt%2BCX6jFbw832f8PYSGRJJ0XRcfhxKZEJoOVrHDRCraZsglkd702sG3wPd7Fbto%2Fs9CT4PLAwqfHM3GyR%2Bpw722MRazHI1W32xqDHa3HmQ42LM5eivDabdtRZfRetcqWkcNKL3WUHKWTPau%2Fz%2FG5Ac%3D";
var encodedPost = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c2FtbHA6QXV0aG5SZXF1ZXN0IHhtbG5zOnNhbWxwPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6cHJvdG9jb2wiIElEPSJhZ2RvYmpjZmlrbmVvbW1mamFtZGNsZW5qY3Bjam1nZGdibXBnam1vIiBWZXJzaW9uPSIyLjAiIElzc3VlSW5zdGFudD0iMjAwNy0wNC0yNlQxMzo1MTo1NloiIFByb3RvY29sQmluZGluZz0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmJpbmRpbmdzOkhUVFAtUE9TVCIgUHJvdmlkZXJOYW1lPSJnb29nbGUuY29tIiBBc3NlcnRpb25Db25zdW1lclNlcnZpY2VVUkw9Imh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vYS9zb2x3ZWIubm8vYWNzIiBJc1Bhc3NpdmU9InRydWUiPjxzYW1sOklzc3VlciB4bWxuczpzYW1sPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXNzZXJ0aW9uIj5nb29nbGUuY29tPC9zYW1sOklzc3Vlcj48c2FtbHA6TmFtZUlEUG9saWN5IEFsbG93Q3JlYXRlPSJ0cnVlIiBGb3JtYXQ9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpuYW1laWQtZm9ybWF0OnVuc3BlY2lmaWVkIiAvPjwvc2FtbHA6QXV0aG5SZXF1ZXN0Pg==";
var xml = '<?xml version="1.0" encoding="UTF-8"?><samlp:AuthnRequest xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol" ID="agdobjcfikneommfjamdclenjcpcjmgdgbmpgjmo" Version="2.0" IssueInstant="2007-04-26T13:51:56Z" ProtocolBinding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" ProviderName="google.com" AssertionConsumerServiceURL="https://www.google.com/a/solweb.no/acs" IsPassive="true"><saml:Issuer xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion">google.com</saml:Issuer><samlp:NameIDPolicy AllowCreate="true" Format="urn:oasis:names:tc:SAML:2.0:nameid-format:unspecified" /></samlp:AuthnRequest>';

describe('SAML redirect bindings encode', function () {
  it('should properly encode the test XML', function (done) {
    saml.encodeSamlRedirect(xml, function (err, data) {
      if (err) {
        return done(err);
      }
      data.should.equal(encodedRedirect);
      return done();
    });
  });
});

describe('SAML redirect bindings decode', function () {
  it('should properly decode the test data', function (done) {
    saml.decodeSamlRedirect(encodedRedirect, function (err, data) {
      if (err) {
        return done(err);
      }
      data.should.equal(xml);
      return done();
    });
  });
});

describe('SAML POST bindings encode', function () {
  it('should properly encode the test XML', function (done) {
    saml.encodeSamlPost(xml, function (err, data) {
      if (err) {
        return done(err);
      }
      data.should.equal(encodedPost);
      return done();
    });
  });
});

describe('SAML POST bindings decode', function () {
  it('should properly decode the test data', function (done) {
    saml.decodeSamlPost(encodedPost, function (err, data) {
      if (err) {
        return done(err);
      }
      data.should.equal(xml);
      return done();
    });
  });
});

describe('Null/blank error handling', function() {
  it('should throw an error encoding blank post strings', function(done) {
    saml.encodeSamlPost("", function(err, data) {
      should.exist(err);
      done();
    })
  });
  it('should throw an error decoding null post strings', function(done) {
    saml.decodeSamlPost(null, function(err, data) {
      should.exist(err);
      done();
    })
  });
  it('should throw an error encoding blank redirect strings', function(done) {
    saml.encodeSamlRedirect("", function(err, data) {
      should.exist(err);
      done();
    })
  });
  it('should throw an error decoding null redirect strings', function(done) {
    saml.encodeSamlRedirect(null, function(err, data) {
      should.exist(err);
      done();
    })
  });
});

describe('Invalid data decoding error handling', function() {
  it('should throw an error decoding invalid redirect strings', function(done) {
    saml.decodeSamlRedirect("12345"+encodedRedirect, function(err, data) {
      should.exist(err);
      done();
    })
  });
});
