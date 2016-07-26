'use strict';

import assert from 'power-assert';
import * as sinon from 'sinon';
import KeyEvent from './libs/key-event';
import Backface from '../src/backface';
import { stylePrefixDetect } from '../src/util';

describe('backface', function() {

  it('bgImageBus', function() {
    let el = document.createElement('div');
    let {bgImage} = Backface(el);

    let slideElMock1 = document.createElement('div');
    let slideElMock2 = document.createElement('div');
    let slideElMock3 = document.createElement('div');

    slideElMock1.setAttribute('backface', '/backface1.jpg');
    slideElMock2.setAttribute('backface', '/backface2.png');
    slideElMock3.setAttribute('backface', '/backface3.gif');

    bgImage.next(slideElMock1);
    assert(el.style.backgroundImage === `url(${location.origin}/backface1.jpg)` || // webkit(based)
           el.style.backgroundImage === `url("/backface1.jpg")`); // gecko
    bgImage.next(slideElMock2);
    assert(el.style.backgroundImage === `url(${location.origin}/backface2.png)` ||
           el.style.backgroundImage === `url("/backface2.png")`);
    bgImage.next(slideElMock3);
    assert(el.style.backgroundImage === `url(${location.origin}/backface3.gif)` ||
           el.style.backgroundImage === `url("/backface3.gif")`);
  });

  it('bgFilterBus', function() {
    let el = document.createElement('div');
    let {bgFilter} = Backface(el);

    let slideElMock1 = document.createElement('div');
    let slideElMock2 = document.createElement('div');
    let slideElMock3 = document.createElement('div');

    let filterProperty = stylePrefixDetect('filter');

    slideElMock1.setAttribute('backface-filter', 'blur(1px)');
    slideElMock2.setAttribute('backface-filter', 'brightness(.3)');
    slideElMock3.setAttribute('backface-filter', 'blur(2px) brightness(.5)');

    bgFilter.next(slideElMock1);
    assert(el.style[filterProperty] === 'blur(1px)');
    bgFilter.next(slideElMock2);
    assert(el.style[filterProperty] === 'brightness(0.3)');
    bgFilter.next(slideElMock3);
    assert(el.style[filterProperty] === 'blur(2px) brightness(0.5)');
  });

});
