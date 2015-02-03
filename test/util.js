'use strict';

describe('util', function() {
  let util = Talkie({api:true}).util;

  it('toArray', function() {
    let args  = util.toArray(arguments);
    let nodes = util.toArray(document.querySelectorAll('*'));

    assert(Array.isArray(args));
    assert(Array.isArray(nodes));
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

    el.parentNode.removeChild(el);
  });

  it('styleAssignOf', function() {
    let el = document.createElement('div');
    el.style.width = '100%';

    assert(el.style.width === '100%');

    let assign = util.styleAssignOf(el, 'width');
    assign('50%');
    assert(el.style.width === '50%');

    el.parentNode.removeChild(el);
  });

});
