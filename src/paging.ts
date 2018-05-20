import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, withLatestFrom } from 'rxjs/operators';

export interface PagingOptions {
  startPage: number;
  totalPage: number;
}

export interface PagingExports {
  current$: Observable<number>;
  percentage$: Observable<number>;
  next: Subject<any>;
  prev: Subject<any>;
  jump: Subject<any>;
}

export function initPaging({ startPage, totalPage }: PagingOptions): PagingExports {
  const nextTrigger: Subject<any> = new Subject<any>();
  const prevTrigger: Subject<any> = new Subject<any>();
  const jumpTrigger: Subject<number> = new Subject<number>();
  const currentSubject: BehaviorSubject<number> = new BehaviorSubject<number>(startPage);

  const currentPage$: Observable<number> = currentSubject.pipe(map(inRangeOf(1, totalPage)), distinctUntilChanged());
  const currentPercentage$: Observable<number> = currentPage$.pipe(map(percentOf(totalPage)));

  merge(
    nextTrigger.pipe(withLatestFrom(currentPage$, (_: any, page: number) => page), map((v: number) => v + 1)),
    prevTrigger.pipe(withLatestFrom(currentPage$, (_: any, page: number) => page), map((v: number) => v - 1)),
    jumpTrigger.pipe(map((v: number) => v)),
  ).subscribe(currentSubject);

  return {
    current$: currentPage$,
    percentage$: currentPercentage$,
    next: nextTrigger,
    prev: prevTrigger,
    jump: jumpTrigger,
  };
}

function inRangeOf(min: number, max: number): (z: number) => number {
  return (z: number): number => {
    return Math.min(max, Math.max(z, min));
  };
}

function percentOf(max: number): (max: number) => number {
  return (current: number): number => {
    return 100 / max * current;
  };
}
