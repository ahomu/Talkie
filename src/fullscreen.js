'use strict';

import Bacon   from 'baconjs';
import control from './control';

/**
 * full screen
 *
 * @param {Element} target
 * @returns void
 */
export default function(target) {
  let bus = new Bacon.Bus();
  bus.onValue(toggleScreenOf(target));
  return bus;
}

function toggleScreenOf(el) {
  let request, exit;

  if(el.requestFullscreen) {
    request = 'requestFullscreen';
  } else if(el.webkitRequestFullscreen) {
    request = 'webkitRequestFullscreen';
  } else if(el.mozRequestFullScreen) {
    request = 'mozRequestFullScreen';
  } else if(el.msRequestFullscreen) {
    request = 'msRequestFullscreen';
  }

  if(document.exitFullscreen) {
    exit = 'exitFullscreen';
  } else if(document.webkitExitFullscreen) {
    exit = 'webkitExitFullscreen';
  } else if(document.mozCancelFullScreen) {
    exit = 'mozCancelFullScreen';
  } else if(document.msExitFullscreen) {
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
