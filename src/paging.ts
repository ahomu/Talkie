/// <reference path="../typings/myself.d.ts" />

'use strict';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/withLatestFrom';

interface PagingOptions {
  startPage: number;
  endPage: number;
  slideElements: HTMLElement[];
}

/**
 * paging control
 */
export default function(options: PagingOptions) {

  const next    = new Subject<any>();
  const prev    = new Subject<any>();
  const move    = new Subject<number>();
  const current = new BehaviorSubject<number>(options.startPage || 1);

  const currentPage: Observable<number> = current
    .map(inRangeOf(1, options.endPage))
    .distinctUntilChanged();

  const _next = next.withLatestFrom(currentPage, (_, page) => page).map((v) => v + 1);
  const _prev = prev.withLatestFrom(currentPage, (_, page) => page).map((v) => v - 1);
  const _move = move.map((v) => v /* noop */);

  const percentString = currentPage.map(percentOf(options.endPage));
  const currentSlide  = currentPage.map((i) => options.slideElements[i - 1]);

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

function toInvisible(el: HTMLElement) {
  el.setAttribute('aria-hidden', 'true');
}

function toVisible(el: HTMLElement) {
  el.setAttribute('aria-hidden', 'false');
}

function inRangeOf(min: number, max: number) {
  return function(z: number) {
    return Math.min(max, Math.max(z, min));
  };
}

function percentOf(max: number) {
  return function(current: number) {
    return ((100 / max) * current) + '%';
  };
}
