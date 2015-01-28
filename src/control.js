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
    let keyCode;

    if (typeof(charKey) === 'string') {
      keyCode = keycode(charKey);
    }

    return EVENT_KEYUP.filter(keyCodeIs(keyCode));
  },

  /**
   * @param {Element} el
   * @returns {EventStream}
   */
  click(el) {
    return Bacon.fromEventTarget(el, 'click');
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
