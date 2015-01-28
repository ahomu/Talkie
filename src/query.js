'use strict';

/**
 * query parameters
 */
export default parseQuery;

/**
 * @param {String} query
 * @returns {Object}
 */
function parseQuery(query) {
  let ret =  {};
  query
    .slice(1, -1)
    .split('&')
    .map((keyEqVal) => keyEqVal.split('='))
    .forEach((kv) => ret[kv[0]] = kv[1]);
  return ret;
}
