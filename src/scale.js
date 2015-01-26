'use strict';

import Bacon from 'baconjs';
import util  from './util';

const IDENT_SCALER = 'scaler';

export default function() {

  function scalingOf(el) {
    return function(ratio) {
      el.style.webkitTransform = `scale(${Math.abs(ratio)})`;
    };
  }

  function centeringOf(el) {
    return function() {
      let rect = el.getBoundingClientRect();
      el.style.left = (window.innerWidth  - rect.width) / 2;
      el.style.top  = (window.innerHeight - rect.height) / 2;
    };
  }

  let scaler = util.getById(IDENT_SCALER);
  return util.compose(centeringOf(scaler), scalingOf(scaler));
}
