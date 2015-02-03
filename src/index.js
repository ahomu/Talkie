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
import Responsive from './responsive';

const IDENT_NEXT     = 'next';
const IDENT_PREV     = 'prev';
const IDENT_SCALER   = 'scaler';
const IDENT_CONTROL  = 'control';
const IDENT_PAGE     = 'page';
const IDENT_TOTAL    = 'total';
const IDENT_PROGRESS = 'progress';
const MIME_MARKDOWN  = 'text/x-markdown';
const ATTR_LAYOUT    = 'layout';

const NORMAL_WIDTH  = 1024;
const NORMAL_HEIGHT = 768;
const WIDE_WIDTH    = 1366;
const WIDE_HEIGHT   = 768;

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
      responsive : Responsive,
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
   * Init slide sizes
   */
  let width  = options.wide ? WIDE_WIDTH  : NORMAL_WIDTH;
  let height = options.wide ? WIDE_HEIGHT : NORMAL_HEIGHT;
  document.querySelector('head').insertAdjacentHTML('beforeend', `
    <style>
      #${IDENT_SCALER},
      [layout] {
        width: ${width}px !important;
        height: ${height}px !important;
      }
    </style>`
  );

  /**
   * Init slide sections
   */
  util.toArray(document.querySelectorAll(`[type="${MIME_MARKDOWN}"]`)).forEach(Markdown);
  let slides = util.toArray(document.querySelectorAll(`[${ATTR_LAYOUT}]`));

  /**
   * Responsive scaling
   */
  document.body.insertAdjacentHTML('beforeend', `
    <div id="${IDENT_SCALER}"></div>
  `);
  let scalerEl = util.getById(IDENT_SCALER);
  slides.forEach((el) => scalerEl.appendChild(el));

  let ratio = Responsive({
    width  : width,
    height : height,
    target : scalerEl
  });
  ratio.plug(control.resize());

  /**
   * Paging control
   */
  let paging = Paging({
    startPage     : params.startPage || 1,
    endPage       : slides.length,
    slideElements : slides
  });

  paging.nextBus.plug(control.key('right'));
  paging.nextBus.plug(control.key('space'));
  paging.prevBus.plug(control.key('left'));

  /**
   * Insert Ui Elements
   */
  if (options.control) {
    document.body.insertAdjacentHTML('beforeend', `
      <div id="${IDENT_CONTROL}">
        <p><span id="${IDENT_PREV}">&lt;</span>
        Page <span id="${IDENT_PAGE}">0</span> of <span id="${IDENT_TOTAL}">0</span>
        <span id="${IDENT_NEXT}">&gt;</span></p>
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
    document.body.insertAdjacentHTML('beforeend', `<div id="${IDENT_PROGRESS}"></div>`);

    // progress bar
    paging.percentEs.onValue(util.styleAssignOf(util.getById(IDENT_PROGRESS), 'width'));
  }

  /**
   * FullScreen
   */
  FullScreen(document.body).plug(control.key('f'));
}
