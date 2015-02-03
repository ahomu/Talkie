Talkie.js - HTML/CSS/JavaScript Slide library
====================

[![Licence](http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square)](https://npmjs.org/package/Talkie)
[![Version](http://img.shields.io/npm/v/Talkie.svg?style=flat-square)](https://npmjs.org/package/Talkie)

This library written in es6 JavaScript & [baconjs/bacon.js](https://github.com/baconjs/bacon.js). For more information about dependency Please look at the package.json.

## Feature

- [x] Markdown support
- [x] Code highlighting
- [ ] CSS transitions
- [x] Layout attributes
- [x] keyboard ready
- [ ] touch control ready
- [x] Responsive scaling (4:3, 16:9)
- [x] FullScreen mode
- [ ] Presenter mode (for rehearsal)
- [x] Progress indicator
- [ ] PDF download

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
<div id="scaler">
<!-- put your slides: start -->

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

<!-- put your slides: end -->
</div>
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

The default slide size 4:3 (width 1024px, height 768px) ratio. In the following code 16:9 (width: 1366px, height 768px) you will.

```javascript
Talkie({wide: true});
```

## Using API

If you want to using Talkie internal api. Like this and will get Talkie api object.

```
let Talkie = Talkie({api: true});
```

TODO api documents...

## License

The MIT License (MIT)
