'use strict';

describe('pointer', function() {
  let pointer = Talkie({api:true}).pointer;

  it('coordBus', function() {
    let el = document.createElement('div');
    let {coordBus} = pointer(el);

    coordBus.push({x: 123, y: 456});
    assert(el.style.left === '123px');
    assert(el.style.top === '456px');

    coordBus.push({x: 789, y: 123});
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
