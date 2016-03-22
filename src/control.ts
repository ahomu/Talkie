/// <reference path="../typings/myself.d.ts" />
/// <reference path="../typings/browser.d.ts" />
/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />

'use strict';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/skip';

import keycode = require('keycode');

const KEY_UP$ = Observable.fromEvent(document, 'keyup');
const KEY_DOWN$ = Observable.fromEvent(document, 'keydown');

export interface TouchMoveDelta {
  init : number;
  curt : number;
}

/**
 * create EventStream from user input
 */
export default {

  /**
   * TODO rename to `keyup`
   * @param charKey
   * @returns {*}
     */
  keyup(charKey: string|number): Observable<KeyboardEvent> {
    const keyCode = typeof charKey === 'string' ? keycode(charKey)
                                                : charKey;
    return KEY_UP$.filter(keyCodeIs(keyCode));
  },

  /**
   * @param {String|Number} charKey
   * @returns {Observable}
   */
  keydown(charKey: string|number): Observable<KeyboardEvent> {
    const keyCode = typeof charKey === 'string' ? keycode(charKey)
                                                : charKey;
    return KEY_DOWN$.filter(keyCodeIs(keyCode));
  },

  /**
   * @param {Element} el
   * @returns {Observable}
   */
  click(el: HTMLElement): Observable<MouseEvent> {
    return Observable.fromEvent(el, 'click');
  },

  /**
   * @param {Element} [el = document.body]
   * @returns {Observable}
   */
  mousemove(el = document.body): Observable<MouseEvent> {
    return Observable.fromEvent(el, 'mousemove');
  },

  /**
   * @param {Element} el
   * @returns {Observable}
   */
  touchstart(el: HTMLElement): Observable<TouchEvent> {
    return Observable.fromEvent(el, 'touchstart');
  },

  /**
   * @param {Element} el
   * @returns {Observable}
   */
  touchend(el: HTMLElement): Observable<TouchEvent> {
    return Observable.fromEvent(el, 'touchend');
  },

  /**
   * @param {Element} el
   * @returns {Observable}
   */
  touchmove(el: HTMLElement): Observable<TouchEvent> {
    return Observable.fromEvent(el, 'touchmove');
  },

  /**
   * @param {Element} el
   * @param {Bacon.Bus} [stop$ = new Bacon.Bus()]
   * @returns {Observable}
   */
  swipe(el: HTMLElement, stop$: Subject<any>): Observable<TouchMoveDelta> {
    let start$ = this.touchstart(el).do((e: TouchEvent) => e.preventDefault());
    let move$  = this.touchmove(el).do((e: TouchEvent) => e.preventDefault()).throttleTime(100);
    let end$   = this.touchend(el).do((e: TouchEvent) => e.preventDefault());

    end$.subscribe(stop$)

    return start$.flatMap(function({changedTouches}) {
      let initialValue = {
        init : changedTouches[0].clientX,
        curt : 0
      };
      return move$.takeUntil(stop$).scan(function(acc: TouchMoveDelta, current: TouchEvent) {
        acc.curt = current.changedTouches[0].clientX;
        return acc;
      }, initialValue).skip(1);
    });
  },

  /**
   * @param {Element} [el = document.body]
   * @returns {Observable}
   */
  swipeLeft(el = document.body): Observable<TouchMoveDelta> {
    let stop$ = new Subject();

    return this.swipe(el, stop$).filter((moves: TouchMoveDelta) => {
      let {init, curt} = moves;
      let delta = curt - init;
      return delta < -10;
    }).do(() => stop$.next(true));
  },

  /**
   * @param {Element} [el = document.body]
   * @returns {Observable}
   */
  swipeRight(el = document.body): Observable<TouchMoveDelta> {
    let stop$ = new Subject();

    return this.swipe(el, stop$).filter((moves: TouchMoveDelta) => {
      let {init, curt} = moves;
      let delta = curt - init;
      return delta > 10;
    }).do(() => stop$.next(true));
  },

  /**
   * @returns {Observable}
   */
  resize(): Observable<UIEvent> {
    return Observable.fromEvent(window, 'resize');
  },

  /**
   * @returns {Observable}
   */
  hashchange(): Observable<HashChangeEvent> {
    return Observable.fromEvent(window, 'hashchange');
  }
};

/**
 * @param {Number} keyCode
 * @returns {Function}
 */
function keyCodeIs(keyCode: number) {
  return function(event: KeyboardEvent) {
    return event.keyCode === keyCode;
  };
}
