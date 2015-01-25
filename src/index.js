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
import Bacon  from 'baconjs';
import hljs   from 'highlight.js';
import marked from 'marked';
import util   from './util';

const MIME_MARKDOWN = 'text/x-markdown';
const IDENT_NEXT    = 'next';
const IDENT_PREV    = 'prev';
const IDENT_SCALER  = 'scaler';
const IDENT_CONTROL = 'control';
const ATTR_LAYOUT   = 'layout';

document.addEventListener('DOMContentLoaded', function() {

  marked.setOptions({
    langPrefix: 'hljs ',
    highlight: function (code) {
      hljs.configure({

      });
      return hljs.highlightAuto(code).value;
    }
  });

  function rangeIs(min, max) {
    return function(z) {
      return Math.min(max, Math.max(z, min));
    };
  }

  function keyCodeIs(keyCode) {
    return function(event) {
      return event.keyCode === keyCode;
    };
  }

  function appendChildOf(container) {
    return function(el) {
      container.appendChild(el);
    }
  }

  function scalingOf(el) {
    return function(ratio) {
      el.style.webkitTransform = `scale(${ratio})`;
    }
  }

  function centeringOf(el) {
    return function() {
      let rect = el.getBoundingClientRect();
      el.style.left = (window.innerWidth - rect.width) / 2;
      el.style.top  = (window.innerHeight - rect.height) / 2;
    }
  }

  function toInvisible(el) {
    el.removeAttribute('visible');
  }

  function toVisible(el) {
    el.setAttribute('visible', 1);
  }

  function clickEventStream(el) {
    return Bacon.fromEventTarget(el, 'click');
  }

  function keyUpEventStream() {
    return Bacon.fromEventTarget(document, 'keyup');
  }

  function resizeEventStrem() {
    return Bacon.fromEventTarget(window, 'resize').debounce(250);
  }

  function parseQuery(query) {
    let ret =  {};
    query
      .slice(1, -1)
      .split('&')
      .map((keyEqVal) => keyEqVal.split('='))
      .forEach((kv) => ret[kv[0]] = kv[1]);
    return ret;
  }

  function compileMarkdown(el) {
    let section = document.createElement('section');
    section.setAttribute('class',  el.className);
    section.setAttribute(ATTR_LAYOUT, el.getAttribute(ATTR_LAYOUT));
    section.innerHTML = marked(el.innerHTML);
    el.parentNode.replaceChild(section, el);
  }

  let mds = util.toArray(document.querySelectorAll(`[type="${MIME_MARKDOWN}"]`));
  mds.forEach(compileMarkdown);

  let slides = util.toArray(document.querySelectorAll(`[${ATTR_LAYOUT}]`));
  let all    = Bacon.constant(slides);

  let keyUp  = keyUpEventStream();
  let right  = keyUp.filter(keyCodeIs(39));
  let left   = keyUp.filter(keyCodeIs(37));

  let next = right.merge(clickEventStream(util.getById(IDENT_NEXT))).map(1);
  let prev = left.merge(clickEventStream(util.getById(IDENT_PREV))).map(-1);
  let both = next.merge(prev);

  let params = parseQuery(location.search);

  let initialPage = params.page || 1;
  let computePage = util.compose(rangeIs(1, slides.length), util.add);
  let current = both.scan(initialPage, computePage);

  Bacon.combineAsArray(current, all)
    .onValue(function(data) {
      let [current, all] = data;
      all.forEach(toInvisible);
      toVisible(all[current - 1 /* fix page to index */]);
    });

  /**
   * Scaler
   * @type {HTMLElement}
   */
  let scaler = document.createElement('div');
  appendChildOf(document.body)(scaler);
  scaler.id = 'scaler';
  slides.forEach(appendChildOf(scaler));

  function getHorizontalRatio() {
    return window.innerWidth / 1024;
  }

  function getVerticalRatio() {
    return window.innerHeight / 768;
  }

  let resize = resizeEventStrem();
  let scale  = util.compose(centeringOf(scaler), scalingOf(scaler));
  var hRatio = resize.map(getHorizontalRatio);
  var vRatio = resize.map(getVerticalRatio);
  Bacon.combineWith(Math.min, hRatio, vRatio).onValue(scale);
  scale(Math.min(getHorizontalRatio(), getVerticalRatio()));
});
