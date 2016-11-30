/// <reference path="../typings/myself.d.ts" />

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
