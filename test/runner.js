'use strict';

(function() {

  if (typeof exports !== "object") {
    // for node (polyfill)
    require("6to5/runtime");
    require('6to5/polyfill');
  } else {
    // for browser (polyfill & global utilities)
    require("6to5/runtime");
    require('6to5/browser-polyfill');
    window.assert = require('power-assert');
    window.sinon = require('sinon');
  }

})();
