Talkie.js - HTML/CSS/JavaScript Slide library
====================

[![npm version][npm-image]][npm-url] [![build status][circle-image]][circle-url] [![Dependency Status][deps-image]][deps-url]

This library written in es6 JavaScript & [baconjs/bacon.js](https://github.com/baconjs/bacon.js). Also serve as a practice of es6 and functional reactive programming.

For more information about dependency Please look at the [package.json](package.json).

## Feature

- [x] Markdown support
- [x] Code highlighting
- [ ] CSS transitions
- [ ] Layout attributes (WIP)
- [x] keyboard control
- [x] touch control
- [x] Responsive scaling (4:3, 16:9)
- [x] FullScreen mode
- [x] Background image & filter
- [x] Pointer attention
- [x] Progress indicator
- [ ] Thumbnail previews

## Real presentation sample

- [Reactive Programming in JavaScript](http://ahomu.github.io/s/150221-frontrend_conference/index.html)
- [Bacon.js & Talkie.js](http://ahomu.github.io/s/150217-lt/index.html)

## Getting started

Talkie.js contains one of the CSS and one of JavaScript.

- dist/talkie.min.css
- dist/talkie.min.js

Next code is the simplest sample.

```html
<html>
<head>
  <link rel="stylesheet" href="./dist/talkie.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/styles/monokai_sublime.min.css">
</head>
<body>

<!-- put your slides -->

<section layout>
  <h1>Slide 1</h1>
</section>

<script layout type="text/x-markdown">
# Slide 2
</script>

<script layout type="text/x-markdown">
\```javascript
function hello(str) {
  alert('Hello ' + str);
}
hello('World!')
\```
</script>

<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/highlight.min.js"></script>
<script src="./dist/talkie.js"></script>
<script>Talkie();</script>
</body>
</html>
```

If you use the code highlighting, you must load these files.

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/styles/monokai_sublime.min.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/highlight.min.js"></script>
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

```javascript
/**
 * @typedef {Object} TalkieOptions
 * @property {Boolean} [api=false]
 * @property {Boolean} [wide=false]
 * @property {Boolean} [control=true]
 * @property {Boolean} [pointer=true]
 * @property {Boolean} [progress=true]
 * @property {Boolean} [backface=true]
 * @property {Boolean} [notransition=false]
 */

Talkie(options);
```

### FullScreen mode

When you press the **"f"** key will be a full-screen mode. "f" or "Esc" key Press and then exit.

### Pointer mode

When you press the **"b"** key, the pointer `visibility` is toggled

### Custom key binding & control

`Talkie()` returns an object with initialization. This object has some of the control bus and functionality.

```javascript
/**
 * @typedef {Object} TalkieExport
 */
var talkie  = Talkie({wide:false});
```

You can define any key bindings.

```javascript
talkie.next.plug(talkie.control.key('space'));
talkie.next.plug(talkie.control.key('s'));
talkie.next.plug(talkie.control.key('n'));
talkie.prev.plug(talkie.control.key('a'));
talkie.prev.plug(talkie.control.key('p'));
```

It is also possible to control these functions in the program.

```javascript
window.next = function() {
  talkie.next.push();
};
window.prev = function() {
  talkie.prev.push();
};
window.jump = function(num) {
  talkie.jump.push(num);
};
```

### All exports

```javascript
/**
 * @typedef {Object} TalkieExport
 * @param {Object.<Function>} control
 * @param {Bacon.EventStream} changed
 * @param {Bacon.Bus} next
 * @param {Bacon.Bus} prev
 * @param {Bacon.Bus} jump
 * @param {Bacon.Property} ratio
 * @param {Object.<Number, String>} notes
 */

// @type {TalkieExport}
var talkie = Talkie();
```

## Internal API

If you want to using Talkie internal api. Like this and will get Talkie api object.

```html
<script src="./talkie.js"></script>
<script>var talkie = Talkie({api: true});</script>
```

or you can use `require` by [browserify](http://browserify.org/).

```javascript
// npm install --save talkiejs
var talkie = require('talkiejs')({api:true});
```

Look at the [index.js](src/index.js) you will see how to use the internal API. You referring to [index.js](src/index.js), can build a slide in its own UI.

## License

The MIT License (MIT)

[npm-image]: https://img.shields.io/npm/v/talkiejs.svg
[npm-url]: https://npmjs.org/package/talkiejs
[circle-image]: https://circleci.com/gh/ahomu/Talkie.svg?style=shield&circle-token=7ca8d50c44a6b81ca60ca327dc67e382a46a4829
[circle-url]: https://circleci.com/gh/ahomu/Talkie
[deps-image]: https://david-dm.org/ahomu/Talkie.svg
[deps-url]: https://david-dm.org/ahomu/Talkie
