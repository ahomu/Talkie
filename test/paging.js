'use strict';

import { Subscription } from 'rxjs/Subscription';
import assert from 'power-assert';
import * as sinon from 'sinon';
import KeyEvent from './libs/key-event';
import Paging from '../src/paging';
import { keydown } from '../src/control';

describe('paging', function() {

  let subscriptions;

  beforeEach(function() {
    subscriptions = new Subscription();
  });

  afterEach(function() {
    subscriptions.unsubscribe();
  });

  function rightKey() {
    KeyEvent.simulate(39, 39); // →
  }

  function leftKey() {
    KeyEvent.simulate(37, 37); // →
  }

  function downKey() {
    KeyEvent.simulate(40, 40); // ↓
  }

  it('endPage & next & prev', function(done) {
    let paging = Paging({
      startPage     : 1,
      endPage       : 3,
      slideElements : []
    });

    let current = paging.current;
    let expects = [1, 2, 3, 2, 1];
    subscriptions.add(current.subscribe(function(v) {
      assert(expects.shift() === v);
      if (!expects.length) {
        return done();
      }
    }));

    subscriptions.add(keydown(39).subscribe(paging.next));
    subscriptions.add(keydown(37).subscribe(paging.prev));

                // 1
    rightKey(); // 1 > 2
    rightKey(); // 2 > 3
    rightKey(); // 3 > 3 (skip)

    leftKey();  // 3 > 2
    leftKey();  // 2 > 1
    leftKey();  // 1 > 1 (skip)
  });

  it('startPage & move', function(done) {
    let paging = Paging({
      startPage     : 2,
      endPage       : 3,
      slideElements : []
    });

    let current = paging.current;
    let expects = [2, 1, 3, 2];
    subscriptions.add(current.subscribe(function(v) {
      assert(expects.shift() === v);
      if (!expects.length) {
        return done();
      }
    }));

    subscriptions.add(keydown(39).subscribe(paging.next));
    subscriptions.add(keydown(37).subscribe(paging.prev));
    subscriptions.add(keydown(40).map(() => 3).subscribe(paging.move));

                // 2
    leftKey();  // 2 > 1
    downKey();  // 1 > 3
    downKey();  // 3 > 3 (skip)
    leftKey();  // 3 > 2
  });

  it('percent', function(done) {
    let paging = Paging({
      startPage     : 1,
      endPage       : 4,
      slideElements : []
    });

    let percent = paging.percent;
    let expects = ['25%', '50%', '75%', '100%'];
    subscriptions.add(percent.subscribe(function(v) {
      assert(expects.shift() === v);
      if (!expects.length) {
        return done();
      }
    }));

    subscriptions.add(keydown(39).subscribe(paging.next));
    subscriptions.add(keydown(37).subscribe(paging.prev));

    // 25%
    leftKey();  // 25% (skip)
    rightKey(); // 25% > 50%
    rightKey(); // 50% > 75%
    rightKey(); // 75% > 100%
  });

  it('changed', function(done) {
    let el1 = document.createElement('section');
    let el2 = document.createElement('section');
    let el3 = document.createElement('section');

    el1.id = 'i1';
    el2.id = 'i2';
    el3.id = 'i3';

    let paging = Paging({
      startPage     : 1,
      endPage       : 3,
      slideElements : [el1, el2, el3]
    });

    let expects = [el1, el2, el3];
    subscriptions.add(paging.changed.subscribe(function(v) {
      assert(expects.shift() === v);
      if (!expects.length) {
        return done();
      }
    }));

    subscriptions.add(keydown(39).subscribe(paging.next));
    subscriptions.add(keydown(37).subscribe(paging.prev));

                // 1
    rightKey(); // 1 > 2
    rightKey(); // 2 > 3
  });

  it('start & end', function() {
    let paging = Paging({
      startPage     : 1,
      endPage       : 3,
      slideElements : []
    });

    subscriptions.add(keydown(39).subscribe(paging.next));
    subscriptions.add(keydown(37).subscribe(paging.prev));

    const {start, end} = paging;

    rightKey(); // 1 > 2

    subscriptions.add(start.subscribe(function(v) {
      assert(v === 1);
    }));
    leftKey(); // 2 > 1

    subscriptions.add(end.subscribe(function(v) {
      assert(v === 3);
    }));
    rightKey(); // 1 > 2
    rightKey(); // 2 > 3

  });

  it('visible & invisible', function() {
    let el1 = document.createElement('section');
    let el2 = document.createElement('section');
    let el3 = document.createElement('section');

    let paging = Paging({
      startPage     : 1,
      endPage       : 3,
      slideElements : [el1, el2, el3]
    });

    subscriptions.add(keydown(39).subscribe(paging.next));
    subscriptions.add(keydown(37).subscribe(paging.prev));

    assert(el1.getAttribute('aria-hidden') === 'false');
    assert(el2.getAttribute('aria-hidden') === 'true');
    assert(el3.getAttribute('aria-hidden') === 'true');

    rightKey(); // 1 > 2

    assert(el1.getAttribute('aria-hidden') === 'true');
    assert(el2.getAttribute('aria-hidden') === 'false');
    assert(el3.getAttribute('aria-hidden') === 'true');

    rightKey(); // 2 > 3

    assert(el1.getAttribute('aria-hidden') === 'true');
    assert(el2.getAttribute('aria-hidden') === 'true');
    assert(el3.getAttribute('aria-hidden') === 'false');

    leftKey(); // 2 > 1

    assert(el1.getAttribute('aria-hidden') === 'true');
    assert(el2.getAttribute('aria-hidden') === 'false');
    assert(el3.getAttribute('aria-hidden') === 'true');
  });
});
