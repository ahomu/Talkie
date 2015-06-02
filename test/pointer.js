'use strict';

import assert from 'power-assert';
import sinon from 'sinon';
import pointer from '../src/pointer';

describe('pointer', function() {

  it('coordBus', function() {
    let el = document.createElement('div');
    let {coordBus} = pointer(el);

    coordBus.push({clientX: 123, clientY: 456});
    assert(el.style.left === '123px');
    assert(el.style.top === '456px');

    coordBus.push({clientX: 789, clientY: 123});
    assert(el.style.left === '789px');
    assert(el.style.top === '123px');
  });

  it('toggleBus', function() {
    let el = document.createElement('div');
    let {toggleBus} = pointer(el);

    assert(el.style.visibility === 'hidden');
    toggleBus.push();
    assert(el.style.visibility === 'visible');
    toggleBus.push();
    assert(el.style.visibility === 'hidden');
  });
});
