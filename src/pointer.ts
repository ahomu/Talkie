/// <reference path="../typings/myself.d.ts" />

'use strict';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';

import { styleAssignOf, attributeAssignOf }  from './util';

/**
 * pointer mode
 */
export default function(target: HTMLElement) {

  const coord  = new Subject<MouseEvent>();
  const toggle = new Subject<any>();

  const x = coord.map((e) => e.clientX + 'px');
  const y = coord.map((e) => e.clientY + 'px');

  x.subscribe(styleAssignOf(target, 'left'));
  y.subscribe(styleAssignOf(target, 'top'));

  toggle
    .scan((acc) => !acc, false)
    .map((bool) => bool ? 'false' : 'true')
    .subscribe(attributeAssignOf(target, 'aria-hidden'));

  return {
    ptCoord  : coord,
    ptToggle : toggle
  };
}
