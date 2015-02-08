'use strict';

import Bacon   from 'baconjs';
import control from './control';
import util    from './util';

/**
 * @typedef {Object} PagingOptions
 * @property {Number} startPage
 * @property {Number} endPage
 * @property {Array<Element>} slideElements
 */

/**
 * paging control
 *
 * @param {PagingOptions} options
 */
export default function(options) {

  let nextBus = new Bacon.Bus();
  let prevBus = new Bacon.Bus();
  let moveBus = new Bacon.Bus();

  let currentBus  = new Bacon.Bus();
  let currentPage = currentBus
    .map(inRangeOf(1, options.endPage))
    .toProperty(options.startPage || 1)
    .skipDuplicates();

  let nextEs = currentPage.sampledBy(nextBus).map((v) => v + 1);
  let prevEs = currentPage.sampledBy(prevBus).map((v) => v - 1);
  let moveEs = moveBus.map((v) => v /*noop*/);

  let percentString = currentPage.map(percentOf(options.endPage));
  let currentSlide  = currentPage.map((i) => options.slideElements[i - 1]);

  currentBus.plug(nextEs.merge(prevEs).merge(moveEs));

  currentSlide.onValue(function(current) {
    options.slideElements.forEach(toInvisible);
    current && toVisible(current);
  });

  return {
    currentEs : currentPage,
    startEs   : currentPage.filter((v) => v === 1),
    endEs     : currentPage.filter((v) => v === options.endPage),
    changedEs : currentSlide,
    percentEs : percentString,
    nextBus   : nextBus,
    prevBus   : prevBus,
    moveBus   : moveBus
  };
}

/**
 * @param {Element} el
 */
function toInvisible(el) {
  el.removeAttribute('visible');
}

/**
 * @param {Element} el
 */
function toVisible(el) {
  el.setAttribute('visible', 1);
}

/**
 * @param {Number} min
 * @param {Number} max
 * @returns {Function}
 */
function inRangeOf(min, max) {
  return function(z) {
    return Math.min(max, Math.max(z, min));
  };
}

/**
 * @param {Number} max
 * @returns {Function}
 */
function percentOf(max) {
  return function(current) {
    return ((100 / max) * current) + '%';
  };
}
