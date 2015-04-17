'use strict';

export default window.ClickEvent = {
  simulate(el) {
    let event = new MouseEvent('click', {
      view       : window,
      bubbles    : true,
      cancelable : true
    });
    el.dispatchEvent(event);
  }
};
