declare module "keycode" {
  function keycode(name: string): number;

  export = keycode;
}

declare module "markdown-it" {
  class MarkdownIt {
    constructor(options: any);
    render(htmlText: string): string;
  }

  export = MarkdownIt;
}
