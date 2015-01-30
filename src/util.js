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
   * TODO test
   * @param {Object} orig
   * @param {Object} defaults
   * @returns {Object}
   */
  defaults(orig, defaults) {
    let ret = this.clone(orig);
    Object.keys(defaults).forEach((k)=> {
      if (k in ret) {
        return;
      }
      ret[k] = defaults[k];
    });
    return ret;
  },
  /**
   * TODO test
   * @param {Object} orig
   * @returns {Object}
   */
  clone(orig) {
    let ret = {};
    Object.keys(orig).forEach((k)=> ret[k] = orig[k]);
    return ret;
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
   * @param {Element} el
   */
  textAssignOf(el) {
    return function(text) {
      el.textContent = text;
    };
  },

/**
 * @param {Element} el
 * @param {String} property
 */
  styleAssignOf(el, property) {
    return function(value) {
      el.style[property] = value;
    };
  }
};
