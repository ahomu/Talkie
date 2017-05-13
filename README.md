Talkie.js - HTML/CSS/JavaScript Slide library
====================

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
- [x] Pointer attention
- [x] Progress indicator
- [x] Accessibility support
- [x] Canvas drawing mode (experimental)

## Real presentation sample

- [WAI-ARIA IN FRESH! & AbemaTV](http://s.aho.mu/160809-a11y_informal_study/)
- [CLIENT SIDE OF █████FRESH.TV](http://s.aho.mu/160405-node_school/)
- [Reactive Programming in JavaScript](http://ahomu.github.io/s/150221-frontrend_conference/index.html)
- [Bacon.js & Talkie.js](http://ahomu.github.io/s/150217-lt/index.html)

## Getting started

Talkie.js contains two of the CSS and one of JavaScript.

- dist/talkie.min.css
- dist/talkie.min.js
- dist/talkie-default.min.css

Next code is the simplest example.

```html
<html>
<head>
  <link rel="stylesheet" href="./dist/talkie.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.9.1/styles/monokai_sublime.min.css">
</head>
<body>

<!-- Pure HTML style -->
<section layout>
  <h1>Slide 1</h1>
</section>

<!-- Markdown style ( require `type` attribute ) -->
<script layout type="text/x-markdown">
# Slide 2
</script>

<!-- You can also use `<template>` element -->
<template layout type="text/x-markdown">
# Slide 2
</template>

<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.9.1/highlight.min.js"></script>
<script src="./dist/talkie.js"></script>
<script>Talkie();</script>
</body>
</html>
```

If you use the code highlighting, you must load these files.

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.9.1/styles/monokai_sublime.min.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.9.1/highlight.min.js"></script>
```

### Slide ratio

The default slide 4:3 (width 1024px, height 768px). In the following code ratio 16:9 (width: 1366px, height 768px) you will.

```javascript
Talkie({wide: true});
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
  wide?: boolean;
  control?: boolean;
  pointer?: boolean;
  progress?: boolean;
  backface?: boolean;
  notransition?: boolean;
  linkShouldBlank?: boolean;
}

Talkie(options);
```

### FullScreen mode

When you press the **"f"** key will be a full-screen mode. "f" or "Esc" key Press and then exit.

### Pointer mode

When you press the **"b"** key, the pointer `visibility` is toggled

### Canvas drawing mode

When you press the **"v"** key, the drawing mode is toggled, and clear line when press **"c"** key.

### Custom key binding & control

`Talkie()` returns an object with initialization. This object has some of the control bus and functionality.

```javascript
var talkie  = Talkie({wide:false});
```

You can define any key bindings.

```javascript
talkie.key('space').subscribe(talkie.next$);
talkie.key('s').subscribe(talkie.next$);
talkie.key('n').subscribe(talkie.next$);
talkie.key('a').subscribe(talkie.prev$);
talkie.key('p').subscribe(talkie.prev$);
```

It is also possible to control these functions in the program.

```javascript
window.next = function() {
  talkie.next$.next();
};
window.prev = function() {
  talkie.prev$.next();
};
window.jump = function(num) {
  talkie.jump$.next(num);
};
```

### All exports

```typescript
interface TalkieExports {
  key: (charKey: string) => Observable<KeyboardEvent>;
  notes: { [pageNum: number]: string };
  changed: Observable<HTMLElement>;
  ratio: Observable<number>;
  next$: Subject<void>;
  prev$: Subject<void>;
  jump$: Subject<number>;
}

var exports = Talkie();
```

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
