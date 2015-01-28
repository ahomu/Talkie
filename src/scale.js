'use strict';

import Bacon from 'baconjs';
import util  from './util';

/**
 * @typedef {Object} ScaleOptions
 * @property {Element} target
 */

/**
 * do scaling & centering
 *
 * @param {ScaleOptions} options
 * @returns {Function}
 */
export default function(options = {}) {
  let scaler = options.target;
  return util.compose(centeringOf(scaler), scalingOf(scaler));
}

/**
 * @param {Element} el
 * @returns {Function}
 */
function scalingOf(el) {
  return function(ratio) {
    el.style.webkitTransform = `scale(${Math.abs(ratio)})`;
  };
}

/**
 * @param {Element} el
 * @returns {Function}
 */
function centeringOf(el) {
  return function() {
    let rect = el.getBoundingClientRect();
    el.style.left = (window.innerWidth  - rect.width) / 2;
    el.style.top  = (window.innerHeight - rect.height) / 2;
  };
}
