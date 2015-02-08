'use strict';

describe('paging', function() {
  let {paging: Paging, control: control, Bacon: Bacon} = Talkie({api:true});

  function rightKey() {
    KeyEvent.simulate(39, 39); // →
  }

  function leftKey() {
    KeyEvent.simulate(37, 37); // →
  }

  function downKey() {
    KeyEvent.simulate(40, 40); // ↓
  }

  it('endPage & nextBus & prevBus', function(done) {
    let paging = Paging({
      startPage : 1,
      endPage   : 3,
      slideElements: []
    });

    let current = paging.currentEs;
    let expects = [1, 2, 3, 2, 1];
    current.onValue(function(v) {
      assert(expects.shift() === v);
      if (!expects.length) {
        done();
        return Bacon.noMore;
      }
    });

    paging.nextBus.plug(control.key(39));
    paging.prevBus.plug(control.key(37));

                // 1
    rightKey(); // 1 > 2
    rightKey(); // 2 > 3
    rightKey(); // 3 > 3 (skip)

    leftKey();  // 3 > 2
    leftKey();  // 2 > 1
    leftKey();  // 1 > 1 (skip)
  });

  it('startPage & moveBus', function(done) {
    let paging = Paging({
      startPage : 2,
      endPage   : 3,
      slideElements: []
    });

    let current = paging.currentEs;
    let expects = [2, 1, 3, 2];
    current.onValue(function(v) {
      assert(expects.shift() === v);
      if (!expects.length) {
        done();
        return Bacon.noMore;
      }
    });

    paging.nextBus.plug(control.key(39));
    paging.prevBus.plug(control.key(37));
    paging.moveBus.plug(control.key(40).map(3));

                // 2
    leftKey();  // 2 > 1
    downKey();  // 1 > 3
    downKey();  // 3 > 3 (skip)
    leftKey();  // 3 > 2
  });

  it('percentEs', function(done) {
    let paging = Paging({
      startPage : 1,
      endPage   : 4,
      slideElements: []
    });
    paging.nextBus.plug(control.key(39));
    paging.prevBus.plug(control.key(37));

    let percent = paging.percentEs;
    let expects = ['25%', '50%', '75%', '100%'];
    percent.onValue(function(v) {
      assert(expects.shift() === v);
      if (!expects.length) {
        done();
        return Bacon.noMore;
      }
    });
                // 25%
    leftKey();  // 25% (skip)
    rightKey(); // 25% > 50%
    rightKey(); // 50% > 75%
    rightKey(); // 75% > 100%
  });

  it('changedEs', function(done) {
    let el1 = document.createElement('section');
    let el2 = document.createElement('section');
    let el3 = document.createElement('section');

    el1.id = 'i1';
    el2.id = 'i2';
    el3.id = 'i3';
    let paging = Paging({
      startPage : 1,
      endPage   : 3,
      slideElements: [el1, el2, el3]
    });
    paging.nextBus.plug(control.key(39));
    paging.prevBus.plug(control.key(37));

    let expects = [el1, el2, el3];
    paging.changedEs.onValue(function(v) {
      assert(expects.shift() === v);
      if (!expects.length) {
        done();
        return Bacon.noMore;
      }
    });
                // 1
    rightKey(); // 1 > 2
    rightKey(); // 2 > 3
  });

  it('startEs & endEs', function() {
    let paging = Paging({
      startPage : 1,
      endPage   : 3,
      slideElements: []
    });
    paging.nextBus.plug(control.key(39));
    paging.prevBus.plug(control.key(37));

    let start = paging.startEs;
    let end   = paging.endEs;

    rightKey(); // 1 > 2

    start.onValue(function(v) {
      assert(1 === v);
      return Bacon.noMore;
    });
    leftKey(); // 2 > 1

    end.onValue(function(v) {
      assert(3 === v);
      return Bacon.noMore;
    });
    rightKey(); // 1 > 2
    rightKey(); // 2 > 3

  });

  it('visible & invisible', function() {
    let el1 = document.createElement('section');
    let el2 = document.createElement('section');
    let el3 = document.createElement('section');

    let paging = Paging({
      startPage : 1,
      endPage   : 3,
      slideElements: [el1, el2, el3]
    });
    paging.nextBus.plug(control.key(39));
    paging.prevBus.plug(control.key(37));

    assert(el1.getAttribute('visible') === '1');
    assert(el2.getAttribute('visible') === null);
    assert(el3.getAttribute('visible') === null);

    rightKey(); // 1 > 2

    assert(el1.getAttribute('visible') === null);
    assert(el2.getAttribute('visible') === '1');
    assert(el3.getAttribute('visible') === null);

    rightKey(); // 2 > 3

    assert(el1.getAttribute('visible') === null);
    assert(el2.getAttribute('visible') === null);
    assert(el3.getAttribute('visible') === '1');

    leftKey(); // 2 > 1

    assert(el1.getAttribute('visible') === null);
    assert(el2.getAttribute('visible') === '1');
    assert(el3.getAttribute('visible') === null);
  });
});
