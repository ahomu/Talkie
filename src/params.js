'use strict';

export default parseQuery(location.search);

function parseQuery(query) {
  let ret =  {};
  query
    .slice(1, -1)
    .split('&')
    .map((keyEqVal) => keyEqVal.split('='))
    .forEach((kv) => ret[kv[0]] = kv[1]);
  return ret;
}
