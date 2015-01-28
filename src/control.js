'use strict';

import Bacon  from 'baconjs';
import util   from './util';
import params from './params';

const IDENT_NEXT    = 'next';
const IDENT_PREV    = 'prev';

export default function() {

  function keyCodeIs(keyCode) {
    return function(event) {
      return event.keyCode === keyCode;
    };
  }

  function clickEventStream(el) {
    return Bacon.fromEventTarget(el, 'click');
  }

  function keyUpEventStream() {
    return Bacon.fromEventTarget(document, 'keyup');
  }

  let keyUp  = keyUpEventStream();
  let right  = keyUp.filter(keyCodeIs(39));
  let left   = keyUp.filter(keyCodeIs(37));
  let f      = keyUp.filter(keyCodeIs(70));

  let next = right.merge(clickEventStream(util.getById(IDENT_NEXT))).map(1);
  let prev = left.merge(clickEventStream(util.getById(IDENT_PREV))).map(-1);

  return {
    next: next,
    prev: prev,
    f   : f
  };
}
