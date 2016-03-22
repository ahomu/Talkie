'use strict';

import MarkdownIt = require('markdown-it');
import util   from './util';

const win = window as any;

/**
 * setup markdown
 */
const md = new MarkdownIt({
  html       : true,
  langPrefix : 'hljs ',
  highlight  : function(str: string, lang: string) {
    if (win.hljs == null) {
      console.log('highlight.js (`window.hljs`) is missing');
      return '';
    }

    if (lang && win.hljs.getLanguage(lang)) {
      try {
        return win.hljs.highlight(lang, str).value;
      } catch (__) {
        console.log(__);
      }
    }

    try {
      return win.hljs.highlightAuto(str).value;
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
function extractNote(el: HTMLElement) {
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
function compileMarkdown(el: Element) {
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
function copyAttributeTo(el: HTMLElement) {
  return function(attr: Attr) {
    el.setAttribute(attr.name, attr.value);
  };
}

/**
 * @param {AttributeNode} attr
 */
function notTypeAttribute(attr: Attr) {
  return attr.name !== 'type';
}
