import { html, render, TemplateResult } from 'lit-html/lib/shady-render';

function template({ current, total }: { current: string; total: string }): TemplateResult {
  return html`
<style>
:host {
  position: fixed;
  z-index: 3;
  bottom: 0;
  right: 0;
  padding: 20px;
  color: hotpink;
  font-family: Consolas, Monaco, 'Andale Mono', monospace;
}

.next, .prev {
  background: none;
  border: none;
  cursor: pointer;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  padding: 0;
  vertical-align: middle;
}

.next {
  border-left-width: 20px;
  border-left-color: hotpink;
}

.prev {
  border-right-width: 20px;
  border-right-color: hotpink;
}

.current {
  color: inherit;
  text-decoration: none;
  border-bottom: 1px dotted hotpink;
}
</style>

<nav>
  <p>
    <button class="prev" title="Prev Slide"></button>
    <a class="current" href="#${current}" title="Permalink"> Page ${current} of ${total}</a>
    <button class="next" title="Next Slide"></button>
  </p>
</nav>
`;
}

export enum TalkiePagerAttributes {
  TOTAL = 'total',
  CURRENT = 'current',
}

export class TalkiePager extends HTMLElement {
  static get ns(): string {
    return 'tk-pager';
  }

  static get observedAttributes(): TalkiePagerAttributes[] {
    return [TalkiePagerAttributes.TOTAL, TalkiePagerAttributes.CURRENT];
  }

  private pagingNextCallback: () => void;
  private pagingPrevCallback: () => void;

  constructor() {
    super();
  }

  public connectedCallback(): void {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.initPagingButton();
  }

  public attributeChangedCallback(): void {
    this.render();
  }

  public setPagingNextCallback(callbackFn: () => void): void {
    this.pagingNextCallback = callbackFn;
  }

  public setPagingPrevCallback(callbackFn: () => void): void {
    this.pagingPrevCallback = callbackFn;
  }

  private initPagingButton(): void {
    if (this.shadowRoot == null) {
      throw new Error('shadowRoot not initialized yet');
    }

    (<HTMLElement>this.shadowRoot.querySelector('.prev')).addEventListener(
      'click',
      this.handlePagingAction.bind(this),
      false,
    );
    (<HTMLElement>this.shadowRoot.querySelector('.next')).addEventListener(
      'click',
      this.handlePagingAction.bind(this),
      false,
    );
  }

  private handlePagingAction(e: MouseEvent): void {
    const button: HTMLButtonElement = <HTMLButtonElement>e.target;

    if (button.className === 'next' && this.pagingNextCallback) {
      this.pagingNextCallback();
    } else if (button.className === 'prev' && this.pagingPrevCallback) {
      this.pagingPrevCallback();
    }
  }

  private render(): void {
    if (this.shadowRoot == null) {
      throw new Error('shadowRoot not initialized yet');
    }

    const current: string = this.getAttribute(TalkiePagerAttributes.CURRENT) || '0';
    const total: string = this.getAttribute(TalkiePagerAttributes.TOTAL) || '0';

    render(template({ current, total }), this.shadowRoot, TalkiePager.ns);
  }
}
