import { throttleTime, map } from 'rxjs/operators';
import { merge } from 'rxjs/index';

import { TalkieBackface } from './components/TalkieBackface';
import { TalkiePager, TalkiePagerAttributes } from './components/TalkiePager';
import { TalkieProgress, TalkieProgressAttributes } from './components/TalkieProgress';
import { TalkieSlide } from './components/TalkieSlide';

import { hashchange, keydown, resize, scroll } from './event';
import { initResponsive, ResponsiveRatio } from './responsive';
import { initPaging, PagingExports } from './paging';
import { initFullScreen } from './fullscreen';
import { getPageNumberFromHash } from './util';

function run() {
  customElements.define(TalkieBackface.ns, TalkieBackface);
  customElements.define(TalkiePager.ns, TalkiePager);
  customElements.define(TalkieProgress.ns, TalkieProgress);
  customElements.define(TalkieSlide.ns, TalkieSlide);

  /**
   * Elements
   */
  const pagerElement: TalkiePager | null = document.querySelector('tk-pager');
  const progressElement: TalkieProgress | null = document.querySelector('tk-progress');
  const slideElements: TalkieSlide[] = Array.from(document.querySelectorAll('tk-slide'));

  slideElements.forEach((el: HTMLElement, i: number) => el.setAttribute('id', String(i + 1)));

  const startPage = getPageNumberFromHash() || 1;
  const totalPage = slideElements.length;

  /**
   * Responsive
   */
  initResponsive({
    samplingElement: (<TalkieSlide>slideElements[0]).getLayoutElement(),
    resizeObservable$: resize(),
    ratio: ResponsiveRatio.NORMAL,
  });

  /**
   * Paging controls
   */
  const { prev, next, move, current$, percentage$ }: PagingExports = initPaging({
    startPage,
    totalPage,
  });

  let isKeyboardMove: boolean = false;

  current$
    .pipe(map((current: number) => slideElements[current - 1]))
    .subscribe((currentSlideElement: TalkieSlide): void => {
      slideElements.forEach((el: TalkieSlide) => el.toInvisible());
      currentSlideElement.toVisible();

      // presenter note
      console.clear();
      console.log(currentSlideElement.presenterNote);

      // move by keyboard
      if (isKeyboardMove) {
        currentSlideElement.scrollIntoView();
        isKeyboardMove = false;
      }
    });

  // keyboard control
  merge(keydown('left'), keydown('up'), keydown('a')).subscribe(() => {
    isKeyboardMove = true;
    prev.next(); // lol
  });
  merge(keydown('right'), keydown('down'), keydown('s')).subscribe(() => {
    isKeyboardMove = true;
    next.next(); // oops
  });

  /// hashchange -> page change
  hashchange()
    .pipe(map(getPageNumberFromHash))
    .subscribe(move);

  // scroll change -> page change
  scroll()
    .pipe(throttleTime(200))
    .subscribe(() => {
      let el: Element | null = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);

      if (el = el.closest(TalkieSlide.ns)) {
        move.next(parseInt(<string>el.getAttribute('id'), 10));
      }
    });

  // pager
  if (pagerElement != null) {
    pagerElement.setAttribute(TalkiePagerAttributes.CURRENT, String(startPage));
    pagerElement.setAttribute(TalkiePagerAttributes.TOTAL, String(totalPage));
    current$.subscribe((current: number) => pagerElement.setAttribute(TalkiePagerAttributes.CURRENT, String(current)));
  }

  if (progressElement != null) {
    percentage$.subscribe((percentage: number) =>
      progressElement.setAttribute(TalkieProgressAttributes.PROGRESS, String(percentage)),
    );
  }

  /**
   * Full screeen mode
   */
  keydown('f').subscribe(initFullScreen());
}

export default { run };
