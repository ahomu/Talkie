'use strict';

import Bacon   from 'baconjs';
import keycode from 'keycode';

const EVENT_KEYUP = Bacon.fromEventTarget(document, 'keyup');

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
   * @param {Element} el
   * @returns {EventStream}
   */
  click(el) {
    return Bacon.fromEventTarget(el, 'click');
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
