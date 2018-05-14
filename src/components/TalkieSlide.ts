import { html, render } from 'lit-html/lib/shady-render';

import { compileMarkdown } from '../markdown';

function template({ image, filter }: { image: string; filter: string }) {
  return html`
<style>

:host {
  display: flex;
  position: relative;
  min-width: 100vw;
  min-height: 100vh;
  overflow: hidden;
}

:host[id] { /* nearly initialized */
  visibility: visible;
}

.layout-slot {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  z-index: 2;
  transform-origin: left top;

  min-width: auto;
  min-height: auto;
  opacity: 1;
  z-index: 2;

  width: var(--talkie-slide-width, 1024px);
  height: var(--talkie-slide-height, 768px);
  transform: var(--talkie-slide-scale, scale(1));
  top: var(--talkie-slide-top, 0);
  left: var(--talkie-slide-left, 0);
}

tk-backface {
  background: var(--talkie-slide-bg, radial-gradient(#f8f8f8 0%, #e6e6e6 100%));
}

[invert] + tk-backface {
  background: var(--talkie-slide-invert-bg, radial-gradient(#262626 0%, #080808 100%));
}

/* Layout Utilities */
.layout-slot[flex]       { display: flex !important; }
.layout-slot[vertical]   { flex-direction: column !important; }
.layout-slot[horizontal] { flex-direction: row !important; }

.layout-slot[v-center]             { justify-content: center !important; }
.layout-slot[horizontal][v-center] { align-items: center !important; }

.layout-slot[v-top]             { justify-content: flex-start !important; }
.layout-slot[horizontal][v-top] { align-items: flex-start !important; }

.layout-slot[v-bottom]             { justify-content: flex-end !important; }
.layout-slot[horizontal][v-bottom] { align-items: flex-end !important; }

.layout-slot[h-center]             { align-items: center !important; }
.layout-slot[horizontal][h-center] { justify-content: center !important; }

.layout-slot[h-left]             { align-items: flex-start !important; }
.layout-slot[horizontal][h-left] { justify-content: flex-start !important; }

.layout-slot[h-right]             { align-items: flex-end !important; }
.layout-slot[horizontal][h-right] { justify-content: flex-end !important; }

.layout-slot[h-left] > *  { text-align: left !important; }
.layout-slot[h-right] > * { text-align: right !important; }

.layout-slot[s-center] { align-self: center !important; }
.layout-slot[s-start]  { align-self: flex-start !important; }
.layout-slot[s-end]    { align-self: flex-end !important; }
</style>

<div class="layout-slot">
  <slot></slot>
</div>

<tk-backface
  role="presentation"
  image="${image}"
  filter="${filter}"></tk-backface>
`;
}

export enum TalkieSlideAttributes {
  BACKFACE = 'backface',
  BACKFACE_FILTER = 'backface-filter',
  TYPE = 'type',
}

export class TalkieSlide extends HTMLElement {
  static get ns() {
    return 'tk-slide';
  }

  constructor() {
    super();
  }

  public getLayoutElement(): HTMLElement {
    if (this.shadowRoot == null) {
      throw new Error('shadowRoot not initialized yet');
    }

    return <HTMLElement>this.shadowRoot.querySelector('.layout-slot');
  }

  public toVisible() {
    this.setAttribute('aria-hidden', 'false');
  }

  public toInvisible() {
    this.setAttribute('aria-hidden', 'true');
  }

  public connectedCallback(): void {
    if (this.getAttribute(TalkieSlideAttributes.TYPE) === 'text/x-markdown') {
      this.innerHTML = compileMarkdown(this.innerHTML.replace('&gt;', '>'));
    }

    this.attachShadow({ mode: 'open' });
    this.render();
    this.inheritAttributesToLayoutSlot();
  }

  public inheritAttributesToLayoutSlot() {
    const layoutEl: HTMLElement = this.getLayoutElement();
    const ownAttributes: string[] = Object.keys(TalkieSlideAttributes).map((key: string) => TalkieSlideAttributes[key]);

    /**
     * FIXME This is a WORKAROUND :(
     *
     * In Array.from, InvalidCharacterError occurred in EdgeHTML 16.16299.
     * Therefore, convert it to Array in the following way.
     */
    Array.prototype.slice
      .call(this.attributes)
      .filter((attr: Attr) => !ownAttributes.includes(attr.name))
      .forEach((attr: Attr) => {
        layoutEl.setAttribute(attr.name, attr.value);
      });

    /**
     * Properties such as `display: flex` usually require declaration both in parent element in LightDOM and in parent element in <slot>.
     * However, if `ShadyDOM` is enabled, simply applying style will duplicate, so delete the `layout` attribute which causes it in Talkie.
     */
    if ((<any>window).ShadyDOM != null) {
      this.removeAttribute('layout');
    }
  }

  private render() {
    if (this.shadowRoot == null) {
      throw new Error('shadowRoot not initialized yet');
    }

    render(
      template({
        image: this.getAttribute(TalkieSlideAttributes.BACKFACE) || '',
        filter: this.getAttribute(TalkieSlideAttributes.BACKFACE_FILTER) || '',
      }),
      this.shadowRoot,
      TalkieSlide.ns,
    );
  }
}
