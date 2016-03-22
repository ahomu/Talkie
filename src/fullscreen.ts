'use strict';

import { Subject } from 'rxjs/Subject';

/**
 * full screen
 *
 * @param {Element} target
 * @returns {Subject}
 */
export default function(target: HTMLElement) {
  const fullscreen$ = new Subject();
  fullscreen$.subscribe(toggleScreenOf(target));
  return fullscreen$;
}

/**
 * @param {Element} el
 * @returns {Function}
 */
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
