'use strict';

import assert from 'power-assert';
import sinon from 'sinon';
import query from '../src/query';

describe('query', function() {

  it('parse query string as location.search', function() {
    let test = '?foo=test&bar=1&baz=true&qux';
    let params = query(test);

    assert(params.foo === 'test');
    assert(params.bar === 1);
    assert(params.baz === true);
    assert(params.qux === null);

    let test2 = '?notransition=1';
    let params2 = query(test2);

    assert(params2.notransition === 1);
  });
});
