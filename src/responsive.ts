'use strict';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/subject/BehaviorSubject';
import util  from './util';

/**
 * @typedef {Object} RatioOptions
 * @property {Number} width
 * @property {Number} height
 * @property {Element} target
 */

/**
 * @typedef {Object} RatioReturns
 * @property {Bacon.Bus} scaleBus
 * @property {Bacon.Property} currentRatio
 */

/**
 * compute ratio
 *
 * @param {RatioOptions} options
 * @returns {RatioReturns}
 */
export default function(options: {width: number, height: number, target: HTMLElement}) {

  const scaleSubject = new BehaviorSubject<any>(true);
  const scaleFn = util.compose(centeringOf(options.target), scalingOf(options.target));

  let hRatio = scaleSubject.map(horizontalRatioOf(options.width));
  let vRatio = scaleSubject.map(verticalRatioOf(options.height));

  let currentRatio = Observable.combineLatest(hRatio, vRatio).map((hv) => Math.min(hv[0], hv[1]));
  currentRatio.subscribe(scaleFn);

  return {
    scale        : scaleSubject,
    currentRatio : currentRatio
  };
}

/**
 * @param {Number} width
 * @returns {Function}
 */
function horizontalRatioOf(width: number) {
  return function() {
    return window.innerWidth / width;
  };
}

/**
 * @param {Number} height
 * @returns {Function}
 */
function verticalRatioOf(height: number) {
  return function() {
    return window.innerHeight / height;
  };
}

/**
 * @param {Element} el
 * @returns {Function}
 */
function scalingOf(el: HTMLElement) {
  let transform = util.stylePrefixDetect('transform');
  return function(ratio: number) {
    el.style[transform] = `scale(${Math.abs(ratio)})`;
  };
}

/**
 * @param {Element} el
 * @returns {Function}
 */
function centeringOf(el: HTMLElement) {
  return function() {
    let rect = el.getBoundingClientRect();
    el.style.left = `${(window.innerWidth - rect.width) / 2}px`;
    el.style.top  = `${(window.innerHeight - rect.height) / 2}px`;
  };
}
