/// <reference path="../typings/myself.d.ts" />

'use strict';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { styleAssignOf, stylePrefixDetect, toArray, preloadImg } from './util';

const ATTR_BACKFACE  = 'backface';
const ATTR_FILTER    = 'backface-filter';

/**
 * control backface
 */
export default function(target: HTMLElement) {

  const bgImage = new Subject<HTMLElement>();
  const bgFilter = new Subject<HTMLElement>();

  // backface image
  // FIXME should receive primitive resouse url string?
  bgImage
    .map((el) => el.getAttribute(ATTR_BACKFACE))
    .map((src) => src ? `url(${src})` : '')
    .subscribe(styleAssignOf(target, 'background-image'));

  // backface image css filter
  // FIXME should receive primitive resouse url string?
  bgFilter
    .map((el) => el.getAttribute(ATTR_FILTER))
    .subscribe(styleAssignOf(target, stylePrefixDetect('filter')));

  Observable.from<Element>(toArray<Element>(document.querySelectorAll(`[${ATTR_BACKFACE}]`)))
    .map((el) => el.getAttribute(ATTR_BACKFACE))
    .filter((v) => !!v)
    .subscribe(preloadImg);

  return {
    bgImage  : bgImage,
    bgFilter : bgFilter
  };
}
