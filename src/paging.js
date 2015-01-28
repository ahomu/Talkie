'use strict';

import Bacon   from 'baconjs';
import control from './control';
import util    from './util';

/**
 * @typedef {Object} PagingOptions
 * @property {Number} startPage
 * @property {Number} endPage
 * @property {Element} [nextButton]
 * @property {Element} [prevButton]
 */

/**
 * paging control
 *
 * @param {PagingOptions} options
 */
export default function(options) {

  let right = control.key('right');
  let left  = control.key('left');

  options.nextButton && (right = right.merge(control.click(options.nextButton)));
  options.prevButton && (left  = left.merge(control.click(options.prevButton)));

  let next = right.map(1);
  let prev = left.map(-1);

  let initialPage = options.startPage || 1;
  let correctPage = util.compose(rangeIs(1, options.endPage), add);

  let both    = next.merge(prev);
  let current = both.scan(initialPage, correctPage).skipDuplicates();
  let percent = current.map(percentOf(options.endPage));

  return {
    current : current,
    percent : percent,
    onNext  : next,
    onPrev  : prev
  };
}

/**
 * @param {Number} min
 * @param {Number} max
 * @returns {Function}
 */
function rangeIs(min, max) {
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
