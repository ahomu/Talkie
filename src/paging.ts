import { BehaviorSubject, Observable, Subject, merge } from 'rxjs';
import { distinctUntilChanged, withLatestFrom, map } from 'rxjs/operators';

export interface PagingOptions {
  startPage: number;
  totalPage: number;
}

export interface PagingExports {
  current$: Observable<number>;
  percentage$: Observable<number>;
  next: Subject<any>;
  prev: Subject<any>;
  move: Subject<any>;
}

export function initPaging({ startPage, totalPage }: PagingOptions): PagingExports {
  const nextTrigger: Subject<any> = new Subject<any>();
  const prevTrigger: Subject<any> = new Subject<any>();
  const moveTrigger: Subject<number> = new Subject<number>();
  const currentSubject: BehaviorSubject<number> = new BehaviorSubject<number>(startPage);

  const currentPage$: Observable<number> = currentSubject.pipe(map(inRangeOf(1, totalPage)), distinctUntilChanged());
  const currentPercentage$: Observable<number> = currentPage$.pipe(map(percentOf(totalPage)));

  merge(
    nextTrigger.pipe(withLatestFrom(currentPage$, (_, page: number) => page), map((v) => v + 1)),
    prevTrigger.pipe(withLatestFrom(currentPage$, (_, page: number) => page), map((v) => v - 1)),
    moveTrigger.pipe(map((v: number) => v /* noop */)),
  ).subscribe(currentSubject);

  return {
    current$: currentPage$,
    percentage$: currentPercentage$,
    next: nextTrigger,
    prev: prevTrigger,
    move: moveTrigger,
  };
}

function inRangeOf(min: number, max: number): (z: number) => number {
  return function(z: number): number {
    return Math.min(max, Math.max(z, min));
  };
}

function percentOf(max: number): (max: number) => number {
  return function(current: number): number {
    return 100 / max * current;
  };
}
