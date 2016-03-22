/// <reference path="../typings/myself.d.ts" />
/// <reference path="../typings/browser.d.ts" />
/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />

'use strict';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/subject/BehaviorSubject';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';

import util  from './util';

interface ResponsiveOptions {
  width: number;
  height: number;
  target: HTMLElement;
}

/**
 * compute ratio
 */
export default function(options: ResponsiveOptions) {

  const scaleSubject = new BehaviorSubject<any>(true);
  const scaleFn = util.compose(centeringOf(options.target), scalingOf(options.target));

  const hRatio = scaleSubject.map(horizontalRatioOf(options.width));
  const vRatio = scaleSubject.map(verticalRatioOf(options.height));

  const currentRatio = Observable.combineLatest(hRatio, vRatio).map((hv) => Math.min(hv[0], hv[1]));
  currentRatio.subscribe(scaleFn);

  return {
    scale        : scaleSubject,
    currentRatio : currentRatio
  };
}

function horizontalRatioOf(width: number) {
  return function() {
    return window.innerWidth / width;
  };
}

function verticalRatioOf(height: number) {
  return function() {
    return window.innerHeight / height;
  };
}

function scalingOf(el: HTMLElement) {
  const transform = util.stylePrefixDetect('transform');
  return function(ratio: number) {
    el.style[transform] = `scale(${Math.abs(ratio)})`;
  };
}

function centeringOf(el: HTMLElement) {
  return function() {
    const rect = el.getBoundingClientRect();
    el.style.left = `${(window.innerWidth - rect.width) / 2}px`;
    el.style.top  = `${(window.innerHeight - rect.height) / 2}px`;
  };
}
