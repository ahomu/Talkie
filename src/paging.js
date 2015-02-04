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

  let nextBus    = new Bacon.Bus();
  let prevBus    = new Bacon.Bus();

  let nextEs = nextBus.map(1);
  let prevEs = prevBus.map(-1);

  let initialPage = options.startPage || 1;
  let correctPage = util.compose(inRangeOf(1, options.endPage), add);

  let bothEs  = nextEs.merge(prevEs);
  let current = bothEs.scan(initialPage, correctPage).skipDuplicates();
  let percent = current.map(percentOf(options.endPage)).skipDuplicates();

  let changed = current.map(function(current) {
    let index = current - 1 /* fix page to index */;
    return options.slideElements[index];
  });

  changed.onValue(function(current) {
    options.slideElements.forEach(toInvisible);
    toVisible(current);
  });

  return {
    currentEs : current,
    startEs   : current.filter((v) => v === 1),
    endEs     : current.filter((v) => v === options.endPage),
    changedEs : changed,
    percentEs : percent,
    nextBus   : nextBus,
    prevBus   : prevBus
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

/**
 * @param {Number} x
 * @param {Number} y
 * @returns {Number}
 */
function add(x, y) {
  return x + y;
}
