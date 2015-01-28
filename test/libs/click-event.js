export default window.ClickEvent = {
  simulate(el) {
    var event = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });
    el.dispatchEvent(event);
  }
};
