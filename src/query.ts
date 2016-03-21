/// <reference path="../typings/myself.d.ts" />
/// <reference path="../typings/browser.d.ts" />

'use strict';

import util from './util';

/**
 * query parameters
 */
export default parseQuery;

/**
 * @param {String} query
 * @returns {Object}
 */
function parseQuery(query: string) {

  let ret: { [key: string]: string } = {};

  query
    .slice(1)
    .split('&')
    .map((keyEqVal) => keyEqVal.split('='))
    .forEach((kv) => ret[kv[0]] = util.getPrimitiveFromString(kv[1]));

  return ret;
}
