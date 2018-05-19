export function textAssignOf(el: HTMLElement): (text: string | number | null) => void {
  return (text: string | number | null): void => {
    if (text === null) {
      return;
    }

    el.textContent = String(text);
  };
}

export function styleAssignOf(el: HTMLElement, property: string | undefined): (value: string) => void {
  if (property === undefined) {
    return (_: string): void => {
      // noop
    };
  }

  return (value: string): void => {
    (<any>el.style)[property] = value === '' ? null : value;
  };
}

export function attributeAssignOf(
  el: HTMLElement,
  attribute: string,
): (value: string | number | null | undefined) => void {
  return (value: string | number | null | undefined): void => {
    if (value != null) {
      el.setAttribute(attribute, String(value));
    } else {
      el.removeAttribute(attribute);
    }
  };
}

export function wrapElement(replaceEl: HTMLElement, el: HTMLElement): void {
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

export function setPageNumberAsHash(page: number): void {
  location.hash = page === 1 ? '' : `${page}`;
}

export function isTouchDevice(): boolean {
  return (
    'ontouchstart' in window || !!navigator.maxTouchPoints // works on most browsers || works on IE10/11 and Surface
  );
}
