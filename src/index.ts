import { merge } from 'rxjs/index';
import { debounceTime, map } from 'rxjs/operators';

import { TalkieBackface } from './components/TalkieBackface';
import { TalkiePager, TalkiePagerAttributes } from './components/TalkiePager';
import { TalkieProgress, TalkieProgressAttributes } from './components/TalkieProgress';
import { TalkieSlide } from './components/TalkieSlide';

import { hashchange, keydown, resize, scroll } from './event';
import { initFullScreen } from './fullscreen';
import { initPaging, PagingExports } from './paging';
import { initResponsive, ResponsiveRatio } from './responsive';
import { getPageNumberFromHash } from './util';

interface TalkieRuntimeOptions {
  wide: boolean;
  horizontal: boolean;
}

// tslint:disable-next-line:max-func-body-length
function run({ wide = false, horizontal = false }: TalkieRuntimeOptions): void {
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

  const startPage: number = getPageNumberFromHash() || 1;
  const totalPage: number = slideElements.length;

  /**
   * Responsive
   */
  initResponsive({
    samplingElement: slideElements[0].getLayoutElement(),
    resizeObservable$: resize(),
    ratio: wide ? ResponsiveRatio.WIDE : ResponsiveRatio.NORMAL,
  });

  /**
   * Paging controls
   */
  const { prev, next, jump, current$, percentage$ }: PagingExports = initPaging({
    startPage,
    totalPage,
  });

  let isExplicitMove: boolean = false;
  function nextSlide(): void {
    isExplicitMove = true;
    next.next(); // oops
  }

  function prevSlide(): void {
    isExplicitMove = true;
    prev.next(); // lol
  }

  current$
    .pipe(map((current: number) => slideElements[current - 1]))
    .subscribe((currentSlideElement: TalkieSlide): void => {
      slideElements.forEach((el: TalkieSlide) => el.toInvisible());
      currentSlideElement.toVisible();

      // presenter note
      console.clear();
      console.log(currentSlideElement.presenterNote); // tslint:disable-line:no-console

      // explicit move (keyboard, paging button, etc)
      if (isExplicitMove) {
        currentSlideElement.scrollIntoView();
        isExplicitMove = false;
      }
    });

  // keyboard control
  merge(keydown('left'), keydown('up'), keydown('a')).subscribe(prevSlide);
  merge(keydown('right'), keydown('down'), keydown('s')).subscribe(nextSlide);

  /// hashchange -> page change
  hashchange()
    .pipe(map(getPageNumberFromHash))
    .subscribe(jump);

  // scroll change -> page change
  scroll()
    .pipe(debounceTime(50))
    .subscribe(() => {
      let el: Element | null = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);

      // tslint:disable-next-line:no-conditional-assignment
      if ((el = el.closest(TalkieSlide.ns))) {
        jump.next(parseInt(<string>el.getAttribute('id'), 10));
      }
    });

  // pager
  if (pagerElement != null) {
    pagerElement.setAttribute(TalkiePagerAttributes.CURRENT, String(startPage));
    pagerElement.setAttribute(TalkiePagerAttributes.TOTAL, String(totalPage));
    pagerElement.setPagingPrevCallback(prevSlide);
    pagerElement.setPagingNextCallback(nextSlide);
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

  /**
   * Horizontal mode
   */
  if (horizontal) {
    document.documentElement.classList.add('horizontal');
  }
}

export default { run }; // tslint:disable-line:no-default-export
