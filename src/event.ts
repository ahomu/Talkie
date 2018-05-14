import keycode from 'keycode';
import { Observable, fromEvent } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

const KEY_UP$ = fromEvent(document, 'keyup');
const KEY_DOWN$ = fromEvent(document, 'keydown');

function keyCodeIs(keyCode: number) {
  return function(event: KeyboardEvent) {
    return event.keyCode === keyCode;
  };
}

export function keyup(charKey: string | number): Observable<KeyboardEvent> {
  const keyCode = typeof charKey === 'string' ? keycode(charKey) : charKey;
  return KEY_UP$.pipe(filter<KeyboardEvent>(keyCodeIs(keyCode)), tap((e: KeyboardEvent) => e.preventDefault()));
}

export function keydown(charKey: string | number): Observable<KeyboardEvent> {
  const keyCode = typeof charKey === 'string' ? keycode(charKey) : charKey;
  return KEY_DOWN$.pipe(filter<KeyboardEvent>(keyCodeIs(keyCode)), tap((e: KeyboardEvent) => e.preventDefault()));
}

export function touchstart(el: HTMLElement = document.body): Observable<TouchEvent> {
  return fromEvent(el, 'touchstart');
}

export function touchend(el: HTMLElement = document.body): Observable<TouchEvent> {
  return fromEvent(el, 'touchend');
}

export function touchmove(el: HTMLElement = document.body): Observable<TouchEvent> {
  return fromEvent(el, 'touchmove');
}

export function resize(): Observable<UIEvent> {
  return fromEvent(window, 'resize');
}

export function hashchange(): Observable<HashChangeEvent> {
  return fromEvent(window, 'hashchange');
}

export function scroll(): Observable<UIEvent> {
  return fromEvent(window, 'scroll');
}
