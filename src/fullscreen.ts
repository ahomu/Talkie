/// <reference path="../typings/myself.d.ts" />

'use strict';

import { Subject } from 'rxjs/Subject';

/**
 * fullscreen
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
 */
export default function(target: HTMLElement) {
  const fullscreen$ = new Subject();
  fullscreen$.subscribe(toggleScreenOf(target));
  return fullscreen$;
}

function toggleScreenOf(el: HTMLElement|any) {
  let request: string, exit: string;
  const doc = document as any;

  if (el.requestFullscreen) {
    request = 'requestFullscreen';
  } else if (el.webkitRequestFullscreen) {
    request = 'webkitRequestFullscreen';
  } else if (el.mozRequestFullScreen) {
    request = 'mozRequestFullScreen';
  } else if (el.msRequestFullscreen) {
    request = 'msRequestFullscreen';
  }

  if (doc.exitFullscreen) {
    exit = 'exitFullscreen';
  } else if (doc.webkitExitFullscreen) {
    exit = 'webkitExitFullscreen';
  } else if (doc.mozCancelFullScreen) {
    exit = 'mozCancelFullScreen';
  } else if (doc.msExitFullscreen) {
    exit = 'msExitFullscreen';
  }

  return function() {
    if (!doc.fullscreenElement &&
      !doc.mozFullScreenElement &&
      !doc.webkitFullscreenElement &&
      !doc.msFullscreenElement) {
      el[request]();
    } else {
      doc[exit]();
    }
  };
}
