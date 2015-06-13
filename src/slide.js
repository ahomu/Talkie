'use strict';

import markdown from 'markdown-it';
import util   from './util';

/**
 * setup markdown
 */
let md = markdown({
  html       : true,
  langPrefix : 'hljs ',
  highlight  : function(str, lang) {
    if (window.hljs == null) {
      console.log('highlight.js (`window.hljs`) is missing');
      return '';
    }

    if (lang && window.hljs.getLanguage(lang)) {
      try {
        return window.hljs.highlight(lang, str).value;
      } catch (__) {
        console.log(__);
      }
    }

    try {
      return window.hljs.highlightAuto(str).value;
    } catch (__) {
      console.log(__);
    }

    return ''; // use external default escaping
  }
});

/**
 * compile markdown
 *
 * @returns void
 */
export default {
  compileMarkdown : compileMarkdown,
  extractNote     : extractNote
};

/**
 * @param {Element} el
 * @returns {String}
 */
function extractNote(el) {
  let [content, note] = el.innerHTML.split(/<hr\s?\/?>/);
  el.innerHTML = content;

  let container = document.createElement('div');
  container.innerHTML = note || '';
  return (container.textContent || '').replace(/^\n*/, '');
}

/**
 * @param {Element} el
 * @returns {Element}
 */
function compileMarkdown(el) {
  let section = document.createElement('section');
  section.innerHTML = md.render(el.innerHTML);
  util.toArray(el.attributes).filter(notTypeAttribute).forEach(copyAttributeTo(section));
  el.parentNode.replaceChild(section, el);
  return section;
}

/**
 * @param {Element} el
 * @returns {Function}
 */
function copyAttributeTo(el) {
  return function(attr) {
    el.setAttribute(attr.name, attr.value);
  };
}

/**
 * @param {AttributeNode} attr
 */
function notTypeAttribute(attr) {
  return attr.name !== 'type';
}
