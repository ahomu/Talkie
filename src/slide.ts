/// <reference path="../typings/myself.d.ts" />

'use strict';

import MarkdownIt = require('markdown-it');
import { toArray } from './util';

interface SlideOption {
  linkShouldBlank?: boolean;
}

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

export function extractNote(el: HTMLElement) {
  const [content, note] = el.innerHTML.split(/<hr\s?\/?>/);
  el.innerHTML = content;

  let container = document.createElement('div');
  container.innerHTML = note || '';
  return (container.textContent || '').replace(/^\n*/, '');
}

export function compileMarkdown(options: SlideOption = {}, el: Element) {
  const section = document.createElement('section');

  if (options.linkShouldBlank) {
    md.renderer.rules.link_open = linkOpenAsTargetBlank;
  }

  section.innerHTML = md.render(el.innerHTML);
  toArray<Attr>(el.attributes).filter(notTypeAttribute).forEach(copyAttributeTo(section));
  const parent = el.parentNode;
  if (parent === null) {
    throw new TypeError('`el` should be a child of the other node.');
  }
  parent.replaceChild(section, el);
  return section;
}

function linkOpenAsTargetBlank(tokens: any[], idx: number, options: any, env: any, self: any) {
  const linkOpenToken = tokens[idx];
  const targetAttrIndex = linkOpenToken.attrIndex('target');
  if (targetAttrIndex < 0) {
    linkOpenToken.attrPush(['target', '_blank']);
  } else {
    linkOpenToken.attrs[targetAttrIndex][1] = '_blank';
  }
  return self.renderToken(tokens, idx, options);
}

function copyAttributeTo(el: HTMLElement) {
  return function(attr: Attr) {
    el.setAttribute(attr.name, attr.value);
  };
}

function notTypeAttribute(attr: Attr) {
  return attr.name !== 'type';
}
