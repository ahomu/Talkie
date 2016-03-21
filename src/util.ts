/// <reference path="../typings/myself.d.ts" />
/// <reference path="../typings/browser.d.ts" />

'use strict';

import assign = require('object-assign');

export default {
  /**
   * @param {array} list
   * @returns {Array.<T>}
   */
  toArray(list: any[]) {
    return Array.prototype.slice.call(list);
  },

  /**
   * @param {Object} orig
   * @param {Object} defaults
   * @returns {Object}
   */
  defaults(orig: any, defaults: any) {
    let ret = this.clone(orig);
    Object.keys(defaults).forEach((k) => {
      if (k in ret) {
        return;
      }
      ret[k] = defaults[k];
    });
    return ret;
  },

  /**
   * shallow clone func
   *
   * @param {Object} orig
   * @returns {Object}
   */
  clone(orig: any) {
    let ret: { [key: string]: any } = {};
    Object.keys(orig).forEach((k) => ret[k] = orig[k]);
    return ret;
  },

  /**
   * @param {Object} target
   * @param {Object} ...sources
   */
  extend : assign,

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
  getById(ident: string) {
    return document.getElementById(ident);
  },

  /**
   * @param {Element} el
   */
  textAssignOf(el: HTMLElement) {
    return function(text: string) {
      el.textContent = text;
    };
  },

  /**
   * @param {Element} el
   * @param {String} property
   */
  styleAssignOf(el: HTMLElement, property: string) {
    return function(value: string) {
      (el.style as any)[property] = value === '' ? null : value;
    };
  },

  /**
   * @param {Element} el
   * @param {String} attribute
   */
  attributeAssignOf(el: HTMLElement, attribute: string) {
    return function(value: string) {
      if (value != null) {
        el.setAttribute(attribute, value);
      } else {
        el.removeAttribute(attribute);
      }
    };
  },

  /**
   * @param {String} src
   */
  preloadImg(src: string) {
    let img = document.createElement('img');
    img.onload = () => img.parentNode.removeChild(img);
    img.src = src;
    img.style.display = 'none';
    document.body.appendChild(img);
  },

  /**
   * @returns {Number}
   */
  getPageNumberFromHash() {
    return parseInt(location.hash.replace('#/', ''), 10) || 0;
  },

  /**
   * @returns {*}
   */
  getPrimitiveFromString(str: string) {
    let ret: any = (str == null) ? null : str + '';

    if (str === 'true') {
      ret = true;
    } else if (str === 'false') {
      ret = false;
    } else if (str == null) {
      ret = null;
    } else if (str.match(/^\d+$/)) {
      ret = parseInt(str, 10);
    }

    return ret;
  },

  /**
   * @param {String} property
   * @returns {String}
   */
  stylePrefixDetect(property: string) {
    let validProperty: string;
    let styles = this.toArray(window.getComputedStyle(document.documentElement, ''));

    function includes(needle: string) {
      return styles.indexOf(needle) !== -1;
    }

    if (includes(`-webkit-${property}`)) {
      validProperty = `-webkit-${property}`;
    } else if (includes(`-moz-${property}`)) {
      validProperty = `-moz-${property}`;
    } else if (includes(`-ms-${property}`)) {
      validProperty = `-ms-${property}`;
    } else if (includes(property)) {
      validProperty = property;
    }

    return validProperty;
  }
};
