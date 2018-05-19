Talkie.js - Web Components based Slide library
====================

**The `master` branch is unstable because it makes comprehensive changes with v0.13. For v0.12 code, please refer to the [v0.12.x] (https://github.com/ahomu/Talkie/tree/v0.12.x) branch.**

[![npm version][npm-image]][npm-url] [![build status][circle-image]][circle-url] [![Dependency Status][deps-image]][deps-url]

This library written in [TypeScript](https://github.com/Microsoft/TypeScript) & [ReactiveX/rxjs: A reactive programming library for JavaScript](https://github.com/ReactiveX/RxJS).

For more information about dependency Please look at the [package.json](package.json).

## Feature

- [x] Markdown support
- [x] Code highlighting
- [x] Layout attributes
- [x] keyboard control
- [x] touch control
- [x] Responsive scaling (4:3, 16:9)
- [x] FullScreen mode
- [x] Background image & filter
- [x] Progress indicator
- [x] Accessibility support
- [ ] ~~Pointer attention~~ (drop v0.13~)
- [ ] ~~Canvas drawing mode~~ (drop v0.13~)

## Real presentation sample

- [WAI-ARIA IN FRESH! & AbemaTV](http://s.aho.mu/160809-a11y_informal_study/)
- [CLIENT SIDE OF █████FRESH.TV](http://s.aho.mu/160405-node_school/)
- [Reactive Programming in JavaScript](http://ahomu.github.io/s/150221-frontrend_conference/index.html)
- [Bacon.js & Talkie.js](http://ahomu.github.io/s/150217-lt/index.html)

## Getting started

Talkie.js contains two of the CSS and one of JavaScript.

- dist/talkie.min.css
- dist/talkie.min.js
- dist/talkie.theme-default.css

Next code is the simplest example.

```html
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="./dist/talkie.css">
<link rel="stylesheet" href="./dist/talkie.theme-default.css">
</head>
<body>

<!-- Pure HTML style -->
<tk-slide layout>
  <h1>Slide 1</h1>
</tk-slide>

<!-- Markdown style ( require `type` attribute ) -->
<tk-slide layout type="text/x-markdown">
# Slide 2
</tk-slide>

<script src="./dist/webcomponents-loader.js"></script>
<script src="./dist/talkie.js"></script>
<script>
window.addEventListener('WebComponentsReady', function(e) {
  document.body.className += ' webcomponents-ready';
  talkie.run();
});
</script>
</body>
</html>
```

If you use the code highlighting, you must load these files.

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/monokai-sublime.min.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
```

### Slide ratio

The default slide is 4:3 (width 1024px, height 768px). If you execute it with the following code, the slide ratio becomes 16:9 (width: 1366px, height 768px).

```javascript
talkie.run({wide: true});
```

### Scrolling direction

The default scrollable direction is vertical. If you execute it with the following code, the scroll direction becomes horizontal.

```javascript
talkie.run({horizontal: true});
```

### Backface image & filter

You can add `backface` attribute into each slides. Image path that you specify in the backface attribute will be the background of when the slide is displayed.

```html
<section layout
         backface="background-image.jpg"
         backface-filter="blur(1px) brightness(.8)">

  <h1>Title</h1>
  <p>foo, bar, baz, qux...</p>

</section>
```

`backface-filter` attribute is applied to the background image as [CSS Filters](http://css-tricks.com/almanac/properties/f/filter/). But using this, will occur side effect significantly to performance on mobile device.

### All options

```typescript
interface TalkieOptions {
  wide?: boolean; // default: false
  horizontal?: boolean; // default: false
}

talkie.run(options);
```

### FullScreen mode

When you press the **"f"** key will be a full-screen mode. "f" or "Esc" key Press and then exit.

## Utilities

Many thanks!

- [ysugimoto/resumify: Capture screenshot and make PDF on your HTML presentation.](https://github.com/ysugimoto/resumify)
- [nakajmg/talkie-generator: Templates generator for Talkie.js](https://github.com/nakajmg/talkie-generator)

## Change Log

### v0.12

- Add option `linkShouldBlank`.
- Add `[horizontal]` style for default theme.
- Fixed that transition suppression was not appropriate.
- Update dependencies.

### v0.11

- Add experimental feature "canvas drawing". 
- Remove `Aozora Mincho` from default style.

### v0.10

- Improve accessibility support.
- `aria-hidden` attribute to use instead of `visible`,
- Rename attribute, `page` to `data-page`.
- Rename attribute, `body-bg` to `data-body-bg`.
- Rename attribute, `no-transition` to `data-no-transition`.

### v0.9

- Remove the Bacon.js, to use the [ReactiveX/rxjs](https://github.com/ReactiveX/RxJS) instead.
- Add `TalkieExport.key: (charKey: string) => Observable<KeyboardEvent>`. 
- Deprecated `TalkieExport.api`
- Deprecated `TalkieExport.controls`
- Fixed unexpected transparent background at fullscreen.
- Default theme some style changes.
  - `[invert]` has been cut out from the specified value of the layout.
  - Deprecated layouts `[title-invert]`, `[bullets-invert]`
  - Now it is specified as `[layout=title][invert]`.

## License

The MIT License (MIT)

[npm-image]: https://img.shields.io/npm/v/talkiejs.svg
[npm-url]: https://npmjs.org/package/talkiejs
[circle-image]: https://circleci.com/gh/ahomu/Talkie.svg?style=shield&circle-token=7ca8d50c44a6b81ca60ca327dc67e382a46a4829
[circle-url]: https://circleci.com/gh/ahomu/Talkie
[deps-image]: https://david-dm.org/ahomu/Talkie.svg
[deps-url]: https://david-dm.org/ahomu/Talkie
