import { html, render, TemplateResult } from 'lit-html/lib/shady-render';

function template(): TemplateResult {
  return html`
<style>
:host {
  display: block;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-position: center center !important;
}
</style>
`;
}

export enum TalkieBackfaceAttributes {
  IMAGE = 'image',
  FILTER = 'filter',
}

export class TalkieBackface extends HTMLElement {
  static get ns(): string {
    return 'tk-backface';
  }
  static get observedAttributes(): TalkieBackfaceAttributes[] {
    return [TalkieBackfaceAttributes.IMAGE, TalkieBackfaceAttributes.FILTER];
  }

  public connectedCallback(): void {
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  public attributeChangedCallback(): void {
    const imageUrl: string | null = this.getAttribute(TalkieBackfaceAttributes.IMAGE) || '';
    const filterDecl: string | null = this.getAttribute(TalkieBackfaceAttributes.FILTER) || '';

    if (imageUrl) {
      const style: string = `background-image: url(${imageUrl});background-color: transparent;filter: ${
        filterDecl ? filterDecl : 'none'
      };`;
      this.setAttribute('style', style);
    } else {
      this.removeAttribute('style');
    }
  }

  private render(): void {
    if (this.shadowRoot == null) {
      throw new Error('shadowRoot not initialized yet');
    }

    render(template(), this.shadowRoot, TalkieBackface.ns);
  }
}
