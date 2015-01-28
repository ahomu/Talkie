'use strict';

describe('util', function() {
  let util = Talkie({api:true}).util;

  it('toArray', function() {
    let args  = util.toArray(arguments);
    let nodes = util.toArray(document.querySelectorAll('*'));

    assert(Array.isArray(args))
    assert(Array.isArray(nodes))
  });

  it('compose', function() {
    let fn = util.compose(function(y) {
      return y * 2;
    }, function(x) {
      return x + 1;
    });

    assert(fn(1) === 4);
    assert(fn(3) === 8);
  });

  it('getById', function() {
    let el = document.createElement('div');
    el.id = 'test';
    document.body.appendChild(el);

    assert(util.getById('test') === el);

    el.parentNode.removeChild(el);
  });

});
