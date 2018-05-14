import { html, render } from 'lit-html/lib/shady-render';

function template({ current, total }: { current: string; total: string }) {
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
</style>

<nav>
  <p>
    <button class="prev" aria-label="Prev Slide"></button>
    Page ${current} of ${total}
    <button class="next" aria-label="Next Slide"></button>
  </p>
</nav>
`;
}

export enum TalkiePagerAttributes {
  TOTAL = 'total',
  CURRENT = 'current',
}

export class TalkiePager extends HTMLElement {
  static get ns() {
    return 'tk-pager';
  }

  static get observedAttributes() {
    return [TalkiePagerAttributes.TOTAL, TalkiePagerAttributes.CURRENT];
  }

  constructor() {
    super();
  }

  public connectedCallback(): void {
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  public attributeChangedCallback(): void {
    this.render();
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
