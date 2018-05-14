import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export enum ResponsiveRatio {
  NORMAL = '4:3',
  WIDE = '16:9',
}

export interface ResponsiveOptions {
  samplingElement: HTMLElement | null;
  resizeObservable$: Observable<any>;
  ratio: ResponsiveRatio;
}

export function initResponsive({ samplingElement, resizeObservable$, ratio }: ResponsiveOptions) {
  if (samplingElement == null) {
    throw new Error('oops, `samplingElement` must not to be null');
  }
  const trigger$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  resizeObservable$.subscribe(trigger$);

  const width: number = ratio === ResponsiveRatio.NORMAL ? 1024 : 1366;
  const height: number = 768;

  const hRatio$: Observable<number> = trigger$.pipe(map(horizontalRatioOf(width)));
  const vRatio$: Observable<number> = trigger$.pipe(map(verticalRatioOf(height)));

  const currentRatio$: Observable<number> = combineLatest(hRatio$, vRatio$).pipe(
    map((hv: [number, number]) => Math.min(hv[0], hv[1])),
  );

  const style: HTMLStyleElement = document.createElement('style');
  style.innerHTML = `
    tk-slide {
      --talkie-slide-width: ${width}px;
      --talkie-slide-height: ${height}px;
      --talkie-slide-scale: scale(1);
      --talkie-slide-top: 0;
      --talkie-slide-left: 0;
    }
  `;
  document.head.appendChild(style);

  currentRatio$.subscribe((ratio: number) => {
    style.innerHTML = style.innerHTML.replace(
      /--talkie-slide-scale: scale\(.+\);/,
      `--talkie-slide-scale: scale(${Math.abs(ratio)});`,
    );

    const rect: ClientRect = samplingElement.getBoundingClientRect();
    style.innerHTML = style.innerHTML
      .replace(/--talkie-slide-top: .+;/, `--talkie-slide-top: ${(window.innerHeight - rect.height) / 2}px;`)
      .replace(/--talkie-slide-left: .+;/, `--talkie-slide-left: ${(window.innerWidth - rect.width) / 2}px;`);
  });
}

function horizontalRatioOf(width: number): () => number {
  return function(): number {
    return window.innerWidth / width;
  };
}

function verticalRatioOf(height: number): () => number {
  return function(): number {
    return window.innerHeight / height;
  };
}
