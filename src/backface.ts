/// <reference path="../typings/myself.d.ts" />
/// <reference path="../typings/browser.d.ts" />
/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />

'use strict';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/fromArray';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import util  from './util';

const ATTR_BACKFACE  = 'backface';
const ATTR_FILTER    = 'backface-filter';

/**
 * @typedef {Object} BackfaceReturns
 * @property {Bacon.Bus} bgImageBus
 * @property {Bacon.Bus} bgFilterBus
 */

/**
 * backface
 *
 * @param {Element} target
 * @returns {BackfaceReturns}
 */
export default function(target: HTMLElement) {

  let bgImage = new Subject<HTMLElement>();
  let bgFilter = new Subject<HTMLElement>();

  // backface image
  // FIXME should receive primitive resouse url string?
  bgImage
    .map((el) => el.getAttribute(ATTR_BACKFACE))
    .map((src) => src ? `url(${src})` : '')
    .subscribe(util.styleAssignOf(target, 'background-image'));

  // backface image css filter
  // FIXME should receive primitive resouse url string?
  bgFilter
    .map((el) => el.getAttribute(ATTR_FILTER))
    .subscribe(util.styleAssignOf(target, util.stylePrefixDetect('filter')));

  Observable.fromArray(util.toArray(document.querySelectorAll(`[${ATTR_BACKFACE}]`)))
    .map((el: HTMLElement) => el.getAttribute(ATTR_BACKFACE))
    .filter((v) => !!v)
    .subscribe(util.preloadImg);

  return {
    bgImage  : bgImage,
    bgFilter : bgFilter
  };
}
