'use strict';

import assert from 'power-assert';
import * as sinon from 'sinon';
import { parse } from '../src/query';

describe('query', function() {

  it('parse query string as location.search', function() {
    let test = '?foo=test&bar=1&baz=true&qux';
    let params = parse(test);

    assert(params.foo === 'test');
    assert(params.bar === 1);
    assert(params.baz === true);
    assert(params.qux === null);

    let test2 = '?notransition=1';
    let params2 = parse(test2);

    assert(params2.notransition === 1);
  });
});
