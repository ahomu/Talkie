'use strict';

describe('util', function() {
  let util = Talkie({api:true}).util;

  it('toArray', function() {
    let args  = util.toArray(arguments);
    let nodes = util.toArray(document.querySelectorAll('*'));

    assert(Array.isArray(args));
    assert(Array.isArray(nodes));
  });

  it('defaults', function() {
    let orig = {
      foo: 1,
      qux: 'hahaha'
    };

    let proc = util.defaults(orig, {
      foo: 0,
      bar: false,
      baz: undefined,
      qux: 'wryyy'
    });

    assert(orig !== proc);
    assert(proc.foo === 1);
    assert(proc.bar === false);
    assert(proc.baz === undefined);
    assert(proc.qux === 'hahaha');
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

  it('textAssignOf', function() {
    let el = document.createElement('div');
    el.textContent = 'hoge';

    assert(el.textContent === 'hoge');

    let assign = util.textAssignOf(el);
    assign('fuga');
    assert(el.textContent === 'fuga');
  });

  it('styleAssignOf', function() {
    let el = document.createElement('div');
    el.style.width = '100%';

    assert(el.style.width === '100%');

    let assign = util.styleAssignOf(el, 'width');
    assign('50%');
    assert(el.style.width === '50%');
  });

  it('getPageNumberFromHash', function() {
    location.hash = '123';
    assert(util.getPageNumberFromHash() === 123);

    location.hash = '';
    assert(util.getPageNumberFromHash() === 0);
  });

  it('stylePrefixDetect', function() {
    let transform = util.stylePrefixDetect('transform');
    assert(transform != null);

    let filter = util.stylePrefixDetect('filter');
    assert(filter != null);

    let unknown = util.stylePrefixDetect('unknown');
    assert(unknown == null)
  });
});
