'use strict';

/**
 * if using a feature that requires a browser-polyfill
 * @see https://babeljs.io/docs/usage/polyfill/
 */
require('babel/browser-polyfill');
/**
 * Talkie.js
 */
import Bacon   from 'baconjs';

import util    from './util';
import control from './control';
import query   from './query';

import $slide      from './slide';
import $paging     from './paging';
import $fullScreen from './fullscreen';
import $responsive from './responsive';
import $pointer    from './pointer';
import $backface   from './backface';

const IDENT_NEXT     = 'next';
const IDENT_PREV     = 'prev';
const IDENT_SCALER   = 'scaler';
const IDENT_CONTROL  = 'control';
const IDENT_PAGE     = 'page';
const IDENT_TOTAL    = 'total';
const IDENT_PROGRESS = 'progress';
const IDENT_POINTER  = 'pointer';
const IDENT_BACKFACE = 'backface';

const SELECTOR_MD = '[type="text/x-markdown"]';

const ATTR_LAYOUT   = 'layout';
const ATTR_BODY_BG  = 'body-bg';
const ATTR_NO_TRANS = 'no-transition';

const NORMAL_WIDTH  = 1024;
const NORMAL_HEIGHT = 768;
const WIDE_WIDTH    = 1366;
const WIDE_HEIGHT   = 768;

/**
 * @typedef {Object} TalkieOptions
 * @property {Boolean} [api]
 * @property {Boolean} [wide]
 * @property {Boolean} [control]
 * @property {Boolean} [pointer]
 * @property {Boolean} [progress]
 * @property {Boolean} [backface]
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
      slide      : $slide,
      paging     : $paging,
      fullScreen : $fullScreen,
      responsive : $responsive,
      pointer    : $pointer,
      backface   : $backface,
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
  let options = util.extend(util.defaults(_options, {
    api          : false,
    wide         : false,
    control      : true,
    pointer      : true,
    progress     : true,
    backface     : true,
    notransition : false
  }), query(location.search));

  /**
   * Init slide sizes
   */
  let width  = options.wide ? WIDE_WIDTH : NORMAL_WIDTH;
  let height = options.wide ? WIDE_HEIGHT : NORMAL_HEIGHT;
  document.querySelector('head').insertAdjacentHTML('beforeend', `
    <style>
      [layout],
      #${IDENT_SCALER} {
        width: ${width}px !important;
        height: ${height}px !important;
      }
    </style>`
  );

  /**
   * Init slide sections
   */
  let mds = util.toArray(document.querySelectorAll(SELECTOR_MD));
  mds.forEach($slide.compileMarkdown);
  let slides = util.toArray(document.querySelectorAll(`[${ATTR_LAYOUT}]`));
  let notes  = slides.map($slide.extractNote);

  /**
   * Responsive scaling
   */
  document.body.insertAdjacentHTML('beforeend', `
    <div id="${IDENT_SCALER}"></div>
  `);
  let scalerEl = util.getById(IDENT_SCALER);
  slides.forEach((el) => scalerEl.appendChild(el));

  let responsive = $responsive({
    width  : width,
    height : height,
    target : scalerEl
  });
  responsive.scaleBus.plug(control.resize());

  /**
   * Paging control
   */
  let paging = $paging({
    startPage     : util.getPageNumberFromHash() || 1,
    endPage       : slides.length,
    slideElements : slides
  });

  paging.nextBus.plug(control.keydown('right').throttle(100));
  paging.prevBus.plug(control.keydown('left').throttle(100));

  paging.nextBus.plug(control.swipeLeft());
  paging.prevBus.plug(control.swipeRight());

  // sync location.hash
  paging.moveBus.plug(control.hashchange().map(util.getPageNumberFromHash));
  paging.currentEs.onValue((page) => {
    (page === 1 && !location.hash) || (location.hash = page);
  });

  // sync body background attribute
  paging.changedEs
    .map('.getAttribute', ATTR_LAYOUT)
    .onValue(util.attributeAssignOf(document.body, ATTR_BODY_BG));

  /**
   * Insert Ui Elements
   */
  if (options.notransition) {
    Bacon.once(1)
      .onValue(util.attributeAssignOf(document.body, ATTR_NO_TRANS));
  }

  if (options.pointer) {
    document.body.insertAdjacentHTML('beforeend', `<div id="${IDENT_POINTER}"></div>`);
    let {coordBus, toggleBus} = $pointer(util.getById(IDENT_POINTER));
    coordBus.plug(control.mousemove());
    toggleBus.plug(control.key('b'));
  }

  if (options.backface) {
    document.body.insertAdjacentHTML('beforeend', `<div id="${IDENT_BACKFACE}"></div>`);
    let {bgImageBus, bgFilterBus} = $backface(util.getById(IDENT_BACKFACE));
    bgImageBus.plug(paging.changedEs);
    bgFilterBus.plug(paging.changedEs);
  }

  if (options.control) {
    document.body.insertAdjacentHTML('beforeend', `
      <div id="${IDENT_CONTROL}">
        <p><span id="${IDENT_PREV}">◀</span>
        Page <span id="${IDENT_PAGE}">0</span> of <span id="${IDENT_TOTAL}">0</span>
        <span id="${IDENT_NEXT}">▶</span></p>
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
  $fullScreen(document.body).plug(control.key('f'));

  /**
   * export some of control
   *
   * @typedef {Object} TalkieExport
   * @param {Object.<Function>} control
   * @param {Bacon.EventStream} changed
   * @param {Bacon.Bus} next
   * @param {Bacon.Bus} prev
   * @param {Bacon.Bus} jump
   * @param {Bacon.Property} ratio
   * @param {Array.<String>} notes
   */
  return {
    Bacon   : Bacon,
    control : control,
    changed : paging.changedEs,
    next    : paging.nextBus,
    prev    : paging.prevBus,
    jump    : paging.moveBus,
    ratio   : responsive.currentRatio,
    notes   : notes
  };
}
