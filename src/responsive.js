'use strict';

import Bacon from 'baconjs';
import util  from './util';

/**
 * @typedef {Object} RatioOptions
 * @property {Number} width
 * @property {Number} height
 * @property {Element} target
 */

/**
 * compute ratio
 *
 * @param {RatioOptions} options
 * @returns {EventStream}
 */
export default function(options = {}) {

  let bus = new Bacon.Bus();

  let hRatioFn = horizontalRatioOf(options.width);
  let vRatioFn = verticalRatioOf(options.height);

  let hRatio = bus.map(hRatioFn).toProperty(hRatioFn());
  let vRatio = bus.map(vRatioFn).toProperty(vRatioFn());

  let scale = util.compose(centeringOf(options.target), scalingOf(options.target));

  let currentRatio = Bacon.combineWith(Math.min, hRatio, vRatio).toProperty();

  currentRatio.onValue(scale);

  return {
    scaleBus     : bus,
    currentRatio : currentRatio
  };
}

/**
 * @param {Number} width
 * @returns {Function}
 */
function horizontalRatioOf(width) {
  return function() {
    return window.innerWidth / width;
  };
}

/**
 * @param {Number} height
 * @returns {Function}
 */
function verticalRatioOf(height) {
  return function() {
    return window.innerHeight / height;
  };
}

/**
 * @param {Element} el
 * @returns {Function}
 */
function scalingOf(el) {
  let transform = util.stylePrefixDetect('transform');
  return function(ratio) {
    el.style[transform] = `scale(${Math.abs(ratio)})`;
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
