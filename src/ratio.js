'use strict';

import Bacon from 'baconjs';
import util  from './util';

export default function() {

  function getHorizontalRatio() {
    return window.innerWidth / 1024;
  }

  function getVerticalRatio() {
    return window.innerHeight / 768;
  }

  function resizeEventStream() {
    return Bacon.fromEventTarget(window, 'resize').debounce(250);
  }

  let resize = resizeEventStream();
  let hRatio = resize.map(getHorizontalRatio).toProperty(getHorizontalRatio());
  let vRatio = resize.map(getVerticalRatio).toProperty(getVerticalRatio());

  return Bacon.combineWith(Math.min, hRatio, vRatio);
}
