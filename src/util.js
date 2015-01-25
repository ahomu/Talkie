'use strict';

export default {
  /**
   * @param {array} list
   * @returns {Array.<T>}
   */
  toArray(list) {
    return Array.prototype.slice.call(list);
  },
  /**
   * @param {function} fn...
   * @returns {Function}
   */
  compose() {
    // http://underscorejs.org/#compose
    let args = arguments;
    let start = args.length - 1;
    return function() {
      let i = start;
      let result = args[start].apply(this, arguments);
      while (i--) {
        result = args[i].call(this, result);
      }
      return result;
    };
  },
  /**
   * @param {string} ident
   * @returns {HTMLElement}
   */
  getById(ident) {
    return document.getElementById(ident);
  },
  /**
   * @param {number} x
   * @param {number} y
   * @returns {number}
   */
  add(x, y) {
    return x + y;
  }
};
