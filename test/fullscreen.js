'use strict';

import assert from 'power-assert';
import * as sinon from 'sinon';
import fullScreen from '../src/fullscreen';

describe('fullscreen', function() {

  // TODO implement
  // Failed to execute 'requestFullScreen' on 'Element': API can only be initiated by a user gesture...
  it('fullscreen request & exit');

  //  let request, exit;
  //
  //  if(document.body.requestFullscreen) {
  //    request = 'requestFullscreen';
  //  } else if(document.body.webkitRequestFullscreen) {
  //    request = 'webkitRequestFullscreen';
  //  } else if(document.body.mozRequestFullScreen) {
  //    request = 'mozRequestFullScreen';
  //  } else if(document.body.msRequestFullscreen) {
  //    request = 'msRequestFullscreen';
  //  }
  //
  //  if(document.exitFullscreen) {
  //    exit = 'exitFullscreen';
  //  } else if(document.webkitExitFullscreen) {
  //    exit = 'webkitExitFullscreen';
  //  } else if(document.mozCancelFullScreen) {
  //    exit = 'mozCancelFullScreen';
  //  } else if(document.msExitFullscreen) {
  //    exit = 'msExitFullscreen';
  //  }
  //
  //  let target = document.createElement('div');
  //  let requestSpy = sinon.spy(target, request);
  //  let exitSpy    = sinon.spy(document, exit);
  //
  //  document.body.appendChild(target);
  //  fullscreen(target);
  //
  //  KeyEvent.simulate(70, 70); // 'f'
  //  assert(requestSpy.calledOnce);
  //  KeyEvent.simulate(70, 70); // 'f'
  //  assert(exitSpy.calledOnce);
  //});

  //function(done) {
  //  let target = document.createElement('div');
  //  document.body.appendChild(target);
  //  fullscreen(target);
  //
  //  KeyEvent.simulate(70, 70); // 'f'
  //
  //  let fEl = document.fullscreenElement ||
  //    document.mozFullScreenElement ||
  //    document.webkitFullscreenElement ||
  //    document.msFullscreenElement;
  //
  //  assert(fEl === target);
  //
  //  KeyEvent.simulate(70, 70);
  //
  //  assert(fEl == null);
  //
  //  target.parentNode.removeChild(target);
  //});

});
