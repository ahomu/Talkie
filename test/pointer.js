'use strict';

import assert from 'power-assert';
import * as sinon from 'sinon';
import Pointer from '../src/pointer';

describe('pointer', function() {

  it('coordBus', function() {
    let el = document.createElement('div');
    let {ptCoord} = Pointer(el);

    ptCoord.next({clientX : 123, clientY : 456});
    assert(el.style.left === '123px');
    assert(el.style.top === '456px');

    ptCoord.next({clientX : 789, clientY : 123});
    assert(el.style.left === '789px');
    assert(el.style.top === '123px');
  });

  it('toggleBus', function() {
    let el = document.createElement('div');
    let {ptToggle} = Pointer(el);

    ptToggle.next();
    assert(el.getAttribute('aria-hidden') === 'false');
    ptToggle.next();
    assert(el.getAttribute('aria-hidden') === 'true');
  });
});
