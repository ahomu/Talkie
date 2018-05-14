import { Subject } from 'rxjs';

/**
 * fullscreen
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
 */
export function initFullScreen(target: HTMLElement = document.documentElement) {
  const fullScreen$ = new Subject();
  fullScreen$.subscribe(toggleScreenOf(target));
  return fullScreen$;
}

function toggleScreenOf(el: HTMLElement | any) {
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
    if (
      !doc.fullscreenElement &&
      !doc.mozFullScreenElement &&
      !doc.webkitFullscreenElement &&
      !doc.msFullscreenElement
    ) {
      el[request]();
    } else {
      doc[exit]();
    }
  };
}
