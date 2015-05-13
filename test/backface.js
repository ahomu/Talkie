'use strict';

import assert from 'power-assert';
import sinon from 'sinon';
import KeyEvent from './libs/key-event';
import backface from '../src/backface';
import util from '../src/util';

describe('backface', function() {

  it('bgImageBus', function() {
    let el = document.createElement('div');
    let {bgImageBus} = backface(el);

    let slideElMock1 = document.createElement('div');
    let slideElMock2 = document.createElement('div');
    let slideElMock3 = document.createElement('div');

    slideElMock1.setAttribute('backface', '/backface1.jpg');
    slideElMock2.setAttribute('backface', '/backface2.png');
    slideElMock3.setAttribute('backface', '/backface3.gif');

    bgImageBus.push(slideElMock1);
    assert(el.style.backgroundImage === `url(${location.origin}/backface1.jpg)` || // webkit(based)
           el.style.backgroundImage === `url("/backface1.jpg")`); // gecko
    bgImageBus.push(slideElMock2);
    assert(el.style.backgroundImage === `url(${location.origin}/backface2.png)` ||
           el.style.backgroundImage === `url("/backface2.png")`);
    bgImageBus.push(slideElMock3);
    assert(el.style.backgroundImage === `url(${location.origin}/backface3.gif)` ||
           el.style.backgroundImage === `url("/backface3.gif")`);
  });

  it('bgFilterBus', function() {
    let el = document.createElement('div');
    let {bgFilterBus} = backface(el);

    let slideElMock1 = document.createElement('div');
    let slideElMock2 = document.createElement('div');
    let slideElMock3 = document.createElement('div');

    let filterProperty = util.stylePrefixDetect('filter');

    slideElMock1.setAttribute('backface-filter', 'blur(1px)');
    slideElMock2.setAttribute('backface-filter', 'brightness(.3)');
    slideElMock3.setAttribute('backface-filter', 'blur(2px) brightness(.5)');

    bgFilterBus.push(slideElMock1);
    assert(el.style[filterProperty] === 'blur(1px)');
    bgFilterBus.push(slideElMock2);
    assert(el.style[filterProperty] === 'brightness(0.3)');
    bgFilterBus.push(slideElMock3);
    assert(el.style[filterProperty] === 'blur(2px) brightness(0.5)');
  });

});
