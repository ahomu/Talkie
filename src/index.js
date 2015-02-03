'use strict';

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
import control from './control';
import query   from './query';

import Markdown   from './markdown';
import Paging     from './paging';
import FullScreen from './fullscreen';
import Ratio      from './ratio';
import Scale      from './scale';

const IDENT_NEXT     = 'next';
const IDENT_PREV     = 'prev';
const IDENT_SCALER   = 'scaler';
const IDENT_PAGE     = 'page';
const IDENT_TOTAL    = 'total';
const IDENT_PROGRESS = 'progress';
const MIME_MARKDOWN  = 'text/x-markdown';
const ATTR_LAYOUT    = 'layout';

/**
 * @typedef {Object} TalkieOptions
 * @property {Boolean} [api]
 * @property {Boolean} [wide]
 * @property {Boolean} [control]
 * @property {Boolean} [progress]
 */

/**
 * @param {TalkieOptions} options
 */
export default function(options = {}) {
  if (options.api) {
    return {
      main       : main,
      util       : util,
      control    : control,
      query      : query,
      markdown   : Markdown,
      paging     : Paging,
      fullScreen : FullScreen,
      ratio      : Ratio,
      scale      : Scale,
      Bacon      : Bacon
    };
  } else {
    return main(options);
  }
}

/**
 * @param {TalkieOptions} _options
 */
function main(_options = {}) {

  /**
   * apply default options
   * @type {*|Object}
   */
  let options = util.defaults(_options, {
    api      : false,
    wide     : true,
    control  : true,
    progress : true
  });

  /**
   * Get params from query strings
   */
  let params = query(location.search);

  /**
   * Init slide sections
   */
  util.toArray(document.querySelectorAll(`[type="${MIME_MARKDOWN}"]`)).forEach(Markdown);
  let slides = util.toArray(document.querySelectorAll(`[${ATTR_LAYOUT}]`));

  /**
   * FullScreen
   */
  FullScreen(document.body).plug(control.key('f'));

  /**
   * Scaling
   * FIXME refactor I/F
   */
  document.body.insertAdjacentHTML('beforeend', `
    <div id="scaler"></div>
  `);

  let scalerEl = util.getById(IDENT_SCALER);
  let ratio = Ratio({wide: options.wide});
  let scale = Scale({target: scalerEl});

  slides.forEach((e) => scalerEl.appendChild(e));
  ratio.onValue(scale);
  Bacon.once(ratio).onValue(scale);

  /**
   * Paging control
   */
  let paging = Paging({
    startPage     : params.startPage || 1,
    endPage       : slides.length,
    slideElements : slides
  });

  paging.nextBus.plug(control.key('right'));
  paging.prevBus.plug(control.key('left'));

  /**
   * Insert Ui Elements
   */
  if (options.control) {
    document.body.insertAdjacentHTML('beforeend', `
      <div id="control">
        <p><span id="prev">&lt;</span>
        Page <span id="page">0</span> of <span id="total">0</span>
        <span id="next">&gt;</span></p>
      </div>
    `);

    let nextEl = util.getById(IDENT_NEXT);
    let prevEl = util.getById(IDENT_PREV);

    // next button
    paging.nextBus.plug(control.click(nextEl));

    // prev button
    paging.prevBus.plug(control.click(prevEl));

    // current page
    paging.currentEs.onValue(util.textAssignOf(util.getById(IDENT_PAGE)));

    // total of page
    Bacon.once(slides.length).onValue(util.textAssignOf(util.getById(IDENT_TOTAL)));
  }

  if (options.progress) {
    document.body.insertAdjacentHTML('beforeend', `<div id="progress"></div>`);

    // progress bar
    paging.percentEs.onValue(util.styleAssignOf(util.getById(IDENT_PROGRESS), 'width'));
  }
}

