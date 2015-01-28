'use strict';

describe('query', function() {
  let query = Talkie({api:true}).query;

  it('parse query string as location.search', function() {
    let test = '?foo=test&bar=1&baz=true&qux';
    let params = query(test);

    assert(params.foo === 'test');
    assert(params.bar === '1');
    assert(params.baz === 'true');
    assert(params.qux == null);
  });
});
