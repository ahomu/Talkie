export function textAssignOf(el: HTMLElement) {
  return function(text: string | number | null) {
    if (text === null) {
      return;
    }

    el.textContent = '' + text;
  };
}

export function styleAssignOf(el: HTMLElement, property: string | undefined) {
  if (property === undefined) {
    return function(_: string) {
      // noop
    };
  }

  return function(value: string) {
    (el.style as any)[property] = value === '' ? null : value;
  };
}

export function attributeAssignOf(el: HTMLElement, attribute: string) {
  return function(value: string | number | null | undefined) {
    if (value != null) {
      el.setAttribute(attribute, value + '');
    } else {
      el.removeAttribute(attribute);
    }
  };
}

export function wrapElement(replaceEl: HTMLElement, el: HTMLElement) {
  const parent: Node | null = el.parentNode;

  if (parent == null) {
    throw new Error('parent is missing...');
  }

  parent.replaceChild(replaceEl, el);
  replaceEl.appendChild(el);
}

export function getPageNumberFromHash(): number {
  return parseInt(location.hash.replace(/^#/, ''), 10) || 0;
}

export function setPageNumberAsHash(page: number) {
  location.hash = page === 1 ? '' : `${page}`;
}

export function isTouchDevice() {
  return (
    'ontouchstart' in window || navigator.maxTouchPoints // works on most browsers || works on IE10/11 and Surface
  );
}
