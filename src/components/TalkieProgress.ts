import { html, render, TemplateResult } from 'lit-html/lib/shady-render';

function template(): TemplateResult {
  return html`
<style>
:host {
  display: block;
  position: fixed;
  z-index: 4;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 0.2em;
  background-color: darkgray;
}
</style>
`;
}

export enum TalkieProgressAttributes {
  PROGRESS = 'progress',
}

export class TalkieProgress extends HTMLElement {
  static get ns(): string {
    return 'tk-progress';
  }

  static get observedAttributes(): TalkieProgressAttributes[] {
    return [TalkieProgressAttributes.PROGRESS];
  }

  public connectedCallback(): void {
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  public attributeChangedCallback(): void {
    const progress: string = this.getAttribute(TalkieProgressAttributes.PROGRESS) || '0';
    this.setAttribute('style', `width: ${progress}%;`);
  }

  private render(): void {
    if (this.shadowRoot == null) {
      throw new Error('shadowRoot not initialized yet');
    }

    render(template(), this.shadowRoot, TalkieProgress.ns);
  }
}
