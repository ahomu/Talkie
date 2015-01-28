'use strict';

/**
 * if you want to using `to5Runtime`
 * @see https://6to5.org/optional-runtime.html
 */
require('6to5/runtime'); // Using the "require" to avoid call "to5Runtime.interopRequire()"

/**
 * if using a feature that requires a browser-polyfill
 *
 * @see https://6to5.org/polyfill.html
 */
import polyfill from '6to5/browser-polyfill';

/**
 * Talkie.js
 */
import Bacon   from 'baconjs';

import util    from './util';
import params  from './params';

import Slides  from './slides';
import Control from './control';
import Ratio   from './ratio';
import Scale   from './scale';

export default function(options = {}) {

  function rangeIs(min, max) {
    return function(z) {
      return Math.min(max, Math.max(z, min));
    };
  }

  function toInvisible(el) {
    el.removeAttribute('visible');
  }

  function toVisible(el) {
    el.setAttribute('visible', 1);
  }

  function textAssignOf(el) {
    return function(text) {
      el.textContent = text;
    };
  }

  function styleAssignOf(el, property) {
    return function(value) {
      el.style[property] = value;
    };
  }

  function percentOf(max) {
    return function(current) {
      return ((100 / max) * current) + '%';
    };
  }

  /**
   * Init slide sections
   */
  let slides  = Slides();

  /**
   * Paging control
   */
  let control = Control();

  let initialPage = params.page || 1;
  let correctPage = util.compose(rangeIs(1, slides.length), util.add);

  let both    = control.next.merge(control.prev);
  let current = both.scan(initialPage, correctPage).skipDuplicates();

  // current page
  current.onValue(textAssignOf(util.getById('page')));

  // total of page
  Bacon.once(slides.length).onValue(textAssignOf(util.getById('total')));

  // progress bar
  current.map(percentOf(slides.length)).onValue(styleAssignOf(util.getById('progress'), 'width'));

  function toggleScreenOf(el) {
    let request, exit;
    if(el.requestFullscreen) {
      request = 'requestFullscreen';
    } else if(el.webkitRequestFullscreen) {
      request = 'webkitRequestFullscreen';
    } else if(el.mozRequestFullScreen) {
      request = 'mozRequestFullScreen';
    } else if(el.msRequestFullscreen) {
      request = 'msRequestFullscreen';
    }
    if(document.exitFullscreen) {
      exit = 'exitFullscreen';
    } else if(document.webkitExitFullscreen) {
      exit = 'webkitExitFullscreen';
    } else if(document.mozCancelFullScreen) {
      exit = 'mozCancelFullScreen';
    } else if(document.msExitFullscreen) {
      exit = 'msExitFullscreen';
    }
    return function() {
      if (!document.fullscreenElement &&    // alternative standard method
          !document.mozFullScreenElement &&
          !document.webkitFullscreenElement &&
          !document.msFullscreenElement) {
        el[request]();
      } else {
        document[exit]();
      }
    };
  }

  // full screen
  control.f.onValue(toggleScreenOf(document.body));

  // slide visibility
  Bacon.combineAsArray(current, slides)
    .onValue(function(data) {
      let [current, all] = data;
      all.forEach(toInvisible);
      toVisible(all[current - 1 /* fix page to index */]);
    });

  /**
   * Scaling
   */
  let ratio = Ratio(options);
  let scale = Scale();

  ratio.onValue(scale);
  Bacon.once(ratio).onValue(scale);
}
