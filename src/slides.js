'use strict';

import Bacon  from 'baconjs';
import marked from 'marked';
import util   from './util';

const MIME_MARKDOWN = 'text/x-markdown';
const ATTR_LAYOUT   = 'layout';

export default function() {

  function copyAttributeTo(el) {
    return function(attr) {
      el.setAttribute(attr.name, attr.value);
    };
  }

  function notTypeAttribute(attr) {
    return attr.name !== 'type';
  }

  function compileMarkdown(el) {
    let section = document.createElement('section');

    section.innerHTML = marked(el.innerHTML);

    util.toArray(el.attributes).filter(notTypeAttribute).forEach(copyAttributeTo(section));

    el.parentNode.replaceChild(section, el);
  }

  marked.setOptions({
    langPrefix: 'hljs ',
    highlight: function (code) {
      if (window.hljs == null) {
        console.log('highlight.js (`window.hljs`) is missing');
        return code;
      }
      return window.hljs.highlightAuto(code).value;
    }
  });

  let mds = util.toArray(document.querySelectorAll(`[type="${MIME_MARKDOWN}"]`));
  mds.forEach(compileMarkdown);

  return util.toArray(document.querySelectorAll(`[${ATTR_LAYOUT}]`));
}
