# saml-encoder-decoder-js
Routines assembled to encode and decode SAML 2 assertions in Node.js

## Installation

To use these routines you first need to install the dependency:

    npm install saml-encoder-decoder-js

## Using the module

Once the module has been installed, require it into your application:

    var saml = require('saml');

At that point, you can pass your SAML request or response XML to the redirect or POST binding encoding routines.

    saml.encodeSamlRedirect(xml, function(err, encoded) {
      if (!err) {
        console.log("Redirect encoded string", encoded);
      }
    }

    saml.encodeSamlPost(xml, function(err, encoded) {
      if (!err) {
        console.log("POST encoded string", encoded);
      }
    }

If, on the other hand, you need to decode previously encoded data, you would handle that like this:

    saml.decodeSamlRedirect(xml, function(err, xml) {
      if (!err) {
        console.log("Redirect decoded XML", xml);
      }
    }

    saml.decodeSamlPost(xml, function(err, xml) {
      if (!err) {
        console.log("POST decoded XML", xml);
      }
    }

## Demo code

Two demo applications are included to show how the code works.  Those are `demo-redirect.js` and `demo-post.js`.  Each takes some XML, encoded it, and decodes it back to its original state.

The unit tests in the `test` folder will also provide insight into how the code works.