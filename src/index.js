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
 * @param {TalkieOptions} options
 */
function main(options = {}) {

  /**
   * Init slide sections
   */
  util.toArray(document.querySelectorAll(`[type="${MIME_MARKDOWN}"]`)).forEach(Markdown);
  let slides = util.toArray(document.querySelectorAll(`[${ATTR_LAYOUT}]`));

  /**
   * Insert control Parts
   */
  document.body.insertAdjacentHTML('beforeend', `
<div id="control">
  <p><span id="prev">◀</span>
  Page <span id="page">0</span> of <span id="total">0</span>
  <span id="next">▶</span></p>
</div>
<div id="progress"></div>
  `);

  /**
   * Paging control
   */
  let params = query(location.search);
  let paging = Paging({
    startPage  : params.startPage || 1,
    endPage    : slides.length,
    nextButton : util.getById(IDENT_NEXT),
    prevButton : util.getById(IDENT_PREV)
  });

  // current page
  paging.current.onValue(textAssignOf(util.getById(IDENT_PAGE)));


  // total of page
  Bacon.once(slides.length).onValue(textAssignOf(util.getById(IDENT_TOTAL)));

  // progress bar
  paging.percent.onValue(styleAssignOf(util.getById(IDENT_PROGRESS), 'width'));

  // slide visibility
  Bacon.combineAsArray(paging.current, slides)
    .onValue(function(data) {
      let [current, all] = data;
      all.forEach(toInvisible);
      toVisible(all[current - 1 /* fix page to index */]);
    });

  /**
   * Scaling
   */
  let ratio = Ratio({
    wide: options.wide
  });
  let scale = Scale({
    target: util.getById(IDENT_SCALER)
  });

  ratio.onValue(scale);
  Bacon.once(ratio).onValue(scale);

  /**
   * Fullscreen
   */
  FullScreen(document.body);
}

/**
 * @param {Element} el
 */
function toInvisible(el) {
  el.removeAttribute('visible');
}

/**
 * @param {Element} el
 */
function toVisible(el) {
  el.setAttribute('visible', 1);
}

/**
 * @param {Element} el
 */
function textAssignOf(el) {
  return function(text) {
    el.textContent = text;
  };
}

/**
 * @param {Element} el
 * @param {String} property
 */
function styleAssignOf(el, property) {
  return function(value) {
    el.style[property] = value;
  };
}
