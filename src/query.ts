/// <reference path="../typings/myself.d.ts" />
/// <reference path="../typings/browser.d.ts" />
/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />

'use strict';

import { getPrimitiveFromString } from './util';

/**
 * query parameters
 */
export function parse(query: string) {

  const ret: { [key: string]: string } = {};

  query
    .slice(1)
    .split('&')
    .map((keyEqVal) => keyEqVal.split('='))
    .forEach((kv) => ret[kv[0]] = getPrimitiveFromString(kv[1]));

  return ret;
}
