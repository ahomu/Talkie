'use strict';

describe('paging', function() {
  let {paging: paging, Bacon: Bacon} = Talkie({api:true});

  function rightKey() {
    KeyEvent.simulate(39, 39); // →
  }

  function leftKey() {
    KeyEvent.simulate(37, 37); // →
  }

  it('current', function() {
    let current = paging({
      startPage : 1,
      endPage   : 3
    }).current;

    let expects = [1, 2, 3, 2, 1];
    current.onValue(function(v) {
      assert(expects.shift() === v);
      if (!expects.length) {
        return Bacon.noMore;
      }
    });
                // 1
    rightKey(); // 1 > 2
    rightKey(); // 2 > 3
    rightKey(); // 3 > 3 (skip)

    leftKey();  // 3 > 2
    leftKey();  // 2 > 1
    leftKey();  // 1 > 1 (skip)

    // TODO startPage test
  });

  it('percent', function() {
    let percent = paging({
      startPage : 1,
      endPage   : 4
    }).percent;

    let expects = ['25%', '50%', '75%', '100%'];
    percent.onValue(function(v) {
      assert(expects.shift() === v);
      if (!expects.length) {
        return Bacon.noMore;
      }
    });
                // 25%
    leftKey();  // 25% (skip)
    rightKey(); // 25% > 50%
    rightKey(); // 50% > 75%
    rightKey(); // 75% > 100%
  });

  it('onNext & onPrev', function() {
    let {onNext: next, onPrev: prev} = paging({
      startPage : 1,
      endPage   : 5
    });

    next.onValue(function(v) {
      assert(v === 1);
    });
    leftKey();

    prev.onValue(function(v) {
      assert(v === -1);
    });
    rightKey();
  });

});
