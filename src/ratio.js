'use strict';

import Bacon from 'baconjs';
import util  from './util';

const NORMAL_WIDTH  = 1024;
const NORMAL_HEIGHT = 768;
const WIDE_WIDTH    = 1366;
const WIDE_HEIGHT   = 768;

export default function(options) {

  let width  = options.width  || (options.wide ? WIDE_WIDTH  : NORMAL_WIDTH);
  let height = options.height || (options.wide ? WIDE_HEIGHT : NORMAL_HEIGHT);

  function getHorizontalRatio() {
    return window.innerWidth / width;
  }

  function getVerticalRatio() {
    return window.innerHeight / height;
  }

  function resizeEventStream() {
    return Bacon.fromEventTarget(window, 'resize').debounce(250);
  }

  /**
   * Init slide sizes
   */
  let style = document.createElement('style');
  style.innerHTML = `
    #scaler,
    [layout] {
      width: ${width}px !important;
      height: ${height}px !important;
    }
  `;
  document.querySelector('head').appendChild(style);

  let resize = resizeEventStream();
  let hRatio = resize.map(getHorizontalRatio).toProperty(getHorizontalRatio());
  let vRatio = resize.map(getVerticalRatio).toProperty(getVerticalRatio());

  return Bacon.combineWith(Math.min, hRatio, vRatio);
}
