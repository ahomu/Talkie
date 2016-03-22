'use strict';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/subject/BehaviorSubject';

/**
 * @typedef {Object} PagingOptions
 * @property {Number} startPage
 * @property {Number} endPage
 * @property {Array<Element>} slideElements
 */

interface PagingOptions {
  startPage: number;
  endPage: number;
  slideElements: HTMLElement[];
}

/**
 * @typedef {Object} PagingReturns
 * @property {Bacon.EventStream} currentEs
 * @property {Bacon.EventStream} startEs
 * @property {Bacon.EventStream} endEs
 * @property {Bacon.EventStream} changedEs
 * @property {Bacon.EventStream} percentEs
 * @property {Bacon.Bus} nextBus
 * @property {Bacon.Bus} prevBus
 * @property {Bacon.Bus} moveBus
 */

/**
 * paging control
 *
 * @param {PagingOptions} options
 * @returns {PagingReturns}
 */
export default function(options: PagingOptions) {

  let next     = new Subject<any>();
  let prev     = new Subject<any>();
  let move     = new Subject<number>();
  let current  = new BehaviorSubject<number>(options.startPage || 1);

  let currentPage: Observable<number> = current
    .map(inRangeOf(1, options.endPage))
    .distinctUntilChanged();

  let _next = next.withLatestFrom(currentPage, (_, page) => page).map((v) => v + 1);
  let _prev = prev.withLatestFrom(currentPage, (_, page) => page).map((v) => v - 1);
  let _move = move.map((v) => v /* noop */);

  let percentString = currentPage.map(percentOf(options.endPage));
  let currentSlide  = currentPage.map((i) => options.slideElements[i - 1]);

  Observable.merge(_next, _prev, _move).subscribe(current);

  currentSlide.subscribe(function(current) {
    options.slideElements.forEach(toInvisible);
    current && toVisible(current);
  });

  return {
    current : currentPage,
    start   : currentPage.filter((v) => v === 1),
    end     : currentPage.filter((v) => v === options.endPage),
    changed : currentSlide,
    percent : percentString,
    next    : next,
    prev    : prev,
    move    : move
  };
}

/**
 * @param {Element} el
 */
function toInvisible(el: HTMLElement) {
  el.removeAttribute('visible');
}

/**
 * @param {Element} el
 */
function toVisible(el: HTMLElement) {
  el.setAttribute('visible', '1');
}

/**
 * @param {Number} min
 * @param {Number} max
 * @returns {Function}
 */
function inRangeOf(min: number, max: number) {
  return function(z: number) {
    return Math.min(max, Math.max(z, min));
  };
}

/**
 * @param {Number} max
 * @returns {Function}
 */
function percentOf(max: number) {
  return function(current: number) {
    return ((100 / max) * current) + '%';
  };
}
