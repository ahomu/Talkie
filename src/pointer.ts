/// <reference path="../typings/myself.d.ts" />
/// <reference path="../typings/browser.d.ts" />
/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />

'use strict';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';

import util  from './util';

/**
 * pointer mode
 */
export default function(target: HTMLElement) {

  const coord  = new Subject<MouseEvent>();
  const toggle = new Subject<any>();

  const x = coord.map((e) => e.clientX + 'px');
  const y = coord.map((e) => e.clientY + 'px');

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
