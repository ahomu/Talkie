'use strict';

import Bacon   from 'baconjs';
import keycode from 'keycode';

const EVENT_KEYUP = Bacon.fromEventTarget(document, 'keyup');
const EVENT_KEYDOWN = Bacon.fromEventTarget(document, 'keydown');

/**
 * create EventStream from user input
 */
export default {
  /**
   * @param {String|Number} charKey
   * @returns {EventStream}
   */
  key(charKey) {
    let keyCode = typeof(charKey) === 'string' ? keycode(charKey)
                                               : charKey;
    return EVENT_KEYUP.filter(keyCodeIs(keyCode));
  },

  /**
   * @param {String|Number} charKey
   * @returns {EventStream}
   */
  keydown(charKey) {
    let keyCode = typeof(charKey) === 'string' ? keycode(charKey)
                                               : charKey;
    return EVENT_KEYDOWN.filter(keyCodeIs(keyCode));
  },

  /**
   * @param {Element} el
   * @returns {EventStream}
   */
  click(el) {
    return Bacon.fromEventTarget(el, 'click');
  },

  /**
   * @param {Element} [el = document.body]
   * @returns {EventStream}
   */
  mousemove(el = document.body) {
    return Bacon.fromEventTarget(el, 'mousemove');
  },

  /**
   * @param {Element} el
   * @returns {EventStream}
   */
  touchstart(el) {
    return Bacon.fromEventTarget(el, 'touchstart');
  },

  /**
   * @param {Element} el
   * @returns {EventStream}
   */
  touchend(el) {
    return Bacon.fromEventTarget(el, 'touchend');
  },

  /**
   * @param {Element} el
   * @returns {EventStream}
   */
  touchmove(el) {
    return Bacon.fromEventTarget(el, 'touchmove');
  },

  /**
   * @param {Element} el
   * @param {Bacon.Bus} [stopBus = new Bacon.Bus()]
   * @returns {EventStream}
   */
  swipe(el, stopBus = new Bacon.Bus()) {
    let start = this.touchstart(el).doAction('.preventDefault');
    let move  = this.touchmove(el).doAction('.preventDefault');
    let end   = this.touchend(el).doAction('.preventDefault');

    stopBus.plug(end);

    return start.flatMap(function(start) {
      return move.takeUntil(stopBus).scan({}, function(acc, move) {
        return {
          init : acc.init || start.changedTouches[0],
          curt : move.changedTouches[0]
        };
      }).skip(1);
    });
  },

  /**
   * @param {Element} [el = document.body]
   * @returns {EventStream}
   */
  swipeLeft(el = document.body) {
    let stopBus = new Bacon.Bus();

    return this.swipe(el, stopBus).filter((moves) => {
      let {init, curt} = moves;
      let delta = init.clientX - curt.clientX;
      return delta > 50 && stopBus.push(true);
    });
  },

  /**
   * @param {Element} [el = document.body]
   * @returns {EventStream}
   */
  swipeRight(el = document.body) {
    let stopBus = new Bacon.Bus();

    return this.swipe(el, stopBus).filter((moves) => {
      let {init, curt} = moves;
      let delta = init.clientX - curt.clientX;
      return delta < -50 && stopBus.push(true);
    });
  },

  /**
   * @returns {EventStream}
   */
  resize() {
    return Bacon.fromEventTarget(window, 'resize');
  },

  /**
   * @returns {EventStream}
   */
  hashchange() {
    return Bacon.fromEventTarget(window, 'hashchange');
  }
};

/**
 * @param {Number} keyCode
 * @returns {Function}
 */
function keyCodeIs(keyCode) {
  return function(event) {
    return event.keyCode === keyCode;
  };
}
