'use strict';

import Bacon from 'baconjs';
import util  from './util';

const NORMAL_WIDTH  = 1024;
const NORMAL_HEIGHT = 768;
const WIDE_WIDTH    = 1366;
const WIDE_HEIGHT   = 768;

/**
 * @typedef {Object} RatioOptions
 * @property {Boolean} [wide]
 * @property {Number} [width]
 * @property {Number} [height]
 */

/**
 * compute ratio
 *
 * @param {RatioOptions} options
 * @returns {EventStream}
 */
export default function(options = {}) {

  let width  = options.width  || (options.wide ? WIDE_WIDTH  : NORMAL_WIDTH);
  let height = options.height || (options.wide ? WIDE_HEIGHT : NORMAL_HEIGHT);

  /**
   * Init slide sizes
   * @sideeffects
   */
  let style = document.createElement('style');
  style.innerHTML = `
    #scaler,
    [layout] {
      width: ${width}px !important;
      height: ${height}px !important;
    }
  `;
  document.querySelector('head').appendChild(style);

  let hRatio   = horizontalRatioOf(width);
  let vRatio   = verticalRatioOf(height);
  let resize   = resizeEventStream();
  let hRatioSt = resize.map(hRatio).toProperty(hRatio());
  let vRatioSt = resize.map(vRatio).toProperty(vRatio());

  return Bacon.combineWith(Math.min, hRatioSt, vRatioSt);
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
 * @returns {EventStream}
 */
function resizeEventStream() {
  return Bacon.fromEventTarget(window, 'resize').debounce(250);
}
