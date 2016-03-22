/// <reference path="../typings/myself.d.ts" />
/// <reference path="../typings/browser.d.ts" />
/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />

'use strict';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';

import util  from './util';

/**
 * @typedef {Object} PointerReturns
 * @property {Bacon.Bus} coordBus
 * @property {Bacon.Bus} toggleBus
 */

/**
 * pointer mode
 *
 * @param {Element} target
 * @returns {PointerReturns}
 */
export default function(target: HTMLElement) {

  let coord  = new Subject<MouseEvent>();
  let toggle = new Subject<any>();

  let x = coord.map((e) => e.clientX + 'px');
  let y = coord.map((e) => e.clientY + 'px');

  x.subscribe(util.styleAssignOf(target, 'left'));
  y.subscribe(util.styleAssignOf(target, 'top'));

  toggle
    .scan((acc) => !acc, false)
    .map((bool) => bool ? 'visible' : 'hidden')
    .subscribe(util.styleAssignOf(target, 'visibility'));

  return {
    coord  : coord,
    toggle : toggle
  };
}
