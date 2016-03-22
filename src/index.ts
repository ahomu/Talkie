/// <reference path="../typings/myself.d.ts" />
/// <reference path="../typings/browser.d.ts" />
/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />

'use strict';

/**
 * Talkie.js
 */
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/throttleTime';

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
const ATTR_PAGE     = 'page';
const ATTR_NO_TRANS = 'no-transition';

const NORMAL_WIDTH  = 1024;
const NORMAL_HEIGHT = 768;
const WIDE_WIDTH    = 1366;
const WIDE_HEIGHT   = 768;

interface TalkieOptions {
  api?: boolean;
  wide?: boolean;
  control?: boolean;
  pointer?: boolean;
  progress?: boolean;
  backface?: boolean;
  notransition?: boolean;
}

(window as any).Talkie = function(options: TalkieOptions = {}) {
  return !options.api ? main(options) : {
    main       : main,
    util       : util,
    control    : control,
    query      : query,
    slide      : $slide,
    paging     : $paging,
    fullScreen : $fullScreen,
    responsive : $responsive,
    pointer    : $pointer,
    backface   : $backface
  };
};

function main(givenOptions: TalkieOptions = {}) {

  const options = util.extend(util.defaults(givenOptions, {
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
  const width  = options.wide ? WIDE_WIDTH : NORMAL_WIDTH;
  const height = options.wide ? WIDE_HEIGHT : NORMAL_HEIGHT;
  (document.querySelector('head') as HTMLElement).insertAdjacentHTML('beforeend', `
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
   *   1. compile markdowns
   *   2. traverse slides & assign page number
   *   3. extract presenter notes
   */
  const mds = util.toArray<Element>(document.querySelectorAll(SELECTOR_MD));
  mds.forEach($slide.compileMarkdown);
  const slides = util.toArray<HTMLElement>(document.querySelectorAll(`[${ATTR_LAYOUT}]`));
  slides.forEach((el, i) => util.attributeAssignOf(el, ATTR_PAGE)(i + 1));
  const notes  = {};
  slides.map($slide.extractNote).forEach((txt, i) => notes[i + 1] = txt);

  /**
   * Responsive scaling
   */
  document.body.insertAdjacentHTML('beforeend', `
    <div id="${IDENT_SCALER}"></div>
  `);
  const scalerEl = util.getById(IDENT_SCALER);
  slides.forEach((el) => scalerEl.appendChild(el));

  const responsive = $responsive({
    width  : width,
    height : height,
    target : scalerEl
  });
  control.resize().subscribe(responsive.scale);

  /**
   * Paging control
   */
  const paging = $paging({
    startPage     : util.getPageNumberFromHash() || 1,
    endPage       : slides.length,
    slideElements : slides
  });

  control.keydown('right').throttleTime(100).subscribe(paging.next);
  control.keydown('left').throttleTime(100).subscribe(paging.prev);

  control.swipeLeft().subscribe(paging.next);
  control.swipeRight().subscribe(paging.prev);

  // sync location.hash
  control.hashchange().map(util.getPageNumberFromHash).subscribe(paging.move);
  paging.current.subscribe((page) => location.hash = page === 1 ? '/' : '/' + page);

  // sync body background attribute
  paging.changed
    .map((el) => el.getAttribute(ATTR_LAYOUT))
    .subscribe(util.attributeAssignOf(document.body, ATTR_BODY_BG));

  /**
   * Insert Ui Elements
   */
  if (options.notransition) {
    Observable.of(1)
      .subscribe(util.attributeAssignOf(document.body, ATTR_NO_TRANS));
  }

  if (options.pointer) {
    document.body.insertAdjacentHTML('beforeend', `<div id="${IDENT_POINTER}"></div>`);
    const {coord, toggle} = $pointer(util.getById(IDENT_POINTER));
    control.mousemove().subscribe(coord);
    control.keydown('b').subscribe(toggle);
  }

  if (options.backface) {
    document.body.insertAdjacentHTML('beforeend', `<div id="${IDENT_BACKFACE}"></div>`);
    const {bgImage, bgFilter} = $backface(util.getById(IDENT_BACKFACE));
    paging.changed.subscribe((el) => {
      bgImage.next(el);
      bgFilter.next(el);
    });
  }

  if (options.control) {
    document.body.insertAdjacentHTML('beforeend', `
      <div id="${IDENT_CONTROL}">
        <p><span id="${IDENT_PREV}">◀</span>
        Page <span id="${IDENT_PAGE}">0</span> of <span id="${IDENT_TOTAL}">0</span>
        <span id="${IDENT_NEXT}">▶</span></p>
      </div>
    `);

    const nextEl = util.getById(IDENT_NEXT);
    const prevEl = util.getById(IDENT_PREV);

    // next button
    control.click(nextEl).subscribe(paging.next);

    // prev button
    control.click(prevEl).subscribe(paging.prev);

    // current page
    paging.current.subscribe(util.textAssignOf(util.getById(IDENT_PAGE)));

    // total of page
    Observable.of(slides.length).subscribe(util.textAssignOf(util.getById(IDENT_TOTAL)));
  }

  if (options.progress) {
    document.body.insertAdjacentHTML('beforeend', `<div id="${IDENT_PROGRESS}"></div>`);

    // progress bar
    paging.percent.subscribe(util.styleAssignOf(util.getById(IDENT_PROGRESS), 'width'));
  }

  /**
   * FullScreen
   */
  control.keyup('f').subscribe($fullScreen(document.documentElement));

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
   * @param {Object.<Number, String>} notes
   */
  return {
    control : control,
    changed : paging.changed,
    next    : paging.next,
    prev    : paging.prev,
    jump    : paging.move,
    ratio   : responsive.currentRatio,
    notes   : notes
  };
}
