'use strict';

import assert from 'power-assert';
import sinon from 'sinon';
import pointer from '../src/pointer';

describe('pointer', function() {

  it('coordBus', function() {
    let el = document.createElement('div');
    let {coord} = pointer(el);

    coord.next({clientX : 123, clientY : 456});
    assert(el.style.left === '123px');
    assert(el.style.top === '456px');

    coord.next({clientX : 789, clientY : 123});
    assert(el.style.left === '789px');
    assert(el.style.top === '123px');
  });

  it('toggleBus', function() {
    let el = document.createElement('div');
    let {toggle} = pointer(el);

    toggle.next();
    assert(el.style.visibility === 'visible');
    toggle.next();
    assert(el.style.visibility === 'hidden');
  });
});
