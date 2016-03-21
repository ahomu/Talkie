'use strict';

import { Subject } from 'rxjs/Subject';

/**
 * full screen
 *
 * @param {Element} target
 * @returns {Subject}
 */
export default function(target) {
  let subject$ = new Subject();
  subject$.subscribe(toggleScreenOf(target));
  return subject$;
}

/**
 * @param {Element} el
 * @returns {Function}
 */
function toggleScreenOf(el) {
  let request, exit;

  if (el.requestFullscreen) {
    request = 'requestFullscreen';
  } else if (el.webkitRequestFullscreen) {
    request = 'webkitRequestFullscreen';
  } else if (el.mozRequestFullScreen) {
    request = 'mozRequestFullScreen';
  } else if (el.msRequestFullscreen) {
    request = 'msRequestFullscreen';
  }

  if (document.exitFullscreen) {
    exit = 'exitFullscreen';
  } else if (document.webkitExitFullscreen) {
    exit = 'webkitExitFullscreen';
  } else if (document.mozCancelFullScreen) {
    exit = 'mozCancelFullScreen';
  } else if (document.msExitFullscreen) {
    exit = 'msExitFullscreen';
  }

  return function() {
    if (!document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement) {
      el[request]();
    } else {
      document[exit]();
    }
  };
}
