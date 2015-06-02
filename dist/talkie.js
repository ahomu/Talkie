/*! talkie - v0.8.1 */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Talkie = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Talkie.js
 */

var _baconjs = require('baconjs');

var _baconjs2 = _interopRequireDefault(_baconjs);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _control = require('./control');

var _control2 = _interopRequireDefault(_control);

var _query = require('./query');

var _query2 = _interopRequireDefault(_query);

var _slide = require('./slide');

var _slide2 = _interopRequireDefault(_slide);

var _paging = require('./paging');

var _paging2 = _interopRequireDefault(_paging);

var _fullscreen = require('./fullscreen');

var _fullscreen2 = _interopRequireDefault(_fullscreen);

var _responsive = require('./responsive');

var _responsive2 = _interopRequireDefault(_responsive);

var _pointer = require('./pointer');

var _pointer2 = _interopRequireDefault(_pointer);

var _backface = require('./backface');

var _backface2 = _interopRequireDefault(_backface);

var IDENT_NEXT = 'next';
var IDENT_PREV = 'prev';
var IDENT_SCALER = 'scaler';
var IDENT_CONTROL = 'control';
var IDENT_PAGE = 'page';
var IDENT_TOTAL = 'total';
var IDENT_PROGRESS = 'progress';
var IDENT_POINTER = 'pointer';
var IDENT_BACKFACE = 'backface';

var SELECTOR_MD = '[type="text/x-markdown"]';

var ATTR_LAYOUT = 'layout';
var ATTR_BODY_BG = 'body-bg';
var ATTR_PAGE = 'page';
var ATTR_NO_TRANS = 'no-transition';

var NORMAL_WIDTH = 1024;
var NORMAL_HEIGHT = 768;
var WIDE_WIDTH = 1366;
var WIDE_HEIGHT = 768;

/**
 * @typedef {Object} TalkieOptions
 * @property {Boolean} [api]
 * @property {Boolean} [wide]
 * @property {Boolean} [control]
 * @property {Boolean} [pointer]
 * @property {Boolean} [progress]
 * @property {Boolean} [backface]
 */

/**
 * @param {TalkieOptions} options
 */

exports['default'] = function () {
  var options = arguments[0] === undefined ? {} : arguments[0];

  return !options.api ? main(options) : {
    main: main,
    util: _util2['default'],
    control: _control2['default'],
    query: _query2['default'],
    slide: _slide2['default'],
    paging: _paging2['default'],
    fullScreen: _fullscreen2['default'],
    responsive: _responsive2['default'],
    pointer: _pointer2['default'],
    backface: _backface2['default'],
    Bacon: _baconjs2['default']
  };
};

/**
 * @param {TalkieOptions} _options
 */
function main() {
  var _options = arguments[0] === undefined ? {} : arguments[0];

  /**
   * apply default options
   * @type {*|Object}
   */
  var options = _util2['default'].extend(_util2['default'].defaults(_options, {
    api: false,
    wide: false,
    control: true,
    pointer: true,
    progress: true,
    backface: true,
    notransition: false
  }), (0, _query2['default'])(location.search));

  /**
   * Init slide sizes
   */
  var width = options.wide ? WIDE_WIDTH : NORMAL_WIDTH;
  var height = options.wide ? WIDE_HEIGHT : NORMAL_HEIGHT;
  document.querySelector('head').insertAdjacentHTML('beforeend', '\n    <style>\n      [layout],\n      #' + IDENT_SCALER + ' {\n        width: ' + width + 'px !important;\n        height: ' + height + 'px !important;\n      }\n    </style>');

  /**
   * Init slide sections
   *   1. compile markdowns
   *   2. traverse slides & assign page number
   *   3. extract presenter notes
   */
  var mds = _util2['default'].toArray(document.querySelectorAll(SELECTOR_MD));
  mds.forEach(_slide2['default'].compileMarkdown);
  var slides = _util2['default'].toArray(document.querySelectorAll('[' + ATTR_LAYOUT + ']'));
  slides.forEach(function (el, i) {
    return _util2['default'].attributeAssignOf(el, ATTR_PAGE)(i + 1);
  });
  var notes = {};
  slides.map(_slide2['default'].extractNote).forEach(function (txt, i) {
    return notes[i + 1] = txt;
  });

  /**
   * Responsive scaling
   */
  document.body.insertAdjacentHTML('beforeend', '\n    <div id="' + IDENT_SCALER + '"></div>\n  ');
  var scalerEl = _util2['default'].getById(IDENT_SCALER);
  slides.forEach(function (el) {
    return scalerEl.appendChild(el);
  });

  var responsive = (0, _responsive2['default'])({
    width: width,
    height: height,
    target: scalerEl
  });
  responsive.scaleBus.plug(_control2['default'].resize());

  /**
   * Paging control
   */
  var paging = (0, _paging2['default'])({
    startPage: _util2['default'].getPageNumberFromHash() || 1,
    endPage: slides.length,
    slideElements: slides
  });

  paging.nextBus.plug(_control2['default'].keydown('right').throttle(100));
  paging.prevBus.plug(_control2['default'].keydown('left').throttle(100));

  paging.nextBus.plug(_control2['default'].swipeLeft());
  paging.prevBus.plug(_control2['default'].swipeRight());

  // sync location.hash
  paging.moveBus.plug(_control2['default'].hashchange().map(_util2['default'].getPageNumberFromHash));
  paging.currentEs.onValue(function (page) {
    page === 1 && !location.hash || (location.hash = page);
  });

  // sync body background attribute
  paging.changedEs.map('.getAttribute', ATTR_LAYOUT).onValue(_util2['default'].attributeAssignOf(document.body, ATTR_BODY_BG));

  /**
   * Insert Ui Elements
   */
  if (options.notransition) {
    _baconjs2['default'].once(1).onValue(_util2['default'].attributeAssignOf(document.body, ATTR_NO_TRANS));
  }

  if (options.pointer) {
    document.body.insertAdjacentHTML('beforeend', '<div id="' + IDENT_POINTER + '"></div>');

    var _$pointer = (0, _pointer2['default'])(_util2['default'].getById(IDENT_POINTER));

    var coordBus = _$pointer.coordBus;
    var toggleBus = _$pointer.toggleBus;

    coordBus.plug(_control2['default'].mousemove());
    toggleBus.plug(_control2['default'].key('b'));
  }

  if (options.backface) {
    document.body.insertAdjacentHTML('beforeend', '<div id="' + IDENT_BACKFACE + '"></div>');

    var _$backface = (0, _backface2['default'])(_util2['default'].getById(IDENT_BACKFACE));

    var bgImageBus = _$backface.bgImageBus;
    var bgFilterBus = _$backface.bgFilterBus;

    bgImageBus.plug(paging.changedEs);
    bgFilterBus.plug(paging.changedEs);
  }

  if (options.control) {
    document.body.insertAdjacentHTML('beforeend', '\n      <div id="' + IDENT_CONTROL + '">\n        <p><span id="' + IDENT_PREV + '">◀</span>\n        Page <span id="' + IDENT_PAGE + '">0</span> of <span id="' + IDENT_TOTAL + '">0</span>\n        <span id="' + IDENT_NEXT + '">▶</span></p>\n      </div>\n    ');

    var nextEl = _util2['default'].getById(IDENT_NEXT);
    var prevEl = _util2['default'].getById(IDENT_PREV);

    // next button
    paging.nextBus.plug(_control2['default'].click(nextEl));

    // prev button
    paging.prevBus.plug(_control2['default'].click(prevEl));

    // current page
    paging.currentEs.onValue(_util2['default'].textAssignOf(_util2['default'].getById(IDENT_PAGE)));

    // total of page
    _baconjs2['default'].once(slides.length).onValue(_util2['default'].textAssignOf(_util2['default'].getById(IDENT_TOTAL)));
  }

  if (options.progress) {
    document.body.insertAdjacentHTML('beforeend', '<div id="' + IDENT_PROGRESS + '"></div>');

    // progress bar
    paging.percentEs.onValue(_util2['default'].styleAssignOf(_util2['default'].getById(IDENT_PROGRESS), 'width'));
  }

  /**
   * FullScreen
   */
  (0, _fullscreen2['default'])(document.body).plug(_control2['default'].key('f'));

  /**
   * export some of control
   *
   * @typedef {Object} TalkieExport
   * @param {Object.<Function>} control
   * @param {Bacon.EventStream} changed
   * @param {Bacon.Bus} next
   * @param {Bacon.Bus} prev
   * @param {Bacon.Bus} jump
   * @param {Bacon.Property} ratio
   * @param {Object.<Number, String>} notes
   */
  return {
    Bacon: _baconjs2['default'],
    control: _control2['default'],
    changed: paging.changedEs,
    next: paging.nextBus,
    prev: paging.prevBus,
    jump: paging.moveBus,
    ratio: responsive.currentRatio,
    notes: notes
  };
}
module.exports = exports['default'];

},{"./backface":71,"./control":72,"./fullscreen":73,"./paging":74,"./pointer":75,"./query":76,"./responsive":77,"./slide":78,"./util":79,"baconjs":2}],2:[function(require,module,exports){
(function() {
  var Bacon, BufferingSource, Bus, CompositeUnsubscribe, ConsumingSource, Desc, Dispatcher, End, Error, Event, EventStream, Exception, Initial, Next, None, Observable, Property, PropertyDispatcher, Some, Source, UpdateBarrier, _, addPropertyInitValueToStream, assert, assertArray, assertEventStream, assertFunction, assertNoArguments, assertObservable, assertObservableIsProperty, assertString, cloneArray, constantToFunction, containsDuplicateDeps, convertArgsToFunction, describe, endEvent, eventIdCounter, eventMethods, findDeps, findHandlerMethods, flatMap_, former, idCounter, initialEvent, isArray, isFieldKey, isObservable, latter, liftCallback, makeFunction, makeFunctionArgs, makeFunction_, makeObservable, makeSpawner, nextEvent, nop, partiallyApplied, recursionDepth, ref, registerObs, spys, toCombinator, toEvent, toFieldExtractor, toFieldKey, toOption, toSimpleExtractor, valueAndEnd, withDescription, withMethodCallSupport,
    hasProp = {}.hasOwnProperty,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Bacon = {
    toString: function() {
      return "Bacon";
    }
  };

  Bacon.version = '0.7.60';

  Exception = (typeof global !== "undefined" && global !== null ? global : this).Error;

  nop = function() {};

  latter = function(_, x) {
    return x;
  };

  former = function(x, _) {
    return x;
  };

  cloneArray = function(xs) {
    return xs.slice(0);
  };

  assert = function(message, condition) {
    if (!condition) {
      throw new Exception(message);
    }
  };

  assertObservableIsProperty = function(x) {
    if (x instanceof Observable && !(x instanceof Property)) {
      throw new Exception("Observable is not a Property : " + x);
    }
  };

  assertEventStream = function(event) {
    if (!(event instanceof EventStream)) {
      throw new Exception("not an EventStream : " + event);
    }
  };

  assertObservable = function(event) {
    if (!(event instanceof Observable)) {
      throw new Exception("not an Observable : " + event);
    }
  };

  assertFunction = function(f) {
    return assert("not a function : " + f, _.isFunction(f));
  };

  isArray = function(xs) {
    return xs instanceof Array;
  };

  isObservable = function(x) {
    return x instanceof Observable;
  };

  assertArray = function(xs) {
    if (!isArray(xs)) {
      throw new Exception("not an array : " + xs);
    }
  };

  assertNoArguments = function(args) {
    return assert("no arguments supported", args.length === 0);
  };

  assertString = function(x) {
    if (typeof x !== "string") {
      throw new Exception("not a string : " + x);
    }
  };

  _ = {
    indexOf: Array.prototype.indexOf ? function(xs, x) {
      return xs.indexOf(x);
    } : function(xs, x) {
      var i, j, len1, y;
      for (i = j = 0, len1 = xs.length; j < len1; i = ++j) {
        y = xs[i];
        if (x === y) {
          return i;
        }
      }
      return -1;
    },
    indexWhere: function(xs, f) {
      var i, j, len1, y;
      for (i = j = 0, len1 = xs.length; j < len1; i = ++j) {
        y = xs[i];
        if (f(y)) {
          return i;
        }
      }
      return -1;
    },
    head: function(xs) {
      return xs[0];
    },
    always: function(x) {
      return function() {
        return x;
      };
    },
    negate: function(f) {
      return function(x) {
        return !f(x);
      };
    },
    empty: function(xs) {
      return xs.length === 0;
    },
    tail: function(xs) {
      return xs.slice(1, xs.length);
    },
    filter: function(f, xs) {
      var filtered, j, len1, x;
      filtered = [];
      for (j = 0, len1 = xs.length; j < len1; j++) {
        x = xs[j];
        if (f(x)) {
          filtered.push(x);
        }
      }
      return filtered;
    },
    map: function(f, xs) {
      var j, len1, results, x;
      results = [];
      for (j = 0, len1 = xs.length; j < len1; j++) {
        x = xs[j];
        results.push(f(x));
      }
      return results;
    },
    each: function(xs, f) {
      var key, value;
      for (key in xs) {
        value = xs[key];
        f(key, value);
      }
      return void 0;
    },
    toArray: function(xs) {
      if (isArray(xs)) {
        return xs;
      } else {
        return [xs];
      }
    },
    contains: function(xs, x) {
      return _.indexOf(xs, x) !== -1;
    },
    id: function(x) {
      return x;
    },
    last: function(xs) {
      return xs[xs.length - 1];
    },
    all: function(xs, f) {
      var j, len1, x;
      if (f == null) {
        f = _.id;
      }
      for (j = 0, len1 = xs.length; j < len1; j++) {
        x = xs[j];
        if (!f(x)) {
          return false;
        }
      }
      return true;
    },
    any: function(xs, f) {
      var j, len1, x;
      if (f == null) {
        f = _.id;
      }
      for (j = 0, len1 = xs.length; j < len1; j++) {
        x = xs[j];
        if (f(x)) {
          return true;
        }
      }
      return false;
    },
    without: function(x, xs) {
      return _.filter((function(y) {
        return y !== x;
      }), xs);
    },
    remove: function(x, xs) {
      var i;
      i = _.indexOf(xs, x);
      if (i >= 0) {
        return xs.splice(i, 1);
      }
    },
    fold: function(xs, seed, f) {
      var j, len1, x;
      for (j = 0, len1 = xs.length; j < len1; j++) {
        x = xs[j];
        seed = f(seed, x);
      }
      return seed;
    },
    flatMap: function(f, xs) {
      return _.fold(xs, [], (function(ys, x) {
        return ys.concat(f(x));
      }));
    },
    cached: function(f) {
      var value;
      value = None;
      return function() {
        if (value === None) {
          value = f();
          f = void 0;
        }
        return value;
      };
    },
    isFunction: function(f) {
      return typeof f === "function";
    },
    toString: function(obj) {
      var ex, internals, key, value;
      try {
        recursionDepth++;
        if (obj == null) {
          return "undefined";
        } else if (_.isFunction(obj)) {
          return "function";
        } else if (isArray(obj)) {
          if (recursionDepth > 5) {
            return "[..]";
          }
          return "[" + _.map(_.toString, obj).toString() + "]";
        } else if (((obj != null ? obj.toString : void 0) != null) && obj.toString !== Object.prototype.toString) {
          return obj.toString();
        } else if (typeof obj === "object") {
          if (recursionDepth > 5) {
            return "{..}";
          }
          internals = (function() {
            var results;
            results = [];
            for (key in obj) {
              if (!hasProp.call(obj, key)) continue;
              value = (function() {
                try {
                  return obj[key];
                } catch (_error) {
                  ex = _error;
                  return ex;
                }
              })();
              results.push(_.toString(key) + ":" + _.toString(value));
            }
            return results;
          })();
          return "{" + internals + "}";
        } else {
          return obj;
        }
      } finally {
        recursionDepth--;
      }
    }
  };

  recursionDepth = 0;

  Bacon._ = _;

  UpdateBarrier = Bacon.UpdateBarrier = (function() {
    var afterTransaction, afters, aftersIndex, currentEventId, flush, flushDepsOf, flushWaiters, hasWaiters, inTransaction, rootEvent, waiterObs, waiters, whenDoneWith, wrappedSubscribe;
    rootEvent = void 0;
    waiterObs = [];
    waiters = {};
    afters = [];
    aftersIndex = 0;
    afterTransaction = function(f) {
      if (rootEvent) {
        return afters.push(f);
      } else {
        return f();
      }
    };
    whenDoneWith = function(obs, f) {
      var obsWaiters;
      if (rootEvent) {
        obsWaiters = waiters[obs.id];
        if (obsWaiters == null) {
          obsWaiters = waiters[obs.id] = [f];
          return waiterObs.push(obs);
        } else {
          return obsWaiters.push(f);
        }
      } else {
        return f();
      }
    };
    flush = function() {
      while (waiterObs.length > 0) {
        flushWaiters(0);
      }
      return void 0;
    };
    flushWaiters = function(index) {
      var f, j, len1, obs, obsId, obsWaiters;
      obs = waiterObs[index];
      obsId = obs.id;
      obsWaiters = waiters[obsId];
      waiterObs.splice(index, 1);
      delete waiters[obsId];
      flushDepsOf(obs);
      for (j = 0, len1 = obsWaiters.length; j < len1; j++) {
        f = obsWaiters[j];
        f();
      }
      return void 0;
    };
    flushDepsOf = function(obs) {
      var dep, deps, index, j, len1;
      deps = obs.internalDeps();
      for (j = 0, len1 = deps.length; j < len1; j++) {
        dep = deps[j];
        flushDepsOf(dep);
        if (waiters[dep.id]) {
          index = _.indexOf(waiterObs, dep);
          flushWaiters(index);
        }
      }
      return void 0;
    };
    inTransaction = function(event, context, f, args) {
      var after, result;
      if (rootEvent) {
        return f.apply(context, args);
      } else {
        rootEvent = event;
        try {
          result = f.apply(context, args);
          flush();
        } finally {
          rootEvent = void 0;
          while (aftersIndex < afters.length) {
            after = afters[aftersIndex];
            aftersIndex++;
            after();
          }
          aftersIndex = 0;
          afters = [];
        }
        return result;
      }
    };
    currentEventId = function() {
      if (rootEvent) {
        return rootEvent.id;
      } else {
        return void 0;
      }
    };
    wrappedSubscribe = function(obs, sink) {
      var doUnsub, shouldUnsub, unsub, unsubd;
      unsubd = false;
      shouldUnsub = false;
      doUnsub = function() {
        return shouldUnsub = true;
      };
      unsub = function() {
        unsubd = true;
        return doUnsub();
      };
      doUnsub = obs.dispatcher.subscribe(function(event) {
        return afterTransaction(function() {
          var reply;
          if (!unsubd) {
            reply = sink(event);
            if (reply === Bacon.noMore) {
              return unsub();
            }
          }
        });
      });
      if (shouldUnsub) {
        doUnsub();
      }
      return unsub;
    };
    hasWaiters = function() {
      return waiterObs.length > 0;
    };
    return {
      whenDoneWith: whenDoneWith,
      hasWaiters: hasWaiters,
      inTransaction: inTransaction,
      currentEventId: currentEventId,
      wrappedSubscribe: wrappedSubscribe,
      afterTransaction: afterTransaction
    };
  })();

  Source = (function() {
    function Source(obs1, sync, lazy1) {
      this.obs = obs1;
      this.sync = sync;
      this.lazy = lazy1 != null ? lazy1 : false;
      this.queue = [];
    }

    Source.prototype.subscribe = function(sink) {
      return this.obs.dispatcher.subscribe(sink);
    };

    Source.prototype.toString = function() {
      return this.obs.toString();
    };

    Source.prototype.markEnded = function() {
      return this.ended = true;
    };

    Source.prototype.consume = function() {
      if (this.lazy) {
        return {
          value: _.always(this.queue[0])
        };
      } else {
        return this.queue[0];
      }
    };

    Source.prototype.push = function(x) {
      return this.queue = [x];
    };

    Source.prototype.mayHave = function() {
      return true;
    };

    Source.prototype.hasAtLeast = function() {
      return this.queue.length;
    };

    Source.prototype.flatten = true;

    return Source;

  })();

  ConsumingSource = (function(superClass) {
    extend(ConsumingSource, superClass);

    function ConsumingSource() {
      return ConsumingSource.__super__.constructor.apply(this, arguments);
    }

    ConsumingSource.prototype.consume = function() {
      return this.queue.shift();
    };

    ConsumingSource.prototype.push = function(x) {
      return this.queue.push(x);
    };

    ConsumingSource.prototype.mayHave = function(c) {
      return !this.ended || this.queue.length >= c;
    };

    ConsumingSource.prototype.hasAtLeast = function(c) {
      return this.queue.length >= c;
    };

    ConsumingSource.prototype.flatten = false;

    return ConsumingSource;

  })(Source);

  BufferingSource = (function(superClass) {
    extend(BufferingSource, superClass);

    function BufferingSource(obs) {
      BufferingSource.__super__.constructor.call(this, obs, true);
    }

    BufferingSource.prototype.consume = function() {
      var values;
      values = this.queue;
      this.queue = [];
      return {
        value: function() {
          return values;
        }
      };
    };

    BufferingSource.prototype.push = function(x) {
      return this.queue.push(x.value());
    };

    BufferingSource.prototype.hasAtLeast = function() {
      return true;
    };

    return BufferingSource;

  })(Source);

  Source.isTrigger = function(s) {
    if (s instanceof Source) {
      return s.sync;
    } else {
      return s instanceof EventStream;
    }
  };

  Source.fromObservable = function(s) {
    if (s instanceof Source) {
      return s;
    } else if (s instanceof Property) {
      return new Source(s, false);
    } else {
      return new ConsumingSource(s, true);
    }
  };

  Desc = (function() {
    function Desc(context1, method1, args1) {
      this.context = context1;
      this.method = method1;
      this.args = args1;
      this.cached = void 0;
    }

    Desc.prototype.deps = function() {
      return this.cached || (this.cached = findDeps([this.context].concat(this.args)));
    };

    Desc.prototype.apply = function(obs) {
      obs.desc = this;
      return obs;
    };

    Desc.prototype.toString = function() {
      return _.toString(this.context) + "." + _.toString(this.method) + "(" + _.map(_.toString, this.args) + ")";
    };

    return Desc;

  })();

  describe = function() {
    var args, context, method;
    context = arguments[0], method = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
    if ((context || method) instanceof Desc) {
      return context || method;
    } else {
      return new Desc(context, method, args);
    }
  };

  withDescription = function() {
    var desc, j, obs;
    desc = 2 <= arguments.length ? slice.call(arguments, 0, j = arguments.length - 1) : (j = 0, []), obs = arguments[j++];
    return describe.apply(null, desc).apply(obs);
  };

  findDeps = function(x) {
    if (isArray(x)) {
      return _.flatMap(findDeps, x);
    } else if (isObservable(x)) {
      return [x];
    } else if (x instanceof Source) {
      return [x.obs];
    } else {
      return [];
    }
  };

  withMethodCallSupport = function(wrapped) {
    return function() {
      var args, context, f, methodName;
      f = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      if (typeof f === "object" && args.length) {
        context = f;
        methodName = args[0];
        f = function() {
          return context[methodName].apply(context, arguments);
        };
        args = args.slice(1);
      }
      return wrapped.apply(null, [f].concat(slice.call(args)));
    };
  };

  makeFunctionArgs = function(args) {
    args = Array.prototype.slice.call(args);
    return makeFunction_.apply(null, args);
  };

  partiallyApplied = function(f, applied) {
    return function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return f.apply(null, applied.concat(args));
    };
  };

  toSimpleExtractor = function(args) {
    return function(key) {
      return function(value) {
        var fieldValue;
        if (value == null) {
          return void 0;
        } else {
          fieldValue = value[key];
          if (_.isFunction(fieldValue)) {
            return fieldValue.apply(value, args);
          } else {
            return fieldValue;
          }
        }
      };
    };
  };

  toFieldExtractor = function(f, args) {
    var partFuncs, parts;
    parts = f.slice(1).split(".");
    partFuncs = _.map(toSimpleExtractor(args), parts);
    return function(value) {
      var j, len1;
      for (j = 0, len1 = partFuncs.length; j < len1; j++) {
        f = partFuncs[j];
        value = f(value);
      }
      return value;
    };
  };

  isFieldKey = function(f) {
    return (typeof f === "string") && f.length > 1 && f.charAt(0) === ".";
  };

  makeFunction_ = withMethodCallSupport(function() {
    var args, f;
    f = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    if (_.isFunction(f)) {
      if (args.length) {
        return partiallyApplied(f, args);
      } else {
        return f;
      }
    } else if (isFieldKey(f)) {
      return toFieldExtractor(f, args);
    } else {
      return _.always(f);
    }
  });

  makeFunction = function(f, args) {
    return makeFunction_.apply(null, [f].concat(slice.call(args)));
  };

  convertArgsToFunction = function(obs, f, args, method) {
    var sampled;
    if (f instanceof Property) {
      sampled = f.sampledBy(obs, function(p, s) {
        return [p, s];
      });
      return method.call(sampled, function(arg) {
        var p, s;
        p = arg[0], s = arg[1];
        return p;
      }).map(function(arg) {
        var p, s;
        p = arg[0], s = arg[1];
        return s;
      });
    } else {
      f = makeFunction(f, args);
      return method.call(obs, f);
    }
  };

  toCombinator = function(f) {
    var key;
    if (_.isFunction(f)) {
      return f;
    } else if (isFieldKey(f)) {
      key = toFieldKey(f);
      return function(left, right) {
        return left[key](right);
      };
    } else {
      throw new Exception("not a function or a field key: " + f);
    }
  };

  toFieldKey = function(f) {
    return f.slice(1);
  };

  Some = (function() {
    function Some(value1) {
      this.value = value1;
    }

    Some.prototype.getOrElse = function() {
      return this.value;
    };

    Some.prototype.get = function() {
      return this.value;
    };

    Some.prototype.filter = function(f) {
      if (f(this.value)) {
        return new Some(this.value);
      } else {
        return None;
      }
    };

    Some.prototype.map = function(f) {
      return new Some(f(this.value));
    };

    Some.prototype.forEach = function(f) {
      return f(this.value);
    };

    Some.prototype.isDefined = true;

    Some.prototype.toArray = function() {
      return [this.value];
    };

    Some.prototype.inspect = function() {
      return "Some(" + this.value + ")";
    };

    Some.prototype.toString = function() {
      return this.inspect();
    };

    return Some;

  })();

  None = {
    getOrElse: function(value) {
      return value;
    },
    filter: function() {
      return None;
    },
    map: function() {
      return None;
    },
    forEach: function() {},
    isDefined: false,
    toArray: function() {
      return [];
    },
    inspect: function() {
      return "None";
    },
    toString: function() {
      return this.inspect();
    }
  };

  toOption = function(v) {
    if (v instanceof Some || v === None) {
      return v;
    } else {
      return new Some(v);
    }
  };

  Bacon.noMore = ["<no-more>"];

  Bacon.more = ["<more>"];

  eventIdCounter = 0;

  Event = (function() {
    function Event() {
      this.id = ++eventIdCounter;
    }

    Event.prototype.isEvent = function() {
      return true;
    };

    Event.prototype.isEnd = function() {
      return false;
    };

    Event.prototype.isInitial = function() {
      return false;
    };

    Event.prototype.isNext = function() {
      return false;
    };

    Event.prototype.isError = function() {
      return false;
    };

    Event.prototype.hasValue = function() {
      return false;
    };

    Event.prototype.filter = function() {
      return true;
    };

    Event.prototype.inspect = function() {
      return this.toString();
    };

    Event.prototype.log = function() {
      return this.toString();
    };

    return Event;

  })();

  Next = (function(superClass) {
    extend(Next, superClass);

    function Next(valueF, eager) {
      Next.__super__.constructor.call(this);
      if (!eager && _.isFunction(valueF) || valueF instanceof Next) {
        this.valueF = valueF;
        this.valueInternal = void 0;
      } else {
        this.valueF = void 0;
        this.valueInternal = valueF;
      }
    }

    Next.prototype.isNext = function() {
      return true;
    };

    Next.prototype.hasValue = function() {
      return true;
    };

    Next.prototype.value = function() {
      if (this.valueF instanceof Next) {
        this.valueInternal = this.valueF.value();
        this.valueF = void 0;
      } else if (this.valueF) {
        this.valueInternal = this.valueF();
        this.valueF = void 0;
      }
      return this.valueInternal;
    };

    Next.prototype.fmap = function(f) {
      var event, value;
      if (this.valueInternal) {
        value = this.valueInternal;
        return this.apply(function() {
          return f(value);
        });
      } else {
        event = this;
        return this.apply(function() {
          return f(event.value());
        });
      }
    };

    Next.prototype.apply = function(value) {
      return new Next(value);
    };

    Next.prototype.filter = function(f) {
      return f(this.value());
    };

    Next.prototype.toString = function() {
      return _.toString(this.value());
    };

    Next.prototype.log = function() {
      return this.value();
    };

    return Next;

  })(Event);

  Initial = (function(superClass) {
    extend(Initial, superClass);

    function Initial() {
      return Initial.__super__.constructor.apply(this, arguments);
    }

    Initial.prototype.isInitial = function() {
      return true;
    };

    Initial.prototype.isNext = function() {
      return false;
    };

    Initial.prototype.apply = function(value) {
      return new Initial(value);
    };

    Initial.prototype.toNext = function() {
      return new Next(this);
    };

    return Initial;

  })(Next);

  End = (function(superClass) {
    extend(End, superClass);

    function End() {
      return End.__super__.constructor.apply(this, arguments);
    }

    End.prototype.isEnd = function() {
      return true;
    };

    End.prototype.fmap = function() {
      return this;
    };

    End.prototype.apply = function() {
      return this;
    };

    End.prototype.toString = function() {
      return "<end>";
    };

    return End;

  })(Event);

  Error = (function(superClass) {
    extend(Error, superClass);

    function Error(error1) {
      this.error = error1;
    }

    Error.prototype.isError = function() {
      return true;
    };

    Error.prototype.fmap = function() {
      return this;
    };

    Error.prototype.apply = function() {
      return this;
    };

    Error.prototype.toString = function() {
      return "<error> " + _.toString(this.error);
    };

    return Error;

  })(Event);

  Bacon.Event = Event;

  Bacon.Initial = Initial;

  Bacon.Next = Next;

  Bacon.End = End;

  Bacon.Error = Error;

  initialEvent = function(value) {
    return new Initial(value, true);
  };

  nextEvent = function(value) {
    return new Next(value, true);
  };

  endEvent = function() {
    return new End();
  };

  toEvent = function(x) {
    if (x instanceof Event) {
      return x;
    } else {
      return nextEvent(x);
    }
  };

  idCounter = 0;

  registerObs = function() {};

  Observable = (function() {
    function Observable(desc) {
      this.id = ++idCounter;
      withDescription(desc, this);
      this.initialDesc = this.desc;
    }

    Observable.prototype.subscribe = function(sink) {
      return UpdateBarrier.wrappedSubscribe(this, sink);
    };

    Observable.prototype.subscribeInternal = function(sink) {
      return this.dispatcher.subscribe(sink);
    };

    Observable.prototype.onValue = function() {
      var f;
      f = makeFunctionArgs(arguments);
      return this.subscribe(function(event) {
        if (event.hasValue()) {
          return f(event.value());
        }
      });
    };

    Observable.prototype.onValues = function(f) {
      return this.onValue(function(args) {
        return f.apply(null, args);
      });
    };

    Observable.prototype.onError = function() {
      var f;
      f = makeFunctionArgs(arguments);
      return this.subscribe(function(event) {
        if (event.isError()) {
          return f(event.error);
        }
      });
    };

    Observable.prototype.onEnd = function() {
      var f;
      f = makeFunctionArgs(arguments);
      return this.subscribe(function(event) {
        if (event.isEnd()) {
          return f();
        }
      });
    };

    Observable.prototype.name = function(name) {
      this._name = name;
      return this;
    };

    Observable.prototype.withDescription = function() {
      return describe.apply(null, arguments).apply(this);
    };

    Observable.prototype.toString = function() {
      if (this._name) {
        return this._name;
      } else {
        return this.desc.toString();
      }
    };

    Observable.prototype.internalDeps = function() {
      return this.initialDesc.deps();
    };

    return Observable;

  })();

  Observable.prototype.assign = Observable.prototype.onValue;

  Observable.prototype.forEach = Observable.prototype.onValue;

  Observable.prototype.inspect = Observable.prototype.toString;

  Bacon.Observable = Observable;

  CompositeUnsubscribe = (function() {
    function CompositeUnsubscribe(ss) {
      var j, len1, s;
      if (ss == null) {
        ss = [];
      }
      this.unsubscribe = bind(this.unsubscribe, this);
      this.unsubscribed = false;
      this.subscriptions = [];
      this.starting = [];
      for (j = 0, len1 = ss.length; j < len1; j++) {
        s = ss[j];
        this.add(s);
      }
    }

    CompositeUnsubscribe.prototype.add = function(subscription) {
      var ended, unsub, unsubMe;
      if (this.unsubscribed) {
        return;
      }
      ended = false;
      unsub = nop;
      this.starting.push(subscription);
      unsubMe = (function(_this) {
        return function() {
          if (_this.unsubscribed) {
            return;
          }
          ended = true;
          _this.remove(unsub);
          return _.remove(subscription, _this.starting);
        };
      })(this);
      unsub = subscription(this.unsubscribe, unsubMe);
      if (!(this.unsubscribed || ended)) {
        this.subscriptions.push(unsub);
      } else {
        unsub();
      }
      _.remove(subscription, this.starting);
      return unsub;
    };

    CompositeUnsubscribe.prototype.remove = function(unsub) {
      if (this.unsubscribed) {
        return;
      }
      if ((_.remove(unsub, this.subscriptions)) !== void 0) {
        return unsub();
      }
    };

    CompositeUnsubscribe.prototype.unsubscribe = function() {
      var j, len1, ref, s;
      if (this.unsubscribed) {
        return;
      }
      this.unsubscribed = true;
      ref = this.subscriptions;
      for (j = 0, len1 = ref.length; j < len1; j++) {
        s = ref[j];
        s();
      }
      this.subscriptions = [];
      return this.starting = [];
    };

    CompositeUnsubscribe.prototype.count = function() {
      if (this.unsubscribed) {
        return 0;
      }
      return this.subscriptions.length + this.starting.length;
    };

    CompositeUnsubscribe.prototype.empty = function() {
      return this.count() === 0;
    };

    return CompositeUnsubscribe;

  })();

  Bacon.CompositeUnsubscribe = CompositeUnsubscribe;

  Dispatcher = (function() {
    function Dispatcher(_subscribe, _handleEvent) {
      this._subscribe = _subscribe;
      this._handleEvent = _handleEvent;
      this.subscribe = bind(this.subscribe, this);
      this.handleEvent = bind(this.handleEvent, this);
      this.subscriptions = [];
      this.queue = [];
      this.pushing = false;
      this.ended = false;
      this.prevError = void 0;
      this.unsubSrc = void 0;
    }

    Dispatcher.prototype.hasSubscribers = function() {
      return this.subscriptions.length > 0;
    };

    Dispatcher.prototype.removeSub = function(subscription) {
      return this.subscriptions = _.without(subscription, this.subscriptions);
    };

    Dispatcher.prototype.push = function(event) {
      if (event.isEnd()) {
        this.ended = true;
      }
      return UpdateBarrier.inTransaction(event, this, this.pushIt, [event]);
    };

    Dispatcher.prototype.pushToSubscriptions = function(event) {
      var e, j, len1, reply, sub, tmp;
      try {
        tmp = this.subscriptions;
        for (j = 0, len1 = tmp.length; j < len1; j++) {
          sub = tmp[j];
          reply = sub.sink(event);
          if (reply === Bacon.noMore || event.isEnd()) {
            this.removeSub(sub);
          }
        }
        return true;
      } catch (_error) {
        e = _error;
        this.pushing = false;
        this.queue = [];
        throw e;
      }
    };

    Dispatcher.prototype.pushIt = function(event) {
      if (!this.pushing) {
        if (event === this.prevError) {
          return;
        }
        if (event.isError()) {
          this.prevError = event;
        }
        this.pushing = true;
        this.pushToSubscriptions(event);
        this.pushing = false;
        while (this.queue.length) {
          event = this.queue.shift();
          this.push(event);
        }
        if (this.hasSubscribers()) {
          return Bacon.more;
        } else {
          this.unsubscribeFromSource();
          return Bacon.noMore;
        }
      } else {
        this.queue.push(event);
        return Bacon.more;
      }
    };

    Dispatcher.prototype.handleEvent = function(event) {
      if (this._handleEvent) {
        return this._handleEvent(event);
      } else {
        return this.push(event);
      }
    };

    Dispatcher.prototype.unsubscribeFromSource = function() {
      if (this.unsubSrc) {
        this.unsubSrc();
      }
      return this.unsubSrc = void 0;
    };

    Dispatcher.prototype.subscribe = function(sink) {
      var subscription;
      if (this.ended) {
        sink(endEvent());
        return nop;
      } else {
        assertFunction(sink);
        subscription = {
          sink: sink
        };
        this.subscriptions.push(subscription);
        if (this.subscriptions.length === 1) {
          this.unsubSrc = this._subscribe(this.handleEvent);
          assertFunction(this.unsubSrc);
        }
        return (function(_this) {
          return function() {
            _this.removeSub(subscription);
            if (!_this.hasSubscribers()) {
              return _this.unsubscribeFromSource();
            }
          };
        })(this);
      }
    };

    return Dispatcher;

  })();

  EventStream = (function(superClass) {
    extend(EventStream, superClass);

    function EventStream(desc, subscribe, handler) {
      if (_.isFunction(desc)) {
        handler = subscribe;
        subscribe = desc;
        desc = [];
      }
      EventStream.__super__.constructor.call(this, desc);
      assertFunction(subscribe);
      this.dispatcher = new Dispatcher(subscribe, handler);
      registerObs(this);
    }

    EventStream.prototype.toProperty = function(initValue_) {
      var disp, initValue;
      initValue = arguments.length === 0 ? None : toOption(function() {
        return initValue_;
      });
      disp = this.dispatcher;
      return new Property(describe(this, "toProperty", initValue_), function(sink) {
        var initSent, reply, sendInit, unsub;
        initSent = false;
        unsub = nop;
        reply = Bacon.more;
        sendInit = function() {
          if (!initSent) {
            return initValue.forEach(function(value) {
              initSent = true;
              reply = sink(new Initial(value));
              if (reply === Bacon.noMore) {
                unsub();
                return unsub = nop;
              }
            });
          }
        };
        unsub = disp.subscribe(function(event) {
          if (event.hasValue()) {
            if (initSent && event.isInitial()) {
              return Bacon.more;
            } else {
              if (!event.isInitial()) {
                sendInit();
              }
              initSent = true;
              initValue = new Some(event);
              return sink(event);
            }
          } else {
            if (event.isEnd()) {
              reply = sendInit();
            }
            if (reply !== Bacon.noMore) {
              return sink(event);
            }
          }
        });
        sendInit();
        return unsub;
      });
    };

    EventStream.prototype.toEventStream = function() {
      return this;
    };

    EventStream.prototype.withHandler = function(handler) {
      return new EventStream(describe(this, "withHandler", handler), this.dispatcher.subscribe, handler);
    };

    return EventStream;

  })(Observable);

  Bacon.EventStream = EventStream;

  Bacon.never = function() {
    return new EventStream(describe(Bacon, "never"), function(sink) {
      sink(endEvent());
      return nop;
    });
  };

  Bacon.when = function() {
    var f, i, index, ix, j, k, len, len1, len2, needsBarrier, pat, patSources, pats, patterns, ref, resultStream, s, sources, triggerFound, usage;
    if (arguments.length === 0) {
      return Bacon.never();
    }
    len = arguments.length;
    usage = "when: expecting arguments in the form (Observable+,function)+";
    assert(usage, len % 2 === 0);
    sources = [];
    pats = [];
    i = 0;
    patterns = [];
    while (i < len) {
      patterns[i] = arguments[i];
      patterns[i + 1] = arguments[i + 1];
      patSources = _.toArray(arguments[i]);
      f = constantToFunction(arguments[i + 1]);
      pat = {
        f: f,
        ixs: []
      };
      triggerFound = false;
      for (j = 0, len1 = patSources.length; j < len1; j++) {
        s = patSources[j];
        index = _.indexOf(sources, s);
        if (!triggerFound) {
          triggerFound = Source.isTrigger(s);
        }
        if (index < 0) {
          sources.push(s);
          index = sources.length - 1;
        }
        ref = pat.ixs;
        for (k = 0, len2 = ref.length; k < len2; k++) {
          ix = ref[k];
          if (ix.index === index) {
            ix.count++;
          }
        }
        pat.ixs.push({
          index: index,
          count: 1
        });
      }
      assert("At least one EventStream required", triggerFound || (!patSources.length));
      if (patSources.length > 0) {
        pats.push(pat);
      }
      i = i + 2;
    }
    if (!sources.length) {
      return Bacon.never();
    }
    sources = _.map(Source.fromObservable, sources);
    needsBarrier = (_.any(sources, function(s) {
      return s.flatten;
    })) && (containsDuplicateDeps(_.map((function(s) {
      return s.obs;
    }), sources)));
    return resultStream = new EventStream(describe.apply(null, [Bacon, "when"].concat(slice.call(patterns))), function(sink) {
      var cannotMatch, cannotSync, ends, match, nonFlattened, part, triggers;
      triggers = [];
      ends = false;
      match = function(p) {
        var l, len3, ref1;
        ref1 = p.ixs;
        for (l = 0, len3 = ref1.length; l < len3; l++) {
          i = ref1[l];
          if (!sources[i.index].hasAtLeast(i.count)) {
            return false;
          }
        }
        return true;
      };
      cannotSync = function(source) {
        return !source.sync || source.ended;
      };
      cannotMatch = function(p) {
        var l, len3, ref1;
        ref1 = p.ixs;
        for (l = 0, len3 = ref1.length; l < len3; l++) {
          i = ref1[l];
          if (!sources[i.index].mayHave(i.count)) {
            return true;
          }
        }
      };
      nonFlattened = function(trigger) {
        return !trigger.source.flatten;
      };
      part = function(source) {
        return function(unsubAll) {
          var flush, flushLater, flushWhileTriggers;
          flushLater = function() {
            return UpdateBarrier.whenDoneWith(resultStream, flush);
          };
          flushWhileTriggers = function() {
            var events, l, len3, p, reply, trigger;
            if (triggers.length > 0) {
              reply = Bacon.more;
              trigger = triggers.pop();
              for (l = 0, len3 = pats.length; l < len3; l++) {
                p = pats[l];
                if (match(p)) {
                  events = (function() {
                    var len4, m, ref1, results;
                    ref1 = p.ixs;
                    results = [];
                    for (m = 0, len4 = ref1.length; m < len4; m++) {
                      i = ref1[m];
                      results.push(sources[i.index].consume());
                    }
                    return results;
                  })();
                  reply = sink(trigger.e.apply(function() {
                    var event, values;
                    values = (function() {
                      var len4, m, results;
                      results = [];
                      for (m = 0, len4 = events.length; m < len4; m++) {
                        event = events[m];
                        results.push(event.value());
                      }
                      return results;
                    })();
                    return p.f.apply(p, values);
                  }));
                  if (triggers.length) {
                    triggers = _.filter(nonFlattened, triggers);
                  }
                  if (reply === Bacon.noMore) {
                    return reply;
                  } else {
                    return flushWhileTriggers();
                  }
                }
              }
            } else {
              return Bacon.more;
            }
          };
          flush = function() {
            var reply;
            reply = flushWhileTriggers();
            if (ends) {
              ends = false;
              if (_.all(sources, cannotSync) || _.all(pats, cannotMatch)) {
                reply = Bacon.noMore;
                sink(endEvent());
              }
            }
            if (reply === Bacon.noMore) {
              unsubAll();
            }
            return reply;
          };
          return source.subscribe(function(e) {
            var reply;
            if (e.isEnd()) {
              ends = true;
              source.markEnded();
              flushLater();
            } else if (e.isError()) {
              reply = sink(e);
            } else {
              source.push(e);
              if (source.sync) {
                triggers.push({
                  source: source,
                  e: e
                });
                if (needsBarrier || UpdateBarrier.hasWaiters()) {
                  flushLater();
                } else {
                  flush();
                }
              }
            }
            if (reply === Bacon.noMore) {
              unsubAll();
            }
            return reply || Bacon.more;
          });
        };
      };
      return new Bacon.CompositeUnsubscribe((function() {
        var l, len3, results;
        results = [];
        for (l = 0, len3 = sources.length; l < len3; l++) {
          s = sources[l];
          results.push(part(s));
        }
        return results;
      })()).unsubscribe;
    });
  };

  containsDuplicateDeps = function(observables, state) {
    var checkObservable;
    if (state == null) {
      state = [];
    }
    checkObservable = function(obs) {
      var deps;
      if (_.contains(state, obs)) {
        return true;
      } else {
        deps = obs.internalDeps();
        if (deps.length) {
          state.push(obs);
          return _.any(deps, checkObservable);
        } else {
          state.push(obs);
          return false;
        }
      }
    };
    return _.any(observables, checkObservable);
  };

  constantToFunction = function(f) {
    if (_.isFunction(f)) {
      return f;
    } else {
      return _.always(f);
    }
  };

  Bacon.groupSimultaneous = function() {
    var s, sources, streams;
    streams = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    if (streams.length === 1 && isArray(streams[0])) {
      streams = streams[0];
    }
    sources = (function() {
      var j, len1, results;
      results = [];
      for (j = 0, len1 = streams.length; j < len1; j++) {
        s = streams[j];
        results.push(new BufferingSource(s));
      }
      return results;
    })();
    return withDescription.apply(null, [Bacon, "groupSimultaneous"].concat(slice.call(streams), [Bacon.when(sources, (function() {
      var xs;
      xs = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return xs;
    }))]));
  };

  PropertyDispatcher = (function(superClass) {
    extend(PropertyDispatcher, superClass);

    function PropertyDispatcher(property1, subscribe, handleEvent) {
      this.property = property1;
      this.subscribe = bind(this.subscribe, this);
      PropertyDispatcher.__super__.constructor.call(this, subscribe, handleEvent);
      this.current = None;
      this.currentValueRootId = void 0;
      this.propertyEnded = false;
    }

    PropertyDispatcher.prototype.push = function(event) {
      if (event.isEnd()) {
        this.propertyEnded = true;
      }
      if (event.hasValue()) {
        this.current = new Some(event);
        this.currentValueRootId = UpdateBarrier.currentEventId();
      }
      return PropertyDispatcher.__super__.push.call(this, event);
    };

    PropertyDispatcher.prototype.maybeSubSource = function(sink, reply) {
      if (reply === Bacon.noMore) {
        return nop;
      } else if (this.propertyEnded) {
        sink(endEvent());
        return nop;
      } else {
        return Dispatcher.prototype.subscribe.call(this, sink);
      }
    };

    PropertyDispatcher.prototype.subscribe = function(sink) {
      var dispatchingId, initSent, reply, valId;
      initSent = false;
      reply = Bacon.more;
      if (this.current.isDefined && (this.hasSubscribers() || this.propertyEnded)) {
        dispatchingId = UpdateBarrier.currentEventId();
        valId = this.currentValueRootId;
        if (!this.propertyEnded && valId && dispatchingId && dispatchingId !== valId) {
          UpdateBarrier.whenDoneWith(this.property, (function(_this) {
            return function() {
              if (_this.currentValueRootId === valId) {
                return sink(initialEvent(_this.current.get().value()));
              }
            };
          })(this));
          return this.maybeSubSource(sink, reply);
        } else {
          UpdateBarrier.inTransaction(void 0, this, (function() {
            return reply = sink(initialEvent(this.current.get().value()));
          }), []);
          return this.maybeSubSource(sink, reply);
        }
      } else {
        return this.maybeSubSource(sink, reply);
      }
    };

    return PropertyDispatcher;

  })(Dispatcher);

  Property = (function(superClass) {
    extend(Property, superClass);

    function Property(desc, subscribe, handler) {
      if (_.isFunction(desc)) {
        handler = subscribe;
        subscribe = desc;
        desc = [];
      }
      Property.__super__.constructor.call(this, desc);
      assertFunction(subscribe);
      this.dispatcher = new PropertyDispatcher(this, subscribe, handler);
      registerObs(this);
    }

    Property.prototype.changes = function() {
      return new EventStream(describe(this, "changes"), (function(_this) {
        return function(sink) {
          return _this.dispatcher.subscribe(function(event) {
            if (!event.isInitial()) {
              return sink(event);
            }
          });
        };
      })(this));
    };

    Property.prototype.withHandler = function(handler) {
      return new Property(describe(this, "withHandler", handler), this.dispatcher.subscribe, handler);
    };

    Property.prototype.toProperty = function() {
      assertNoArguments(arguments);
      return this;
    };

    Property.prototype.toEventStream = function() {
      return new EventStream(describe(this, "toEventStream"), (function(_this) {
        return function(sink) {
          return _this.dispatcher.subscribe(function(event) {
            if (event.isInitial()) {
              event = event.toNext();
            }
            return sink(event);
          });
        };
      })(this));
    };

    return Property;

  })(Observable);

  Bacon.Property = Property;

  Bacon.constant = function(value) {
    return new Property(describe(Bacon, "constant", value), function(sink) {
      sink(initialEvent(value));
      sink(endEvent());
      return nop;
    });
  };

  Bacon.fromBinder = function(binder, eventTransformer) {
    if (eventTransformer == null) {
      eventTransformer = _.id;
    }
    return new EventStream(describe(Bacon, "fromBinder", binder, eventTransformer), function(sink) {
      var shouldUnbind, unbind, unbinder, unbound;
      unbound = false;
      shouldUnbind = false;
      unbind = function() {
        if (!unbound) {
          if (typeof unbinder !== "undefined" && unbinder !== null) {
            unbinder();
            return unbound = true;
          } else {
            return shouldUnbind = true;
          }
        }
      };
      unbinder = binder(function() {
        var args, event, j, len1, reply, value;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        value = eventTransformer.apply(this, args);
        if (!(isArray(value) && _.last(value) instanceof Event)) {
          value = [value];
        }
        reply = Bacon.more;
        for (j = 0, len1 = value.length; j < len1; j++) {
          event = value[j];
          reply = sink(event = toEvent(event));
          if (reply === Bacon.noMore || event.isEnd()) {
            unbind();
            return reply;
          }
        }
        return reply;
      });
      if (shouldUnbind) {
        unbind();
      }
      return unbind;
    });
  };

  eventMethods = [["addEventListener", "removeEventListener"], ["addListener", "removeListener"], ["on", "off"], ["bind", "unbind"]];

  findHandlerMethods = function(target) {
    var j, len1, methodPair, pair;
    for (j = 0, len1 = eventMethods.length; j < len1; j++) {
      pair = eventMethods[j];
      methodPair = [target[pair[0]], target[pair[1]]];
      if (methodPair[0] && methodPair[1]) {
        return methodPair;
      }
    }
    throw new Error("No suitable event methods in " + target);
  };

  Bacon.fromEventTarget = function(target, eventName, eventTransformer) {
    var ref, sub, unsub;
    ref = findHandlerMethods(target), sub = ref[0], unsub = ref[1];
    return withDescription(Bacon, "fromEvent", target, eventName, Bacon.fromBinder(function(handler) {
      sub.call(target, eventName, handler);
      return function() {
        return unsub.call(target, eventName, handler);
      };
    }, eventTransformer));
  };

  Bacon.fromEvent = Bacon.fromEventTarget;

  Bacon.Observable.prototype.map = function() {
    var args, p;
    p = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return convertArgsToFunction(this, p, args, function(f) {
      return withDescription(this, "map", f, this.withHandler(function(event) {
        return this.push(event.fmap(f));
      }));
    });
  };

  Bacon.combineAsArray = function() {
    var index, j, len1, s, sources, stream, streams;
    streams = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    if (streams.length === 1 && isArray(streams[0])) {
      streams = streams[0];
    }
    for (index = j = 0, len1 = streams.length; j < len1; index = ++j) {
      stream = streams[index];
      if (!(isObservable(stream))) {
        streams[index] = Bacon.constant(stream);
      }
    }
    if (streams.length) {
      sources = (function() {
        var k, len2, results;
        results = [];
        for (k = 0, len2 = streams.length; k < len2; k++) {
          s = streams[k];
          results.push(new Source(s, true));
        }
        return results;
      })();
      return withDescription.apply(null, [Bacon, "combineAsArray"].concat(slice.call(streams), [Bacon.when(sources, (function() {
        var xs;
        xs = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        return xs;
      })).toProperty()]));
    } else {
      return Bacon.constant([]);
    }
  };

  Bacon.onValues = function() {
    var f, j, streams;
    streams = 2 <= arguments.length ? slice.call(arguments, 0, j = arguments.length - 1) : (j = 0, []), f = arguments[j++];
    return Bacon.combineAsArray(streams).onValues(f);
  };

  Bacon.combineWith = function() {
    var f, streams;
    f = arguments[0], streams = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return withDescription.apply(null, [Bacon, "combineWith", f].concat(slice.call(streams), [Bacon.combineAsArray(streams).map(function(values) {
      return f.apply(null, values);
    })]));
  };

  Bacon.combineTemplate = function(template) {
    var applyStreamValue, combinator, compile, compileTemplate, constantValue, current, funcs, mkContext, setValue, streams;
    funcs = [];
    streams = [];
    current = function(ctxStack) {
      return ctxStack[ctxStack.length - 1];
    };
    setValue = function(ctxStack, key, value) {
      return current(ctxStack)[key] = value;
    };
    applyStreamValue = function(key, index) {
      return function(ctxStack, values) {
        return setValue(ctxStack, key, values[index]);
      };
    };
    constantValue = function(key, value) {
      return function(ctxStack) {
        return setValue(ctxStack, key, value);
      };
    };
    mkContext = function(template) {
      if (isArray(template)) {
        return [];
      } else {
        return {};
      }
    };
    compile = function(key, value) {
      var popContext, pushContext;
      if (isObservable(value)) {
        streams.push(value);
        return funcs.push(applyStreamValue(key, streams.length - 1));
      } else if (value === Object(value) && typeof value !== "function" && !(value instanceof RegExp) && !(value instanceof Date)) {
        pushContext = function(key) {
          return function(ctxStack) {
            var newContext;
            newContext = mkContext(value);
            setValue(ctxStack, key, newContext);
            return ctxStack.push(newContext);
          };
        };
        popContext = function(ctxStack) {
          return ctxStack.pop();
        };
        funcs.push(pushContext(key));
        compileTemplate(value);
        return funcs.push(popContext);
      } else {
        return funcs.push(constantValue(key, value));
      }
    };
    compileTemplate = function(template) {
      return _.each(template, compile);
    };
    compileTemplate(template);
    combinator = function(values) {
      var ctxStack, f, j, len1, rootContext;
      rootContext = mkContext(template);
      ctxStack = [rootContext];
      for (j = 0, len1 = funcs.length; j < len1; j++) {
        f = funcs[j];
        f(ctxStack, values);
      }
      return rootContext;
    };
    return withDescription(Bacon, "combineTemplate", template, Bacon.combineAsArray(streams).map(combinator));
  };

  Bacon.Observable.prototype.combine = function(other, f) {
    var combinator;
    combinator = toCombinator(f);
    return withDescription(this, "combine", other, f, Bacon.combineAsArray(this, other).map(function(values) {
      return combinator(values[0], values[1]);
    }));
  };

  Bacon.Observable.prototype.decode = function(cases) {
    return withDescription(this, "decode", cases, this.combine(Bacon.combineTemplate(cases), function(key, values) {
      return values[key];
    }));
  };

  Bacon.Observable.prototype.withStateMachine = function(initState, f) {
    var state;
    state = initState;
    return withDescription(this, "withStateMachine", initState, f, this.withHandler(function(event) {
      var fromF, j, len1, newState, output, outputs, reply;
      fromF = f(state, event);
      newState = fromF[0], outputs = fromF[1];
      state = newState;
      reply = Bacon.more;
      for (j = 0, len1 = outputs.length; j < len1; j++) {
        output = outputs[j];
        reply = this.push(output);
        if (reply === Bacon.noMore) {
          return reply;
        }
      }
      return reply;
    }));
  };

  Bacon.Observable.prototype.skipDuplicates = function(isEqual) {
    if (isEqual == null) {
      isEqual = function(a, b) {
        return a === b;
      };
    }
    return withDescription(this, "skipDuplicates", this.withStateMachine(None, function(prev, event) {
      if (!event.hasValue()) {
        return [prev, [event]];
      } else if (event.isInitial() || prev === None || !isEqual(prev.get(), event.value())) {
        return [new Some(event.value()), [event]];
      } else {
        return [prev, []];
      }
    }));
  };

  Bacon.Observable.prototype.awaiting = function(other) {
    return withDescription(this, "awaiting", other, Bacon.groupSimultaneous(this, other).map(function(arg) {
      var myValues, otherValues;
      myValues = arg[0], otherValues = arg[1];
      return otherValues.length === 0;
    }).toProperty(false).skipDuplicates());
  };

  Bacon.Observable.prototype.not = function() {
    return withDescription(this, "not", this.map(function(x) {
      return !x;
    }));
  };

  Bacon.Property.prototype.and = function(other) {
    return withDescription(this, "and", other, this.combine(other, function(x, y) {
      return x && y;
    }));
  };

  Bacon.Property.prototype.or = function(other) {
    return withDescription(this, "or", other, this.combine(other, function(x, y) {
      return x || y;
    }));
  };

  Bacon.scheduler = {
    setTimeout: function(f, d) {
      return setTimeout(f, d);
    },
    setInterval: function(f, i) {
      return setInterval(f, i);
    },
    clearInterval: function(id) {
      return clearInterval(id);
    },
    clearTimeout: function(id) {
      return clearTimeout(id);
    },
    now: function() {
      return new Date().getTime();
    }
  };

  Bacon.EventStream.prototype.bufferWithTime = function(delay) {
    return withDescription(this, "bufferWithTime", delay, this.bufferWithTimeOrCount(delay, Number.MAX_VALUE));
  };

  Bacon.EventStream.prototype.bufferWithCount = function(count) {
    return withDescription(this, "bufferWithCount", count, this.bufferWithTimeOrCount(void 0, count));
  };

  Bacon.EventStream.prototype.bufferWithTimeOrCount = function(delay, count) {
    var flushOrSchedule;
    flushOrSchedule = function(buffer) {
      if (buffer.values.length === count) {
        return buffer.flush();
      } else if (delay !== void 0) {
        return buffer.schedule();
      }
    };
    return withDescription(this, "bufferWithTimeOrCount", delay, count, this.buffer(delay, flushOrSchedule, flushOrSchedule));
  };

  Bacon.EventStream.prototype.buffer = function(delay, onInput, onFlush) {
    var buffer, delayMs, reply;
    if (onInput == null) {
      onInput = nop;
    }
    if (onFlush == null) {
      onFlush = nop;
    }
    buffer = {
      scheduled: null,
      end: void 0,
      values: [],
      flush: function() {
        var reply;
        if (this.scheduled) {
          Bacon.scheduler.clearTimeout(this.scheduled);
          this.scheduled = null;
        }
        if (this.values.length > 0) {
          reply = this.push(nextEvent(this.values));
          this.values = [];
          if (this.end != null) {
            return this.push(this.end);
          } else if (reply !== Bacon.noMore) {
            return onFlush(this);
          }
        } else {
          if (this.end != null) {
            return this.push(this.end);
          }
        }
      },
      schedule: function() {
        if (!this.scheduled) {
          return this.scheduled = delay((function(_this) {
            return function() {
              return _this.flush();
            };
          })(this));
        }
      }
    };
    reply = Bacon.more;
    if (!_.isFunction(delay)) {
      delayMs = delay;
      delay = function(f) {
        return Bacon.scheduler.setTimeout(f, delayMs);
      };
    }
    return withDescription(this, "buffer", this.withHandler(function(event) {
      buffer.push = (function(_this) {
        return function(event) {
          return _this.push(event);
        };
      })(this);
      if (event.isError()) {
        reply = this.push(event);
      } else if (event.isEnd()) {
        buffer.end = event;
        if (!buffer.scheduled) {
          buffer.flush();
        }
      } else {
        buffer.values.push(event.value());
        onInput(buffer);
      }
      return reply;
    }));
  };

  Bacon.Observable.prototype.filter = function() {
    var args, f;
    f = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    assertObservableIsProperty(f);
    return convertArgsToFunction(this, f, args, function(f) {
      return withDescription(this, "filter", f, this.withHandler(function(event) {
        if (event.filter(f)) {
          return this.push(event);
        } else {
          return Bacon.more;
        }
      }));
    });
  };

  Bacon.once = function(value) {
    return new EventStream(describe(Bacon, "once", value), function(sink) {
      sink(toEvent(value));
      sink(endEvent());
      return nop;
    });
  };

  Bacon.EventStream.prototype.concat = function(right) {
    var left;
    left = this;
    return new EventStream(describe(left, "concat", right), function(sink) {
      var unsubLeft, unsubRight;
      unsubRight = nop;
      unsubLeft = left.dispatcher.subscribe(function(e) {
        if (e.isEnd()) {
          return unsubRight = right.dispatcher.subscribe(sink);
        } else {
          return sink(e);
        }
      });
      return function() {
        unsubLeft();
        return unsubRight();
      };
    });
  };

  Bacon.Observable.prototype.flatMap = function() {
    return flatMap_(this, makeSpawner(arguments));
  };

  Bacon.Observable.prototype.flatMapFirst = function() {
    return flatMap_(this, makeSpawner(arguments), true);
  };

  flatMap_ = function(root, f, firstOnly, limit) {
    var childDeps, result, rootDep;
    rootDep = [root];
    childDeps = [];
    result = new EventStream(describe(root, "flatMap" + (firstOnly ? "First" : ""), f), function(sink) {
      var checkEnd, checkQueue, composite, queue, spawn;
      composite = new CompositeUnsubscribe();
      queue = [];
      spawn = function(event) {
        var child;
        child = makeObservable(f(event.value()));
        childDeps.push(child);
        return composite.add(function(unsubAll, unsubMe) {
          return child.dispatcher.subscribe(function(event) {
            var reply;
            if (event.isEnd()) {
              _.remove(child, childDeps);
              checkQueue();
              checkEnd(unsubMe);
              return Bacon.noMore;
            } else {
              if (event instanceof Initial) {
                event = event.toNext();
              }
              reply = sink(event);
              if (reply === Bacon.noMore) {
                unsubAll();
              }
              return reply;
            }
          });
        });
      };
      checkQueue = function() {
        var event;
        event = queue.shift();
        if (event) {
          return spawn(event);
        }
      };
      checkEnd = function(unsub) {
        unsub();
        if (composite.empty()) {
          return sink(endEvent());
        }
      };
      composite.add(function(__, unsubRoot) {
        return root.dispatcher.subscribe(function(event) {
          if (event.isEnd()) {
            return checkEnd(unsubRoot);
          } else if (event.isError()) {
            return sink(event);
          } else if (firstOnly && composite.count() > 1) {
            return Bacon.more;
          } else {
            if (composite.unsubscribed) {
              return Bacon.noMore;
            }
            if (limit && composite.count() > limit) {
              return queue.push(event);
            } else {
              return spawn(event);
            }
          }
        });
      });
      return composite.unsubscribe;
    });
    result.internalDeps = function() {
      if (childDeps.length) {
        return rootDep.concat(childDeps);
      } else {
        return rootDep;
      }
    };
    return result;
  };

  makeSpawner = function(args) {
    if (args.length === 1 && isObservable(args[0])) {
      return _.always(args[0]);
    } else {
      return makeFunctionArgs(args);
    }
  };

  makeObservable = function(x) {
    if (isObservable(x)) {
      return x;
    } else {
      return Bacon.once(x);
    }
  };

  Bacon.Observable.prototype.flatMapWithConcurrencyLimit = function() {
    var args, limit;
    limit = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return withDescription.apply(null, [this, "flatMapWithConcurrencyLimit", limit].concat(slice.call(args), [flatMap_(this, makeSpawner(args), false, limit)]));
  };

  Bacon.Observable.prototype.flatMapConcat = function() {
    return withDescription.apply(null, [this, "flatMapConcat"].concat(slice.call(arguments), [this.flatMapWithConcurrencyLimit.apply(this, [1].concat(slice.call(arguments)))]));
  };

  Bacon.later = function(delay, value) {
    return withDescription(Bacon, "later", delay, value, Bacon.fromBinder(function(sink) {
      var id, sender;
      sender = function() {
        return sink([value, endEvent()]);
      };
      id = Bacon.scheduler.setTimeout(sender, delay);
      return function() {
        return Bacon.scheduler.clearTimeout(id);
      };
    }));
  };

  Bacon.Observable.prototype.bufferingThrottle = function(minimumInterval) {
    return withDescription(this, "bufferingThrottle", minimumInterval, this.flatMapConcat(function(x) {
      return Bacon.once(x).concat(Bacon.later(minimumInterval).filter(false));
    }));
  };

  Bacon.Property.prototype.bufferingThrottle = function() {
    return Bacon.Observable.prototype.bufferingThrottle.apply(this, arguments).toProperty();
  };

  Bus = (function(superClass) {
    extend(Bus, superClass);

    function Bus() {
      this.guardedSink = bind(this.guardedSink, this);
      this.subscribeAll = bind(this.subscribeAll, this);
      this.unsubAll = bind(this.unsubAll, this);
      this.sink = void 0;
      this.subscriptions = [];
      this.ended = false;
      Bus.__super__.constructor.call(this, describe(Bacon, "Bus"), this.subscribeAll);
    }

    Bus.prototype.unsubAll = function() {
      var j, len1, ref, sub;
      ref = this.subscriptions;
      for (j = 0, len1 = ref.length; j < len1; j++) {
        sub = ref[j];
        if (typeof sub.unsub === "function") {
          sub.unsub();
        }
      }
      return void 0;
    };

    Bus.prototype.subscribeAll = function(newSink) {
      var j, len1, ref, subscription;
      if (this.ended) {
        newSink(endEvent());
      } else {
        this.sink = newSink;
        ref = cloneArray(this.subscriptions);
        for (j = 0, len1 = ref.length; j < len1; j++) {
          subscription = ref[j];
          this.subscribeInput(subscription);
        }
      }
      return this.unsubAll;
    };

    Bus.prototype.guardedSink = function(input) {
      return (function(_this) {
        return function(event) {
          if (event.isEnd()) {
            _this.unsubscribeInput(input);
            return Bacon.noMore;
          } else {
            return _this.sink(event);
          }
        };
      })(this);
    };

    Bus.prototype.subscribeInput = function(subscription) {
      return subscription.unsub = subscription.input.dispatcher.subscribe(this.guardedSink(subscription.input));
    };

    Bus.prototype.unsubscribeInput = function(input) {
      var i, j, len1, ref, sub;
      ref = this.subscriptions;
      for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
        sub = ref[i];
        if (sub.input === input) {
          if (typeof sub.unsub === "function") {
            sub.unsub();
          }
          this.subscriptions.splice(i, 1);
          return;
        }
      }
    };

    Bus.prototype.plug = function(input) {
      var sub;
      assertObservable(input);
      if (this.ended) {
        return;
      }
      sub = {
        input: input
      };
      this.subscriptions.push(sub);
      if ((this.sink != null)) {
        this.subscribeInput(sub);
      }
      return (function(_this) {
        return function() {
          return _this.unsubscribeInput(input);
        };
      })(this);
    };

    Bus.prototype.end = function() {
      this.ended = true;
      this.unsubAll();
      return typeof this.sink === "function" ? this.sink(endEvent()) : void 0;
    };

    Bus.prototype.push = function(value) {
      if (!this.ended) {
        return typeof this.sink === "function" ? this.sink(nextEvent(value)) : void 0;
      }
    };

    Bus.prototype.error = function(error) {
      return typeof this.sink === "function" ? this.sink(new Error(error)) : void 0;
    };

    return Bus;

  })(EventStream);

  Bacon.Bus = Bus;

  liftCallback = function(desc, wrapped) {
    return withMethodCallSupport(function() {
      var args, f, stream;
      f = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      stream = partiallyApplied(wrapped, [
        function(values, callback) {
          return f.apply(null, slice.call(values).concat([callback]));
        }
      ]);
      return withDescription.apply(null, [Bacon, desc, f].concat(slice.call(args), [Bacon.combineAsArray(args).flatMap(stream)]));
    });
  };

  Bacon.fromCallback = liftCallback("fromCallback", function() {
    var args, f;
    f = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return Bacon.fromBinder(function(handler) {
      makeFunction(f, args)(handler);
      return nop;
    }, (function(value) {
      return [value, endEvent()];
    }));
  });

  Bacon.fromNodeCallback = liftCallback("fromNodeCallback", function() {
    var args, f;
    f = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return Bacon.fromBinder(function(handler) {
      makeFunction(f, args)(handler);
      return nop;
    }, function(error, value) {
      if (error) {
        return [new Error(error), endEvent()];
      }
      return [value, endEvent()];
    });
  });

  addPropertyInitValueToStream = function(property, stream) {
    var justInitValue;
    justInitValue = new EventStream(describe(property, "justInitValue"), function(sink) {
      var unsub, value;
      value = void 0;
      unsub = property.dispatcher.subscribe(function(event) {
        if (!event.isEnd()) {
          value = event;
        }
        return Bacon.noMore;
      });
      UpdateBarrier.whenDoneWith(justInitValue, function() {
        if (value != null) {
          sink(value);
        }
        return sink(endEvent());
      });
      return unsub;
    });
    return justInitValue.concat(stream).toProperty();
  };

  Bacon.Observable.prototype.mapEnd = function() {
    var f;
    f = makeFunctionArgs(arguments);
    return withDescription(this, "mapEnd", f, this.withHandler(function(event) {
      if (event.isEnd()) {
        this.push(nextEvent(f(event)));
        this.push(endEvent());
        return Bacon.noMore;
      } else {
        return this.push(event);
      }
    }));
  };

  Bacon.Observable.prototype.skipErrors = function() {
    return withDescription(this, "skipErrors", this.withHandler(function(event) {
      if (event.isError()) {
        return Bacon.more;
      } else {
        return this.push(event);
      }
    }));
  };

  Bacon.EventStream.prototype.takeUntil = function(stopper) {
    var endMarker;
    endMarker = {};
    return withDescription(this, "takeUntil", stopper, Bacon.groupSimultaneous(this.mapEnd(endMarker), stopper.skipErrors()).withHandler(function(event) {
      var data, j, len1, ref, reply, value;
      if (!event.hasValue()) {
        return this.push(event);
      } else {
        ref = event.value(), data = ref[0], stopper = ref[1];
        if (stopper.length) {
          return this.push(endEvent());
        } else {
          reply = Bacon.more;
          for (j = 0, len1 = data.length; j < len1; j++) {
            value = data[j];
            if (value === endMarker) {
              reply = this.push(endEvent());
            } else {
              reply = this.push(nextEvent(value));
            }
          }
          return reply;
        }
      }
    }));
  };

  Bacon.Property.prototype.takeUntil = function(stopper) {
    var changes;
    changes = this.changes().takeUntil(stopper);
    return withDescription(this, "takeUntil", stopper, addPropertyInitValueToStream(this, changes));
  };

  Bacon.Observable.prototype.flatMapLatest = function() {
    var f, stream;
    f = makeSpawner(arguments);
    stream = this.toEventStream();
    return withDescription(this, "flatMapLatest", f, stream.flatMap(function(value) {
      return makeObservable(f(value)).takeUntil(stream);
    }));
  };

  Bacon.Property.prototype.delayChanges = function() {
    var desc, f, j;
    desc = 2 <= arguments.length ? slice.call(arguments, 0, j = arguments.length - 1) : (j = 0, []), f = arguments[j++];
    return withDescription.apply(null, [this].concat(slice.call(desc), [addPropertyInitValueToStream(this, f(this.changes()))]));
  };

  Bacon.EventStream.prototype.delay = function(delay) {
    return withDescription(this, "delay", delay, this.flatMap(function(value) {
      return Bacon.later(delay, value);
    }));
  };

  Bacon.Property.prototype.delay = function(delay) {
    return this.delayChanges("delay", delay, function(changes) {
      return changes.delay(delay);
    });
  };

  Bacon.EventStream.prototype.debounce = function(delay) {
    return withDescription(this, "debounce", delay, this.flatMapLatest(function(value) {
      return Bacon.later(delay, value);
    }));
  };

  Bacon.Property.prototype.debounce = function(delay) {
    return this.delayChanges("debounce", delay, function(changes) {
      return changes.debounce(delay);
    });
  };

  Bacon.EventStream.prototype.debounceImmediate = function(delay) {
    return withDescription(this, "debounceImmediate", delay, this.flatMapFirst(function(value) {
      return Bacon.once(value).concat(Bacon.later(delay).filter(false));
    }));
  };

  Bacon.Observable.prototype.scan = function(seed, f) {
    var acc, resultProperty, subscribe;
    f = toCombinator(f);
    acc = toOption(seed);
    subscribe = (function(_this) {
      return function(sink) {
        var initSent, reply, sendInit, unsub;
        initSent = false;
        unsub = nop;
        reply = Bacon.more;
        sendInit = function() {
          if (!initSent) {
            return acc.forEach(function(value) {
              initSent = true;
              reply = sink(new Initial(function() {
                return value;
              }));
              if (reply === Bacon.noMore) {
                unsub();
                return unsub = nop;
              }
            });
          }
        };
        unsub = _this.dispatcher.subscribe(function(event) {
          var next, prev;
          if (event.hasValue()) {
            if (initSent && event.isInitial()) {
              return Bacon.more;
            } else {
              if (!event.isInitial()) {
                sendInit();
              }
              initSent = true;
              prev = acc.getOrElse(void 0);
              next = f(prev, event.value());
              acc = new Some(next);
              return sink(event.apply(function() {
                return next;
              }));
            }
          } else {
            if (event.isEnd()) {
              reply = sendInit();
            }
            if (reply !== Bacon.noMore) {
              return sink(event);
            }
          }
        });
        UpdateBarrier.whenDoneWith(resultProperty, sendInit);
        return unsub;
      };
    })(this);
    return resultProperty = new Property(describe(this, "scan", seed, f), subscribe);
  };

  Bacon.Observable.prototype.diff = function(start, f) {
    f = toCombinator(f);
    return withDescription(this, "diff", start, f, this.scan([start], function(prevTuple, next) {
      return [next, f(prevTuple[0], next)];
    }).filter(function(tuple) {
      return tuple.length === 2;
    }).map(function(tuple) {
      return tuple[1];
    }));
  };

  Bacon.Observable.prototype.doAction = function() {
    var f;
    f = makeFunctionArgs(arguments);
    return withDescription(this, "doAction", f, this.withHandler(function(event) {
      if (event.hasValue()) {
        f(event.value());
      }
      return this.push(event);
    }));
  };

  Bacon.Observable.prototype.doError = function() {
    var f;
    f = makeFunctionArgs(arguments);
    return withDescription(this, "doError", f, this.withHandler(function(event) {
      if (event.isError()) {
        f(event.error);
      }
      return this.push(event);
    }));
  };

  Bacon.Observable.prototype.endOnError = function() {
    var args, f;
    f = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    if (f == null) {
      f = true;
    }
    return convertArgsToFunction(this, f, args, function(f) {
      return withDescription(this, "endOnError", this.withHandler(function(event) {
        if (event.isError() && f(event.error)) {
          this.push(event);
          return this.push(endEvent());
        } else {
          return this.push(event);
        }
      }));
    });
  };

  Observable.prototype.errors = function() {
    return withDescription(this, "errors", this.filter(function() {
      return false;
    }));
  };

  valueAndEnd = (function(value) {
    return [value, endEvent()];
  });

  Bacon.fromPromise = function(promise, abort) {
    return withDescription(Bacon, "fromPromise", promise, Bacon.fromBinder(function(handler) {
      var ref;
      if ((ref = promise.then(handler, function(e) {
        return handler(new Error(e));
      })) != null) {
        if (typeof ref.done === "function") {
          ref.done();
        }
      }
      return function() {
        if (abort) {
          return typeof promise.abort === "function" ? promise.abort() : void 0;
        }
      };
    }, valueAndEnd));
  };

  Bacon.Observable.prototype.mapError = function() {
    var f;
    f = makeFunctionArgs(arguments);
    return withDescription(this, "mapError", f, this.withHandler(function(event) {
      if (event.isError()) {
        return this.push(nextEvent(f(event.error)));
      } else {
        return this.push(event);
      }
    }));
  };

  Bacon.Observable.prototype.flatMapError = function(fn) {
    return withDescription(this, "flatMapError", fn, this.mapError(function(err) {
      return new Error(err);
    }).flatMap(function(x) {
      if (x instanceof Error) {
        return fn(x.error);
      } else {
        return Bacon.once(x);
      }
    }));
  };

  Bacon.EventStream.prototype.sampledBy = function(sampler, combinator) {
    return withDescription(this, "sampledBy", sampler, combinator, this.toProperty().sampledBy(sampler, combinator));
  };

  Bacon.Property.prototype.sampledBy = function(sampler, combinator) {
    var lazy, result, samplerSource, stream, thisSource;
    if (combinator != null) {
      combinator = toCombinator(combinator);
    } else {
      lazy = true;
      combinator = function(f) {
        return f.value();
      };
    }
    thisSource = new Source(this, false, lazy);
    samplerSource = new Source(sampler, true, lazy);
    stream = Bacon.when([thisSource, samplerSource], combinator);
    result = sampler instanceof Property ? stream.toProperty() : stream;
    return withDescription(this, "sampledBy", sampler, combinator, result);
  };

  Bacon.Property.prototype.sample = function(interval) {
    return withDescription(this, "sample", interval, this.sampledBy(Bacon.interval(interval, {})));
  };

  Bacon.Observable.prototype.map = function() {
    var args, p;
    p = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    if (p instanceof Property) {
      return p.sampledBy(this, former);
    } else {
      return convertArgsToFunction(this, p, args, function(f) {
        return withDescription(this, "map", f, this.withHandler(function(event) {
          return this.push(event.fmap(f));
        }));
      });
    }
  };

  Bacon.Observable.prototype.fold = function(seed, f) {
    return withDescription(this, "fold", seed, f, this.scan(seed, f).sampledBy(this.filter(false).mapEnd().toProperty()));
  };

  Observable.prototype.reduce = Observable.prototype.fold;

  Bacon.fromPoll = function(delay, poll) {
    return withDescription(Bacon, "fromPoll", delay, poll, Bacon.fromBinder((function(handler) {
      var id;
      id = Bacon.scheduler.setInterval(handler, delay);
      return function() {
        return Bacon.scheduler.clearInterval(id);
      };
    }), poll));
  };

  Bacon.fromArray = function(values) {
    var i;
    assertArray(values);
    if (!values.length) {
      return withDescription(Bacon, "fromArray", values, Bacon.never());
    } else {
      i = 0;
      return new EventStream(describe(Bacon, "fromArray", values), function(sink) {
        var push, pushNeeded, pushing, reply, unsubd;
        unsubd = false;
        reply = Bacon.more;
        pushing = false;
        pushNeeded = false;
        push = function() {
          var value;
          pushNeeded = true;
          if (pushing) {
            return;
          }
          pushing = true;
          while (pushNeeded) {
            pushNeeded = false;
            if ((reply !== Bacon.noMore) && !unsubd) {
              value = values[i++];
              reply = sink(toEvent(value));
              if (reply !== Bacon.noMore) {
                if (i === values.length) {
                  sink(endEvent());
                } else {
                  UpdateBarrier.afterTransaction(push);
                }
              }
            }
          }
          return pushing = false;
        };
        push();
        return function() {
          return unsubd = true;
        };
      });
    }
  };

  Bacon.EventStream.prototype.holdWhen = function(valve) {
    var bufferedValues, composite, onHold, src;
    composite = new CompositeUnsubscribe();
    onHold = false;
    bufferedValues = [];
    src = this;
    return new EventStream(describe(this, "holdWhen", valve), function(sink) {
      var endIfBothEnded;
      endIfBothEnded = function(unsub) {
        unsub();
        if (composite.empty()) {
          return sink(endEvent());
        }
      };
      composite.add(function(unsubAll, unsubMe) {
        return src.subscribe(function(event) {
          if (onHold && event.hasValue()) {
            return bufferedValues.push(event.value());
          } else if (event.isEnd() && bufferedValues.length) {
            return endIfBothEnded(unsubMe);
          } else {
            return sink(event);
          }
        });
      });
      composite.add(function(unsubAll, unsubMe) {
        return valve.subscribe(function(event) {
          var toSend;
          if (event.hasValue()) {
            onHold = event.value();
            if (!onHold) {
              toSend = bufferedValues;
              bufferedValues = [];
              return _.each(toSend, function(index, value) {
                return sink(nextEvent(value));
              });
            }
          } else if (event.isEnd()) {
            return endIfBothEnded(unsubMe);
          } else {
            return sink(event);
          }
        });
      });
      return composite.unsubscribe;
    });
  };

  Bacon.interval = function(delay, value) {
    if (value == null) {
      value = {};
    }
    return withDescription(Bacon, "interval", delay, value, Bacon.fromPoll(delay, function() {
      return nextEvent(value);
    }));
  };

  Bacon.$ = {};

  Bacon.$.asEventStream = function(eventName, selector, eventTransformer) {
    var ref;
    if (_.isFunction(selector)) {
      ref = [selector, void 0], eventTransformer = ref[0], selector = ref[1];
    }
    return withDescription(this.selector || this, "asEventStream", eventName, Bacon.fromBinder((function(_this) {
      return function(handler) {
        _this.on(eventName, selector, handler);
        return function() {
          return _this.off(eventName, selector, handler);
        };
      };
    })(this), eventTransformer));
  };

  if ((ref = typeof jQuery !== "undefined" && jQuery !== null ? jQuery : typeof Zepto !== "undefined" && Zepto !== null ? Zepto : void 0) != null) {
    ref.fn.asEventStream = Bacon.$.asEventStream;
  }

  Bacon.Observable.prototype.log = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    this.subscribe(function(event) {
      return typeof console !== "undefined" && console !== null ? typeof console.log === "function" ? console.log.apply(console, slice.call(args).concat([event.log()])) : void 0 : void 0;
    });
    return this;
  };

  Bacon.EventStream.prototype.merge = function(right) {
    var left;
    assertEventStream(right);
    left = this;
    return withDescription(left, "merge", right, Bacon.mergeAll(this, right));
  };

  Bacon.mergeAll = function() {
    var streams;
    streams = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    if (isArray(streams[0])) {
      streams = streams[0];
    }
    if (streams.length) {
      return new EventStream(describe.apply(null, [Bacon, "mergeAll"].concat(slice.call(streams))), function(sink) {
        var ends, sinks, smartSink;
        ends = 0;
        smartSink = function(obs) {
          return function(unsubBoth) {
            return obs.dispatcher.subscribe(function(event) {
              var reply;
              if (event.isEnd()) {
                ends++;
                if (ends === streams.length) {
                  return sink(endEvent());
                } else {
                  return Bacon.more;
                }
              } else {
                reply = sink(event);
                if (reply === Bacon.noMore) {
                  unsubBoth();
                }
                return reply;
              }
            });
          };
        };
        sinks = _.map(smartSink, streams);
        return new Bacon.CompositeUnsubscribe(sinks).unsubscribe;
      });
    } else {
      return Bacon.never();
    }
  };

  Bacon.repeatedly = function(delay, values) {
    var index;
    index = 0;
    return withDescription(Bacon, "repeatedly", delay, values, Bacon.fromPoll(delay, function() {
      return values[index++ % values.length];
    }));
  };

  Bacon.repeat = function(generator) {
    var index;
    index = 0;
    return Bacon.fromBinder(function(sink) {
      var flag, handleEvent, reply, subscribeNext, unsub;
      flag = false;
      reply = Bacon.more;
      unsub = function() {};
      handleEvent = function(event) {
        if (event.isEnd()) {
          if (!flag) {
            return flag = true;
          } else {
            return subscribeNext();
          }
        } else {
          return reply = sink(event);
        }
      };
      subscribeNext = function() {
        var next;
        flag = true;
        while (flag && reply !== Bacon.noMore) {
          next = generator(index++);
          flag = false;
          if (next) {
            unsub = next.subscribeInternal(handleEvent);
          } else {
            sink(endEvent());
          }
        }
        return flag = true;
      };
      subscribeNext();
      return function() {
        return unsub();
      };
    });
  };

  Bacon.retry = function(options) {
    var delay, error, finished, isRetryable, maxRetries, retries, source;
    if (!_.isFunction(options.source)) {
      throw new Exception("'source' option has to be a function");
    }
    source = options.source;
    retries = options.retries || 0;
    maxRetries = options.maxRetries || retries;
    delay = options.delay || function() {
      return 0;
    };
    isRetryable = options.isRetryable || function() {
      return true;
    };
    finished = false;
    error = null;
    return withDescription(Bacon, "retry", options, Bacon.repeat(function() {
      var context, pause, valueStream;
      if (finished) {
        return null;
      } else {
        valueStream = function() {
          return source().endOnError().withHandler(function(event) {
            if (event.isError()) {
              error = event;
              if (isRetryable(error.error) && retries > 0) {

              } else {
                finished = true;
                return this.push(event);
              }
            } else {
              if (event.hasValue()) {
                error = null;
                finished = true;
              }
              return this.push(event);
            }
          });
        };
        if (error) {
          context = {
            error: error.error,
            retriesDone: maxRetries - retries
          };
          pause = Bacon.later(delay(context)).filter(false);
          retries = retries - 1;
          return pause.concat(Bacon.once().flatMap(valueStream));
        } else {
          return valueStream();
        }
      }
    }));
  };

  Bacon.sequentially = function(delay, values) {
    var index;
    index = 0;
    return withDescription(Bacon, "sequentially", delay, values, Bacon.fromPoll(delay, function() {
      var value;
      value = values[index++];
      if (index < values.length) {
        return value;
      } else if (index === values.length) {
        return [value, endEvent()];
      } else {
        return endEvent();
      }
    }));
  };

  Bacon.Observable.prototype.skip = function(count) {
    return withDescription(this, "skip", count, this.withHandler(function(event) {
      if (!event.hasValue()) {
        return this.push(event);
      } else if (count > 0) {
        count--;
        return Bacon.more;
      } else {
        return this.push(event);
      }
    }));
  };

  Bacon.Observable.prototype.take = function(count) {
    if (count <= 0) {
      return Bacon.never();
    }
    return withDescription(this, "take", count, this.withHandler(function(event) {
      if (!event.hasValue()) {
        return this.push(event);
      } else {
        count--;
        if (count > 0) {
          return this.push(event);
        } else {
          if (count === 0) {
            this.push(event);
          }
          this.push(endEvent());
          return Bacon.noMore;
        }
      }
    }));
  };

  Bacon.EventStream.prototype.skipUntil = function(starter) {
    var started;
    started = starter.take(1).map(true).toProperty(false);
    return withDescription(this, "skipUntil", starter, this.filter(started));
  };

  Bacon.EventStream.prototype.skipWhile = function() {
    var args, f, ok;
    f = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    assertObservableIsProperty(f);
    ok = false;
    return convertArgsToFunction(this, f, args, function(f) {
      return withDescription(this, "skipWhile", f, this.withHandler(function(event) {
        if (ok || !event.hasValue() || !f(event.value())) {
          if (event.hasValue()) {
            ok = true;
          }
          return this.push(event);
        } else {
          return Bacon.more;
        }
      }));
    });
  };

  Bacon.Observable.prototype.slidingWindow = function(n, minValues) {
    if (minValues == null) {
      minValues = 0;
    }
    return withDescription(this, "slidingWindow", n, minValues, this.scan([], (function(window, value) {
      return window.concat([value]).slice(-n);
    })).filter((function(values) {
      return values.length >= minValues;
    })));
  };

  Bacon.spy = function(spy) {
    return spys.push(spy);
  };

  spys = [];

  registerObs = function(obs) {
    var j, len1, spy;
    if (spys.length) {
      if (!registerObs.running) {
        try {
          registerObs.running = true;
          for (j = 0, len1 = spys.length; j < len1; j++) {
            spy = spys[j];
            spy(obs);
          }
        } finally {
          delete registerObs.running;
        }
      }
    }
    return void 0;
  };

  Bacon.Property.prototype.startWith = function(seed) {
    return withDescription(this, "startWith", seed, this.scan(seed, function(prev, next) {
      return next;
    }));
  };

  Bacon.EventStream.prototype.startWith = function(seed) {
    return withDescription(this, "startWith", seed, Bacon.once(seed).concat(this));
  };

  Bacon.Observable.prototype.takeWhile = function() {
    var args, f;
    f = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    assertObservableIsProperty(f);
    return convertArgsToFunction(this, f, args, function(f) {
      return withDescription(this, "takeWhile", f, this.withHandler(function(event) {
        if (event.filter(f)) {
          return this.push(event);
        } else {
          this.push(endEvent());
          return Bacon.noMore;
        }
      }));
    });
  };

  Bacon.update = function() {
    var i, initial, lateBindFirst, patterns;
    initial = arguments[0], patterns = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    lateBindFirst = function(f) {
      return function() {
        var args;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        return function(i) {
          return f.apply(null, [i].concat(args));
        };
      };
    };
    i = patterns.length - 1;
    while (i > 0) {
      if (!(patterns[i] instanceof Function)) {
        patterns[i] = (function(x) {
          return function() {
            return x;
          };
        })(patterns[i]);
      }
      patterns[i] = lateBindFirst(patterns[i]);
      i = i - 2;
    }
    return withDescription.apply(null, [Bacon, "update", initial].concat(slice.call(patterns), [Bacon.when.apply(Bacon, patterns).scan(initial, (function(x, f) {
      return f(x);
    }))]));
  };

  Bacon.zipAsArray = function() {
    var streams;
    streams = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    if (isArray(streams[0])) {
      streams = streams[0];
    }
    return withDescription.apply(null, [Bacon, "zipAsArray"].concat(slice.call(streams), [Bacon.zipWith(streams, function() {
      var xs;
      xs = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return xs;
    })]));
  };

  Bacon.zipWith = function() {
    var f, ref1, streams;
    f = arguments[0], streams = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    if (!_.isFunction(f)) {
      ref1 = [f, streams[0]], streams = ref1[0], f = ref1[1];
    }
    streams = _.map((function(s) {
      return s.toEventStream();
    }), streams);
    return withDescription.apply(null, [Bacon, "zipWith", f].concat(slice.call(streams), [Bacon.when(streams, f)]));
  };

  Bacon.Observable.prototype.zip = function(other, f) {
    if (f == null) {
      f = Array;
    }
    return withDescription(this, "zip", other, Bacon.zipWith([this, other], f));
  };

  

Bacon.Observable.prototype.first = function () {
  return withDescription(this, "first", this.take(1));
};

Bacon.Observable.prototype.last = function () {
  var lastEvent;

  return withDescription(this, "last", this.withHandler(function (event) {
    if (event.isEnd()) {
      if (lastEvent) {
        this.push(lastEvent);
      }
      this.push(endEvent());
      return Bacon.noMore;
    } else {
      lastEvent = event;
    }
  }));
};

Bacon.EventStream.prototype.throttle = function (delay) {
  return withDescription(this, "throttle", delay, this.bufferWithTime(delay).map(function (values) {
    return values[values.length - 1];
  }));
};

Bacon.Property.prototype.throttle = function (delay) {
  return this.delayChanges("throttle", delay, function (changes) {
    return changes.throttle(delay);
  });
};

Observable.prototype.firstToPromise = function (PromiseCtr) {
  var _this = this;

  if (typeof PromiseCtr !== "function") {
    if (typeof Promise === "function") {
      PromiseCtr = Promise;
    } else {
      throw new Exception("There isn't default Promise, use shim or parameter");
    }
  }

  return new PromiseCtr(function (resolve, reject) {
    return _this.subscribe(function (event) {
      if (event.hasValue()) {
        resolve(event.value());
      }
      if (event.isError()) {
        reject(event.error);
      }

      return Bacon.noMore;
    });
  });
};

Observable.prototype.toPromise = function (PromiseCtr) {
  return this.last().firstToPromise(PromiseCtr);
};

if ((typeof define !== "undefined" && define !== null) && (define.amd != null)) {
    define([], function() {
      return Bacon;
    });
    this.Bacon = Bacon;
  } else if ((typeof module !== "undefined" && module !== null) && (module.exports != null)) {
    module.exports = Bacon;
    Bacon.Bacon = Bacon;
  } else {
    this.Bacon = Bacon;
  }

}).call(this);

},{}],3:[function(require,module,exports){
(function (global){
/*! http://mths.be/punycode v1.2.4 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports;
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^ -~]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /\x2E|\u3002|\uFF0E|\uFF61/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		while (length--) {
			array[length] = fn(array[length]);
		}
		return array;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings.
	 * @private
	 * @param {String} domain The domain name.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		return map(string.split(regexSeparators), fn).join('.');
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <http://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols to a Punycode string of ASCII-only
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name to Unicode. Only the
	 * Punycoded parts of the domain name will be converted, i.e. it doesn't
	 * matter if you call it on a string that has already been converted to
	 * Unicode.
	 * @memberOf punycode
	 * @param {String} domain The Punycode domain name to convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(domain) {
		return mapDomain(domain, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name to Punycode. Only the
	 * non-ASCII parts of the domain name will be converted, i.e. it doesn't
	 * matter if you call it with a domain that's already in ASCII.
	 * @memberOf punycode
	 * @param {String} domain The domain name to convert, as a Unicode string.
	 * @returns {String} The Punycode representation of the given domain name.
	 */
	function toASCII(domain) {
		return mapDomain(domain, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.2.4',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <http://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define('punycode', function() {
			return punycode;
		});
	} else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],4:[function(require,module,exports){
// Source: http://jsfiddle.net/vWx8V/
// http://stackoverflow.com/questions/5603195/full-list-of-javascript-keycodes



/**
 * Conenience method returns corresponding value for given keyName or keyCode.
 *
 * @param {Mixed} keyCode {Number} or keyName {String}
 * @return {Mixed}
 * @api public
 */

exports = module.exports = function(searchInput) {
  // Keyboard Events
  if (searchInput && 'object' === typeof searchInput) {
    var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode
    if (hasKeyCode) searchInput = hasKeyCode
  }

  // Numbers
  if ('number' === typeof searchInput) return names[searchInput]

  // Everything else (cast to string)
  var search = String(searchInput)

  // check codes
  var foundNamedKey = codes[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // check aliases
  var foundNamedKey = aliases[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // weird character?
  if (search.length === 1) return search.charCodeAt(0)

  return undefined
}

/**
 * Get by name
 *
 *   exports.code['enter'] // => 13
 */

var codes = exports.code = exports.codes = {
  'backspace': 8,
  'tab': 9,
  'enter': 13,
  'shift': 16,
  'ctrl': 17,
  'alt': 18,
  'pause/break': 19,
  'caps lock': 20,
  'esc': 27,
  'space': 32,
  'page up': 33,
  'page down': 34,
  'end': 35,
  'home': 36,
  'left': 37,
  'up': 38,
  'right': 39,
  'down': 40,
  'insert': 45,
  'delete': 46,
  'command': 91,
  'right click': 93,
  'numpad *': 106,
  'numpad +': 107,
  'numpad -': 109,
  'numpad .': 110,
  'numpad /': 111,
  'num lock': 144,
  'scroll lock': 145,
  'my computer': 182,
  'my calculator': 183,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  "'": 222,
}

// Helper aliases

var aliases = exports.aliases = {
  'windows': 91,
  '⇧': 16,
  '⌥': 18,
  '⌃': 17,
  '⌘': 91,
  'ctl': 17,
  'control': 17,
  'option': 18,
  'pause': 19,
  'break': 19,
  'caps': 20,
  'return': 13,
  'escape': 27,
  'spc': 32,
  'pgup': 33,
  'pgdn': 33,
  'ins': 45,
  'del': 46,
  'cmd': 91
}


/*!
 * Programatically add the following
 */

// lower case chars
for (i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32

// numbers
for (var i = 48; i < 58; i++) codes[i - 48] = i

// function keys
for (i = 1; i < 13; i++) codes['f'+i] = i + 111

// numpad keys
for (i = 0; i < 10; i++) codes['numpad '+i] = i + 96

/**
 * Get by code
 *
 *   exports.name[13] // => 'Enter'
 */

var names = exports.names = exports.title = {} // title for backward compat

// Create reverse mapping
for (i in codes) names[codes[i]] = i

// Add aliases
for (var alias in aliases) {
  codes[alias] = aliases[alias]
}

},{}],5:[function(require,module,exports){
'use strict';


module.exports = require('./lib/');

},{"./lib/":15}],6:[function(require,module,exports){
// HTML5 entities map: { name -> utf16string }
//
'use strict';

/*eslint quotes:0*/
module.exports = require('entities/maps/entities.json');

},{"entities/maps/entities.json":56}],7:[function(require,module,exports){
// List of valid html blocks names, accorting to commonmark spec
// http://jgm.github.io/CommonMark/spec.html#html-blocks

'use strict';

var html_blocks = {};

[
  'article',
  'aside',
  'button',
  'blockquote',
  'body',
  'canvas',
  'caption',
  'col',
  'colgroup',
  'dd',
  'div',
  'dl',
  'dt',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'hgroup',
  'hr',
  'iframe',
  'li',
  'map',
  'object',
  'ol',
  'output',
  'p',
  'pre',
  'progress',
  'script',
  'section',
  'style',
  'table',
  'tbody',
  'td',
  'textarea',
  'tfoot',
  'th',
  'tr',
  'thead',
  'ul',
  'video'
].forEach(function (name) { html_blocks[name] = true; });


module.exports = html_blocks;

},{}],8:[function(require,module,exports){
// Regexps to match html elements

'use strict';

var attr_name     = '[a-zA-Z_:][a-zA-Z0-9:._-]*';

var unquoted      = '[^"\'=<>`\\x00-\\x20]+';
var single_quoted = "'[^']*'";
var double_quoted = '"[^"]*"';

var attr_value  = '(?:' + unquoted + '|' + single_quoted + '|' + double_quoted + ')';

var attribute   = '(?:\\s+' + attr_name + '(?:\\s*=\\s*' + attr_value + ')?)';

var open_tag    = '<[A-Za-z][A-Za-z0-9\\-]*' + attribute + '*\\s*\\/?>';

var close_tag   = '<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>';
var comment     = '<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->';
var processing  = '<[?].*?[?]>';
var declaration = '<![A-Z]+\\s+[^>]*>';
var cdata       = '<!\\[CDATA\\[[\\s\\S]*?\\]\\]>';

var HTML_TAG_RE = new RegExp('^(?:' + open_tag + '|' + close_tag + '|' + comment +
                        '|' + processing + '|' + declaration + '|' + cdata + ')');

module.exports.HTML_TAG_RE = HTML_TAG_RE;

},{}],9:[function(require,module,exports){
// List of valid url schemas, accorting to commonmark spec
// http://jgm.github.io/CommonMark/spec.html#autolinks

'use strict';


module.exports = [
  'coap',
  'doi',
  'javascript',
  'aaa',
  'aaas',
  'about',
  'acap',
  'cap',
  'cid',
  'crid',
  'data',
  'dav',
  'dict',
  'dns',
  'file',
  'ftp',
  'geo',
  'go',
  'gopher',
  'h323',
  'http',
  'https',
  'iax',
  'icap',
  'im',
  'imap',
  'info',
  'ipp',
  'iris',
  'iris.beep',
  'iris.xpc',
  'iris.xpcs',
  'iris.lwz',
  'ldap',
  'mailto',
  'mid',
  'msrp',
  'msrps',
  'mtqp',
  'mupdate',
  'news',
  'nfs',
  'ni',
  'nih',
  'nntp',
  'opaquelocktoken',
  'pop',
  'pres',
  'rtsp',
  'service',
  'session',
  'shttp',
  'sieve',
  'sip',
  'sips',
  'sms',
  'snmp',
  'soap.beep',
  'soap.beeps',
  'tag',
  'tel',
  'telnet',
  'tftp',
  'thismessage',
  'tn3270',
  'tip',
  'tv',
  'urn',
  'vemmi',
  'ws',
  'wss',
  'xcon',
  'xcon-userid',
  'xmlrpc.beep',
  'xmlrpc.beeps',
  'xmpp',
  'z39.50r',
  'z39.50s',
  'adiumxtra',
  'afp',
  'afs',
  'aim',
  'apt',
  'attachment',
  'aw',
  'beshare',
  'bitcoin',
  'bolo',
  'callto',
  'chrome',
  'chrome-extension',
  'com-eventbrite-attendee',
  'content',
  'cvs',
  'dlna-playsingle',
  'dlna-playcontainer',
  'dtn',
  'dvb',
  'ed2k',
  'facetime',
  'feed',
  'finger',
  'fish',
  'gg',
  'git',
  'gizmoproject',
  'gtalk',
  'hcp',
  'icon',
  'ipn',
  'irc',
  'irc6',
  'ircs',
  'itms',
  'jar',
  'jms',
  'keyparc',
  'lastfm',
  'ldaps',
  'magnet',
  'maps',
  'market',
  'message',
  'mms',
  'ms-help',
  'msnim',
  'mumble',
  'mvn',
  'notes',
  'oid',
  'palm',
  'paparazzi',
  'platform',
  'proxy',
  'psyc',
  'query',
  'res',
  'resource',
  'rmi',
  'rsync',
  'rtmp',
  'secondlife',
  'sftp',
  'sgn',
  'skype',
  'smb',
  'soldat',
  'spotify',
  'ssh',
  'steam',
  'svn',
  'teamspeak',
  'things',
  'udp',
  'unreal',
  'ut2004',
  'ventrilo',
  'view-source',
  'webcal',
  'wtai',
  'wyciwyg',
  'xfire',
  'xri',
  'ymsgr'
];

},{}],10:[function(require,module,exports){
// Utilities
//
'use strict';


function _class(obj) { return Object.prototype.toString.call(obj); }

function isString(obj) { return _class(obj) === '[object String]'; }

var _hasOwnProperty = Object.prototype.hasOwnProperty;

function has(object, key) {
  return _hasOwnProperty.call(object, key);
}

// Merge objects
//
function assign(obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);

  sources.forEach(function (source) {
    if (!source) { return; }

    if (typeof source !== 'object') {
      throw new TypeError(source + 'must be object');
    }

    Object.keys(source).forEach(function (key) {
      obj[key] = source[key];
    });
  });

  return obj;
}

// Remove element from array and put another array at those position.
// Useful for some operations with tokens
function arrayReplaceAt(src, pos, newElements) {
  return [].concat(src.slice(0, pos), newElements, src.slice(pos + 1));
}

////////////////////////////////////////////////////////////////////////////////

function isValidEntityCode(c) {
  /*eslint no-bitwise:0*/
  // broken sequence
  if (c >= 0xD800 && c <= 0xDFFF) { return false; }
  // never used
  if (c >= 0xFDD0 && c <= 0xFDEF) { return false; }
  if ((c & 0xFFFF) === 0xFFFF || (c & 0xFFFF) === 0xFFFE) { return false; }
  // control codes
  if (c >= 0x00 && c <= 0x08) { return false; }
  if (c === 0x0B) { return false; }
  if (c >= 0x0E && c <= 0x1F) { return false; }
  if (c >= 0x7F && c <= 0x9F) { return false; }
  // out of range
  if (c > 0x10FFFF) { return false; }
  return true;
}

function fromCodePoint(c) {
  /*eslint no-bitwise:0*/
  if (c > 0xffff) {
    c -= 0x10000;
    var surrogate1 = 0xd800 + (c >> 10),
        surrogate2 = 0xdc00 + (c & 0x3ff);

    return String.fromCharCode(surrogate1, surrogate2);
  }
  return String.fromCharCode(c);
}


var UNESCAPE_MD_RE  = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g;
var ENTITY_RE       = /&([a-z#][a-z0-9]{1,31});/gi;
var UNESCAPE_ALL_RE = new RegExp(UNESCAPE_MD_RE.source + '|' + ENTITY_RE.source, 'gi');

var DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i;

var entities = require('./entities');

function replaceEntityPattern(match, name) {
  var code = 0;

  if (has(entities, name)) {
    return entities[name];
  }

  if (name.charCodeAt(0) === 0x23/* # */ && DIGITAL_ENTITY_TEST_RE.test(name)) {
    code = name[1].toLowerCase() === 'x' ?
      parseInt(name.slice(2), 16)
    :
      parseInt(name.slice(1), 10);
    if (isValidEntityCode(code)) {
      return fromCodePoint(code);
    }
  }

  return match;
}

/*function replaceEntities(str) {
  if (str.indexOf('&') < 0) { return str; }

  return str.replace(ENTITY_RE, replaceEntityPattern);
}*/

function unescapeMd(str) {
  if (str.indexOf('\\') < 0) { return str; }
  return str.replace(UNESCAPE_MD_RE, '$1');
}

function unescapeAll(str) {
  if (str.indexOf('\\') < 0 && str.indexOf('&') < 0) { return str; }

  return str.replace(UNESCAPE_ALL_RE, function(match, escaped, entity) {
    if (escaped) { return escaped; }
    return replaceEntityPattern(match, entity);
  });
}

////////////////////////////////////////////////////////////////////////////////

var HTML_ESCAPE_TEST_RE = /[&<>"]/;
var HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
var HTML_REPLACEMENTS = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;'
};

function replaceUnsafeChar(ch) {
  return HTML_REPLACEMENTS[ch];
}

function escapeHtml(str) {
  if (HTML_ESCAPE_TEST_RE.test(str)) {
    return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
  }
  return str;
}

////////////////////////////////////////////////////////////////////////////////

var REGEXP_ESCAPE_RE = /[.?*+^$[\]\\(){}|-]/g;

function escapeRE (str) {
  return str.replace(REGEXP_ESCAPE_RE, '\\$&');
}

////////////////////////////////////////////////////////////////////////////////

// Zs (unicode class) || [\t\f\v\r\n]
function isWhiteSpace(code) {
  if (code >= 0x2000 && code <= 0x200A) { return true; }
  switch (code) {
    case 0x09: // \t
    case 0x0A: // \n
    case 0x0B: // \v
    case 0x0C: // \f
    case 0x0D: // \r
    case 0x20:
    case 0xA0:
    case 0x1680:
    case 0x202F:
    case 0x205F:
    case 0x3000:
      return true;
  }
  return false;
}

////////////////////////////////////////////////////////////////////////////////

/*eslint-disable max-len*/
var UNICODE_PUNCT_RE = require('uc.micro/categories/P/regex');

// Currently without astral characters support.
function isPunctChar(char) {
  return UNICODE_PUNCT_RE.test(char);
}


// Markdown ASCII punctuation characters.
//
// !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, [, \, ], ^, _, `, {, |, }, or ~
// http://spec.commonmark.org/0.15/#ascii-punctuation-character
//
// Don't confuse with unicode punctuation !!! It lacks some chars in ascii range.
//
function isMdAsciiPunct(ch) {
  switch (ch) {
    case 0x21/* ! */:
    case 0x22/* " */:
    case 0x23/* # */:
    case 0x24/* $ */:
    case 0x25/* % */:
    case 0x26/* & */:
    case 0x27/* ' */:
    case 0x28/* ( */:
    case 0x29/* ) */:
    case 0x2A/* * */:
    case 0x2B/* + */:
    case 0x2C/* , */:
    case 0x2D/* - */:
    case 0x2E/* . */:
    case 0x2F/* / */:
    case 0x3A/* : */:
    case 0x3B/* ; */:
    case 0x3C/* < */:
    case 0x3D/* = */:
    case 0x3E/* > */:
    case 0x3F/* ? */:
    case 0x40/* @ */:
    case 0x5B/* [ */:
    case 0x5C/* \ */:
    case 0x5D/* ] */:
    case 0x5E/* ^ */:
    case 0x5F/* _ */:
    case 0x60/* ` */:
    case 0x7B/* { */:
    case 0x7C/* | */:
    case 0x7D/* } */:
    case 0x7E/* ~ */:
      return true;
    default:
      return false;
  }
}

// Hepler to unify [reference labels].
//
function normalizeReference(str) {
  // use .toUpperCase() instead of .toLowerCase()
  // here to avoid a conflict with Object.prototype
  // members (most notably, `__proto__`)
  return str.trim().replace(/\s+/g, ' ').toUpperCase();
}

////////////////////////////////////////////////////////////////////////////////

// Re-export libraries commonly used in both markdown-it and its plugins,
// so plugins won't have to depend on them explicitly, which reduces their
// bundled size (e.g. a browser build).
//
exports.lib                 = {};
exports.lib.mdurl           = require('mdurl');
exports.lib.ucmicro         = require('uc.micro');

exports.assign              = assign;
exports.isString            = isString;
exports.has                 = has;
exports.unescapeMd          = unescapeMd;
exports.unescapeAll         = unescapeAll;
exports.isValidEntityCode   = isValidEntityCode;
exports.fromCodePoint       = fromCodePoint;
// exports.replaceEntities     = replaceEntities;
exports.escapeHtml          = escapeHtml;
exports.arrayReplaceAt      = arrayReplaceAt;
exports.isWhiteSpace        = isWhiteSpace;
exports.isMdAsciiPunct      = isMdAsciiPunct;
exports.isPunctChar         = isPunctChar;
exports.escapeRE            = escapeRE;
exports.normalizeReference  = normalizeReference;

},{"./entities":6,"mdurl":62,"uc.micro":68,"uc.micro/categories/P/regex":66}],11:[function(require,module,exports){
// Just a shortcut for bulk export
'use strict';


exports.parseLinkLabel       = require('./parse_link_label');
exports.parseLinkDestination = require('./parse_link_destination');
exports.parseLinkTitle       = require('./parse_link_title');

},{"./parse_link_destination":12,"./parse_link_label":13,"./parse_link_title":14}],12:[function(require,module,exports){
// Parse link destination
//
'use strict';


var unescapeAll   = require('../common/utils').unescapeAll;


module.exports = function parseLinkDestination(str, pos, max) {
  var code, level,
      lines = 0,
      start = pos,
      result = {
        ok: false,
        pos: 0,
        lines: 0,
        str: ''
      };

  if (str.charCodeAt(pos) === 0x3C /* < */) {
    pos++;
    while (pos < max) {
      code = str.charCodeAt(pos);
      if (code === 0x0A /* \n */) { return result; }
      if (code === 0x3E /* > */) {
        result.pos = pos + 1;
        result.str = unescapeAll(str.slice(start + 1, pos));
        result.ok = true;
        return result;
      }
      if (code === 0x5C /* \ */ && pos + 1 < max) {
        pos += 2;
        continue;
      }

      pos++;
    }

    // no closing '>'
    return result;
  }

  // this should be ... } else { ... branch

  level = 0;
  while (pos < max) {
    code = str.charCodeAt(pos);

    if (code === 0x20) { break; }

    // ascii control characters
    if (code < 0x20 || code === 0x7F) { break; }

    if (code === 0x5C /* \ */ && pos + 1 < max) {
      pos += 2;
      continue;
    }

    if (code === 0x28 /* ( */) {
      level++;
      if (level > 1) { break; }
    }

    if (code === 0x29 /* ) */) {
      level--;
      if (level < 0) { break; }
    }

    pos++;
  }

  if (start === pos) { return result; }

  result.str = unescapeAll(str.slice(start, pos));
  result.lines = lines;
  result.pos = pos;
  result.ok = true;
  return result;
};

},{"../common/utils":10}],13:[function(require,module,exports){
// Parse link label
//
// this function assumes that first character ("[") already matches;
// returns the end of the label
//
'use strict';

module.exports = function parseLinkLabel(state, start, disableNested) {
  var level, found, marker, prevPos,
      labelEnd = -1,
      max = state.posMax,
      oldPos = state.pos;

  state.pos = start + 1;
  level = 1;

  while (state.pos < max) {
    marker = state.src.charCodeAt(state.pos);
    if (marker === 0x5D /* ] */) {
      level--;
      if (level === 0) {
        found = true;
        break;
      }
    }

    prevPos = state.pos;
    state.md.inline.skipToken(state);
    if (marker === 0x5B /* [ */) {
      if (prevPos === state.pos - 1) {
        // increase level if we find text `[`, which is not a part of any token
        level++;
      } else if (disableNested) {
        state.pos = oldPos;
        return -1;
      }
    }
  }

  if (found) {
    labelEnd = state.pos;
  }

  // restore old state
  state.pos = oldPos;

  return labelEnd;
};

},{}],14:[function(require,module,exports){
// Parse link title
//
'use strict';


var unescapeAll = require('../common/utils').unescapeAll;


module.exports = function parseLinkTitle(str, pos, max) {
  var code,
      marker,
      lines = 0,
      start = pos,
      result = {
        ok: false,
        pos: 0,
        lines: 0,
        str: ''
      };

  if (pos >= max) { return result; }

  marker = str.charCodeAt(pos);

  if (marker !== 0x22 /* " */ && marker !== 0x27 /* ' */ && marker !== 0x28 /* ( */) { return result; }

  pos++;

  // if opening marker is "(", switch it to closing marker ")"
  if (marker === 0x28) { marker = 0x29; }

  while (pos < max) {
    code = str.charCodeAt(pos);
    if (code === marker) {
      result.pos = pos + 1;
      result.lines = lines;
      result.str = unescapeAll(str.slice(start + 1, pos));
      result.ok = true;
      return result;
    } else if (code === 0x0A) {
      lines++;
    } else if (code === 0x5C /* \ */ && pos + 1 < max) {
      pos++;
      if (str.charCodeAt(pos) === 0x0A) {
        lines++;
      }
    }

    pos++;
  }

  return result;
};

},{"../common/utils":10}],15:[function(require,module,exports){
// Main perser class

'use strict';


var utils        = require('./common/utils');
var helpers      = require('./helpers');
var Renderer     = require('./renderer');
var ParserCore   = require('./parser_core');
var ParserBlock  = require('./parser_block');
var ParserInline = require('./parser_inline');
var LinkifyIt    = require('linkify-it');
var mdurl        = require('mdurl');
var punycode     = require('punycode');


var config = {
  'default': require('./presets/default'),
  zero: require('./presets/zero'),
  commonmark: require('./presets/commonmark')
};

////////////////////////////////////////////////////////////////////////////////
//
// This validator can prohibit more than really needed to prevent XSS. It's a
// tradeoff to keep code simple and to be secure by default.
//
// If you need different setup - override validator method as you wish. Or
// replace it with dummy function and use external sanitizer.
//

var BAD_PROTO_RE = /^(vbscript|javascript|file|data):/;
var GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;

function validateLink(url) {
  // url should be normalized at this point, and existing entities are decoded
  var str = url.trim().toLowerCase();

  return BAD_PROTO_RE.test(str) ? (GOOD_DATA_RE.test(str) ? true : false) : true;
}

////////////////////////////////////////////////////////////////////////////////


var RECODE_HOSTNAME_FOR = [ 'http:', 'https:', 'mailto:' ];

function normalizeLink(url) {
  var parsed = mdurl.parse(url, true);

  if (parsed.hostname) {
    // Encode hostnames in urls like:
    // `http://host/`, `https://host/`, `mailto:user@host`, `//host/`
    //
    // We don't encode unknown schemas, because it's likely that we encode
    // something we shouldn't (e.g. `skype:name` treated as `skype:host`)
    //
    if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
      try {
        parsed.hostname = punycode.toASCII(parsed.hostname);
      } catch(er) {}
    }
  }

  return mdurl.encode(mdurl.format(parsed));
}

function normalizeLinkText(url) {
  var parsed = mdurl.parse(url, true);

  if (parsed.hostname) {
    // Encode hostnames in urls like:
    // `http://host/`, `https://host/`, `mailto:user@host`, `//host/`
    //
    // We don't encode unknown schemas, because it's likely that we encode
    // something we shouldn't (e.g. `skype:name` treated as `skype:host`)
    //
    if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
      try {
        parsed.hostname = punycode.toUnicode(parsed.hostname);
      } catch(er) {}
    }
  }

  return mdurl.decode(mdurl.format(parsed));
}


/**
 * class MarkdownIt
 *
 * Main parser/renderer class.
 *
 * ##### Usage
 *
 * ```javascript
 * // node.js, "classic" way:
 * var MarkdownIt = require('markdown-it'),
 *     md = new MarkdownIt();
 * var result = md.render('# markdown-it rulezz!');
 *
 * // node.js, the same, but with sugar:
 * var md = require('markdown-it')();
 * var result = md.render('# markdown-it rulezz!');
 *
 * // browser without AMD, added to "window" on script load
 * // Note, there are no dash.
 * var md = window.markdownit();
 * var result = md.render('# markdown-it rulezz!');
 * ```
 *
 * Single line rendering, without paragraph wrap:
 *
 * ```javascript
 * var md = require('markdown-it')();
 * var result = md.renderInline('__markdown-it__ rulezz!');
 * ```
 **/

/**
 * new MarkdownIt([presetName, options])
 * - presetName (String): optional, `commonmark` / `zero`
 * - options (Object)
 *
 * Creates parser instanse with given config. Can be called without `new`.
 *
 * ##### presetName
 *
 * MarkdownIt provides named presets as a convenience to quickly
 * enable/disable active syntax rules and options for common use cases.
 *
 * - ["commonmark"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/commonmark.js) -
 *   configures parser to strict [CommonMark](http://commonmark.org/) mode.
 * - [default](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/default.js) -
 *   similar to GFM, used when no preset name given. Enables all available rules,
 *   but still without html, typographer & autolinker.
 * - ["zero"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/zero.js) -
 *   all rules disabled. Useful to quickly setup your config via `.enable()`.
 *   For example, when you need only `bold` and `italic` markup and nothing else.
 *
 * ##### options:
 *
 * - __html__ - `false`. Set `true` to enable HTML tags in source. Be careful!
 *   That's not safe! You may need external sanitizer to protect output from XSS.
 *   It's better to extend features via plugins, instead of enabling HTML.
 * - __xhtmlOut__ - `false`. Set `true` to add '/' when closing single tags
 *   (`<br />`). This is needed only for full CommonMark compatibility. In real
 *   world you will need HTML output.
 * - __breaks__ - `false`. Set `true` to convert `\n` in paragraphs into `<br>`.
 * - __langPrefix__ - `language-`. CSS language class prefix for fenced blocks.
 *   Can be useful for external highlighters.
 * - __linkify__ - `false`. Set `true` to autoconvert URL-like text to links.
 * - __typographer__  - `false`. Set `true` to enable [some language-neutral
 *   replacement](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js) +
 *   quotes beautification (smartquotes).
 * - __quotes__ - `“”‘’`, string. Double + single quotes replacement pairs, when
 *   typographer enabled and smartquotes on. Set doubles to '«»' for Russian,
 *   '„“' for German.
 * - __highlight__ - `null`. Highlighter function for fenced code blocks.
 *   Highlighter `function (str, lang)` should return escaped HTML. It can also
 *   return empty string if the source was not changed and should be escaped externaly.
 *
 * ##### Example
 *
 * ```javascript
 * // commonmark mode
 * var md = require('markdown-it')('commonmark');
 *
 * // default mode
 * var md = require('markdown-it')();
 *
 * // enable everything
 * var md = require('markdown-it')({
 *   html: true,
 *   linkify: true,
 *   typographer: true
 * });
 * ```
 *
 * ##### Syntax highlighting
 *
 * ```js
 * var hljs = require('highlight.js') // https://highlightjs.org/
 *
 * var md = require('markdown-it')({
 *   highlight: function (str, lang) {
 *     if (lang && hljs.getLanguage(lang)) {
 *       try {
 *         return hljs.highlight(lang, str).value;
 *       } catch (__) {}
 *     }
 *
 *     try {
 *       return hljs.highlightAuto(str).value;
 *     } catch (__) {}
 *
 *     return ''; // use external default escaping
 *   }
 * });
 * ```
 **/
function MarkdownIt(presetName, options) {
  if (!(this instanceof MarkdownIt)) {
    return new MarkdownIt(presetName, options);
  }

  if (!options) {
    if (!utils.isString(presetName)) {
      options = presetName || {};
      presetName = 'default';
    }
  }

  /**
   * MarkdownIt#inline -> ParserInline
   *
   * Instance of [[ParserInline]]. You may need it to add new rules when
   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
   * [[MarkdownIt.enable]].
   **/
  this.inline = new ParserInline();

  /**
   * MarkdownIt#block -> ParserBlock
   *
   * Instance of [[ParserBlock]]. You may need it to add new rules when
   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
   * [[MarkdownIt.enable]].
   **/
  this.block = new ParserBlock();

  /**
   * MarkdownIt#core -> Core
   *
   * Instance of [[Core]] chain executor. You may need it to add new rules when
   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
   * [[MarkdownIt.enable]].
   **/
  this.core = new ParserCore();

  /**
   * MarkdownIt#renderer -> Renderer
   *
   * Instance of [[Renderer]]. Use it to modify output look. Or to add rendering
   * rules for new token types, generated by plugins.
   *
   * ##### Example
   *
   * ```javascript
   * var md = require('markdown-it')();
   *
   * function myToken(tokens, idx, options, env, self) {
   *   //...
   *   return result;
   * };
   *
   * md.renderer.rules['my_token'] = myToken
   * ```
   *
   * See [[Renderer]] docs and [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js).
   **/
  this.renderer = new Renderer();

  /**
   * MarkdownIt#linkify -> LinkifyIt
   *
   * [linkify-it](https://github.com/markdown-it/linkify-it) instance.
   * Used by [linkify](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/linkify.js)
   * rule.
   **/
  this.linkify = new LinkifyIt();

  /**
   * MarkdownIt#validateLink(url) -> Boolean
   *
   * Link validation function. CommonMark allows too much in links. By default
   * we disable `javascript:` and `vbscript:` schemas. You can change this
   * behaviour.
   *
   * ```javascript
   * var md = require('markdown-it')();
   * // enable everything
   * md.validateLink = function () { return true; }
   * ```
   **/
  this.validateLink = validateLink;

  /**
   * MarkdownIt#normalizeLink(url) -> String
   *
   * Function used to encode link url to a machine-readable format,
   * which includes url-encoding, punycode, etc.
   **/
  this.normalizeLink = normalizeLink;

  /**
   * MarkdownIt#normalizeLinkText(url) -> String
   *
   * Function used to decode link url to a human-readable format`
   **/
  this.normalizeLinkText = normalizeLinkText;


  // Expose utils & helpers for easy acces from plugins

  /**
   * MarkdownIt#utils -> utils
   *
   * Assorted utility functions, useful to write plugins. See details
   * [here](https://github.com/markdown-it/markdown-it/blob/master/lib/common/utils.js).
   **/
  this.utils = utils;

  /**
   * MarkdownIt#helpers -> helpers
   *
   * Link components parser functions, useful to write plugins. See details
   * [here](https://github.com/markdown-it/markdown-it/blob/master/lib/helpers).
   **/
  this.helpers = helpers;


  this.options = {};
  this.configure(presetName);

  if (options) { this.set(options); }
}


/** chainable
 * MarkdownIt.set(options)
 *
 * Set parser options (in the same format as in constructor). Probably, you
 * will never need it, but you can change options after constructor call.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')()
 *             .set({ html: true, breaks: true })
 *             .set({ typographer, true });
 * ```
 *
 * __Note:__ To achieve the best possible performance, don't modify a
 * `markdown-it` instance options on the fly. If you need multiple configurations
 * it's best to create multiple instances and initialize each with separate
 * config.
 **/
MarkdownIt.prototype.set = function (options) {
  utils.assign(this.options, options);
  return this;
};


/** chainable, internal
 * MarkdownIt.configure(presets)
 *
 * Batch load of all options and compenent settings. This is internal method,
 * and you probably will not need it. But if you with - see available presets
 * and data structure [here](https://github.com/markdown-it/markdown-it/tree/master/lib/presets)
 *
 * We strongly recommend to use presets instead of direct config loads. That
 * will give better compatibility with next versions.
 **/
MarkdownIt.prototype.configure = function (presets) {
  var self = this, presetName;

  if (utils.isString(presets)) {
    presetName = presets;
    presets = config[presetName];
    if (!presets) { throw new Error('Wrong `markdown-it` preset "' + presetName + '", check name'); }
  }

  if (!presets) { throw new Error('Wrong `markdown-it` preset, can\'t be empty'); }

  if (presets.options) { self.set(presets.options); }

  if (presets.components) {
    Object.keys(presets.components).forEach(function (name) {
      if (presets.components[name].rules) {
        self[name].ruler.enableOnly(presets.components[name].rules);
      }
    });
  }
  return this;
};


/** chainable
 * MarkdownIt.enable(list, ignoreInvalid)
 * - list (String|Array): rule name or list of rule names to enable
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Enable list or rules. It will automatically find appropriate components,
 * containing rules with given names. If rule not found, and `ignoreInvalid`
 * not set - throws exception.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')()
 *             .enable(['sub', 'sup'])
 *             .disable('smartquotes');
 * ```
 **/
MarkdownIt.prototype.enable = function (list, ignoreInvalid) {
  var result = [];

  if (!Array.isArray(list)) { list = [ list ]; }

  [ 'core', 'block', 'inline' ].forEach(function (chain) {
    result = result.concat(this[chain].ruler.enable(list, true));
  }, this);

  var missed = list.filter(function (name) { return result.indexOf(name) < 0; });

  if (missed.length && !ignoreInvalid) {
    throw new Error('MarkdownIt. Failed to enable unknown rule(s): ' + missed);
  }

  return this;
};


/** chainable
 * MarkdownIt.disable(list, ignoreInvalid)
 * - list (String|Array): rule name or list of rule names to disable.
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * The same as [[MarkdownIt.enable]], but turn specified rules off.
 **/
MarkdownIt.prototype.disable = function (list, ignoreInvalid) {
  var result = [];

  if (!Array.isArray(list)) { list = [ list ]; }

  [ 'core', 'block', 'inline' ].forEach(function (chain) {
    result = result.concat(this[chain].ruler.disable(list, true));
  }, this);

  var missed = list.filter(function (name) { return result.indexOf(name) < 0; });

  if (missed.length && !ignoreInvalid) {
    throw new Error('MarkdownIt. Failed to disable unknown rule(s): ' + missed);
  }
  return this;
};


/** chainable
 * MarkdownIt.use(plugin, params)
 *
 * Load specified plugin with given params into current parser instance.
 * It's just a sugar to call `plugin(md, params)` with curring.
 *
 * ##### Example
 *
 * ```javascript
 * var iterator = require('markdown-it-for-inline');
 * var md = require('markdown-it')()
 *             .use(iterator, 'foo_replace', 'text', function (tokens, idx) {
 *               tokens[idx].content = tokens[idx].content.replace(/foo/g, 'bar');
 *             });
 * ```
 **/
MarkdownIt.prototype.use = function (plugin /*, params, ... */) {
  var args = [ this ].concat(Array.prototype.slice.call(arguments, 1));
  plugin.apply(plugin, args);
  return this;
};


/** internal
 * MarkdownIt.parse(src, env) -> Array
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * Parse input string and returns list of block tokens (special token type
 * "inline" will contain list of inline tokens). You should not call this
 * method directly, until you write custom renderer (for example, to produce
 * AST).
 *
 * `env` is used to pass data between "distributed" rules and return additional
 * metadata like reference info, needed for for renderer. It also can be used to
 * inject data in specific cases. Usually, you will be ok to pass `{}`,
 * and then pass updated object to renderer.
 **/
MarkdownIt.prototype.parse = function (src, env) {
  var state = new this.core.State(src, this, env);

  this.core.process(state);

  return state.tokens;
};


/**
 * MarkdownIt.render(src [, env]) -> String
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * Render markdown string into html. It does all magic for you :).
 *
 * `env` can be used to inject additional metadata (`{}` by default).
 * But you will not need it with high probability. See also comment
 * in [[MarkdownIt.parse]].
 **/
MarkdownIt.prototype.render = function (src, env) {
  env = env || {};

  return this.renderer.render(this.parse(src, env), this.options, env);
};


/** internal
 * MarkdownIt.parseInline(src, env) -> Array
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * The same as [[MarkdownIt.parse]] but skip all block rules. It returns the
 * block tokens list with the single `inline` element, containing parsed inline
 * tokens in `children` property. Also updates `env` object.
 **/
MarkdownIt.prototype.parseInline = function (src, env) {
  var state = new this.core.State(src, this, env);

  state.inlineMode = true;
  this.core.process(state);

  return state.tokens;
};


/**
 * MarkdownIt.renderInline(src [, env]) -> String
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * Similar to [[MarkdownIt.render]] but for single paragraph content. Result
 * will NOT be wrapped into `<p>` tags.
 **/
MarkdownIt.prototype.renderInline = function (src, env) {
  env = env || {};

  return this.renderer.render(this.parseInline(src, env), this.options, env);
};


module.exports = MarkdownIt;

},{"./common/utils":10,"./helpers":11,"./parser_block":16,"./parser_core":17,"./parser_inline":18,"./presets/commonmark":19,"./presets/default":20,"./presets/zero":21,"./renderer":22,"linkify-it":57,"mdurl":62,"punycode":3}],16:[function(require,module,exports){
/** internal
 * class ParserBlock
 *
 * Block-level tokenizer.
 **/
'use strict';


var Ruler           = require('./ruler');


var _rules = [
  // First 2 params - rule name & source. Secondary array - list of rules,
  // which can be terminated by this one.
  [ 'code',       require('./rules_block/code') ],
  [ 'fence',      require('./rules_block/fence'),      [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
  [ 'blockquote', require('./rules_block/blockquote'), [ 'paragraph', 'reference', 'list' ] ],
  [ 'hr',         require('./rules_block/hr'),         [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
  [ 'list',       require('./rules_block/list'),       [ 'paragraph', 'reference', 'blockquote' ] ],
  [ 'reference',  require('./rules_block/reference') ],
  [ 'heading',    require('./rules_block/heading'),    [ 'paragraph', 'reference', 'blockquote' ] ],
  [ 'lheading',   require('./rules_block/lheading') ],
  [ 'html_block', require('./rules_block/html_block'), [ 'paragraph', 'reference', 'blockquote' ] ],
  [ 'table',      require('./rules_block/table'),      [ 'paragraph', 'reference' ] ],
  [ 'paragraph',  require('./rules_block/paragraph') ]
];


/**
 * new ParserBlock()
 **/
function ParserBlock() {
  /**
   * ParserBlock#ruler -> Ruler
   *
   * [[Ruler]] instance. Keep configuration of block rules.
   **/
  this.ruler = new Ruler();

  for (var i = 0; i < _rules.length; i++) {
    this.ruler.push(_rules[i][0], _rules[i][1], { alt: (_rules[i][2] || []).slice() });
  }
}


// Generate tokens for input range
//
ParserBlock.prototype.tokenize = function (state, startLine, endLine) {
  var ok, i,
      rules = this.ruler.getRules(''),
      len = rules.length,
      line = startLine,
      hasEmptyLines = false,
      maxNesting = state.md.options.maxNesting;

  while (line < endLine) {
    state.line = line = state.skipEmptyLines(line);
    if (line >= endLine) { break; }

    // Termination condition for nested calls.
    // Nested calls currently used for blockquotes & lists
    if (state.tShift[line] < state.blkIndent) { break; }

    // If nesting level exceeded - skip tail to the end. That's not ordinary
    // situation and we should not care about content.
    if (state.level >= maxNesting) {
      state.line = endLine;
      break;
    }

    // Try all possible rules.
    // On success, rule should:
    //
    // - update `state.line`
    // - update `state.tokens`
    // - return true

    for (i = 0; i < len; i++) {
      ok = rules[i](state, line, endLine, false);
      if (ok) { break; }
    }

    // set state.tight iff we had an empty line before current tag
    // i.e. latest empty line should not count
    state.tight = !hasEmptyLines;

    // paragraph might "eat" one newline after it in nested lists
    if (state.isEmpty(state.line - 1)) {
      hasEmptyLines = true;
    }

    line = state.line;

    if (line < endLine && state.isEmpty(line)) {
      hasEmptyLines = true;
      line++;

      // two empty lines should stop the parser in list mode
      if (line < endLine && state.parentType === 'list' && state.isEmpty(line)) { break; }
      state.line = line;
    }
  }
};


/**
 * ParserBlock.parse(str, md, env, outTokens)
 *
 * Process input string and push block tokens into `outTokens`
 **/
ParserBlock.prototype.parse = function (src, md, env, outTokens) {
  var state;

  if (!src) { return []; }

  state = new this.State(src, md, env, outTokens);

  this.tokenize(state, state.line, state.lineMax);
};


ParserBlock.prototype.State = require('./rules_block/state_block');


module.exports = ParserBlock;

},{"./ruler":23,"./rules_block/blockquote":24,"./rules_block/code":25,"./rules_block/fence":26,"./rules_block/heading":27,"./rules_block/hr":28,"./rules_block/html_block":29,"./rules_block/lheading":30,"./rules_block/list":31,"./rules_block/paragraph":32,"./rules_block/reference":33,"./rules_block/state_block":34,"./rules_block/table":35}],17:[function(require,module,exports){
/** internal
 * class Core
 *
 * Top-level rules executor. Glues block/inline parsers and does intermediate
 * transformations.
 **/
'use strict';


var Ruler  = require('./ruler');


var _rules = [
  [ 'normalize',      require('./rules_core/normalize')      ],
  [ 'block',          require('./rules_core/block')          ],
  [ 'inline',         require('./rules_core/inline')         ],
  [ 'linkify',        require('./rules_core/linkify')        ],
  [ 'replacements',   require('./rules_core/replacements')   ],
  [ 'smartquotes',    require('./rules_core/smartquotes')    ]
];


/**
 * new Core()
 **/
function Core() {
  /**
   * Core#ruler -> Ruler
   *
   * [[Ruler]] instance. Keep configuration of core rules.
   **/
  this.ruler = new Ruler();

  for (var i = 0; i < _rules.length; i++) {
    this.ruler.push(_rules[i][0], _rules[i][1]);
  }
}


/**
 * Core.process(state)
 *
 * Executes core chain rules.
 **/
Core.prototype.process = function (state) {
  var i, l, rules;

  rules = this.ruler.getRules('');

  for (i = 0, l = rules.length; i < l; i++) {
    rules[i](state);
  }
};

Core.prototype.State = require('./rules_core/state_core');


module.exports = Core;

},{"./ruler":23,"./rules_core/block":36,"./rules_core/inline":37,"./rules_core/linkify":38,"./rules_core/normalize":39,"./rules_core/replacements":40,"./rules_core/smartquotes":41,"./rules_core/state_core":42}],18:[function(require,module,exports){
/** internal
 * class ParserInline
 *
 * Tokenizes paragraph content.
 **/
'use strict';


var Ruler           = require('./ruler');


////////////////////////////////////////////////////////////////////////////////
// Parser rules

var _rules = [
  [ 'text',            require('./rules_inline/text') ],
  [ 'newline',         require('./rules_inline/newline') ],
  [ 'escape',          require('./rules_inline/escape') ],
  [ 'backticks',       require('./rules_inline/backticks') ],
  [ 'strikethrough',   require('./rules_inline/strikethrough') ],
  [ 'emphasis',        require('./rules_inline/emphasis') ],
  [ 'link',            require('./rules_inline/link') ],
  [ 'image',           require('./rules_inline/image') ],
  [ 'autolink',        require('./rules_inline/autolink') ],
  [ 'html_inline',     require('./rules_inline/html_inline') ],
  [ 'entity',          require('./rules_inline/entity') ]
];


/**
 * new ParserInline()
 **/
function ParserInline() {
  /**
   * ParserInline#ruler -> Ruler
   *
   * [[Ruler]] instance. Keep configuration of inline rules.
   **/
  this.ruler = new Ruler();

  for (var i = 0; i < _rules.length; i++) {
    this.ruler.push(_rules[i][0], _rules[i][1]);
  }
}


// Skip single token by running all rules in validation mode;
// returns `true` if any rule reported success
//
ParserInline.prototype.skipToken = function (state) {
  var i, pos = state.pos,
      rules = this.ruler.getRules(''),
      len = rules.length,
      maxNesting = state.md.options.maxNesting,
      cache = state.cache;


  if (typeof cache[pos] !== 'undefined') {
    state.pos = cache[pos];
    return;
  }

  /*istanbul ignore else*/
  if (state.level < maxNesting) {
    for (i = 0; i < len; i++) {
      if (rules[i](state, true)) {
        cache[pos] = state.pos;
        return;
      }
    }
  }

  state.pos++;
  cache[pos] = state.pos;
};


// Generate tokens for input range
//
ParserInline.prototype.tokenize = function (state) {
  var ok, i,
      rules = this.ruler.getRules(''),
      len = rules.length,
      end = state.posMax,
      maxNesting = state.md.options.maxNesting;

  while (state.pos < end) {
    // Try all possible rules.
    // On success, rule should:
    //
    // - update `state.pos`
    // - update `state.tokens`
    // - return true

    if (state.level < maxNesting) {
      for (i = 0; i < len; i++) {
        ok = rules[i](state, false);
        if (ok) { break; }
      }
    }

    if (ok) {
      if (state.pos >= end) { break; }
      continue;
    }

    state.pending += state.src[state.pos++];
  }

  if (state.pending) {
    state.pushPending();
  }
};


/**
 * ParserInline.parse(str, md, env, outTokens)
 *
 * Process input string and push inline tokens into `outTokens`
 **/
ParserInline.prototype.parse = function (str, md, env, outTokens) {
  var state = new this.State(str, md, env, outTokens);

  this.tokenize(state);
};


ParserInline.prototype.State = require('./rules_inline/state_inline');


module.exports = ParserInline;

},{"./ruler":23,"./rules_inline/autolink":43,"./rules_inline/backticks":44,"./rules_inline/emphasis":45,"./rules_inline/entity":46,"./rules_inline/escape":47,"./rules_inline/html_inline":48,"./rules_inline/image":49,"./rules_inline/link":50,"./rules_inline/newline":51,"./rules_inline/state_inline":52,"./rules_inline/strikethrough":53,"./rules_inline/text":54}],19:[function(require,module,exports){
// Commonmark default options

'use strict';


module.exports = {
  options: {
    html:         true,         // Enable HTML tags in source
    xhtmlOut:     true,         // Use '/' to close single tags (<br />)
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    langPrefix:   'language-',  // CSS language prefix for fenced blocks
    linkify:      false,        // autoconvert URL-like texts to links

    // Enable some language-neutral replacements + quotes beautification
    typographer:  false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
    quotes: '\u201c\u201d\u2018\u2019' /* “”‘’ */,

    // Highlighter function. Should return escaped HTML,
    // or '' if input not changed
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,

    maxNesting:   20            // Internal protection, recursion limit
  },

  components: {

    core: {
      rules: [
        'normalize',
        'block',
        'inline'
      ]
    },

    block: {
      rules: [
        'blockquote',
        'code',
        'fence',
        'heading',
        'hr',
        'html_block',
        'lheading',
        'list',
        'reference',
        'paragraph'
      ]
    },

    inline: {
      rules: [
        'autolink',
        'backticks',
        'emphasis',
        'entity',
        'escape',
        'html_inline',
        'image',
        'link',
        'newline',
        'text'
      ]
    }
  }
};

},{}],20:[function(require,module,exports){
// markdown-it default options

'use strict';


module.exports = {
  options: {
    html:         false,        // Enable HTML tags in source
    xhtmlOut:     false,        // Use '/' to close single tags (<br />)
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    langPrefix:   'language-',  // CSS language prefix for fenced blocks
    linkify:      false,        // autoconvert URL-like texts to links

    // Enable some language-neutral replacements + quotes beautification
    typographer:  false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
    quotes: '\u201c\u201d\u2018\u2019' /* “”‘’ */,

    // Highlighter function. Should return escaped HTML,
    // or '' if input not changed
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,

    maxNesting:   20            // Internal protection, recursion limit
  },

  components: {

    core: {},
    block: {},
    inline: {}
  }
};

},{}],21:[function(require,module,exports){
// "Zero" preset, with nothing enabled. Useful for manual configuring of simple
// modes. For example, to parse bold/italic only.

'use strict';


module.exports = {
  options: {
    html:         false,        // Enable HTML tags in source
    xhtmlOut:     false,        // Use '/' to close single tags (<br />)
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    langPrefix:   'language-',  // CSS language prefix for fenced blocks
    linkify:      false,        // autoconvert URL-like texts to links

    // Enable some language-neutral replacements + quotes beautification
    typographer:  false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
    quotes: '\u201c\u201d\u2018\u2019' /* “”‘’ */,

    // Highlighter function. Should return escaped HTML,
    // or '' if input not changed
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,

    maxNesting:   20            // Internal protection, recursion limit
  },

  components: {

    core: {
      rules: [
        'normalize',
        'block',
        'inline'
      ]
    },

    block: {
      rules: [
        'paragraph'
      ]
    },

    inline: {
      rules: [
        'text'
      ]
    }
  }
};

},{}],22:[function(require,module,exports){
/**
 * class Renderer
 *
 * Generates HTML from parsed token stream. Each instance has independent
 * copy of rules. Those can be rewritten with ease. Also, you can add new
 * rules if you create plugin and adds new token types.
 **/
'use strict';


var assign          = require('./common/utils').assign;
var unescapeAll     = require('./common/utils').unescapeAll;
var escapeHtml      = require('./common/utils').escapeHtml;


////////////////////////////////////////////////////////////////////////////////

var default_rules = {};


default_rules.code_inline = function (tokens, idx /*, options, env */) {
  return '<code>' + escapeHtml(tokens[idx].content) + '</code>';
};


default_rules.code_block = function (tokens, idx /*, options, env */) {
  return '<pre><code>' + escapeHtml(tokens[idx].content) + '</code></pre>\n';
};


default_rules.fence = function (tokens, idx, options, env, self) {
  var token = tokens[idx],
      langName = '',
      highlighted;

  if (token.info) {
    langName = unescapeAll(token.info.trim().split(/\s+/g)[0]);
    token.attrPush([ 'class', options.langPrefix + langName ]);
  }

  if (options.highlight) {
    highlighted = options.highlight(token.content, langName) || escapeHtml(token.content);
  } else {
    highlighted = escapeHtml(token.content);
  }

  return  '<pre><code' + self.renderAttrs(token) + '>'
        + highlighted
        + '</code></pre>\n';
};


default_rules.image = function (tokens, idx, options, env, self) {
  var token = tokens[idx];

  // "alt" attr MUST be set, even if empty. Because it's mandatory and
  // should be placed on proper position for tests.
  //
  // Replace content with actual value

  token.attrs[token.attrIndex('alt')][1] =
    self.renderInlineAsText(token.children, options, env);

  return self.renderToken(tokens, idx, options);
};


default_rules.hardbreak = function (tokens, idx, options /*, env */) {
  return options.xhtmlOut ? '<br />\n' : '<br>\n';
};
default_rules.softbreak = function (tokens, idx, options /*, env */) {
  return options.breaks ? (options.xhtmlOut ? '<br />\n' : '<br>\n') : '\n';
};


default_rules.text = function (tokens, idx /*, options, env */) {
  return escapeHtml(tokens[idx].content);
};


default_rules.html_block = function (tokens, idx /*, options, env */) {
  return tokens[idx].content;
};
default_rules.html_inline = function (tokens, idx /*, options, env */) {
  return tokens[idx].content;
};


/**
 * new Renderer()
 *
 * Creates new [[Renderer]] instance and fill [[Renderer#rules]] with defaults.
 **/
function Renderer() {

  /**
   * Renderer#rules -> Object
   *
   * Contains render rules for tokens. Can be updated and extended.
   *
   * ##### Example
   *
   * ```javascript
   * var md = require('markdown-it')();
   *
   * md.renderer.rules.strong_open  = function () { return '<b>'; };
   * md.renderer.rules.strong_close = function () { return '</b>'; };
   *
   * var result = md.renderInline(...);
   * ```
   *
   * Each rule is called as independed static function with fixed signature:
   *
   * ```javascript
   * function my_token_render(tokens, idx, options, env, renderer) {
   *   // ...
   *   return renderedHTML;
   * }
   * ```
   *
   * See [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js)
   * for more details and examples.
   **/
  this.rules = assign({}, default_rules);
}


/**
 * Renderer.renderAttrs(token) -> String
 *
 * Render token attributes to string.
 **/
Renderer.prototype.renderAttrs = function renderAttrs(token) {
  var i, l, result;

  if (!token.attrs) { return ''; }

  result = '';

  for (i = 0, l = token.attrs.length; i < l; i++) {
    result += ' ' + escapeHtml(token.attrs[i][0]) + '="' + escapeHtml(token.attrs[i][1]) + '"';
  }

  return result;
};


/**
 * Renderer.renderToken(tokens, idx, options) -> String
 * - tokens (Array): list of tokens
 * - idx (Numbed): token index to render
 * - options (Object): params of parser instance
 *
 * Default token renderer. Can be overriden by custom function
 * in [[Renderer#rules]].
 **/
Renderer.prototype.renderToken = function renderToken(tokens, idx, options) {
  var nextToken,
      result = '',
      needLf = false,
      token = tokens[idx];

  // Tight list paragraphs
  if (token.hidden) {
    return '';
  }

  // Insert a newline between hidden paragraph and subsequent opening
  // block-level tag.
  //
  // For example, here we should insert a newline before blockquote:
  //  - a
  //    >
  //
  if (token.block && token.nesting !== -1 && idx && tokens[idx - 1].hidden) {
    result += '\n';
  }

  // Add token name, e.g. `<img`
  result += (token.nesting === -1 ? '</' : '<') + token.tag;

  // Encode attributes, e.g. `<img src="foo"`
  result += this.renderAttrs(token);

  // Add a slash for self-closing tags, e.g. `<img src="foo" /`
  if (token.nesting === 0 && options.xhtmlOut) {
    result += ' /';
  }

  // Check if we need to add a newline after this tag
  if (token.block) {
    needLf = true;

    if (token.nesting === 1) {
      if (idx + 1 < tokens.length) {
        nextToken = tokens[idx + 1];

        if (nextToken.type === 'inline' || nextToken.hidden) {
          // Block-level tag containing an inline tag.
          //
          needLf = false;

        } else if (nextToken.nesting === -1 && nextToken.tag === token.tag) {
          // Opening tag + closing tag of the same type. E.g. `<li></li>`.
          //
          needLf = false;
        }
      }
    }
  }

  result += needLf ? '>\n' : '>';

  return result;
};


/**
 * Renderer.renderInline(tokens, options, env) -> String
 * - tokens (Array): list on block tokens to renter
 * - options (Object): params of parser instance
 * - env (Object): additional data from parsed input (references, for example)
 *
 * The same as [[Renderer.render]], but for single token of `inline` type.
 **/
Renderer.prototype.renderInline = function (tokens, options, env) {
  var type,
      result = '',
      rules = this.rules;

  for (var i = 0, len = tokens.length; i < len; i++) {
    type = tokens[i].type;

    if (typeof rules[type] !== 'undefined') {
      result += rules[type](tokens, i, options, env, this);
    } else {
      result += this.renderToken(tokens, i, options);
    }
  }

  return result;
};


/** internal
 * Renderer.renderInlineAsText(tokens, options, env) -> String
 * - tokens (Array): list on block tokens to renter
 * - options (Object): params of parser instance
 * - env (Object): additional data from parsed input (references, for example)
 *
 * Special kludge for image `alt` attributes to conform CommonMark spec.
 * Don't try to use it! Spec requires to show `alt` content with stripped markup,
 * instead of simple escaping.
 **/
Renderer.prototype.renderInlineAsText = function (tokens, options, env) {
  var result = '',
      rules = this.rules;

  for (var i = 0, len = tokens.length; i < len; i++) {
    if (tokens[i].type === 'text') {
      result += rules.text(tokens, i, options, env, this);
    } else if (tokens[i].type === 'image') {
      result += this.renderInlineAsText(tokens[i].children, options, env);
    }
  }

  return result;
};


/**
 * Renderer.render(tokens, options, env) -> String
 * - tokens (Array): list on block tokens to renter
 * - options (Object): params of parser instance
 * - env (Object): additional data from parsed input (references, for example)
 *
 * Takes token stream and generates HTML. Probably, you will never need to call
 * this method directly.
 **/
Renderer.prototype.render = function (tokens, options, env) {
  var i, len, type,
      result = '',
      rules = this.rules;

  for (i = 0, len = tokens.length; i < len; i++) {
    type = tokens[i].type;

    if (type === 'inline') {
      result += this.renderInline(tokens[i].children, options, env);
    } else if (typeof rules[type] !== 'undefined') {
      result += rules[tokens[i].type](tokens, i, options, env, this);
    } else {
      result += this.renderToken(tokens, i, options, env);
    }
  }

  return result;
};

module.exports = Renderer;

},{"./common/utils":10}],23:[function(require,module,exports){
/**
 * class Ruler
 *
 * Helper class, used by [[MarkdownIt#core]], [[MarkdownIt#block]] and
 * [[MarkdownIt#inline]] to manage sequences of functions (rules):
 *
 * - keep rules in defined order
 * - assign the name to each rule
 * - enable/disable rules
 * - add/replace rules
 * - allow assign rules to additional named chains (in the same)
 * - cacheing lists of active rules
 *
 * You will not need use this class directly until write plugins. For simple
 * rules control use [[MarkdownIt.disable]], [[MarkdownIt.enable]] and
 * [[MarkdownIt.use]].
 **/
'use strict';


/**
 * new Ruler()
 **/
function Ruler() {
  // List of added rules. Each element is:
  //
  // {
  //   name: XXX,
  //   enabled: Boolean,
  //   fn: Function(),
  //   alt: [ name2, name3 ]
  // }
  //
  this.__rules__ = [];

  // Cached rule chains.
  //
  // First level - chain name, '' for default.
  // Second level - diginal anchor for fast filtering by charcodes.
  //
  this.__cache__ = null;
}

////////////////////////////////////////////////////////////////////////////////
// Helper methods, should not be used directly


// Find rule index by name
//
Ruler.prototype.__find__ = function (name) {
  for (var i = 0; i < this.__rules__.length; i++) {
    if (this.__rules__[i].name === name) {
      return i;
    }
  }
  return -1;
};


// Build rules lookup cache
//
Ruler.prototype.__compile__ = function () {
  var self = this;
  var chains = [ '' ];

  // collect unique names
  self.__rules__.forEach(function (rule) {
    if (!rule.enabled) { return; }

    rule.alt.forEach(function (altName) {
      if (chains.indexOf(altName) < 0) {
        chains.push(altName);
      }
    });
  });

  self.__cache__ = {};

  chains.forEach(function (chain) {
    self.__cache__[chain] = [];
    self.__rules__.forEach(function (rule) {
      if (!rule.enabled) { return; }

      if (chain && rule.alt.indexOf(chain) < 0) { return; }

      self.__cache__[chain].push(rule.fn);
    });
  });
};


/**
 * Ruler.at(name, fn [, options])
 * - name (String): rule name to replace.
 * - fn (Function): new rule function.
 * - options (Object): new rule options (not mandatory).
 *
 * Replace rule by name with new function & options. Throws error if name not
 * found.
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * Replace existing typorgapher replacement rule with new one:
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.core.ruler.at('replacements', function replace(state) {
 *   //...
 * });
 * ```
 **/
Ruler.prototype.at = function (name, fn, options) {
  var index = this.__find__(name);
  var opt = options || {};

  if (index === -1) { throw new Error('Parser rule not found: ' + name); }

  this.__rules__[index].fn = fn;
  this.__rules__[index].alt = opt.alt || [];
  this.__cache__ = null;
};


/**
 * Ruler.before(beforeName, ruleName, fn [, options])
 * - beforeName (String): new rule will be added before this one.
 * - ruleName (String): name of added rule.
 * - fn (Function): rule function.
 * - options (Object): rule options (not mandatory).
 *
 * Add new rule to chain before one with given name. See also
 * [[Ruler.after]], [[Ruler.push]].
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.block.ruler.before('paragraph', 'my_rule', function replace(state) {
 *   //...
 * });
 * ```
 **/
Ruler.prototype.before = function (beforeName, ruleName, fn, options) {
  var index = this.__find__(beforeName);
  var opt = options || {};

  if (index === -1) { throw new Error('Parser rule not found: ' + beforeName); }

  this.__rules__.splice(index, 0, {
    name: ruleName,
    enabled: true,
    fn: fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};


/**
 * Ruler.after(afterName, ruleName, fn [, options])
 * - afterName (String): new rule will be added after this one.
 * - ruleName (String): name of added rule.
 * - fn (Function): rule function.
 * - options (Object): rule options (not mandatory).
 *
 * Add new rule to chain after one with given name. See also
 * [[Ruler.before]], [[Ruler.push]].
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.inline.ruler.after('text', 'my_rule', function replace(state) {
 *   //...
 * });
 * ```
 **/
Ruler.prototype.after = function (afterName, ruleName, fn, options) {
  var index = this.__find__(afterName);
  var opt = options || {};

  if (index === -1) { throw new Error('Parser rule not found: ' + afterName); }

  this.__rules__.splice(index + 1, 0, {
    name: ruleName,
    enabled: true,
    fn: fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};

/**
 * Ruler.push(ruleName, fn [, options])
 * - ruleName (String): name of added rule.
 * - fn (Function): rule function.
 * - options (Object): rule options (not mandatory).
 *
 * Push new rule to the end of chain. See also
 * [[Ruler.before]], [[Ruler.after]].
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.core.ruler.push('my_rule', function replace(state) {
 *   //...
 * });
 * ```
 **/
Ruler.prototype.push = function (ruleName, fn, options) {
  var opt = options || {};

  this.__rules__.push({
    name: ruleName,
    enabled: true,
    fn: fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};


/**
 * Ruler.enable(list [, ignoreInvalid]) -> Array
 * - list (String|Array): list of rule names to enable.
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Enable rules with given names. If any rule name not found - throw Error.
 * Errors can be disabled by second param.
 *
 * Returns list of found rule names (if no exception happened).
 *
 * See also [[Ruler.disable]], [[Ruler.enableOnly]].
 **/
Ruler.prototype.enable = function (list, ignoreInvalid) {
  if (!Array.isArray(list)) { list = [ list ]; }

  var result = [];

  // Search by name and enable
  list.forEach(function (name) {
    var idx = this.__find__(name);

    if (idx < 0) {
      if (ignoreInvalid) { return; }
      throw new Error('Rules manager: invalid rule name ' + name);
    }
    this.__rules__[idx].enabled = true;
    result.push(name);
  }, this);

  this.__cache__ = null;
  return result;
};


/**
 * Ruler.enableOnly(list [, ignoreInvalid])
 * - list (String|Array): list of rule names to enable (whitelist).
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Enable rules with given names, and disable everything else. If any rule name
 * not found - throw Error. Errors can be disabled by second param.
 *
 * See also [[Ruler.disable]], [[Ruler.enable]].
 **/
Ruler.prototype.enableOnly = function (list, ignoreInvalid) {
  if (!Array.isArray(list)) { list = [ list ]; }

  this.__rules__.forEach(function (rule) { rule.enabled = false; });

  this.enable(list, ignoreInvalid);
};


/**
 * Ruler.disable(list [, ignoreInvalid]) -> Array
 * - list (String|Array): list of rule names to disable.
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Disable rules with given names. If any rule name not found - throw Error.
 * Errors can be disabled by second param.
 *
 * Returns list of found rule names (if no exception happened).
 *
 * See also [[Ruler.enable]], [[Ruler.enableOnly]].
 **/
Ruler.prototype.disable = function (list, ignoreInvalid) {
  if (!Array.isArray(list)) { list = [ list ]; }

  var result = [];

  // Search by name and disable
  list.forEach(function (name) {
    var idx = this.__find__(name);

    if (idx < 0) {
      if (ignoreInvalid) { return; }
      throw new Error('Rules manager: invalid rule name ' + name);
    }
    this.__rules__[idx].enabled = false;
    result.push(name);
  }, this);

  this.__cache__ = null;
  return result;
};


/**
 * Ruler.getRules(chainName) -> Array
 *
 * Return array of active functions (rules) for given chain name. It analyzes
 * rules configuration, compiles caches if not exists and returns result.
 *
 * Default chain name is `''` (empty string). It can't be skipped. That's
 * done intentionally, to keep signature monomorphic for high speed.
 **/
Ruler.prototype.getRules = function (chainName) {
  if (this.__cache__ === null) {
    this.__compile__();
  }

  // Chain can be empty, if rules disabled. But we still have to return Array.
  return this.__cache__[chainName] || [];
};

module.exports = Ruler;

},{}],24:[function(require,module,exports){
// Block quotes

'use strict';


module.exports = function blockquote(state, startLine, endLine, silent) {
  var nextLine, lastLineEmpty, oldTShift, oldBMarks, oldIndent, oldParentType, lines,
      terminatorRules, token,
      i, l, terminate,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  // check the block quote marker
  if (state.src.charCodeAt(pos++) !== 0x3E/* > */) { return false; }

  // we know that it's going to be a valid blockquote,
  // so no point trying to find the end of it in silent mode
  if (silent) { return true; }

  // skip one optional space after '>'
  if (state.src.charCodeAt(pos) === 0x20) { pos++; }

  oldIndent = state.blkIndent;
  state.blkIndent = 0;

  oldBMarks = [ state.bMarks[startLine] ];
  state.bMarks[startLine] = pos;

  // check if we have an empty blockquote
  pos = pos < max ? state.skipSpaces(pos) : pos;
  lastLineEmpty = pos >= max;

  oldTShift = [ state.tShift[startLine] ];
  state.tShift[startLine] = pos - state.bMarks[startLine];

  terminatorRules = state.md.block.ruler.getRules('blockquote');

  // Search the end of the block
  //
  // Block ends with either:
  //  1. an empty line outside:
  //     ```
  //     > test
  //
  //     ```
  //  2. an empty line inside:
  //     ```
  //     >
  //     test
  //     ```
  //  3. another tag
  //     ```
  //     > test
  //      - - -
  //     ```
  for (nextLine = startLine + 1; nextLine < endLine; nextLine++) {
    pos = state.bMarks[nextLine] + state.tShift[nextLine];
    max = state.eMarks[nextLine];

    if (pos >= max) {
      // Case 1: line is not inside the blockquote, and this line is empty.
      break;
    }

    if (state.src.charCodeAt(pos++) === 0x3E/* > */) {
      // This line is inside the blockquote.

      // skip one optional space after '>'
      if (state.src.charCodeAt(pos) === 0x20) { pos++; }

      oldBMarks.push(state.bMarks[nextLine]);
      state.bMarks[nextLine] = pos;

      pos = pos < max ? state.skipSpaces(pos) : pos;
      lastLineEmpty = pos >= max;

      oldTShift.push(state.tShift[nextLine]);
      state.tShift[nextLine] = pos - state.bMarks[nextLine];
      continue;
    }

    // Case 2: line is not inside the blockquote, and the last line was empty.
    if (lastLineEmpty) { break; }

    // Case 3: another tag found.
    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) { break; }

    oldBMarks.push(state.bMarks[nextLine]);
    oldTShift.push(state.tShift[nextLine]);

    // A negative number means that this is a paragraph continuation;
    //
    // Any negative number will do the job here, but it's better for it
    // to be large enough to make any bugs obvious.
    state.tShift[nextLine] = -1337;
  }

  oldParentType = state.parentType;
  state.parentType = 'blockquote';

  token        = state.push('blockquote_open', 'blockquote', 1);
  token.markup = '>';
  token.map    = lines = [ startLine, 0 ];

  state.md.block.tokenize(state, startLine, nextLine);

  token        = state.push('blockquote_close', 'blockquote', -1);
  token.markup = '>';

  state.parentType = oldParentType;
  lines[1] = state.line;

  // Restore original tShift; this might not be necessary since the parser
  // has already been here, but just to make sure we can do that.
  for (i = 0; i < oldTShift.length; i++) {
    state.bMarks[i + startLine] = oldBMarks[i];
    state.tShift[i + startLine] = oldTShift[i];
  }
  state.blkIndent = oldIndent;

  return true;
};

},{}],25:[function(require,module,exports){
// Code block (4 spaces padded)

'use strict';


module.exports = function code(state, startLine, endLine/*, silent*/) {
  var nextLine, last, token;

  if (state.tShift[startLine] - state.blkIndent < 4) { return false; }

  last = nextLine = startLine + 1;

  while (nextLine < endLine) {
    if (state.isEmpty(nextLine)) {
      nextLine++;
      continue;
    }
    if (state.tShift[nextLine] - state.blkIndent >= 4) {
      nextLine++;
      last = nextLine;
      continue;
    }
    break;
  }

  state.line = nextLine;

  token         = state.push('code_block', 'code', 0);
  token.content = state.getLines(startLine, last, 4 + state.blkIndent, true);
  token.map     = [ startLine, state.line ];

  return true;
};

},{}],26:[function(require,module,exports){
// fences (``` lang, ~~~ lang)

'use strict';


module.exports = function fence(state, startLine, endLine, silent) {
  var marker, len, params, nextLine, mem, token, markup,
      haveEndMarker = false,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  if (pos + 3 > max) { return false; }

  marker = state.src.charCodeAt(pos);

  if (marker !== 0x7E/* ~ */ && marker !== 0x60 /* ` */) {
    return false;
  }

  // scan marker length
  mem = pos;
  pos = state.skipChars(pos, marker);

  len = pos - mem;

  if (len < 3) { return false; }

  markup = state.src.slice(mem, pos);
  params = state.src.slice(pos, max);

  if (params.indexOf('`') >= 0) { return false; }

  // Since start is found, we can report success here in validation mode
  if (silent) { return true; }

  // search end of block
  nextLine = startLine;

  for (;;) {
    nextLine++;
    if (nextLine >= endLine) {
      // unclosed block should be autoclosed by end of document.
      // also block seems to be autoclosed by end of parent
      break;
    }

    pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
    max = state.eMarks[nextLine];

    if (pos < max && state.tShift[nextLine] < state.blkIndent) {
      // non-empty line with negative indent should stop the list:
      // - ```
      //  test
      break;
    }

    if (state.src.charCodeAt(pos) !== marker) { continue; }

    if (state.tShift[nextLine] - state.blkIndent >= 4) {
      // closing fence should be indented less than 4 spaces
      continue;
    }

    pos = state.skipChars(pos, marker);

    // closing code fence must be at least as long as the opening one
    if (pos - mem < len) { continue; }

    // make sure tail has spaces only
    pos = state.skipSpaces(pos);

    if (pos < max) { continue; }

    haveEndMarker = true;
    // found!
    break;
  }

  // If a fence has heading spaces, they should be removed from its inner block
  len = state.tShift[startLine];

  state.line = nextLine + (haveEndMarker ? 1 : 0);

  token         = state.push('fence', 'code', 0);
  token.info    = params;
  token.content = state.getLines(startLine + 1, nextLine, len, true);
  token.markup  = markup;
  token.map     = [ startLine, state.line ];

  return true;
};

},{}],27:[function(require,module,exports){
// heading (#, ##, ...)

'use strict';


module.exports = function heading(state, startLine, endLine, silent) {
  var ch, level, tmp, token,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  ch  = state.src.charCodeAt(pos);

  if (ch !== 0x23/* # */ || pos >= max) { return false; }

  // count heading level
  level = 1;
  ch = state.src.charCodeAt(++pos);
  while (ch === 0x23/* # */ && pos < max && level <= 6) {
    level++;
    ch = state.src.charCodeAt(++pos);
  }

  if (level > 6 || (pos < max && ch !== 0x20/* space */)) { return false; }

  if (silent) { return true; }

  // Let's cut tails like '    ###  ' from the end of string

  max = state.skipCharsBack(max, 0x20, pos); // space
  tmp = state.skipCharsBack(max, 0x23, pos); // #
  if (tmp > pos && state.src.charCodeAt(tmp - 1) === 0x20/* space */) {
    max = tmp;
  }

  state.line = startLine + 1;

  token        = state.push('heading_open', 'h' + String(level), 1);
  token.markup = '########'.slice(0, level);
  token.map    = [ startLine, state.line ];

  token          = state.push('inline', '', 0);
  token.content  = state.src.slice(pos, max).trim();
  token.map      = [ startLine, state.line ];
  token.children = [];

  token        = state.push('heading_close', 'h' + String(level), -1);
  token.markup = '########'.slice(0, level);

  return true;
};

},{}],28:[function(require,module,exports){
// Horizontal rule

'use strict';


module.exports = function hr(state, startLine, endLine, silent) {
  var marker, cnt, ch, token,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  marker = state.src.charCodeAt(pos++);

  // Check hr marker
  if (marker !== 0x2A/* * */ &&
      marker !== 0x2D/* - */ &&
      marker !== 0x5F/* _ */) {
    return false;
  }

  // markers can be mixed with spaces, but there should be at least 3 one

  cnt = 1;
  while (pos < max) {
    ch = state.src.charCodeAt(pos++);
    if (ch !== marker && ch !== 0x20/* space */) { return false; }
    if (ch === marker) { cnt++; }
  }

  if (cnt < 3) { return false; }

  if (silent) { return true; }

  state.line = startLine + 1;

  token        = state.push('hr', 'hr', 0);
  token.map    = [ startLine, state.line ];
  token.markup = Array(cnt + 1).join(String.fromCharCode(marker));

  return true;
};

},{}],29:[function(require,module,exports){
// HTML block

'use strict';


var block_names = require('../common/html_blocks');


var HTML_TAG_OPEN_RE = /^<([a-zA-Z][a-zA-Z0-9]{0,14})[\s\/>]/;
var HTML_TAG_CLOSE_RE = /^<\/([a-zA-Z][a-zA-Z0-9]{0,14})[\s>]/;

function isLetter(ch) {
  /*eslint no-bitwise:0*/
  var lc = ch | 0x20; // to lower case
  return (lc >= 0x61/* a */) && (lc <= 0x7a/* z */);
}

module.exports = function html_block(state, startLine, endLine, silent) {
  var ch, match, nextLine, token,
      pos = state.bMarks[startLine],
      max = state.eMarks[startLine],
      shift = state.tShift[startLine];

  pos += shift;

  if (!state.md.options.html) { return false; }

  if (shift > 3 || pos + 2 >= max) { return false; }

  if (state.src.charCodeAt(pos) !== 0x3C/* < */) { return false; }

  ch = state.src.charCodeAt(pos + 1);

  if (ch === 0x21/* ! */ || ch === 0x3F/* ? */) {
    // Directive start / comment start / processing instruction start
    if (silent) { return true; }

  } else if (ch === 0x2F/* / */ || isLetter(ch)) {

    // Probably start or end of tag
    if (ch === 0x2F/* \ */) {
      // closing tag
      match = state.src.slice(pos, max).match(HTML_TAG_CLOSE_RE);
      if (!match) { return false; }
    } else {
      // opening tag
      match = state.src.slice(pos, max).match(HTML_TAG_OPEN_RE);
      if (!match) { return false; }
    }
    // Make sure tag name is valid
    if (block_names[match[1].toLowerCase()] !== true) { return false; }
    if (silent) { return true; }

  } else {
    return false;
  }

  // If we are here - we detected HTML block.
  // Let's roll down till empty line (block end).
  nextLine = startLine + 1;
  while (nextLine < state.lineMax && !state.isEmpty(nextLine)) {
    nextLine++;
  }

  state.line = nextLine;

  token         = state.push('html_block', '', 0);
  token.map     = [ startLine, state.line ];
  token.content = state.getLines(startLine, nextLine, 0, true);

  return true;
};

},{"../common/html_blocks":7}],30:[function(require,module,exports){
// lheading (---, ===)

'use strict';


module.exports = function lheading(state, startLine, endLine/*, silent*/) {
  var marker, pos, max, token, level,
      next = startLine + 1;

  if (next >= endLine) { return false; }
  if (state.tShift[next] < state.blkIndent) { return false; }

  // Scan next line

  if (state.tShift[next] - state.blkIndent > 3) { return false; }

  pos = state.bMarks[next] + state.tShift[next];
  max = state.eMarks[next];

  if (pos >= max) { return false; }

  marker = state.src.charCodeAt(pos);

  if (marker !== 0x2D/* - */ && marker !== 0x3D/* = */) { return false; }

  pos = state.skipChars(pos, marker);

  pos = state.skipSpaces(pos);

  if (pos < max) { return false; }

  pos = state.bMarks[startLine] + state.tShift[startLine];

  state.line = next + 1;
  level = (marker === 0x3D/* = */ ? 1 : 2);

  token          = state.push('heading_open', 'h' + String(level), 1);
  token.markup   = String.fromCharCode(marker);
  token.map      = [ startLine, state.line ];

  token          = state.push('inline', '', 0);
  token.content  = state.src.slice(pos, state.eMarks[startLine]).trim();
  token.map      = [ startLine, state.line - 1 ];
  token.children = [];

  token          = state.push('heading_close', 'h' + String(level), -1);
  token.markup   = String.fromCharCode(marker);

  return true;
};

},{}],31:[function(require,module,exports){
// Lists

'use strict';


// Search `[-+*][\n ]`, returns next pos arter marker on success
// or -1 on fail.
function skipBulletListMarker(state, startLine) {
  var marker, pos, max;

  pos = state.bMarks[startLine] + state.tShift[startLine];
  max = state.eMarks[startLine];

  marker = state.src.charCodeAt(pos++);
  // Check bullet
  if (marker !== 0x2A/* * */ &&
      marker !== 0x2D/* - */ &&
      marker !== 0x2B/* + */) {
    return -1;
  }

  if (pos < max && state.src.charCodeAt(pos) !== 0x20) {
    // " 1.test " - is not a list item
    return -1;
  }

  return pos;
}

// Search `\d+[.)][\n ]`, returns next pos arter marker on success
// or -1 on fail.
function skipOrderedListMarker(state, startLine) {
  var ch,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  // List marker should have at least 2 chars (digit + dot)
  if (pos + 1 >= max) { return -1; }

  ch = state.src.charCodeAt(pos++);

  if (ch < 0x30/* 0 */ || ch > 0x39/* 9 */) { return -1; }

  for (;;) {
    // EOL -> fail
    if (pos >= max) { return -1; }

    ch = state.src.charCodeAt(pos++);

    if (ch >= 0x30/* 0 */ && ch <= 0x39/* 9 */) {
      continue;
    }

    // found valid marker
    if (ch === 0x29/* ) */ || ch === 0x2e/* . */) {
      break;
    }

    return -1;
  }


  if (pos < max && state.src.charCodeAt(pos) !== 0x20/* space */) {
    // " 1.test " - is not a list item
    return -1;
  }
  return pos;
}

function markTightParagraphs(state, idx) {
  var i, l,
      level = state.level + 2;

  for (i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
    if (state.tokens[i].level === level && state.tokens[i].type === 'paragraph_open') {
      state.tokens[i + 2].hidden = true;
      state.tokens[i].hidden = true;
      i += 2;
    }
  }
}


module.exports = function list(state, startLine, endLine, silent) {
  var nextLine,
      indent,
      oldTShift,
      oldIndent,
      oldTight,
      oldParentType,
      start,
      posAfterMarker,
      max,
      indentAfterMarker,
      markerValue,
      markerCharCode,
      isOrdered,
      contentStart,
      listTokIdx,
      prevEmptyEnd,
      listLines,
      itemLines,
      tight = true,
      terminatorRules,
      token,
      i, l, terminate;

  // Detect list type and position after marker
  if ((posAfterMarker = skipOrderedListMarker(state, startLine)) >= 0) {
    isOrdered = true;
  } else if ((posAfterMarker = skipBulletListMarker(state, startLine)) >= 0) {
    isOrdered = false;
  } else {
    return false;
  }

  // We should terminate list on style change. Remember first one to compare.
  markerCharCode = state.src.charCodeAt(posAfterMarker - 1);

  // For validation mode we can terminate immediately
  if (silent) { return true; }

  // Start list
  listTokIdx = state.tokens.length;

  if (isOrdered) {
    start = state.bMarks[startLine] + state.tShift[startLine];
    markerValue = Number(state.src.substr(start, posAfterMarker - start - 1));

    token       = state.push('ordered_list_open', 'ol', 1);
    if (markerValue > 1) {
      token.attrs = [ [ 'start', markerValue ] ];
    }

  } else {
    token       = state.push('bullet_list_open', 'ul', 1);
  }

  token.map    = listLines = [ startLine, 0 ];
  token.markup = String.fromCharCode(markerCharCode);

  //
  // Iterate list items
  //

  nextLine = startLine;
  prevEmptyEnd = false;
  terminatorRules = state.md.block.ruler.getRules('list');

  while (nextLine < endLine) {
    contentStart = state.skipSpaces(posAfterMarker);
    max = state.eMarks[nextLine];

    if (contentStart >= max) {
      // trimming space in "-    \n  3" case, indent is 1 here
      indentAfterMarker = 1;
    } else {
      indentAfterMarker = contentStart - posAfterMarker;
    }

    // If we have more than 4 spaces, the indent is 1
    // (the rest is just indented code block)
    if (indentAfterMarker > 4) { indentAfterMarker = 1; }

    // "  -  test"
    //  ^^^^^ - calculating total length of this thing
    indent = (posAfterMarker - state.bMarks[nextLine]) + indentAfterMarker;

    // Run subparser & write tokens
    token        = state.push('list_item_open', 'li', 1);
    token.markup = String.fromCharCode(markerCharCode);
    token.map    = itemLines = [ startLine, 0 ];

    oldIndent = state.blkIndent;
    oldTight = state.tight;
    oldTShift = state.tShift[startLine];
    oldParentType = state.parentType;
    state.tShift[startLine] = contentStart - state.bMarks[startLine];
    state.blkIndent = indent;
    state.tight = true;
    state.parentType = 'list';

    state.md.block.tokenize(state, startLine, endLine, true);

    // If any of list item is tight, mark list as tight
    if (!state.tight || prevEmptyEnd) {
      tight = false;
    }
    // Item become loose if finish with empty line,
    // but we should filter last element, because it means list finish
    prevEmptyEnd = (state.line - startLine) > 1 && state.isEmpty(state.line - 1);

    state.blkIndent = oldIndent;
    state.tShift[startLine] = oldTShift;
    state.tight = oldTight;
    state.parentType = oldParentType;

    token        = state.push('list_item_close', 'li', -1);
    token.markup = String.fromCharCode(markerCharCode);

    nextLine = startLine = state.line;
    itemLines[1] = nextLine;
    contentStart = state.bMarks[startLine];

    if (nextLine >= endLine) { break; }

    if (state.isEmpty(nextLine)) {
      break;
    }

    //
    // Try to check if list is terminated or continued.
    //
    if (state.tShift[nextLine] < state.blkIndent) { break; }

    // fail if terminating block found
    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) { break; }

    // fail if list has another type
    if (isOrdered) {
      posAfterMarker = skipOrderedListMarker(state, nextLine);
      if (posAfterMarker < 0) { break; }
    } else {
      posAfterMarker = skipBulletListMarker(state, nextLine);
      if (posAfterMarker < 0) { break; }
    }

    if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) { break; }
  }

  // Finilize list
  if (isOrdered) {
    token = state.push('ordered_list_close', 'ol', -1);
  } else {
    token = state.push('bullet_list_close', 'ul', -1);
  }
  token.markup = String.fromCharCode(markerCharCode);

  listLines[1] = nextLine;
  state.line = nextLine;

  // mark paragraphs tight if needed
  if (tight) {
    markTightParagraphs(state, listTokIdx);
  }

  return true;
};

},{}],32:[function(require,module,exports){
// Paragraph

'use strict';


module.exports = function paragraph(state, startLine/*, endLine*/) {
  var content, terminate, i, l, token,
      nextLine = startLine + 1,
      terminatorRules = state.md.block.ruler.getRules('paragraph'),
      endLine = state.lineMax;

  // jump line-by-line until empty one or EOF
  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    // this would be a code block normally, but after paragraph
    // it's considered a lazy continuation regardless of what's there
    if (state.tShift[nextLine] - state.blkIndent > 3) { continue; }

    // Some tags can terminate paragraph without empty line.
    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) { break; }
  }

  content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();

  state.line = nextLine;

  token          = state.push('paragraph_open', 'p', 1);
  token.map      = [ startLine, state.line ];

  token          = state.push('inline', '', 0);
  token.content  = content;
  token.map      = [ startLine, state.line ];
  token.children = [];

  token          = state.push('paragraph_close', 'p', -1);

  return true;
};

},{}],33:[function(require,module,exports){
'use strict';


var parseLinkDestination = require('../helpers/parse_link_destination');
var parseLinkTitle       = require('../helpers/parse_link_title');
var normalizeReference   = require('../common/utils').normalizeReference;


module.exports = function reference(state, startLine, _endLine, silent) {
  var ch,
      destEndPos,
      destEndLineNo,
      endLine,
      href,
      i,
      l,
      label,
      labelEnd,
      res,
      start,
      str,
      terminate,
      terminatorRules,
      title,
      lines = 0,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine],
      nextLine = startLine + 1;

  if (state.src.charCodeAt(pos) !== 0x5B/* [ */) { return false; }

  // Simple check to quickly interrupt scan on [link](url) at the start of line.
  // Can be useful on practice: https://github.com/markdown-it/markdown-it/issues/54
  while (++pos < max) {
    if (state.src.charCodeAt(pos) === 0x5D /* ] */ &&
        state.src.charCodeAt(pos - 1) !== 0x5C/* \ */) {
      if (pos + 1 === max) { return false; }
      if (state.src.charCodeAt(pos + 1) !== 0x3A/* : */) { return false; }
      break;
    }
  }

  endLine = state.lineMax;

  // jump line-by-line until empty one or EOF
  terminatorRules = state.md.block.ruler.getRules('reference');

  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    // this would be a code block normally, but after paragraph
    // it's considered a lazy continuation regardless of what's there
    if (state.tShift[nextLine] - state.blkIndent > 3) { continue; }

    // Some tags can terminate paragraph without empty line.
    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) { break; }
  }

  str = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
  max = str.length;

  for (pos = 1; pos < max; pos++) {
    ch = str.charCodeAt(pos);
    if (ch === 0x5B /* [ */) {
      return false;
    } else if (ch === 0x5D /* ] */) {
      labelEnd = pos;
      break;
    } else if (ch === 0x0A /* \n */) {
      lines++;
    } else if (ch === 0x5C /* \ */) {
      pos++;
      if (pos < max && str.charCodeAt(pos) === 0x0A) {
        lines++;
      }
    }
  }

  if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 0x3A/* : */) { return false; }

  // [label]:   destination   'title'
  //         ^^^ skip optional whitespace here
  for (pos = labelEnd + 2; pos < max; pos++) {
    ch = str.charCodeAt(pos);
    if (ch === 0x0A) {
      lines++;
    } else if (ch === 0x20) {
      /*eslint no-empty:0*/
    } else {
      break;
    }
  }

  // [label]:   destination   'title'
  //            ^^^^^^^^^^^ parse this
  res = parseLinkDestination(str, pos, max);
  if (!res.ok) { return false; }

  href = state.md.normalizeLink(res.str);
  if (!state.md.validateLink(href)) { return false; }

  pos = res.pos;
  lines += res.lines;

  // save cursor state, we could require to rollback later
  destEndPos = pos;
  destEndLineNo = lines;

  // [label]:   destination   'title'
  //                       ^^^ skipping those spaces
  start = pos;
  for (; pos < max; pos++) {
    ch = str.charCodeAt(pos);
    if (ch === 0x0A) {
      lines++;
    } else if (ch === 0x20) {
      /*eslint no-empty:0*/
    } else {
      break;
    }
  }

  // [label]:   destination   'title'
  //                          ^^^^^^^ parse this
  res = parseLinkTitle(str, pos, max);
  if (pos < max && start !== pos && res.ok) {
    title = res.str;
    pos = res.pos;
    lines += res.lines;
  } else {
    title = '';
    pos = destEndPos;
    lines = destEndLineNo;
  }

  // skip trailing spaces until the rest of the line
  while (pos < max && str.charCodeAt(pos) === 0x20/* space */) { pos++; }

  if (pos < max && str.charCodeAt(pos) !== 0x0A) {
    // garbage at the end of the line
    return false;
  }

  // Reference can not terminate anything. This check is for safety only.
  /*istanbul ignore if*/
  if (silent) { return true; }

  label = normalizeReference(str.slice(1, labelEnd));
  if (typeof state.env.references === 'undefined') {
    state.env.references = {};
  }
  if (typeof state.env.references[label] === 'undefined') {
    state.env.references[label] = { title: title, href: href };
  }

  state.line = startLine + lines + 1;
  return true;
};

},{"../common/utils":10,"../helpers/parse_link_destination":12,"../helpers/parse_link_title":14}],34:[function(require,module,exports){
// Parser state class

'use strict';

var Token = require('../token');


function StateBlock(src, md, env, tokens) {
  var ch, s, start, pos, len, indent, indent_found;

  this.src = src;

  // link to parser instance
  this.md     = md;

  this.env = env;

  //
  // Internal state vartiables
  //

  this.tokens = tokens;

  this.bMarks = [];  // line begin offsets for fast jumps
  this.eMarks = [];  // line end offsets for fast jumps
  this.tShift = [];  // indent for each line

  // block parser variables
  this.blkIndent  = 0; // required block content indent
                       // (for example, if we are in list)
  this.line       = 0; // line index in src
  this.lineMax    = 0; // lines count
  this.tight      = false;  // loose/tight mode for lists
  this.parentType = 'root'; // if `list`, block parser stops on two newlines
  this.ddIndent   = -1; // indent of the current dd block (-1 if there isn't any)

  this.level = 0;

  // renderer
  this.result = '';

  // Create caches
  // Generate markers.
  s = this.src;
  indent = 0;
  indent_found = false;

  for (start = pos = indent = 0, len = s.length; pos < len; pos++) {
    ch = s.charCodeAt(pos);

    if (!indent_found) {
      if (ch === 0x20/* space */) {
        indent++;
        continue;
      } else {
        indent_found = true;
      }
    }

    if (ch === 0x0A || pos === len - 1) {
      if (ch !== 0x0A) { pos++; }
      this.bMarks.push(start);
      this.eMarks.push(pos);
      this.tShift.push(indent);

      indent_found = false;
      indent = 0;
      start = pos + 1;
    }
  }

  // Push fake entry to simplify cache bounds checks
  this.bMarks.push(s.length);
  this.eMarks.push(s.length);
  this.tShift.push(0);

  this.lineMax = this.bMarks.length - 1; // don't count last fake line
}

// Push new token to "stream".
//
StateBlock.prototype.push = function (type, tag, nesting) {
  var token = new Token(type, tag, nesting);
  token.block = true;

  if (nesting < 0) { this.level--; }
  token.level = this.level;
  if (nesting > 0) { this.level++; }

  this.tokens.push(token);
  return token;
};

StateBlock.prototype.isEmpty = function isEmpty(line) {
  return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
};

StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
  for (var max = this.lineMax; from < max; from++) {
    if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
      break;
    }
  }
  return from;
};

// Skip spaces from given position.
StateBlock.prototype.skipSpaces = function skipSpaces(pos) {
  for (var max = this.src.length; pos < max; pos++) {
    if (this.src.charCodeAt(pos) !== 0x20/* space */) { break; }
  }
  return pos;
};

// Skip char codes from given position
StateBlock.prototype.skipChars = function skipChars(pos, code) {
  for (var max = this.src.length; pos < max; pos++) {
    if (this.src.charCodeAt(pos) !== code) { break; }
  }
  return pos;
};

// Skip char codes reverse from given position - 1
StateBlock.prototype.skipCharsBack = function skipCharsBack(pos, code, min) {
  if (pos <= min) { return pos; }

  while (pos > min) {
    if (code !== this.src.charCodeAt(--pos)) { return pos + 1; }
  }
  return pos;
};

// cut lines range from source.
StateBlock.prototype.getLines = function getLines(begin, end, indent, keepLastLF) {
  var i, first, last, queue, shift,
      line = begin;

  if (begin >= end) {
    return '';
  }

  // Opt: don't use push queue for single line;
  if (line + 1 === end) {
    first = this.bMarks[line] + Math.min(this.tShift[line], indent);
    last = keepLastLF ? this.bMarks[end] : this.eMarks[end - 1];
    return this.src.slice(first, last);
  }

  queue = new Array(end - begin);

  for (i = 0; line < end; line++, i++) {
    shift = this.tShift[line];
    if (shift > indent) { shift = indent; }
    if (shift < 0) { shift = 0; }

    first = this.bMarks[line] + shift;

    if (line + 1 < end || keepLastLF) {
      // No need for bounds check because we have fake entry on tail.
      last = this.eMarks[line] + 1;
    } else {
      last = this.eMarks[line];
    }

    queue[i] = this.src.slice(first, last);
  }

  return queue.join('');
};

// re-export Token class to use in block rules
StateBlock.prototype.Token = Token;


module.exports = StateBlock;

},{"../token":55}],35:[function(require,module,exports){
// GFM table, non-standard

'use strict';


function getLine(state, line) {
  var pos = state.bMarks[line] + state.blkIndent,
      max = state.eMarks[line];

  return state.src.substr(pos, max - pos);
}

function escapedSplit(str) {
  var result = [],
      pos = 0,
      max = str.length,
      ch,
      escapes = 0,
      lastPos = 0,
      backTicked = false,
      lastBackTick = 0;

  ch  = str.charCodeAt(pos);

  while (pos < max) {
    if (ch === 0x60/* ` */ && (escapes % 2 === 0)) {
      backTicked = !backTicked;
      lastBackTick = pos;
    } else if (ch === 0x7c/* | */ && (escapes % 2 === 0) && !backTicked) {
      result.push(str.substring(lastPos, pos));
      lastPos = pos + 1;
    } else if (ch === 0x5c/* \ */) {
      escapes++;
    } else {
      escapes = 0;
    }

    pos++;

    // If there was an un-closed backtick, go back to just after
    // the last backtick, but as if it was a normal character
    if (pos === max && backTicked) {
      backTicked = false;
      pos = lastBackTick + 1;
    }

    ch = str.charCodeAt(pos);
  }

  result.push(str.substring(lastPos));

  return result;
}


module.exports = function table(state, startLine, endLine, silent) {
  var ch, lineText, pos, i, nextLine, rows, token,
      aligns, t, tableLines, tbodyLines;

  // should have at least three lines
  if (startLine + 2 > endLine) { return false; }

  nextLine = startLine + 1;

  if (state.tShift[nextLine] < state.blkIndent) { return false; }

  // first character of the second line should be '|' or '-'

  pos = state.bMarks[nextLine] + state.tShift[nextLine];
  if (pos >= state.eMarks[nextLine]) { return false; }

  ch = state.src.charCodeAt(pos);
  if (ch !== 0x7C/* | */ && ch !== 0x2D/* - */ && ch !== 0x3A/* : */) { return false; }

  lineText = getLine(state, startLine + 1);
  if (!/^[-:| ]+$/.test(lineText)) { return false; }

  rows = lineText.split('|');
  if (rows.length < 2) { return false; }
  aligns = [];
  for (i = 0; i < rows.length; i++) {
    t = rows[i].trim();
    if (!t) {
      // allow empty columns before and after table, but not in between columns;
      // e.g. allow ` |---| `, disallow ` ---||--- `
      if (i === 0 || i === rows.length - 1) {
        continue;
      } else {
        return false;
      }
    }

    if (!/^:?-+:?$/.test(t)) { return false; }
    if (t.charCodeAt(t.length - 1) === 0x3A/* : */) {
      aligns.push(t.charCodeAt(0) === 0x3A/* : */ ? 'center' : 'right');
    } else if (t.charCodeAt(0) === 0x3A/* : */) {
      aligns.push('left');
    } else {
      aligns.push('');
    }
  }

  lineText = getLine(state, startLine).trim();
  if (lineText.indexOf('|') === -1) { return false; }
  rows = escapedSplit(lineText.replace(/^\||\|$/g, ''));
  if (aligns.length !== rows.length) { return false; }
  if (silent) { return true; }

  token     = state.push('table_open', 'table', 1);
  token.map = tableLines = [ startLine, 0 ];

  token     = state.push('thead_open', 'thead', 1);
  token.map = [ startLine, startLine + 1 ];

  token     = state.push('tr_open', 'tr', 1);
  token.map = [ startLine, startLine + 1 ];

  for (i = 0; i < rows.length; i++) {
    token          = state.push('th_open', 'th', 1);
    token.map      = [ startLine, startLine + 1 ];
    if (aligns[i]) {
      token.attrs  = [ [ 'style', 'text-align:' + aligns[i] ] ];
    }

    token          = state.push('inline', '', 0);
    token.content  = rows[i].trim();
    token.map      = [ startLine, startLine + 1 ];
    token.children = [];

    token          = state.push('th_close', 'th', -1);
  }

  token     = state.push('tr_close', 'tr', -1);
  token     = state.push('thead_close', 'thead', -1);

  token     = state.push('tbody_open', 'tbody', 1);
  token.map = tbodyLines = [ startLine + 2, 0 ];

  for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
    if (state.tShift[nextLine] < state.blkIndent) { break; }

    lineText = getLine(state, nextLine).trim();
    if (lineText.indexOf('|') === -1) { break; }
    rows = escapedSplit(lineText.replace(/^\||\|$/g, ''));

    // set number of columns to number of columns in header row
    rows.length = aligns.length;

    token = state.push('tr_open', 'tr', 1);
    for (i = 0; i < rows.length; i++) {
      token          = state.push('td_open', 'td', 1);
      if (aligns[i]) {
        token.attrs  = [ [ 'style', 'text-align:' + aligns[i] ] ];
      }

      token          = state.push('inline', '', 0);
      token.content  = rows[i] ? rows[i].trim() : '';
      token.children = [];

      token          = state.push('td_close', 'td', -1);
    }
    token = state.push('tr_close', 'tr', -1);
  }
  token = state.push('tbody_close', 'tbody', -1);
  token = state.push('table_close', 'table', -1);

  tableLines[1] = tbodyLines[1] = nextLine;
  state.line = nextLine;
  return true;
};

},{}],36:[function(require,module,exports){
'use strict';


module.exports = function block(state) {
  var token;

  if (state.inlineMode) {
    token          = new state.Token('inline', '', 0);
    token.content  = state.src;
    token.map      = [ 0, 1 ];
    token.children = [];
    state.tokens.push(token);
  } else {
    state.md.block.parse(state.src, state.md, state.env, state.tokens);
  }
};

},{}],37:[function(require,module,exports){
'use strict';

module.exports = function inline(state) {
  var tokens = state.tokens, tok, i, l;

  // Parse inlines
  for (i = 0, l = tokens.length; i < l; i++) {
    tok = tokens[i];
    if (tok.type === 'inline') {
      state.md.inline.parse(tok.content, state.md, state.env, tok.children);
    }
  }
};

},{}],38:[function(require,module,exports){
// Replace link-like texts with link nodes.
//
// Currently restricted by `md.validateLink()` to http/https/ftp
//
'use strict';


var arrayReplaceAt = require('../common/utils').arrayReplaceAt;


function isLinkOpen(str) {
  return /^<a[>\s]/i.test(str);
}
function isLinkClose(str) {
  return /^<\/a\s*>/i.test(str);
}


module.exports = function linkify(state) {
  var i, j, l, tokens, token, currentToken, nodes, ln, text, pos, lastPos,
      level, htmlLinkLevel, url, fullUrl, urlText,
      blockTokens = state.tokens,
      links;

  if (!state.md.options.linkify) { return; }

  for (j = 0, l = blockTokens.length; j < l; j++) {
    if (blockTokens[j].type !== 'inline' ||
        !state.md.linkify.pretest(blockTokens[j].content)) {
      continue;
    }

    tokens = blockTokens[j].children;

    htmlLinkLevel = 0;

    // We scan from the end, to keep position when new tags added.
    // Use reversed logic in links start/end match
    for (i = tokens.length - 1; i >= 0; i--) {
      currentToken = tokens[i];

      // Skip content of markdown links
      if (currentToken.type === 'link_close') {
        i--;
        while (tokens[i].level !== currentToken.level && tokens[i].type !== 'link_open') {
          i--;
        }
        continue;
      }

      // Skip content of html tag links
      if (currentToken.type === 'html_inline') {
        if (isLinkOpen(currentToken.content) && htmlLinkLevel > 0) {
          htmlLinkLevel--;
        }
        if (isLinkClose(currentToken.content)) {
          htmlLinkLevel++;
        }
      }
      if (htmlLinkLevel > 0) { continue; }

      if (currentToken.type === 'text' && state.md.linkify.test(currentToken.content)) {

        text = currentToken.content;
        links = state.md.linkify.match(text);

        // Now split string to nodes
        nodes = [];
        level = currentToken.level;
        lastPos = 0;

        for (ln = 0; ln < links.length; ln++) {

          url = links[ln].url;
          fullUrl = state.md.normalizeLink(url);
          if (!state.md.validateLink(fullUrl)) { continue; }

          urlText = links[ln].text;

          // Linkifier might send raw hostnames like "example.com", where url
          // starts with domain name. So we prepend http:// in those cases,
          // and remove it afterwards.
          //
          if (!links[ln].schema) {
            urlText = state.md.normalizeLinkText('http://' + urlText).replace(/^http:\/\//, '');
          } else if (links[ln].schema === 'mailto:' && !/^mailto:/i.test(urlText)) {
            urlText = state.md.normalizeLinkText('mailto:' + urlText).replace(/^mailto:/, '');
          } else {
            urlText = state.md.normalizeLinkText(urlText);
          }

          pos = links[ln].index;

          if (pos > lastPos) {
            token         = new state.Token('text', '', 0);
            token.content = text.slice(lastPos, pos);
            token.level   = level;
            nodes.push(token);
          }

          token         = new state.Token('link_open', 'a', 1);
          token.attrs   = [ [ 'href', fullUrl ] ];
          token.level   = level++;
          token.markup  = 'linkify';
          token.info    = 'auto';
          nodes.push(token);

          token         = new state.Token('text', '', 0);
          token.content = urlText;
          token.level   = level;
          nodes.push(token);

          token         = new state.Token('link_close', 'a', -1);
          token.level   = --level;
          token.markup  = 'linkify';
          token.info    = 'auto';
          nodes.push(token);

          lastPos = links[ln].lastIndex;
        }
        if (lastPos < text.length) {
          token         = new state.Token('text', '', 0);
          token.content = text.slice(lastPos);
          token.level   = level;
          nodes.push(token);
        }

        // replace current node
        blockTokens[j].children = tokens = arrayReplaceAt(tokens, i, nodes);
      }
    }
  }
};

},{"../common/utils":10}],39:[function(require,module,exports){
// Normalize input string

'use strict';


var TABS_SCAN_RE = /[\n\t]/g;
var NEWLINES_RE  = /\r[\n\u0085]|[\u2424\u2028\u0085]/g;
var NULL_RE      = /\u0000/g;


module.exports = function inline(state) {
  var str, lineStart, lastTabPos;

  // Normalize newlines
  str = state.src.replace(NEWLINES_RE, '\n');

  // Replace NULL characters
  str = str.replace(NULL_RE, '\uFFFD');

  // Replace tabs with proper number of spaces (1..4)
  if (str.indexOf('\t') >= 0) {
    lineStart = 0;
    lastTabPos = 0;

    str = str.replace(TABS_SCAN_RE, function (match, offset) {
      var result;
      if (str.charCodeAt(offset) === 0x0A) {
        lineStart = offset + 1;
        lastTabPos = 0;
        return match;
      }
      result = '    '.slice((offset - lineStart - lastTabPos) % 4);
      lastTabPos = offset - lineStart + 1;
      return result;
    });
  }

  state.src = str;
};

},{}],40:[function(require,module,exports){
// Simple typographyc replacements
//
// '' → ‘’
// "" → “”. Set '«»' for Russian, '„“' for German, empty to disable
// (c) (C) → ©
// (tm) (TM) → ™
// (r) (R) → ®
// +- → ±
// (p) (P) -> §
// ... → … (also ?.... → ?.., !.... → !..)
// ???????? → ???, !!!!! → !!!, `,,` → `,`
// -- → &ndash;, --- → &mdash;
//
'use strict';

// TODO:
// - fractionals 1/2, 1/4, 3/4 -> ½, ¼, ¾
// - miltiplication 2 x 4 -> 2 × 4

var RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;

// Workaround for phantomjs - need regex without /g flag,
// or root check will fail every second time
var SCOPED_ABBR_TEST_RE = /\((c|tm|r|p)\)/i;

var SCOPED_ABBR_RE = /\((c|tm|r|p)\)/ig;
var SCOPED_ABBR = {
  'c': '©',
  'r': '®',
  'p': '§',
  'tm': '™'
};

function replaceFn(match, name) {
  return SCOPED_ABBR[name.toLowerCase()];
}

function replace_scoped(inlineTokens) {
  var i, token;

  for (i = inlineTokens.length - 1; i >= 0; i--) {
    token = inlineTokens[i];
    if (token.type === 'text') {
      token.content = token.content.replace(SCOPED_ABBR_RE, replaceFn);
    }
  }
}

function replace_rare(inlineTokens) {
  var i, token;

  for (i = inlineTokens.length - 1; i >= 0; i--) {
    token = inlineTokens[i];
    if (token.type === 'text') {
      if (RARE_RE.test(token.content)) {
        token.content = token.content
                    .replace(/\+-/g, '±')
                    // .., ..., ....... -> …
                    // but ?..... & !..... -> ?.. & !..
                    .replace(/\.{2,}/g, '…').replace(/([?!])…/g, '$1..')
                    .replace(/([?!]){4,}/g, '$1$1$1').replace(/,{2,}/g, ',')
                    // em-dash
                    .replace(/(^|[^-])---([^-]|$)/mg, '$1\u2014$2')
                    // en-dash
                    .replace(/(^|\s)--(\s|$)/mg, '$1\u2013$2')
                    .replace(/(^|[^-\s])--([^-\s]|$)/mg, '$1\u2013$2');
      }
    }
  }
}


module.exports = function replace(state) {
  var blkIdx;

  if (!state.md.options.typographer) { return; }

  for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {

    if (state.tokens[blkIdx].type !== 'inline') { continue; }

    if (SCOPED_ABBR_TEST_RE.test(state.tokens[blkIdx].content)) {
      replace_scoped(state.tokens[blkIdx].children);
    }

    if (RARE_RE.test(state.tokens[blkIdx].content)) {
      replace_rare(state.tokens[blkIdx].children);
    }

  }
};

},{}],41:[function(require,module,exports){
// Convert straight quotation marks to typographic ones
//
'use strict';


var isWhiteSpace   = require('../common/utils').isWhiteSpace;
var isPunctChar    = require('../common/utils').isPunctChar;
var isMdAsciiPunct = require('../common/utils').isMdAsciiPunct;

var QUOTE_TEST_RE = /['"]/;
var QUOTE_RE = /['"]/g;
var APOSTROPHE = '\u2019'; /* ’ */


function replaceAt(str, index, ch) {
  return str.substr(0, index) + ch + str.substr(index + 1);
}

function process_inlines(tokens, state) {
  var i, token, text, t, pos, max, thisLevel, item, lastChar, nextChar,
      isLastPunctChar, isNextPunctChar, isLastWhiteSpace, isNextWhiteSpace,
      canOpen, canClose, j, isSingle, stack;

  stack = [];

  for (i = 0; i < tokens.length; i++) {
    token = tokens[i];

    thisLevel = tokens[i].level;

    for (j = stack.length - 1; j >= 0; j--) {
      if (stack[j].level <= thisLevel) { break; }
    }
    stack.length = j + 1;

    if (token.type !== 'text') { continue; }

    text = token.content;
    pos = 0;
    max = text.length;

    /*eslint no-labels:0,block-scoped-var:0*/
    OUTER:
    while (pos < max) {
      QUOTE_RE.lastIndex = pos;
      t = QUOTE_RE.exec(text);
      if (!t) { break; }

      canOpen = canClose = true;
      pos = t.index + 1;
      isSingle = (t[0] === "'");

      // treat begin/end of the line as a whitespace
      lastChar = t.index - 1 >= 0 ? text.charCodeAt(t.index - 1) : 0x20;
      nextChar = pos < max ? text.charCodeAt(pos) : 0x20;

      isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
      isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));

      isLastWhiteSpace = isWhiteSpace(lastChar);
      isNextWhiteSpace = isWhiteSpace(nextChar);

      if (isNextWhiteSpace) {
        canOpen = false;
      } else if (isNextPunctChar) {
        if (!(isLastWhiteSpace || isLastPunctChar)) {
          canOpen = false;
        }
      }

      if (isLastWhiteSpace) {
        canClose = false;
      } else if (isLastPunctChar) {
        if (!(isNextWhiteSpace || isNextPunctChar)) {
          canClose = false;
        }
      }

      if (nextChar === 0x22 /* " */ && t[0] === '"') {
        if (lastChar >= 0x30 /* 0 */ && lastChar <= 0x39 /* 9 */) {
          // special case: 1"" - count first quote as an inch
          canClose = canOpen = false;
        }
      }

      if (canOpen && canClose) {
        // treat this as the middle of the word
        canOpen = false;
        canClose = isNextPunctChar;
      }

      if (!canOpen && !canClose) {
        // middle of word
        if (isSingle) {
          token.content = replaceAt(token.content, t.index, APOSTROPHE);
        }
        continue;
      }

      if (canClose) {
        // this could be a closing quote, rewind the stack to get a match
        for (j = stack.length - 1; j >= 0; j--) {
          item = stack[j];
          if (stack[j].level < thisLevel) { break; }
          if (item.single === isSingle && stack[j].level === thisLevel) {
            item = stack[j];
            if (isSingle) {
              tokens[item.token].content = replaceAt(
                tokens[item.token].content, item.pos, state.md.options.quotes[2]);
              token.content = replaceAt(
                token.content, t.index, state.md.options.quotes[3]);
            } else {
              tokens[item.token].content = replaceAt(
                tokens[item.token].content, item.pos, state.md.options.quotes[0]);
              token.content = replaceAt(token.content, t.index, state.md.options.quotes[1]);
            }
            stack.length = j;
            continue OUTER;
          }
        }
      }

      if (canOpen) {
        stack.push({
          token: i,
          pos: t.index,
          single: isSingle,
          level: thisLevel
        });
      } else if (canClose && isSingle) {
        token.content = replaceAt(token.content, t.index, APOSTROPHE);
      }
    }
  }
}


module.exports = function smartquotes(state) {
  /*eslint max-depth:0*/
  var blkIdx;

  if (!state.md.options.typographer) { return; }

  for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {

    if (state.tokens[blkIdx].type !== 'inline' ||
        !QUOTE_TEST_RE.test(state.tokens[blkIdx].content)) {
      continue;
    }

    process_inlines(state.tokens[blkIdx].children, state);
  }
};

},{"../common/utils":10}],42:[function(require,module,exports){
// Core state object
//
'use strict';

var Token = require('../token');


function StateCore(src, md, env) {
  this.src = src;
  this.env = env;
  this.tokens = [];
  this.inlineMode = false;
  this.md = md; // link to parser instance
}

// re-export Token class to use in core rules
StateCore.prototype.Token = Token;


module.exports = StateCore;

},{"../token":55}],43:[function(require,module,exports){
// Process autolinks '<protocol:...>'

'use strict';

var url_schemas = require('../common/url_schemas');


/*eslint max-len:0*/
var EMAIL_RE    = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/;
var AUTOLINK_RE = /^<([a-zA-Z.\-]{1,25}):([^<>\x00-\x20]*)>/;


module.exports = function autolink(state, silent) {
  var tail, linkMatch, emailMatch, url, fullUrl, token,
      pos = state.pos;

  if (state.src.charCodeAt(pos) !== 0x3C/* < */) { return false; }

  tail = state.src.slice(pos);

  if (tail.indexOf('>') < 0) { return false; }

  if (AUTOLINK_RE.test(tail)) {
    linkMatch = tail.match(AUTOLINK_RE);

    if (url_schemas.indexOf(linkMatch[1].toLowerCase()) < 0) { return false; }

    url = linkMatch[0].slice(1, -1);
    fullUrl = state.md.normalizeLink(url);
    if (!state.md.validateLink(fullUrl)) { return false; }

    if (!silent) {
      token         = state.push('link_open', 'a', 1);
      token.attrs   = [ [ 'href', fullUrl ] ];

      token         = state.push('text', '', 0);
      token.content = state.md.normalizeLinkText(url);

      token         = state.push('link_close', 'a', -1);
    }

    state.pos += linkMatch[0].length;
    return true;
  }

  if (EMAIL_RE.test(tail)) {
    emailMatch = tail.match(EMAIL_RE);

    url = emailMatch[0].slice(1, -1);
    fullUrl = state.md.normalizeLink('mailto:' + url);
    if (!state.md.validateLink(fullUrl)) { return false; }

    if (!silent) {
      token         = state.push('link_open', 'a', 1);
      token.attrs   = [ [ 'href', fullUrl ] ];
      token.markup  = 'autolink';
      token.info    = 'auto';

      token         = state.push('text', '', 0);
      token.content = state.md.normalizeLinkText(url);

      token         = state.push('link_close', 'a', -1);
      token.markup  = 'autolink';
      token.info    = 'auto';
    }

    state.pos += emailMatch[0].length;
    return true;
  }

  return false;
};

},{"../common/url_schemas":9}],44:[function(require,module,exports){
// Parse backticks

'use strict';

module.exports = function backtick(state, silent) {
  var start, max, marker, matchStart, matchEnd, token,
      pos = state.pos,
      ch = state.src.charCodeAt(pos);

  if (ch !== 0x60/* ` */) { return false; }

  start = pos;
  pos++;
  max = state.posMax;

  while (pos < max && state.src.charCodeAt(pos) === 0x60/* ` */) { pos++; }

  marker = state.src.slice(start, pos);

  matchStart = matchEnd = pos;

  while ((matchStart = state.src.indexOf('`', matchEnd)) !== -1) {
    matchEnd = matchStart + 1;

    while (matchEnd < max && state.src.charCodeAt(matchEnd) === 0x60/* ` */) { matchEnd++; }

    if (matchEnd - matchStart === marker.length) {
      if (!silent) {
        token         = state.push('code_inline', 'code', 0);
        token.markup  = marker;
        token.content = state.src.slice(pos, matchStart)
                                 .replace(/[ \n]+/g, ' ')
                                 .trim();
      }
      state.pos = matchEnd;
      return true;
    }
  }

  if (!silent) { state.pending += marker; }
  state.pos += marker.length;
  return true;
};

},{}],45:[function(require,module,exports){
// Process *this* and _that_
//
'use strict';


var isWhiteSpace   = require('../common/utils').isWhiteSpace;
var isPunctChar    = require('../common/utils').isPunctChar;
var isMdAsciiPunct = require('../common/utils').isMdAsciiPunct;


// parse sequence of emphasis markers,
// "start" should point at a valid marker
function scanDelims(state, start) {
  var pos = start, lastChar, nextChar, count, can_open, can_close,
      isLastWhiteSpace, isLastPunctChar,
      isNextWhiteSpace, isNextPunctChar,
      left_flanking = true,
      right_flanking = true,
      max = state.posMax,
      marker = state.src.charCodeAt(start);

  // treat beginning of the line as a whitespace
  lastChar = start > 0 ? state.src.charCodeAt(start - 1) : 0x20;

  while (pos < max && state.src.charCodeAt(pos) === marker) { pos++; }

  count = pos - start;

  // treat end of the line as a whitespace
  nextChar = pos < max ? state.src.charCodeAt(pos) : 0x20;

  isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
  isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));

  isLastWhiteSpace = isWhiteSpace(lastChar);
  isNextWhiteSpace = isWhiteSpace(nextChar);

  if (isNextWhiteSpace) {
    left_flanking = false;
  } else if (isNextPunctChar) {
    if (!(isLastWhiteSpace || isLastPunctChar)) {
      left_flanking = false;
    }
  }

  if (isLastWhiteSpace) {
    right_flanking = false;
  } else if (isLastPunctChar) {
    if (!(isNextWhiteSpace || isNextPunctChar)) {
      right_flanking = false;
    }
  }

  if (marker === 0x5F /* _ */) {
    // "_" inside a word can neither open nor close an emphasis
    can_open  = left_flanking  && (!right_flanking || isLastPunctChar);
    can_close = right_flanking && (!left_flanking  || isNextPunctChar);
  } else {
    can_open  = left_flanking;
    can_close = right_flanking;
  }

  return {
    can_open: can_open,
    can_close: can_close,
    delims: count
  };
}

module.exports = function emphasis(state, silent) {
  var startCount,
      count,
      found,
      oldCount,
      newCount,
      stack,
      res,
      token,
      max = state.posMax,
      start = state.pos,
      marker = state.src.charCodeAt(start);

  if (marker !== 0x5F/* _ */ && marker !== 0x2A /* * */) { return false; }
  if (silent) { return false; } // don't run any pairs in validation mode

  res = scanDelims(state, start);
  startCount = res.delims;
  if (!res.can_open) {
    state.pos += startCount;
    // Earlier we checked !silent, but this implementation does not need it
    state.pending += state.src.slice(start, state.pos);
    return true;
  }

  state.pos = start + startCount;
  stack = [ startCount ];

  while (state.pos < max) {
    if (state.src.charCodeAt(state.pos) === marker) {
      res = scanDelims(state, state.pos);
      count = res.delims;
      if (res.can_close) {
        oldCount = stack.pop();
        newCount = count;

        while (oldCount !== newCount) {
          if (newCount < oldCount) {
            stack.push(oldCount - newCount);
            break;
          }

          // assert(newCount > oldCount)
          newCount -= oldCount;

          if (stack.length === 0) { break; }
          state.pos += oldCount;
          oldCount = stack.pop();
        }

        if (stack.length === 0) {
          startCount = oldCount;
          found = true;
          break;
        }
        state.pos += count;
        continue;
      }

      if (res.can_open) { stack.push(count); }
      state.pos += count;
      continue;
    }

    state.md.inline.skipToken(state);
  }

  if (!found) {
    // parser failed to find ending tag, so it's not valid emphasis
    state.pos = start;
    return false;
  }

  // found!
  state.posMax = state.pos;
  state.pos = start + startCount;

  // Earlier we checked !silent, but this implementation does not need it

  // we have `startCount` starting and ending markers,
  // now trying to serialize them into tokens
  for (count = startCount; count > 1; count -= 2) {
    token        = state.push('strong_open', 'strong', 1);
    token.markup = String.fromCharCode(marker) + String.fromCharCode(marker);
  }
  if (count % 2) {
    token        = state.push('em_open', 'em', 1);
    token.markup = String.fromCharCode(marker);
  }

  state.md.inline.tokenize(state);

  if (count % 2) {
    token        = state.push('em_close', 'em', -1);
    token.markup = String.fromCharCode(marker);
  }
  for (count = startCount; count > 1; count -= 2) {
    token        = state.push('strong_close', 'strong', -1);
    token.markup = String.fromCharCode(marker) + String.fromCharCode(marker);
  }

  state.pos = state.posMax + startCount;
  state.posMax = max;
  return true;
};

},{"../common/utils":10}],46:[function(require,module,exports){
// Process html entity - &#123;, &#xAF;, &quot;, ...

'use strict';

var entities          = require('../common/entities');
var has               = require('../common/utils').has;
var isValidEntityCode = require('../common/utils').isValidEntityCode;
var fromCodePoint     = require('../common/utils').fromCodePoint;


var DIGITAL_RE = /^&#((?:x[a-f0-9]{1,8}|[0-9]{1,8}));/i;
var NAMED_RE   = /^&([a-z][a-z0-9]{1,31});/i;


module.exports = function entity(state, silent) {
  var ch, code, match, pos = state.pos, max = state.posMax;

  if (state.src.charCodeAt(pos) !== 0x26/* & */) { return false; }

  if (pos + 1 < max) {
    ch = state.src.charCodeAt(pos + 1);

    if (ch === 0x23 /* # */) {
      match = state.src.slice(pos).match(DIGITAL_RE);
      if (match) {
        if (!silent) {
          code = match[1][0].toLowerCase() === 'x' ? parseInt(match[1].slice(1), 16) : parseInt(match[1], 10);
          state.pending += isValidEntityCode(code) ? fromCodePoint(code) : fromCodePoint(0xFFFD);
        }
        state.pos += match[0].length;
        return true;
      }
    } else {
      match = state.src.slice(pos).match(NAMED_RE);
      if (match) {
        if (has(entities, match[1])) {
          if (!silent) { state.pending += entities[match[1]]; }
          state.pos += match[0].length;
          return true;
        }
      }
    }
  }

  if (!silent) { state.pending += '&'; }
  state.pos++;
  return true;
};

},{"../common/entities":6,"../common/utils":10}],47:[function(require,module,exports){
// Proceess escaped chars and hardbreaks

'use strict';

var ESCAPED = [];

for (var i = 0; i < 256; i++) { ESCAPED.push(0); }

'\\!"#$%&\'()*+,./:;<=>?@[]^_`{|}~-'
  .split('').forEach(function(ch) { ESCAPED[ch.charCodeAt(0)] = 1; });


module.exports = function escape(state, silent) {
  var ch, pos = state.pos, max = state.posMax;

  if (state.src.charCodeAt(pos) !== 0x5C/* \ */) { return false; }

  pos++;

  if (pos < max) {
    ch = state.src.charCodeAt(pos);

    if (ch < 256 && ESCAPED[ch] !== 0) {
      if (!silent) { state.pending += state.src[pos]; }
      state.pos += 2;
      return true;
    }

    if (ch === 0x0A) {
      if (!silent) {
        state.push('hardbreak', 'br', 0);
      }

      pos++;
      // skip leading whitespaces from next line
      while (pos < max && state.src.charCodeAt(pos) === 0x20) { pos++; }

      state.pos = pos;
      return true;
    }
  }

  if (!silent) { state.pending += '\\'; }
  state.pos++;
  return true;
};

},{}],48:[function(require,module,exports){
// Process html tags

'use strict';


var HTML_TAG_RE = require('../common/html_re').HTML_TAG_RE;


function isLetter(ch) {
  /*eslint no-bitwise:0*/
  var lc = ch | 0x20; // to lower case
  return (lc >= 0x61/* a */) && (lc <= 0x7a/* z */);
}


module.exports = function html_inline(state, silent) {
  var ch, match, max, token,
      pos = state.pos;

  if (!state.md.options.html) { return false; }

  // Check start
  max = state.posMax;
  if (state.src.charCodeAt(pos) !== 0x3C/* < */ ||
      pos + 2 >= max) {
    return false;
  }

  // Quick fail on second char
  ch = state.src.charCodeAt(pos + 1);
  if (ch !== 0x21/* ! */ &&
      ch !== 0x3F/* ? */ &&
      ch !== 0x2F/* / */ &&
      !isLetter(ch)) {
    return false;
  }

  match = state.src.slice(pos).match(HTML_TAG_RE);
  if (!match) { return false; }

  if (!silent) {
    token         = state.push('html_inline', '', 0);
    token.content = state.src.slice(pos, pos + match[0].length);
  }
  state.pos += match[0].length;
  return true;
};

},{"../common/html_re":8}],49:[function(require,module,exports){
// Process ![image](<src> "title")

'use strict';

var parseLinkLabel       = require('../helpers/parse_link_label');
var parseLinkDestination = require('../helpers/parse_link_destination');
var parseLinkTitle       = require('../helpers/parse_link_title');
var normalizeReference   = require('../common/utils').normalizeReference;


module.exports = function image(state, silent) {
  var attrs,
      code,
      label,
      labelEnd,
      labelStart,
      pos,
      ref,
      res,
      title,
      token,
      tokens,
      start,
      href = '',
      oldPos = state.pos,
      max = state.posMax;

  if (state.src.charCodeAt(state.pos) !== 0x21/* ! */) { return false; }
  if (state.src.charCodeAt(state.pos + 1) !== 0x5B/* [ */) { return false; }

  labelStart = state.pos + 2;
  labelEnd = parseLinkLabel(state, state.pos + 1, false);

  // parser failed to find ']', so it's not a valid link
  if (labelEnd < 0) { return false; }

  pos = labelEnd + 1;
  if (pos < max && state.src.charCodeAt(pos) === 0x28/* ( */) {
    //
    // Inline link
    //

    // [link](  <href>  "title"  )
    //        ^^ skipping these spaces
    pos++;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (code !== 0x20 && code !== 0x0A) { break; }
    }
    if (pos >= max) { return false; }

    // [link](  <href>  "title"  )
    //          ^^^^^^ parsing link destination
    start = pos;
    res = parseLinkDestination(state.src, pos, state.posMax);
    if (res.ok) {
      href = state.md.normalizeLink(res.str);
      if (state.md.validateLink(href)) {
        pos = res.pos;
      } else {
        href = '';
      }
    }

    // [link](  <href>  "title"  )
    //                ^^ skipping these spaces
    start = pos;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (code !== 0x20 && code !== 0x0A) { break; }
    }

    // [link](  <href>  "title"  )
    //                  ^^^^^^^ parsing link title
    res = parseLinkTitle(state.src, pos, state.posMax);
    if (pos < max && start !== pos && res.ok) {
      title = res.str;
      pos = res.pos;

      // [link](  <href>  "title"  )
      //                         ^^ skipping these spaces
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (code !== 0x20 && code !== 0x0A) { break; }
      }
    } else {
      title = '';
    }

    if (pos >= max || state.src.charCodeAt(pos) !== 0x29/* ) */) {
      state.pos = oldPos;
      return false;
    }
    pos++;
  } else {
    //
    // Link reference
    //
    if (typeof state.env.references === 'undefined') { return false; }

    // [foo]  [bar]
    //      ^^ optional whitespace (can include newlines)
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (code !== 0x20 && code !== 0x0A) { break; }
    }

    if (pos < max && state.src.charCodeAt(pos) === 0x5B/* [ */) {
      start = pos + 1;
      pos = parseLinkLabel(state, pos);
      if (pos >= 0) {
        label = state.src.slice(start, pos++);
      } else {
        pos = labelEnd + 1;
      }
    } else {
      pos = labelEnd + 1;
    }

    // covers label === '' and label === undefined
    // (collapsed reference link and shortcut reference link respectively)
    if (!label) { label = state.src.slice(labelStart, labelEnd); }

    ref = state.env.references[normalizeReference(label)];
    if (!ref) {
      state.pos = oldPos;
      return false;
    }
    href = ref.href;
    title = ref.title;
  }

  //
  // We found the end of the link, and know for a fact it's a valid link;
  // so all that's left to do is to call tokenizer.
  //
  if (!silent) {
    state.pos = labelStart;
    state.posMax = labelEnd;

    var newState = new state.md.inline.State(
      state.src.slice(labelStart, labelEnd),
      state.md,
      state.env,
      tokens = []
    );
    newState.md.inline.tokenize(newState);

    token          = state.push('image', 'img', 0);
    token.attrs    = attrs = [ [ 'src', href ], [ 'alt', '' ] ];
    token.children = tokens;
    if (title) {
      attrs.push([ 'title', title ]);
    }
  }

  state.pos = pos;
  state.posMax = max;
  return true;
};

},{"../common/utils":10,"../helpers/parse_link_destination":12,"../helpers/parse_link_label":13,"../helpers/parse_link_title":14}],50:[function(require,module,exports){
// Process [link](<to> "stuff")

'use strict';

var parseLinkLabel       = require('../helpers/parse_link_label');
var parseLinkDestination = require('../helpers/parse_link_destination');
var parseLinkTitle       = require('../helpers/parse_link_title');
var normalizeReference   = require('../common/utils').normalizeReference;


module.exports = function link(state, silent) {
  var attrs,
      code,
      label,
      labelEnd,
      labelStart,
      pos,
      res,
      ref,
      title,
      token,
      href = '',
      oldPos = state.pos,
      max = state.posMax,
      start = state.pos;

  if (state.src.charCodeAt(state.pos) !== 0x5B/* [ */) { return false; }

  labelStart = state.pos + 1;
  labelEnd = parseLinkLabel(state, state.pos, true);

  // parser failed to find ']', so it's not a valid link
  if (labelEnd < 0) { return false; }

  pos = labelEnd + 1;
  if (pos < max && state.src.charCodeAt(pos) === 0x28/* ( */) {
    //
    // Inline link
    //

    // [link](  <href>  "title"  )
    //        ^^ skipping these spaces
    pos++;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (code !== 0x20 && code !== 0x0A) { break; }
    }
    if (pos >= max) { return false; }

    // [link](  <href>  "title"  )
    //          ^^^^^^ parsing link destination
    start = pos;
    res = parseLinkDestination(state.src, pos, state.posMax);
    if (res.ok) {
      href = state.md.normalizeLink(res.str);
      if (state.md.validateLink(href)) {
        pos = res.pos;
      } else {
        href = '';
      }
    }

    // [link](  <href>  "title"  )
    //                ^^ skipping these spaces
    start = pos;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (code !== 0x20 && code !== 0x0A) { break; }
    }

    // [link](  <href>  "title"  )
    //                  ^^^^^^^ parsing link title
    res = parseLinkTitle(state.src, pos, state.posMax);
    if (pos < max && start !== pos && res.ok) {
      title = res.str;
      pos = res.pos;

      // [link](  <href>  "title"  )
      //                         ^^ skipping these spaces
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (code !== 0x20 && code !== 0x0A) { break; }
      }
    } else {
      title = '';
    }

    if (pos >= max || state.src.charCodeAt(pos) !== 0x29/* ) */) {
      state.pos = oldPos;
      return false;
    }
    pos++;
  } else {
    //
    // Link reference
    //
    if (typeof state.env.references === 'undefined') { return false; }

    // [foo]  [bar]
    //      ^^ optional whitespace (can include newlines)
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (code !== 0x20 && code !== 0x0A) { break; }
    }

    if (pos < max && state.src.charCodeAt(pos) === 0x5B/* [ */) {
      start = pos + 1;
      pos = parseLinkLabel(state, pos);
      if (pos >= 0) {
        label = state.src.slice(start, pos++);
      } else {
        pos = labelEnd + 1;
      }
    } else {
      pos = labelEnd + 1;
    }

    // covers label === '' and label === undefined
    // (collapsed reference link and shortcut reference link respectively)
    if (!label) { label = state.src.slice(labelStart, labelEnd); }

    ref = state.env.references[normalizeReference(label)];
    if (!ref) {
      state.pos = oldPos;
      return false;
    }
    href = ref.href;
    title = ref.title;
  }

  //
  // We found the end of the link, and know for a fact it's a valid link;
  // so all that's left to do is to call tokenizer.
  //
  if (!silent) {
    state.pos = labelStart;
    state.posMax = labelEnd;

    token        = state.push('link_open', 'a', 1);
    token.attrs  = attrs = [ [ 'href', href ] ];
    if (title) {
      attrs.push([ 'title', title ]);
    }

    state.md.inline.tokenize(state);

    token        = state.push('link_close', 'a', -1);
  }

  state.pos = pos;
  state.posMax = max;
  return true;
};

},{"../common/utils":10,"../helpers/parse_link_destination":12,"../helpers/parse_link_label":13,"../helpers/parse_link_title":14}],51:[function(require,module,exports){
// Proceess '\n'

'use strict';

module.exports = function newline(state, silent) {
  var pmax, max, pos = state.pos;

  if (state.src.charCodeAt(pos) !== 0x0A/* \n */) { return false; }

  pmax = state.pending.length - 1;
  max = state.posMax;

  // '  \n' -> hardbreak
  // Lookup in pending chars is bad practice! Don't copy to other rules!
  // Pending string is stored in concat mode, indexed lookups will cause
  // convertion to flat mode.
  if (!silent) {
    if (pmax >= 0 && state.pending.charCodeAt(pmax) === 0x20) {
      if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 0x20) {
        state.pending = state.pending.replace(/ +$/, '');
        state.push('hardbreak', 'br', 0);
      } else {
        state.pending = state.pending.slice(0, -1);
        state.push('softbreak', 'br', 0);
      }

    } else {
      state.push('softbreak', 'br', 0);
    }
  }

  pos++;

  // skip heading spaces for next line
  while (pos < max && state.src.charCodeAt(pos) === 0x20) { pos++; }

  state.pos = pos;
  return true;
};

},{}],52:[function(require,module,exports){
// Inline parser state

'use strict';


var Token = require('../token');

function StateInline(src, md, env, outTokens) {
  this.src = src;
  this.env = env;
  this.md = md;
  this.tokens = outTokens;

  this.pos = 0;
  this.posMax = this.src.length;
  this.level = 0;
  this.pending = '';
  this.pendingLevel = 0;

  this.cache = {};        // Stores { start: end } pairs. Useful for backtrack
                          // optimization of pairs parse (emphasis, strikes).
}


// Flush pending text
//
StateInline.prototype.pushPending = function () {
  var token = new Token('text', '', 0);
  token.content = this.pending;
  token.level = this.pendingLevel;
  this.tokens.push(token);
  this.pending = '';
  return token;
};


// Push new token to "stream".
// If pending text exists - flush it as text token
//
StateInline.prototype.push = function (type, tag, nesting) {
  if (this.pending) {
    this.pushPending();
  }

  var token = new Token(type, tag, nesting);

  if (nesting < 0) { this.level--; }
  token.level = this.level;
  if (nesting > 0) { this.level++; }

  this.pendingLevel = this.level;
  this.tokens.push(token);
  return token;
};

// re-export Token class to use in block rules
StateInline.prototype.Token = Token;


module.exports = StateInline;

},{"../token":55}],53:[function(require,module,exports){
// ~~strike through~~
//
'use strict';


var isWhiteSpace   = require('../common/utils').isWhiteSpace;
var isPunctChar    = require('../common/utils').isPunctChar;
var isMdAsciiPunct = require('../common/utils').isMdAsciiPunct;


// parse sequence of markers,
// "start" should point at a valid marker
function scanDelims(state, start) {
  var pos = start, lastChar, nextChar, count,
      isLastWhiteSpace, isLastPunctChar,
      isNextWhiteSpace, isNextPunctChar,
      can_open = true,
      can_close = true,
      max = state.posMax,
      marker = state.src.charCodeAt(start);

  // treat beginning of the line as a whitespace
  lastChar = start > 0 ? state.src.charCodeAt(start - 1) : 0x20;

  while (pos < max && state.src.charCodeAt(pos) === marker) { pos++; }

  if (pos >= max) {
    can_open = false;
  }

  count = pos - start;

  // treat end of the line as a whitespace
  nextChar = pos < max ? state.src.charCodeAt(pos) : 0x20;

  isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
  isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));

  isLastWhiteSpace = isWhiteSpace(lastChar);
  isNextWhiteSpace = isWhiteSpace(nextChar);

  if (isNextWhiteSpace) {
    can_open = false;
  } else if (isNextPunctChar) {
    if (!(isLastWhiteSpace || isLastPunctChar)) {
      can_open = false;
    }
  }

  if (isLastWhiteSpace) {
    can_close = false;
  } else if (isLastPunctChar) {
    if (!(isNextWhiteSpace || isNextPunctChar)) {
      can_close = false;
    }
  }

  return {
    can_open: can_open,
    can_close: can_close,
    delims: count
  };
}


module.exports = function strikethrough(state, silent) {
  var startCount,
      count,
      tagCount,
      found,
      stack,
      res,
      token,
      max = state.posMax,
      start = state.pos,
      marker = state.src.charCodeAt(start);

  if (marker !== 0x7E/* ~ */) { return false; }
  if (silent) { return false; } // don't run any pairs in validation mode

  res = scanDelims(state, start);
  startCount = res.delims;
  if (!res.can_open) {
    state.pos += startCount;
    // Earlier we checked !silent, but this implementation does not need it
    state.pending += state.src.slice(start, state.pos);
    return true;
  }

  stack = Math.floor(startCount / 2);
  if (stack <= 0) { return false; }
  state.pos = start + startCount;

  while (state.pos < max) {
    if (state.src.charCodeAt(state.pos) === marker) {
      res = scanDelims(state, state.pos);
      count = res.delims;
      tagCount = Math.floor(count / 2);
      if (res.can_close) {
        if (tagCount >= stack) {
          state.pos += count - 2;
          found = true;
          break;
        }
        stack -= tagCount;
        state.pos += count;
        continue;
      }

      if (res.can_open) { stack += tagCount; }
      state.pos += count;
      continue;
    }

    state.md.inline.skipToken(state);
  }

  if (!found) {
    // parser failed to find ending tag, so it's not valid emphasis
    state.pos = start;
    return false;
  }

  // found!
  state.posMax = state.pos;
  state.pos = start + 2;

  // Earlier we checked !silent, but this implementation does not need it
  token        = state.push('s_open', 's', 1);
  token.markup = '~~';

  state.md.inline.tokenize(state);

  token        = state.push('s_close', 's', -1);
  token.markup = '~~';

  state.pos = state.posMax + 2;
  state.posMax = max;
  return true;
};

},{"../common/utils":10}],54:[function(require,module,exports){
// Skip text characters for text token, place those to pending buffer
// and increment current pos

'use strict';


// Rule to skip pure text
// '{}$%@~+=:' reserved for extentions

// !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, [, \, ], ^, _, `, {, |, }, or ~

// !!!! Don't confuse with "Markdown ASCII Punctuation" chars
// http://spec.commonmark.org/0.15/#ascii-punctuation-character
function isTerminatorChar(ch) {
  switch (ch) {
    case 0x0A/* \n */:
    case 0x21/* ! */:
    case 0x23/* # */:
    case 0x24/* $ */:
    case 0x25/* % */:
    case 0x26/* & */:
    case 0x2A/* * */:
    case 0x2B/* + */:
    case 0x2D/* - */:
    case 0x3A/* : */:
    case 0x3C/* < */:
    case 0x3D/* = */:
    case 0x3E/* > */:
    case 0x40/* @ */:
    case 0x5B/* [ */:
    case 0x5C/* \ */:
    case 0x5D/* ] */:
    case 0x5E/* ^ */:
    case 0x5F/* _ */:
    case 0x60/* ` */:
    case 0x7B/* { */:
    case 0x7D/* } */:
    case 0x7E/* ~ */:
      return true;
    default:
      return false;
  }
}

module.exports = function text(state, silent) {
  var pos = state.pos;

  while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) {
    pos++;
  }

  if (pos === state.pos) { return false; }

  if (!silent) { state.pending += state.src.slice(state.pos, pos); }

  state.pos = pos;

  return true;
};

// Alternative implementation, for memory.
//
// It costs 10% of performance, but allows extend terminators list, if place it
// to `ParcerInline` property. Probably, will switch to it sometime, such
// flexibility required.

/*
var TERMINATOR_RE = /[\n!#$%&*+\-:<=>@[\\\]^_`{}~]/;

module.exports = function text(state, silent) {
  var pos = state.pos,
      idx = state.src.slice(pos).search(TERMINATOR_RE);

  // first char is terminator -> empty text
  if (idx === 0) { return false; }

  // no terminator -> text till end of string
  if (idx < 0) {
    if (!silent) { state.pending += state.src.slice(pos); }
    state.pos = state.src.length;
    return true;
  }

  if (!silent) { state.pending += state.src.slice(pos, pos + idx); }

  state.pos += idx;

  return true;
};*/

},{}],55:[function(require,module,exports){
// Token class

'use strict';


/**
 * class Token
 **/

/**
 * new Token(type, tag, nesting)
 *
 * Create new token and fill passed properties.
 **/
function Token(type, tag, nesting) {
  /**
   * Token#type -> String
   *
   * Type of the token (string, e.g. "paragraph_open")
   **/
  this.type     = type;

  /**
   * Token#tag -> String
   *
   * html tag name, e.g. "p"
   **/
  this.tag      = tag;

  /**
   * Token#attrs -> Array
   *
   * Html attributes. Format: `[ [ name1, value1 ], [ name2, value2 ] ]`
   **/
  this.attrs    = null;

  /**
   * Token#map -> Array
   *
   * Source map info. Format: `[ line_begin, line_end ]`
   **/
  this.map      = null;

  /**
   * Token#nesting -> Number
   *
   * Level change (number in {-1, 0, 1} set), where:
   *
   * -  `1` means the tag is opening
   * -  `0` means the tag is self-closing
   * - `-1` means the tag is closing
   **/
  this.nesting  = nesting;

  /**
   * Token#level -> Number
   *
   * nesting level, the same as `state.level`
   **/
  this.level    = 0;

  /**
   * Token#children -> Array
   *
   * An array of child nodes (inline and img tokens)
   **/
  this.children = null;

  /**
   * Token#content -> String
   *
   * In a case of self-closing tag (code, html, fence, etc.),
   * it has contents of this tag.
   **/
  this.content  = '';

  /**
   * Token#markup -> String
   *
   * '*' or '_' for emphasis, fence string for fence, etc.
   **/
  this.markup   = '';

  /**
   * Token#info -> String
   *
   * fence infostring
   **/
  this.info     = '';

  /**
   * Token#meta -> Object
   *
   * A place for plugins to store an arbitrary data
   **/
  this.meta     = null;

  /**
   * Token#block -> Boolean
   *
   * True for block-level tokens, false for inline tokens.
   * Used in renderer to calculate line breaks
   **/
  this.block    = false;

  /**
   * Token#hidden -> Boolean
   *
   * If it's true, ignore this element when rendering. Used for tight lists
   * to hide paragraphs.
   **/
  this.hidden   = false;
}


/**
 * Token.attrIndex(name) -> Number
 *
 * Search attribute index by name.
 **/
Token.prototype.attrIndex = function attrIndex(name) {
  var attrs, i, len;

  if (!this.attrs) { return -1; }

  attrs = this.attrs;

  for (i = 0, len = attrs.length; i < len; i++) {
    if (attrs[i][0] === name) { return i; }
  }
  return -1;
};


/**
 * Token.attrPush(attrData)
 *
 * Add `[ name, value ]` attribute to list. Init attrs if necessary
 **/
Token.prototype.attrPush = function attrPush(attrData) {
  if (this.attrs) {
    this.attrs.push(attrData);
  } else {
    this.attrs = [ attrData ];
  }
};


module.exports = Token;

},{}],56:[function(require,module,exports){
module.exports={"Aacute":"\u00C1","aacute":"\u00E1","Abreve":"\u0102","abreve":"\u0103","ac":"\u223E","acd":"\u223F","acE":"\u223E\u0333","Acirc":"\u00C2","acirc":"\u00E2","acute":"\u00B4","Acy":"\u0410","acy":"\u0430","AElig":"\u00C6","aelig":"\u00E6","af":"\u2061","Afr":"\uD835\uDD04","afr":"\uD835\uDD1E","Agrave":"\u00C0","agrave":"\u00E0","alefsym":"\u2135","aleph":"\u2135","Alpha":"\u0391","alpha":"\u03B1","Amacr":"\u0100","amacr":"\u0101","amalg":"\u2A3F","amp":"&","AMP":"&","andand":"\u2A55","And":"\u2A53","and":"\u2227","andd":"\u2A5C","andslope":"\u2A58","andv":"\u2A5A","ang":"\u2220","ange":"\u29A4","angle":"\u2220","angmsdaa":"\u29A8","angmsdab":"\u29A9","angmsdac":"\u29AA","angmsdad":"\u29AB","angmsdae":"\u29AC","angmsdaf":"\u29AD","angmsdag":"\u29AE","angmsdah":"\u29AF","angmsd":"\u2221","angrt":"\u221F","angrtvb":"\u22BE","angrtvbd":"\u299D","angsph":"\u2222","angst":"\u00C5","angzarr":"\u237C","Aogon":"\u0104","aogon":"\u0105","Aopf":"\uD835\uDD38","aopf":"\uD835\uDD52","apacir":"\u2A6F","ap":"\u2248","apE":"\u2A70","ape":"\u224A","apid":"\u224B","apos":"'","ApplyFunction":"\u2061","approx":"\u2248","approxeq":"\u224A","Aring":"\u00C5","aring":"\u00E5","Ascr":"\uD835\uDC9C","ascr":"\uD835\uDCB6","Assign":"\u2254","ast":"*","asymp":"\u2248","asympeq":"\u224D","Atilde":"\u00C3","atilde":"\u00E3","Auml":"\u00C4","auml":"\u00E4","awconint":"\u2233","awint":"\u2A11","backcong":"\u224C","backepsilon":"\u03F6","backprime":"\u2035","backsim":"\u223D","backsimeq":"\u22CD","Backslash":"\u2216","Barv":"\u2AE7","barvee":"\u22BD","barwed":"\u2305","Barwed":"\u2306","barwedge":"\u2305","bbrk":"\u23B5","bbrktbrk":"\u23B6","bcong":"\u224C","Bcy":"\u0411","bcy":"\u0431","bdquo":"\u201E","becaus":"\u2235","because":"\u2235","Because":"\u2235","bemptyv":"\u29B0","bepsi":"\u03F6","bernou":"\u212C","Bernoullis":"\u212C","Beta":"\u0392","beta":"\u03B2","beth":"\u2136","between":"\u226C","Bfr":"\uD835\uDD05","bfr":"\uD835\uDD1F","bigcap":"\u22C2","bigcirc":"\u25EF","bigcup":"\u22C3","bigodot":"\u2A00","bigoplus":"\u2A01","bigotimes":"\u2A02","bigsqcup":"\u2A06","bigstar":"\u2605","bigtriangledown":"\u25BD","bigtriangleup":"\u25B3","biguplus":"\u2A04","bigvee":"\u22C1","bigwedge":"\u22C0","bkarow":"\u290D","blacklozenge":"\u29EB","blacksquare":"\u25AA","blacktriangle":"\u25B4","blacktriangledown":"\u25BE","blacktriangleleft":"\u25C2","blacktriangleright":"\u25B8","blank":"\u2423","blk12":"\u2592","blk14":"\u2591","blk34":"\u2593","block":"\u2588","bne":"=\u20E5","bnequiv":"\u2261\u20E5","bNot":"\u2AED","bnot":"\u2310","Bopf":"\uD835\uDD39","bopf":"\uD835\uDD53","bot":"\u22A5","bottom":"\u22A5","bowtie":"\u22C8","boxbox":"\u29C9","boxdl":"\u2510","boxdL":"\u2555","boxDl":"\u2556","boxDL":"\u2557","boxdr":"\u250C","boxdR":"\u2552","boxDr":"\u2553","boxDR":"\u2554","boxh":"\u2500","boxH":"\u2550","boxhd":"\u252C","boxHd":"\u2564","boxhD":"\u2565","boxHD":"\u2566","boxhu":"\u2534","boxHu":"\u2567","boxhU":"\u2568","boxHU":"\u2569","boxminus":"\u229F","boxplus":"\u229E","boxtimes":"\u22A0","boxul":"\u2518","boxuL":"\u255B","boxUl":"\u255C","boxUL":"\u255D","boxur":"\u2514","boxuR":"\u2558","boxUr":"\u2559","boxUR":"\u255A","boxv":"\u2502","boxV":"\u2551","boxvh":"\u253C","boxvH":"\u256A","boxVh":"\u256B","boxVH":"\u256C","boxvl":"\u2524","boxvL":"\u2561","boxVl":"\u2562","boxVL":"\u2563","boxvr":"\u251C","boxvR":"\u255E","boxVr":"\u255F","boxVR":"\u2560","bprime":"\u2035","breve":"\u02D8","Breve":"\u02D8","brvbar":"\u00A6","bscr":"\uD835\uDCB7","Bscr":"\u212C","bsemi":"\u204F","bsim":"\u223D","bsime":"\u22CD","bsolb":"\u29C5","bsol":"\\","bsolhsub":"\u27C8","bull":"\u2022","bullet":"\u2022","bump":"\u224E","bumpE":"\u2AAE","bumpe":"\u224F","Bumpeq":"\u224E","bumpeq":"\u224F","Cacute":"\u0106","cacute":"\u0107","capand":"\u2A44","capbrcup":"\u2A49","capcap":"\u2A4B","cap":"\u2229","Cap":"\u22D2","capcup":"\u2A47","capdot":"\u2A40","CapitalDifferentialD":"\u2145","caps":"\u2229\uFE00","caret":"\u2041","caron":"\u02C7","Cayleys":"\u212D","ccaps":"\u2A4D","Ccaron":"\u010C","ccaron":"\u010D","Ccedil":"\u00C7","ccedil":"\u00E7","Ccirc":"\u0108","ccirc":"\u0109","Cconint":"\u2230","ccups":"\u2A4C","ccupssm":"\u2A50","Cdot":"\u010A","cdot":"\u010B","cedil":"\u00B8","Cedilla":"\u00B8","cemptyv":"\u29B2","cent":"\u00A2","centerdot":"\u00B7","CenterDot":"\u00B7","cfr":"\uD835\uDD20","Cfr":"\u212D","CHcy":"\u0427","chcy":"\u0447","check":"\u2713","checkmark":"\u2713","Chi":"\u03A7","chi":"\u03C7","circ":"\u02C6","circeq":"\u2257","circlearrowleft":"\u21BA","circlearrowright":"\u21BB","circledast":"\u229B","circledcirc":"\u229A","circleddash":"\u229D","CircleDot":"\u2299","circledR":"\u00AE","circledS":"\u24C8","CircleMinus":"\u2296","CirclePlus":"\u2295","CircleTimes":"\u2297","cir":"\u25CB","cirE":"\u29C3","cire":"\u2257","cirfnint":"\u2A10","cirmid":"\u2AEF","cirscir":"\u29C2","ClockwiseContourIntegral":"\u2232","CloseCurlyDoubleQuote":"\u201D","CloseCurlyQuote":"\u2019","clubs":"\u2663","clubsuit":"\u2663","colon":":","Colon":"\u2237","Colone":"\u2A74","colone":"\u2254","coloneq":"\u2254","comma":",","commat":"@","comp":"\u2201","compfn":"\u2218","complement":"\u2201","complexes":"\u2102","cong":"\u2245","congdot":"\u2A6D","Congruent":"\u2261","conint":"\u222E","Conint":"\u222F","ContourIntegral":"\u222E","copf":"\uD835\uDD54","Copf":"\u2102","coprod":"\u2210","Coproduct":"\u2210","copy":"\u00A9","COPY":"\u00A9","copysr":"\u2117","CounterClockwiseContourIntegral":"\u2233","crarr":"\u21B5","cross":"\u2717","Cross":"\u2A2F","Cscr":"\uD835\uDC9E","cscr":"\uD835\uDCB8","csub":"\u2ACF","csube":"\u2AD1","csup":"\u2AD0","csupe":"\u2AD2","ctdot":"\u22EF","cudarrl":"\u2938","cudarrr":"\u2935","cuepr":"\u22DE","cuesc":"\u22DF","cularr":"\u21B6","cularrp":"\u293D","cupbrcap":"\u2A48","cupcap":"\u2A46","CupCap":"\u224D","cup":"\u222A","Cup":"\u22D3","cupcup":"\u2A4A","cupdot":"\u228D","cupor":"\u2A45","cups":"\u222A\uFE00","curarr":"\u21B7","curarrm":"\u293C","curlyeqprec":"\u22DE","curlyeqsucc":"\u22DF","curlyvee":"\u22CE","curlywedge":"\u22CF","curren":"\u00A4","curvearrowleft":"\u21B6","curvearrowright":"\u21B7","cuvee":"\u22CE","cuwed":"\u22CF","cwconint":"\u2232","cwint":"\u2231","cylcty":"\u232D","dagger":"\u2020","Dagger":"\u2021","daleth":"\u2138","darr":"\u2193","Darr":"\u21A1","dArr":"\u21D3","dash":"\u2010","Dashv":"\u2AE4","dashv":"\u22A3","dbkarow":"\u290F","dblac":"\u02DD","Dcaron":"\u010E","dcaron":"\u010F","Dcy":"\u0414","dcy":"\u0434","ddagger":"\u2021","ddarr":"\u21CA","DD":"\u2145","dd":"\u2146","DDotrahd":"\u2911","ddotseq":"\u2A77","deg":"\u00B0","Del":"\u2207","Delta":"\u0394","delta":"\u03B4","demptyv":"\u29B1","dfisht":"\u297F","Dfr":"\uD835\uDD07","dfr":"\uD835\uDD21","dHar":"\u2965","dharl":"\u21C3","dharr":"\u21C2","DiacriticalAcute":"\u00B4","DiacriticalDot":"\u02D9","DiacriticalDoubleAcute":"\u02DD","DiacriticalGrave":"`","DiacriticalTilde":"\u02DC","diam":"\u22C4","diamond":"\u22C4","Diamond":"\u22C4","diamondsuit":"\u2666","diams":"\u2666","die":"\u00A8","DifferentialD":"\u2146","digamma":"\u03DD","disin":"\u22F2","div":"\u00F7","divide":"\u00F7","divideontimes":"\u22C7","divonx":"\u22C7","DJcy":"\u0402","djcy":"\u0452","dlcorn":"\u231E","dlcrop":"\u230D","dollar":"$","Dopf":"\uD835\uDD3B","dopf":"\uD835\uDD55","Dot":"\u00A8","dot":"\u02D9","DotDot":"\u20DC","doteq":"\u2250","doteqdot":"\u2251","DotEqual":"\u2250","dotminus":"\u2238","dotplus":"\u2214","dotsquare":"\u22A1","doublebarwedge":"\u2306","DoubleContourIntegral":"\u222F","DoubleDot":"\u00A8","DoubleDownArrow":"\u21D3","DoubleLeftArrow":"\u21D0","DoubleLeftRightArrow":"\u21D4","DoubleLeftTee":"\u2AE4","DoubleLongLeftArrow":"\u27F8","DoubleLongLeftRightArrow":"\u27FA","DoubleLongRightArrow":"\u27F9","DoubleRightArrow":"\u21D2","DoubleRightTee":"\u22A8","DoubleUpArrow":"\u21D1","DoubleUpDownArrow":"\u21D5","DoubleVerticalBar":"\u2225","DownArrowBar":"\u2913","downarrow":"\u2193","DownArrow":"\u2193","Downarrow":"\u21D3","DownArrowUpArrow":"\u21F5","DownBreve":"\u0311","downdownarrows":"\u21CA","downharpoonleft":"\u21C3","downharpoonright":"\u21C2","DownLeftRightVector":"\u2950","DownLeftTeeVector":"\u295E","DownLeftVectorBar":"\u2956","DownLeftVector":"\u21BD","DownRightTeeVector":"\u295F","DownRightVectorBar":"\u2957","DownRightVector":"\u21C1","DownTeeArrow":"\u21A7","DownTee":"\u22A4","drbkarow":"\u2910","drcorn":"\u231F","drcrop":"\u230C","Dscr":"\uD835\uDC9F","dscr":"\uD835\uDCB9","DScy":"\u0405","dscy":"\u0455","dsol":"\u29F6","Dstrok":"\u0110","dstrok":"\u0111","dtdot":"\u22F1","dtri":"\u25BF","dtrif":"\u25BE","duarr":"\u21F5","duhar":"\u296F","dwangle":"\u29A6","DZcy":"\u040F","dzcy":"\u045F","dzigrarr":"\u27FF","Eacute":"\u00C9","eacute":"\u00E9","easter":"\u2A6E","Ecaron":"\u011A","ecaron":"\u011B","Ecirc":"\u00CA","ecirc":"\u00EA","ecir":"\u2256","ecolon":"\u2255","Ecy":"\u042D","ecy":"\u044D","eDDot":"\u2A77","Edot":"\u0116","edot":"\u0117","eDot":"\u2251","ee":"\u2147","efDot":"\u2252","Efr":"\uD835\uDD08","efr":"\uD835\uDD22","eg":"\u2A9A","Egrave":"\u00C8","egrave":"\u00E8","egs":"\u2A96","egsdot":"\u2A98","el":"\u2A99","Element":"\u2208","elinters":"\u23E7","ell":"\u2113","els":"\u2A95","elsdot":"\u2A97","Emacr":"\u0112","emacr":"\u0113","empty":"\u2205","emptyset":"\u2205","EmptySmallSquare":"\u25FB","emptyv":"\u2205","EmptyVerySmallSquare":"\u25AB","emsp13":"\u2004","emsp14":"\u2005","emsp":"\u2003","ENG":"\u014A","eng":"\u014B","ensp":"\u2002","Eogon":"\u0118","eogon":"\u0119","Eopf":"\uD835\uDD3C","eopf":"\uD835\uDD56","epar":"\u22D5","eparsl":"\u29E3","eplus":"\u2A71","epsi":"\u03B5","Epsilon":"\u0395","epsilon":"\u03B5","epsiv":"\u03F5","eqcirc":"\u2256","eqcolon":"\u2255","eqsim":"\u2242","eqslantgtr":"\u2A96","eqslantless":"\u2A95","Equal":"\u2A75","equals":"=","EqualTilde":"\u2242","equest":"\u225F","Equilibrium":"\u21CC","equiv":"\u2261","equivDD":"\u2A78","eqvparsl":"\u29E5","erarr":"\u2971","erDot":"\u2253","escr":"\u212F","Escr":"\u2130","esdot":"\u2250","Esim":"\u2A73","esim":"\u2242","Eta":"\u0397","eta":"\u03B7","ETH":"\u00D0","eth":"\u00F0","Euml":"\u00CB","euml":"\u00EB","euro":"\u20AC","excl":"!","exist":"\u2203","Exists":"\u2203","expectation":"\u2130","exponentiale":"\u2147","ExponentialE":"\u2147","fallingdotseq":"\u2252","Fcy":"\u0424","fcy":"\u0444","female":"\u2640","ffilig":"\uFB03","fflig":"\uFB00","ffllig":"\uFB04","Ffr":"\uD835\uDD09","ffr":"\uD835\uDD23","filig":"\uFB01","FilledSmallSquare":"\u25FC","FilledVerySmallSquare":"\u25AA","fjlig":"fj","flat":"\u266D","fllig":"\uFB02","fltns":"\u25B1","fnof":"\u0192","Fopf":"\uD835\uDD3D","fopf":"\uD835\uDD57","forall":"\u2200","ForAll":"\u2200","fork":"\u22D4","forkv":"\u2AD9","Fouriertrf":"\u2131","fpartint":"\u2A0D","frac12":"\u00BD","frac13":"\u2153","frac14":"\u00BC","frac15":"\u2155","frac16":"\u2159","frac18":"\u215B","frac23":"\u2154","frac25":"\u2156","frac34":"\u00BE","frac35":"\u2157","frac38":"\u215C","frac45":"\u2158","frac56":"\u215A","frac58":"\u215D","frac78":"\u215E","frasl":"\u2044","frown":"\u2322","fscr":"\uD835\uDCBB","Fscr":"\u2131","gacute":"\u01F5","Gamma":"\u0393","gamma":"\u03B3","Gammad":"\u03DC","gammad":"\u03DD","gap":"\u2A86","Gbreve":"\u011E","gbreve":"\u011F","Gcedil":"\u0122","Gcirc":"\u011C","gcirc":"\u011D","Gcy":"\u0413","gcy":"\u0433","Gdot":"\u0120","gdot":"\u0121","ge":"\u2265","gE":"\u2267","gEl":"\u2A8C","gel":"\u22DB","geq":"\u2265","geqq":"\u2267","geqslant":"\u2A7E","gescc":"\u2AA9","ges":"\u2A7E","gesdot":"\u2A80","gesdoto":"\u2A82","gesdotol":"\u2A84","gesl":"\u22DB\uFE00","gesles":"\u2A94","Gfr":"\uD835\uDD0A","gfr":"\uD835\uDD24","gg":"\u226B","Gg":"\u22D9","ggg":"\u22D9","gimel":"\u2137","GJcy":"\u0403","gjcy":"\u0453","gla":"\u2AA5","gl":"\u2277","glE":"\u2A92","glj":"\u2AA4","gnap":"\u2A8A","gnapprox":"\u2A8A","gne":"\u2A88","gnE":"\u2269","gneq":"\u2A88","gneqq":"\u2269","gnsim":"\u22E7","Gopf":"\uD835\uDD3E","gopf":"\uD835\uDD58","grave":"`","GreaterEqual":"\u2265","GreaterEqualLess":"\u22DB","GreaterFullEqual":"\u2267","GreaterGreater":"\u2AA2","GreaterLess":"\u2277","GreaterSlantEqual":"\u2A7E","GreaterTilde":"\u2273","Gscr":"\uD835\uDCA2","gscr":"\u210A","gsim":"\u2273","gsime":"\u2A8E","gsiml":"\u2A90","gtcc":"\u2AA7","gtcir":"\u2A7A","gt":">","GT":">","Gt":"\u226B","gtdot":"\u22D7","gtlPar":"\u2995","gtquest":"\u2A7C","gtrapprox":"\u2A86","gtrarr":"\u2978","gtrdot":"\u22D7","gtreqless":"\u22DB","gtreqqless":"\u2A8C","gtrless":"\u2277","gtrsim":"\u2273","gvertneqq":"\u2269\uFE00","gvnE":"\u2269\uFE00","Hacek":"\u02C7","hairsp":"\u200A","half":"\u00BD","hamilt":"\u210B","HARDcy":"\u042A","hardcy":"\u044A","harrcir":"\u2948","harr":"\u2194","hArr":"\u21D4","harrw":"\u21AD","Hat":"^","hbar":"\u210F","Hcirc":"\u0124","hcirc":"\u0125","hearts":"\u2665","heartsuit":"\u2665","hellip":"\u2026","hercon":"\u22B9","hfr":"\uD835\uDD25","Hfr":"\u210C","HilbertSpace":"\u210B","hksearow":"\u2925","hkswarow":"\u2926","hoarr":"\u21FF","homtht":"\u223B","hookleftarrow":"\u21A9","hookrightarrow":"\u21AA","hopf":"\uD835\uDD59","Hopf":"\u210D","horbar":"\u2015","HorizontalLine":"\u2500","hscr":"\uD835\uDCBD","Hscr":"\u210B","hslash":"\u210F","Hstrok":"\u0126","hstrok":"\u0127","HumpDownHump":"\u224E","HumpEqual":"\u224F","hybull":"\u2043","hyphen":"\u2010","Iacute":"\u00CD","iacute":"\u00ED","ic":"\u2063","Icirc":"\u00CE","icirc":"\u00EE","Icy":"\u0418","icy":"\u0438","Idot":"\u0130","IEcy":"\u0415","iecy":"\u0435","iexcl":"\u00A1","iff":"\u21D4","ifr":"\uD835\uDD26","Ifr":"\u2111","Igrave":"\u00CC","igrave":"\u00EC","ii":"\u2148","iiiint":"\u2A0C","iiint":"\u222D","iinfin":"\u29DC","iiota":"\u2129","IJlig":"\u0132","ijlig":"\u0133","Imacr":"\u012A","imacr":"\u012B","image":"\u2111","ImaginaryI":"\u2148","imagline":"\u2110","imagpart":"\u2111","imath":"\u0131","Im":"\u2111","imof":"\u22B7","imped":"\u01B5","Implies":"\u21D2","incare":"\u2105","in":"\u2208","infin":"\u221E","infintie":"\u29DD","inodot":"\u0131","intcal":"\u22BA","int":"\u222B","Int":"\u222C","integers":"\u2124","Integral":"\u222B","intercal":"\u22BA","Intersection":"\u22C2","intlarhk":"\u2A17","intprod":"\u2A3C","InvisibleComma":"\u2063","InvisibleTimes":"\u2062","IOcy":"\u0401","iocy":"\u0451","Iogon":"\u012E","iogon":"\u012F","Iopf":"\uD835\uDD40","iopf":"\uD835\uDD5A","Iota":"\u0399","iota":"\u03B9","iprod":"\u2A3C","iquest":"\u00BF","iscr":"\uD835\uDCBE","Iscr":"\u2110","isin":"\u2208","isindot":"\u22F5","isinE":"\u22F9","isins":"\u22F4","isinsv":"\u22F3","isinv":"\u2208","it":"\u2062","Itilde":"\u0128","itilde":"\u0129","Iukcy":"\u0406","iukcy":"\u0456","Iuml":"\u00CF","iuml":"\u00EF","Jcirc":"\u0134","jcirc":"\u0135","Jcy":"\u0419","jcy":"\u0439","Jfr":"\uD835\uDD0D","jfr":"\uD835\uDD27","jmath":"\u0237","Jopf":"\uD835\uDD41","jopf":"\uD835\uDD5B","Jscr":"\uD835\uDCA5","jscr":"\uD835\uDCBF","Jsercy":"\u0408","jsercy":"\u0458","Jukcy":"\u0404","jukcy":"\u0454","Kappa":"\u039A","kappa":"\u03BA","kappav":"\u03F0","Kcedil":"\u0136","kcedil":"\u0137","Kcy":"\u041A","kcy":"\u043A","Kfr":"\uD835\uDD0E","kfr":"\uD835\uDD28","kgreen":"\u0138","KHcy":"\u0425","khcy":"\u0445","KJcy":"\u040C","kjcy":"\u045C","Kopf":"\uD835\uDD42","kopf":"\uD835\uDD5C","Kscr":"\uD835\uDCA6","kscr":"\uD835\uDCC0","lAarr":"\u21DA","Lacute":"\u0139","lacute":"\u013A","laemptyv":"\u29B4","lagran":"\u2112","Lambda":"\u039B","lambda":"\u03BB","lang":"\u27E8","Lang":"\u27EA","langd":"\u2991","langle":"\u27E8","lap":"\u2A85","Laplacetrf":"\u2112","laquo":"\u00AB","larrb":"\u21E4","larrbfs":"\u291F","larr":"\u2190","Larr":"\u219E","lArr":"\u21D0","larrfs":"\u291D","larrhk":"\u21A9","larrlp":"\u21AB","larrpl":"\u2939","larrsim":"\u2973","larrtl":"\u21A2","latail":"\u2919","lAtail":"\u291B","lat":"\u2AAB","late":"\u2AAD","lates":"\u2AAD\uFE00","lbarr":"\u290C","lBarr":"\u290E","lbbrk":"\u2772","lbrace":"{","lbrack":"[","lbrke":"\u298B","lbrksld":"\u298F","lbrkslu":"\u298D","Lcaron":"\u013D","lcaron":"\u013E","Lcedil":"\u013B","lcedil":"\u013C","lceil":"\u2308","lcub":"{","Lcy":"\u041B","lcy":"\u043B","ldca":"\u2936","ldquo":"\u201C","ldquor":"\u201E","ldrdhar":"\u2967","ldrushar":"\u294B","ldsh":"\u21B2","le":"\u2264","lE":"\u2266","LeftAngleBracket":"\u27E8","LeftArrowBar":"\u21E4","leftarrow":"\u2190","LeftArrow":"\u2190","Leftarrow":"\u21D0","LeftArrowRightArrow":"\u21C6","leftarrowtail":"\u21A2","LeftCeiling":"\u2308","LeftDoubleBracket":"\u27E6","LeftDownTeeVector":"\u2961","LeftDownVectorBar":"\u2959","LeftDownVector":"\u21C3","LeftFloor":"\u230A","leftharpoondown":"\u21BD","leftharpoonup":"\u21BC","leftleftarrows":"\u21C7","leftrightarrow":"\u2194","LeftRightArrow":"\u2194","Leftrightarrow":"\u21D4","leftrightarrows":"\u21C6","leftrightharpoons":"\u21CB","leftrightsquigarrow":"\u21AD","LeftRightVector":"\u294E","LeftTeeArrow":"\u21A4","LeftTee":"\u22A3","LeftTeeVector":"\u295A","leftthreetimes":"\u22CB","LeftTriangleBar":"\u29CF","LeftTriangle":"\u22B2","LeftTriangleEqual":"\u22B4","LeftUpDownVector":"\u2951","LeftUpTeeVector":"\u2960","LeftUpVectorBar":"\u2958","LeftUpVector":"\u21BF","LeftVectorBar":"\u2952","LeftVector":"\u21BC","lEg":"\u2A8B","leg":"\u22DA","leq":"\u2264","leqq":"\u2266","leqslant":"\u2A7D","lescc":"\u2AA8","les":"\u2A7D","lesdot":"\u2A7F","lesdoto":"\u2A81","lesdotor":"\u2A83","lesg":"\u22DA\uFE00","lesges":"\u2A93","lessapprox":"\u2A85","lessdot":"\u22D6","lesseqgtr":"\u22DA","lesseqqgtr":"\u2A8B","LessEqualGreater":"\u22DA","LessFullEqual":"\u2266","LessGreater":"\u2276","lessgtr":"\u2276","LessLess":"\u2AA1","lesssim":"\u2272","LessSlantEqual":"\u2A7D","LessTilde":"\u2272","lfisht":"\u297C","lfloor":"\u230A","Lfr":"\uD835\uDD0F","lfr":"\uD835\uDD29","lg":"\u2276","lgE":"\u2A91","lHar":"\u2962","lhard":"\u21BD","lharu":"\u21BC","lharul":"\u296A","lhblk":"\u2584","LJcy":"\u0409","ljcy":"\u0459","llarr":"\u21C7","ll":"\u226A","Ll":"\u22D8","llcorner":"\u231E","Lleftarrow":"\u21DA","llhard":"\u296B","lltri":"\u25FA","Lmidot":"\u013F","lmidot":"\u0140","lmoustache":"\u23B0","lmoust":"\u23B0","lnap":"\u2A89","lnapprox":"\u2A89","lne":"\u2A87","lnE":"\u2268","lneq":"\u2A87","lneqq":"\u2268","lnsim":"\u22E6","loang":"\u27EC","loarr":"\u21FD","lobrk":"\u27E6","longleftarrow":"\u27F5","LongLeftArrow":"\u27F5","Longleftarrow":"\u27F8","longleftrightarrow":"\u27F7","LongLeftRightArrow":"\u27F7","Longleftrightarrow":"\u27FA","longmapsto":"\u27FC","longrightarrow":"\u27F6","LongRightArrow":"\u27F6","Longrightarrow":"\u27F9","looparrowleft":"\u21AB","looparrowright":"\u21AC","lopar":"\u2985","Lopf":"\uD835\uDD43","lopf":"\uD835\uDD5D","loplus":"\u2A2D","lotimes":"\u2A34","lowast":"\u2217","lowbar":"_","LowerLeftArrow":"\u2199","LowerRightArrow":"\u2198","loz":"\u25CA","lozenge":"\u25CA","lozf":"\u29EB","lpar":"(","lparlt":"\u2993","lrarr":"\u21C6","lrcorner":"\u231F","lrhar":"\u21CB","lrhard":"\u296D","lrm":"\u200E","lrtri":"\u22BF","lsaquo":"\u2039","lscr":"\uD835\uDCC1","Lscr":"\u2112","lsh":"\u21B0","Lsh":"\u21B0","lsim":"\u2272","lsime":"\u2A8D","lsimg":"\u2A8F","lsqb":"[","lsquo":"\u2018","lsquor":"\u201A","Lstrok":"\u0141","lstrok":"\u0142","ltcc":"\u2AA6","ltcir":"\u2A79","lt":"<","LT":"<","Lt":"\u226A","ltdot":"\u22D6","lthree":"\u22CB","ltimes":"\u22C9","ltlarr":"\u2976","ltquest":"\u2A7B","ltri":"\u25C3","ltrie":"\u22B4","ltrif":"\u25C2","ltrPar":"\u2996","lurdshar":"\u294A","luruhar":"\u2966","lvertneqq":"\u2268\uFE00","lvnE":"\u2268\uFE00","macr":"\u00AF","male":"\u2642","malt":"\u2720","maltese":"\u2720","Map":"\u2905","map":"\u21A6","mapsto":"\u21A6","mapstodown":"\u21A7","mapstoleft":"\u21A4","mapstoup":"\u21A5","marker":"\u25AE","mcomma":"\u2A29","Mcy":"\u041C","mcy":"\u043C","mdash":"\u2014","mDDot":"\u223A","measuredangle":"\u2221","MediumSpace":"\u205F","Mellintrf":"\u2133","Mfr":"\uD835\uDD10","mfr":"\uD835\uDD2A","mho":"\u2127","micro":"\u00B5","midast":"*","midcir":"\u2AF0","mid":"\u2223","middot":"\u00B7","minusb":"\u229F","minus":"\u2212","minusd":"\u2238","minusdu":"\u2A2A","MinusPlus":"\u2213","mlcp":"\u2ADB","mldr":"\u2026","mnplus":"\u2213","models":"\u22A7","Mopf":"\uD835\uDD44","mopf":"\uD835\uDD5E","mp":"\u2213","mscr":"\uD835\uDCC2","Mscr":"\u2133","mstpos":"\u223E","Mu":"\u039C","mu":"\u03BC","multimap":"\u22B8","mumap":"\u22B8","nabla":"\u2207","Nacute":"\u0143","nacute":"\u0144","nang":"\u2220\u20D2","nap":"\u2249","napE":"\u2A70\u0338","napid":"\u224B\u0338","napos":"\u0149","napprox":"\u2249","natural":"\u266E","naturals":"\u2115","natur":"\u266E","nbsp":"\u00A0","nbump":"\u224E\u0338","nbumpe":"\u224F\u0338","ncap":"\u2A43","Ncaron":"\u0147","ncaron":"\u0148","Ncedil":"\u0145","ncedil":"\u0146","ncong":"\u2247","ncongdot":"\u2A6D\u0338","ncup":"\u2A42","Ncy":"\u041D","ncy":"\u043D","ndash":"\u2013","nearhk":"\u2924","nearr":"\u2197","neArr":"\u21D7","nearrow":"\u2197","ne":"\u2260","nedot":"\u2250\u0338","NegativeMediumSpace":"\u200B","NegativeThickSpace":"\u200B","NegativeThinSpace":"\u200B","NegativeVeryThinSpace":"\u200B","nequiv":"\u2262","nesear":"\u2928","nesim":"\u2242\u0338","NestedGreaterGreater":"\u226B","NestedLessLess":"\u226A","NewLine":"\n","nexist":"\u2204","nexists":"\u2204","Nfr":"\uD835\uDD11","nfr":"\uD835\uDD2B","ngE":"\u2267\u0338","nge":"\u2271","ngeq":"\u2271","ngeqq":"\u2267\u0338","ngeqslant":"\u2A7E\u0338","nges":"\u2A7E\u0338","nGg":"\u22D9\u0338","ngsim":"\u2275","nGt":"\u226B\u20D2","ngt":"\u226F","ngtr":"\u226F","nGtv":"\u226B\u0338","nharr":"\u21AE","nhArr":"\u21CE","nhpar":"\u2AF2","ni":"\u220B","nis":"\u22FC","nisd":"\u22FA","niv":"\u220B","NJcy":"\u040A","njcy":"\u045A","nlarr":"\u219A","nlArr":"\u21CD","nldr":"\u2025","nlE":"\u2266\u0338","nle":"\u2270","nleftarrow":"\u219A","nLeftarrow":"\u21CD","nleftrightarrow":"\u21AE","nLeftrightarrow":"\u21CE","nleq":"\u2270","nleqq":"\u2266\u0338","nleqslant":"\u2A7D\u0338","nles":"\u2A7D\u0338","nless":"\u226E","nLl":"\u22D8\u0338","nlsim":"\u2274","nLt":"\u226A\u20D2","nlt":"\u226E","nltri":"\u22EA","nltrie":"\u22EC","nLtv":"\u226A\u0338","nmid":"\u2224","NoBreak":"\u2060","NonBreakingSpace":"\u00A0","nopf":"\uD835\uDD5F","Nopf":"\u2115","Not":"\u2AEC","not":"\u00AC","NotCongruent":"\u2262","NotCupCap":"\u226D","NotDoubleVerticalBar":"\u2226","NotElement":"\u2209","NotEqual":"\u2260","NotEqualTilde":"\u2242\u0338","NotExists":"\u2204","NotGreater":"\u226F","NotGreaterEqual":"\u2271","NotGreaterFullEqual":"\u2267\u0338","NotGreaterGreater":"\u226B\u0338","NotGreaterLess":"\u2279","NotGreaterSlantEqual":"\u2A7E\u0338","NotGreaterTilde":"\u2275","NotHumpDownHump":"\u224E\u0338","NotHumpEqual":"\u224F\u0338","notin":"\u2209","notindot":"\u22F5\u0338","notinE":"\u22F9\u0338","notinva":"\u2209","notinvb":"\u22F7","notinvc":"\u22F6","NotLeftTriangleBar":"\u29CF\u0338","NotLeftTriangle":"\u22EA","NotLeftTriangleEqual":"\u22EC","NotLess":"\u226E","NotLessEqual":"\u2270","NotLessGreater":"\u2278","NotLessLess":"\u226A\u0338","NotLessSlantEqual":"\u2A7D\u0338","NotLessTilde":"\u2274","NotNestedGreaterGreater":"\u2AA2\u0338","NotNestedLessLess":"\u2AA1\u0338","notni":"\u220C","notniva":"\u220C","notnivb":"\u22FE","notnivc":"\u22FD","NotPrecedes":"\u2280","NotPrecedesEqual":"\u2AAF\u0338","NotPrecedesSlantEqual":"\u22E0","NotReverseElement":"\u220C","NotRightTriangleBar":"\u29D0\u0338","NotRightTriangle":"\u22EB","NotRightTriangleEqual":"\u22ED","NotSquareSubset":"\u228F\u0338","NotSquareSubsetEqual":"\u22E2","NotSquareSuperset":"\u2290\u0338","NotSquareSupersetEqual":"\u22E3","NotSubset":"\u2282\u20D2","NotSubsetEqual":"\u2288","NotSucceeds":"\u2281","NotSucceedsEqual":"\u2AB0\u0338","NotSucceedsSlantEqual":"\u22E1","NotSucceedsTilde":"\u227F\u0338","NotSuperset":"\u2283\u20D2","NotSupersetEqual":"\u2289","NotTilde":"\u2241","NotTildeEqual":"\u2244","NotTildeFullEqual":"\u2247","NotTildeTilde":"\u2249","NotVerticalBar":"\u2224","nparallel":"\u2226","npar":"\u2226","nparsl":"\u2AFD\u20E5","npart":"\u2202\u0338","npolint":"\u2A14","npr":"\u2280","nprcue":"\u22E0","nprec":"\u2280","npreceq":"\u2AAF\u0338","npre":"\u2AAF\u0338","nrarrc":"\u2933\u0338","nrarr":"\u219B","nrArr":"\u21CF","nrarrw":"\u219D\u0338","nrightarrow":"\u219B","nRightarrow":"\u21CF","nrtri":"\u22EB","nrtrie":"\u22ED","nsc":"\u2281","nsccue":"\u22E1","nsce":"\u2AB0\u0338","Nscr":"\uD835\uDCA9","nscr":"\uD835\uDCC3","nshortmid":"\u2224","nshortparallel":"\u2226","nsim":"\u2241","nsime":"\u2244","nsimeq":"\u2244","nsmid":"\u2224","nspar":"\u2226","nsqsube":"\u22E2","nsqsupe":"\u22E3","nsub":"\u2284","nsubE":"\u2AC5\u0338","nsube":"\u2288","nsubset":"\u2282\u20D2","nsubseteq":"\u2288","nsubseteqq":"\u2AC5\u0338","nsucc":"\u2281","nsucceq":"\u2AB0\u0338","nsup":"\u2285","nsupE":"\u2AC6\u0338","nsupe":"\u2289","nsupset":"\u2283\u20D2","nsupseteq":"\u2289","nsupseteqq":"\u2AC6\u0338","ntgl":"\u2279","Ntilde":"\u00D1","ntilde":"\u00F1","ntlg":"\u2278","ntriangleleft":"\u22EA","ntrianglelefteq":"\u22EC","ntriangleright":"\u22EB","ntrianglerighteq":"\u22ED","Nu":"\u039D","nu":"\u03BD","num":"#","numero":"\u2116","numsp":"\u2007","nvap":"\u224D\u20D2","nvdash":"\u22AC","nvDash":"\u22AD","nVdash":"\u22AE","nVDash":"\u22AF","nvge":"\u2265\u20D2","nvgt":">\u20D2","nvHarr":"\u2904","nvinfin":"\u29DE","nvlArr":"\u2902","nvle":"\u2264\u20D2","nvlt":"<\u20D2","nvltrie":"\u22B4\u20D2","nvrArr":"\u2903","nvrtrie":"\u22B5\u20D2","nvsim":"\u223C\u20D2","nwarhk":"\u2923","nwarr":"\u2196","nwArr":"\u21D6","nwarrow":"\u2196","nwnear":"\u2927","Oacute":"\u00D3","oacute":"\u00F3","oast":"\u229B","Ocirc":"\u00D4","ocirc":"\u00F4","ocir":"\u229A","Ocy":"\u041E","ocy":"\u043E","odash":"\u229D","Odblac":"\u0150","odblac":"\u0151","odiv":"\u2A38","odot":"\u2299","odsold":"\u29BC","OElig":"\u0152","oelig":"\u0153","ofcir":"\u29BF","Ofr":"\uD835\uDD12","ofr":"\uD835\uDD2C","ogon":"\u02DB","Ograve":"\u00D2","ograve":"\u00F2","ogt":"\u29C1","ohbar":"\u29B5","ohm":"\u03A9","oint":"\u222E","olarr":"\u21BA","olcir":"\u29BE","olcross":"\u29BB","oline":"\u203E","olt":"\u29C0","Omacr":"\u014C","omacr":"\u014D","Omega":"\u03A9","omega":"\u03C9","Omicron":"\u039F","omicron":"\u03BF","omid":"\u29B6","ominus":"\u2296","Oopf":"\uD835\uDD46","oopf":"\uD835\uDD60","opar":"\u29B7","OpenCurlyDoubleQuote":"\u201C","OpenCurlyQuote":"\u2018","operp":"\u29B9","oplus":"\u2295","orarr":"\u21BB","Or":"\u2A54","or":"\u2228","ord":"\u2A5D","order":"\u2134","orderof":"\u2134","ordf":"\u00AA","ordm":"\u00BA","origof":"\u22B6","oror":"\u2A56","orslope":"\u2A57","orv":"\u2A5B","oS":"\u24C8","Oscr":"\uD835\uDCAA","oscr":"\u2134","Oslash":"\u00D8","oslash":"\u00F8","osol":"\u2298","Otilde":"\u00D5","otilde":"\u00F5","otimesas":"\u2A36","Otimes":"\u2A37","otimes":"\u2297","Ouml":"\u00D6","ouml":"\u00F6","ovbar":"\u233D","OverBar":"\u203E","OverBrace":"\u23DE","OverBracket":"\u23B4","OverParenthesis":"\u23DC","para":"\u00B6","parallel":"\u2225","par":"\u2225","parsim":"\u2AF3","parsl":"\u2AFD","part":"\u2202","PartialD":"\u2202","Pcy":"\u041F","pcy":"\u043F","percnt":"%","period":".","permil":"\u2030","perp":"\u22A5","pertenk":"\u2031","Pfr":"\uD835\uDD13","pfr":"\uD835\uDD2D","Phi":"\u03A6","phi":"\u03C6","phiv":"\u03D5","phmmat":"\u2133","phone":"\u260E","Pi":"\u03A0","pi":"\u03C0","pitchfork":"\u22D4","piv":"\u03D6","planck":"\u210F","planckh":"\u210E","plankv":"\u210F","plusacir":"\u2A23","plusb":"\u229E","pluscir":"\u2A22","plus":"+","plusdo":"\u2214","plusdu":"\u2A25","pluse":"\u2A72","PlusMinus":"\u00B1","plusmn":"\u00B1","plussim":"\u2A26","plustwo":"\u2A27","pm":"\u00B1","Poincareplane":"\u210C","pointint":"\u2A15","popf":"\uD835\uDD61","Popf":"\u2119","pound":"\u00A3","prap":"\u2AB7","Pr":"\u2ABB","pr":"\u227A","prcue":"\u227C","precapprox":"\u2AB7","prec":"\u227A","preccurlyeq":"\u227C","Precedes":"\u227A","PrecedesEqual":"\u2AAF","PrecedesSlantEqual":"\u227C","PrecedesTilde":"\u227E","preceq":"\u2AAF","precnapprox":"\u2AB9","precneqq":"\u2AB5","precnsim":"\u22E8","pre":"\u2AAF","prE":"\u2AB3","precsim":"\u227E","prime":"\u2032","Prime":"\u2033","primes":"\u2119","prnap":"\u2AB9","prnE":"\u2AB5","prnsim":"\u22E8","prod":"\u220F","Product":"\u220F","profalar":"\u232E","profline":"\u2312","profsurf":"\u2313","prop":"\u221D","Proportional":"\u221D","Proportion":"\u2237","propto":"\u221D","prsim":"\u227E","prurel":"\u22B0","Pscr":"\uD835\uDCAB","pscr":"\uD835\uDCC5","Psi":"\u03A8","psi":"\u03C8","puncsp":"\u2008","Qfr":"\uD835\uDD14","qfr":"\uD835\uDD2E","qint":"\u2A0C","qopf":"\uD835\uDD62","Qopf":"\u211A","qprime":"\u2057","Qscr":"\uD835\uDCAC","qscr":"\uD835\uDCC6","quaternions":"\u210D","quatint":"\u2A16","quest":"?","questeq":"\u225F","quot":"\"","QUOT":"\"","rAarr":"\u21DB","race":"\u223D\u0331","Racute":"\u0154","racute":"\u0155","radic":"\u221A","raemptyv":"\u29B3","rang":"\u27E9","Rang":"\u27EB","rangd":"\u2992","range":"\u29A5","rangle":"\u27E9","raquo":"\u00BB","rarrap":"\u2975","rarrb":"\u21E5","rarrbfs":"\u2920","rarrc":"\u2933","rarr":"\u2192","Rarr":"\u21A0","rArr":"\u21D2","rarrfs":"\u291E","rarrhk":"\u21AA","rarrlp":"\u21AC","rarrpl":"\u2945","rarrsim":"\u2974","Rarrtl":"\u2916","rarrtl":"\u21A3","rarrw":"\u219D","ratail":"\u291A","rAtail":"\u291C","ratio":"\u2236","rationals":"\u211A","rbarr":"\u290D","rBarr":"\u290F","RBarr":"\u2910","rbbrk":"\u2773","rbrace":"}","rbrack":"]","rbrke":"\u298C","rbrksld":"\u298E","rbrkslu":"\u2990","Rcaron":"\u0158","rcaron":"\u0159","Rcedil":"\u0156","rcedil":"\u0157","rceil":"\u2309","rcub":"}","Rcy":"\u0420","rcy":"\u0440","rdca":"\u2937","rdldhar":"\u2969","rdquo":"\u201D","rdquor":"\u201D","rdsh":"\u21B3","real":"\u211C","realine":"\u211B","realpart":"\u211C","reals":"\u211D","Re":"\u211C","rect":"\u25AD","reg":"\u00AE","REG":"\u00AE","ReverseElement":"\u220B","ReverseEquilibrium":"\u21CB","ReverseUpEquilibrium":"\u296F","rfisht":"\u297D","rfloor":"\u230B","rfr":"\uD835\uDD2F","Rfr":"\u211C","rHar":"\u2964","rhard":"\u21C1","rharu":"\u21C0","rharul":"\u296C","Rho":"\u03A1","rho":"\u03C1","rhov":"\u03F1","RightAngleBracket":"\u27E9","RightArrowBar":"\u21E5","rightarrow":"\u2192","RightArrow":"\u2192","Rightarrow":"\u21D2","RightArrowLeftArrow":"\u21C4","rightarrowtail":"\u21A3","RightCeiling":"\u2309","RightDoubleBracket":"\u27E7","RightDownTeeVector":"\u295D","RightDownVectorBar":"\u2955","RightDownVector":"\u21C2","RightFloor":"\u230B","rightharpoondown":"\u21C1","rightharpoonup":"\u21C0","rightleftarrows":"\u21C4","rightleftharpoons":"\u21CC","rightrightarrows":"\u21C9","rightsquigarrow":"\u219D","RightTeeArrow":"\u21A6","RightTee":"\u22A2","RightTeeVector":"\u295B","rightthreetimes":"\u22CC","RightTriangleBar":"\u29D0","RightTriangle":"\u22B3","RightTriangleEqual":"\u22B5","RightUpDownVector":"\u294F","RightUpTeeVector":"\u295C","RightUpVectorBar":"\u2954","RightUpVector":"\u21BE","RightVectorBar":"\u2953","RightVector":"\u21C0","ring":"\u02DA","risingdotseq":"\u2253","rlarr":"\u21C4","rlhar":"\u21CC","rlm":"\u200F","rmoustache":"\u23B1","rmoust":"\u23B1","rnmid":"\u2AEE","roang":"\u27ED","roarr":"\u21FE","robrk":"\u27E7","ropar":"\u2986","ropf":"\uD835\uDD63","Ropf":"\u211D","roplus":"\u2A2E","rotimes":"\u2A35","RoundImplies":"\u2970","rpar":")","rpargt":"\u2994","rppolint":"\u2A12","rrarr":"\u21C9","Rrightarrow":"\u21DB","rsaquo":"\u203A","rscr":"\uD835\uDCC7","Rscr":"\u211B","rsh":"\u21B1","Rsh":"\u21B1","rsqb":"]","rsquo":"\u2019","rsquor":"\u2019","rthree":"\u22CC","rtimes":"\u22CA","rtri":"\u25B9","rtrie":"\u22B5","rtrif":"\u25B8","rtriltri":"\u29CE","RuleDelayed":"\u29F4","ruluhar":"\u2968","rx":"\u211E","Sacute":"\u015A","sacute":"\u015B","sbquo":"\u201A","scap":"\u2AB8","Scaron":"\u0160","scaron":"\u0161","Sc":"\u2ABC","sc":"\u227B","sccue":"\u227D","sce":"\u2AB0","scE":"\u2AB4","Scedil":"\u015E","scedil":"\u015F","Scirc":"\u015C","scirc":"\u015D","scnap":"\u2ABA","scnE":"\u2AB6","scnsim":"\u22E9","scpolint":"\u2A13","scsim":"\u227F","Scy":"\u0421","scy":"\u0441","sdotb":"\u22A1","sdot":"\u22C5","sdote":"\u2A66","searhk":"\u2925","searr":"\u2198","seArr":"\u21D8","searrow":"\u2198","sect":"\u00A7","semi":";","seswar":"\u2929","setminus":"\u2216","setmn":"\u2216","sext":"\u2736","Sfr":"\uD835\uDD16","sfr":"\uD835\uDD30","sfrown":"\u2322","sharp":"\u266F","SHCHcy":"\u0429","shchcy":"\u0449","SHcy":"\u0428","shcy":"\u0448","ShortDownArrow":"\u2193","ShortLeftArrow":"\u2190","shortmid":"\u2223","shortparallel":"\u2225","ShortRightArrow":"\u2192","ShortUpArrow":"\u2191","shy":"\u00AD","Sigma":"\u03A3","sigma":"\u03C3","sigmaf":"\u03C2","sigmav":"\u03C2","sim":"\u223C","simdot":"\u2A6A","sime":"\u2243","simeq":"\u2243","simg":"\u2A9E","simgE":"\u2AA0","siml":"\u2A9D","simlE":"\u2A9F","simne":"\u2246","simplus":"\u2A24","simrarr":"\u2972","slarr":"\u2190","SmallCircle":"\u2218","smallsetminus":"\u2216","smashp":"\u2A33","smeparsl":"\u29E4","smid":"\u2223","smile":"\u2323","smt":"\u2AAA","smte":"\u2AAC","smtes":"\u2AAC\uFE00","SOFTcy":"\u042C","softcy":"\u044C","solbar":"\u233F","solb":"\u29C4","sol":"/","Sopf":"\uD835\uDD4A","sopf":"\uD835\uDD64","spades":"\u2660","spadesuit":"\u2660","spar":"\u2225","sqcap":"\u2293","sqcaps":"\u2293\uFE00","sqcup":"\u2294","sqcups":"\u2294\uFE00","Sqrt":"\u221A","sqsub":"\u228F","sqsube":"\u2291","sqsubset":"\u228F","sqsubseteq":"\u2291","sqsup":"\u2290","sqsupe":"\u2292","sqsupset":"\u2290","sqsupseteq":"\u2292","square":"\u25A1","Square":"\u25A1","SquareIntersection":"\u2293","SquareSubset":"\u228F","SquareSubsetEqual":"\u2291","SquareSuperset":"\u2290","SquareSupersetEqual":"\u2292","SquareUnion":"\u2294","squarf":"\u25AA","squ":"\u25A1","squf":"\u25AA","srarr":"\u2192","Sscr":"\uD835\uDCAE","sscr":"\uD835\uDCC8","ssetmn":"\u2216","ssmile":"\u2323","sstarf":"\u22C6","Star":"\u22C6","star":"\u2606","starf":"\u2605","straightepsilon":"\u03F5","straightphi":"\u03D5","strns":"\u00AF","sub":"\u2282","Sub":"\u22D0","subdot":"\u2ABD","subE":"\u2AC5","sube":"\u2286","subedot":"\u2AC3","submult":"\u2AC1","subnE":"\u2ACB","subne":"\u228A","subplus":"\u2ABF","subrarr":"\u2979","subset":"\u2282","Subset":"\u22D0","subseteq":"\u2286","subseteqq":"\u2AC5","SubsetEqual":"\u2286","subsetneq":"\u228A","subsetneqq":"\u2ACB","subsim":"\u2AC7","subsub":"\u2AD5","subsup":"\u2AD3","succapprox":"\u2AB8","succ":"\u227B","succcurlyeq":"\u227D","Succeeds":"\u227B","SucceedsEqual":"\u2AB0","SucceedsSlantEqual":"\u227D","SucceedsTilde":"\u227F","succeq":"\u2AB0","succnapprox":"\u2ABA","succneqq":"\u2AB6","succnsim":"\u22E9","succsim":"\u227F","SuchThat":"\u220B","sum":"\u2211","Sum":"\u2211","sung":"\u266A","sup1":"\u00B9","sup2":"\u00B2","sup3":"\u00B3","sup":"\u2283","Sup":"\u22D1","supdot":"\u2ABE","supdsub":"\u2AD8","supE":"\u2AC6","supe":"\u2287","supedot":"\u2AC4","Superset":"\u2283","SupersetEqual":"\u2287","suphsol":"\u27C9","suphsub":"\u2AD7","suplarr":"\u297B","supmult":"\u2AC2","supnE":"\u2ACC","supne":"\u228B","supplus":"\u2AC0","supset":"\u2283","Supset":"\u22D1","supseteq":"\u2287","supseteqq":"\u2AC6","supsetneq":"\u228B","supsetneqq":"\u2ACC","supsim":"\u2AC8","supsub":"\u2AD4","supsup":"\u2AD6","swarhk":"\u2926","swarr":"\u2199","swArr":"\u21D9","swarrow":"\u2199","swnwar":"\u292A","szlig":"\u00DF","Tab":"\t","target":"\u2316","Tau":"\u03A4","tau":"\u03C4","tbrk":"\u23B4","Tcaron":"\u0164","tcaron":"\u0165","Tcedil":"\u0162","tcedil":"\u0163","Tcy":"\u0422","tcy":"\u0442","tdot":"\u20DB","telrec":"\u2315","Tfr":"\uD835\uDD17","tfr":"\uD835\uDD31","there4":"\u2234","therefore":"\u2234","Therefore":"\u2234","Theta":"\u0398","theta":"\u03B8","thetasym":"\u03D1","thetav":"\u03D1","thickapprox":"\u2248","thicksim":"\u223C","ThickSpace":"\u205F\u200A","ThinSpace":"\u2009","thinsp":"\u2009","thkap":"\u2248","thksim":"\u223C","THORN":"\u00DE","thorn":"\u00FE","tilde":"\u02DC","Tilde":"\u223C","TildeEqual":"\u2243","TildeFullEqual":"\u2245","TildeTilde":"\u2248","timesbar":"\u2A31","timesb":"\u22A0","times":"\u00D7","timesd":"\u2A30","tint":"\u222D","toea":"\u2928","topbot":"\u2336","topcir":"\u2AF1","top":"\u22A4","Topf":"\uD835\uDD4B","topf":"\uD835\uDD65","topfork":"\u2ADA","tosa":"\u2929","tprime":"\u2034","trade":"\u2122","TRADE":"\u2122","triangle":"\u25B5","triangledown":"\u25BF","triangleleft":"\u25C3","trianglelefteq":"\u22B4","triangleq":"\u225C","triangleright":"\u25B9","trianglerighteq":"\u22B5","tridot":"\u25EC","trie":"\u225C","triminus":"\u2A3A","TripleDot":"\u20DB","triplus":"\u2A39","trisb":"\u29CD","tritime":"\u2A3B","trpezium":"\u23E2","Tscr":"\uD835\uDCAF","tscr":"\uD835\uDCC9","TScy":"\u0426","tscy":"\u0446","TSHcy":"\u040B","tshcy":"\u045B","Tstrok":"\u0166","tstrok":"\u0167","twixt":"\u226C","twoheadleftarrow":"\u219E","twoheadrightarrow":"\u21A0","Uacute":"\u00DA","uacute":"\u00FA","uarr":"\u2191","Uarr":"\u219F","uArr":"\u21D1","Uarrocir":"\u2949","Ubrcy":"\u040E","ubrcy":"\u045E","Ubreve":"\u016C","ubreve":"\u016D","Ucirc":"\u00DB","ucirc":"\u00FB","Ucy":"\u0423","ucy":"\u0443","udarr":"\u21C5","Udblac":"\u0170","udblac":"\u0171","udhar":"\u296E","ufisht":"\u297E","Ufr":"\uD835\uDD18","ufr":"\uD835\uDD32","Ugrave":"\u00D9","ugrave":"\u00F9","uHar":"\u2963","uharl":"\u21BF","uharr":"\u21BE","uhblk":"\u2580","ulcorn":"\u231C","ulcorner":"\u231C","ulcrop":"\u230F","ultri":"\u25F8","Umacr":"\u016A","umacr":"\u016B","uml":"\u00A8","UnderBar":"_","UnderBrace":"\u23DF","UnderBracket":"\u23B5","UnderParenthesis":"\u23DD","Union":"\u22C3","UnionPlus":"\u228E","Uogon":"\u0172","uogon":"\u0173","Uopf":"\uD835\uDD4C","uopf":"\uD835\uDD66","UpArrowBar":"\u2912","uparrow":"\u2191","UpArrow":"\u2191","Uparrow":"\u21D1","UpArrowDownArrow":"\u21C5","updownarrow":"\u2195","UpDownArrow":"\u2195","Updownarrow":"\u21D5","UpEquilibrium":"\u296E","upharpoonleft":"\u21BF","upharpoonright":"\u21BE","uplus":"\u228E","UpperLeftArrow":"\u2196","UpperRightArrow":"\u2197","upsi":"\u03C5","Upsi":"\u03D2","upsih":"\u03D2","Upsilon":"\u03A5","upsilon":"\u03C5","UpTeeArrow":"\u21A5","UpTee":"\u22A5","upuparrows":"\u21C8","urcorn":"\u231D","urcorner":"\u231D","urcrop":"\u230E","Uring":"\u016E","uring":"\u016F","urtri":"\u25F9","Uscr":"\uD835\uDCB0","uscr":"\uD835\uDCCA","utdot":"\u22F0","Utilde":"\u0168","utilde":"\u0169","utri":"\u25B5","utrif":"\u25B4","uuarr":"\u21C8","Uuml":"\u00DC","uuml":"\u00FC","uwangle":"\u29A7","vangrt":"\u299C","varepsilon":"\u03F5","varkappa":"\u03F0","varnothing":"\u2205","varphi":"\u03D5","varpi":"\u03D6","varpropto":"\u221D","varr":"\u2195","vArr":"\u21D5","varrho":"\u03F1","varsigma":"\u03C2","varsubsetneq":"\u228A\uFE00","varsubsetneqq":"\u2ACB\uFE00","varsupsetneq":"\u228B\uFE00","varsupsetneqq":"\u2ACC\uFE00","vartheta":"\u03D1","vartriangleleft":"\u22B2","vartriangleright":"\u22B3","vBar":"\u2AE8","Vbar":"\u2AEB","vBarv":"\u2AE9","Vcy":"\u0412","vcy":"\u0432","vdash":"\u22A2","vDash":"\u22A8","Vdash":"\u22A9","VDash":"\u22AB","Vdashl":"\u2AE6","veebar":"\u22BB","vee":"\u2228","Vee":"\u22C1","veeeq":"\u225A","vellip":"\u22EE","verbar":"|","Verbar":"\u2016","vert":"|","Vert":"\u2016","VerticalBar":"\u2223","VerticalLine":"|","VerticalSeparator":"\u2758","VerticalTilde":"\u2240","VeryThinSpace":"\u200A","Vfr":"\uD835\uDD19","vfr":"\uD835\uDD33","vltri":"\u22B2","vnsub":"\u2282\u20D2","vnsup":"\u2283\u20D2","Vopf":"\uD835\uDD4D","vopf":"\uD835\uDD67","vprop":"\u221D","vrtri":"\u22B3","Vscr":"\uD835\uDCB1","vscr":"\uD835\uDCCB","vsubnE":"\u2ACB\uFE00","vsubne":"\u228A\uFE00","vsupnE":"\u2ACC\uFE00","vsupne":"\u228B\uFE00","Vvdash":"\u22AA","vzigzag":"\u299A","Wcirc":"\u0174","wcirc":"\u0175","wedbar":"\u2A5F","wedge":"\u2227","Wedge":"\u22C0","wedgeq":"\u2259","weierp":"\u2118","Wfr":"\uD835\uDD1A","wfr":"\uD835\uDD34","Wopf":"\uD835\uDD4E","wopf":"\uD835\uDD68","wp":"\u2118","wr":"\u2240","wreath":"\u2240","Wscr":"\uD835\uDCB2","wscr":"\uD835\uDCCC","xcap":"\u22C2","xcirc":"\u25EF","xcup":"\u22C3","xdtri":"\u25BD","Xfr":"\uD835\uDD1B","xfr":"\uD835\uDD35","xharr":"\u27F7","xhArr":"\u27FA","Xi":"\u039E","xi":"\u03BE","xlarr":"\u27F5","xlArr":"\u27F8","xmap":"\u27FC","xnis":"\u22FB","xodot":"\u2A00","Xopf":"\uD835\uDD4F","xopf":"\uD835\uDD69","xoplus":"\u2A01","xotime":"\u2A02","xrarr":"\u27F6","xrArr":"\u27F9","Xscr":"\uD835\uDCB3","xscr":"\uD835\uDCCD","xsqcup":"\u2A06","xuplus":"\u2A04","xutri":"\u25B3","xvee":"\u22C1","xwedge":"\u22C0","Yacute":"\u00DD","yacute":"\u00FD","YAcy":"\u042F","yacy":"\u044F","Ycirc":"\u0176","ycirc":"\u0177","Ycy":"\u042B","ycy":"\u044B","yen":"\u00A5","Yfr":"\uD835\uDD1C","yfr":"\uD835\uDD36","YIcy":"\u0407","yicy":"\u0457","Yopf":"\uD835\uDD50","yopf":"\uD835\uDD6A","Yscr":"\uD835\uDCB4","yscr":"\uD835\uDCCE","YUcy":"\u042E","yucy":"\u044E","yuml":"\u00FF","Yuml":"\u0178","Zacute":"\u0179","zacute":"\u017A","Zcaron":"\u017D","zcaron":"\u017E","Zcy":"\u0417","zcy":"\u0437","Zdot":"\u017B","zdot":"\u017C","zeetrf":"\u2128","ZeroWidthSpace":"\u200B","Zeta":"\u0396","zeta":"\u03B6","zfr":"\uD835\uDD37","Zfr":"\u2128","ZHcy":"\u0416","zhcy":"\u0436","zigrarr":"\u21DD","zopf":"\uD835\uDD6B","Zopf":"\u2124","Zscr":"\uD835\uDCB5","zscr":"\uD835\uDCCF","zwj":"\u200D","zwnj":"\u200C"}
},{}],57:[function(require,module,exports){
'use strict';


////////////////////////////////////////////////////////////////////////////////
// Helpers

// Merge objects
//
function assign(obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);

  sources.forEach(function (source) {
    if (!source) { return; }

    Object.keys(source).forEach(function (key) {
      obj[key] = source[key];
    });
  });

  return obj;
}

function _class(obj) { return Object.prototype.toString.call(obj); }
function isString(obj) { return _class(obj) === '[object String]'; }
function isObject(obj) { return _class(obj) === '[object Object]'; }
function isRegExp(obj) { return _class(obj) === '[object RegExp]'; }
function isFunction(obj) { return _class(obj) === '[object Function]'; }


function escapeRE (str) { return str.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&'); }

////////////////////////////////////////////////////////////////////////////////


var defaultOptions = {
  fuzzyLink: true,
  fuzzyEmail: true,
  fuzzyIP: false
};


function isOptionsObj(obj) {
  return Object.keys(obj || {}).reduce(function (acc, k) {
    return acc || defaultOptions.hasOwnProperty(k);
  }, false);
}


var defaultSchemas = {
  'http:': {
    validate: function (text, pos, self) {
      var tail = text.slice(pos);

      if (!self.re.http) {
        // compile lazily, because "host"-containing variables can change on tlds update.
        self.re.http =  new RegExp(
          '^\\/\\/' + self.re.src_auth + self.re.src_host_port_strict + self.re.src_path, 'i'
        );
      }
      if (self.re.http.test(tail)) {
        return tail.match(self.re.http)[0].length;
      }
      return 0;
    }
  },
  'https:':  'http:',
  'ftp:':    'http:',
  '//':      {
    validate: function (text, pos, self) {
      var tail = text.slice(pos);

      if (!self.re.no_http) {
      // compile lazily, becayse "host"-containing variables can change on tlds update.
        self.re.no_http =  new RegExp(
          '^' + self.re.src_auth + self.re.src_host_port_strict + self.re.src_path, 'i'
        );
      }

      if (self.re.no_http.test(tail)) {
        // should not be `://`, that protects from errors in protocol name
        if (pos >= 3 && text[pos - 3] === ':') { return 0; }
        return tail.match(self.re.no_http)[0].length;
      }
      return 0;
    }
  },
  'mailto:': {
    validate: function (text, pos, self) {
      var tail = text.slice(pos);

      if (!self.re.mailto) {
        self.re.mailto =  new RegExp(
          '^' + self.re.src_email_name + '@' + self.re.src_host_strict, 'i'
        );
      }
      if (self.re.mailto.test(tail)) {
        return tail.match(self.re.mailto)[0].length;
      }
      return 0;
    }
  }
};

/*eslint-disable max-len*/

// RE pattern for 2-character tlds (autogenerated by ./support/tlds_2char_gen.js)
var tlds_2ch_src_re = 'a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]';

// DON'T try to make PRs with changes. Extend TLDs with LinkifyIt.tlds() instead
var tlds_default = 'biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф'.split('|');

/*eslint-enable max-len*/

////////////////////////////////////////////////////////////////////////////////

function resetScanCache(self) {
  self.__index__ = -1;
  self.__text_cache__   = '';
}

function createValidator(re) {
  return function (text, pos) {
    var tail = text.slice(pos);

    if (re.test(tail)) {
      return tail.match(re)[0].length;
    }
    return 0;
  };
}

function createNormalizer() {
  return function (match, self) {
    self.normalize(match);
  };
}

// Schemas compiler. Build regexps.
//
function compile(self) {

  // Load & clone RE patterns.
  var re = self.re = assign({}, require('./lib/re'));

  // Define dynamic patterns
  var tlds = self.__tlds__.slice();

  if (!self.__tlds_replaced__) {
    tlds.push(tlds_2ch_src_re);
  }
  tlds.push(re.src_xn);

  re.src_tlds = tlds.join('|');

  function untpl(tpl) { return tpl.replace('%TLDS%', re.src_tlds); }

  re.email_fuzzy      = RegExp(untpl(re.tpl_email_fuzzy), 'i');
  re.link_fuzzy       = RegExp(untpl(re.tpl_link_fuzzy), 'i');
  re.link_no_ip_fuzzy = RegExp(untpl(re.tpl_link_no_ip_fuzzy), 'i');
  re.host_fuzzy_test  = RegExp(untpl(re.tpl_host_fuzzy_test), 'i');

  //
  // Compile each schema
  //

  var aliases = [];

  self.__compiled__ = {}; // Reset compiled data

  function schemaError(name, val) {
    throw new Error('(LinkifyIt) Invalid schema "' + name + '": ' + val);
  }

  Object.keys(self.__schemas__).forEach(function (name) {
    var val = self.__schemas__[name];

    // skip disabled methods
    if (val === null) { return; }

    var compiled = { validate: null, link: null };

    self.__compiled__[name] = compiled;

    if (isObject(val)) {
      if (isRegExp(val.validate)) {
        compiled.validate = createValidator(val.validate);
      } else if (isFunction(val.validate)) {
        compiled.validate = val.validate;
      } else {
        schemaError(name, val);
      }

      if (isFunction(val.normalize)) {
        compiled.normalize = val.normalize;
      } else if (!val.normalize) {
        compiled.normalize = createNormalizer();
      } else {
        schemaError(name, val);
      }

      return;
    }

    if (isString(val)) {
      aliases.push(name);
      return;
    }

    schemaError(name, val);
  });

  //
  // Compile postponed aliases
  //

  aliases.forEach(function (alias) {
    if (!self.__compiled__[self.__schemas__[alias]]) {
      // Silently fail on missed schemas to avoid errons on disable.
      // schemaError(alias, self.__schemas__[alias]);
      return;
    }

    self.__compiled__[alias].validate =
      self.__compiled__[self.__schemas__[alias]].validate;
    self.__compiled__[alias].normalize =
      self.__compiled__[self.__schemas__[alias]].normalize;
  });

  //
  // Fake record for guessed links
  //
  self.__compiled__[''] = { validate: null, normalize: createNormalizer() };

  //
  // Build schema condition
  //
  var slist = Object.keys(self.__compiled__)
                      .filter(function(name) {
                        // Filter disabled & fake schemas
                        return name.length > 0 && self.__compiled__[name];
                      })
                      .map(escapeRE)
                      .join('|');
  // (?!_) cause 1.5x slowdown
  self.re.schema_test   = RegExp('(^|(?!_)(?:>|' + re.src_ZPCc + '))(' + slist + ')', 'i');
  self.re.schema_search = RegExp('(^|(?!_)(?:>|' + re.src_ZPCc + '))(' + slist + ')', 'ig');

  self.re.pretest       = RegExp(
                            '(' + self.re.schema_test.source + ')|' +
                            '(' + self.re.host_fuzzy_test.source + ')|' +
                            '@',
                            'i');

  //
  // Cleanup
  //

  resetScanCache(self);
}

/**
 * class Match
 *
 * Match result. Single element of array, returned by [[LinkifyIt#match]]
 **/
function Match(self, shift) {
  var start = self.__index__,
      end   = self.__last_index__,
      text  = self.__text_cache__.slice(start, end);

  /**
   * Match#schema -> String
   *
   * Prefix (protocol) for matched string.
   **/
  this.schema    = self.__schema__.toLowerCase();
  /**
   * Match#index -> Number
   *
   * First position of matched string.
   **/
  this.index     = start + shift;
  /**
   * Match#lastIndex -> Number
   *
   * Next position after matched string.
   **/
  this.lastIndex = end + shift;
  /**
   * Match#raw -> String
   *
   * Matched string.
   **/
  this.raw       = text;
  /**
   * Match#text -> String
   *
   * Notmalized text of matched string.
   **/
  this.text      = text;
  /**
   * Match#url -> String
   *
   * Normalized url of matched string.
   **/
  this.url       = text;
}

function createMatch(self, shift) {
  var match = new Match(self, shift);

  self.__compiled__[match.schema].normalize(match, self);

  return match;
}


/**
 * class LinkifyIt
 **/

/**
 * new LinkifyIt(schemas, options)
 * - schemas (Object): Optional. Additional schemas to validate (prefix/validator)
 * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
 *
 * Creates new linkifier instance with optional additional schemas.
 * Can be called without `new` keyword for convenience.
 *
 * By default understands:
 *
 * - `http(s)://...` , `ftp://...`, `mailto:...` & `//...` links
 * - "fuzzy" links and emails (example.com, foo@bar.com).
 *
 * `schemas` is an object, where each key/value describes protocol/rule:
 *
 * - __key__ - link prefix (usually, protocol name with `:` at the end, `skype:`
 *   for example). `linkify-it` makes shure that prefix is not preceeded with
 *   alphanumeric char and symbols. Only whitespaces and punctuation allowed.
 * - __value__ - rule to check tail after link prefix
 *   - _String_ - just alias to existing rule
 *   - _Object_
 *     - _validate_ - validator function (should return matched length on success),
 *       or `RegExp`.
 *     - _normalize_ - optional function to normalize text & url of matched result
 *       (for example, for @twitter mentions).
 *
 * `options`:
 *
 * - __fuzzyLink__ - recognige URL-s without `http(s):` prefix. Default `true`.
 * - __fuzzyIP__ - allow IPs in fuzzy links above. Can conflict with some texts
 *   like version numbers. Default `false`.
 * - __fuzzyEmail__ - recognize emails without `mailto:` prefix.
 *
 **/
function LinkifyIt(schemas, options) {
  if (!(this instanceof LinkifyIt)) {
    return new LinkifyIt(schemas, options);
  }

  if (!options) {
    if (isOptionsObj(schemas)) {
      options = schemas;
      schemas = {};
    }
  }

  this.__opts__           = assign({}, defaultOptions, options);

  // Cache last tested result. Used to skip repeating steps on next `match` call.
  this.__index__          = -1;
  this.__last_index__     = -1; // Next scan position
  this.__schema__         = '';
  this.__text_cache__     = '';

  this.__schemas__        = assign({}, defaultSchemas, schemas);
  this.__compiled__       = {};

  this.__tlds__           = tlds_default;
  this.__tlds_replaced__  = false;

  this.re = {};

  compile(this);
}


/** chainable
 * LinkifyIt#add(schema, definition)
 * - schema (String): rule name (fixed pattern prefix)
 * - definition (String|RegExp|Object): schema definition
 *
 * Add new rule definition. See constructor description for details.
 **/
LinkifyIt.prototype.add = function add(schema, definition) {
  this.__schemas__[schema] = definition;
  compile(this);
  return this;
};


/** chainable
 * LinkifyIt#set(options)
 * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
 *
 * Set recognition options for links without schema.
 **/
LinkifyIt.prototype.set = function set(options) {
  this.__opts__ = assign(this.__opts__, options);
  return this;
};


/**
 * LinkifyIt#test(text) -> Boolean
 *
 * Searches linkifiable pattern and returns `true` on success or `false` on fail.
 **/
LinkifyIt.prototype.test = function test(text) {
  // Reset scan cache
  this.__text_cache__ = text;
  this.__index__      = -1;

  if (!text.length) { return false; }

  var m, ml, me, len, shift, next, re, tld_pos, at_pos;

  // try to scan for link with schema - that's the most simple rule
  if (this.re.schema_test.test(text)) {
    re = this.re.schema_search;
    re.lastIndex = 0;
    while ((m = re.exec(text)) !== null) {
      len = this.testSchemaAt(text, m[2], re.lastIndex);
      if (len) {
        this.__schema__     = m[2];
        this.__index__      = m.index + m[1].length;
        this.__last_index__ = m.index + m[0].length + len;
        break;
      }
    }
  }

  if (this.__opts__.fuzzyLink && this.__compiled__['http:']) {
    // guess schemaless links
    tld_pos = text.search(this.re.host_fuzzy_test);
    if (tld_pos >= 0) {
      // if tld is located after found link - no need to check fuzzy pattern
      if (this.__index__ < 0 || tld_pos < this.__index__) {
        if ((ml = text.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null) {

          shift = ml.index + ml[1].length;

          if (this.__index__ < 0 || shift < this.__index__) {
            this.__schema__     = '';
            this.__index__      = shift;
            this.__last_index__ = ml.index + ml[0].length;
          }
        }
      }
    }
  }

  if (this.__opts__.fuzzyEmail && this.__compiled__['mailto:']) {
    // guess schemaless emails
    at_pos = text.indexOf('@');
    if (at_pos >= 0) {
      // We can't skip this check, because this cases are possible:
      // 192.168.1.1@gmail.com, my.in@example.com
      if ((me = text.match(this.re.email_fuzzy)) !== null) {

        shift = me.index + me[1].length;
        next  = me.index + me[0].length;

        if (this.__index__ < 0 || shift < this.__index__ ||
            (shift === this.__index__ && next > this.__last_index__)) {
          this.__schema__     = 'mailto:';
          this.__index__      = shift;
          this.__last_index__ = next;
        }
      }
    }
  }

  return this.__index__ >= 0;
};


/**
 * LinkifyIt#pretest(text) -> Boolean
 *
 * Very quick check, that can give false positives. Returns true if link MAY BE
 * can exists. Can be used for speed optimization, when you need to check that
 * link NOT exists.
 **/
LinkifyIt.prototype.pretest = function pretest(text) {
  return this.re.pretest.test(text);
};


/**
 * LinkifyIt#testSchemaAt(text, name, position) -> Number
 * - text (String): text to scan
 * - name (String): rule (schema) name
 * - position (Number): text offset to check from
 *
 * Similar to [[LinkifyIt#test]] but checks only specific protocol tail exactly
 * at given position. Returns length of found pattern (0 on fail).
 **/
LinkifyIt.prototype.testSchemaAt = function testSchemaAt(text, schema, pos) {
  // If not supported schema check requested - terminate
  if (!this.__compiled__[schema.toLowerCase()]) {
    return 0;
  }
  return this.__compiled__[schema.toLowerCase()].validate(text, pos, this);
};


/**
 * LinkifyIt#match(text) -> Array|null
 *
 * Returns array of found link descriptions or `null` on fail. We strongly
 * to use [[LinkifyIt#test]] first, for best speed.
 *
 * ##### Result match description
 *
 * - __schema__ - link schema, can be empty for fuzzy links, or `//` for
 *   protocol-neutral  links.
 * - __index__ - offset of matched text
 * - __lastIndex__ - index of next char after mathch end
 * - __raw__ - matched text
 * - __text__ - normalized text
 * - __url__ - link, generated from matched text
 **/
LinkifyIt.prototype.match = function match(text) {
  var shift = 0, result = [];

  // Try to take previous element from cache, if .test() called before
  if (this.__index__ >= 0 && this.__text_cache__ === text) {
    result.push(createMatch(this, shift));
    shift = this.__last_index__;
  }

  // Cut head if cache was used
  var tail = shift ? text.slice(shift) : text;

  // Scan string until end reached
  while (this.test(tail)) {
    result.push(createMatch(this, shift));

    tail = tail.slice(this.__last_index__);
    shift += this.__last_index__;
  }

  if (result.length) {
    return result;
  }

  return null;
};


/** chainable
 * LinkifyIt#tlds(list [, keepOld]) -> this
 * - list (Array): list of tlds
 * - keepOld (Boolean): merge with current list if `true` (`false` by default)
 *
 * Load (or merge) new tlds list. Those are user for fuzzy links (without prefix)
 * to avoid false positives. By default this algorythm used:
 *
 * - hostname with any 2-letter root zones are ok.
 * - biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф
 *   are ok.
 * - encoded (`xn--...`) root zones are ok.
 *
 * If list is replaced, then exact match for 2-chars root zones will be checked.
 **/
LinkifyIt.prototype.tlds = function tlds(list, keepOld) {
  list = Array.isArray(list) ? list : [ list ];

  if (!keepOld) {
    this.__tlds__ = list.slice();
    this.__tlds_replaced__ = true;
    compile(this);
    return this;
  }

  this.__tlds__ = this.__tlds__.concat(list)
                                  .sort()
                                  .filter(function(el, idx, arr) {
                                    return el !== arr[idx - 1];
                                  })
                                  .reverse();

  compile(this);
  return this;
};

/**
 * LinkifyIt#normalize(match)
 *
 * Default normalizer (if schema does not define it's own).
 **/
LinkifyIt.prototype.normalize = function normalize(match) {

  // Do minimal possible changes by default. Need to collect feedback prior
  // to move forward https://github.com/markdown-it/linkify-it/issues/1

  if (!match.schema) { match.url = 'http://' + match.url; }

  if (match.schema === 'mailto:' && !/^mailto:/i.test(match.url)) {
    match.url = 'mailto:' + match.url;
  }
};


module.exports = LinkifyIt;

},{"./lib/re":58}],58:[function(require,module,exports){
'use strict';

// Use direct extract instead of `regenerate` to reduse browserified size
var src_Any = exports.src_Any = require('uc.micro/properties/Any/regex').source;
var src_Cc  = exports.src_Cc = require('uc.micro/categories/Cc/regex').source;
var src_Z   = exports.src_Z  = require('uc.micro/categories/Z/regex').source;
var src_P   = exports.src_P  = require('uc.micro/categories/P/regex').source;

// \p{\Z\P\Cc\CF} (white spaces + control + format + punctuation)
var src_ZPCc = exports.src_ZPCc = [ src_Z, src_P, src_Cc ].join('|');

// \p{\Z\Cc} (white spaces + control)
var src_ZCc = exports.src_ZCc = [ src_Z, src_Cc ].join('|');

// All possible word characters (everything without punctuation, spaces & controls)
// Defined via punctuation & spaces to save space
// Should be something like \p{\L\N\S\M} (\w but without `_`)
var src_pseudo_letter       = '(?:(?!' + src_ZPCc + ')' + src_Any + ')';
// The same as abothe but without [0-9]
var src_pseudo_letter_non_d = '(?:(?![0-9]|' + src_ZPCc + ')' + src_Any + ')';

////////////////////////////////////////////////////////////////////////////////

var src_ip4 = exports.src_ip4 =

  '(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';

exports.src_auth    = '(?:(?:(?!' + src_ZCc + ').)+@)?';

var src_port = exports.src_port =

  '(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?';

var src_host_terminator = exports.src_host_terminator =

  '(?=$|' + src_ZPCc + ')(?!-|_|:\\d|\\.-|\\.(?!$|' + src_ZPCc + '))';

var src_path = exports.src_path =

  '(?:' +
    '[/?#]' +
      '(?:' +
        '(?!' + src_ZCc + '|[()[\\]{}.,"\'?!\\-]).|' +
        '\\[(?:(?!' + src_ZCc + '|\\]).)*\\]|' +
        '\\((?:(?!' + src_ZCc + '|[)]).)*\\)|' +
        '\\{(?:(?!' + src_ZCc + '|[}]).)*\\}|' +
        '\\"(?:(?!' + src_ZCc + '|["]).)+\\"|' +
        "\\'(?:(?!" + src_ZCc + "|[']).)+\\'|" +
        "\\'(?=" + src_pseudo_letter + ').|' +  // allow `I'm_king` if no pair found
        '\\.{2,3}[a-zA-Z0-9%]|' + // github has ... in commit range links. Restrict to
                                  // english & percent-encoded only, until more examples found.
        '\\.(?!' + src_ZCc + '|[.]).|' +
        '\\-(?!' + src_ZCc + '|--(?:[^-]|$))(?:[-]+|.)|' +  // `---` => long dash, terminate
        '\\,(?!' + src_ZCc + ').|' +      // allow `,,,` in paths
        '\\!(?!' + src_ZCc + '|[!]).|' +
        '\\?(?!' + src_ZCc + '|[?]).' +
      ')+' +
    '|\\/' +
  ')?';

var src_email_name = exports.src_email_name =

  '[\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]+';

var src_xn = exports.src_xn =

  'xn--[a-z0-9\\-]{1,59}';

// More to read about domain names
// http://serverfault.com/questions/638260/

var src_domain_root = exports.src_domain_root =

  // Can't have digits and dashes
  '(?:' +
    src_xn +
    '|' +
    src_pseudo_letter_non_d + '{1,63}' +
  ')';

var src_domain = exports.src_domain =

  '(?:' +
    src_xn +
    '|' +
    '(?:' + src_pseudo_letter + ')' +
    '|' +
    // don't allow `--` in domain names, because:
    // - that can conflict with markdown &mdash; / &ndash;
    // - nobody use those anyway
    '(?:' + src_pseudo_letter + '(?:-(?!-)|' + src_pseudo_letter + '){0,61}' + src_pseudo_letter + ')' +
  ')';

var src_host = exports.src_host =

  '(?:' +
    src_ip4 +
  '|' +
    '(?:(?:(?:' + src_domain + ')\\.)*' + src_domain_root + ')' +
  ')';

var tpl_host_fuzzy = exports.tpl_host_fuzzy =

  '(?:' +
    src_ip4 +
  '|' +
    '(?:(?:(?:' + src_domain + ')\\.)+(?:%TLDS%))' +
  ')';

var tpl_host_no_ip_fuzzy = exports.tpl_host_no_ip_fuzzy =

  '(?:(?:(?:' + src_domain + ')\\.)+(?:%TLDS%))';

exports.src_host_strict =

  src_host + src_host_terminator;

var tpl_host_fuzzy_strict = exports.tpl_host_fuzzy_strict =

  tpl_host_fuzzy + src_host_terminator;

exports.src_host_port_strict =

  src_host + src_port + src_host_terminator;

var tpl_host_port_fuzzy_strict = exports.tpl_host_port_fuzzy_strict =

  tpl_host_fuzzy + src_port + src_host_terminator;

var tpl_host_port_no_ip_fuzzy_strict = exports.tpl_host_port_no_ip_fuzzy_strict =

  tpl_host_no_ip_fuzzy + src_port + src_host_terminator;


////////////////////////////////////////////////////////////////////////////////
// Main rules

// Rude test fuzzy links by host, for quick deny
exports.tpl_host_fuzzy_test =

  'localhost|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:' + src_ZPCc + '|$))';

exports.tpl_email_fuzzy =

    '(^|>|' + src_ZCc + ')(' + src_email_name + '@' + tpl_host_fuzzy_strict + ')';

exports.tpl_link_fuzzy =
    // Fuzzy link can't be prepended with .:/\- and non punctuation.
    // but can start with > (markdown blockquote)
    '(^|(?![.:/\\-_@])(?:[$+<=>^`|]|' + src_ZPCc + '))' +
    '((?![$+<=>^`|])' + tpl_host_port_fuzzy_strict + src_path + ')';

exports.tpl_link_no_ip_fuzzy =
    // Fuzzy link can't be prepended with .:/\- and non punctuation.
    // but can start with > (markdown blockquote)
    '(^|(?![.:/\\-_@])(?:[$+<=>^`|]|' + src_ZPCc + '))' +
    '((?![$+<=>^`|])' + tpl_host_port_no_ip_fuzzy_strict + src_path + ')';

},{"uc.micro/categories/Cc/regex":64,"uc.micro/categories/P/regex":66,"uc.micro/categories/Z/regex":67,"uc.micro/properties/Any/regex":69}],59:[function(require,module,exports){

'use strict';


/* eslint-disable no-bitwise */

var decodeCache = {};

function getDecodeCache(exclude) {
  var i, ch, cache = decodeCache[exclude];
  if (cache) { return cache; }

  cache = decodeCache[exclude] = [];

  for (i = 0; i < 128; i++) {
    ch = String.fromCharCode(i);
    cache.push(ch);
  }

  for (i = 0; i < exclude.length; i++) {
    ch = exclude.charCodeAt(i);
    cache[ch] = '%' + ('0' + ch.toString(16).toUpperCase()).slice(-2);
  }

  return cache;
}


// Decode percent-encoded string.
//
function decode(string, exclude) {
  var cache;

  if (typeof exclude !== 'string') {
    exclude = decode.defaultChars;
  }

  cache = getDecodeCache(exclude);

  return string.replace(/(%[a-f0-9]{2})+/gi, function(seq) {
    var i, l, b1, b2, b3, b4, char,
        result = '';

    for (i = 0, l = seq.length; i < l; i += 3) {
      b1 = parseInt(seq.slice(i + 1, i + 3), 16);

      if (b1 < 0x80) {
        result += cache[b1];
        continue;
      }

      if ((b1 & 0xE0) === 0xC0 && (i + 3 < l)) {
        // 110xxxxx 10xxxxxx
        b2 = parseInt(seq.slice(i + 4, i + 6), 16);

        if ((b2 & 0xC0) === 0x80) {
          char = ((b1 << 6) & 0x7C0) | (b2 & 0x3F);

          if (char < 0x80) {
            result += '\ufffd\ufffd';
          } else {
            result += String.fromCharCode(char);
          }

          i += 3;
          continue;
        }
      }

      if ((b1 & 0xF0) === 0xE0 && (i + 6 < l)) {
        // 1110xxxx 10xxxxxx 10xxxxxx
        b2 = parseInt(seq.slice(i + 4, i + 6), 16);
        b3 = parseInt(seq.slice(i + 7, i + 9), 16);

        if ((b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80) {
          char = ((b1 << 12) & 0xF000) | ((b2 << 6) & 0xFC0) | (b3 & 0x3F);

          if (char < 0x800 || (char >= 0xD800 && char <= 0xDFFF)) {
            result += '\ufffd\ufffd\ufffd';
          } else {
            result += String.fromCharCode(char);
          }

          i += 6;
          continue;
        }
      }

      if ((b1 & 0xF8) === 0xF0 && (i + 9 < l)) {
        // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx
        b2 = parseInt(seq.slice(i + 4, i + 6), 16);
        b3 = parseInt(seq.slice(i + 7, i + 9), 16);
        b4 = parseInt(seq.slice(i + 10, i + 12), 16);

        if ((b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80 && (b4 & 0xC0) === 0x80) {
          char = ((b1 << 18) & 0x1C0000) | ((b2 << 12) & 0x3F000) | ((b3 << 6) & 0xFC0) | (b4 & 0x3F);

          if (char < 0x10000 || char > 0x10FFFF) {
            result += '\ufffd\ufffd\ufffd\ufffd';
          } else {
            char -= 0x10000;
            result += String.fromCharCode(0xD800 + (char >> 10), 0xDC00 + (char & 0x3FF));
          }

          i += 9;
          continue;
        }
      }

      result += '\ufffd';
    }

    return result;
  });
}


decode.defaultChars   = ';/?:@&=+$,#';
decode.componentChars = '';


module.exports = decode;

},{}],60:[function(require,module,exports){

'use strict';


var encodeCache = {};


// Create a lookup array where anything but characters in `chars` string
// and alphanumeric chars is percent-encoded.
//
function getEncodeCache(exclude) {
  var i, ch, cache = encodeCache[exclude];
  if (cache) { return cache; }

  cache = encodeCache[exclude] = [];

  for (i = 0; i < 128; i++) {
    ch = String.fromCharCode(i);

    if (/^[0-9a-z]$/i.test(ch)) {
      // always allow unencoded alphanumeric characters
      cache.push(ch);
    } else {
      cache.push('%' + ('0' + i.toString(16).toUpperCase()).slice(-2));
    }
  }

  for (i = 0; i < exclude.length; i++) {
    cache[exclude.charCodeAt(i)] = exclude[i];
  }

  return cache;
}


// Encode unsafe characters with percent-encoding, skipping already
// encoded sequences.
//
//  - string       - string to encode
//  - exclude      - list of characters to ignore (in addition to a-zA-Z0-9)
//  - keepEscaped  - don't encode '%' in a correct escape sequence (default: true)
//
function encode(string, exclude, keepEscaped) {
  var i, l, code, nextCode, cache,
      result = '';

  if (typeof exclude !== 'string') {
    // encode(string, keepEscaped)
    keepEscaped  = exclude;
    exclude = encode.defaultChars;
  }

  if (typeof keepEscaped === 'undefined') {
    keepEscaped = true;
  }

  cache = getEncodeCache(exclude);

  for (i = 0, l = string.length; i < l; i++) {
    code = string.charCodeAt(i);

    if (keepEscaped && code === 0x25 /* % */ && i + 2 < l) {
      if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
        result += string.slice(i, i + 3);
        i += 2;
        continue;
      }
    }

    if (code < 128) {
      result += cache[code];
      continue;
    }

    if (code >= 0xD800 && code <= 0xDFFF) {
      if (code >= 0xD800 && code <= 0xDBFF && i + 1 < l) {
        nextCode = string.charCodeAt(i + 1);
        if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
          result += encodeURIComponent(string[i] + string[i + 1]);
          i++;
          continue;
        }
      }
      result += '%EF%BF%BD';
      continue;
    }

    result += encodeURIComponent(string[i]);
  }

  return result;
}

encode.defaultChars   = ";/?:@&=+$,-_.!~*'()#";
encode.componentChars = "-_.!~*'()";


module.exports = encode;

},{}],61:[function(require,module,exports){

'use strict';


module.exports = function format(url) {
  var result = '';

  result += url.protocol || '';
  result += url.slashes ? '//' : '';
  result += url.auth ? url.auth + '@' : '';

  if (url.hostname && url.hostname.indexOf(':') !== -1) {
    // ipv6 address
    result += '[' + url.hostname + ']';
  } else {
    result += url.hostname || '';
  }

  result += url.port ? ':' + url.port : '';
  result += url.pathname || '';
  result += url.search || '';
  result += url.hash || '';

  return result;
};

},{}],62:[function(require,module,exports){
'use strict';


module.exports.encode = require('./encode');
module.exports.decode = require('./decode');
module.exports.format = require('./format');
module.exports.parse  = require('./parse');

},{"./decode":59,"./encode":60,"./format":61,"./parse":63}],63:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

//
// Changes from joyent/node:
//
// 1. No leading slash in paths,
//    e.g. in `url.parse('http://foo?bar')` pathname is ``, not `/`
//
// 2. Backslashes are not replaced with slashes,
//    so `http:\\example.org\` is treated like a relative path
//
// 3. Trailing colon is treated like a part of the path,
//    i.e. in `http://example.org:foo` pathname is `:foo`
//
// 4. Nothing is URL-encoded in the resulting object,
//    (in joyent/node some chars in auth and paths are encoded)
//
// 5. `url.parse()` does not have `parseQueryString` argument
//
// 6. Removed extraneous result properties: `host`, `path`, `query`, etc.,
//    which can be constructed using other parts of the url.
//


function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.pathname = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = [ '<', '>', '"', '`', ' ', '\r', '\n', '\t' ],

    // RFC 2396: characters not allowed for various reasons.
    unwise = [ '{', '}', '|', '\\', '^', '`' ].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = [ '\'' ].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = [ '%', '/', '?', ';', '#' ].concat(autoEscape),
    hostEndingChars = [ '/', '?', '#' ],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    /* eslint-disable no-script-url */
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    };
    /* eslint-enable no-script-url */

function urlParse(url, slashesDenoteHost) {
  if (url && url instanceof Url) { return url; }

  var u = new Url();
  u.parse(url, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, slashesDenoteHost) {
  var i, l, lowerProto, hec, slashes,
      rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    lowerProto = proto.toLowerCase();
    this.protocol = proto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (i = 0; i < hostEndingChars.length; i++) {
      hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
        hostEnd = hec;
      }
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = auth;
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (i = 0; i < nonHostChars.length; i++) {
      hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
        hostEnd = hec;
      }
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1) {
      hostEnd = rest.length;
    }

    if (rest[hostEnd - 1] === ':') { hostEnd--; }
    var host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost(host);

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) { continue; }
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    }

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
    }
  }

  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    rest = rest.slice(0, qm);
  }
  if (rest) { this.pathname = rest; }
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '';
  }

  return this;
};

Url.prototype.parseHost = function(host) {
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) { this.hostname = host; }
};

module.exports = urlParse;

},{}],64:[function(require,module,exports){
module.exports=/[\0-\x1F\x7F-\x9F]/
},{}],65:[function(require,module,exports){
module.exports=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804\uDCBD|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/
},{}],66:[function(require,module,exports){
module.exports=/[!-#%-\*,-/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDE38-\uDE3D]|\uD805[\uDCC6\uDDC1-\uDDC9\uDE41-\uDE43]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F/
},{}],67:[function(require,module,exports){
module.exports=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/
},{}],68:[function(require,module,exports){

module.exports.Any = require('./properties/Any/regex');
module.exports.Cc  = require('./categories/Cc/regex');
module.exports.Cf  = require('./categories/Cf/regex');
module.exports.P   = require('./categories/P/regex');
module.exports.Z   = require('./categories/Z/regex');

},{"./categories/Cc/regex":64,"./categories/Cf/regex":65,"./categories/P/regex":66,"./categories/Z/regex":67,"./properties/Any/regex":69}],69:[function(require,module,exports){
module.exports=/[\0-\uD7FF\uDC00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF]/
},{}],70:[function(require,module,exports){
'use strict';

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

module.exports = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = Object.keys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};

},{}],71:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _baconjs = require('baconjs');

var _baconjs2 = _interopRequireDefault(_baconjs);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var ATTR_BACKFACE = 'backface';
var ATTR_FILTER = 'backface-filter';

/**
 * @typedef {Object} BackfaceReturns
 * @property {Bacon.Bus} bgImageBus
 * @property {Bacon.Bus} bgFilterBus
 */

/**
 * backface
 *
 * @param {Element} target
 * @returns {BackfaceReturns}
 */

exports['default'] = function (target) {

  var bgImageBus = new _baconjs2['default'].Bus();
  var bgFilterBus = new _baconjs2['default'].Bus();

  // backface image
  bgImageBus.map('.getAttribute', ATTR_BACKFACE).map(function (src) {
    return src ? 'url(' + src + ')' : '';
  }).onValue(_util2['default'].styleAssignOf(target, 'background-image'));

  // backface image css filter
  bgFilterBus.map('.getAttribute', ATTR_FILTER).onValue(_util2['default'].styleAssignOf(target, _util2['default'].stylePrefixDetect('filter')));

  _baconjs2['default'].fromArray(_util2['default'].toArray(document.querySelectorAll('[' + ATTR_BACKFACE + ']'))).map('.getAttribute', ATTR_BACKFACE).filter(function (v) {
    return !!v;
  }).onValue(_util2['default'].preloadImg);

  return {
    bgImageBus: bgImageBus,
    bgFilterBus: bgFilterBus
  };
};

module.exports = exports['default'];

},{"./util":79,"baconjs":2}],72:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _baconjs = require('baconjs');

var _baconjs2 = _interopRequireDefault(_baconjs);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var EVENT_KEYUP = _baconjs2['default'].fromEventTarget(document, 'keyup');
var EVENT_KEYDOWN = _baconjs2['default'].fromEventTarget(document, 'keydown');

/**
 * create EventStream from user input
 */
exports['default'] = {
  /**
   * @param {String|Number} charKey
   * @returns {EventStream}
   */
  key: function key(charKey) {
    var keyCode = typeof charKey === 'string' ? (0, _keycode2['default'])(charKey) : charKey;
    return EVENT_KEYUP.filter(keyCodeIs(keyCode));
  },

  /**
   * @param {String|Number} charKey
   * @returns {EventStream}
   */
  keydown: function keydown(charKey) {
    var keyCode = typeof charKey === 'string' ? (0, _keycode2['default'])(charKey) : charKey;
    return EVENT_KEYDOWN.filter(keyCodeIs(keyCode));
  },

  /**
   * @param {Element} el
   * @returns {EventStream}
   */
  click: function click(el) {
    return _baconjs2['default'].fromEventTarget(el, 'click');
  },

  /**
   * @param {Element} [el = document.body]
   * @returns {EventStream}
   */
  mousemove: function mousemove() {
    var el = arguments[0] === undefined ? document.body : arguments[0];

    return _baconjs2['default'].fromEventTarget(el, 'mousemove');
  },

  /**
   * @param {Element} el
   * @returns {EventStream}
   */
  touchstart: function touchstart(el) {
    return _baconjs2['default'].fromEventTarget(el, 'touchstart');
  },

  /**
   * @param {Element} el
   * @returns {EventStream}
   */
  touchend: function touchend(el) {
    return _baconjs2['default'].fromEventTarget(el, 'touchend');
  },

  /**
   * @param {Element} el
   * @returns {EventStream}
   */
  touchmove: function touchmove(el) {
    return _baconjs2['default'].fromEventTarget(el, 'touchmove');
  },

  /**
   * @param {Element} el
   * @param {Bacon.Bus} [stopBus = new Bacon.Bus()]
   * @returns {EventStream}
   */
  swipe: function swipe(el) {
    var stopBus = arguments[1] === undefined ? new _baconjs2['default'].Bus() : arguments[1];

    var start = this.touchstart(el).doAction('.preventDefault');
    var move = this.touchmove(el).doAction('.preventDefault').throttle(100);
    var end = this.touchend(el).doAction('.preventDefault');

    stopBus.plug(end);

    return start.flatMap(function (initial) {
      var initialValue = {
        init: initial.changedTouches[0].clientX,
        curt: 0
      };
      return move.takeUntil(stopBus).scan(initialValue, function (acc, current) {
        acc.curt = current.changedTouches[0].clientX;
        return acc;
      }).skip(1);
    });
  },

  /**
   * @param {Element} [el = document.body]
   * @returns {EventStream}
   */
  swipeLeft: function swipeLeft() {
    var el = arguments[0] === undefined ? document.body : arguments[0];

    var stopBus = new _baconjs2['default'].Bus();

    return this.swipe(el, stopBus).filter(function (moves) {
      var init = moves.init;
      var curt = moves.curt;

      var delta = curt - init;
      return delta < -10 && stopBus.push(true);
    });
  },

  /**
   * @param {Element} [el = document.body]
   * @returns {EventStream}
   */
  swipeRight: function swipeRight() {
    var el = arguments[0] === undefined ? document.body : arguments[0];

    var stopBus = new _baconjs2['default'].Bus();

    return this.swipe(el, stopBus).filter(function (moves) {
      var init = moves.init;
      var curt = moves.curt;

      var delta = curt - init;
      return delta > 10 && stopBus.push(true);
    });
  },

  /**
   * @returns {EventStream}
   */
  resize: function resize() {
    return _baconjs2['default'].fromEventTarget(window, 'resize');
  },

  /**
   * @returns {EventStream}
   */
  hashchange: function hashchange() {
    return _baconjs2['default'].fromEventTarget(window, 'hashchange');
  }
};

/**
 * @param {Number} keyCode
 * @returns {Function}
 */
function keyCodeIs(keyCode) {
  return function (event) {
    return event.keyCode === keyCode;
  };
}
module.exports = exports['default'];

},{"baconjs":2,"keycode":4}],73:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _baconjs = require('baconjs');

var _baconjs2 = _interopRequireDefault(_baconjs);

/**
 * full screen
 *
 * @param {Element} target
 * @returns void
 */

exports['default'] = function (target) {
  var bus = new _baconjs2['default'].Bus();
  bus.onValue(toggleScreenOf(target));
  return bus;
};

/**
 * @param {Element} el
 * @returns {Function}
 */
function toggleScreenOf(el) {
  var request = undefined,
      exit = undefined;

  if (el.requestFullscreen) {
    request = 'requestFullscreen';
  } else if (el.webkitRequestFullscreen) {
    request = 'webkitRequestFullscreen';
  } else if (el.mozRequestFullScreen) {
    request = 'mozRequestFullScreen';
  } else if (el.msRequestFullscreen) {
    request = 'msRequestFullscreen';
  }

  if (document.exitFullscreen) {
    exit = 'exitFullscreen';
  } else if (document.webkitExitFullscreen) {
    exit = 'webkitExitFullscreen';
  } else if (document.mozCancelFullScreen) {
    exit = 'mozCancelFullScreen';
  } else if (document.msExitFullscreen) {
    exit = 'msExitFullscreen';
  }

  return function () {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
      el[request]();
    } else {
      document[exit]();
    }
  };
}
module.exports = exports['default'];

},{"baconjs":2}],74:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _baconjs = require('baconjs');

var _baconjs2 = _interopRequireDefault(_baconjs);

/**
 * @typedef {Object} PagingOptions
 * @property {Number} startPage
 * @property {Number} endPage
 * @property {Array<Element>} slideElements
 */

/**
 * @typedef {Object} PagingReturns
 * @property {Bacon.EventStream} currentEs
 * @property {Bacon.EventStream} startEs
 * @property {Bacon.EventStream} endEs
 * @property {Bacon.EventStream} changedEs
 * @property {Bacon.EventStream} percentEs
 * @property {Bacon.Bus} nextBus
 * @property {Bacon.Bus} prevBus
 * @property {Bacon.Bus} moveBus
 */

/**
 * paging control
 *
 * @param {PagingOptions} options
 * @returns {PagingReturns}
 */

exports['default'] = function (options) {

  var nextBus = new _baconjs2['default'].Bus();
  var prevBus = new _baconjs2['default'].Bus();
  var moveBus = new _baconjs2['default'].Bus();

  var currentBus = new _baconjs2['default'].Bus();
  var currentPage = currentBus.map(inRangeOf(1, options.endPage)).toProperty(options.startPage || 1).skipDuplicates();

  var nextEs = currentPage.sampledBy(nextBus).map(function (v) {
    return v + 1;
  });
  var prevEs = currentPage.sampledBy(prevBus).map(function (v) {
    return v - 1;
  });
  var moveEs = moveBus.map(function (v) {
    return v /*noop*/;
  });

  var percentString = currentPage.map(percentOf(options.endPage));
  var currentSlide = currentPage.map(function (i) {
    return options.slideElements[i - 1];
  });

  currentBus.plug(nextEs.merge(prevEs).merge(moveEs));

  currentSlide.onValue(function (current) {
    options.slideElements.forEach(toInvisible);
    current && toVisible(current);
  });

  return {
    currentEs: currentPage,
    startEs: currentPage.filter(function (v) {
      return v === 1;
    }),
    endEs: currentPage.filter(function (v) {
      return v === options.endPage;
    }),
    changedEs: currentSlide,
    percentEs: percentString,
    nextBus: nextBus,
    prevBus: prevBus,
    moveBus: moveBus
  };
};

/**
 * @param {Element} el
 */
function toInvisible(el) {
  el.removeAttribute('visible');
}

/**
 * @param {Element} el
 */
function toVisible(el) {
  el.setAttribute('visible', 1);
}

/**
 * @param {Number} min
 * @param {Number} max
 * @returns {Function}
 */
function inRangeOf(min, max) {
  return function (z) {
    return Math.min(max, Math.max(z, min));
  };
}

/**
 * @param {Number} max
 * @returns {Function}
 */
function percentOf(max) {
  return function (current) {
    return 100 / max * current + '%';
  };
}
module.exports = exports['default'];

},{"baconjs":2}],75:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _baconjs = require('baconjs');

var _baconjs2 = _interopRequireDefault(_baconjs);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

/**
 * @typedef {Object} PointerReturns
 * @property {Bacon.Bus} coordBus
 * @property {Bacon.Bus} toggleBus
 */

/**
 * pointer mode
 *
 * @param {Element} target
 * @returns {PointerReturns}
 */

exports['default'] = function (target) {

  var coordBus = new _baconjs2['default'].Bus();
  var toggleBus = new _baconjs2['default'].Bus();

  var x = coordBus.map(function (e) {
    return e.clientX + 'px';
  });
  var y = coordBus.map(function (e) {
    return e.clientY + 'px';
  });

  x.onValue(_util2['default'].styleAssignOf(target, 'left'));
  y.onValue(_util2['default'].styleAssignOf(target, 'top'));

  toggleBus.scan(false, function (acc) {
    return !acc;
  }).map(function (bool) {
    return bool ? 'visible' : 'hidden';
  }).onValue(_util2['default'].styleAssignOf(target, 'visibility'));

  return {
    coordBus: coordBus,
    toggleBus: toggleBus
  };
};

module.exports = exports['default'];

},{"./util":79,"baconjs":2}],76:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

/**
 * query parameters
 */
exports['default'] = parseQuery;

/**
 * @param {String} query
 * @returns {Object}
 */
function parseQuery(query) {
  var ret = {};
  query.slice(1).split('&').map(function (keyEqVal) {
    return keyEqVal.split('=');
  }).forEach(function (kv) {
    return ret[kv[0]] = _util2['default'].getPrimitiveFromString(kv[1]);
  });
  return ret;
}
module.exports = exports['default'];

},{"./util":79}],77:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _baconjs = require('baconjs');

var _baconjs2 = _interopRequireDefault(_baconjs);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

/**
 * @typedef {Object} RatioOptions
 * @property {Number} width
 * @property {Number} height
 * @property {Element} target
 */

/**
 * @typedef {Object} RatioReturns
 * @property {Bacon.Bus} scaleBus
 * @property {Bacon.Property} currentRatio
 */

/**
 * compute ratio
 *
 * @param {RatioOptions} options
 * @returns {RatioReturns}
 */

exports['default'] = function () {
  var options = arguments[0] === undefined ? {} : arguments[0];

  var bus = new _baconjs2['default'].Bus();

  var hRatioFn = horizontalRatioOf(options.width);
  var vRatioFn = verticalRatioOf(options.height);

  var hRatio = bus.map(hRatioFn).toProperty(hRatioFn());
  var vRatio = bus.map(vRatioFn).toProperty(vRatioFn());

  var scale = _util2['default'].compose(centeringOf(options.target), scalingOf(options.target));

  var currentRatio = _baconjs2['default'].combineWith(Math.min, hRatio, vRatio).toProperty();

  currentRatio.onValue(scale);

  return {
    scaleBus: bus,
    currentRatio: currentRatio
  };
};

/**
 * @param {Number} width
 * @returns {Function}
 */
function horizontalRatioOf(width) {
  return function () {
    return window.innerWidth / width;
  };
}

/**
 * @param {Number} height
 * @returns {Function}
 */
function verticalRatioOf(height) {
  return function () {
    return window.innerHeight / height;
  };
}

/**
 * @param {Element} el
 * @returns {Function}
 */
function scalingOf(el) {
  var transform = _util2['default'].stylePrefixDetect('transform');
  return function (ratio) {
    el.style[transform] = 'scale(' + Math.abs(ratio) + ')';
  };
}

/**
 * @param {Element} el
 * @returns {Function}
 */
function centeringOf(el) {
  return function () {
    var rect = el.getBoundingClientRect();
    el.style.left = (window.innerWidth - rect.width) / 2;
    el.style.top = (window.innerHeight - rect.height) / 2;
  };
}
module.exports = exports['default'];

},{"./util":79,"baconjs":2}],78:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

var _markdownIt = require('markdown-it');

var _markdownIt2 = _interopRequireDefault(_markdownIt);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

/**
 * setup markdown
 */
var md = (0, _markdownIt2['default'])({
  langPrefix: 'hljs ',
  highlight: function highlight(str, lang) {
    if (window.hljs == null) {
      console.log('highlight.js (`window.hljs`) is missing');
      return '';
    }

    if (lang && window.hljs.getLanguage(lang)) {
      try {
        return window.hljs.highlight(lang, str).value;
      } catch (__) {
        console.log(__);
      }
    }

    try {
      return window.hljs.highlightAuto(str).value;
    } catch (__) {
      console.log(__);
    }

    return ''; // use external default escaping
  }
});

/**
 * compile markdown
 *
 * @returns void
 */
exports['default'] = {
  compileMarkdown: compileMarkdown,
  extractNote: extractNote
};

/**
 * @param {Element} el
 * @returns {String}
 */
function extractNote(el) {
  var _el$innerHTML$split = el.innerHTML.split(/<hr\s?\/?>/);

  var _el$innerHTML$split2 = _slicedToArray(_el$innerHTML$split, 2);

  var content = _el$innerHTML$split2[0];
  var note = _el$innerHTML$split2[1];

  el.innerHTML = content;

  var container = document.createElement('div');
  container.innerHTML = note || '';
  return (container.textContent || '').replace(/^\n*/, '');
}

/**
 * @param {Element} el
 * @returns {Element}
 */
function compileMarkdown(el) {
  var section = document.createElement('section');
  section.innerHTML = md.render(el.innerHTML);
  _util2['default'].toArray(el.attributes).filter(notTypeAttribute).forEach(copyAttributeTo(section));
  el.parentNode.replaceChild(section, el);
  return section;
}

/**
 * @param {Element} el
 * @returns {Function}
 */
function copyAttributeTo(el) {
  return function (attr) {
    el.setAttribute(attr.name, attr.value);
  };
}

/**
 * @param {AttributeNode} attr
 */
function notTypeAttribute(attr) {
  return attr.name !== 'type';
}
module.exports = exports['default'];

},{"./util":79,"markdown-it":5}],79:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

exports['default'] = {
  /**
   * @param {array} list
   * @returns {Array.<T>}
   */
  toArray: function toArray(list) {
    return Array.prototype.slice.call(list);
  },

  /**
   * @param {Object} orig
   * @param {Object} defaults
   * @returns {Object}
   */
  defaults: function defaults(orig, defs) {
    var ret = this.clone(orig);
    Object.keys(defs).forEach(function (k) {
      if (k in ret) {
        return;
      }
      ret[k] = defs[k];
    });
    return ret;
  },

  /**
   * shallow clone func
   *
   * @param {Object} orig
   * @returns {Object}
   */
  clone: function clone(orig) {
    var ret = {};
    Object.keys(orig).forEach(function (k) {
      return ret[k] = orig[k];
    });
    return ret;
  },

  /**
   * @param {Object} target
   * @param {Object} ...sources
   */
  extend: _objectAssign2['default'],

  /**
   * @param {function} fn...
   * @returns {Function}
   */
  compose: function compose() {
    // http://underscorejs.org/#compose
    var args = arguments;
    var start = args.length - 1;
    return function () {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) {
        result = args[i].call(this, result);
      }
      return result;
    };
  },
  /**
   * @param {string} ident
   * @returns {HTMLElement}
   */
  getById: function getById(ident) {
    return document.getElementById(ident);
  },

  /**
   * @param {Element} el
   */
  textAssignOf: function textAssignOf(el) {
    return function (text) {
      el.textContent = text;
    };
  },

  /**
   * @param {Element} el
   * @param {String} property
   */
  styleAssignOf: function styleAssignOf(el, property) {
    return function (value) {
      el.style[property] = value === '' ? null : value;
    };
  },

  /**
   * @param {Element} el
   * @param {String} attribute
   */
  attributeAssignOf: function attributeAssignOf(el, attribute) {
    return function (value) {
      if (value != null) {
        el.setAttribute(attribute, value);
      } else {
        el.removeAttribute(attribute);
      }
    };
  },

  /**
   * @param {String} src
   */
  preloadImg: function preloadImg(src) {
    var img = document.createElement('img');
    img.onload = function () {
      return img.parentNode.removeChild(img);
    };
    img.src = src;
    img.style.display = 'none';
    document.body.appendChild(img);
  },

  /**
   * @returns {Number}
   */
  getPageNumberFromHash: function getPageNumberFromHash() {
    return parseInt(location.hash.replace('#', ''), 10) || 0;
  },

  /**
   * @returns {*}
   */
  getPrimitiveFromString: function getPrimitiveFromString(str) {
    var ret = str == null ? null : str + '';

    if (str === 'true') {
      ret = true;
    } else if (str === 'false') {
      ret = false;
    } else if (str == null) {
      ret = null;
    } else if (str.match(/^\d+$/)) {
      ret = parseInt(str, 10);
    }

    return ret;
  },

  /**
   * @param {String} property
   * @returns {String}
   */
  stylePrefixDetect: function stylePrefixDetect(property) {
    var validProperty = undefined;
    var styles = this.toArray(window.getComputedStyle(document.documentElement, ''));
    var includes = function includes(needle) {
      return styles.indexOf(needle) !== -1;
    };

    if (includes('-webkit-' + property)) {
      validProperty = '-webkit-' + property;
    } else if (includes('-moz-' + property)) {
      validProperty = '-moz-' + property;
    } else if (includes('-ms-' + property)) {
      validProperty = '-ms-' + property;
    } else if (includes(property)) {
      validProperty = property;
    }

    return validProperty;
  }
};
module.exports = exports['default'];

},{"object-assign":70}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYTEzMDQyL0Ryb3Bib3gvUGxheWdyb3VuZC9UYWxraWUvc3JjL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2JhY29uanMvZGlzdC9CYWNvbi5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wdW55Y29kZS9wdW55Y29kZS5qcyIsIm5vZGVfbW9kdWxlcy9rZXljb2RlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL21hcmtkb3duLWl0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL21hcmtkb3duLWl0L2xpYi9jb21tb24vZW50aXRpZXMuanMiLCJub2RlX21vZHVsZXMvbWFya2Rvd24taXQvbGliL2NvbW1vbi9odG1sX2Jsb2Nrcy5qcyIsIm5vZGVfbW9kdWxlcy9tYXJrZG93bi1pdC9saWIvY29tbW9uL2h0bWxfcmUuanMiLCJub2RlX21vZHVsZXMvbWFya2Rvd24taXQvbGliL2NvbW1vbi91cmxfc2NoZW1hcy5qcyIsIm5vZGVfbW9kdWxlcy9tYXJrZG93bi1pdC9saWIvY29tbW9uL3V0aWxzLmpzIiwibm9kZV9tb2R1bGVzL21hcmtkb3duLWl0L2xpYi9oZWxwZXJzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL21hcmtkb3duLWl0L2xpYi9oZWxwZXJzL3BhcnNlX2xpbmtfZGVzdGluYXRpb24uanMiLCJub2RlX21vZHVsZXMvbWFya2Rvd24taXQvbGliL2hlbHBlcnMvcGFyc2VfbGlua19sYWJlbC5qcyIsIm5vZGVfbW9kdWxlcy9tYXJrZG93bi1pdC9saWIvaGVscGVycy9wYXJzZV9saW5rX3RpdGxlLmpzIiwibm9kZV9tb2R1bGVzL21hcmtkb3duLWl0L2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9tYXJrZG93bi1pdC9saWIvcGFyc2VyX2Jsb2NrLmpzIiwibm9kZV9tb2R1bGVzL21hcmtkb3duLWl0L2xpYi9wYXJzZXJfY29yZS5qcyIsIm5vZGVfbW9kdWxlcy9tYXJrZG93bi1pdC9saWIvcGFyc2VyX2lubGluZS5qcyIsIm5vZGVfbW9kdWxlcy9tYXJrZG93bi1pdC9saWIvcHJlc2V0cy9jb21tb25tYXJrLmpzIiwibm9kZV9tb2R1bGVzL21hcmtkb3duLWl0L2xpYi9wcmVzZXRzL2RlZmF1bHQuanMiLCJub2RlX21vZHVsZXMvbWFya2Rvd24taXQvbGliL3ByZXNldHMvemVyby5qcyIsIm5vZGVfbW9kdWxlcy9tYXJrZG93bi1pdC9saWIvcmVuZGVyZXIuanMiLCJub2RlX21vZHVsZXMvbWFya2Rvd24taXQvbGliL3J1bGVyLmpzIiwibm9kZV9tb2R1bGVzL21hcmtkb3duLWl0L2xpYi9ydWxlc19ibG9jay9ibG9ja3F1b3RlLmpzIiwibm9kZV9tb2R1bGVzL21hcmtkb3duLWl0L2xpYi9ydWxlc19ibG9jay9jb2RlLmpzIiwibm9kZV9tb2R1bGVzL21hcmtkb3duLWl0L2xpYi9ydWxlc19ibG9jay9mZW5jZS5qcyIsIm5vZGVfbW9kdWxlcy9tYXJrZG93bi1pdC9saWIvcnVsZXNfYmxvY2svaGVhZGluZy5qcyIsIm5vZGVfbW9kdWxlcy9tYXJrZG93bi1pdC9saWIvcnVsZXNfYmxvY2svaHIuanMiLCJub2RlX21vZHVsZXMvbWFya2Rvd24taXQvbGliL3J1bGVzX2Jsb2NrL2h0bWxfYmxvY2suanMiLCJub2RlX21vZHVsZXMvbWFya2Rvd24taXQvbGliL3J1bGVzX2Jsb2NrL2xoZWFkaW5nLmpzIiwibm9kZV9tb2R1bGVzL21hcmtkb3duLWl0L2xpYi9ydWxlc19ibG9jay9saXN0LmpzIiwibm9kZV9tb2R1bGVzL21hcmtkb3duLWl0L2xpYi9ydWxlc19ibG9jay9wYXJhZ3JhcGguanMiLCJub2RlX21vZHVsZXMvbWFya2Rvd24taXQvbGliL3J1bGVzX2Jsb2NrL3JlZmVyZW5jZS5qcyIsIm5vZGVfbW9kdWxlcy9tYXJrZG93bi1pdC9saWIvcnVsZXNfYmxvY2svc3RhdGVfYmxvY2suanMiLCJub2RlX21vZHVsZXMvbWFya2Rvd24taXQvbGliL3J1bGVzX2Jsb2NrL3RhYmxlLmpzIiwibm9kZV9tb2R1bGVzL21hcmtkb3duLWl0L2xpYi9ydWxlc19jb3JlL2Jsb2NrLmpzIiwibm9kZV9tb2R1bGVzL21hcmtkb3duLWl0L2xpYi9ydWxlc19jb3JlL2lubGluZS5qcyIsIm5vZGVfbW9kdWxlcy9tYXJrZG93bi1pdC9saWIvcnVsZXNfY29yZS9saW5raWZ5LmpzIiwibm9kZV9tb2R1bGVzL21hcmtkb3duLWl0L2xpYi9ydWxlc19jb3JlL25vcm1hbGl6ZS5qcyIsIm5vZGVfbW9kdWxlcy9tYXJrZG93bi1pdC9saWIvcnVsZXNfY29yZS9yZXBsYWNlbWVudHMuanMiLCJub2RlX21vZHVsZXMvbWFya2Rvd24taXQvbGliL3J1bGVzX2NvcmUvc21hcnRxdW90ZXMuanMiLCJub2RlX21vZHVsZXMvbWFya2Rvd24taXQvbGliL3J1bGVzX2NvcmUvc3RhdGVfY29yZS5qcyIsIm5vZGVfbW9kdWxlcy9tYXJrZG93bi1pdC9saWIvcnVsZXNfaW5saW5lL2F1dG9saW5rLmpzIiwibm9kZV9tb2R1bGVzL21hcmtkb3duLWl0L2xpYi9ydWxlc19pbmxpbmUvYmFja3RpY2tzLmpzIiwibm9kZV9tb2R1bGVzL21hcmtkb3duLWl0L2xpYi9ydWxlc19pbmxpbmUvZW1waGFzaXMuanMiLCJub2RlX21vZHVsZXMvbWFya2Rvd24taXQvbGliL3J1bGVzX2lubGluZS9lbnRpdHkuanMiLCJub2RlX21vZHVsZXMvbWFya2Rvd24taXQvbGliL3J1bGVzX2lubGluZS9lc2NhcGUuanMiLCJub2RlX21vZHVsZXMvbWFya2Rvd24taXQvbGliL3J1bGVzX2lubGluZS9odG1sX2lubGluZS5qcyIsIm5vZGVfbW9kdWxlcy9tYXJrZG93bi1pdC9saWIvcnVsZXNfaW5saW5lL2ltYWdlLmpzIiwibm9kZV9tb2R1bGVzL21hcmtkb3duLWl0L2xpYi9ydWxlc19pbmxpbmUvbGluay5qcyIsIm5vZGVfbW9kdWxlcy9tYXJrZG93bi1pdC9saWIvcnVsZXNfaW5saW5lL25ld2xpbmUuanMiLCJub2RlX21vZHVsZXMvbWFya2Rvd24taXQvbGliL3J1bGVzX2lubGluZS9zdGF0ZV9pbmxpbmUuanMiLCJub2RlX21vZHVsZXMvbWFya2Rvd24taXQvbGliL3J1bGVzX2lubGluZS9zdHJpa2V0aHJvdWdoLmpzIiwibm9kZV9tb2R1bGVzL21hcmtkb3duLWl0L2xpYi9ydWxlc19pbmxpbmUvdGV4dC5qcyIsIm5vZGVfbW9kdWxlcy9tYXJrZG93bi1pdC9saWIvdG9rZW4uanMiLCJub2RlX21vZHVsZXMvbWFya2Rvd24taXQvbm9kZV9tb2R1bGVzL2VudGl0aWVzL21hcHMvZW50aXRpZXMuanNvbiIsIm5vZGVfbW9kdWxlcy9tYXJrZG93bi1pdC9ub2RlX21vZHVsZXMvbGlua2lmeS1pdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9tYXJrZG93bi1pdC9ub2RlX21vZHVsZXMvbGlua2lmeS1pdC9saWIvcmUuanMiLCJub2RlX21vZHVsZXMvbWFya2Rvd24taXQvbm9kZV9tb2R1bGVzL21kdXJsL2RlY29kZS5qcyIsIm5vZGVfbW9kdWxlcy9tYXJrZG93bi1pdC9ub2RlX21vZHVsZXMvbWR1cmwvZW5jb2RlLmpzIiwibm9kZV9tb2R1bGVzL21hcmtkb3duLWl0L25vZGVfbW9kdWxlcy9tZHVybC9mb3JtYXQuanMiLCJub2RlX21vZHVsZXMvbWFya2Rvd24taXQvbm9kZV9tb2R1bGVzL21kdXJsL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL21hcmtkb3duLWl0L25vZGVfbW9kdWxlcy9tZHVybC9wYXJzZS5qcyIsIm5vZGVfbW9kdWxlcy9tYXJrZG93bi1pdC9ub2RlX21vZHVsZXMvdWMubWljcm8vY2F0ZWdvcmllcy9DYy9yZWdleC5qcyIsIm5vZGVfbW9kdWxlcy9tYXJrZG93bi1pdC9ub2RlX21vZHVsZXMvdWMubWljcm8vY2F0ZWdvcmllcy9DZi9yZWdleC5qcyIsIm5vZGVfbW9kdWxlcy9tYXJrZG93bi1pdC9ub2RlX21vZHVsZXMvdWMubWljcm8vY2F0ZWdvcmllcy9QL3JlZ2V4LmpzIiwibm9kZV9tb2R1bGVzL21hcmtkb3duLWl0L25vZGVfbW9kdWxlcy91Yy5taWNyby9jYXRlZ29yaWVzL1ovcmVnZXguanMiLCJub2RlX21vZHVsZXMvbWFya2Rvd24taXQvbm9kZV9tb2R1bGVzL3VjLm1pY3JvL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL21hcmtkb3duLWl0L25vZGVfbW9kdWxlcy91Yy5taWNyby9wcm9wZXJ0aWVzL0FueS9yZWdleC5qcyIsIm5vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwiL1VzZXJzL2ExMzA0Mi9Ecm9wYm94L1BsYXlncm91bmQvVGFsa2llL3NyYy9iYWNrZmFjZS5qcyIsIi9Vc2Vycy9hMTMwNDIvRHJvcGJveC9QbGF5Z3JvdW5kL1RhbGtpZS9zcmMvY29udHJvbC5qcyIsIi9Vc2Vycy9hMTMwNDIvRHJvcGJveC9QbGF5Z3JvdW5kL1RhbGtpZS9zcmMvZnVsbHNjcmVlbi5qcyIsIi9Vc2Vycy9hMTMwNDIvRHJvcGJveC9QbGF5Z3JvdW5kL1RhbGtpZS9zcmMvcGFnaW5nLmpzIiwiL1VzZXJzL2ExMzA0Mi9Ecm9wYm94L1BsYXlncm91bmQvVGFsa2llL3NyYy9wb2ludGVyLmpzIiwiL1VzZXJzL2ExMzA0Mi9Ecm9wYm94L1BsYXlncm91bmQvVGFsa2llL3NyYy9xdWVyeS5qcyIsIi9Vc2Vycy9hMTMwNDIvRHJvcGJveC9QbGF5Z3JvdW5kL1RhbGtpZS9zcmMvcmVzcG9uc2l2ZS5qcyIsIi9Vc2Vycy9hMTMwNDIvRHJvcGJveC9QbGF5Z3JvdW5kL1RhbGtpZS9zcmMvc2xpZGUuanMiLCIvVXNlcnMvYTEzMDQyL0Ryb3Bib3gvUGxheWdyb3VuZC9UYWxraWUvc3JjL3V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7Ozs7Ozs7Ozt1QkFLTyxTQUFTOzs7O29CQUVULFFBQVE7Ozs7dUJBQ1IsV0FBVzs7OztxQkFDWCxTQUFTOzs7O3FCQUVMLFNBQVM7Ozs7c0JBQ1QsVUFBVTs7OzswQkFDVixjQUFjOzs7OzBCQUNkLGNBQWM7Ozs7dUJBQ2QsV0FBVzs7Ozt3QkFDWCxZQUFZOzs7O0FBRXBDLElBQU0sVUFBVSxHQUFPLE1BQU0sQ0FBQztBQUM5QixJQUFNLFVBQVUsR0FBTyxNQUFNLENBQUM7QUFDOUIsSUFBTSxZQUFZLEdBQUssUUFBUSxDQUFDO0FBQ2hDLElBQU0sYUFBYSxHQUFJLFNBQVMsQ0FBQztBQUNqQyxJQUFNLFVBQVUsR0FBTyxNQUFNLENBQUM7QUFDOUIsSUFBTSxXQUFXLEdBQU0sT0FBTyxDQUFDO0FBQy9CLElBQU0sY0FBYyxHQUFHLFVBQVUsQ0FBQztBQUNsQyxJQUFNLGFBQWEsR0FBSSxTQUFTLENBQUM7QUFDakMsSUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDOztBQUVsQyxJQUFNLFdBQVcsR0FBRywwQkFBMEIsQ0FBQzs7QUFFL0MsSUFBTSxXQUFXLEdBQUssUUFBUSxDQUFDO0FBQy9CLElBQU0sWUFBWSxHQUFJLFNBQVMsQ0FBQztBQUNoQyxJQUFNLFNBQVMsR0FBTyxNQUFNLENBQUM7QUFDN0IsSUFBTSxhQUFhLEdBQUcsZUFBZSxDQUFDOztBQUV0QyxJQUFNLFlBQVksR0FBSSxJQUFJLENBQUM7QUFDM0IsSUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDO0FBQzFCLElBQU0sVUFBVSxHQUFNLElBQUksQ0FBQztBQUMzQixJQUFNLFdBQVcsR0FBSyxHQUFHLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBZVgsWUFBdUI7TUFBZCxPQUFPLGdDQUFHLEVBQUU7O0FBQ2xDLFNBQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRztBQUNwQyxRQUFJLEVBQVMsSUFBSTtBQUNqQixRQUFJLG1CQUFhO0FBQ2pCLFdBQU8sc0JBQWE7QUFDcEIsU0FBSyxvQkFBYTtBQUNsQixTQUFLLG9CQUFjO0FBQ25CLFVBQU0scUJBQWM7QUFDcEIsY0FBVSx5QkFBYztBQUN4QixjQUFVLHlCQUFjO0FBQ3hCLFdBQU8sc0JBQWM7QUFDckIsWUFBUSx1QkFBYztBQUN0QixTQUFLLHNCQUFhO0dBQ25CLENBQUM7Q0FDSDs7Ozs7QUFLRCxTQUFTLElBQUksR0FBZ0I7TUFBZixRQUFRLGdDQUFHLEVBQUU7Ozs7OztBQU16QixNQUFJLE9BQU8sR0FBRyxrQkFBSyxNQUFNLENBQUMsa0JBQUssUUFBUSxDQUFDLFFBQVEsRUFBRTtBQUNoRCxPQUFHLEVBQVksS0FBSztBQUNwQixRQUFJLEVBQVcsS0FBSztBQUNwQixXQUFPLEVBQVEsSUFBSTtBQUNuQixXQUFPLEVBQVEsSUFBSTtBQUNuQixZQUFRLEVBQU8sSUFBSTtBQUNuQixZQUFRLEVBQU8sSUFBSTtBQUNuQixnQkFBWSxFQUFHLEtBQUs7R0FDckIsQ0FBQyxFQUFFLHdCQUFNLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzs7OztBQUs1QixNQUFJLEtBQUssR0FBSSxPQUFPLENBQUMsSUFBSSxHQUFHLFVBQVUsR0FBRyxZQUFZLENBQUM7QUFDdEQsTUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLElBQUksR0FBRyxXQUFXLEdBQUcsYUFBYSxDQUFDO0FBQ3hELFVBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsa0JBQWtCLENBQUMsV0FBVyw4Q0FHdEQsWUFBWSwyQkFDSixLQUFLLHdDQUNKLE1BQU0sMkNBR3JCLENBQUM7Ozs7Ozs7O0FBUUYsTUFBSSxHQUFHLEdBQUcsa0JBQUssT0FBTyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0FBQy9ELEtBQUcsQ0FBQyxPQUFPLENBQUMsbUJBQU8sZUFBZSxDQUFDLENBQUM7QUFDcEMsTUFBSSxNQUFNLEdBQUcsa0JBQUssT0FBTyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsT0FBSyxXQUFXLE9BQUksQ0FBQyxDQUFDO0FBQ3pFLFFBQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxFQUFFLEVBQUUsQ0FBQztXQUFLLGtCQUFLLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQUEsQ0FBQyxDQUFDO0FBQ3hFLE1BQUksS0FBSyxHQUFJLEVBQUUsQ0FBQztBQUNoQixRQUFNLENBQUMsR0FBRyxDQUFDLG1CQUFPLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUcsRUFBRSxDQUFDO1dBQUssS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHO0dBQUEsQ0FBQyxDQUFDOzs7OztBQUt2RSxVQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsc0JBQy9CLFlBQVksa0JBQ3ZCLENBQUM7QUFDSCxNQUFJLFFBQVEsR0FBRyxrQkFBSyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDMUMsUUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEVBQUU7V0FBSyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztHQUFBLENBQUMsQ0FBQzs7QUFFakQsTUFBSSxVQUFVLEdBQUcsNkJBQVk7QUFDM0IsU0FBSyxFQUFJLEtBQUs7QUFDZCxVQUFNLEVBQUcsTUFBTTtBQUNmLFVBQU0sRUFBRyxRQUFRO0dBQ2xCLENBQUMsQ0FBQztBQUNILFlBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLHFCQUFRLE1BQU0sRUFBRSxDQUFDLENBQUM7Ozs7O0FBSzNDLE1BQUksTUFBTSxHQUFHLHlCQUFRO0FBQ25CLGFBQVMsRUFBTyxrQkFBSyxxQkFBcUIsRUFBRSxJQUFJLENBQUM7QUFDakQsV0FBTyxFQUFTLE1BQU0sQ0FBQyxNQUFNO0FBQzdCLGlCQUFhLEVBQUcsTUFBTTtHQUN2QixDQUFDLENBQUM7O0FBRUgsUUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQVEsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzVELFFBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFRLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7QUFFM0QsUUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQVEsU0FBUyxFQUFFLENBQUMsQ0FBQztBQUN6QyxRQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBUSxVQUFVLEVBQUUsQ0FBQyxDQUFDOzs7QUFHMUMsUUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQVEsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDLGtCQUFLLHFCQUFxQixDQUFDLENBQUMsQ0FBQztBQUMxRSxRQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBSztBQUNqQyxBQUFDLFFBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFNLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBLEFBQUMsQ0FBQztHQUMxRCxDQUFDLENBQUM7OztBQUdILFFBQU0sQ0FBQyxTQUFTLENBQ2IsR0FBRyxDQUFDLGVBQWUsRUFBRSxXQUFXLENBQUMsQ0FDakMsT0FBTyxDQUFDLGtCQUFLLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQzs7Ozs7QUFLaEUsTUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFO0FBQ3hCLHlCQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDVixPQUFPLENBQUMsa0JBQUssaUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO0dBQ2xFOztBQUVELE1BQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtBQUNuQixZQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsZ0JBQWMsYUFBYSxjQUFXLENBQUM7O29CQUN2RCwwQkFBUyxrQkFBSyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7O1FBQTVELFFBQVEsYUFBUixRQUFRO1FBQUUsU0FBUyxhQUFULFNBQVM7O0FBQ3hCLFlBQVEsQ0FBQyxJQUFJLENBQUMscUJBQVEsU0FBUyxFQUFFLENBQUMsQ0FBQztBQUNuQyxhQUFTLENBQUMsSUFBSSxDQUFDLHFCQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0dBQ2xDOztBQUVELE1BQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtBQUNwQixZQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsZ0JBQWMsY0FBYyxjQUFXLENBQUM7O3FCQUNwRCwyQkFBVSxrQkFBSyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7O1FBQWxFLFVBQVUsY0FBVixVQUFVO1FBQUUsV0FBVyxjQUFYLFdBQVc7O0FBQzVCLGNBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2xDLGVBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0dBQ3BDOztBQUVELE1BQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtBQUNuQixZQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsd0JBQy9CLGFBQWEsaUNBQ1AsVUFBVSwyQ0FDUixVQUFVLGdDQUEyQixXQUFXLHNDQUNyRCxVQUFVLHdDQUV4QixDQUFDOztBQUVILFFBQUksTUFBTSxHQUFHLGtCQUFLLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0QyxRQUFJLE1BQU0sR0FBRyxrQkFBSyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7OztBQUd0QyxVQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBUSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7O0FBRzNDLFVBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFRLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzs7QUFHM0MsVUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsa0JBQUssWUFBWSxDQUFDLGtCQUFLLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7OztBQUd0RSx5QkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBSyxZQUFZLENBQUMsa0JBQUssT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztHQUNqRjs7QUFFRCxNQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUU7QUFDcEIsWUFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLGdCQUFjLGNBQWMsY0FBVyxDQUFDOzs7QUFHcEYsVUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsa0JBQUssYUFBYSxDQUFDLGtCQUFLLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0dBQ3JGOzs7OztBQUtELCtCQUFZLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBY2xELFNBQU87QUFDTCxTQUFLLHNCQUFVO0FBQ2YsV0FBTyxzQkFBVTtBQUNqQixXQUFPLEVBQUcsTUFBTSxDQUFDLFNBQVM7QUFDMUIsUUFBSSxFQUFNLE1BQU0sQ0FBQyxPQUFPO0FBQ3hCLFFBQUksRUFBTSxNQUFNLENBQUMsT0FBTztBQUN4QixRQUFJLEVBQU0sTUFBTSxDQUFDLE9BQU87QUFDeEIsU0FBSyxFQUFLLFVBQVUsQ0FBQyxZQUFZO0FBQ2pDLFNBQUssRUFBSyxLQUFLO0dBQ2hCLENBQUM7Q0FDSDs7OztBQy9PRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3Z6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMzZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDelFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BpQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckpBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeG1CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4VEE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQSxZQUFZLENBQUM7Ozs7Ozs7O3VCQUVLLFNBQVM7Ozs7b0JBQ1QsUUFBUTs7OztBQUUxQixJQUFNLGFBQWEsR0FBSSxVQUFVLENBQUM7QUFDbEMsSUFBTSxXQUFXLEdBQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7Ozs7OztxQkFjMUIsVUFBUyxNQUFNLEVBQUU7O0FBRTlCLE1BQUksVUFBVSxHQUFHLElBQUkscUJBQU0sR0FBRyxFQUFFLENBQUM7QUFDakMsTUFBSSxXQUFXLEdBQUcsSUFBSSxxQkFBTSxHQUFHLEVBQUUsQ0FBQzs7O0FBR2xDLFlBQVUsQ0FDUCxHQUFHLENBQUMsZUFBZSxFQUFFLGFBQWEsQ0FBQyxDQUNuQyxHQUFHLENBQUMsVUFBQyxHQUFHO1dBQUssR0FBRyxZQUFVLEdBQUcsU0FBTSxFQUFFO0dBQUEsQ0FBQyxDQUN0QyxPQUFPLENBQUMsa0JBQUssYUFBYSxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7OztBQUczRCxhQUFXLENBQ1IsR0FBRyxDQUFDLGVBQWUsRUFBRSxXQUFXLENBQUMsQ0FDakMsT0FBTyxDQUFDLGtCQUFLLGFBQWEsQ0FBQyxNQUFNLEVBQUUsa0JBQUssaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUV6RSx1QkFBTSxTQUFTLENBQUMsa0JBQUssT0FBTyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsT0FBSyxhQUFhLE9BQUksQ0FBQyxDQUFDLENBQzNFLEdBQUcsQ0FBQyxlQUFlLEVBQUUsYUFBYSxDQUFDLENBQ25DLE1BQU0sQ0FBQyxVQUFDLENBQUM7V0FBSyxDQUFDLENBQUMsQ0FBQztHQUFBLENBQUMsQ0FDbEIsT0FBTyxDQUFDLGtCQUFLLFVBQVUsQ0FBQyxDQUFDOztBQUU1QixTQUFPO0FBQ0wsY0FBVSxFQUFJLFVBQVU7QUFDeEIsZUFBVyxFQUFHLFdBQVc7R0FDMUIsQ0FBQztDQUNIOzs7OztBQzdDRCxZQUFZLENBQUM7Ozs7Ozs7O3VCQUVPLFNBQVM7Ozs7dUJBQ1QsU0FBUzs7OztBQUU3QixJQUFNLFdBQVcsR0FBRyxxQkFBTSxlQUFlLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzdELElBQU0sYUFBYSxHQUFHLHFCQUFNLGVBQWUsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7Ozs7O3FCQUtsRDs7Ozs7QUFLYixLQUFHLEVBQUEsYUFBQyxPQUFPLEVBQUU7QUFDWCxRQUFJLE9BQU8sR0FBRyxPQUFPLE9BQU8sS0FBSyxRQUFRLEdBQUcsMEJBQVEsT0FBTyxDQUFDLEdBQ2hCLE9BQU8sQ0FBQztBQUNwRCxXQUFPLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7R0FDL0M7Ozs7OztBQU1ELFNBQU8sRUFBQSxpQkFBQyxPQUFPLEVBQUU7QUFDZixRQUFJLE9BQU8sR0FBRyxPQUFPLE9BQU8sS0FBSyxRQUFRLEdBQUcsMEJBQVEsT0FBTyxDQUFDLEdBQ2hCLE9BQU8sQ0FBQztBQUNwRCxXQUFPLGFBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7R0FDakQ7Ozs7OztBQU1ELE9BQUssRUFBQSxlQUFDLEVBQUUsRUFBRTtBQUNSLFdBQU8scUJBQU0sZUFBZSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztHQUMzQzs7Ozs7O0FBTUQsV0FBUyxFQUFBLHFCQUFxQjtRQUFwQixFQUFFLGdDQUFHLFFBQVEsQ0FBQyxJQUFJOztBQUMxQixXQUFPLHFCQUFNLGVBQWUsQ0FBQyxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7R0FDL0M7Ozs7OztBQU1ELFlBQVUsRUFBQSxvQkFBQyxFQUFFLEVBQUU7QUFDYixXQUFPLHFCQUFNLGVBQWUsQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7R0FDaEQ7Ozs7OztBQU1ELFVBQVEsRUFBQSxrQkFBQyxFQUFFLEVBQUU7QUFDWCxXQUFPLHFCQUFNLGVBQWUsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7R0FDOUM7Ozs7OztBQU1ELFdBQVMsRUFBQSxtQkFBQyxFQUFFLEVBQUU7QUFDWixXQUFPLHFCQUFNLGVBQWUsQ0FBQyxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7R0FDL0M7Ozs7Ozs7QUFPRCxPQUFLLEVBQUEsZUFBQyxFQUFFLEVBQTZCO1FBQTNCLE9BQU8sZ0NBQUcsSUFBSSxxQkFBTSxHQUFHLEVBQUU7O0FBQ2pDLFFBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDNUQsUUFBSSxJQUFJLEdBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDekUsUUFBSSxHQUFHLEdBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs7QUFFMUQsV0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFbEIsV0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVMsT0FBTyxFQUFFO0FBQ3JDLFVBQUksWUFBWSxHQUFHO0FBQ2pCLFlBQUksRUFBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87QUFDeEMsWUFBSSxFQUFHLENBQUM7T0FDVCxDQUFDO0FBQ0YsYUFBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsVUFBUyxHQUFHLEVBQUUsT0FBTyxFQUFFO0FBQ3ZFLFdBQUcsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDN0MsZUFBTyxHQUFHLENBQUM7T0FDWixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ1osQ0FBQyxDQUFDO0dBQ0o7Ozs7OztBQU1ELFdBQVMsRUFBQSxxQkFBcUI7UUFBcEIsRUFBRSxnQ0FBRyxRQUFRLENBQUMsSUFBSTs7QUFDMUIsUUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBTSxHQUFHLEVBQUUsQ0FBQzs7QUFFOUIsV0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxLQUFLLEVBQUs7VUFDMUMsSUFBSSxHQUFVLEtBQUssQ0FBbkIsSUFBSTtVQUFFLElBQUksR0FBSSxLQUFLLENBQWIsSUFBSTs7QUFDZixVQUFJLEtBQUssR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ3hCLGFBQU8sS0FBSyxHQUFHLENBQUMsRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDMUMsQ0FBQyxDQUFDO0dBQ0o7Ozs7OztBQU1ELFlBQVUsRUFBQSxzQkFBcUI7UUFBcEIsRUFBRSxnQ0FBRyxRQUFRLENBQUMsSUFBSTs7QUFDM0IsUUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBTSxHQUFHLEVBQUUsQ0FBQzs7QUFFOUIsV0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxLQUFLLEVBQUs7VUFDMUMsSUFBSSxHQUFVLEtBQUssQ0FBbkIsSUFBSTtVQUFFLElBQUksR0FBSSxLQUFLLENBQWIsSUFBSTs7QUFDZixVQUFJLEtBQUssR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ3hCLGFBQU8sS0FBSyxHQUFHLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3pDLENBQUMsQ0FBQztHQUNKOzs7OztBQUtELFFBQU0sRUFBQSxrQkFBRztBQUNQLFdBQU8scUJBQU0sZUFBZSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztHQUNoRDs7Ozs7QUFLRCxZQUFVLEVBQUEsc0JBQUc7QUFDWCxXQUFPLHFCQUFNLGVBQWUsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7R0FDcEQ7Q0FDRjs7Ozs7O0FBTUQsU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFO0FBQzFCLFNBQU8sVUFBUyxLQUFLLEVBQUU7QUFDckIsV0FBTyxLQUFLLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQztHQUNsQyxDQUFDO0NBQ0g7Ozs7QUNuSkQsWUFBWSxDQUFDOzs7Ozs7Ozt1QkFFTyxTQUFTOzs7Ozs7Ozs7OztxQkFRZCxVQUFTLE1BQU0sRUFBRTtBQUM5QixNQUFJLEdBQUcsR0FBRyxJQUFJLHFCQUFNLEdBQUcsRUFBRSxDQUFDO0FBQzFCLEtBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDcEMsU0FBTyxHQUFHLENBQUM7Q0FDWjs7Ozs7O0FBTUQsU0FBUyxjQUFjLENBQUMsRUFBRSxFQUFFO0FBQzFCLE1BQUksT0FBTyxZQUFBO01BQUUsSUFBSSxZQUFBLENBQUM7O0FBRWxCLE1BQUksRUFBRSxDQUFDLGlCQUFpQixFQUFFO0FBQ3hCLFdBQU8sR0FBRyxtQkFBbUIsQ0FBQztHQUMvQixNQUFNLElBQUksRUFBRSxDQUFDLHVCQUF1QixFQUFFO0FBQ3JDLFdBQU8sR0FBRyx5QkFBeUIsQ0FBQztHQUNyQyxNQUFNLElBQUksRUFBRSxDQUFDLG9CQUFvQixFQUFFO0FBQ2xDLFdBQU8sR0FBRyxzQkFBc0IsQ0FBQztHQUNsQyxNQUFNLElBQUksRUFBRSxDQUFDLG1CQUFtQixFQUFFO0FBQ2pDLFdBQU8sR0FBRyxxQkFBcUIsQ0FBQztHQUNqQzs7QUFFRCxNQUFJLFFBQVEsQ0FBQyxjQUFjLEVBQUU7QUFDM0IsUUFBSSxHQUFHLGdCQUFnQixDQUFDO0dBQ3pCLE1BQU0sSUFBSSxRQUFRLENBQUMsb0JBQW9CLEVBQUU7QUFDeEMsUUFBSSxHQUFHLHNCQUFzQixDQUFDO0dBQy9CLE1BQU0sSUFBSSxRQUFRLENBQUMsbUJBQW1CLEVBQUU7QUFDdkMsUUFBSSxHQUFHLHFCQUFxQixDQUFDO0dBQzlCLE1BQU0sSUFBSSxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7QUFDcEMsUUFBSSxHQUFHLGtCQUFrQixDQUFDO0dBQzNCOztBQUVELFNBQU8sWUFBVztBQUNoQixRQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixJQUM3QixDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsSUFDOUIsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLElBQ2pDLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFO0FBQy9CLFFBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO0tBQ2YsTUFBTTtBQUNMLGNBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0tBQ2xCO0dBQ0YsQ0FBQztDQUNIOzs7O0FDckRELFlBQVksQ0FBQzs7Ozs7Ozs7dUJBRU8sU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQTJCZCxVQUFTLE9BQU8sRUFBRTs7QUFFL0IsTUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBTSxHQUFHLEVBQUUsQ0FBQztBQUM5QixNQUFJLE9BQU8sR0FBRyxJQUFJLHFCQUFNLEdBQUcsRUFBRSxDQUFDO0FBQzlCLE1BQUksT0FBTyxHQUFHLElBQUkscUJBQU0sR0FBRyxFQUFFLENBQUM7O0FBRTlCLE1BQUksVUFBVSxHQUFJLElBQUkscUJBQU0sR0FBRyxFQUFFLENBQUM7QUFDbEMsTUFBSSxXQUFXLEdBQUcsVUFBVSxDQUN6QixHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FDbEMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLENBQ2xDLGNBQWMsRUFBRSxDQUFDOztBQUVwQixNQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUM7V0FBSyxDQUFDLEdBQUcsQ0FBQztHQUFBLENBQUMsQ0FBQztBQUM5RCxNQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUM7V0FBSyxDQUFDLEdBQUcsQ0FBQztHQUFBLENBQUMsQ0FBQztBQUM5RCxNQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQztXQUFLLENBQUM7R0FBQSxDQUFVLENBQUM7O0FBRTVDLE1BQUksYUFBYSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ2hFLE1BQUksWUFBWSxHQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDO1dBQUssT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQUEsQ0FBQyxDQUFDOztBQUV6RSxZQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7O0FBRXBELGNBQVksQ0FBQyxPQUFPLENBQUMsVUFBUyxPQUFPLEVBQUU7QUFDckMsV0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDM0MsV0FBTyxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztHQUMvQixDQUFDLENBQUM7O0FBRUgsU0FBTztBQUNMLGFBQVMsRUFBRyxXQUFXO0FBQ3ZCLFdBQU8sRUFBSyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQzthQUFLLENBQUMsS0FBSyxDQUFDO0tBQUEsQ0FBQztBQUM5QyxTQUFLLEVBQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQUM7YUFBSyxDQUFDLEtBQUssT0FBTyxDQUFDLE9BQU87S0FBQSxDQUFDO0FBQzVELGFBQVMsRUFBRyxZQUFZO0FBQ3hCLGFBQVMsRUFBRyxhQUFhO0FBQ3pCLFdBQU8sRUFBSyxPQUFPO0FBQ25CLFdBQU8sRUFBSyxPQUFPO0FBQ25CLFdBQU8sRUFBSyxPQUFPO0dBQ3BCLENBQUM7Q0FDSDs7Ozs7QUFLRCxTQUFTLFdBQVcsQ0FBQyxFQUFFLEVBQUU7QUFDdkIsSUFBRSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztDQUMvQjs7Ozs7QUFLRCxTQUFTLFNBQVMsQ0FBQyxFQUFFLEVBQUU7QUFDckIsSUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDL0I7Ozs7Ozs7QUFPRCxTQUFTLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQzNCLFNBQU8sVUFBUyxDQUFDLEVBQUU7QUFDakIsV0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0dBQ3hDLENBQUM7Q0FDSDs7Ozs7O0FBTUQsU0FBUyxTQUFTLENBQUMsR0FBRyxFQUFFO0FBQ3RCLFNBQU8sVUFBUyxPQUFPLEVBQUU7QUFDdkIsV0FBTyxBQUFDLEFBQUMsR0FBRyxHQUFHLEdBQUcsR0FBSSxPQUFPLEdBQUksR0FBRyxDQUFDO0dBQ3RDLENBQUM7Q0FDSDs7OztBQ3BHRCxZQUFZLENBQUM7Ozs7Ozs7O3VCQUVLLFNBQVM7Ozs7b0JBQ1QsUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBY1gsVUFBUyxNQUFNLEVBQUU7O0FBRTlCLE1BQUksUUFBUSxHQUFJLElBQUkscUJBQU0sR0FBRyxFQUFFLENBQUM7QUFDaEMsTUFBSSxTQUFTLEdBQUcsSUFBSSxxQkFBTSxHQUFHLEVBQUUsQ0FBQzs7QUFFaEMsTUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUM7V0FBSyxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUk7R0FBQSxDQUFDLENBQUM7QUFDOUMsTUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUM7V0FBSyxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUk7R0FBQSxDQUFDLENBQUM7O0FBRTlDLEdBQUMsQ0FBQyxPQUFPLENBQUMsa0JBQUssYUFBYSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQzlDLEdBQUMsQ0FBQyxPQUFPLENBQUMsa0JBQUssYUFBYSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDOztBQUU3QyxXQUFTLENBQ04sSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFDLEdBQUc7V0FBSyxDQUFDLEdBQUc7R0FBQSxDQUFDLENBQzFCLEdBQUcsQ0FBQyxVQUFDLElBQUk7V0FBSyxJQUFJLEdBQUcsU0FBUyxHQUFHLFFBQVE7R0FBQSxDQUFDLENBQzFDLE9BQU8sQ0FBQyxrQkFBSyxhQUFhLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7O0FBRXJELFNBQU87QUFDTCxZQUFRLEVBQUksUUFBUTtBQUNwQixhQUFTLEVBQUcsU0FBUztHQUN0QixDQUFDO0NBQ0g7Ozs7O0FDckNELFlBQVksQ0FBQzs7Ozs7Ozs7b0JBRUksUUFBUTs7Ozs7OztxQkFLVixVQUFVOzs7Ozs7QUFNekIsU0FBUyxVQUFVLENBQUMsS0FBSyxFQUFFO0FBQ3pCLE1BQUksR0FBRyxHQUFJLEVBQUUsQ0FBQztBQUNkLE9BQUssQ0FDRixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQ1IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUNWLEdBQUcsQ0FBQyxVQUFDLFFBQVE7V0FBSyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztHQUFBLENBQUMsQ0FDdEMsT0FBTyxDQUFDLFVBQUMsRUFBRTtXQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxrQkFBSyxzQkFBc0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7R0FBQSxDQUFDLENBQUM7QUFDcEUsU0FBTyxHQUFHLENBQUM7Q0FDWjs7OztBQ3JCRCxZQUFZLENBQUM7Ozs7Ozs7O3VCQUVLLFNBQVM7Ozs7b0JBQ1QsUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQXFCWCxZQUF1QjtNQUFkLE9BQU8sZ0NBQUcsRUFBRTs7QUFFbEMsTUFBSSxHQUFHLEdBQUcsSUFBSSxxQkFBTSxHQUFHLEVBQUUsQ0FBQzs7QUFFMUIsTUFBSSxRQUFRLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hELE1BQUksUUFBUSxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRS9DLE1BQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7QUFDdEQsTUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzs7QUFFdEQsTUFBSSxLQUFLLEdBQUcsa0JBQUssT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOztBQUVqRixNQUFJLFlBQVksR0FBRyxxQkFBTSxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7O0FBRTVFLGNBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRTVCLFNBQU87QUFDTCxZQUFRLEVBQU8sR0FBRztBQUNsQixnQkFBWSxFQUFHLFlBQVk7R0FDNUIsQ0FBQztDQUNIOzs7Ozs7QUFNRCxTQUFTLGlCQUFpQixDQUFDLEtBQUssRUFBRTtBQUNoQyxTQUFPLFlBQVc7QUFDaEIsV0FBTyxNQUFNLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztHQUNsQyxDQUFDO0NBQ0g7Ozs7OztBQU1ELFNBQVMsZUFBZSxDQUFDLE1BQU0sRUFBRTtBQUMvQixTQUFPLFlBQVc7QUFDaEIsV0FBTyxNQUFNLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztHQUNwQyxDQUFDO0NBQ0g7Ozs7OztBQU1ELFNBQVMsU0FBUyxDQUFDLEVBQUUsRUFBRTtBQUNyQixNQUFJLFNBQVMsR0FBRyxrQkFBSyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNwRCxTQUFPLFVBQVMsS0FBSyxFQUFFO0FBQ3JCLE1BQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLGNBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBRyxDQUFDO0dBQ25ELENBQUM7Q0FDSDs7Ozs7O0FBTUQsU0FBUyxXQUFXLENBQUMsRUFBRSxFQUFFO0FBQ3ZCLFNBQU8sWUFBVztBQUNoQixRQUFJLElBQUksR0FBRyxFQUFFLENBQUMscUJBQXFCLEVBQUUsQ0FBQztBQUN0QyxNQUFFLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQSxHQUFJLENBQUMsQ0FBQztBQUNyRCxNQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQSxHQUFJLENBQUMsQ0FBQztHQUN4RCxDQUFDO0NBQ0g7Ozs7QUN2RkQsWUFBWSxDQUFDOzs7Ozs7Ozs7OzBCQUVRLGFBQWE7Ozs7b0JBQ2YsUUFBUTs7Ozs7OztBQUszQixJQUFJLEVBQUUsR0FBRyw2QkFBUztBQUNoQixZQUFVLEVBQUcsT0FBTztBQUNwQixXQUFTLEVBQUksbUJBQVMsR0FBRyxFQUFFLElBQUksRUFBRTtBQUMvQixRQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFO0FBQ3ZCLGFBQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLENBQUMsQ0FBQztBQUN2RCxhQUFPLEVBQUUsQ0FBQztLQUNYOztBQUVELFFBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3pDLFVBQUk7QUFDRixlQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7T0FDL0MsQ0FBQyxPQUFPLEVBQUUsRUFBRTtBQUNYLGVBQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7T0FDakI7S0FDRjs7QUFFRCxRQUFJO0FBQ0YsYUFBTyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7S0FDN0MsQ0FBQyxPQUFPLEVBQUUsRUFBRTtBQUNYLGFBQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDakI7O0FBRUQsV0FBTyxFQUFFLENBQUM7R0FDWDtDQUNGLENBQUMsQ0FBQzs7Ozs7OztxQkFPWTtBQUNiLGlCQUFlLEVBQUcsZUFBZTtBQUNqQyxhQUFXLEVBQU8sV0FBVztDQUM5Qjs7Ozs7O0FBTUQsU0FBUyxXQUFXLENBQUMsRUFBRSxFQUFFOzRCQUNELEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQzs7OztNQUFqRCxPQUFPO01BQUUsSUFBSTs7QUFDbEIsSUFBRSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7O0FBRXZCLE1BQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDOUMsV0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0FBQ2pDLFNBQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQSxDQUFFLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FDMUQ7Ozs7OztBQU1ELFNBQVMsZUFBZSxDQUFDLEVBQUUsRUFBRTtBQUMzQixNQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2hELFNBQU8sQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDNUMsb0JBQUssT0FBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDdkYsSUFBRSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3hDLFNBQU8sT0FBTyxDQUFDO0NBQ2hCOzs7Ozs7QUFNRCxTQUFTLGVBQWUsQ0FBQyxFQUFFLEVBQUU7QUFDM0IsU0FBTyxVQUFTLElBQUksRUFBRTtBQUNwQixNQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0dBQ3hDLENBQUM7Q0FDSDs7Ozs7QUFLRCxTQUFTLGdCQUFnQixDQUFDLElBQUksRUFBRTtBQUM5QixTQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDO0NBQzdCOzs7O0FDcEZELFlBQVksQ0FBQzs7Ozs7Ozs7NEJBRU0sZUFBZTs7OztxQkFFbkI7Ozs7O0FBS2IsU0FBTyxFQUFBLGlCQUFDLElBQUksRUFBRTtBQUNaLFdBQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQ3pDOzs7Ozs7O0FBT0QsVUFBUSxFQUFBLGtCQUFDLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDbkIsUUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzQixVQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsRUFBSTtBQUM5QixVQUFJLENBQUMsSUFBSSxHQUFHLEVBQUU7QUFDWixlQUFPO09BQ1I7QUFDRCxTQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2xCLENBQUMsQ0FBQztBQUNILFdBQU8sR0FBRyxDQUFDO0dBQ1o7Ozs7Ozs7O0FBUUQsT0FBSyxFQUFBLGVBQUMsSUFBSSxFQUFFO0FBQ1YsUUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ2IsVUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDO2FBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7S0FBQSxDQUFDLENBQUM7QUFDbEQsV0FBTyxHQUFHLENBQUM7R0FDWjs7Ozs7O0FBTUQsUUFBTSwyQkFBUzs7Ozs7O0FBTWYsU0FBTyxFQUFBLG1CQUFHOztBQUVSLFFBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQztBQUNyQixRQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUM1QixXQUFPLFlBQVc7QUFDaEIsVUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQ2QsVUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDaEQsYUFBTyxDQUFDLEVBQUUsRUFBRTtBQUNWLGNBQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztPQUNyQztBQUNELGFBQU8sTUFBTSxDQUFDO0tBQ2YsQ0FBQztHQUNIOzs7OztBQUtELFNBQU8sRUFBQSxpQkFBQyxLQUFLLEVBQUU7QUFDYixXQUFPLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7R0FDdkM7Ozs7O0FBS0QsY0FBWSxFQUFBLHNCQUFDLEVBQUUsRUFBRTtBQUNmLFdBQU8sVUFBUyxJQUFJLEVBQUU7QUFDcEIsUUFBRSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7S0FDdkIsQ0FBQztHQUNIOzs7Ozs7QUFNRCxlQUFhLEVBQUEsdUJBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRTtBQUMxQixXQUFPLFVBQVMsS0FBSyxFQUFFO0FBQ3JCLFFBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxLQUFLLEVBQUUsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDO0tBQ2xELENBQUM7R0FDSDs7Ozs7O0FBTUQsbUJBQWlCLEVBQUEsMkJBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRTtBQUMvQixXQUFPLFVBQVMsS0FBSyxFQUFFO0FBQ3JCLFVBQUksS0FBSyxJQUFJLElBQUksRUFBRTtBQUNqQixVQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztPQUNuQyxNQUFNO0FBQ0wsVUFBRSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztPQUMvQjtLQUNGLENBQUM7R0FDSDs7Ozs7QUFLRCxZQUFVLEVBQUEsb0JBQUMsR0FBRyxFQUFFO0FBQ2QsUUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QyxPQUFHLENBQUMsTUFBTSxHQUFHO2FBQUssR0FBRyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO0tBQUEsQ0FBQztBQUNsRCxPQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNkLE9BQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztBQUMzQixZQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztHQUNoQzs7Ozs7QUFLRCx1QkFBcUIsRUFBQSxpQ0FBRztBQUN0QixXQUFPLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQzFEOzs7OztBQUtELHdCQUFzQixFQUFBLGdDQUFDLEdBQUcsRUFBRTtBQUMxQixRQUFJLEdBQUcsR0FBRyxBQUFDLEdBQUcsSUFBSSxJQUFJLEdBQUksSUFBSSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7O0FBRTFDLFFBQUksR0FBRyxLQUFLLE1BQU0sRUFBRTtBQUNsQixTQUFHLEdBQUcsSUFBSSxDQUFDO0tBQ1osTUFBTSxJQUFJLEdBQUcsS0FBSyxPQUFPLEVBQUU7QUFDMUIsU0FBRyxHQUFHLEtBQUssQ0FBQztLQUNiLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO0FBQ3RCLFNBQUcsR0FBRyxJQUFJLENBQUM7S0FDWixNQUFNLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUM3QixTQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUN6Qjs7QUFFRCxXQUFPLEdBQUcsQ0FBQztHQUNaOzs7Ozs7QUFNRCxtQkFBaUIsRUFBQSwyQkFBQyxRQUFRLEVBQUU7QUFDMUIsUUFBSSxhQUFhLFlBQUEsQ0FBQztBQUNsQixRQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDakYsUUFBSSxRQUFRLEdBQUcsU0FBWCxRQUFRLENBQUksTUFBTTthQUFLLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQUEsQ0FBQzs7QUFFekQsUUFBSSxRQUFRLGNBQVksUUFBUSxDQUFHLEVBQUU7QUFDbkMsbUJBQWEsZ0JBQWMsUUFBUSxBQUFFLENBQUM7S0FDdkMsTUFBTSxJQUFJLFFBQVEsV0FBUyxRQUFRLENBQUcsRUFBRTtBQUN2QyxtQkFBYSxhQUFXLFFBQVEsQUFBRSxDQUFDO0tBQ3BDLE1BQU0sSUFBSSxRQUFRLFVBQVEsUUFBUSxDQUFHLEVBQUU7QUFDdEMsbUJBQWEsWUFBVSxRQUFRLEFBQUUsQ0FBQztLQUNuQyxNQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQzdCLG1CQUFhLEdBQUcsUUFBUSxDQUFDO0tBQzFCOztBQUVELFdBQU8sYUFBYSxDQUFDO0dBQ3RCO0NBQ0YiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFRhbGtpZS5qc1xuICovXG5pbXBvcnQgQmFjb24gICBmcm9tICdiYWNvbmpzJztcblxuaW1wb3J0IHV0aWwgICAgZnJvbSAnLi91dGlsJztcbmltcG9ydCBjb250cm9sIGZyb20gJy4vY29udHJvbCc7XG5pbXBvcnQgcXVlcnkgICBmcm9tICcuL3F1ZXJ5JztcblxuaW1wb3J0ICRzbGlkZSAgICAgIGZyb20gJy4vc2xpZGUnO1xuaW1wb3J0ICRwYWdpbmcgICAgIGZyb20gJy4vcGFnaW5nJztcbmltcG9ydCAkZnVsbFNjcmVlbiBmcm9tICcuL2Z1bGxzY3JlZW4nO1xuaW1wb3J0ICRyZXNwb25zaXZlIGZyb20gJy4vcmVzcG9uc2l2ZSc7XG5pbXBvcnQgJHBvaW50ZXIgICAgZnJvbSAnLi9wb2ludGVyJztcbmltcG9ydCAkYmFja2ZhY2UgICBmcm9tICcuL2JhY2tmYWNlJztcblxuY29uc3QgSURFTlRfTkVYVCAgICAgPSAnbmV4dCc7XG5jb25zdCBJREVOVF9QUkVWICAgICA9ICdwcmV2JztcbmNvbnN0IElERU5UX1NDQUxFUiAgID0gJ3NjYWxlcic7XG5jb25zdCBJREVOVF9DT05UUk9MICA9ICdjb250cm9sJztcbmNvbnN0IElERU5UX1BBR0UgICAgID0gJ3BhZ2UnO1xuY29uc3QgSURFTlRfVE9UQUwgICAgPSAndG90YWwnO1xuY29uc3QgSURFTlRfUFJPR1JFU1MgPSAncHJvZ3Jlc3MnO1xuY29uc3QgSURFTlRfUE9JTlRFUiAgPSAncG9pbnRlcic7XG5jb25zdCBJREVOVF9CQUNLRkFDRSA9ICdiYWNrZmFjZSc7XG5cbmNvbnN0IFNFTEVDVE9SX01EID0gJ1t0eXBlPVwidGV4dC94LW1hcmtkb3duXCJdJztcblxuY29uc3QgQVRUUl9MQVlPVVQgICA9ICdsYXlvdXQnO1xuY29uc3QgQVRUUl9CT0RZX0JHICA9ICdib2R5LWJnJztcbmNvbnN0IEFUVFJfUEFHRSAgICAgPSAncGFnZSc7XG5jb25zdCBBVFRSX05PX1RSQU5TID0gJ25vLXRyYW5zaXRpb24nO1xuXG5jb25zdCBOT1JNQUxfV0lEVEggID0gMTAyNDtcbmNvbnN0IE5PUk1BTF9IRUlHSFQgPSA3Njg7XG5jb25zdCBXSURFX1dJRFRIICAgID0gMTM2NjtcbmNvbnN0IFdJREVfSEVJR0hUICAgPSA3Njg7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gVGFsa2llT3B0aW9uc1xuICogQHByb3BlcnR5IHtCb29sZWFufSBbYXBpXVxuICogQHByb3BlcnR5IHtCb29sZWFufSBbd2lkZV1cbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gW2NvbnRyb2xdXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IFtwb2ludGVyXVxuICogQHByb3BlcnR5IHtCb29sZWFufSBbcHJvZ3Jlc3NdXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IFtiYWNrZmFjZV1cbiAqL1xuXG4vKipcbiAqIEBwYXJhbSB7VGFsa2llT3B0aW9uc30gb3B0aW9uc1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zID0ge30pIHtcbiAgcmV0dXJuICFvcHRpb25zLmFwaSA/IG1haW4ob3B0aW9ucykgOiB7XG4gICAgbWFpbiAgICAgICA6IG1haW4sXG4gICAgdXRpbCAgICAgICA6IHV0aWwsXG4gICAgY29udHJvbCAgICA6IGNvbnRyb2wsXG4gICAgcXVlcnkgICAgICA6IHF1ZXJ5LFxuICAgIHNsaWRlICAgICAgOiAkc2xpZGUsXG4gICAgcGFnaW5nICAgICA6ICRwYWdpbmcsXG4gICAgZnVsbFNjcmVlbiA6ICRmdWxsU2NyZWVuLFxuICAgIHJlc3BvbnNpdmUgOiAkcmVzcG9uc2l2ZSxcbiAgICBwb2ludGVyICAgIDogJHBvaW50ZXIsXG4gICAgYmFja2ZhY2UgICA6ICRiYWNrZmFjZSxcbiAgICBCYWNvbiAgICAgIDogQmFjb25cbiAgfTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1RhbGtpZU9wdGlvbnN9IF9vcHRpb25zXG4gKi9cbmZ1bmN0aW9uIG1haW4oX29wdGlvbnMgPSB7fSkge1xuXG4gIC8qKlxuICAgKiBhcHBseSBkZWZhdWx0IG9wdGlvbnNcbiAgICogQHR5cGUgeyp8T2JqZWN0fVxuICAgKi9cbiAgbGV0IG9wdGlvbnMgPSB1dGlsLmV4dGVuZCh1dGlsLmRlZmF1bHRzKF9vcHRpb25zLCB7XG4gICAgYXBpICAgICAgICAgIDogZmFsc2UsXG4gICAgd2lkZSAgICAgICAgIDogZmFsc2UsXG4gICAgY29udHJvbCAgICAgIDogdHJ1ZSxcbiAgICBwb2ludGVyICAgICAgOiB0cnVlLFxuICAgIHByb2dyZXNzICAgICA6IHRydWUsXG4gICAgYmFja2ZhY2UgICAgIDogdHJ1ZSxcbiAgICBub3RyYW5zaXRpb24gOiBmYWxzZVxuICB9KSwgcXVlcnkobG9jYXRpb24uc2VhcmNoKSk7XG5cbiAgLyoqXG4gICAqIEluaXQgc2xpZGUgc2l6ZXNcbiAgICovXG4gIGxldCB3aWR0aCAgPSBvcHRpb25zLndpZGUgPyBXSURFX1dJRFRIIDogTk9STUFMX1dJRFRIO1xuICBsZXQgaGVpZ2h0ID0gb3B0aW9ucy53aWRlID8gV0lERV9IRUlHSFQgOiBOT1JNQUxfSEVJR0hUO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgPHN0eWxlPlxuICAgICAgW2xheW91dF0sXG4gICAgICAjJHtJREVOVF9TQ0FMRVJ9IHtcbiAgICAgICAgd2lkdGg6ICR7d2lkdGh9cHggIWltcG9ydGFudDtcbiAgICAgICAgaGVpZ2h0OiAke2hlaWdodH1weCAhaW1wb3J0YW50O1xuICAgICAgfVxuICAgIDwvc3R5bGU+YFxuICApO1xuXG4gIC8qKlxuICAgKiBJbml0IHNsaWRlIHNlY3Rpb25zXG4gICAqICAgMS4gY29tcGlsZSBtYXJrZG93bnNcbiAgICogICAyLiB0cmF2ZXJzZSBzbGlkZXMgJiBhc3NpZ24gcGFnZSBudW1iZXJcbiAgICogICAzLiBleHRyYWN0IHByZXNlbnRlciBub3Rlc1xuICAgKi9cbiAgbGV0IG1kcyA9IHV0aWwudG9BcnJheShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNFTEVDVE9SX01EKSk7XG4gIG1kcy5mb3JFYWNoKCRzbGlkZS5jb21waWxlTWFya2Rvd24pO1xuICBsZXQgc2xpZGVzID0gdXRpbC50b0FycmF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFske0FUVFJfTEFZT1VUfV1gKSk7XG4gIHNsaWRlcy5mb3JFYWNoKChlbCwgaSkgPT4gdXRpbC5hdHRyaWJ1dGVBc3NpZ25PZihlbCwgQVRUUl9QQUdFKShpICsgMSkpO1xuICBsZXQgbm90ZXMgID0ge307XG4gIHNsaWRlcy5tYXAoJHNsaWRlLmV4dHJhY3ROb3RlKS5mb3JFYWNoKCh0eHQsIGkpID0+IG5vdGVzW2kgKyAxXSA9IHR4dCk7XG5cbiAgLyoqXG4gICAqIFJlc3BvbnNpdmUgc2NhbGluZ1xuICAgKi9cbiAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICA8ZGl2IGlkPVwiJHtJREVOVF9TQ0FMRVJ9XCI+PC9kaXY+XG4gIGApO1xuICBsZXQgc2NhbGVyRWwgPSB1dGlsLmdldEJ5SWQoSURFTlRfU0NBTEVSKTtcbiAgc2xpZGVzLmZvckVhY2goKGVsKSA9PiBzY2FsZXJFbC5hcHBlbmRDaGlsZChlbCkpO1xuXG4gIGxldCByZXNwb25zaXZlID0gJHJlc3BvbnNpdmUoe1xuICAgIHdpZHRoICA6IHdpZHRoLFxuICAgIGhlaWdodCA6IGhlaWdodCxcbiAgICB0YXJnZXQgOiBzY2FsZXJFbFxuICB9KTtcbiAgcmVzcG9uc2l2ZS5zY2FsZUJ1cy5wbHVnKGNvbnRyb2wucmVzaXplKCkpO1xuXG4gIC8qKlxuICAgKiBQYWdpbmcgY29udHJvbFxuICAgKi9cbiAgbGV0IHBhZ2luZyA9ICRwYWdpbmcoe1xuICAgIHN0YXJ0UGFnZSAgICAgOiB1dGlsLmdldFBhZ2VOdW1iZXJGcm9tSGFzaCgpIHx8IDEsXG4gICAgZW5kUGFnZSAgICAgICA6IHNsaWRlcy5sZW5ndGgsXG4gICAgc2xpZGVFbGVtZW50cyA6IHNsaWRlc1xuICB9KTtcblxuICBwYWdpbmcubmV4dEJ1cy5wbHVnKGNvbnRyb2wua2V5ZG93bigncmlnaHQnKS50aHJvdHRsZSgxMDApKTtcbiAgcGFnaW5nLnByZXZCdXMucGx1Zyhjb250cm9sLmtleWRvd24oJ2xlZnQnKS50aHJvdHRsZSgxMDApKTtcblxuICBwYWdpbmcubmV4dEJ1cy5wbHVnKGNvbnRyb2wuc3dpcGVMZWZ0KCkpO1xuICBwYWdpbmcucHJldkJ1cy5wbHVnKGNvbnRyb2wuc3dpcGVSaWdodCgpKTtcblxuICAvLyBzeW5jIGxvY2F0aW9uLmhhc2hcbiAgcGFnaW5nLm1vdmVCdXMucGx1Zyhjb250cm9sLmhhc2hjaGFuZ2UoKS5tYXAodXRpbC5nZXRQYWdlTnVtYmVyRnJvbUhhc2gpKTtcbiAgcGFnaW5nLmN1cnJlbnRFcy5vblZhbHVlKChwYWdlKSA9PiB7XG4gICAgKHBhZ2UgPT09IDEgJiYgIWxvY2F0aW9uLmhhc2gpIHx8IChsb2NhdGlvbi5oYXNoID0gcGFnZSk7XG4gIH0pO1xuXG4gIC8vIHN5bmMgYm9keSBiYWNrZ3JvdW5kIGF0dHJpYnV0ZVxuICBwYWdpbmcuY2hhbmdlZEVzXG4gICAgLm1hcCgnLmdldEF0dHJpYnV0ZScsIEFUVFJfTEFZT1VUKVxuICAgIC5vblZhbHVlKHV0aWwuYXR0cmlidXRlQXNzaWduT2YoZG9jdW1lbnQuYm9keSwgQVRUUl9CT0RZX0JHKSk7XG5cbiAgLyoqXG4gICAqIEluc2VydCBVaSBFbGVtZW50c1xuICAgKi9cbiAgaWYgKG9wdGlvbnMubm90cmFuc2l0aW9uKSB7XG4gICAgQmFjb24ub25jZSgxKVxuICAgICAgLm9uVmFsdWUodXRpbC5hdHRyaWJ1dGVBc3NpZ25PZihkb2N1bWVudC5ib2R5LCBBVFRSX05PX1RSQU5TKSk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5wb2ludGVyKSB7XG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGA8ZGl2IGlkPVwiJHtJREVOVF9QT0lOVEVSfVwiPjwvZGl2PmApO1xuICAgIGxldCB7Y29vcmRCdXMsIHRvZ2dsZUJ1c30gPSAkcG9pbnRlcih1dGlsLmdldEJ5SWQoSURFTlRfUE9JTlRFUikpO1xuICAgIGNvb3JkQnVzLnBsdWcoY29udHJvbC5tb3VzZW1vdmUoKSk7XG4gICAgdG9nZ2xlQnVzLnBsdWcoY29udHJvbC5rZXkoJ2InKSk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5iYWNrZmFjZSkge1xuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgPGRpdiBpZD1cIiR7SURFTlRfQkFDS0ZBQ0V9XCI+PC9kaXY+YCk7XG4gICAgbGV0IHtiZ0ltYWdlQnVzLCBiZ0ZpbHRlckJ1c30gPSAkYmFja2ZhY2UodXRpbC5nZXRCeUlkKElERU5UX0JBQ0tGQUNFKSk7XG4gICAgYmdJbWFnZUJ1cy5wbHVnKHBhZ2luZy5jaGFuZ2VkRXMpO1xuICAgIGJnRmlsdGVyQnVzLnBsdWcocGFnaW5nLmNoYW5nZWRFcyk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5jb250cm9sKSB7XG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICAgIDxkaXYgaWQ9XCIke0lERU5UX0NPTlRST0x9XCI+XG4gICAgICAgIDxwPjxzcGFuIGlkPVwiJHtJREVOVF9QUkVWfVwiPuKXgDwvc3Bhbj5cbiAgICAgICAgUGFnZSA8c3BhbiBpZD1cIiR7SURFTlRfUEFHRX1cIj4wPC9zcGFuPiBvZiA8c3BhbiBpZD1cIiR7SURFTlRfVE9UQUx9XCI+MDwvc3Bhbj5cbiAgICAgICAgPHNwYW4gaWQ9XCIke0lERU5UX05FWFR9XCI+4pa2PC9zcGFuPjwvcD5cbiAgICAgIDwvZGl2PlxuICAgIGApO1xuXG4gICAgbGV0IG5leHRFbCA9IHV0aWwuZ2V0QnlJZChJREVOVF9ORVhUKTtcbiAgICBsZXQgcHJldkVsID0gdXRpbC5nZXRCeUlkKElERU5UX1BSRVYpO1xuXG4gICAgLy8gbmV4dCBidXR0b25cbiAgICBwYWdpbmcubmV4dEJ1cy5wbHVnKGNvbnRyb2wuY2xpY2sobmV4dEVsKSk7XG5cbiAgICAvLyBwcmV2IGJ1dHRvblxuICAgIHBhZ2luZy5wcmV2QnVzLnBsdWcoY29udHJvbC5jbGljayhwcmV2RWwpKTtcblxuICAgIC8vIGN1cnJlbnQgcGFnZVxuICAgIHBhZ2luZy5jdXJyZW50RXMub25WYWx1ZSh1dGlsLnRleHRBc3NpZ25PZih1dGlsLmdldEJ5SWQoSURFTlRfUEFHRSkpKTtcblxuICAgIC8vIHRvdGFsIG9mIHBhZ2VcbiAgICBCYWNvbi5vbmNlKHNsaWRlcy5sZW5ndGgpLm9uVmFsdWUodXRpbC50ZXh0QXNzaWduT2YodXRpbC5nZXRCeUlkKElERU5UX1RPVEFMKSkpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMucHJvZ3Jlc3MpIHtcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYDxkaXYgaWQ9XCIke0lERU5UX1BST0dSRVNTfVwiPjwvZGl2PmApO1xuXG4gICAgLy8gcHJvZ3Jlc3MgYmFyXG4gICAgcGFnaW5nLnBlcmNlbnRFcy5vblZhbHVlKHV0aWwuc3R5bGVBc3NpZ25PZih1dGlsLmdldEJ5SWQoSURFTlRfUFJPR1JFU1MpLCAnd2lkdGgnKSk7XG4gIH1cblxuICAvKipcbiAgICogRnVsbFNjcmVlblxuICAgKi9cbiAgJGZ1bGxTY3JlZW4oZG9jdW1lbnQuYm9keSkucGx1Zyhjb250cm9sLmtleSgnZicpKTtcblxuICAvKipcbiAgICogZXhwb3J0IHNvbWUgb2YgY29udHJvbFxuICAgKlxuICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBUYWxraWVFeHBvcnRcbiAgICogQHBhcmFtIHtPYmplY3QuPEZ1bmN0aW9uPn0gY29udHJvbFxuICAgKiBAcGFyYW0ge0JhY29uLkV2ZW50U3RyZWFtfSBjaGFuZ2VkXG4gICAqIEBwYXJhbSB7QmFjb24uQnVzfSBuZXh0XG4gICAqIEBwYXJhbSB7QmFjb24uQnVzfSBwcmV2XG4gICAqIEBwYXJhbSB7QmFjb24uQnVzfSBqdW1wXG4gICAqIEBwYXJhbSB7QmFjb24uUHJvcGVydHl9IHJhdGlvXG4gICAqIEBwYXJhbSB7T2JqZWN0LjxOdW1iZXIsIFN0cmluZz59IG5vdGVzXG4gICAqL1xuICByZXR1cm4ge1xuICAgIEJhY29uICAgOiBCYWNvbixcbiAgICBjb250cm9sIDogY29udHJvbCxcbiAgICBjaGFuZ2VkIDogcGFnaW5nLmNoYW5nZWRFcyxcbiAgICBuZXh0ICAgIDogcGFnaW5nLm5leHRCdXMsXG4gICAgcHJldiAgICA6IHBhZ2luZy5wcmV2QnVzLFxuICAgIGp1bXAgICAgOiBwYWdpbmcubW92ZUJ1cyxcbiAgICByYXRpbyAgIDogcmVzcG9uc2l2ZS5jdXJyZW50UmF0aW8sXG4gICAgbm90ZXMgICA6IG5vdGVzXG4gIH07XG59XG4iLCIoZnVuY3Rpb24oKSB7XG4gIHZhciBCYWNvbiwgQnVmZmVyaW5nU291cmNlLCBCdXMsIENvbXBvc2l0ZVVuc3Vic2NyaWJlLCBDb25zdW1pbmdTb3VyY2UsIERlc2MsIERpc3BhdGNoZXIsIEVuZCwgRXJyb3IsIEV2ZW50LCBFdmVudFN0cmVhbSwgRXhjZXB0aW9uLCBJbml0aWFsLCBOZXh0LCBOb25lLCBPYnNlcnZhYmxlLCBQcm9wZXJ0eSwgUHJvcGVydHlEaXNwYXRjaGVyLCBTb21lLCBTb3VyY2UsIFVwZGF0ZUJhcnJpZXIsIF8sIGFkZFByb3BlcnR5SW5pdFZhbHVlVG9TdHJlYW0sIGFzc2VydCwgYXNzZXJ0QXJyYXksIGFzc2VydEV2ZW50U3RyZWFtLCBhc3NlcnRGdW5jdGlvbiwgYXNzZXJ0Tm9Bcmd1bWVudHMsIGFzc2VydE9ic2VydmFibGUsIGFzc2VydE9ic2VydmFibGVJc1Byb3BlcnR5LCBhc3NlcnRTdHJpbmcsIGNsb25lQXJyYXksIGNvbnN0YW50VG9GdW5jdGlvbiwgY29udGFpbnNEdXBsaWNhdGVEZXBzLCBjb252ZXJ0QXJnc1RvRnVuY3Rpb24sIGRlc2NyaWJlLCBlbmRFdmVudCwgZXZlbnRJZENvdW50ZXIsIGV2ZW50TWV0aG9kcywgZmluZERlcHMsIGZpbmRIYW5kbGVyTWV0aG9kcywgZmxhdE1hcF8sIGZvcm1lciwgaWRDb3VudGVyLCBpbml0aWFsRXZlbnQsIGlzQXJyYXksIGlzRmllbGRLZXksIGlzT2JzZXJ2YWJsZSwgbGF0dGVyLCBsaWZ0Q2FsbGJhY2ssIG1ha2VGdW5jdGlvbiwgbWFrZUZ1bmN0aW9uQXJncywgbWFrZUZ1bmN0aW9uXywgbWFrZU9ic2VydmFibGUsIG1ha2VTcGF3bmVyLCBuZXh0RXZlbnQsIG5vcCwgcGFydGlhbGx5QXBwbGllZCwgcmVjdXJzaW9uRGVwdGgsIHJlZiwgcmVnaXN0ZXJPYnMsIHNweXMsIHRvQ29tYmluYXRvciwgdG9FdmVudCwgdG9GaWVsZEV4dHJhY3RvciwgdG9GaWVsZEtleSwgdG9PcHRpb24sIHRvU2ltcGxlRXh0cmFjdG9yLCB2YWx1ZUFuZEVuZCwgd2l0aERlc2NyaXB0aW9uLCB3aXRoTWV0aG9kQ2FsbFN1cHBvcnQsXG4gICAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5LFxuICAgIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgICBzbGljZSA9IFtdLnNsaWNlLFxuICAgIGJpbmQgPSBmdW5jdGlvbihmbiwgbWUpeyByZXR1cm4gZnVuY3Rpb24oKXsgcmV0dXJuIGZuLmFwcGx5KG1lLCBhcmd1bWVudHMpOyB9OyB9O1xuXG4gIEJhY29uID0ge1xuICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBcIkJhY29uXCI7XG4gICAgfVxuICB9O1xuXG4gIEJhY29uLnZlcnNpb24gPSAnMC43LjYwJztcblxuICBFeGNlcHRpb24gPSAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwgIT09IG51bGwgPyBnbG9iYWwgOiB0aGlzKS5FcnJvcjtcblxuICBub3AgPSBmdW5jdGlvbigpIHt9O1xuXG4gIGxhdHRlciA9IGZ1bmN0aW9uKF8sIHgpIHtcbiAgICByZXR1cm4geDtcbiAgfTtcblxuICBmb3JtZXIgPSBmdW5jdGlvbih4LCBfKSB7XG4gICAgcmV0dXJuIHg7XG4gIH07XG5cbiAgY2xvbmVBcnJheSA9IGZ1bmN0aW9uKHhzKSB7XG4gICAgcmV0dXJuIHhzLnNsaWNlKDApO1xuICB9O1xuXG4gIGFzc2VydCA9IGZ1bmN0aW9uKG1lc3NhZ2UsIGNvbmRpdGlvbikge1xuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKG1lc3NhZ2UpO1xuICAgIH1cbiAgfTtcblxuICBhc3NlcnRPYnNlcnZhYmxlSXNQcm9wZXJ0eSA9IGZ1bmN0aW9uKHgpIHtcbiAgICBpZiAoeCBpbnN0YW5jZW9mIE9ic2VydmFibGUgJiYgISh4IGluc3RhbmNlb2YgUHJvcGVydHkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiT2JzZXJ2YWJsZSBpcyBub3QgYSBQcm9wZXJ0eSA6IFwiICsgeCk7XG4gICAgfVxuICB9O1xuXG4gIGFzc2VydEV2ZW50U3RyZWFtID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoIShldmVudCBpbnN0YW5jZW9mIEV2ZW50U3RyZWFtKSkge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIm5vdCBhbiBFdmVudFN0cmVhbSA6IFwiICsgZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBhc3NlcnRPYnNlcnZhYmxlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoIShldmVudCBpbnN0YW5jZW9mIE9ic2VydmFibGUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwibm90IGFuIE9ic2VydmFibGUgOiBcIiArIGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgYXNzZXJ0RnVuY3Rpb24gPSBmdW5jdGlvbihmKSB7XG4gICAgcmV0dXJuIGFzc2VydChcIm5vdCBhIGZ1bmN0aW9uIDogXCIgKyBmLCBfLmlzRnVuY3Rpb24oZikpO1xuICB9O1xuXG4gIGlzQXJyYXkgPSBmdW5jdGlvbih4cykge1xuICAgIHJldHVybiB4cyBpbnN0YW5jZW9mIEFycmF5O1xuICB9O1xuXG4gIGlzT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4geCBpbnN0YW5jZW9mIE9ic2VydmFibGU7XG4gIH07XG5cbiAgYXNzZXJ0QXJyYXkgPSBmdW5jdGlvbih4cykge1xuICAgIGlmICghaXNBcnJheSh4cykpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJub3QgYW4gYXJyYXkgOiBcIiArIHhzKTtcbiAgICB9XG4gIH07XG5cbiAgYXNzZXJ0Tm9Bcmd1bWVudHMgPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgcmV0dXJuIGFzc2VydChcIm5vIGFyZ3VtZW50cyBzdXBwb3J0ZWRcIiwgYXJncy5sZW5ndGggPT09IDApO1xuICB9O1xuXG4gIGFzc2VydFN0cmluZyA9IGZ1bmN0aW9uKHgpIHtcbiAgICBpZiAodHlwZW9mIHggIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJub3QgYSBzdHJpbmcgOiBcIiArIHgpO1xuICAgIH1cbiAgfTtcblxuICBfID0ge1xuICAgIGluZGV4T2Y6IEFycmF5LnByb3RvdHlwZS5pbmRleE9mID8gZnVuY3Rpb24oeHMsIHgpIHtcbiAgICAgIHJldHVybiB4cy5pbmRleE9mKHgpO1xuICAgIH0gOiBmdW5jdGlvbih4cywgeCkge1xuICAgICAgdmFyIGksIGosIGxlbjEsIHk7XG4gICAgICBmb3IgKGkgPSBqID0gMCwgbGVuMSA9IHhzLmxlbmd0aDsgaiA8IGxlbjE7IGkgPSArK2opIHtcbiAgICAgICAgeSA9IHhzW2ldO1xuICAgICAgICBpZiAoeCA9PT0geSkge1xuICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gICAgfSxcbiAgICBpbmRleFdoZXJlOiBmdW5jdGlvbih4cywgZikge1xuICAgICAgdmFyIGksIGosIGxlbjEsIHk7XG4gICAgICBmb3IgKGkgPSBqID0gMCwgbGVuMSA9IHhzLmxlbmd0aDsgaiA8IGxlbjE7IGkgPSArK2opIHtcbiAgICAgICAgeSA9IHhzW2ldO1xuICAgICAgICBpZiAoZih5KSkge1xuICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gICAgfSxcbiAgICBoZWFkOiBmdW5jdGlvbih4cykge1xuICAgICAgcmV0dXJuIHhzWzBdO1xuICAgIH0sXG4gICAgYWx3YXlzOiBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB4O1xuICAgICAgfTtcbiAgICB9LFxuICAgIG5lZ2F0ZTogZnVuY3Rpb24oZikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgcmV0dXJuICFmKHgpO1xuICAgICAgfTtcbiAgICB9LFxuICAgIGVtcHR5OiBmdW5jdGlvbih4cykge1xuICAgICAgcmV0dXJuIHhzLmxlbmd0aCA9PT0gMDtcbiAgICB9LFxuICAgIHRhaWw6IGZ1bmN0aW9uKHhzKSB7XG4gICAgICByZXR1cm4geHMuc2xpY2UoMSwgeHMubGVuZ3RoKTtcbiAgICB9LFxuICAgIGZpbHRlcjogZnVuY3Rpb24oZiwgeHMpIHtcbiAgICAgIHZhciBmaWx0ZXJlZCwgaiwgbGVuMSwgeDtcbiAgICAgIGZpbHRlcmVkID0gW107XG4gICAgICBmb3IgKGogPSAwLCBsZW4xID0geHMubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICAgIHggPSB4c1tqXTtcbiAgICAgICAgaWYgKGYoeCkpIHtcbiAgICAgICAgICBmaWx0ZXJlZC5wdXNoKHgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmlsdGVyZWQ7XG4gICAgfSxcbiAgICBtYXA6IGZ1bmN0aW9uKGYsIHhzKSB7XG4gICAgICB2YXIgaiwgbGVuMSwgcmVzdWx0cywgeDtcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaiA9IDAsIGxlbjEgPSB4cy5sZW5ndGg7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgICAgeCA9IHhzW2pdO1xuICAgICAgICByZXN1bHRzLnB1c2goZih4KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9LFxuICAgIGVhY2g6IGZ1bmN0aW9uKHhzLCBmKSB7XG4gICAgICB2YXIga2V5LCB2YWx1ZTtcbiAgICAgIGZvciAoa2V5IGluIHhzKSB7XG4gICAgICAgIHZhbHVlID0geHNba2V5XTtcbiAgICAgICAgZihrZXksIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfSxcbiAgICB0b0FycmF5OiBmdW5jdGlvbih4cykge1xuICAgICAgaWYgKGlzQXJyYXkoeHMpKSB7XG4gICAgICAgIHJldHVybiB4cztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbeHNdO1xuICAgICAgfVxuICAgIH0sXG4gICAgY29udGFpbnM6IGZ1bmN0aW9uKHhzLCB4KSB7XG4gICAgICByZXR1cm4gXy5pbmRleE9mKHhzLCB4KSAhPT0gLTE7XG4gICAgfSxcbiAgICBpZDogZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHg7XG4gICAgfSxcbiAgICBsYXN0OiBmdW5jdGlvbih4cykge1xuICAgICAgcmV0dXJuIHhzW3hzLmxlbmd0aCAtIDFdO1xuICAgIH0sXG4gICAgYWxsOiBmdW5jdGlvbih4cywgZikge1xuICAgICAgdmFyIGosIGxlbjEsIHg7XG4gICAgICBpZiAoZiA9PSBudWxsKSB7XG4gICAgICAgIGYgPSBfLmlkO1xuICAgICAgfVxuICAgICAgZm9yIChqID0gMCwgbGVuMSA9IHhzLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgICB4ID0geHNbal07XG4gICAgICAgIGlmICghZih4KSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBhbnk6IGZ1bmN0aW9uKHhzLCBmKSB7XG4gICAgICB2YXIgaiwgbGVuMSwgeDtcbiAgICAgIGlmIChmID09IG51bGwpIHtcbiAgICAgICAgZiA9IF8uaWQ7XG4gICAgICB9XG4gICAgICBmb3IgKGogPSAwLCBsZW4xID0geHMubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICAgIHggPSB4c1tqXTtcbiAgICAgICAgaWYgKGYoeCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgd2l0aG91dDogZnVuY3Rpb24oeCwgeHMpIHtcbiAgICAgIHJldHVybiBfLmZpbHRlcigoZnVuY3Rpb24oeSkge1xuICAgICAgICByZXR1cm4geSAhPT0geDtcbiAgICAgIH0pLCB4cyk7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uKHgsIHhzKSB7XG4gICAgICB2YXIgaTtcbiAgICAgIGkgPSBfLmluZGV4T2YoeHMsIHgpO1xuICAgICAgaWYgKGkgPj0gMCkge1xuICAgICAgICByZXR1cm4geHMuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZm9sZDogZnVuY3Rpb24oeHMsIHNlZWQsIGYpIHtcbiAgICAgIHZhciBqLCBsZW4xLCB4O1xuICAgICAgZm9yIChqID0gMCwgbGVuMSA9IHhzLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgICB4ID0geHNbal07XG4gICAgICAgIHNlZWQgPSBmKHNlZWQsIHgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlZWQ7XG4gICAgfSxcbiAgICBmbGF0TWFwOiBmdW5jdGlvbihmLCB4cykge1xuICAgICAgcmV0dXJuIF8uZm9sZCh4cywgW10sIChmdW5jdGlvbih5cywgeCkge1xuICAgICAgICByZXR1cm4geXMuY29uY2F0KGYoeCkpO1xuICAgICAgfSkpO1xuICAgIH0sXG4gICAgY2FjaGVkOiBmdW5jdGlvbihmKSB7XG4gICAgICB2YXIgdmFsdWU7XG4gICAgICB2YWx1ZSA9IE5vbmU7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gTm9uZSkge1xuICAgICAgICAgIHZhbHVlID0gZigpO1xuICAgICAgICAgIGYgPSB2b2lkIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfTtcbiAgICB9LFxuICAgIGlzRnVuY3Rpb246IGZ1bmN0aW9uKGYpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgZiA9PT0gXCJmdW5jdGlvblwiO1xuICAgIH0sXG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgdmFyIGV4LCBpbnRlcm5hbHMsIGtleSwgdmFsdWU7XG4gICAgICB0cnkge1xuICAgICAgICByZWN1cnNpb25EZXB0aCsrO1xuICAgICAgICBpZiAob2JqID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gXCJ1bmRlZmluZWRcIjtcbiAgICAgICAgfSBlbHNlIGlmIChfLmlzRnVuY3Rpb24ob2JqKSkge1xuICAgICAgICAgIHJldHVybiBcImZ1bmN0aW9uXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgaWYgKHJlY3Vyc2lvbkRlcHRoID4gNSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiWy4uXVwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gXCJbXCIgKyBfLm1hcChfLnRvU3RyaW5nLCBvYmopLnRvU3RyaW5nKCkgKyBcIl1cIjtcbiAgICAgICAgfSBlbHNlIGlmICgoKG9iaiAhPSBudWxsID8gb2JqLnRvU3RyaW5nIDogdm9pZCAwKSAhPSBudWxsKSAmJiBvYmoudG9TdHJpbmcgIT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcpIHtcbiAgICAgICAgICByZXR1cm4gb2JqLnRvU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgIGlmIChyZWN1cnNpb25EZXB0aCA+IDUpIHtcbiAgICAgICAgICAgIHJldHVybiBcInsuLn1cIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaW50ZXJuYWxzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdHM7XG4gICAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgICAgICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgICAgaWYgKCFoYXNQcm9wLmNhbGwob2JqLCBrZXkpKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgdmFsdWUgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvYmpba2V5XTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChfZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgIGV4ID0gX2Vycm9yO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKF8udG9TdHJpbmcoa2V5KSArIFwiOlwiICsgXy50b1N0cmluZyh2YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgICAgfSkoKTtcbiAgICAgICAgICByZXR1cm4gXCJ7XCIgKyBpbnRlcm5hbHMgKyBcIn1cIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICByZWN1cnNpb25EZXB0aC0tO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZWN1cnNpb25EZXB0aCA9IDA7XG5cbiAgQmFjb24uXyA9IF87XG5cbiAgVXBkYXRlQmFycmllciA9IEJhY29uLlVwZGF0ZUJhcnJpZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFmdGVyVHJhbnNhY3Rpb24sIGFmdGVycywgYWZ0ZXJzSW5kZXgsIGN1cnJlbnRFdmVudElkLCBmbHVzaCwgZmx1c2hEZXBzT2YsIGZsdXNoV2FpdGVycywgaGFzV2FpdGVycywgaW5UcmFuc2FjdGlvbiwgcm9vdEV2ZW50LCB3YWl0ZXJPYnMsIHdhaXRlcnMsIHdoZW5Eb25lV2l0aCwgd3JhcHBlZFN1YnNjcmliZTtcbiAgICByb290RXZlbnQgPSB2b2lkIDA7XG4gICAgd2FpdGVyT2JzID0gW107XG4gICAgd2FpdGVycyA9IHt9O1xuICAgIGFmdGVycyA9IFtdO1xuICAgIGFmdGVyc0luZGV4ID0gMDtcbiAgICBhZnRlclRyYW5zYWN0aW9uID0gZnVuY3Rpb24oZikge1xuICAgICAgaWYgKHJvb3RFdmVudCkge1xuICAgICAgICByZXR1cm4gYWZ0ZXJzLnB1c2goZik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZigpO1xuICAgICAgfVxuICAgIH07XG4gICAgd2hlbkRvbmVXaXRoID0gZnVuY3Rpb24ob2JzLCBmKSB7XG4gICAgICB2YXIgb2JzV2FpdGVycztcbiAgICAgIGlmIChyb290RXZlbnQpIHtcbiAgICAgICAgb2JzV2FpdGVycyA9IHdhaXRlcnNbb2JzLmlkXTtcbiAgICAgICAgaWYgKG9ic1dhaXRlcnMgPT0gbnVsbCkge1xuICAgICAgICAgIG9ic1dhaXRlcnMgPSB3YWl0ZXJzW29icy5pZF0gPSBbZl07XG4gICAgICAgICAgcmV0dXJuIHdhaXRlck9icy5wdXNoKG9icyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG9ic1dhaXRlcnMucHVzaChmKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGYoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGZsdXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICB3aGlsZSAod2FpdGVyT2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZmx1c2hXYWl0ZXJzKDApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9O1xuICAgIGZsdXNoV2FpdGVycyA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICB2YXIgZiwgaiwgbGVuMSwgb2JzLCBvYnNJZCwgb2JzV2FpdGVycztcbiAgICAgIG9icyA9IHdhaXRlck9ic1tpbmRleF07XG4gICAgICBvYnNJZCA9IG9icy5pZDtcbiAgICAgIG9ic1dhaXRlcnMgPSB3YWl0ZXJzW29ic0lkXTtcbiAgICAgIHdhaXRlck9icy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgZGVsZXRlIHdhaXRlcnNbb2JzSWRdO1xuICAgICAgZmx1c2hEZXBzT2Yob2JzKTtcbiAgICAgIGZvciAoaiA9IDAsIGxlbjEgPSBvYnNXYWl0ZXJzLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgICBmID0gb2JzV2FpdGVyc1tqXTtcbiAgICAgICAgZigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9O1xuICAgIGZsdXNoRGVwc09mID0gZnVuY3Rpb24ob2JzKSB7XG4gICAgICB2YXIgZGVwLCBkZXBzLCBpbmRleCwgaiwgbGVuMTtcbiAgICAgIGRlcHMgPSBvYnMuaW50ZXJuYWxEZXBzKCk7XG4gICAgICBmb3IgKGogPSAwLCBsZW4xID0gZGVwcy5sZW5ndGg7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgICAgZGVwID0gZGVwc1tqXTtcbiAgICAgICAgZmx1c2hEZXBzT2YoZGVwKTtcbiAgICAgICAgaWYgKHdhaXRlcnNbZGVwLmlkXSkge1xuICAgICAgICAgIGluZGV4ID0gXy5pbmRleE9mKHdhaXRlck9icywgZGVwKTtcbiAgICAgICAgICBmbHVzaFdhaXRlcnMoaW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH07XG4gICAgaW5UcmFuc2FjdGlvbiA9IGZ1bmN0aW9uKGV2ZW50LCBjb250ZXh0LCBmLCBhcmdzKSB7XG4gICAgICB2YXIgYWZ0ZXIsIHJlc3VsdDtcbiAgICAgIGlmIChyb290RXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIGYuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb290RXZlbnQgPSBldmVudDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXN1bHQgPSBmLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgIGZsdXNoKCk7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgcm9vdEV2ZW50ID0gdm9pZCAwO1xuICAgICAgICAgIHdoaWxlIChhZnRlcnNJbmRleCA8IGFmdGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGFmdGVyID0gYWZ0ZXJzW2FmdGVyc0luZGV4XTtcbiAgICAgICAgICAgIGFmdGVyc0luZGV4Kys7XG4gICAgICAgICAgICBhZnRlcigpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhZnRlcnNJbmRleCA9IDA7XG4gICAgICAgICAgYWZ0ZXJzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9O1xuICAgIGN1cnJlbnRFdmVudElkID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAocm9vdEV2ZW50KSB7XG4gICAgICAgIHJldHVybiByb290RXZlbnQuaWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgfVxuICAgIH07XG4gICAgd3JhcHBlZFN1YnNjcmliZSA9IGZ1bmN0aW9uKG9icywgc2luaykge1xuICAgICAgdmFyIGRvVW5zdWIsIHNob3VsZFVuc3ViLCB1bnN1YiwgdW5zdWJkO1xuICAgICAgdW5zdWJkID0gZmFsc2U7XG4gICAgICBzaG91bGRVbnN1YiA9IGZhbHNlO1xuICAgICAgZG9VbnN1YiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gc2hvdWxkVW5zdWIgPSB0cnVlO1xuICAgICAgfTtcbiAgICAgIHVuc3ViID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHVuc3ViZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBkb1Vuc3ViKCk7XG4gICAgICB9O1xuICAgICAgZG9VbnN1YiA9IG9icy5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICByZXR1cm4gYWZ0ZXJUcmFuc2FjdGlvbihmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgcmVwbHk7XG4gICAgICAgICAgaWYgKCF1bnN1YmQpIHtcbiAgICAgICAgICAgIHJlcGx5ID0gc2luayhldmVudCk7XG4gICAgICAgICAgICBpZiAocmVwbHkgPT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgICByZXR1cm4gdW5zdWIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBpZiAoc2hvdWxkVW5zdWIpIHtcbiAgICAgICAgZG9VbnN1YigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHVuc3ViO1xuICAgIH07XG4gICAgaGFzV2FpdGVycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHdhaXRlck9icy5sZW5ndGggPiAwO1xuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIHdoZW5Eb25lV2l0aDogd2hlbkRvbmVXaXRoLFxuICAgICAgaGFzV2FpdGVyczogaGFzV2FpdGVycyxcbiAgICAgIGluVHJhbnNhY3Rpb246IGluVHJhbnNhY3Rpb24sXG4gICAgICBjdXJyZW50RXZlbnRJZDogY3VycmVudEV2ZW50SWQsXG4gICAgICB3cmFwcGVkU3Vic2NyaWJlOiB3cmFwcGVkU3Vic2NyaWJlLFxuICAgICAgYWZ0ZXJUcmFuc2FjdGlvbjogYWZ0ZXJUcmFuc2FjdGlvblxuICAgIH07XG4gIH0pKCk7XG5cbiAgU291cmNlID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIFNvdXJjZShvYnMxLCBzeW5jLCBsYXp5MSkge1xuICAgICAgdGhpcy5vYnMgPSBvYnMxO1xuICAgICAgdGhpcy5zeW5jID0gc3luYztcbiAgICAgIHRoaXMubGF6eSA9IGxhenkxICE9IG51bGwgPyBsYXp5MSA6IGZhbHNlO1xuICAgICAgdGhpcy5xdWV1ZSA9IFtdO1xuICAgIH1cblxuICAgIFNvdXJjZS5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24oc2luaykge1xuICAgICAgcmV0dXJuIHRoaXMub2JzLmRpc3BhdGNoZXIuc3Vic2NyaWJlKHNpbmspO1xuICAgIH07XG5cbiAgICBTb3VyY2UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5vYnMudG9TdHJpbmcoKTtcbiAgICB9O1xuXG4gICAgU291cmNlLnByb3RvdHlwZS5tYXJrRW5kZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmVuZGVkID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgU291cmNlLnByb3RvdHlwZS5jb25zdW1lID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5sYXp5KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdmFsdWU6IF8uYWx3YXlzKHRoaXMucXVldWVbMF0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5xdWV1ZVswXTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgU291cmNlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHRoaXMucXVldWUgPSBbeF07XG4gICAgfTtcblxuICAgIFNvdXJjZS5wcm90b3R5cGUubWF5SGF2ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIFNvdXJjZS5wcm90b3R5cGUuaGFzQXRMZWFzdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMucXVldWUubGVuZ3RoO1xuICAgIH07XG5cbiAgICBTb3VyY2UucHJvdG90eXBlLmZsYXR0ZW4gPSB0cnVlO1xuXG4gICAgcmV0dXJuIFNvdXJjZTtcblxuICB9KSgpO1xuXG4gIENvbnN1bWluZ1NvdXJjZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gICAgZXh0ZW5kKENvbnN1bWluZ1NvdXJjZSwgc3VwZXJDbGFzcyk7XG5cbiAgICBmdW5jdGlvbiBDb25zdW1pbmdTb3VyY2UoKSB7XG4gICAgICByZXR1cm4gQ29uc3VtaW5nU291cmNlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIENvbnN1bWluZ1NvdXJjZS5wcm90b3R5cGUuY29uc3VtZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMucXVldWUuc2hpZnQoKTtcbiAgICB9O1xuXG4gICAgQ29uc3VtaW5nU291cmNlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHRoaXMucXVldWUucHVzaCh4KTtcbiAgICB9O1xuXG4gICAgQ29uc3VtaW5nU291cmNlLnByb3RvdHlwZS5tYXlIYXZlID0gZnVuY3Rpb24oYykge1xuICAgICAgcmV0dXJuICF0aGlzLmVuZGVkIHx8IHRoaXMucXVldWUubGVuZ3RoID49IGM7XG4gICAgfTtcblxuICAgIENvbnN1bWluZ1NvdXJjZS5wcm90b3R5cGUuaGFzQXRMZWFzdCA9IGZ1bmN0aW9uKGMpIHtcbiAgICAgIHJldHVybiB0aGlzLnF1ZXVlLmxlbmd0aCA+PSBjO1xuICAgIH07XG5cbiAgICBDb25zdW1pbmdTb3VyY2UucHJvdG90eXBlLmZsYXR0ZW4gPSBmYWxzZTtcblxuICAgIHJldHVybiBDb25zdW1pbmdTb3VyY2U7XG5cbiAgfSkoU291cmNlKTtcblxuICBCdWZmZXJpbmdTb3VyY2UgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICAgIGV4dGVuZChCdWZmZXJpbmdTb3VyY2UsIHN1cGVyQ2xhc3MpO1xuXG4gICAgZnVuY3Rpb24gQnVmZmVyaW5nU291cmNlKG9icykge1xuICAgICAgQnVmZmVyaW5nU291cmNlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIG9icywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgQnVmZmVyaW5nU291cmNlLnByb3RvdHlwZS5jb25zdW1lID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdmFsdWVzO1xuICAgICAgdmFsdWVzID0gdGhpcy5xdWV1ZTtcbiAgICAgIHRoaXMucXVldWUgPSBbXTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG5cbiAgICBCdWZmZXJpbmdTb3VyY2UucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gdGhpcy5xdWV1ZS5wdXNoKHgudmFsdWUoKSk7XG4gICAgfTtcblxuICAgIEJ1ZmZlcmluZ1NvdXJjZS5wcm90b3R5cGUuaGFzQXRMZWFzdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIHJldHVybiBCdWZmZXJpbmdTb3VyY2U7XG5cbiAgfSkoU291cmNlKTtcblxuICBTb3VyY2UuaXNUcmlnZ2VyID0gZnVuY3Rpb24ocykge1xuICAgIGlmIChzIGluc3RhbmNlb2YgU291cmNlKSB7XG4gICAgICByZXR1cm4gcy5zeW5jO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcyBpbnN0YW5jZW9mIEV2ZW50U3RyZWFtO1xuICAgIH1cbiAgfTtcblxuICBTb3VyY2UuZnJvbU9ic2VydmFibGUgPSBmdW5jdGlvbihzKSB7XG4gICAgaWYgKHMgaW5zdGFuY2VvZiBTb3VyY2UpIHtcbiAgICAgIHJldHVybiBzO1xuICAgIH0gZWxzZSBpZiAocyBpbnN0YW5jZW9mIFByb3BlcnR5KSB7XG4gICAgICByZXR1cm4gbmV3IFNvdXJjZShzLCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgQ29uc3VtaW5nU291cmNlKHMsIHRydWUpO1xuICAgIH1cbiAgfTtcblxuICBEZXNjID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIERlc2MoY29udGV4dDEsIG1ldGhvZDEsIGFyZ3MxKSB7XG4gICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0MTtcbiAgICAgIHRoaXMubWV0aG9kID0gbWV0aG9kMTtcbiAgICAgIHRoaXMuYXJncyA9IGFyZ3MxO1xuICAgICAgdGhpcy5jYWNoZWQgPSB2b2lkIDA7XG4gICAgfVxuXG4gICAgRGVzYy5wcm90b3R5cGUuZGVwcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVkIHx8ICh0aGlzLmNhY2hlZCA9IGZpbmREZXBzKFt0aGlzLmNvbnRleHRdLmNvbmNhdCh0aGlzLmFyZ3MpKSk7XG4gICAgfTtcblxuICAgIERlc2MucHJvdG90eXBlLmFwcGx5ID0gZnVuY3Rpb24ob2JzKSB7XG4gICAgICBvYnMuZGVzYyA9IHRoaXM7XG4gICAgICByZXR1cm4gb2JzO1xuICAgIH07XG5cbiAgICBEZXNjLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIF8udG9TdHJpbmcodGhpcy5jb250ZXh0KSArIFwiLlwiICsgXy50b1N0cmluZyh0aGlzLm1ldGhvZCkgKyBcIihcIiArIF8ubWFwKF8udG9TdHJpbmcsIHRoaXMuYXJncykgKyBcIilcIjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIERlc2M7XG5cbiAgfSkoKTtcblxuICBkZXNjcmliZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzLCBjb250ZXh0LCBtZXRob2Q7XG4gICAgY29udGV4dCA9IGFyZ3VtZW50c1swXSwgbWV0aG9kID0gYXJndW1lbnRzWzFdLCBhcmdzID0gMyA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpIDogW107XG4gICAgaWYgKChjb250ZXh0IHx8IG1ldGhvZCkgaW5zdGFuY2VvZiBEZXNjKSB7XG4gICAgICByZXR1cm4gY29udGV4dCB8fCBtZXRob2Q7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgRGVzYyhjb250ZXh0LCBtZXRob2QsIGFyZ3MpO1xuICAgIH1cbiAgfTtcblxuICB3aXRoRGVzY3JpcHRpb24gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZGVzYywgaiwgb2JzO1xuICAgIGRlc2MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMCwgaiA9IGFyZ3VtZW50cy5sZW5ndGggLSAxKSA6IChqID0gMCwgW10pLCBvYnMgPSBhcmd1bWVudHNbaisrXTtcbiAgICByZXR1cm4gZGVzY3JpYmUuYXBwbHkobnVsbCwgZGVzYykuYXBwbHkob2JzKTtcbiAgfTtcblxuICBmaW5kRGVwcyA9IGZ1bmN0aW9uKHgpIHtcbiAgICBpZiAoaXNBcnJheSh4KSkge1xuICAgICAgcmV0dXJuIF8uZmxhdE1hcChmaW5kRGVwcywgeCk7XG4gICAgfSBlbHNlIGlmIChpc09ic2VydmFibGUoeCkpIHtcbiAgICAgIHJldHVybiBbeF07XG4gICAgfSBlbHNlIGlmICh4IGluc3RhbmNlb2YgU291cmNlKSB7XG4gICAgICByZXR1cm4gW3gub2JzXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfTtcblxuICB3aXRoTWV0aG9kQ2FsbFN1cHBvcnQgPSBmdW5jdGlvbih3cmFwcGVkKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MsIGNvbnRleHQsIGYsIG1ldGhvZE5hbWU7XG4gICAgICBmID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgICBpZiAodHlwZW9mIGYgPT09IFwib2JqZWN0XCIgJiYgYXJncy5sZW5ndGgpIHtcbiAgICAgICAgY29udGV4dCA9IGY7XG4gICAgICAgIG1ldGhvZE5hbWUgPSBhcmdzWzBdO1xuICAgICAgICBmID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnRleHRbbWV0aG9kTmFtZV0uYXBwbHkoY29udGV4dCwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgICAgYXJncyA9IGFyZ3Muc2xpY2UoMSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gd3JhcHBlZC5hcHBseShudWxsLCBbZl0uY29uY2F0KHNsaWNlLmNhbGwoYXJncykpKTtcbiAgICB9O1xuICB9O1xuXG4gIG1ha2VGdW5jdGlvbkFyZ3MgPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xuICAgIHJldHVybiBtYWtlRnVuY3Rpb25fLmFwcGx5KG51bGwsIGFyZ3MpO1xuICB9O1xuXG4gIHBhcnRpYWxseUFwcGxpZWQgPSBmdW5jdGlvbihmLCBhcHBsaWVkKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3M7XG4gICAgICBhcmdzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgICByZXR1cm4gZi5hcHBseShudWxsLCBhcHBsaWVkLmNvbmNhdChhcmdzKSk7XG4gICAgfTtcbiAgfTtcblxuICB0b1NpbXBsZUV4dHJhY3RvciA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgdmFyIGZpZWxkVmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmaWVsZFZhbHVlID0gdmFsdWVba2V5XTtcbiAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGZpZWxkVmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmllbGRWYWx1ZS5hcHBseSh2YWx1ZSwgYXJncyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmaWVsZFZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICB9O1xuXG4gIHRvRmllbGRFeHRyYWN0b3IgPSBmdW5jdGlvbihmLCBhcmdzKSB7XG4gICAgdmFyIHBhcnRGdW5jcywgcGFydHM7XG4gICAgcGFydHMgPSBmLnNsaWNlKDEpLnNwbGl0KFwiLlwiKTtcbiAgICBwYXJ0RnVuY3MgPSBfLm1hcCh0b1NpbXBsZUV4dHJhY3RvcihhcmdzKSwgcGFydHMpO1xuICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIGosIGxlbjE7XG4gICAgICBmb3IgKGogPSAwLCBsZW4xID0gcGFydEZ1bmNzLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgICBmID0gcGFydEZ1bmNzW2pdO1xuICAgICAgICB2YWx1ZSA9IGYodmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gIH07XG5cbiAgaXNGaWVsZEtleSA9IGZ1bmN0aW9uKGYpIHtcbiAgICByZXR1cm4gKHR5cGVvZiBmID09PSBcInN0cmluZ1wiKSAmJiBmLmxlbmd0aCA+IDEgJiYgZi5jaGFyQXQoMCkgPT09IFwiLlwiO1xuICB9O1xuXG4gIG1ha2VGdW5jdGlvbl8gPSB3aXRoTWV0aG9kQ2FsbFN1cHBvcnQoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MsIGY7XG4gICAgZiA9IGFyZ3VtZW50c1swXSwgYXJncyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgIGlmIChfLmlzRnVuY3Rpb24oZikpIHtcbiAgICAgIGlmIChhcmdzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gcGFydGlhbGx5QXBwbGllZChmLCBhcmdzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNGaWVsZEtleShmKSkge1xuICAgICAgcmV0dXJuIHRvRmllbGRFeHRyYWN0b3IoZiwgYXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBfLmFsd2F5cyhmKTtcbiAgICB9XG4gIH0pO1xuXG4gIG1ha2VGdW5jdGlvbiA9IGZ1bmN0aW9uKGYsIGFyZ3MpIHtcbiAgICByZXR1cm4gbWFrZUZ1bmN0aW9uXy5hcHBseShudWxsLCBbZl0uY29uY2F0KHNsaWNlLmNhbGwoYXJncykpKTtcbiAgfTtcblxuICBjb252ZXJ0QXJnc1RvRnVuY3Rpb24gPSBmdW5jdGlvbihvYnMsIGYsIGFyZ3MsIG1ldGhvZCkge1xuICAgIHZhciBzYW1wbGVkO1xuICAgIGlmIChmIGluc3RhbmNlb2YgUHJvcGVydHkpIHtcbiAgICAgIHNhbXBsZWQgPSBmLnNhbXBsZWRCeShvYnMsIGZ1bmN0aW9uKHAsIHMpIHtcbiAgICAgICAgcmV0dXJuIFtwLCBzXTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG1ldGhvZC5jYWxsKHNhbXBsZWQsIGZ1bmN0aW9uKGFyZykge1xuICAgICAgICB2YXIgcCwgcztcbiAgICAgICAgcCA9IGFyZ1swXSwgcyA9IGFyZ1sxXTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgICB9KS5tYXAoZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHZhciBwLCBzO1xuICAgICAgICBwID0gYXJnWzBdLCBzID0gYXJnWzFdO1xuICAgICAgICByZXR1cm4gcztcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBmID0gbWFrZUZ1bmN0aW9uKGYsIGFyZ3MpO1xuICAgICAgcmV0dXJuIG1ldGhvZC5jYWxsKG9icywgZik7XG4gICAgfVxuICB9O1xuXG4gIHRvQ29tYmluYXRvciA9IGZ1bmN0aW9uKGYpIHtcbiAgICB2YXIga2V5O1xuICAgIGlmIChfLmlzRnVuY3Rpb24oZikpIHtcbiAgICAgIHJldHVybiBmO1xuICAgIH0gZWxzZSBpZiAoaXNGaWVsZEtleShmKSkge1xuICAgICAga2V5ID0gdG9GaWVsZEtleShmKTtcbiAgICAgIHJldHVybiBmdW5jdGlvbihsZWZ0LCByaWdodCkge1xuICAgICAgICByZXR1cm4gbGVmdFtrZXldKHJpZ2h0KTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJub3QgYSBmdW5jdGlvbiBvciBhIGZpZWxkIGtleTogXCIgKyBmKTtcbiAgICB9XG4gIH07XG5cbiAgdG9GaWVsZEtleSA9IGZ1bmN0aW9uKGYpIHtcbiAgICByZXR1cm4gZi5zbGljZSgxKTtcbiAgfTtcblxuICBTb21lID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIFNvbWUodmFsdWUxKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWUxO1xuICAgIH1cblxuICAgIFNvbWUucHJvdG90eXBlLmdldE9yRWxzZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfTtcblxuICAgIFNvbWUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfTtcblxuICAgIFNvbWUucHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uKGYpIHtcbiAgICAgIGlmIChmKHRoaXMudmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBuZXcgU29tZSh0aGlzLnZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBOb25lO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBTb21lLnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbihmKSB7XG4gICAgICByZXR1cm4gbmV3IFNvbWUoZih0aGlzLnZhbHVlKSk7XG4gICAgfTtcblxuICAgIFNvbWUucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihmKSB7XG4gICAgICByZXR1cm4gZih0aGlzLnZhbHVlKTtcbiAgICB9O1xuXG4gICAgU29tZS5wcm90b3R5cGUuaXNEZWZpbmVkID0gdHJ1ZTtcblxuICAgIFNvbWUucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBbdGhpcy52YWx1ZV07XG4gICAgfTtcblxuICAgIFNvbWUucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBcIlNvbWUoXCIgKyB0aGlzLnZhbHVlICsgXCIpXCI7XG4gICAgfTtcblxuICAgIFNvbWUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbnNwZWN0KCk7XG4gICAgfTtcblxuICAgIHJldHVybiBTb21lO1xuXG4gIH0pKCk7XG5cbiAgTm9uZSA9IHtcbiAgICBnZXRPckVsc2U6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgICBmaWx0ZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIE5vbmU7XG4gICAgfSxcbiAgICBtYXA6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIE5vbmU7XG4gICAgfSxcbiAgICBmb3JFYWNoOiBmdW5jdGlvbigpIHt9LFxuICAgIGlzRGVmaW5lZDogZmFsc2UsXG4gICAgdG9BcnJheTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfSxcbiAgICBpbnNwZWN0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBcIk5vbmVcIjtcbiAgICB9LFxuICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmluc3BlY3QoKTtcbiAgICB9XG4gIH07XG5cbiAgdG9PcHRpb24gPSBmdW5jdGlvbih2KSB7XG4gICAgaWYgKHYgaW5zdGFuY2VvZiBTb21lIHx8IHYgPT09IE5vbmUpIHtcbiAgICAgIHJldHVybiB2O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IFNvbWUodik7XG4gICAgfVxuICB9O1xuXG4gIEJhY29uLm5vTW9yZSA9IFtcIjxuby1tb3JlPlwiXTtcblxuICBCYWNvbi5tb3JlID0gW1wiPG1vcmU+XCJdO1xuXG4gIGV2ZW50SWRDb3VudGVyID0gMDtcblxuICBFdmVudCA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBFdmVudCgpIHtcbiAgICAgIHRoaXMuaWQgPSArK2V2ZW50SWRDb3VudGVyO1xuICAgIH1cblxuICAgIEV2ZW50LnByb3RvdHlwZS5pc0V2ZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgRXZlbnQucHJvdG90eXBlLmlzRW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIEV2ZW50LnByb3RvdHlwZS5pc0luaXRpYWwgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgRXZlbnQucHJvdG90eXBlLmlzTmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBFdmVudC5wcm90b3R5cGUuaXNFcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBFdmVudC5wcm90b3R5cGUuaGFzVmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgRXZlbnQucHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIEV2ZW50LnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50b1N0cmluZygpO1xuICAgIH07XG5cbiAgICBFdmVudC5wcm90b3R5cGUubG9nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50b1N0cmluZygpO1xuICAgIH07XG5cbiAgICByZXR1cm4gRXZlbnQ7XG5cbiAgfSkoKTtcblxuICBOZXh0ID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgICBleHRlbmQoTmV4dCwgc3VwZXJDbGFzcyk7XG5cbiAgICBmdW5jdGlvbiBOZXh0KHZhbHVlRiwgZWFnZXIpIHtcbiAgICAgIE5leHQuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcyk7XG4gICAgICBpZiAoIWVhZ2VyICYmIF8uaXNGdW5jdGlvbih2YWx1ZUYpIHx8IHZhbHVlRiBpbnN0YW5jZW9mIE5leHQpIHtcbiAgICAgICAgdGhpcy52YWx1ZUYgPSB2YWx1ZUY7XG4gICAgICAgIHRoaXMudmFsdWVJbnRlcm5hbCA9IHZvaWQgMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmFsdWVGID0gdm9pZCAwO1xuICAgICAgICB0aGlzLnZhbHVlSW50ZXJuYWwgPSB2YWx1ZUY7XG4gICAgICB9XG4gICAgfVxuXG4gICAgTmV4dC5wcm90b3R5cGUuaXNOZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgTmV4dC5wcm90b3R5cGUuaGFzVmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBOZXh0LnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMudmFsdWVGIGluc3RhbmNlb2YgTmV4dCkge1xuICAgICAgICB0aGlzLnZhbHVlSW50ZXJuYWwgPSB0aGlzLnZhbHVlRi52YWx1ZSgpO1xuICAgICAgICB0aGlzLnZhbHVlRiA9IHZvaWQgMDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy52YWx1ZUYpIHtcbiAgICAgICAgdGhpcy52YWx1ZUludGVybmFsID0gdGhpcy52YWx1ZUYoKTtcbiAgICAgICAgdGhpcy52YWx1ZUYgPSB2b2lkIDA7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZUludGVybmFsO1xuICAgIH07XG5cbiAgICBOZXh0LnByb3RvdHlwZS5mbWFwID0gZnVuY3Rpb24oZikge1xuICAgICAgdmFyIGV2ZW50LCB2YWx1ZTtcbiAgICAgIGlmICh0aGlzLnZhbHVlSW50ZXJuYWwpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLnZhbHVlSW50ZXJuYWw7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBmKHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBldmVudCA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBmKGV2ZW50LnZhbHVlKCkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgTmV4dC5wcm90b3R5cGUuYXBwbHkgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIG5ldyBOZXh0KHZhbHVlKTtcbiAgICB9O1xuXG4gICAgTmV4dC5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24oZikge1xuICAgICAgcmV0dXJuIGYodGhpcy52YWx1ZSgpKTtcbiAgICB9O1xuXG4gICAgTmV4dC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBfLnRvU3RyaW5nKHRoaXMudmFsdWUoKSk7XG4gICAgfTtcblxuICAgIE5leHQucHJvdG90eXBlLmxvZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWUoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIE5leHQ7XG5cbiAgfSkoRXZlbnQpO1xuXG4gIEluaXRpYWwgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICAgIGV4dGVuZChJbml0aWFsLCBzdXBlckNsYXNzKTtcblxuICAgIGZ1bmN0aW9uIEluaXRpYWwoKSB7XG4gICAgICByZXR1cm4gSW5pdGlhbC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICBJbml0aWFsLnByb3RvdHlwZS5pc0luaXRpYWwgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBJbml0aWFsLnByb3RvdHlwZS5pc05leHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgSW5pdGlhbC5wcm90b3R5cGUuYXBwbHkgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIG5ldyBJbml0aWFsKHZhbHVlKTtcbiAgICB9O1xuXG4gICAgSW5pdGlhbC5wcm90b3R5cGUudG9OZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbmV3IE5leHQodGhpcyk7XG4gICAgfTtcblxuICAgIHJldHVybiBJbml0aWFsO1xuXG4gIH0pKE5leHQpO1xuXG4gIEVuZCA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gICAgZXh0ZW5kKEVuZCwgc3VwZXJDbGFzcyk7XG5cbiAgICBmdW5jdGlvbiBFbmQoKSB7XG4gICAgICByZXR1cm4gRW5kLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIEVuZC5wcm90b3R5cGUuaXNFbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBFbmQucHJvdG90eXBlLmZtYXAgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBFbmQucHJvdG90eXBlLmFwcGx5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgRW5kLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFwiPGVuZD5cIjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEVuZDtcblxuICB9KShFdmVudCk7XG5cbiAgRXJyb3IgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICAgIGV4dGVuZChFcnJvciwgc3VwZXJDbGFzcyk7XG5cbiAgICBmdW5jdGlvbiBFcnJvcihlcnJvcjEpIHtcbiAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjE7XG4gICAgfVxuXG4gICAgRXJyb3IucHJvdG90eXBlLmlzRXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBFcnJvci5wcm90b3R5cGUuZm1hcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIEVycm9yLnByb3RvdHlwZS5hcHBseSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIEVycm9yLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFwiPGVycm9yPiBcIiArIF8udG9TdHJpbmcodGhpcy5lcnJvcik7XG4gICAgfTtcblxuICAgIHJldHVybiBFcnJvcjtcblxuICB9KShFdmVudCk7XG5cbiAgQmFjb24uRXZlbnQgPSBFdmVudDtcblxuICBCYWNvbi5Jbml0aWFsID0gSW5pdGlhbDtcblxuICBCYWNvbi5OZXh0ID0gTmV4dDtcblxuICBCYWNvbi5FbmQgPSBFbmQ7XG5cbiAgQmFjb24uRXJyb3IgPSBFcnJvcjtcblxuICBpbml0aWFsRXZlbnQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgSW5pdGlhbCh2YWx1ZSwgdHJ1ZSk7XG4gIH07XG5cbiAgbmV4dEV2ZW50ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IE5leHQodmFsdWUsIHRydWUpO1xuICB9O1xuXG4gIGVuZEV2ZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBFbmQoKTtcbiAgfTtcblxuICB0b0V2ZW50ID0gZnVuY3Rpb24oeCkge1xuICAgIGlmICh4IGluc3RhbmNlb2YgRXZlbnQpIHtcbiAgICAgIHJldHVybiB4O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV4dEV2ZW50KHgpO1xuICAgIH1cbiAgfTtcblxuICBpZENvdW50ZXIgPSAwO1xuXG4gIHJlZ2lzdGVyT2JzID0gZnVuY3Rpb24oKSB7fTtcblxuICBPYnNlcnZhYmxlID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIE9ic2VydmFibGUoZGVzYykge1xuICAgICAgdGhpcy5pZCA9ICsraWRDb3VudGVyO1xuICAgICAgd2l0aERlc2NyaXB0aW9uKGRlc2MsIHRoaXMpO1xuICAgICAgdGhpcy5pbml0aWFsRGVzYyA9IHRoaXMuZGVzYztcbiAgICB9XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbihzaW5rKSB7XG4gICAgICByZXR1cm4gVXBkYXRlQmFycmllci53cmFwcGVkU3Vic2NyaWJlKHRoaXMsIHNpbmspO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5zdWJzY3JpYmVJbnRlcm5hbCA9IGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgIHJldHVybiB0aGlzLmRpc3BhdGNoZXIuc3Vic2NyaWJlKHNpbmspO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5vblZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZjtcbiAgICAgIGYgPSBtYWtlRnVuY3Rpb25BcmdzKGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm4gdGhpcy5zdWJzY3JpYmUoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50Lmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgICByZXR1cm4gZihldmVudC52YWx1ZSgpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLm9uVmFsdWVzID0gZnVuY3Rpb24oZikge1xuICAgICAgcmV0dXJuIHRoaXMub25WYWx1ZShmdW5jdGlvbihhcmdzKSB7XG4gICAgICAgIHJldHVybiBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLm9uRXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBmO1xuICAgICAgZiA9IG1ha2VGdW5jdGlvbkFyZ3MoYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiB0aGlzLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuaXNFcnJvcigpKSB7XG4gICAgICAgICAgcmV0dXJuIGYoZXZlbnQuZXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUub25FbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBmO1xuICAgICAgZiA9IG1ha2VGdW5jdGlvbkFyZ3MoYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiB0aGlzLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgIHJldHVybiBmKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5uYW1lID0gZnVuY3Rpb24obmFtZSkge1xuICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUud2l0aERlc2NyaXB0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZGVzY3JpYmUuYXBwbHkobnVsbCwgYXJndW1lbnRzKS5hcHBseSh0aGlzKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLl9uYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVzYy50b1N0cmluZygpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5pbnRlcm5hbERlcHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmluaXRpYWxEZXNjLmRlcHMoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIE9ic2VydmFibGU7XG5cbiAgfSkoKTtcblxuICBPYnNlcnZhYmxlLnByb3RvdHlwZS5hc3NpZ24gPSBPYnNlcnZhYmxlLnByb3RvdHlwZS5vblZhbHVlO1xuXG4gIE9ic2VydmFibGUucHJvdG90eXBlLmZvckVhY2ggPSBPYnNlcnZhYmxlLnByb3RvdHlwZS5vblZhbHVlO1xuXG4gIE9ic2VydmFibGUucHJvdG90eXBlLmluc3BlY3QgPSBPYnNlcnZhYmxlLnByb3RvdHlwZS50b1N0cmluZztcblxuICBCYWNvbi5PYnNlcnZhYmxlID0gT2JzZXJ2YWJsZTtcblxuICBDb21wb3NpdGVVbnN1YnNjcmliZSA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBDb21wb3NpdGVVbnN1YnNjcmliZShzcykge1xuICAgICAgdmFyIGosIGxlbjEsIHM7XG4gICAgICBpZiAoc3MgPT0gbnVsbCkge1xuICAgICAgICBzcyA9IFtdO1xuICAgICAgfVxuICAgICAgdGhpcy51bnN1YnNjcmliZSA9IGJpbmQodGhpcy51bnN1YnNjcmliZSwgdGhpcyk7XG4gICAgICB0aGlzLnVuc3Vic2NyaWJlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zID0gW107XG4gICAgICB0aGlzLnN0YXJ0aW5nID0gW107XG4gICAgICBmb3IgKGogPSAwLCBsZW4xID0gc3MubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICAgIHMgPSBzc1tqXTtcbiAgICAgICAgdGhpcy5hZGQocyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgQ29tcG9zaXRlVW5zdWJzY3JpYmUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKHN1YnNjcmlwdGlvbikge1xuICAgICAgdmFyIGVuZGVkLCB1bnN1YiwgdW5zdWJNZTtcbiAgICAgIGlmICh0aGlzLnVuc3Vic2NyaWJlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBlbmRlZCA9IGZhbHNlO1xuICAgICAgdW5zdWIgPSBub3A7XG4gICAgICB0aGlzLnN0YXJ0aW5nLnB1c2goc3Vic2NyaXB0aW9uKTtcbiAgICAgIHVuc3ViTWUgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChfdGhpcy51bnN1YnNjcmliZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZW5kZWQgPSB0cnVlO1xuICAgICAgICAgIF90aGlzLnJlbW92ZSh1bnN1Yik7XG4gICAgICAgICAgcmV0dXJuIF8ucmVtb3ZlKHN1YnNjcmlwdGlvbiwgX3RoaXMuc3RhcnRpbmcpO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcyk7XG4gICAgICB1bnN1YiA9IHN1YnNjcmlwdGlvbih0aGlzLnVuc3Vic2NyaWJlLCB1bnN1Yk1lKTtcbiAgICAgIGlmICghKHRoaXMudW5zdWJzY3JpYmVkIHx8IGVuZGVkKSkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh1bnN1Yik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1bnN1YigpO1xuICAgICAgfVxuICAgICAgXy5yZW1vdmUoc3Vic2NyaXB0aW9uLCB0aGlzLnN0YXJ0aW5nKTtcbiAgICAgIHJldHVybiB1bnN1YjtcbiAgICB9O1xuXG4gICAgQ29tcG9zaXRlVW5zdWJzY3JpYmUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKHVuc3ViKSB7XG4gICAgICBpZiAodGhpcy51bnN1YnNjcmliZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKChfLnJlbW92ZSh1bnN1YiwgdGhpcy5zdWJzY3JpcHRpb25zKSkgIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gdW5zdWIoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgQ29tcG9zaXRlVW5zdWJzY3JpYmUucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaiwgbGVuMSwgcmVmLCBzO1xuICAgICAgaWYgKHRoaXMudW5zdWJzY3JpYmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMudW5zdWJzY3JpYmVkID0gdHJ1ZTtcbiAgICAgIHJlZiA9IHRoaXMuc3Vic2NyaXB0aW9ucztcbiAgICAgIGZvciAoaiA9IDAsIGxlbjEgPSByZWYubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICAgIHMgPSByZWZbal07XG4gICAgICAgIHMoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IFtdO1xuICAgICAgcmV0dXJuIHRoaXMuc3RhcnRpbmcgPSBbXTtcbiAgICB9O1xuXG4gICAgQ29tcG9zaXRlVW5zdWJzY3JpYmUucHJvdG90eXBlLmNvdW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy51bnN1YnNjcmliZWQpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5zdWJzY3JpcHRpb25zLmxlbmd0aCArIHRoaXMuc3RhcnRpbmcubGVuZ3RoO1xuICAgIH07XG5cbiAgICBDb21wb3NpdGVVbnN1YnNjcmliZS5wcm90b3R5cGUuZW1wdHkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvdW50KCkgPT09IDA7XG4gICAgfTtcblxuICAgIHJldHVybiBDb21wb3NpdGVVbnN1YnNjcmliZTtcblxuICB9KSgpO1xuXG4gIEJhY29uLkNvbXBvc2l0ZVVuc3Vic2NyaWJlID0gQ29tcG9zaXRlVW5zdWJzY3JpYmU7XG5cbiAgRGlzcGF0Y2hlciA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBEaXNwYXRjaGVyKF9zdWJzY3JpYmUsIF9oYW5kbGVFdmVudCkge1xuICAgICAgdGhpcy5fc3Vic2NyaWJlID0gX3N1YnNjcmliZTtcbiAgICAgIHRoaXMuX2hhbmRsZUV2ZW50ID0gX2hhbmRsZUV2ZW50O1xuICAgICAgdGhpcy5zdWJzY3JpYmUgPSBiaW5kKHRoaXMuc3Vic2NyaWJlLCB0aGlzKTtcbiAgICAgIHRoaXMuaGFuZGxlRXZlbnQgPSBiaW5kKHRoaXMuaGFuZGxlRXZlbnQsIHRoaXMpO1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zID0gW107XG4gICAgICB0aGlzLnF1ZXVlID0gW107XG4gICAgICB0aGlzLnB1c2hpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuZW5kZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMucHJldkVycm9yID0gdm9pZCAwO1xuICAgICAgdGhpcy51bnN1YlNyYyA9IHZvaWQgMDtcbiAgICB9XG5cbiAgICBEaXNwYXRjaGVyLnByb3RvdHlwZS5oYXNTdWJzY3JpYmVycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3Vic2NyaXB0aW9ucy5sZW5ndGggPiAwO1xuICAgIH07XG5cbiAgICBEaXNwYXRjaGVyLnByb3RvdHlwZS5yZW1vdmVTdWIgPSBmdW5jdGlvbihzdWJzY3JpcHRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnN1YnNjcmlwdGlvbnMgPSBfLndpdGhvdXQoc3Vic2NyaXB0aW9uLCB0aGlzLnN1YnNjcmlwdGlvbnMpO1xuICAgIH07XG5cbiAgICBEaXNwYXRjaGVyLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgIHRoaXMuZW5kZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFVwZGF0ZUJhcnJpZXIuaW5UcmFuc2FjdGlvbihldmVudCwgdGhpcywgdGhpcy5wdXNoSXQsIFtldmVudF0pO1xuICAgIH07XG5cbiAgICBEaXNwYXRjaGVyLnByb3RvdHlwZS5wdXNoVG9TdWJzY3JpcHRpb25zID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIHZhciBlLCBqLCBsZW4xLCByZXBseSwgc3ViLCB0bXA7XG4gICAgICB0cnkge1xuICAgICAgICB0bXAgPSB0aGlzLnN1YnNjcmlwdGlvbnM7XG4gICAgICAgIGZvciAoaiA9IDAsIGxlbjEgPSB0bXAubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICAgICAgc3ViID0gdG1wW2pdO1xuICAgICAgICAgIHJlcGx5ID0gc3ViLnNpbmsoZXZlbnQpO1xuICAgICAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlIHx8IGV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU3ViKHN1Yik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBjYXRjaCAoX2Vycm9yKSB7XG4gICAgICAgIGUgPSBfZXJyb3I7XG4gICAgICAgIHRoaXMucHVzaGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnF1ZXVlID0gW107XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfTtcblxuICAgIERpc3BhdGNoZXIucHJvdG90eXBlLnB1c2hJdCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMucHVzaGluZykge1xuICAgICAgICBpZiAoZXZlbnQgPT09IHRoaXMucHJldkVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudC5pc0Vycm9yKCkpIHtcbiAgICAgICAgICB0aGlzLnByZXZFcnJvciA9IGV2ZW50O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHVzaGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMucHVzaFRvU3Vic2NyaXB0aW9ucyhldmVudCk7XG4gICAgICAgIHRoaXMucHVzaGluZyA9IGZhbHNlO1xuICAgICAgICB3aGlsZSAodGhpcy5xdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgICBldmVudCA9IHRoaXMucXVldWUuc2hpZnQoKTtcbiAgICAgICAgICB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmhhc1N1YnNjcmliZXJzKCkpIHtcbiAgICAgICAgICByZXR1cm4gQmFjb24ubW9yZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlRnJvbVNvdXJjZSgpO1xuICAgICAgICAgIHJldHVybiBCYWNvbi5ub01vcmU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucXVldWUucHVzaChldmVudCk7XG4gICAgICAgIHJldHVybiBCYWNvbi5tb3JlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBEaXNwYXRjaGVyLnByb3RvdHlwZS5oYW5kbGVFdmVudCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBpZiAodGhpcy5faGFuZGxlRXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhbmRsZUV2ZW50KGV2ZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBEaXNwYXRjaGVyLnByb3RvdHlwZS51bnN1YnNjcmliZUZyb21Tb3VyY2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnVuc3ViU3JjKSB7XG4gICAgICAgIHRoaXMudW5zdWJTcmMoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnVuc3ViU3JjID0gdm9pZCAwO1xuICAgIH07XG5cbiAgICBEaXNwYXRjaGVyLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbihzaW5rKSB7XG4gICAgICB2YXIgc3Vic2NyaXB0aW9uO1xuICAgICAgaWYgKHRoaXMuZW5kZWQpIHtcbiAgICAgICAgc2luayhlbmRFdmVudCgpKTtcbiAgICAgICAgcmV0dXJuIG5vcDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFzc2VydEZ1bmN0aW9uKHNpbmspO1xuICAgICAgICBzdWJzY3JpcHRpb24gPSB7XG4gICAgICAgICAgc2luazogc2lua1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzdWJzY3JpcHRpb24pO1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIHRoaXMudW5zdWJTcmMgPSB0aGlzLl9zdWJzY3JpYmUodGhpcy5oYW5kbGVFdmVudCk7XG4gICAgICAgICAgYXNzZXJ0RnVuY3Rpb24odGhpcy51bnN1YlNyYyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIF90aGlzLnJlbW92ZVN1YihzdWJzY3JpcHRpb24pO1xuICAgICAgICAgICAgaWYgKCFfdGhpcy5oYXNTdWJzY3JpYmVycygpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBfdGhpcy51bnN1YnNjcmliZUZyb21Tb3VyY2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KSh0aGlzKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIERpc3BhdGNoZXI7XG5cbiAgfSkoKTtcblxuICBFdmVudFN0cmVhbSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gICAgZXh0ZW5kKEV2ZW50U3RyZWFtLCBzdXBlckNsYXNzKTtcblxuICAgIGZ1bmN0aW9uIEV2ZW50U3RyZWFtKGRlc2MsIHN1YnNjcmliZSwgaGFuZGxlcikge1xuICAgICAgaWYgKF8uaXNGdW5jdGlvbihkZXNjKSkge1xuICAgICAgICBoYW5kbGVyID0gc3Vic2NyaWJlO1xuICAgICAgICBzdWJzY3JpYmUgPSBkZXNjO1xuICAgICAgICBkZXNjID0gW107XG4gICAgICB9XG4gICAgICBFdmVudFN0cmVhbS5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLCBkZXNjKTtcbiAgICAgIGFzc2VydEZ1bmN0aW9uKHN1YnNjcmliZSk7XG4gICAgICB0aGlzLmRpc3BhdGNoZXIgPSBuZXcgRGlzcGF0Y2hlcihzdWJzY3JpYmUsIGhhbmRsZXIpO1xuICAgICAgcmVnaXN0ZXJPYnModGhpcyk7XG4gICAgfVxuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLnRvUHJvcGVydHkgPSBmdW5jdGlvbihpbml0VmFsdWVfKSB7XG4gICAgICB2YXIgZGlzcCwgaW5pdFZhbHVlO1xuICAgICAgaW5pdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA9PT0gMCA/IE5vbmUgOiB0b09wdGlvbihmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGluaXRWYWx1ZV87XG4gICAgICB9KTtcbiAgICAgIGRpc3AgPSB0aGlzLmRpc3BhdGNoZXI7XG4gICAgICByZXR1cm4gbmV3IFByb3BlcnR5KGRlc2NyaWJlKHRoaXMsIFwidG9Qcm9wZXJ0eVwiLCBpbml0VmFsdWVfKSwgZnVuY3Rpb24oc2luaykge1xuICAgICAgICB2YXIgaW5pdFNlbnQsIHJlcGx5LCBzZW5kSW5pdCwgdW5zdWI7XG4gICAgICAgIGluaXRTZW50ID0gZmFsc2U7XG4gICAgICAgIHVuc3ViID0gbm9wO1xuICAgICAgICByZXBseSA9IEJhY29uLm1vcmU7XG4gICAgICAgIHNlbmRJbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCFpbml0U2VudCkge1xuICAgICAgICAgICAgcmV0dXJuIGluaXRWYWx1ZS5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgIGluaXRTZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcmVwbHkgPSBzaW5rKG5ldyBJbml0aWFsKHZhbHVlKSk7XG4gICAgICAgICAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgICAgICAgdW5zdWIoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5zdWIgPSBub3A7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdW5zdWIgPSBkaXNwLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGlmIChldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgICBpZiAoaW5pdFNlbnQgJiYgZXZlbnQuaXNJbml0aWFsKCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIEJhY29uLm1vcmU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoIWV2ZW50LmlzSW5pdGlhbCgpKSB7XG4gICAgICAgICAgICAgICAgc2VuZEluaXQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpbml0U2VudCA9IHRydWU7XG4gICAgICAgICAgICAgIGluaXRWYWx1ZSA9IG5ldyBTb21lKGV2ZW50KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHNpbmsoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgICAgICByZXBseSA9IHNlbmRJbml0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVwbHkgIT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgICByZXR1cm4gc2luayhldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2VuZEluaXQoKTtcbiAgICAgICAgcmV0dXJuIHVuc3ViO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIEV2ZW50U3RyZWFtLnByb3RvdHlwZS50b0V2ZW50U3RyZWFtID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLndpdGhIYW5kbGVyID0gZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgcmV0dXJuIG5ldyBFdmVudFN0cmVhbShkZXNjcmliZSh0aGlzLCBcIndpdGhIYW5kbGVyXCIsIGhhbmRsZXIpLCB0aGlzLmRpc3BhdGNoZXIuc3Vic2NyaWJlLCBoYW5kbGVyKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEV2ZW50U3RyZWFtO1xuXG4gIH0pKE9ic2VydmFibGUpO1xuXG4gIEJhY29uLkV2ZW50U3RyZWFtID0gRXZlbnRTdHJlYW07XG5cbiAgQmFjb24ubmV2ZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IEV2ZW50U3RyZWFtKGRlc2NyaWJlKEJhY29uLCBcIm5ldmVyXCIpLCBmdW5jdGlvbihzaW5rKSB7XG4gICAgICBzaW5rKGVuZEV2ZW50KCkpO1xuICAgICAgcmV0dXJuIG5vcDtcbiAgICB9KTtcbiAgfTtcblxuICBCYWNvbi53aGVuID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGYsIGksIGluZGV4LCBpeCwgaiwgaywgbGVuLCBsZW4xLCBsZW4yLCBuZWVkc0JhcnJpZXIsIHBhdCwgcGF0U291cmNlcywgcGF0cywgcGF0dGVybnMsIHJlZiwgcmVzdWx0U3RyZWFtLCBzLCBzb3VyY2VzLCB0cmlnZ2VyRm91bmQsIHVzYWdlO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gQmFjb24ubmV2ZXIoKTtcbiAgICB9XG4gICAgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB1c2FnZSA9IFwid2hlbjogZXhwZWN0aW5nIGFyZ3VtZW50cyBpbiB0aGUgZm9ybSAoT2JzZXJ2YWJsZSssZnVuY3Rpb24pK1wiO1xuICAgIGFzc2VydCh1c2FnZSwgbGVuICUgMiA9PT0gMCk7XG4gICAgc291cmNlcyA9IFtdO1xuICAgIHBhdHMgPSBbXTtcbiAgICBpID0gMDtcbiAgICBwYXR0ZXJucyA9IFtdO1xuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBwYXR0ZXJuc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIHBhdHRlcm5zW2kgKyAxXSA9IGFyZ3VtZW50c1tpICsgMV07XG4gICAgICBwYXRTb3VyY2VzID0gXy50b0FycmF5KGFyZ3VtZW50c1tpXSk7XG4gICAgICBmID0gY29uc3RhbnRUb0Z1bmN0aW9uKGFyZ3VtZW50c1tpICsgMV0pO1xuICAgICAgcGF0ID0ge1xuICAgICAgICBmOiBmLFxuICAgICAgICBpeHM6IFtdXG4gICAgICB9O1xuICAgICAgdHJpZ2dlckZvdW5kID0gZmFsc2U7XG4gICAgICBmb3IgKGogPSAwLCBsZW4xID0gcGF0U291cmNlcy5sZW5ndGg7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgICAgcyA9IHBhdFNvdXJjZXNbal07XG4gICAgICAgIGluZGV4ID0gXy5pbmRleE9mKHNvdXJjZXMsIHMpO1xuICAgICAgICBpZiAoIXRyaWdnZXJGb3VuZCkge1xuICAgICAgICAgIHRyaWdnZXJGb3VuZCA9IFNvdXJjZS5pc1RyaWdnZXIocyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgIHNvdXJjZXMucHVzaChzKTtcbiAgICAgICAgICBpbmRleCA9IHNvdXJjZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgfVxuICAgICAgICByZWYgPSBwYXQuaXhzO1xuICAgICAgICBmb3IgKGsgPSAwLCBsZW4yID0gcmVmLmxlbmd0aDsgayA8IGxlbjI7IGsrKykge1xuICAgICAgICAgIGl4ID0gcmVmW2tdO1xuICAgICAgICAgIGlmIChpeC5pbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgIGl4LmNvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHBhdC5peHMucHVzaCh7XG4gICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgIGNvdW50OiAxXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgYXNzZXJ0KFwiQXQgbGVhc3Qgb25lIEV2ZW50U3RyZWFtIHJlcXVpcmVkXCIsIHRyaWdnZXJGb3VuZCB8fCAoIXBhdFNvdXJjZXMubGVuZ3RoKSk7XG4gICAgICBpZiAocGF0U291cmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHBhdHMucHVzaChwYXQpO1xuICAgICAgfVxuICAgICAgaSA9IGkgKyAyO1xuICAgIH1cbiAgICBpZiAoIXNvdXJjZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gQmFjb24ubmV2ZXIoKTtcbiAgICB9XG4gICAgc291cmNlcyA9IF8ubWFwKFNvdXJjZS5mcm9tT2JzZXJ2YWJsZSwgc291cmNlcyk7XG4gICAgbmVlZHNCYXJyaWVyID0gKF8uYW55KHNvdXJjZXMsIGZ1bmN0aW9uKHMpIHtcbiAgICAgIHJldHVybiBzLmZsYXR0ZW47XG4gICAgfSkpICYmIChjb250YWluc0R1cGxpY2F0ZURlcHMoXy5tYXAoKGZ1bmN0aW9uKHMpIHtcbiAgICAgIHJldHVybiBzLm9icztcbiAgICB9KSwgc291cmNlcykpKTtcbiAgICByZXR1cm4gcmVzdWx0U3RyZWFtID0gbmV3IEV2ZW50U3RyZWFtKGRlc2NyaWJlLmFwcGx5KG51bGwsIFtCYWNvbiwgXCJ3aGVuXCJdLmNvbmNhdChzbGljZS5jYWxsKHBhdHRlcm5zKSkpLCBmdW5jdGlvbihzaW5rKSB7XG4gICAgICB2YXIgY2Fubm90TWF0Y2gsIGNhbm5vdFN5bmMsIGVuZHMsIG1hdGNoLCBub25GbGF0dGVuZWQsIHBhcnQsIHRyaWdnZXJzO1xuICAgICAgdHJpZ2dlcnMgPSBbXTtcbiAgICAgIGVuZHMgPSBmYWxzZTtcbiAgICAgIG1hdGNoID0gZnVuY3Rpb24ocCkge1xuICAgICAgICB2YXIgbCwgbGVuMywgcmVmMTtcbiAgICAgICAgcmVmMSA9IHAuaXhzO1xuICAgICAgICBmb3IgKGwgPSAwLCBsZW4zID0gcmVmMS5sZW5ndGg7IGwgPCBsZW4zOyBsKyspIHtcbiAgICAgICAgICBpID0gcmVmMVtsXTtcbiAgICAgICAgICBpZiAoIXNvdXJjZXNbaS5pbmRleF0uaGFzQXRMZWFzdChpLmNvdW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgICBjYW5ub3RTeW5jID0gZnVuY3Rpb24oc291cmNlKSB7XG4gICAgICAgIHJldHVybiAhc291cmNlLnN5bmMgfHwgc291cmNlLmVuZGVkO1xuICAgICAgfTtcbiAgICAgIGNhbm5vdE1hdGNoID0gZnVuY3Rpb24ocCkge1xuICAgICAgICB2YXIgbCwgbGVuMywgcmVmMTtcbiAgICAgICAgcmVmMSA9IHAuaXhzO1xuICAgICAgICBmb3IgKGwgPSAwLCBsZW4zID0gcmVmMS5sZW5ndGg7IGwgPCBsZW4zOyBsKyspIHtcbiAgICAgICAgICBpID0gcmVmMVtsXTtcbiAgICAgICAgICBpZiAoIXNvdXJjZXNbaS5pbmRleF0ubWF5SGF2ZShpLmNvdW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgbm9uRmxhdHRlbmVkID0gZnVuY3Rpb24odHJpZ2dlcikge1xuICAgICAgICByZXR1cm4gIXRyaWdnZXIuc291cmNlLmZsYXR0ZW47XG4gICAgICB9O1xuICAgICAgcGFydCA9IGZ1bmN0aW9uKHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odW5zdWJBbGwpIHtcbiAgICAgICAgICB2YXIgZmx1c2gsIGZsdXNoTGF0ZXIsIGZsdXNoV2hpbGVUcmlnZ2VycztcbiAgICAgICAgICBmbHVzaExhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gVXBkYXRlQmFycmllci53aGVuRG9uZVdpdGgocmVzdWx0U3RyZWFtLCBmbHVzaCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBmbHVzaFdoaWxlVHJpZ2dlcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBldmVudHMsIGwsIGxlbjMsIHAsIHJlcGx5LCB0cmlnZ2VyO1xuICAgICAgICAgICAgaWYgKHRyaWdnZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgcmVwbHkgPSBCYWNvbi5tb3JlO1xuICAgICAgICAgICAgICB0cmlnZ2VyID0gdHJpZ2dlcnMucG9wKCk7XG4gICAgICAgICAgICAgIGZvciAobCA9IDAsIGxlbjMgPSBwYXRzLmxlbmd0aDsgbCA8IGxlbjM7IGwrKykge1xuICAgICAgICAgICAgICAgIHAgPSBwYXRzW2xdO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaChwKSkge1xuICAgICAgICAgICAgICAgICAgZXZlbnRzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGVuNCwgbSwgcmVmMSwgcmVzdWx0cztcbiAgICAgICAgICAgICAgICAgICAgcmVmMSA9IHAuaXhzO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAobSA9IDAsIGxlbjQgPSByZWYxLmxlbmd0aDsgbSA8IGxlbjQ7IG0rKykge1xuICAgICAgICAgICAgICAgICAgICAgIGkgPSByZWYxW21dO1xuICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChzb3VyY2VzW2kuaW5kZXhdLmNvbnN1bWUoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgICAgICAgcmVwbHkgPSBzaW5rKHRyaWdnZXIuZS5hcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50LCB2YWx1ZXM7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgbGVuNCwgbSwgcmVzdWx0cztcbiAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgZm9yIChtID0gMCwgbGVuNCA9IGV2ZW50cy5sZW5ndGg7IG0gPCBsZW40OyBtKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50ID0gZXZlbnRzW21dO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGV2ZW50LnZhbHVlKCkpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHAuZi5hcHBseShwLCB2YWx1ZXMpO1xuICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgaWYgKHRyaWdnZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VycyA9IF8uZmlsdGVyKG5vbkZsYXR0ZW5lZCwgdHJpZ2dlcnMpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWYgKHJlcGx5ID09PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcGx5O1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZsdXNoV2hpbGVUcmlnZ2VycygpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIEJhY29uLm1vcmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICBmbHVzaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJlcGx5O1xuICAgICAgICAgICAgcmVwbHkgPSBmbHVzaFdoaWxlVHJpZ2dlcnMoKTtcbiAgICAgICAgICAgIGlmIChlbmRzKSB7XG4gICAgICAgICAgICAgIGVuZHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgaWYgKF8uYWxsKHNvdXJjZXMsIGNhbm5vdFN5bmMpIHx8IF8uYWxsKHBhdHMsIGNhbm5vdE1hdGNoKSkge1xuICAgICAgICAgICAgICAgIHJlcGx5ID0gQmFjb24ubm9Nb3JlO1xuICAgICAgICAgICAgICAgIHNpbmsoZW5kRXZlbnQoKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgICAgIHVuc3ViQWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVwbHk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgcmVwbHk7XG4gICAgICAgICAgICBpZiAoZS5pc0VuZCgpKSB7XG4gICAgICAgICAgICAgIGVuZHMgPSB0cnVlO1xuICAgICAgICAgICAgICBzb3VyY2UubWFya0VuZGVkKCk7XG4gICAgICAgICAgICAgIGZsdXNoTGF0ZXIoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5pc0Vycm9yKCkpIHtcbiAgICAgICAgICAgICAgcmVwbHkgPSBzaW5rKGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc291cmNlLnB1c2goZSk7XG4gICAgICAgICAgICAgIGlmIChzb3VyY2Uuc3luYykge1xuICAgICAgICAgICAgICAgIHRyaWdnZXJzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgc291cmNlOiBzb3VyY2UsXG4gICAgICAgICAgICAgICAgICBlOiBlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKG5lZWRzQmFycmllciB8fCBVcGRhdGVCYXJyaWVyLmhhc1dhaXRlcnMoKSkge1xuICAgICAgICAgICAgICAgICAgZmx1c2hMYXRlcigpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBmbHVzaCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlcGx5ID09PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICAgICAgdW5zdWJBbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXBseSB8fCBCYWNvbi5tb3JlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICAgIHJldHVybiBuZXcgQmFjb24uQ29tcG9zaXRlVW5zdWJzY3JpYmUoKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbCwgbGVuMywgcmVzdWx0cztcbiAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICBmb3IgKGwgPSAwLCBsZW4zID0gc291cmNlcy5sZW5ndGg7IGwgPCBsZW4zOyBsKyspIHtcbiAgICAgICAgICBzID0gc291cmNlc1tsXTtcbiAgICAgICAgICByZXN1bHRzLnB1c2gocGFydChzKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICB9KSgpKS51bnN1YnNjcmliZTtcbiAgICB9KTtcbiAgfTtcblxuICBjb250YWluc0R1cGxpY2F0ZURlcHMgPSBmdW5jdGlvbihvYnNlcnZhYmxlcywgc3RhdGUpIHtcbiAgICB2YXIgY2hlY2tPYnNlcnZhYmxlO1xuICAgIGlmIChzdGF0ZSA9PSBudWxsKSB7XG4gICAgICBzdGF0ZSA9IFtdO1xuICAgIH1cbiAgICBjaGVja09ic2VydmFibGUgPSBmdW5jdGlvbihvYnMpIHtcbiAgICAgIHZhciBkZXBzO1xuICAgICAgaWYgKF8uY29udGFpbnMoc3RhdGUsIG9icykpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZXBzID0gb2JzLmludGVybmFsRGVwcygpO1xuICAgICAgICBpZiAoZGVwcy5sZW5ndGgpIHtcbiAgICAgICAgICBzdGF0ZS5wdXNoKG9icyk7XG4gICAgICAgICAgcmV0dXJuIF8uYW55KGRlcHMsIGNoZWNrT2JzZXJ2YWJsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RhdGUucHVzaChvYnMpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIF8uYW55KG9ic2VydmFibGVzLCBjaGVja09ic2VydmFibGUpO1xuICB9O1xuXG4gIGNvbnN0YW50VG9GdW5jdGlvbiA9IGZ1bmN0aW9uKGYpIHtcbiAgICBpZiAoXy5pc0Z1bmN0aW9uKGYpKSB7XG4gICAgICByZXR1cm4gZjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIF8uYWx3YXlzKGYpO1xuICAgIH1cbiAgfTtcblxuICBCYWNvbi5ncm91cFNpbXVsdGFuZW91cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzLCBzb3VyY2VzLCBzdHJlYW1zO1xuICAgIHN0cmVhbXMgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICBpZiAoc3RyZWFtcy5sZW5ndGggPT09IDEgJiYgaXNBcnJheShzdHJlYW1zWzBdKSkge1xuICAgICAgc3RyZWFtcyA9IHN0cmVhbXNbMF07XG4gICAgfVxuICAgIHNvdXJjZXMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaiwgbGVuMSwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaiA9IDAsIGxlbjEgPSBzdHJlYW1zLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgICBzID0gc3RyZWFtc1tqXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKG5ldyBCdWZmZXJpbmdTb3VyY2UocykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uLmFwcGx5KG51bGwsIFtCYWNvbiwgXCJncm91cFNpbXVsdGFuZW91c1wiXS5jb25jYXQoc2xpY2UuY2FsbChzdHJlYW1zKSwgW0JhY29uLndoZW4oc291cmNlcywgKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHhzO1xuICAgICAgeHMgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICAgIHJldHVybiB4cztcbiAgICB9KSldKSk7XG4gIH07XG5cbiAgUHJvcGVydHlEaXNwYXRjaGVyID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgICBleHRlbmQoUHJvcGVydHlEaXNwYXRjaGVyLCBzdXBlckNsYXNzKTtcblxuICAgIGZ1bmN0aW9uIFByb3BlcnR5RGlzcGF0Y2hlcihwcm9wZXJ0eTEsIHN1YnNjcmliZSwgaGFuZGxlRXZlbnQpIHtcbiAgICAgIHRoaXMucHJvcGVydHkgPSBwcm9wZXJ0eTE7XG4gICAgICB0aGlzLnN1YnNjcmliZSA9IGJpbmQodGhpcy5zdWJzY3JpYmUsIHRoaXMpO1xuICAgICAgUHJvcGVydHlEaXNwYXRjaGVyLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHN1YnNjcmliZSwgaGFuZGxlRXZlbnQpO1xuICAgICAgdGhpcy5jdXJyZW50ID0gTm9uZTtcbiAgICAgIHRoaXMuY3VycmVudFZhbHVlUm9vdElkID0gdm9pZCAwO1xuICAgICAgdGhpcy5wcm9wZXJ0eUVuZGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgUHJvcGVydHlEaXNwYXRjaGVyLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgIHRoaXMucHJvcGVydHlFbmRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoZXZlbnQuaGFzVmFsdWUoKSkge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSBuZXcgU29tZShldmVudCk7XG4gICAgICAgIHRoaXMuY3VycmVudFZhbHVlUm9vdElkID0gVXBkYXRlQmFycmllci5jdXJyZW50RXZlbnRJZCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb3BlcnR5RGlzcGF0Y2hlci5fX3N1cGVyX18ucHVzaC5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9O1xuXG4gICAgUHJvcGVydHlEaXNwYXRjaGVyLnByb3RvdHlwZS5tYXliZVN1YlNvdXJjZSA9IGZ1bmN0aW9uKHNpbmssIHJlcGx5KSB7XG4gICAgICBpZiAocmVwbHkgPT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICByZXR1cm4gbm9wO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BlcnR5RW5kZWQpIHtcbiAgICAgICAgc2luayhlbmRFdmVudCgpKTtcbiAgICAgICAgcmV0dXJuIG5vcDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBEaXNwYXRjaGVyLnByb3RvdHlwZS5zdWJzY3JpYmUuY2FsbCh0aGlzLCBzaW5rKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgUHJvcGVydHlEaXNwYXRjaGVyLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbihzaW5rKSB7XG4gICAgICB2YXIgZGlzcGF0Y2hpbmdJZCwgaW5pdFNlbnQsIHJlcGx5LCB2YWxJZDtcbiAgICAgIGluaXRTZW50ID0gZmFsc2U7XG4gICAgICByZXBseSA9IEJhY29uLm1vcmU7XG4gICAgICBpZiAodGhpcy5jdXJyZW50LmlzRGVmaW5lZCAmJiAodGhpcy5oYXNTdWJzY3JpYmVycygpIHx8IHRoaXMucHJvcGVydHlFbmRlZCkpIHtcbiAgICAgICAgZGlzcGF0Y2hpbmdJZCA9IFVwZGF0ZUJhcnJpZXIuY3VycmVudEV2ZW50SWQoKTtcbiAgICAgICAgdmFsSWQgPSB0aGlzLmN1cnJlbnRWYWx1ZVJvb3RJZDtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BlcnR5RW5kZWQgJiYgdmFsSWQgJiYgZGlzcGF0Y2hpbmdJZCAmJiBkaXNwYXRjaGluZ0lkICE9PSB2YWxJZCkge1xuICAgICAgICAgIFVwZGF0ZUJhcnJpZXIud2hlbkRvbmVXaXRoKHRoaXMucHJvcGVydHksIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAoX3RoaXMuY3VycmVudFZhbHVlUm9vdElkID09PSB2YWxJZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaW5rKGluaXRpYWxFdmVudChfdGhpcy5jdXJyZW50LmdldCgpLnZhbHVlKCkpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KSh0aGlzKSk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMubWF5YmVTdWJTb3VyY2Uoc2luaywgcmVwbHkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIFVwZGF0ZUJhcnJpZXIuaW5UcmFuc2FjdGlvbih2b2lkIDAsIHRoaXMsIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiByZXBseSA9IHNpbmsoaW5pdGlhbEV2ZW50KHRoaXMuY3VycmVudC5nZXQoKS52YWx1ZSgpKSk7XG4gICAgICAgICAgfSksIFtdKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5tYXliZVN1YlNvdXJjZShzaW5rLCByZXBseSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1heWJlU3ViU291cmNlKHNpbmssIHJlcGx5KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIFByb3BlcnR5RGlzcGF0Y2hlcjtcblxuICB9KShEaXNwYXRjaGVyKTtcblxuICBQcm9wZXJ0eSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gICAgZXh0ZW5kKFByb3BlcnR5LCBzdXBlckNsYXNzKTtcblxuICAgIGZ1bmN0aW9uIFByb3BlcnR5KGRlc2MsIHN1YnNjcmliZSwgaGFuZGxlcikge1xuICAgICAgaWYgKF8uaXNGdW5jdGlvbihkZXNjKSkge1xuICAgICAgICBoYW5kbGVyID0gc3Vic2NyaWJlO1xuICAgICAgICBzdWJzY3JpYmUgPSBkZXNjO1xuICAgICAgICBkZXNjID0gW107XG4gICAgICB9XG4gICAgICBQcm9wZXJ0eS5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLCBkZXNjKTtcbiAgICAgIGFzc2VydEZ1bmN0aW9uKHN1YnNjcmliZSk7XG4gICAgICB0aGlzLmRpc3BhdGNoZXIgPSBuZXcgUHJvcGVydHlEaXNwYXRjaGVyKHRoaXMsIHN1YnNjcmliZSwgaGFuZGxlcik7XG4gICAgICByZWdpc3Rlck9icyh0aGlzKTtcbiAgICB9XG5cbiAgICBQcm9wZXJ0eS5wcm90b3R5cGUuY2hhbmdlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG5ldyBFdmVudFN0cmVhbShkZXNjcmliZSh0aGlzLCBcImNoYW5nZXNcIiksIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2luaykge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKCFldmVudC5pc0luaXRpYWwoKSkge1xuICAgICAgICAgICAgICByZXR1cm4gc2luayhldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSk7XG4gICAgfTtcblxuICAgIFByb3BlcnR5LnByb3RvdHlwZS53aXRoSGFuZGxlciA9IGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvcGVydHkoZGVzY3JpYmUodGhpcywgXCJ3aXRoSGFuZGxlclwiLCBoYW5kbGVyKSwgdGhpcy5kaXNwYXRjaGVyLnN1YnNjcmliZSwgaGFuZGxlcik7XG4gICAgfTtcblxuICAgIFByb3BlcnR5LnByb3RvdHlwZS50b1Byb3BlcnR5ID0gZnVuY3Rpb24oKSB7XG4gICAgICBhc3NlcnROb0FyZ3VtZW50cyhhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFByb3BlcnR5LnByb3RvdHlwZS50b0V2ZW50U3RyZWFtID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbmV3IEV2ZW50U3RyZWFtKGRlc2NyaWJlKHRoaXMsIFwidG9FdmVudFN0cmVhbVwiKSwgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzaW5rKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLmRpc3BhdGNoZXIuc3Vic2NyaWJlKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuaXNJbml0aWFsKCkpIHtcbiAgICAgICAgICAgICAgZXZlbnQgPSBldmVudC50b05leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzaW5rKGV2ZW50KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFByb3BlcnR5O1xuXG4gIH0pKE9ic2VydmFibGUpO1xuXG4gIEJhY29uLlByb3BlcnR5ID0gUHJvcGVydHk7XG5cbiAgQmFjb24uY29uc3RhbnQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgUHJvcGVydHkoZGVzY3JpYmUoQmFjb24sIFwiY29uc3RhbnRcIiwgdmFsdWUpLCBmdW5jdGlvbihzaW5rKSB7XG4gICAgICBzaW5rKGluaXRpYWxFdmVudCh2YWx1ZSkpO1xuICAgICAgc2luayhlbmRFdmVudCgpKTtcbiAgICAgIHJldHVybiBub3A7XG4gICAgfSk7XG4gIH07XG5cbiAgQmFjb24uZnJvbUJpbmRlciA9IGZ1bmN0aW9uKGJpbmRlciwgZXZlbnRUcmFuc2Zvcm1lcikge1xuICAgIGlmIChldmVudFRyYW5zZm9ybWVyID09IG51bGwpIHtcbiAgICAgIGV2ZW50VHJhbnNmb3JtZXIgPSBfLmlkO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEV2ZW50U3RyZWFtKGRlc2NyaWJlKEJhY29uLCBcImZyb21CaW5kZXJcIiwgYmluZGVyLCBldmVudFRyYW5zZm9ybWVyKSwgZnVuY3Rpb24oc2luaykge1xuICAgICAgdmFyIHNob3VsZFVuYmluZCwgdW5iaW5kLCB1bmJpbmRlciwgdW5ib3VuZDtcbiAgICAgIHVuYm91bmQgPSBmYWxzZTtcbiAgICAgIHNob3VsZFVuYmluZCA9IGZhbHNlO1xuICAgICAgdW5iaW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghdW5ib3VuZCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgdW5iaW5kZXIgIT09IFwidW5kZWZpbmVkXCIgJiYgdW5iaW5kZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHVuYmluZGVyKCk7XG4gICAgICAgICAgICByZXR1cm4gdW5ib3VuZCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzaG91bGRVbmJpbmQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHVuYmluZGVyID0gYmluZGVyKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYXJncywgZXZlbnQsIGosIGxlbjEsIHJlcGx5LCB2YWx1ZTtcbiAgICAgICAgYXJncyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgICAgICB2YWx1ZSA9IGV2ZW50VHJhbnNmb3JtZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIGlmICghKGlzQXJyYXkodmFsdWUpICYmIF8ubGFzdCh2YWx1ZSkgaW5zdGFuY2VvZiBFdmVudCkpIHtcbiAgICAgICAgICB2YWx1ZSA9IFt2YWx1ZV07XG4gICAgICAgIH1cbiAgICAgICAgcmVwbHkgPSBCYWNvbi5tb3JlO1xuICAgICAgICBmb3IgKGogPSAwLCBsZW4xID0gdmFsdWUubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICAgICAgZXZlbnQgPSB2YWx1ZVtqXTtcbiAgICAgICAgICByZXBseSA9IHNpbmsoZXZlbnQgPSB0b0V2ZW50KGV2ZW50KSk7XG4gICAgICAgICAgaWYgKHJlcGx5ID09PSBCYWNvbi5ub01vcmUgfHwgZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgICAgdW5iaW5kKCk7XG4gICAgICAgICAgICByZXR1cm4gcmVwbHk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXBseTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHNob3VsZFVuYmluZCkge1xuICAgICAgICB1bmJpbmQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB1bmJpbmQ7XG4gICAgfSk7XG4gIH07XG5cbiAgZXZlbnRNZXRob2RzID0gW1tcImFkZEV2ZW50TGlzdGVuZXJcIiwgXCJyZW1vdmVFdmVudExpc3RlbmVyXCJdLCBbXCJhZGRMaXN0ZW5lclwiLCBcInJlbW92ZUxpc3RlbmVyXCJdLCBbXCJvblwiLCBcIm9mZlwiXSwgW1wiYmluZFwiLCBcInVuYmluZFwiXV07XG5cbiAgZmluZEhhbmRsZXJNZXRob2RzID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgdmFyIGosIGxlbjEsIG1ldGhvZFBhaXIsIHBhaXI7XG4gICAgZm9yIChqID0gMCwgbGVuMSA9IGV2ZW50TWV0aG9kcy5sZW5ndGg7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgIHBhaXIgPSBldmVudE1ldGhvZHNbal07XG4gICAgICBtZXRob2RQYWlyID0gW3RhcmdldFtwYWlyWzBdXSwgdGFyZ2V0W3BhaXJbMV1dXTtcbiAgICAgIGlmIChtZXRob2RQYWlyWzBdICYmIG1ldGhvZFBhaXJbMV0pIHtcbiAgICAgICAgcmV0dXJuIG1ldGhvZFBhaXI7XG4gICAgICB9XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHN1aXRhYmxlIGV2ZW50IG1ldGhvZHMgaW4gXCIgKyB0YXJnZXQpO1xuICB9O1xuXG4gIEJhY29uLmZyb21FdmVudFRhcmdldCA9IGZ1bmN0aW9uKHRhcmdldCwgZXZlbnROYW1lLCBldmVudFRyYW5zZm9ybWVyKSB7XG4gICAgdmFyIHJlZiwgc3ViLCB1bnN1YjtcbiAgICByZWYgPSBmaW5kSGFuZGxlck1ldGhvZHModGFyZ2V0KSwgc3ViID0gcmVmWzBdLCB1bnN1YiA9IHJlZlsxXTtcbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKEJhY29uLCBcImZyb21FdmVudFwiLCB0YXJnZXQsIGV2ZW50TmFtZSwgQmFjb24uZnJvbUJpbmRlcihmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICBzdWIuY2FsbCh0YXJnZXQsIGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB1bnN1Yi5jYWxsKHRhcmdldCwgZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICAgIH07XG4gICAgfSwgZXZlbnRUcmFuc2Zvcm1lcikpO1xuICB9O1xuXG4gIEJhY29uLmZyb21FdmVudCA9IEJhY29uLmZyb21FdmVudFRhcmdldDtcblxuICBCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncywgcDtcbiAgICBwID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgcmV0dXJuIGNvbnZlcnRBcmdzVG9GdW5jdGlvbih0aGlzLCBwLCBhcmdzLCBmdW5jdGlvbihmKSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwibWFwXCIsIGYsIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudC5mbWFwKGYpKTtcbiAgICAgIH0pKTtcbiAgICB9KTtcbiAgfTtcblxuICBCYWNvbi5jb21iaW5lQXNBcnJheSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpbmRleCwgaiwgbGVuMSwgcywgc291cmNlcywgc3RyZWFtLCBzdHJlYW1zO1xuICAgIHN0cmVhbXMgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICBpZiAoc3RyZWFtcy5sZW5ndGggPT09IDEgJiYgaXNBcnJheShzdHJlYW1zWzBdKSkge1xuICAgICAgc3RyZWFtcyA9IHN0cmVhbXNbMF07XG4gICAgfVxuICAgIGZvciAoaW5kZXggPSBqID0gMCwgbGVuMSA9IHN0cmVhbXMubGVuZ3RoOyBqIDwgbGVuMTsgaW5kZXggPSArK2opIHtcbiAgICAgIHN0cmVhbSA9IHN0cmVhbXNbaW5kZXhdO1xuICAgICAgaWYgKCEoaXNPYnNlcnZhYmxlKHN0cmVhbSkpKSB7XG4gICAgICAgIHN0cmVhbXNbaW5kZXhdID0gQmFjb24uY29uc3RhbnQoc3RyZWFtKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHN0cmVhbXMubGVuZ3RoKSB7XG4gICAgICBzb3VyY2VzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaywgbGVuMiwgcmVzdWx0cztcbiAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICBmb3IgKGsgPSAwLCBsZW4yID0gc3RyZWFtcy5sZW5ndGg7IGsgPCBsZW4yOyBrKyspIHtcbiAgICAgICAgICBzID0gc3RyZWFtc1trXTtcbiAgICAgICAgICByZXN1bHRzLnB1c2gobmV3IFNvdXJjZShzLCB0cnVlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICB9KSgpO1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbi5hcHBseShudWxsLCBbQmFjb24sIFwiY29tYmluZUFzQXJyYXlcIl0uY29uY2F0KHNsaWNlLmNhbGwoc3RyZWFtcyksIFtCYWNvbi53aGVuKHNvdXJjZXMsIChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzO1xuICAgICAgICB4cyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgICAgICByZXR1cm4geHM7XG4gICAgICB9KSkudG9Qcm9wZXJ0eSgpXSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gQmFjb24uY29uc3RhbnQoW10pO1xuICAgIH1cbiAgfTtcblxuICBCYWNvbi5vblZhbHVlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBmLCBqLCBzdHJlYW1zO1xuICAgIHN0cmVhbXMgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMCwgaiA9IGFyZ3VtZW50cy5sZW5ndGggLSAxKSA6IChqID0gMCwgW10pLCBmID0gYXJndW1lbnRzW2orK107XG4gICAgcmV0dXJuIEJhY29uLmNvbWJpbmVBc0FycmF5KHN0cmVhbXMpLm9uVmFsdWVzKGYpO1xuICB9O1xuXG4gIEJhY29uLmNvbWJpbmVXaXRoID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGYsIHN0cmVhbXM7XG4gICAgZiA9IGFyZ3VtZW50c1swXSwgc3RyZWFtcyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24uYXBwbHkobnVsbCwgW0JhY29uLCBcImNvbWJpbmVXaXRoXCIsIGZdLmNvbmNhdChzbGljZS5jYWxsKHN0cmVhbXMpLCBbQmFjb24uY29tYmluZUFzQXJyYXkoc3RyZWFtcykubWFwKGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgcmV0dXJuIGYuYXBwbHkobnVsbCwgdmFsdWVzKTtcbiAgICB9KV0pKTtcbiAgfTtcblxuICBCYWNvbi5jb21iaW5lVGVtcGxhdGUgPSBmdW5jdGlvbih0ZW1wbGF0ZSkge1xuICAgIHZhciBhcHBseVN0cmVhbVZhbHVlLCBjb21iaW5hdG9yLCBjb21waWxlLCBjb21waWxlVGVtcGxhdGUsIGNvbnN0YW50VmFsdWUsIGN1cnJlbnQsIGZ1bmNzLCBta0NvbnRleHQsIHNldFZhbHVlLCBzdHJlYW1zO1xuICAgIGZ1bmNzID0gW107XG4gICAgc3RyZWFtcyA9IFtdO1xuICAgIGN1cnJlbnQgPSBmdW5jdGlvbihjdHhTdGFjaykge1xuICAgICAgcmV0dXJuIGN0eFN0YWNrW2N0eFN0YWNrLmxlbmd0aCAtIDFdO1xuICAgIH07XG4gICAgc2V0VmFsdWUgPSBmdW5jdGlvbihjdHhTdGFjaywga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGN1cnJlbnQoY3R4U3RhY2spW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICAgIGFwcGx5U3RyZWFtVmFsdWUgPSBmdW5jdGlvbihrZXksIGluZGV4KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oY3R4U3RhY2ssIHZhbHVlcykge1xuICAgICAgICByZXR1cm4gc2V0VmFsdWUoY3R4U3RhY2ssIGtleSwgdmFsdWVzW2luZGV4XSk7XG4gICAgICB9O1xuICAgIH07XG4gICAgY29uc3RhbnRWYWx1ZSA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihjdHhTdGFjaykge1xuICAgICAgICByZXR1cm4gc2V0VmFsdWUoY3R4U3RhY2ssIGtleSwgdmFsdWUpO1xuICAgICAgfTtcbiAgICB9O1xuICAgIG1rQ29udGV4dCA9IGZ1bmN0aW9uKHRlbXBsYXRlKSB7XG4gICAgICBpZiAoaXNBcnJheSh0ZW1wbGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfVxuICAgIH07XG4gICAgY29tcGlsZSA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgIHZhciBwb3BDb250ZXh0LCBwdXNoQ29udGV4dDtcbiAgICAgIGlmIChpc09ic2VydmFibGUodmFsdWUpKSB7XG4gICAgICAgIHN0cmVhbXMucHVzaCh2YWx1ZSk7XG4gICAgICAgIHJldHVybiBmdW5jcy5wdXNoKGFwcGx5U3RyZWFtVmFsdWUoa2V5LCBzdHJlYW1zLmxlbmd0aCAtIDEpKTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IE9iamVjdCh2YWx1ZSkgJiYgdHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIgJiYgISh2YWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkgJiYgISh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpKSB7XG4gICAgICAgIHB1c2hDb250ZXh0ID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGN0eFN0YWNrKSB7XG4gICAgICAgICAgICB2YXIgbmV3Q29udGV4dDtcbiAgICAgICAgICAgIG5ld0NvbnRleHQgPSBta0NvbnRleHQodmFsdWUpO1xuICAgICAgICAgICAgc2V0VmFsdWUoY3R4U3RhY2ssIGtleSwgbmV3Q29udGV4dCk7XG4gICAgICAgICAgICByZXR1cm4gY3R4U3RhY2sucHVzaChuZXdDb250ZXh0KTtcbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICBwb3BDb250ZXh0ID0gZnVuY3Rpb24oY3R4U3RhY2spIHtcbiAgICAgICAgICByZXR1cm4gY3R4U3RhY2sucG9wKCk7XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmNzLnB1c2gocHVzaENvbnRleHQoa2V5KSk7XG4gICAgICAgIGNvbXBpbGVUZW1wbGF0ZSh2YWx1ZSk7XG4gICAgICAgIHJldHVybiBmdW5jcy5wdXNoKHBvcENvbnRleHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZ1bmNzLnB1c2goY29uc3RhbnRWYWx1ZShrZXksIHZhbHVlKSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBjb21waWxlVGVtcGxhdGUgPSBmdW5jdGlvbih0ZW1wbGF0ZSkge1xuICAgICAgcmV0dXJuIF8uZWFjaCh0ZW1wbGF0ZSwgY29tcGlsZSk7XG4gICAgfTtcbiAgICBjb21waWxlVGVtcGxhdGUodGVtcGxhdGUpO1xuICAgIGNvbWJpbmF0b3IgPSBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICAgIHZhciBjdHhTdGFjaywgZiwgaiwgbGVuMSwgcm9vdENvbnRleHQ7XG4gICAgICByb290Q29udGV4dCA9IG1rQ29udGV4dCh0ZW1wbGF0ZSk7XG4gICAgICBjdHhTdGFjayA9IFtyb290Q29udGV4dF07XG4gICAgICBmb3IgKGogPSAwLCBsZW4xID0gZnVuY3MubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICAgIGYgPSBmdW5jc1tqXTtcbiAgICAgICAgZihjdHhTdGFjaywgdmFsdWVzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByb290Q29udGV4dDtcbiAgICB9O1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24oQmFjb24sIFwiY29tYmluZVRlbXBsYXRlXCIsIHRlbXBsYXRlLCBCYWNvbi5jb21iaW5lQXNBcnJheShzdHJlYW1zKS5tYXAoY29tYmluYXRvcikpO1xuICB9O1xuXG4gIEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLmNvbWJpbmUgPSBmdW5jdGlvbihvdGhlciwgZikge1xuICAgIHZhciBjb21iaW5hdG9yO1xuICAgIGNvbWJpbmF0b3IgPSB0b0NvbWJpbmF0b3IoZik7XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImNvbWJpbmVcIiwgb3RoZXIsIGYsIEJhY29uLmNvbWJpbmVBc0FycmF5KHRoaXMsIG90aGVyKS5tYXAoZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgICByZXR1cm4gY29tYmluYXRvcih2YWx1ZXNbMF0sIHZhbHVlc1sxXSk7XG4gICAgfSkpO1xuICB9O1xuXG4gIEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLmRlY29kZSA9IGZ1bmN0aW9uKGNhc2VzKSB7XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImRlY29kZVwiLCBjYXNlcywgdGhpcy5jb21iaW5lKEJhY29uLmNvbWJpbmVUZW1wbGF0ZShjYXNlcyksIGZ1bmN0aW9uKGtleSwgdmFsdWVzKSB7XG4gICAgICByZXR1cm4gdmFsdWVzW2tleV07XG4gICAgfSkpO1xuICB9O1xuXG4gIEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLndpdGhTdGF0ZU1hY2hpbmUgPSBmdW5jdGlvbihpbml0U3RhdGUsIGYpIHtcbiAgICB2YXIgc3RhdGU7XG4gICAgc3RhdGUgPSBpbml0U3RhdGU7XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcIndpdGhTdGF0ZU1hY2hpbmVcIiwgaW5pdFN0YXRlLCBmLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICB2YXIgZnJvbUYsIGosIGxlbjEsIG5ld1N0YXRlLCBvdXRwdXQsIG91dHB1dHMsIHJlcGx5O1xuICAgICAgZnJvbUYgPSBmKHN0YXRlLCBldmVudCk7XG4gICAgICBuZXdTdGF0ZSA9IGZyb21GWzBdLCBvdXRwdXRzID0gZnJvbUZbMV07XG4gICAgICBzdGF0ZSA9IG5ld1N0YXRlO1xuICAgICAgcmVwbHkgPSBCYWNvbi5tb3JlO1xuICAgICAgZm9yIChqID0gMCwgbGVuMSA9IG91dHB1dHMubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICAgIG91dHB1dCA9IG91dHB1dHNbal07XG4gICAgICAgIHJlcGx5ID0gdGhpcy5wdXNoKG91dHB1dCk7XG4gICAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcGx5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVwbHk7XG4gICAgfSkpO1xuICB9O1xuXG4gIEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLnNraXBEdXBsaWNhdGVzID0gZnVuY3Rpb24oaXNFcXVhbCkge1xuICAgIGlmIChpc0VxdWFsID09IG51bGwpIHtcbiAgICAgIGlzRXF1YWwgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgIHJldHVybiBhID09PSBiO1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcInNraXBEdXBsaWNhdGVzXCIsIHRoaXMud2l0aFN0YXRlTWFjaGluZShOb25lLCBmdW5jdGlvbihwcmV2LCBldmVudCkge1xuICAgICAgaWYgKCFldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgIHJldHVybiBbcHJldiwgW2V2ZW50XV07XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LmlzSW5pdGlhbCgpIHx8IHByZXYgPT09IE5vbmUgfHwgIWlzRXF1YWwocHJldi5nZXQoKSwgZXZlbnQudmFsdWUoKSkpIHtcbiAgICAgICAgcmV0dXJuIFtuZXcgU29tZShldmVudC52YWx1ZSgpKSwgW2V2ZW50XV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW3ByZXYsIFtdXTtcbiAgICAgIH1cbiAgICB9KSk7XG4gIH07XG5cbiAgQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuYXdhaXRpbmcgPSBmdW5jdGlvbihvdGhlcikge1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJhd2FpdGluZ1wiLCBvdGhlciwgQmFjb24uZ3JvdXBTaW11bHRhbmVvdXModGhpcywgb3RoZXIpLm1hcChmdW5jdGlvbihhcmcpIHtcbiAgICAgIHZhciBteVZhbHVlcywgb3RoZXJWYWx1ZXM7XG4gICAgICBteVZhbHVlcyA9IGFyZ1swXSwgb3RoZXJWYWx1ZXMgPSBhcmdbMV07XG4gICAgICByZXR1cm4gb3RoZXJWYWx1ZXMubGVuZ3RoID09PSAwO1xuICAgIH0pLnRvUHJvcGVydHkoZmFsc2UpLnNraXBEdXBsaWNhdGVzKCkpO1xuICB9O1xuXG4gIEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLm5vdCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJub3RcIiwgdGhpcy5tYXAoZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuICF4O1xuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5Qcm9wZXJ0eS5wcm90b3R5cGUuYW5kID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiYW5kXCIsIG90aGVyLCB0aGlzLmNvbWJpbmUob3RoZXIsIGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgIHJldHVybiB4ICYmIHk7XG4gICAgfSkpO1xuICB9O1xuXG4gIEJhY29uLlByb3BlcnR5LnByb3RvdHlwZS5vciA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcIm9yXCIsIG90aGVyLCB0aGlzLmNvbWJpbmUob3RoZXIsIGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgIHJldHVybiB4IHx8IHk7XG4gICAgfSkpO1xuICB9O1xuXG4gIEJhY29uLnNjaGVkdWxlciA9IHtcbiAgICBzZXRUaW1lb3V0OiBmdW5jdGlvbihmLCBkKSB7XG4gICAgICByZXR1cm4gc2V0VGltZW91dChmLCBkKTtcbiAgICB9LFxuICAgIHNldEludGVydmFsOiBmdW5jdGlvbihmLCBpKSB7XG4gICAgICByZXR1cm4gc2V0SW50ZXJ2YWwoZiwgaSk7XG4gICAgfSxcbiAgICBjbGVhckludGVydmFsOiBmdW5jdGlvbihpZCkge1xuICAgICAgcmV0dXJuIGNsZWFySW50ZXJ2YWwoaWQpO1xuICAgIH0sXG4gICAgY2xlYXJUaW1lb3V0OiBmdW5jdGlvbihpZCkge1xuICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChpZCk7XG4gICAgfSxcbiAgICBub3c6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIH1cbiAgfTtcblxuICBCYWNvbi5FdmVudFN0cmVhbS5wcm90b3R5cGUuYnVmZmVyV2l0aFRpbWUgPSBmdW5jdGlvbihkZWxheSkge1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJidWZmZXJXaXRoVGltZVwiLCBkZWxheSwgdGhpcy5idWZmZXJXaXRoVGltZU9yQ291bnQoZGVsYXksIE51bWJlci5NQVhfVkFMVUUpKTtcbiAgfTtcblxuICBCYWNvbi5FdmVudFN0cmVhbS5wcm90b3R5cGUuYnVmZmVyV2l0aENvdW50ID0gZnVuY3Rpb24oY291bnQpIHtcbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiYnVmZmVyV2l0aENvdW50XCIsIGNvdW50LCB0aGlzLmJ1ZmZlcldpdGhUaW1lT3JDb3VudCh2b2lkIDAsIGNvdW50KSk7XG4gIH07XG5cbiAgQmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLmJ1ZmZlcldpdGhUaW1lT3JDb3VudCA9IGZ1bmN0aW9uKGRlbGF5LCBjb3VudCkge1xuICAgIHZhciBmbHVzaE9yU2NoZWR1bGU7XG4gICAgZmx1c2hPclNjaGVkdWxlID0gZnVuY3Rpb24oYnVmZmVyKSB7XG4gICAgICBpZiAoYnVmZmVyLnZhbHVlcy5sZW5ndGggPT09IGNvdW50KSB7XG4gICAgICAgIHJldHVybiBidWZmZXIuZmx1c2goKTtcbiAgICAgIH0gZWxzZSBpZiAoZGVsYXkgIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gYnVmZmVyLnNjaGVkdWxlKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiYnVmZmVyV2l0aFRpbWVPckNvdW50XCIsIGRlbGF5LCBjb3VudCwgdGhpcy5idWZmZXIoZGVsYXksIGZsdXNoT3JTY2hlZHVsZSwgZmx1c2hPclNjaGVkdWxlKSk7XG4gIH07XG5cbiAgQmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLmJ1ZmZlciA9IGZ1bmN0aW9uKGRlbGF5LCBvbklucHV0LCBvbkZsdXNoKSB7XG4gICAgdmFyIGJ1ZmZlciwgZGVsYXlNcywgcmVwbHk7XG4gICAgaWYgKG9uSW5wdXQgPT0gbnVsbCkge1xuICAgICAgb25JbnB1dCA9IG5vcDtcbiAgICB9XG4gICAgaWYgKG9uRmx1c2ggPT0gbnVsbCkge1xuICAgICAgb25GbHVzaCA9IG5vcDtcbiAgICB9XG4gICAgYnVmZmVyID0ge1xuICAgICAgc2NoZWR1bGVkOiBudWxsLFxuICAgICAgZW5kOiB2b2lkIDAsXG4gICAgICB2YWx1ZXM6IFtdLFxuICAgICAgZmx1c2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVwbHk7XG4gICAgICAgIGlmICh0aGlzLnNjaGVkdWxlZCkge1xuICAgICAgICAgIEJhY29uLnNjaGVkdWxlci5jbGVhclRpbWVvdXQodGhpcy5zY2hlZHVsZWQpO1xuICAgICAgICAgIHRoaXMuc2NoZWR1bGVkID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy52YWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJlcGx5ID0gdGhpcy5wdXNoKG5leHRFdmVudCh0aGlzLnZhbHVlcykpO1xuICAgICAgICAgIHRoaXMudmFsdWVzID0gW107XG4gICAgICAgICAgaWYgKHRoaXMuZW5kICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2godGhpcy5lbmQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAocmVwbHkgIT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgcmV0dXJuIG9uRmx1c2godGhpcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLmVuZCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKHRoaXMuZW5kKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzY2hlZHVsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghdGhpcy5zY2hlZHVsZWQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zY2hlZHVsZWQgPSBkZWxheSgoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmZsdXNoKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pKHRoaXMpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgcmVwbHkgPSBCYWNvbi5tb3JlO1xuICAgIGlmICghXy5pc0Z1bmN0aW9uKGRlbGF5KSkge1xuICAgICAgZGVsYXlNcyA9IGRlbGF5O1xuICAgICAgZGVsYXkgPSBmdW5jdGlvbihmKSB7XG4gICAgICAgIHJldHVybiBCYWNvbi5zY2hlZHVsZXIuc2V0VGltZW91dChmLCBkZWxheU1zKTtcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJidWZmZXJcIiwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbihldmVudCkge1xuICAgICAgYnVmZmVyLnB1c2ggPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLnB1c2goZXZlbnQpO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcyk7XG4gICAgICBpZiAoZXZlbnQuaXNFcnJvcigpKSB7XG4gICAgICAgIHJlcGx5ID0gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICBidWZmZXIuZW5kID0gZXZlbnQ7XG4gICAgICAgIGlmICghYnVmZmVyLnNjaGVkdWxlZCkge1xuICAgICAgICAgIGJ1ZmZlci5mbHVzaCgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidWZmZXIudmFsdWVzLnB1c2goZXZlbnQudmFsdWUoKSk7XG4gICAgICAgIG9uSW5wdXQoYnVmZmVyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXBseTtcbiAgICB9KSk7XG4gIH07XG5cbiAgQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MsIGY7XG4gICAgZiA9IGFyZ3VtZW50c1swXSwgYXJncyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgIGFzc2VydE9ic2VydmFibGVJc1Byb3BlcnR5KGYpO1xuICAgIHJldHVybiBjb252ZXJ0QXJnc1RvRnVuY3Rpb24odGhpcywgZiwgYXJncywgZnVuY3Rpb24oZikge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImZpbHRlclwiLCBmLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5maWx0ZXIoZikpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gQmFjb24ubW9yZTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH0pO1xuICB9O1xuXG4gIEJhY29uLm9uY2UgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgRXZlbnRTdHJlYW0oZGVzY3JpYmUoQmFjb24sIFwib25jZVwiLCB2YWx1ZSksIGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgIHNpbmsodG9FdmVudCh2YWx1ZSkpO1xuICAgICAgc2luayhlbmRFdmVudCgpKTtcbiAgICAgIHJldHVybiBub3A7XG4gICAgfSk7XG4gIH07XG5cbiAgQmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLmNvbmNhdCA9IGZ1bmN0aW9uKHJpZ2h0KSB7XG4gICAgdmFyIGxlZnQ7XG4gICAgbGVmdCA9IHRoaXM7XG4gICAgcmV0dXJuIG5ldyBFdmVudFN0cmVhbShkZXNjcmliZShsZWZ0LCBcImNvbmNhdFwiLCByaWdodCksIGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgIHZhciB1bnN1YkxlZnQsIHVuc3ViUmlnaHQ7XG4gICAgICB1bnN1YlJpZ2h0ID0gbm9wO1xuICAgICAgdW5zdWJMZWZ0ID0gbGVmdC5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlLmlzRW5kKCkpIHtcbiAgICAgICAgICByZXR1cm4gdW5zdWJSaWdodCA9IHJpZ2h0LmRpc3BhdGNoZXIuc3Vic2NyaWJlKHNpbmspO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBzaW5rKGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdW5zdWJMZWZ0KCk7XG4gICAgICAgIHJldHVybiB1bnN1YlJpZ2h0KCk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9O1xuXG4gIEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLmZsYXRNYXAgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZmxhdE1hcF8odGhpcywgbWFrZVNwYXduZXIoYXJndW1lbnRzKSk7XG4gIH07XG5cbiAgQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuZmxhdE1hcEZpcnN0ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZsYXRNYXBfKHRoaXMsIG1ha2VTcGF3bmVyKGFyZ3VtZW50cyksIHRydWUpO1xuICB9O1xuXG4gIGZsYXRNYXBfID0gZnVuY3Rpb24ocm9vdCwgZiwgZmlyc3RPbmx5LCBsaW1pdCkge1xuICAgIHZhciBjaGlsZERlcHMsIHJlc3VsdCwgcm9vdERlcDtcbiAgICByb290RGVwID0gW3Jvb3RdO1xuICAgIGNoaWxkRGVwcyA9IFtdO1xuICAgIHJlc3VsdCA9IG5ldyBFdmVudFN0cmVhbShkZXNjcmliZShyb290LCBcImZsYXRNYXBcIiArIChmaXJzdE9ubHkgPyBcIkZpcnN0XCIgOiBcIlwiKSwgZiksIGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgIHZhciBjaGVja0VuZCwgY2hlY2tRdWV1ZSwgY29tcG9zaXRlLCBxdWV1ZSwgc3Bhd247XG4gICAgICBjb21wb3NpdGUgPSBuZXcgQ29tcG9zaXRlVW5zdWJzY3JpYmUoKTtcbiAgICAgIHF1ZXVlID0gW107XG4gICAgICBzcGF3biA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciBjaGlsZDtcbiAgICAgICAgY2hpbGQgPSBtYWtlT2JzZXJ2YWJsZShmKGV2ZW50LnZhbHVlKCkpKTtcbiAgICAgICAgY2hpbGREZXBzLnB1c2goY2hpbGQpO1xuICAgICAgICByZXR1cm4gY29tcG9zaXRlLmFkZChmdW5jdGlvbih1bnN1YkFsbCwgdW5zdWJNZSkge1xuICAgICAgICAgIHJldHVybiBjaGlsZC5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIHJlcGx5O1xuICAgICAgICAgICAgaWYgKGV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgICAgICAgXy5yZW1vdmUoY2hpbGQsIGNoaWxkRGVwcyk7XG4gICAgICAgICAgICAgIGNoZWNrUXVldWUoKTtcbiAgICAgICAgICAgICAgY2hlY2tFbmQodW5zdWJNZSk7XG4gICAgICAgICAgICAgIHJldHVybiBCYWNvbi5ub01vcmU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBJbml0aWFsKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQgPSBldmVudC50b05leHQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXBseSA9IHNpbmsoZXZlbnQpO1xuICAgICAgICAgICAgICBpZiAocmVwbHkgPT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgICAgIHVuc3ViQWxsKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHJlcGx5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICBjaGVja1F1ZXVlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBldmVudDtcbiAgICAgICAgZXZlbnQgPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICByZXR1cm4gc3Bhd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY2hlY2tFbmQgPSBmdW5jdGlvbih1bnN1Yikge1xuICAgICAgICB1bnN1YigpO1xuICAgICAgICBpZiAoY29tcG9zaXRlLmVtcHR5KCkpIHtcbiAgICAgICAgICByZXR1cm4gc2luayhlbmRFdmVudCgpKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNvbXBvc2l0ZS5hZGQoZnVuY3Rpb24oX18sIHVuc3ViUm9vdCkge1xuICAgICAgICByZXR1cm4gcm9vdC5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hlY2tFbmQodW5zdWJSb290KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmlzRXJyb3IoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHNpbmsoZXZlbnQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZmlyc3RPbmx5ICYmIGNvbXBvc2l0ZS5jb3VudCgpID4gMSkge1xuICAgICAgICAgICAgcmV0dXJuIEJhY29uLm1vcmU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjb21wb3NpdGUudW5zdWJzY3JpYmVkKSB7XG4gICAgICAgICAgICAgIHJldHVybiBCYWNvbi5ub01vcmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGltaXQgJiYgY29tcG9zaXRlLmNvdW50KCkgPiBsaW1pdCkge1xuICAgICAgICAgICAgICByZXR1cm4gcXVldWUucHVzaChldmVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gc3Bhd24oZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBjb21wb3NpdGUudW5zdWJzY3JpYmU7XG4gICAgfSk7XG4gICAgcmVzdWx0LmludGVybmFsRGVwcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGNoaWxkRGVwcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHJvb3REZXAuY29uY2F0KGNoaWxkRGVwcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcm9vdERlcDtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgbWFrZVNwYXduZXIgPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAxICYmIGlzT2JzZXJ2YWJsZShhcmdzWzBdKSkge1xuICAgICAgcmV0dXJuIF8uYWx3YXlzKGFyZ3NbMF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbWFrZUZ1bmN0aW9uQXJncyhhcmdzKTtcbiAgICB9XG4gIH07XG5cbiAgbWFrZU9ic2VydmFibGUgPSBmdW5jdGlvbih4KSB7XG4gICAgaWYgKGlzT2JzZXJ2YWJsZSh4KSkge1xuICAgICAgcmV0dXJuIHg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBCYWNvbi5vbmNlKHgpO1xuICAgIH1cbiAgfTtcblxuICBCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5mbGF0TWFwV2l0aENvbmN1cnJlbmN5TGltaXQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncywgbGltaXQ7XG4gICAgbGltaXQgPSBhcmd1bWVudHNbMF0sIGFyZ3MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uLmFwcGx5KG51bGwsIFt0aGlzLCBcImZsYXRNYXBXaXRoQ29uY3VycmVuY3lMaW1pdFwiLCBsaW1pdF0uY29uY2F0KHNsaWNlLmNhbGwoYXJncyksIFtmbGF0TWFwXyh0aGlzLCBtYWtlU3Bhd25lcihhcmdzKSwgZmFsc2UsIGxpbWl0KV0pKTtcbiAgfTtcblxuICBCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5mbGF0TWFwQ29uY2F0ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbi5hcHBseShudWxsLCBbdGhpcywgXCJmbGF0TWFwQ29uY2F0XCJdLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cyksIFt0aGlzLmZsYXRNYXBXaXRoQ29uY3VycmVuY3lMaW1pdC5hcHBseSh0aGlzLCBbMV0uY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSkpXSkpO1xuICB9O1xuXG4gIEJhY29uLmxhdGVyID0gZnVuY3Rpb24oZGVsYXksIHZhbHVlKSB7XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbihCYWNvbiwgXCJsYXRlclwiLCBkZWxheSwgdmFsdWUsIEJhY29uLmZyb21CaW5kZXIoZnVuY3Rpb24oc2luaykge1xuICAgICAgdmFyIGlkLCBzZW5kZXI7XG4gICAgICBzZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHNpbmsoW3ZhbHVlLCBlbmRFdmVudCgpXSk7XG4gICAgICB9O1xuICAgICAgaWQgPSBCYWNvbi5zY2hlZHVsZXIuc2V0VGltZW91dChzZW5kZXIsIGRlbGF5KTtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIEJhY29uLnNjaGVkdWxlci5jbGVhclRpbWVvdXQoaWQpO1xuICAgICAgfTtcbiAgICB9KSk7XG4gIH07XG5cbiAgQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuYnVmZmVyaW5nVGhyb3R0bGUgPSBmdW5jdGlvbihtaW5pbXVtSW50ZXJ2YWwpIHtcbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiYnVmZmVyaW5nVGhyb3R0bGVcIiwgbWluaW11bUludGVydmFsLCB0aGlzLmZsYXRNYXBDb25jYXQoZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIEJhY29uLm9uY2UoeCkuY29uY2F0KEJhY29uLmxhdGVyKG1pbmltdW1JbnRlcnZhbCkuZmlsdGVyKGZhbHNlKSk7XG4gICAgfSkpO1xuICB9O1xuXG4gIEJhY29uLlByb3BlcnR5LnByb3RvdHlwZS5idWZmZXJpbmdUaHJvdHRsZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5idWZmZXJpbmdUaHJvdHRsZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpLnRvUHJvcGVydHkoKTtcbiAgfTtcblxuICBCdXMgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICAgIGV4dGVuZChCdXMsIHN1cGVyQ2xhc3MpO1xuXG4gICAgZnVuY3Rpb24gQnVzKCkge1xuICAgICAgdGhpcy5ndWFyZGVkU2luayA9IGJpbmQodGhpcy5ndWFyZGVkU2luaywgdGhpcyk7XG4gICAgICB0aGlzLnN1YnNjcmliZUFsbCA9IGJpbmQodGhpcy5zdWJzY3JpYmVBbGwsIHRoaXMpO1xuICAgICAgdGhpcy51bnN1YkFsbCA9IGJpbmQodGhpcy51bnN1YkFsbCwgdGhpcyk7XG4gICAgICB0aGlzLnNpbmsgPSB2b2lkIDA7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBbXTtcbiAgICAgIHRoaXMuZW5kZWQgPSBmYWxzZTtcbiAgICAgIEJ1cy5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLCBkZXNjcmliZShCYWNvbiwgXCJCdXNcIiksIHRoaXMuc3Vic2NyaWJlQWxsKTtcbiAgICB9XG5cbiAgICBCdXMucHJvdG90eXBlLnVuc3ViQWxsID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaiwgbGVuMSwgcmVmLCBzdWI7XG4gICAgICByZWYgPSB0aGlzLnN1YnNjcmlwdGlvbnM7XG4gICAgICBmb3IgKGogPSAwLCBsZW4xID0gcmVmLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgICBzdWIgPSByZWZbal07XG4gICAgICAgIGlmICh0eXBlb2Ygc3ViLnVuc3ViID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBzdWIudW5zdWIoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9O1xuXG4gICAgQnVzLnByb3RvdHlwZS5zdWJzY3JpYmVBbGwgPSBmdW5jdGlvbihuZXdTaW5rKSB7XG4gICAgICB2YXIgaiwgbGVuMSwgcmVmLCBzdWJzY3JpcHRpb247XG4gICAgICBpZiAodGhpcy5lbmRlZCkge1xuICAgICAgICBuZXdTaW5rKGVuZEV2ZW50KCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zaW5rID0gbmV3U2luaztcbiAgICAgICAgcmVmID0gY2xvbmVBcnJheSh0aGlzLnN1YnNjcmlwdGlvbnMpO1xuICAgICAgICBmb3IgKGogPSAwLCBsZW4xID0gcmVmLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IHJlZltqXTtcbiAgICAgICAgICB0aGlzLnN1YnNjcmliZUlucHV0KHN1YnNjcmlwdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnVuc3ViQWxsO1xuICAgIH07XG5cbiAgICBCdXMucHJvdG90eXBlLmd1YXJkZWRTaW5rID0gZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgIHJldHVybiAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKGV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgICAgIF90aGlzLnVuc3Vic2NyaWJlSW5wdXQoaW5wdXQpO1xuICAgICAgICAgICAgcmV0dXJuIEJhY29uLm5vTW9yZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnNpbmsoZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpO1xuICAgIH07XG5cbiAgICBCdXMucHJvdG90eXBlLnN1YnNjcmliZUlucHV0ID0gZnVuY3Rpb24oc3Vic2NyaXB0aW9uKSB7XG4gICAgICByZXR1cm4gc3Vic2NyaXB0aW9uLnVuc3ViID0gc3Vic2NyaXB0aW9uLmlucHV0LmRpc3BhdGNoZXIuc3Vic2NyaWJlKHRoaXMuZ3VhcmRlZFNpbmsoc3Vic2NyaXB0aW9uLmlucHV0KSk7XG4gICAgfTtcblxuICAgIEJ1cy5wcm90b3R5cGUudW5zdWJzY3JpYmVJbnB1dCA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICB2YXIgaSwgaiwgbGVuMSwgcmVmLCBzdWI7XG4gICAgICByZWYgPSB0aGlzLnN1YnNjcmlwdGlvbnM7XG4gICAgICBmb3IgKGkgPSBqID0gMCwgbGVuMSA9IHJlZi5sZW5ndGg7IGogPCBsZW4xOyBpID0gKytqKSB7XG4gICAgICAgIHN1YiA9IHJlZltpXTtcbiAgICAgICAgaWYgKHN1Yi5pbnB1dCA9PT0gaW5wdXQpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHN1Yi51bnN1YiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBzdWIudW5zdWIoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgQnVzLnByb3RvdHlwZS5wbHVnID0gZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgIHZhciBzdWI7XG4gICAgICBhc3NlcnRPYnNlcnZhYmxlKGlucHV0KTtcbiAgICAgIGlmICh0aGlzLmVuZGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHN1YiA9IHtcbiAgICAgICAgaW5wdXQ6IGlucHV0XG4gICAgICB9O1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goc3ViKTtcbiAgICAgIGlmICgodGhpcy5zaW5rICE9IG51bGwpKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlSW5wdXQoc3ViKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfdGhpcy51bnN1YnNjcmliZUlucHV0KGlucHV0KTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpO1xuICAgIH07XG5cbiAgICBCdXMucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5lbmRlZCA9IHRydWU7XG4gICAgICB0aGlzLnVuc3ViQWxsKCk7XG4gICAgICByZXR1cm4gdHlwZW9mIHRoaXMuc2luayA9PT0gXCJmdW5jdGlvblwiID8gdGhpcy5zaW5rKGVuZEV2ZW50KCkpIDogdm9pZCAwO1xuICAgIH07XG5cbiAgICBCdXMucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgaWYgKCF0aGlzLmVuZGVkKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5zaW5rID09PSBcImZ1bmN0aW9uXCIgPyB0aGlzLnNpbmsobmV4dEV2ZW50KHZhbHVlKSkgOiB2b2lkIDA7XG4gICAgICB9XG4gICAgfTtcblxuICAgIEJ1cy5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbihlcnJvcikge1xuICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLnNpbmsgPT09IFwiZnVuY3Rpb25cIiA/IHRoaXMuc2luayhuZXcgRXJyb3IoZXJyb3IpKSA6IHZvaWQgMDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEJ1cztcblxuICB9KShFdmVudFN0cmVhbSk7XG5cbiAgQmFjb24uQnVzID0gQnVzO1xuXG4gIGxpZnRDYWxsYmFjayA9IGZ1bmN0aW9uKGRlc2MsIHdyYXBwZWQpIHtcbiAgICByZXR1cm4gd2l0aE1ldGhvZENhbGxTdXBwb3J0KGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MsIGYsIHN0cmVhbTtcbiAgICAgIGYgPSBhcmd1bWVudHNbMF0sIGFyZ3MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICAgIHN0cmVhbSA9IHBhcnRpYWxseUFwcGxpZWQod3JhcHBlZCwgW1xuICAgICAgICBmdW5jdGlvbih2YWx1ZXMsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgcmV0dXJuIGYuYXBwbHkobnVsbCwgc2xpY2UuY2FsbCh2YWx1ZXMpLmNvbmNhdChbY2FsbGJhY2tdKSk7XG4gICAgICAgIH1cbiAgICAgIF0pO1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbi5hcHBseShudWxsLCBbQmFjb24sIGRlc2MsIGZdLmNvbmNhdChzbGljZS5jYWxsKGFyZ3MpLCBbQmFjb24uY29tYmluZUFzQXJyYXkoYXJncykuZmxhdE1hcChzdHJlYW0pXSkpO1xuICAgIH0pO1xuICB9O1xuXG4gIEJhY29uLmZyb21DYWxsYmFjayA9IGxpZnRDYWxsYmFjayhcImZyb21DYWxsYmFja1wiLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncywgZjtcbiAgICBmID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgcmV0dXJuIEJhY29uLmZyb21CaW5kZXIoZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgbWFrZUZ1bmN0aW9uKGYsIGFyZ3MpKGhhbmRsZXIpO1xuICAgICAgcmV0dXJuIG5vcDtcbiAgICB9LCAoZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiBbdmFsdWUsIGVuZEV2ZW50KCldO1xuICAgIH0pKTtcbiAgfSk7XG5cbiAgQmFjb24uZnJvbU5vZGVDYWxsYmFjayA9IGxpZnRDYWxsYmFjayhcImZyb21Ob2RlQ2FsbGJhY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MsIGY7XG4gICAgZiA9IGFyZ3VtZW50c1swXSwgYXJncyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgIHJldHVybiBCYWNvbi5mcm9tQmluZGVyKGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgIG1ha2VGdW5jdGlvbihmLCBhcmdzKShoYW5kbGVyKTtcbiAgICAgIHJldHVybiBub3A7XG4gICAgfSwgZnVuY3Rpb24oZXJyb3IsIHZhbHVlKSB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIFtuZXcgRXJyb3IoZXJyb3IpLCBlbmRFdmVudCgpXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBbdmFsdWUsIGVuZEV2ZW50KCldO1xuICAgIH0pO1xuICB9KTtcblxuICBhZGRQcm9wZXJ0eUluaXRWYWx1ZVRvU3RyZWFtID0gZnVuY3Rpb24ocHJvcGVydHksIHN0cmVhbSkge1xuICAgIHZhciBqdXN0SW5pdFZhbHVlO1xuICAgIGp1c3RJbml0VmFsdWUgPSBuZXcgRXZlbnRTdHJlYW0oZGVzY3JpYmUocHJvcGVydHksIFwianVzdEluaXRWYWx1ZVwiKSwgZnVuY3Rpb24oc2luaykge1xuICAgICAgdmFyIHVuc3ViLCB2YWx1ZTtcbiAgICAgIHZhbHVlID0gdm9pZCAwO1xuICAgICAgdW5zdWIgPSBwcm9wZXJ0eS5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoIWV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgICB2YWx1ZSA9IGV2ZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBCYWNvbi5ub01vcmU7XG4gICAgICB9KTtcbiAgICAgIFVwZGF0ZUJhcnJpZXIud2hlbkRvbmVXaXRoKGp1c3RJbml0VmFsdWUsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgIHNpbmsodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaW5rKGVuZEV2ZW50KCkpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdW5zdWI7XG4gICAgfSk7XG4gICAgcmV0dXJuIGp1c3RJbml0VmFsdWUuY29uY2F0KHN0cmVhbSkudG9Qcm9wZXJ0eSgpO1xuICB9O1xuXG4gIEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLm1hcEVuZCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBmO1xuICAgIGYgPSBtYWtlRnVuY3Rpb25BcmdzKGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcIm1hcEVuZFwiLCBmLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICB0aGlzLnB1c2gobmV4dEV2ZW50KGYoZXZlbnQpKSk7XG4gICAgICAgIHRoaXMucHVzaChlbmRFdmVudCgpKTtcbiAgICAgICAgcmV0dXJuIEJhY29uLm5vTW9yZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5za2lwRXJyb3JzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcInNraXBFcnJvcnNcIiwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbihldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmlzRXJyb3IoKSkge1xuICAgICAgICByZXR1cm4gQmFjb24ubW9yZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5FdmVudFN0cmVhbS5wcm90b3R5cGUudGFrZVVudGlsID0gZnVuY3Rpb24oc3RvcHBlcikge1xuICAgIHZhciBlbmRNYXJrZXI7XG4gICAgZW5kTWFya2VyID0ge307XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcInRha2VVbnRpbFwiLCBzdG9wcGVyLCBCYWNvbi5ncm91cFNpbXVsdGFuZW91cyh0aGlzLm1hcEVuZChlbmRNYXJrZXIpLCBzdG9wcGVyLnNraXBFcnJvcnMoKSkud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIHZhciBkYXRhLCBqLCBsZW4xLCByZWYsIHJlcGx5LCB2YWx1ZTtcbiAgICAgIGlmICghZXZlbnQuaGFzVmFsdWUoKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlZiA9IGV2ZW50LnZhbHVlKCksIGRhdGEgPSByZWZbMF0sIHN0b3BwZXIgPSByZWZbMV07XG4gICAgICAgIGlmIChzdG9wcGVyLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goZW5kRXZlbnQoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVwbHkgPSBCYWNvbi5tb3JlO1xuICAgICAgICAgIGZvciAoaiA9IDAsIGxlbjEgPSBkYXRhLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgICAgICAgdmFsdWUgPSBkYXRhW2pdO1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBlbmRNYXJrZXIpIHtcbiAgICAgICAgICAgICAgcmVwbHkgPSB0aGlzLnB1c2goZW5kRXZlbnQoKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXBseSA9IHRoaXMucHVzaChuZXh0RXZlbnQodmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlcGx5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSkpO1xuICB9O1xuXG4gIEJhY29uLlByb3BlcnR5LnByb3RvdHlwZS50YWtlVW50aWwgPSBmdW5jdGlvbihzdG9wcGVyKSB7XG4gICAgdmFyIGNoYW5nZXM7XG4gICAgY2hhbmdlcyA9IHRoaXMuY2hhbmdlcygpLnRha2VVbnRpbChzdG9wcGVyKTtcbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwidGFrZVVudGlsXCIsIHN0b3BwZXIsIGFkZFByb3BlcnR5SW5pdFZhbHVlVG9TdHJlYW0odGhpcywgY2hhbmdlcykpO1xuICB9O1xuXG4gIEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLmZsYXRNYXBMYXRlc3QgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZiwgc3RyZWFtO1xuICAgIGYgPSBtYWtlU3Bhd25lcihhcmd1bWVudHMpO1xuICAgIHN0cmVhbSA9IHRoaXMudG9FdmVudFN0cmVhbSgpO1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJmbGF0TWFwTGF0ZXN0XCIsIGYsIHN0cmVhbS5mbGF0TWFwKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gbWFrZU9ic2VydmFibGUoZih2YWx1ZSkpLnRha2VVbnRpbChzdHJlYW0pO1xuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5Qcm9wZXJ0eS5wcm90b3R5cGUuZGVsYXlDaGFuZ2VzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRlc2MsIGYsIGo7XG4gICAgZGVzYyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAwLCBqID0gYXJndW1lbnRzLmxlbmd0aCAtIDEpIDogKGogPSAwLCBbXSksIGYgPSBhcmd1bWVudHNbaisrXTtcbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uLmFwcGx5KG51bGwsIFt0aGlzXS5jb25jYXQoc2xpY2UuY2FsbChkZXNjKSwgW2FkZFByb3BlcnR5SW5pdFZhbHVlVG9TdHJlYW0odGhpcywgZih0aGlzLmNoYW5nZXMoKSkpXSkpO1xuICB9O1xuXG4gIEJhY29uLkV2ZW50U3RyZWFtLnByb3RvdHlwZS5kZWxheSA9IGZ1bmN0aW9uKGRlbGF5KSB7XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImRlbGF5XCIsIGRlbGF5LCB0aGlzLmZsYXRNYXAoZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiBCYWNvbi5sYXRlcihkZWxheSwgdmFsdWUpO1xuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5Qcm9wZXJ0eS5wcm90b3R5cGUuZGVsYXkgPSBmdW5jdGlvbihkZWxheSkge1xuICAgIHJldHVybiB0aGlzLmRlbGF5Q2hhbmdlcyhcImRlbGF5XCIsIGRlbGF5LCBmdW5jdGlvbihjaGFuZ2VzKSB7XG4gICAgICByZXR1cm4gY2hhbmdlcy5kZWxheShkZWxheSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLmRlYm91bmNlID0gZnVuY3Rpb24oZGVsYXkpIHtcbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiZGVib3VuY2VcIiwgZGVsYXksIHRoaXMuZmxhdE1hcExhdGVzdChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIEJhY29uLmxhdGVyKGRlbGF5LCB2YWx1ZSk7XG4gICAgfSkpO1xuICB9O1xuXG4gIEJhY29uLlByb3BlcnR5LnByb3RvdHlwZS5kZWJvdW5jZSA9IGZ1bmN0aW9uKGRlbGF5KSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsYXlDaGFuZ2VzKFwiZGVib3VuY2VcIiwgZGVsYXksIGZ1bmN0aW9uKGNoYW5nZXMpIHtcbiAgICAgIHJldHVybiBjaGFuZ2VzLmRlYm91bmNlKGRlbGF5KTtcbiAgICB9KTtcbiAgfTtcblxuICBCYWNvbi5FdmVudFN0cmVhbS5wcm90b3R5cGUuZGVib3VuY2VJbW1lZGlhdGUgPSBmdW5jdGlvbihkZWxheSkge1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJkZWJvdW5jZUltbWVkaWF0ZVwiLCBkZWxheSwgdGhpcy5mbGF0TWFwRmlyc3QoZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiBCYWNvbi5vbmNlKHZhbHVlKS5jb25jYXQoQmFjb24ubGF0ZXIoZGVsYXkpLmZpbHRlcihmYWxzZSkpO1xuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5zY2FuID0gZnVuY3Rpb24oc2VlZCwgZikge1xuICAgIHZhciBhY2MsIHJlc3VsdFByb3BlcnR5LCBzdWJzY3JpYmU7XG4gICAgZiA9IHRvQ29tYmluYXRvcihmKTtcbiAgICBhY2MgPSB0b09wdGlvbihzZWVkKTtcbiAgICBzdWJzY3JpYmUgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihzaW5rKSB7XG4gICAgICAgIHZhciBpbml0U2VudCwgcmVwbHksIHNlbmRJbml0LCB1bnN1YjtcbiAgICAgICAgaW5pdFNlbnQgPSBmYWxzZTtcbiAgICAgICAgdW5zdWIgPSBub3A7XG4gICAgICAgIHJlcGx5ID0gQmFjb24ubW9yZTtcbiAgICAgICAgc2VuZEluaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoIWluaXRTZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gYWNjLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgaW5pdFNlbnQgPSB0cnVlO1xuICAgICAgICAgICAgICByZXBseSA9IHNpbmsobmV3IEluaXRpYWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgICAgICAgdW5zdWIoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5zdWIgPSBub3A7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdW5zdWIgPSBfdGhpcy5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIHZhciBuZXh0LCBwcmV2O1xuICAgICAgICAgIGlmIChldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgICBpZiAoaW5pdFNlbnQgJiYgZXZlbnQuaXNJbml0aWFsKCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIEJhY29uLm1vcmU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoIWV2ZW50LmlzSW5pdGlhbCgpKSB7XG4gICAgICAgICAgICAgICAgc2VuZEluaXQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpbml0U2VudCA9IHRydWU7XG4gICAgICAgICAgICAgIHByZXYgPSBhY2MuZ2V0T3JFbHNlKHZvaWQgMCk7XG4gICAgICAgICAgICAgIG5leHQgPSBmKHByZXYsIGV2ZW50LnZhbHVlKCkpO1xuICAgICAgICAgICAgICBhY2MgPSBuZXcgU29tZShuZXh0KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHNpbmsoZXZlbnQuYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgICAgICAgcmVwbHkgPSBzZW5kSW5pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlcGx5ICE9PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNpbmsoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFVwZGF0ZUJhcnJpZXIud2hlbkRvbmVXaXRoKHJlc3VsdFByb3BlcnR5LCBzZW5kSW5pdCk7XG4gICAgICAgIHJldHVybiB1bnN1YjtcbiAgICAgIH07XG4gICAgfSkodGhpcyk7XG4gICAgcmV0dXJuIHJlc3VsdFByb3BlcnR5ID0gbmV3IFByb3BlcnR5KGRlc2NyaWJlKHRoaXMsIFwic2NhblwiLCBzZWVkLCBmKSwgc3Vic2NyaWJlKTtcbiAgfTtcblxuICBCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5kaWZmID0gZnVuY3Rpb24oc3RhcnQsIGYpIHtcbiAgICBmID0gdG9Db21iaW5hdG9yKGYpO1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJkaWZmXCIsIHN0YXJ0LCBmLCB0aGlzLnNjYW4oW3N0YXJ0XSwgZnVuY3Rpb24ocHJldlR1cGxlLCBuZXh0KSB7XG4gICAgICByZXR1cm4gW25leHQsIGYocHJldlR1cGxlWzBdLCBuZXh0KV07XG4gICAgfSkuZmlsdGVyKGZ1bmN0aW9uKHR1cGxlKSB7XG4gICAgICByZXR1cm4gdHVwbGUubGVuZ3RoID09PSAyO1xuICAgIH0pLm1hcChmdW5jdGlvbih0dXBsZSkge1xuICAgICAgcmV0dXJuIHR1cGxlWzFdO1xuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5kb0FjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBmO1xuICAgIGYgPSBtYWtlRnVuY3Rpb25BcmdzKGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImRvQWN0aW9uXCIsIGYsIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgIGYoZXZlbnQudmFsdWUoKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICB9KSk7XG4gIH07XG5cbiAgQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuZG9FcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBmO1xuICAgIGYgPSBtYWtlRnVuY3Rpb25BcmdzKGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImRvRXJyb3JcIiwgZiwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbihldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmlzRXJyb3IoKSkge1xuICAgICAgICBmKGV2ZW50LmVycm9yKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5lbmRPbkVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MsIGY7XG4gICAgZiA9IGFyZ3VtZW50c1swXSwgYXJncyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgIGlmIChmID09IG51bGwpIHtcbiAgICAgIGYgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gY29udmVydEFyZ3NUb0Z1bmN0aW9uKHRoaXMsIGYsIGFyZ3MsIGZ1bmN0aW9uKGYpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJlbmRPbkVycm9yXCIsIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmlzRXJyb3IoKSAmJiBmKGV2ZW50LmVycm9yKSkge1xuICAgICAgICAgIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChlbmRFdmVudCgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH0pO1xuICB9O1xuXG4gIE9ic2VydmFibGUucHJvdG90eXBlLmVycm9ycyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJlcnJvcnNcIiwgdGhpcy5maWx0ZXIoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSkpO1xuICB9O1xuXG4gIHZhbHVlQW5kRW5kID0gKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIFt2YWx1ZSwgZW5kRXZlbnQoKV07XG4gIH0pO1xuXG4gIEJhY29uLmZyb21Qcm9taXNlID0gZnVuY3Rpb24ocHJvbWlzZSwgYWJvcnQpIHtcbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKEJhY29uLCBcImZyb21Qcm9taXNlXCIsIHByb21pc2UsIEJhY29uLmZyb21CaW5kZXIoZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgdmFyIHJlZjtcbiAgICAgIGlmICgocmVmID0gcHJvbWlzZS50aGVuKGhhbmRsZXIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIGhhbmRsZXIobmV3IEVycm9yKGUpKTtcbiAgICAgIH0pKSAhPSBudWxsKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVmLmRvbmUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHJlZi5kb25lKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGFib3J0KSB7XG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiBwcm9taXNlLmFib3J0ID09PSBcImZ1bmN0aW9uXCIgPyBwcm9taXNlLmFib3J0KCkgOiB2b2lkIDA7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSwgdmFsdWVBbmRFbmQpKTtcbiAgfTtcblxuICBCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5tYXBFcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBmO1xuICAgIGYgPSBtYWtlRnVuY3Rpb25BcmdzKGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcIm1hcEVycm9yXCIsIGYsIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5pc0Vycm9yKCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHVzaChuZXh0RXZlbnQoZihldmVudC5lcnJvcikpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5mbGF0TWFwRXJyb3IgPSBmdW5jdGlvbihmbikge1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJmbGF0TWFwRXJyb3JcIiwgZm4sIHRoaXMubWFwRXJyb3IoZnVuY3Rpb24oZXJyKSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKGVycik7XG4gICAgfSkuZmxhdE1hcChmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoeCBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHJldHVybiBmbih4LmVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBCYWNvbi5vbmNlKHgpO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5FdmVudFN0cmVhbS5wcm90b3R5cGUuc2FtcGxlZEJ5ID0gZnVuY3Rpb24oc2FtcGxlciwgY29tYmluYXRvcikge1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJzYW1wbGVkQnlcIiwgc2FtcGxlciwgY29tYmluYXRvciwgdGhpcy50b1Byb3BlcnR5KCkuc2FtcGxlZEJ5KHNhbXBsZXIsIGNvbWJpbmF0b3IpKTtcbiAgfTtcblxuICBCYWNvbi5Qcm9wZXJ0eS5wcm90b3R5cGUuc2FtcGxlZEJ5ID0gZnVuY3Rpb24oc2FtcGxlciwgY29tYmluYXRvcikge1xuICAgIHZhciBsYXp5LCByZXN1bHQsIHNhbXBsZXJTb3VyY2UsIHN0cmVhbSwgdGhpc1NvdXJjZTtcbiAgICBpZiAoY29tYmluYXRvciAhPSBudWxsKSB7XG4gICAgICBjb21iaW5hdG9yID0gdG9Db21iaW5hdG9yKGNvbWJpbmF0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXp5ID0gdHJ1ZTtcbiAgICAgIGNvbWJpbmF0b3IgPSBmdW5jdGlvbihmKSB7XG4gICAgICAgIHJldHVybiBmLnZhbHVlKCk7XG4gICAgICB9O1xuICAgIH1cbiAgICB0aGlzU291cmNlID0gbmV3IFNvdXJjZSh0aGlzLCBmYWxzZSwgbGF6eSk7XG4gICAgc2FtcGxlclNvdXJjZSA9IG5ldyBTb3VyY2Uoc2FtcGxlciwgdHJ1ZSwgbGF6eSk7XG4gICAgc3RyZWFtID0gQmFjb24ud2hlbihbdGhpc1NvdXJjZSwgc2FtcGxlclNvdXJjZV0sIGNvbWJpbmF0b3IpO1xuICAgIHJlc3VsdCA9IHNhbXBsZXIgaW5zdGFuY2VvZiBQcm9wZXJ0eSA/IHN0cmVhbS50b1Byb3BlcnR5KCkgOiBzdHJlYW07XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcInNhbXBsZWRCeVwiLCBzYW1wbGVyLCBjb21iaW5hdG9yLCByZXN1bHQpO1xuICB9O1xuXG4gIEJhY29uLlByb3BlcnR5LnByb3RvdHlwZS5zYW1wbGUgPSBmdW5jdGlvbihpbnRlcnZhbCkge1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJzYW1wbGVcIiwgaW50ZXJ2YWwsIHRoaXMuc2FtcGxlZEJ5KEJhY29uLmludGVydmFsKGludGVydmFsLCB7fSkpKTtcbiAgfTtcblxuICBCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncywgcDtcbiAgICBwID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgaWYgKHAgaW5zdGFuY2VvZiBQcm9wZXJ0eSkge1xuICAgICAgcmV0dXJuIHAuc2FtcGxlZEJ5KHRoaXMsIGZvcm1lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjb252ZXJ0QXJnc1RvRnVuY3Rpb24odGhpcywgcCwgYXJncywgZnVuY3Rpb24oZikge1xuICAgICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwibWFwXCIsIGYsIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50LmZtYXAoZikpO1xuICAgICAgICB9KSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuZm9sZCA9IGZ1bmN0aW9uKHNlZWQsIGYpIHtcbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiZm9sZFwiLCBzZWVkLCBmLCB0aGlzLnNjYW4oc2VlZCwgZikuc2FtcGxlZEJ5KHRoaXMuZmlsdGVyKGZhbHNlKS5tYXBFbmQoKS50b1Byb3BlcnR5KCkpKTtcbiAgfTtcblxuICBPYnNlcnZhYmxlLnByb3RvdHlwZS5yZWR1Y2UgPSBPYnNlcnZhYmxlLnByb3RvdHlwZS5mb2xkO1xuXG4gIEJhY29uLmZyb21Qb2xsID0gZnVuY3Rpb24oZGVsYXksIHBvbGwpIHtcbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKEJhY29uLCBcImZyb21Qb2xsXCIsIGRlbGF5LCBwb2xsLCBCYWNvbi5mcm9tQmluZGVyKChmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICB2YXIgaWQ7XG4gICAgICBpZCA9IEJhY29uLnNjaGVkdWxlci5zZXRJbnRlcnZhbChoYW5kbGVyLCBkZWxheSk7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBCYWNvbi5zY2hlZHVsZXIuY2xlYXJJbnRlcnZhbChpZCk7XG4gICAgICB9O1xuICAgIH0pLCBwb2xsKSk7XG4gIH07XG5cbiAgQmFjb24uZnJvbUFycmF5ID0gZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgdmFyIGk7XG4gICAgYXNzZXJ0QXJyYXkodmFsdWVzKTtcbiAgICBpZiAoIXZhbHVlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24oQmFjb24sIFwiZnJvbUFycmF5XCIsIHZhbHVlcywgQmFjb24ubmV2ZXIoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGkgPSAwO1xuICAgICAgcmV0dXJuIG5ldyBFdmVudFN0cmVhbShkZXNjcmliZShCYWNvbiwgXCJmcm9tQXJyYXlcIiwgdmFsdWVzKSwgZnVuY3Rpb24oc2luaykge1xuICAgICAgICB2YXIgcHVzaCwgcHVzaE5lZWRlZCwgcHVzaGluZywgcmVwbHksIHVuc3ViZDtcbiAgICAgICAgdW5zdWJkID0gZmFsc2U7XG4gICAgICAgIHJlcGx5ID0gQmFjb24ubW9yZTtcbiAgICAgICAgcHVzaGluZyA9IGZhbHNlO1xuICAgICAgICBwdXNoTmVlZGVkID0gZmFsc2U7XG4gICAgICAgIHB1c2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgICAgcHVzaE5lZWRlZCA9IHRydWU7XG4gICAgICAgICAgaWYgKHB1c2hpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcHVzaGluZyA9IHRydWU7XG4gICAgICAgICAgd2hpbGUgKHB1c2hOZWVkZWQpIHtcbiAgICAgICAgICAgIHB1c2hOZWVkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICgocmVwbHkgIT09IEJhY29uLm5vTW9yZSkgJiYgIXVuc3ViZCkge1xuICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlc1tpKytdO1xuICAgICAgICAgICAgICByZXBseSA9IHNpbmsodG9FdmVudCh2YWx1ZSkpO1xuICAgICAgICAgICAgICBpZiAocmVwbHkgIT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgICAgIGlmIChpID09PSB2YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICBzaW5rKGVuZEV2ZW50KCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBVcGRhdGVCYXJyaWVyLmFmdGVyVHJhbnNhY3Rpb24ocHVzaCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBwdXNoaW5nID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIHB1c2goKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB1bnN1YmQgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIEJhY29uLkV2ZW50U3RyZWFtLnByb3RvdHlwZS5ob2xkV2hlbiA9IGZ1bmN0aW9uKHZhbHZlKSB7XG4gICAgdmFyIGJ1ZmZlcmVkVmFsdWVzLCBjb21wb3NpdGUsIG9uSG9sZCwgc3JjO1xuICAgIGNvbXBvc2l0ZSA9IG5ldyBDb21wb3NpdGVVbnN1YnNjcmliZSgpO1xuICAgIG9uSG9sZCA9IGZhbHNlO1xuICAgIGJ1ZmZlcmVkVmFsdWVzID0gW107XG4gICAgc3JjID0gdGhpcztcbiAgICByZXR1cm4gbmV3IEV2ZW50U3RyZWFtKGRlc2NyaWJlKHRoaXMsIFwiaG9sZFdoZW5cIiwgdmFsdmUpLCBmdW5jdGlvbihzaW5rKSB7XG4gICAgICB2YXIgZW5kSWZCb3RoRW5kZWQ7XG4gICAgICBlbmRJZkJvdGhFbmRlZCA9IGZ1bmN0aW9uKHVuc3ViKSB7XG4gICAgICAgIHVuc3ViKCk7XG4gICAgICAgIGlmIChjb21wb3NpdGUuZW1wdHkoKSkge1xuICAgICAgICAgIHJldHVybiBzaW5rKGVuZEV2ZW50KCkpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29tcG9zaXRlLmFkZChmdW5jdGlvbih1bnN1YkFsbCwgdW5zdWJNZSkge1xuICAgICAgICByZXR1cm4gc3JjLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGlmIChvbkhvbGQgJiYgZXZlbnQuaGFzVmFsdWUoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlcmVkVmFsdWVzLnB1c2goZXZlbnQudmFsdWUoKSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChldmVudC5pc0VuZCgpICYmIGJ1ZmZlcmVkVmFsdWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGVuZElmQm90aEVuZGVkKHVuc3ViTWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc2luayhldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgY29tcG9zaXRlLmFkZChmdW5jdGlvbih1bnN1YkFsbCwgdW5zdWJNZSkge1xuICAgICAgICByZXR1cm4gdmFsdmUuc3Vic2NyaWJlKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgdmFyIHRvU2VuZDtcbiAgICAgICAgICBpZiAoZXZlbnQuaGFzVmFsdWUoKSkge1xuICAgICAgICAgICAgb25Ib2xkID0gZXZlbnQudmFsdWUoKTtcbiAgICAgICAgICAgIGlmICghb25Ib2xkKSB7XG4gICAgICAgICAgICAgIHRvU2VuZCA9IGJ1ZmZlcmVkVmFsdWVzO1xuICAgICAgICAgICAgICBidWZmZXJlZFZhbHVlcyA9IFtdO1xuICAgICAgICAgICAgICByZXR1cm4gXy5lYWNoKHRvU2VuZCwgZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpbmsobmV4dEV2ZW50KHZhbHVlKSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGVuZElmQm90aEVuZGVkKHVuc3ViTWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc2luayhldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGNvbXBvc2l0ZS51bnN1YnNjcmliZTtcbiAgICB9KTtcbiAgfTtcblxuICBCYWNvbi5pbnRlcnZhbCA9IGZ1bmN0aW9uKGRlbGF5LCB2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICB2YWx1ZSA9IHt9O1xuICAgIH1cbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKEJhY29uLCBcImludGVydmFsXCIsIGRlbGF5LCB2YWx1ZSwgQmFjb24uZnJvbVBvbGwoZGVsYXksIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG5leHRFdmVudCh2YWx1ZSk7XG4gICAgfSkpO1xuICB9O1xuXG4gIEJhY29uLiQgPSB7fTtcblxuICBCYWNvbi4kLmFzRXZlbnRTdHJlYW0gPSBmdW5jdGlvbihldmVudE5hbWUsIHNlbGVjdG9yLCBldmVudFRyYW5zZm9ybWVyKSB7XG4gICAgdmFyIHJlZjtcbiAgICBpZiAoXy5pc0Z1bmN0aW9uKHNlbGVjdG9yKSkge1xuICAgICAgcmVmID0gW3NlbGVjdG9yLCB2b2lkIDBdLCBldmVudFRyYW5zZm9ybWVyID0gcmVmWzBdLCBzZWxlY3RvciA9IHJlZlsxXTtcbiAgICB9XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLnNlbGVjdG9yIHx8IHRoaXMsIFwiYXNFdmVudFN0cmVhbVwiLCBldmVudE5hbWUsIEJhY29uLmZyb21CaW5kZXIoKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgICBfdGhpcy5vbihldmVudE5hbWUsIHNlbGVjdG9yLCBoYW5kbGVyKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5vZmYoZXZlbnROYW1lLCBzZWxlY3RvciwgaGFuZGxlcik7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgIH0pKHRoaXMpLCBldmVudFRyYW5zZm9ybWVyKSk7XG4gIH07XG5cbiAgaWYgKChyZWYgPSB0eXBlb2YgalF1ZXJ5ICE9PSBcInVuZGVmaW5lZFwiICYmIGpRdWVyeSAhPT0gbnVsbCA/IGpRdWVyeSA6IHR5cGVvZiBaZXB0byAhPT0gXCJ1bmRlZmluZWRcIiAmJiBaZXB0byAhPT0gbnVsbCA/IFplcHRvIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgcmVmLmZuLmFzRXZlbnRTdHJlYW0gPSBCYWNvbi4kLmFzRXZlbnRTdHJlYW07XG4gIH1cblxuICBCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5sb2cgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncztcbiAgICBhcmdzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgdGhpcy5zdWJzY3JpYmUoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlICE9PSBudWxsID8gdHlwZW9mIGNvbnNvbGUubG9nID09PSBcImZ1bmN0aW9uXCIgPyBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBzbGljZS5jYWxsKGFyZ3MpLmNvbmNhdChbZXZlbnQubG9nKCldKSkgOiB2b2lkIDAgOiB2b2lkIDA7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLm1lcmdlID0gZnVuY3Rpb24ocmlnaHQpIHtcbiAgICB2YXIgbGVmdDtcbiAgICBhc3NlcnRFdmVudFN0cmVhbShyaWdodCk7XG4gICAgbGVmdCA9IHRoaXM7XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbihsZWZ0LCBcIm1lcmdlXCIsIHJpZ2h0LCBCYWNvbi5tZXJnZUFsbCh0aGlzLCByaWdodCkpO1xuICB9O1xuXG4gIEJhY29uLm1lcmdlQWxsID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmVhbXM7XG4gICAgc3RyZWFtcyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgIGlmIChpc0FycmF5KHN0cmVhbXNbMF0pKSB7XG4gICAgICBzdHJlYW1zID0gc3RyZWFtc1swXTtcbiAgICB9XG4gICAgaWYgKHN0cmVhbXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbmV3IEV2ZW50U3RyZWFtKGRlc2NyaWJlLmFwcGx5KG51bGwsIFtCYWNvbiwgXCJtZXJnZUFsbFwiXS5jb25jYXQoc2xpY2UuY2FsbChzdHJlYW1zKSkpLCBmdW5jdGlvbihzaW5rKSB7XG4gICAgICAgIHZhciBlbmRzLCBzaW5rcywgc21hcnRTaW5rO1xuICAgICAgICBlbmRzID0gMDtcbiAgICAgICAgc21hcnRTaW5rID0gZnVuY3Rpb24ob2JzKSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHVuc3ViQm90aCkge1xuICAgICAgICAgICAgcmV0dXJuIG9icy5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICB2YXIgcmVwbHk7XG4gICAgICAgICAgICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgICAgICAgICAgZW5kcysrO1xuICAgICAgICAgICAgICAgIGlmIChlbmRzID09PSBzdHJlYW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHNpbmsoZW5kRXZlbnQoKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBCYWNvbi5tb3JlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXBseSA9IHNpbmsoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgICAgICAgICB1bnN1YkJvdGgoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcGx5O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICBzaW5rcyA9IF8ubWFwKHNtYXJ0U2luaywgc3RyZWFtcyk7XG4gICAgICAgIHJldHVybiBuZXcgQmFjb24uQ29tcG9zaXRlVW5zdWJzY3JpYmUoc2lua3MpLnVuc3Vic2NyaWJlO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBCYWNvbi5uZXZlcigpO1xuICAgIH1cbiAgfTtcblxuICBCYWNvbi5yZXBlYXRlZGx5ID0gZnVuY3Rpb24oZGVsYXksIHZhbHVlcykge1xuICAgIHZhciBpbmRleDtcbiAgICBpbmRleCA9IDA7XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbihCYWNvbiwgXCJyZXBlYXRlZGx5XCIsIGRlbGF5LCB2YWx1ZXMsIEJhY29uLmZyb21Qb2xsKGRlbGF5LCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB2YWx1ZXNbaW5kZXgrKyAlIHZhbHVlcy5sZW5ndGhdO1xuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5yZXBlYXQgPSBmdW5jdGlvbihnZW5lcmF0b3IpIHtcbiAgICB2YXIgaW5kZXg7XG4gICAgaW5kZXggPSAwO1xuICAgIHJldHVybiBCYWNvbi5mcm9tQmluZGVyKGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgIHZhciBmbGFnLCBoYW5kbGVFdmVudCwgcmVwbHksIHN1YnNjcmliZU5leHQsIHVuc3ViO1xuICAgICAgZmxhZyA9IGZhbHNlO1xuICAgICAgcmVwbHkgPSBCYWNvbi5tb3JlO1xuICAgICAgdW5zdWIgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgaGFuZGxlRXZlbnQgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgIGlmICghZmxhZykge1xuICAgICAgICAgICAgcmV0dXJuIGZsYWcgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc3Vic2NyaWJlTmV4dCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gcmVwbHkgPSBzaW5rKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHN1YnNjcmliZU5leHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG5leHQ7XG4gICAgICAgIGZsYWcgPSB0cnVlO1xuICAgICAgICB3aGlsZSAoZmxhZyAmJiByZXBseSAhPT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgbmV4dCA9IGdlbmVyYXRvcihpbmRleCsrKTtcbiAgICAgICAgICBmbGFnID0gZmFsc2U7XG4gICAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICAgIHVuc3ViID0gbmV4dC5zdWJzY3JpYmVJbnRlcm5hbChoYW5kbGVFdmVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNpbmsoZW5kRXZlbnQoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmbGFnID0gdHJ1ZTtcbiAgICAgIH07XG4gICAgICBzdWJzY3JpYmVOZXh0KCk7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB1bnN1YigpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfTtcblxuICBCYWNvbi5yZXRyeSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICB2YXIgZGVsYXksIGVycm9yLCBmaW5pc2hlZCwgaXNSZXRyeWFibGUsIG1heFJldHJpZXMsIHJldHJpZXMsIHNvdXJjZTtcbiAgICBpZiAoIV8uaXNGdW5jdGlvbihvcHRpb25zLnNvdXJjZSkpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCInc291cmNlJyBvcHRpb24gaGFzIHRvIGJlIGEgZnVuY3Rpb25cIik7XG4gICAgfVxuICAgIHNvdXJjZSA9IG9wdGlvbnMuc291cmNlO1xuICAgIHJldHJpZXMgPSBvcHRpb25zLnJldHJpZXMgfHwgMDtcbiAgICBtYXhSZXRyaWVzID0gb3B0aW9ucy5tYXhSZXRyaWVzIHx8IHJldHJpZXM7XG4gICAgZGVsYXkgPSBvcHRpb25zLmRlbGF5IHx8IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfTtcbiAgICBpc1JldHJ5YWJsZSA9IG9wdGlvbnMuaXNSZXRyeWFibGUgfHwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIGZpbmlzaGVkID0gZmFsc2U7XG4gICAgZXJyb3IgPSBudWxsO1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24oQmFjb24sIFwicmV0cnlcIiwgb3B0aW9ucywgQmFjb24ucmVwZWF0KGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGNvbnRleHQsIHBhdXNlLCB2YWx1ZVN0cmVhbTtcbiAgICAgIGlmIChmaW5pc2hlZCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlU3RyZWFtID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHNvdXJjZSgpLmVuZE9uRXJyb3IoKS53aXRoSGFuZGxlcihmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmlzRXJyb3IoKSkge1xuICAgICAgICAgICAgICBlcnJvciA9IGV2ZW50O1xuICAgICAgICAgICAgICBpZiAoaXNSZXRyeWFibGUoZXJyb3IuZXJyb3IpICYmIHJldHJpZXMgPiAwKSB7XG5cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmaW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IgPSBudWxsO1xuICAgICAgICAgICAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgY29udGV4dCA9IHtcbiAgICAgICAgICAgIGVycm9yOiBlcnJvci5lcnJvcixcbiAgICAgICAgICAgIHJldHJpZXNEb25lOiBtYXhSZXRyaWVzIC0gcmV0cmllc1xuICAgICAgICAgIH07XG4gICAgICAgICAgcGF1c2UgPSBCYWNvbi5sYXRlcihkZWxheShjb250ZXh0KSkuZmlsdGVyKGZhbHNlKTtcbiAgICAgICAgICByZXRyaWVzID0gcmV0cmllcyAtIDE7XG4gICAgICAgICAgcmV0dXJuIHBhdXNlLmNvbmNhdChCYWNvbi5vbmNlKCkuZmxhdE1hcCh2YWx1ZVN0cmVhbSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB2YWx1ZVN0cmVhbSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSkpO1xuICB9O1xuXG4gIEJhY29uLnNlcXVlbnRpYWxseSA9IGZ1bmN0aW9uKGRlbGF5LCB2YWx1ZXMpIHtcbiAgICB2YXIgaW5kZXg7XG4gICAgaW5kZXggPSAwO1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24oQmFjb24sIFwic2VxdWVudGlhbGx5XCIsIGRlbGF5LCB2YWx1ZXMsIEJhY29uLmZyb21Qb2xsKGRlbGF5LCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB2YWx1ZTtcbiAgICAgIHZhbHVlID0gdmFsdWVzW2luZGV4KytdO1xuICAgICAgaWYgKGluZGV4IDwgdmFsdWVzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSB2YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBbdmFsdWUsIGVuZEV2ZW50KCldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGVuZEV2ZW50KCk7XG4gICAgICB9XG4gICAgfSkpO1xuICB9O1xuXG4gIEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLnNraXAgPSBmdW5jdGlvbihjb3VudCkge1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJza2lwXCIsIGNvdW50LCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBpZiAoIWV2ZW50Lmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICB9IGVsc2UgaWYgKGNvdW50ID4gMCkge1xuICAgICAgICBjb3VudC0tO1xuICAgICAgICByZXR1cm4gQmFjb24ubW9yZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS50YWtlID0gZnVuY3Rpb24oY291bnQpIHtcbiAgICBpZiAoY291bnQgPD0gMCkge1xuICAgICAgcmV0dXJuIEJhY29uLm5ldmVyKCk7XG4gICAgfVxuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJ0YWtlXCIsIGNvdW50LCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBpZiAoIWV2ZW50Lmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb3VudC0tO1xuICAgICAgICBpZiAoY291bnQgPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnB1c2goZW5kRXZlbnQoKSk7XG4gICAgICAgICAgcmV0dXJuIEJhY29uLm5vTW9yZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5FdmVudFN0cmVhbS5wcm90b3R5cGUuc2tpcFVudGlsID0gZnVuY3Rpb24oc3RhcnRlcikge1xuICAgIHZhciBzdGFydGVkO1xuICAgIHN0YXJ0ZWQgPSBzdGFydGVyLnRha2UoMSkubWFwKHRydWUpLnRvUHJvcGVydHkoZmFsc2UpO1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJza2lwVW50aWxcIiwgc3RhcnRlciwgdGhpcy5maWx0ZXIoc3RhcnRlZCkpO1xuICB9O1xuXG4gIEJhY29uLkV2ZW50U3RyZWFtLnByb3RvdHlwZS5za2lwV2hpbGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncywgZiwgb2s7XG4gICAgZiA9IGFyZ3VtZW50c1swXSwgYXJncyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgIGFzc2VydE9ic2VydmFibGVJc1Byb3BlcnR5KGYpO1xuICAgIG9rID0gZmFsc2U7XG4gICAgcmV0dXJuIGNvbnZlcnRBcmdzVG9GdW5jdGlvbih0aGlzLCBmLCBhcmdzLCBmdW5jdGlvbihmKSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwic2tpcFdoaWxlXCIsIGYsIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKG9rIHx8ICFldmVudC5oYXNWYWx1ZSgpIHx8ICFmKGV2ZW50LnZhbHVlKCkpKSB7XG4gICAgICAgICAgaWYgKGV2ZW50Lmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgICAgIG9rID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIEJhY29uLm1vcmU7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB9KTtcbiAgfTtcblxuICBCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5zbGlkaW5nV2luZG93ID0gZnVuY3Rpb24obiwgbWluVmFsdWVzKSB7XG4gICAgaWYgKG1pblZhbHVlcyA9PSBudWxsKSB7XG4gICAgICBtaW5WYWx1ZXMgPSAwO1xuICAgIH1cbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwic2xpZGluZ1dpbmRvd1wiLCBuLCBtaW5WYWx1ZXMsIHRoaXMuc2NhbihbXSwgKGZ1bmN0aW9uKHdpbmRvdywgdmFsdWUpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuY29uY2F0KFt2YWx1ZV0pLnNsaWNlKC1uKTtcbiAgICB9KSkuZmlsdGVyKChmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICAgIHJldHVybiB2YWx1ZXMubGVuZ3RoID49IG1pblZhbHVlcztcbiAgICB9KSkpO1xuICB9O1xuXG4gIEJhY29uLnNweSA9IGZ1bmN0aW9uKHNweSkge1xuICAgIHJldHVybiBzcHlzLnB1c2goc3B5KTtcbiAgfTtcblxuICBzcHlzID0gW107XG5cbiAgcmVnaXN0ZXJPYnMgPSBmdW5jdGlvbihvYnMpIHtcbiAgICB2YXIgaiwgbGVuMSwgc3B5O1xuICAgIGlmIChzcHlzLmxlbmd0aCkge1xuICAgICAgaWYgKCFyZWdpc3Rlck9icy5ydW5uaW5nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmVnaXN0ZXJPYnMucnVubmluZyA9IHRydWU7XG4gICAgICAgICAgZm9yIChqID0gMCwgbGVuMSA9IHNweXMubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICAgICAgICBzcHkgPSBzcHlzW2pdO1xuICAgICAgICAgICAgc3B5KG9icyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGRlbGV0ZSByZWdpc3Rlck9icy5ydW5uaW5nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2b2lkIDA7XG4gIH07XG5cbiAgQmFjb24uUHJvcGVydHkucHJvdG90eXBlLnN0YXJ0V2l0aCA9IGZ1bmN0aW9uKHNlZWQpIHtcbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwic3RhcnRXaXRoXCIsIHNlZWQsIHRoaXMuc2NhbihzZWVkLCBmdW5jdGlvbihwcmV2LCBuZXh0KSB7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9KSk7XG4gIH07XG5cbiAgQmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLnN0YXJ0V2l0aCA9IGZ1bmN0aW9uKHNlZWQpIHtcbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwic3RhcnRXaXRoXCIsIHNlZWQsIEJhY29uLm9uY2Uoc2VlZCkuY29uY2F0KHRoaXMpKTtcbiAgfTtcblxuICBCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS50YWtlV2hpbGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncywgZjtcbiAgICBmID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgYXNzZXJ0T2JzZXJ2YWJsZUlzUHJvcGVydHkoZik7XG4gICAgcmV0dXJuIGNvbnZlcnRBcmdzVG9GdW5jdGlvbih0aGlzLCBmLCBhcmdzLCBmdW5jdGlvbihmKSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwidGFrZVdoaWxlXCIsIGYsIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmZpbHRlcihmKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucHVzaChlbmRFdmVudCgpKTtcbiAgICAgICAgICByZXR1cm4gQmFjb24ubm9Nb3JlO1xuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQmFjb24udXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGksIGluaXRpYWwsIGxhdGVCaW5kRmlyc3QsIHBhdHRlcm5zO1xuICAgIGluaXRpYWwgPSBhcmd1bWVudHNbMF0sIHBhdHRlcm5zID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgbGF0ZUJpbmRGaXJzdCA9IGZ1bmN0aW9uKGYpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFyZ3M7XG4gICAgICAgIGFyZ3MgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgICByZXR1cm4gZi5hcHBseShudWxsLCBbaV0uY29uY2F0KGFyZ3MpKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgfTtcbiAgICBpID0gcGF0dGVybnMubGVuZ3RoIC0gMTtcbiAgICB3aGlsZSAoaSA+IDApIHtcbiAgICAgIGlmICghKHBhdHRlcm5zW2ldIGluc3RhbmNlb2YgRnVuY3Rpb24pKSB7XG4gICAgICAgIHBhdHRlcm5zW2ldID0gKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4geDtcbiAgICAgICAgICB9O1xuICAgICAgICB9KShwYXR0ZXJuc1tpXSk7XG4gICAgICB9XG4gICAgICBwYXR0ZXJuc1tpXSA9IGxhdGVCaW5kRmlyc3QocGF0dGVybnNbaV0pO1xuICAgICAgaSA9IGkgLSAyO1xuICAgIH1cbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uLmFwcGx5KG51bGwsIFtCYWNvbiwgXCJ1cGRhdGVcIiwgaW5pdGlhbF0uY29uY2F0KHNsaWNlLmNhbGwocGF0dGVybnMpLCBbQmFjb24ud2hlbi5hcHBseShCYWNvbiwgcGF0dGVybnMpLnNjYW4oaW5pdGlhbCwgKGZ1bmN0aW9uKHgsIGYpIHtcbiAgICAgIHJldHVybiBmKHgpO1xuICAgIH0pKV0pKTtcbiAgfTtcblxuICBCYWNvbi56aXBBc0FycmF5ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmVhbXM7XG4gICAgc3RyZWFtcyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgIGlmIChpc0FycmF5KHN0cmVhbXNbMF0pKSB7XG4gICAgICBzdHJlYW1zID0gc3RyZWFtc1swXTtcbiAgICB9XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbi5hcHBseShudWxsLCBbQmFjb24sIFwiemlwQXNBcnJheVwiXS5jb25jYXQoc2xpY2UuY2FsbChzdHJlYW1zKSwgW0JhY29uLnppcFdpdGgoc3RyZWFtcywgZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgeHM7XG4gICAgICB4cyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgICAgcmV0dXJuIHhzO1xuICAgIH0pXSkpO1xuICB9O1xuXG4gIEJhY29uLnppcFdpdGggPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZiwgcmVmMSwgc3RyZWFtcztcbiAgICBmID0gYXJndW1lbnRzWzBdLCBzdHJlYW1zID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgaWYgKCFfLmlzRnVuY3Rpb24oZikpIHtcbiAgICAgIHJlZjEgPSBbZiwgc3RyZWFtc1swXV0sIHN0cmVhbXMgPSByZWYxWzBdLCBmID0gcmVmMVsxXTtcbiAgICB9XG4gICAgc3RyZWFtcyA9IF8ubWFwKChmdW5jdGlvbihzKSB7XG4gICAgICByZXR1cm4gcy50b0V2ZW50U3RyZWFtKCk7XG4gICAgfSksIHN0cmVhbXMpO1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24uYXBwbHkobnVsbCwgW0JhY29uLCBcInppcFdpdGhcIiwgZl0uY29uY2F0KHNsaWNlLmNhbGwoc3RyZWFtcyksIFtCYWNvbi53aGVuKHN0cmVhbXMsIGYpXSkpO1xuICB9O1xuXG4gIEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLnppcCA9IGZ1bmN0aW9uKG90aGVyLCBmKSB7XG4gICAgaWYgKGYgPT0gbnVsbCkge1xuICAgICAgZiA9IEFycmF5O1xuICAgIH1cbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiemlwXCIsIG90aGVyLCBCYWNvbi56aXBXaXRoKFt0aGlzLCBvdGhlcl0sIGYpKTtcbiAgfTtcblxuICBcblxuQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuZmlyc3QgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJmaXJzdFwiLCB0aGlzLnRha2UoMSkpO1xufTtcblxuQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUubGFzdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGxhc3RFdmVudDtcblxuICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwibGFzdFwiLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICBpZiAobGFzdEV2ZW50KSB7XG4gICAgICAgIHRoaXMucHVzaChsYXN0RXZlbnQpO1xuICAgICAgfVxuICAgICAgdGhpcy5wdXNoKGVuZEV2ZW50KCkpO1xuICAgICAgcmV0dXJuIEJhY29uLm5vTW9yZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGFzdEV2ZW50ID0gZXZlbnQ7XG4gICAgfVxuICB9KSk7XG59O1xuXG5CYWNvbi5FdmVudFN0cmVhbS5wcm90b3R5cGUudGhyb3R0bGUgPSBmdW5jdGlvbiAoZGVsYXkpIHtcbiAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcInRocm90dGxlXCIsIGRlbGF5LCB0aGlzLmJ1ZmZlcldpdGhUaW1lKGRlbGF5KS5tYXAoZnVuY3Rpb24gKHZhbHVlcykge1xuICAgIHJldHVybiB2YWx1ZXNbdmFsdWVzLmxlbmd0aCAtIDFdO1xuICB9KSk7XG59O1xuXG5CYWNvbi5Qcm9wZXJ0eS5wcm90b3R5cGUudGhyb3R0bGUgPSBmdW5jdGlvbiAoZGVsYXkpIHtcbiAgcmV0dXJuIHRoaXMuZGVsYXlDaGFuZ2VzKFwidGhyb3R0bGVcIiwgZGVsYXksIGZ1bmN0aW9uIChjaGFuZ2VzKSB7XG4gICAgcmV0dXJuIGNoYW5nZXMudGhyb3R0bGUoZGVsYXkpO1xuICB9KTtcbn07XG5cbk9ic2VydmFibGUucHJvdG90eXBlLmZpcnN0VG9Qcm9taXNlID0gZnVuY3Rpb24gKFByb21pc2VDdHIpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICBpZiAodHlwZW9mIFByb21pc2VDdHIgIT09IFwiZnVuY3Rpb25cIikge1xuICAgIGlmICh0eXBlb2YgUHJvbWlzZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBQcm9taXNlQ3RyID0gUHJvbWlzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIlRoZXJlIGlzbid0IGRlZmF1bHQgUHJvbWlzZSwgdXNlIHNoaW0gb3IgcGFyYW1ldGVyXCIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgUHJvbWlzZUN0cihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgcmV0dXJuIF90aGlzLnN1YnNjcmliZShmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgIHJlc29sdmUoZXZlbnQudmFsdWUoKSk7XG4gICAgICB9XG4gICAgICBpZiAoZXZlbnQuaXNFcnJvcigpKSB7XG4gICAgICAgIHJlamVjdChldmVudC5lcnJvcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBCYWNvbi5ub01vcmU7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuT2JzZXJ2YWJsZS5wcm90b3R5cGUudG9Qcm9taXNlID0gZnVuY3Rpb24gKFByb21pc2VDdHIpIHtcbiAgcmV0dXJuIHRoaXMubGFzdCgpLmZpcnN0VG9Qcm9taXNlKFByb21pc2VDdHIpO1xufTtcblxuaWYgKCh0eXBlb2YgZGVmaW5lICE9PSBcInVuZGVmaW5lZFwiICYmIGRlZmluZSAhPT0gbnVsbCkgJiYgKGRlZmluZS5hbWQgIT0gbnVsbCkpIHtcbiAgICBkZWZpbmUoW10sIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIEJhY29uO1xuICAgIH0pO1xuICAgIHRoaXMuQmFjb24gPSBCYWNvbjtcbiAgfSBlbHNlIGlmICgodHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUgIT09IG51bGwpICYmIChtb2R1bGUuZXhwb3J0cyAhPSBudWxsKSkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gQmFjb247XG4gICAgQmFjb24uQmFjb24gPSBCYWNvbjtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLkJhY29uID0gQmFjb247XG4gIH1cblxufSkuY2FsbCh0aGlzKTtcbiIsIi8qISBodHRwOi8vbXRocy5iZS9wdW55Y29kZSB2MS4yLjQgYnkgQG1hdGhpYXMgKi9cbjsoZnVuY3Rpb24ocm9vdCkge1xuXG5cdC8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZXMgKi9cblx0dmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cztcblx0dmFyIGZyZWVNb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJlxuXHRcdG1vZHVsZS5leHBvcnRzID09IGZyZWVFeHBvcnRzICYmIG1vZHVsZTtcblx0dmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbDtcblx0aWYgKGZyZWVHbG9iYWwuZ2xvYmFsID09PSBmcmVlR2xvYmFsIHx8IGZyZWVHbG9iYWwud2luZG93ID09PSBmcmVlR2xvYmFsKSB7XG5cdFx0cm9vdCA9IGZyZWVHbG9iYWw7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGBwdW55Y29kZWAgb2JqZWN0LlxuXHQgKiBAbmFtZSBwdW55Y29kZVxuXHQgKiBAdHlwZSBPYmplY3Rcblx0ICovXG5cdHZhciBwdW55Y29kZSxcblxuXHQvKiogSGlnaGVzdCBwb3NpdGl2ZSBzaWduZWQgMzItYml0IGZsb2F0IHZhbHVlICovXG5cdG1heEludCA9IDIxNDc0ODM2NDcsIC8vIGFrYS4gMHg3RkZGRkZGRiBvciAyXjMxLTFcblxuXHQvKiogQm9vdHN0cmluZyBwYXJhbWV0ZXJzICovXG5cdGJhc2UgPSAzNixcblx0dE1pbiA9IDEsXG5cdHRNYXggPSAyNixcblx0c2tldyA9IDM4LFxuXHRkYW1wID0gNzAwLFxuXHRpbml0aWFsQmlhcyA9IDcyLFxuXHRpbml0aWFsTiA9IDEyOCwgLy8gMHg4MFxuXHRkZWxpbWl0ZXIgPSAnLScsIC8vICdcXHgyRCdcblxuXHQvKiogUmVndWxhciBleHByZXNzaW9ucyAqL1xuXHRyZWdleFB1bnljb2RlID0gL154bi0tLyxcblx0cmVnZXhOb25BU0NJSSA9IC9bXiAtfl0vLCAvLyB1bnByaW50YWJsZSBBU0NJSSBjaGFycyArIG5vbi1BU0NJSSBjaGFyc1xuXHRyZWdleFNlcGFyYXRvcnMgPSAvXFx4MkV8XFx1MzAwMnxcXHVGRjBFfFxcdUZGNjEvZywgLy8gUkZDIDM0OTAgc2VwYXJhdG9yc1xuXG5cdC8qKiBFcnJvciBtZXNzYWdlcyAqL1xuXHRlcnJvcnMgPSB7XG5cdFx0J292ZXJmbG93JzogJ092ZXJmbG93OiBpbnB1dCBuZWVkcyB3aWRlciBpbnRlZ2VycyB0byBwcm9jZXNzJyxcblx0XHQnbm90LWJhc2ljJzogJ0lsbGVnYWwgaW5wdXQgPj0gMHg4MCAobm90IGEgYmFzaWMgY29kZSBwb2ludCknLFxuXHRcdCdpbnZhbGlkLWlucHV0JzogJ0ludmFsaWQgaW5wdXQnXG5cdH0sXG5cblx0LyoqIENvbnZlbmllbmNlIHNob3J0Y3V0cyAqL1xuXHRiYXNlTWludXNUTWluID0gYmFzZSAtIHRNaW4sXG5cdGZsb29yID0gTWF0aC5mbG9vcixcblx0c3RyaW5nRnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZSxcblxuXHQvKiogVGVtcG9yYXJ5IHZhcmlhYmxlICovXG5cdGtleTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICogQSBnZW5lcmljIGVycm9yIHV0aWxpdHkgZnVuY3Rpb24uXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIFRoZSBlcnJvciB0eXBlLlxuXHQgKiBAcmV0dXJucyB7RXJyb3J9IFRocm93cyBhIGBSYW5nZUVycm9yYCB3aXRoIHRoZSBhcHBsaWNhYmxlIGVycm9yIG1lc3NhZ2UuXG5cdCAqL1xuXHRmdW5jdGlvbiBlcnJvcih0eXBlKSB7XG5cdFx0dGhyb3cgUmFuZ2VFcnJvcihlcnJvcnNbdHlwZV0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgZ2VuZXJpYyBgQXJyYXkjbWFwYCB1dGlsaXR5IGZ1bmN0aW9uLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBmb3IgZXZlcnkgYXJyYXlcblx0ICogaXRlbS5cblx0ICogQHJldHVybnMge0FycmF5fSBBIG5ldyBhcnJheSBvZiB2YWx1ZXMgcmV0dXJuZWQgYnkgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuXHQgKi9cblx0ZnVuY3Rpb24gbWFwKGFycmF5LCBmbikge1xuXHRcdHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cdFx0d2hpbGUgKGxlbmd0aC0tKSB7XG5cdFx0XHRhcnJheVtsZW5ndGhdID0gZm4oYXJyYXlbbGVuZ3RoXSk7XG5cdFx0fVxuXHRcdHJldHVybiBhcnJheTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIHNpbXBsZSBgQXJyYXkjbWFwYC1saWtlIHdyYXBwZXIgdG8gd29yayB3aXRoIGRvbWFpbiBuYW1lIHN0cmluZ3MuXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBkb21haW4gVGhlIGRvbWFpbiBuYW1lLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBmb3IgZXZlcnlcblx0ICogY2hhcmFjdGVyLlxuXHQgKiBAcmV0dXJucyB7QXJyYXl9IEEgbmV3IHN0cmluZyBvZiBjaGFyYWN0ZXJzIHJldHVybmVkIGJ5IHRoZSBjYWxsYmFja1xuXHQgKiBmdW5jdGlvbi5cblx0ICovXG5cdGZ1bmN0aW9uIG1hcERvbWFpbihzdHJpbmcsIGZuKSB7XG5cdFx0cmV0dXJuIG1hcChzdHJpbmcuc3BsaXQocmVnZXhTZXBhcmF0b3JzKSwgZm4pLmpvaW4oJy4nKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIG51bWVyaWMgY29kZSBwb2ludHMgb2YgZWFjaCBVbmljb2RlXG5cdCAqIGNoYXJhY3RlciBpbiB0aGUgc3RyaW5nLiBXaGlsZSBKYXZhU2NyaXB0IHVzZXMgVUNTLTIgaW50ZXJuYWxseSxcblx0ICogdGhpcyBmdW5jdGlvbiB3aWxsIGNvbnZlcnQgYSBwYWlyIG9mIHN1cnJvZ2F0ZSBoYWx2ZXMgKGVhY2ggb2Ygd2hpY2hcblx0ICogVUNTLTIgZXhwb3NlcyBhcyBzZXBhcmF0ZSBjaGFyYWN0ZXJzKSBpbnRvIGEgc2luZ2xlIGNvZGUgcG9pbnQsXG5cdCAqIG1hdGNoaW5nIFVURi0xNi5cblx0ICogQHNlZSBgcHVueWNvZGUudWNzMi5lbmNvZGVgXG5cdCAqIEBzZWUgPGh0dHA6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmc+XG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZS51Y3MyXG5cdCAqIEBuYW1lIGRlY29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBVbmljb2RlIGlucHV0IHN0cmluZyAoVUNTLTIpLlxuXHQgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBuZXcgYXJyYXkgb2YgY29kZSBwb2ludHMuXG5cdCAqL1xuXHRmdW5jdGlvbiB1Y3MyZGVjb2RlKHN0cmluZykge1xuXHRcdHZhciBvdXRwdXQgPSBbXSxcblx0XHQgICAgY291bnRlciA9IDAsXG5cdFx0ICAgIGxlbmd0aCA9IHN0cmluZy5sZW5ndGgsXG5cdFx0ICAgIHZhbHVlLFxuXHRcdCAgICBleHRyYTtcblx0XHR3aGlsZSAoY291bnRlciA8IGxlbmd0aCkge1xuXHRcdFx0dmFsdWUgPSBzdHJpbmcuY2hhckNvZGVBdChjb3VudGVyKyspO1xuXHRcdFx0aWYgKHZhbHVlID49IDB4RDgwMCAmJiB2YWx1ZSA8PSAweERCRkYgJiYgY291bnRlciA8IGxlbmd0aCkge1xuXHRcdFx0XHQvLyBoaWdoIHN1cnJvZ2F0ZSwgYW5kIHRoZXJlIGlzIGEgbmV4dCBjaGFyYWN0ZXJcblx0XHRcdFx0ZXh0cmEgPSBzdHJpbmcuY2hhckNvZGVBdChjb3VudGVyKyspO1xuXHRcdFx0XHRpZiAoKGV4dHJhICYgMHhGQzAwKSA9PSAweERDMDApIHsgLy8gbG93IHN1cnJvZ2F0ZVxuXHRcdFx0XHRcdG91dHB1dC5wdXNoKCgodmFsdWUgJiAweDNGRikgPDwgMTApICsgKGV4dHJhICYgMHgzRkYpICsgMHgxMDAwMCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gdW5tYXRjaGVkIHN1cnJvZ2F0ZTsgb25seSBhcHBlbmQgdGhpcyBjb2RlIHVuaXQsIGluIGNhc2UgdGhlIG5leHRcblx0XHRcdFx0XHQvLyBjb2RlIHVuaXQgaXMgdGhlIGhpZ2ggc3Vycm9nYXRlIG9mIGEgc3Vycm9nYXRlIHBhaXJcblx0XHRcdFx0XHRvdXRwdXQucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdFx0Y291bnRlci0tO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRvdXRwdXQucHVzaCh2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIHN0cmluZyBiYXNlZCBvbiBhbiBhcnJheSBvZiBudW1lcmljIGNvZGUgcG9pbnRzLlxuXHQgKiBAc2VlIGBwdW55Y29kZS51Y3MyLmRlY29kZWBcblx0ICogQG1lbWJlck9mIHB1bnljb2RlLnVjczJcblx0ICogQG5hbWUgZW5jb2RlXG5cdCAqIEBwYXJhbSB7QXJyYXl9IGNvZGVQb2ludHMgVGhlIGFycmF5IG9mIG51bWVyaWMgY29kZSBwb2ludHMuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBuZXcgVW5pY29kZSBzdHJpbmcgKFVDUy0yKS5cblx0ICovXG5cdGZ1bmN0aW9uIHVjczJlbmNvZGUoYXJyYXkpIHtcblx0XHRyZXR1cm4gbWFwKGFycmF5LCBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdFx0aWYgKHZhbHVlID4gMHhGRkZGKSB7XG5cdFx0XHRcdHZhbHVlIC09IDB4MTAwMDA7XG5cdFx0XHRcdG91dHB1dCArPSBzdHJpbmdGcm9tQ2hhckNvZGUodmFsdWUgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApO1xuXHRcdFx0XHR2YWx1ZSA9IDB4REMwMCB8IHZhbHVlICYgMHgzRkY7XG5cdFx0XHR9XG5cdFx0XHRvdXRwdXQgKz0gc3RyaW5nRnJvbUNoYXJDb2RlKHZhbHVlKTtcblx0XHRcdHJldHVybiBvdXRwdXQ7XG5cdFx0fSkuam9pbignJyk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBiYXNpYyBjb2RlIHBvaW50IGludG8gYSBkaWdpdC9pbnRlZ2VyLlxuXHQgKiBAc2VlIGBkaWdpdFRvQmFzaWMoKWBcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGNvZGVQb2ludCBUaGUgYmFzaWMgbnVtZXJpYyBjb2RlIHBvaW50IHZhbHVlLlxuXHQgKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgbnVtZXJpYyB2YWx1ZSBvZiBhIGJhc2ljIGNvZGUgcG9pbnQgKGZvciB1c2UgaW5cblx0ICogcmVwcmVzZW50aW5nIGludGVnZXJzKSBpbiB0aGUgcmFuZ2UgYDBgIHRvIGBiYXNlIC0gMWAsIG9yIGBiYXNlYCBpZlxuXHQgKiB0aGUgY29kZSBwb2ludCBkb2VzIG5vdCByZXByZXNlbnQgYSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGJhc2ljVG9EaWdpdChjb2RlUG9pbnQpIHtcblx0XHRpZiAoY29kZVBvaW50IC0gNDggPCAxMCkge1xuXHRcdFx0cmV0dXJuIGNvZGVQb2ludCAtIDIyO1xuXHRcdH1cblx0XHRpZiAoY29kZVBvaW50IC0gNjUgPCAyNikge1xuXHRcdFx0cmV0dXJuIGNvZGVQb2ludCAtIDY1O1xuXHRcdH1cblx0XHRpZiAoY29kZVBvaW50IC0gOTcgPCAyNikge1xuXHRcdFx0cmV0dXJuIGNvZGVQb2ludCAtIDk3O1xuXHRcdH1cblx0XHRyZXR1cm4gYmFzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIGRpZ2l0L2ludGVnZXIgaW50byBhIGJhc2ljIGNvZGUgcG9pbnQuXG5cdCAqIEBzZWUgYGJhc2ljVG9EaWdpdCgpYFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge051bWJlcn0gZGlnaXQgVGhlIG51bWVyaWMgdmFsdWUgb2YgYSBiYXNpYyBjb2RlIHBvaW50LlxuXHQgKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgYmFzaWMgY29kZSBwb2ludCB3aG9zZSB2YWx1ZSAod2hlbiB1c2VkIGZvclxuXHQgKiByZXByZXNlbnRpbmcgaW50ZWdlcnMpIGlzIGBkaWdpdGAsIHdoaWNoIG5lZWRzIHRvIGJlIGluIHRoZSByYW5nZVxuXHQgKiBgMGAgdG8gYGJhc2UgLSAxYC4gSWYgYGZsYWdgIGlzIG5vbi16ZXJvLCB0aGUgdXBwZXJjYXNlIGZvcm0gaXNcblx0ICogdXNlZDsgZWxzZSwgdGhlIGxvd2VyY2FzZSBmb3JtIGlzIHVzZWQuIFRoZSBiZWhhdmlvciBpcyB1bmRlZmluZWRcblx0ICogaWYgYGZsYWdgIGlzIG5vbi16ZXJvIGFuZCBgZGlnaXRgIGhhcyBubyB1cHBlcmNhc2UgZm9ybS5cblx0ICovXG5cdGZ1bmN0aW9uIGRpZ2l0VG9CYXNpYyhkaWdpdCwgZmxhZykge1xuXHRcdC8vICAwLi4yNSBtYXAgdG8gQVNDSUkgYS4ueiBvciBBLi5aXG5cdFx0Ly8gMjYuLjM1IG1hcCB0byBBU0NJSSAwLi45XG5cdFx0cmV0dXJuIGRpZ2l0ICsgMjIgKyA3NSAqIChkaWdpdCA8IDI2KSAtICgoZmxhZyAhPSAwKSA8PCA1KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBCaWFzIGFkYXB0YXRpb24gZnVuY3Rpb24gYXMgcGVyIHNlY3Rpb24gMy40IG9mIFJGQyAzNDkyLlxuXHQgKiBodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzNDkyI3NlY3Rpb24tMy40XG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRmdW5jdGlvbiBhZGFwdChkZWx0YSwgbnVtUG9pbnRzLCBmaXJzdFRpbWUpIHtcblx0XHR2YXIgayA9IDA7XG5cdFx0ZGVsdGEgPSBmaXJzdFRpbWUgPyBmbG9vcihkZWx0YSAvIGRhbXApIDogZGVsdGEgPj4gMTtcblx0XHRkZWx0YSArPSBmbG9vcihkZWx0YSAvIG51bVBvaW50cyk7XG5cdFx0Zm9yICgvKiBubyBpbml0aWFsaXphdGlvbiAqLzsgZGVsdGEgPiBiYXNlTWludXNUTWluICogdE1heCA+PiAxOyBrICs9IGJhc2UpIHtcblx0XHRcdGRlbHRhID0gZmxvb3IoZGVsdGEgLyBiYXNlTWludXNUTWluKTtcblx0XHR9XG5cdFx0cmV0dXJuIGZsb29yKGsgKyAoYmFzZU1pbnVzVE1pbiArIDEpICogZGVsdGEgLyAoZGVsdGEgKyBza2V3KSk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzIHRvIGEgc3RyaW5nIG9mIFVuaWNvZGVcblx0ICogc3ltYm9scy5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIHJlc3VsdGluZyBzdHJpbmcgb2YgVW5pY29kZSBzeW1ib2xzLlxuXHQgKi9cblx0ZnVuY3Rpb24gZGVjb2RlKGlucHV0KSB7XG5cdFx0Ly8gRG9uJ3QgdXNlIFVDUy0yXG5cdFx0dmFyIG91dHB1dCA9IFtdLFxuXHRcdCAgICBpbnB1dExlbmd0aCA9IGlucHV0Lmxlbmd0aCxcblx0XHQgICAgb3V0LFxuXHRcdCAgICBpID0gMCxcblx0XHQgICAgbiA9IGluaXRpYWxOLFxuXHRcdCAgICBiaWFzID0gaW5pdGlhbEJpYXMsXG5cdFx0ICAgIGJhc2ljLFxuXHRcdCAgICBqLFxuXHRcdCAgICBpbmRleCxcblx0XHQgICAgb2xkaSxcblx0XHQgICAgdyxcblx0XHQgICAgayxcblx0XHQgICAgZGlnaXQsXG5cdFx0ICAgIHQsXG5cdFx0ICAgIC8qKiBDYWNoZWQgY2FsY3VsYXRpb24gcmVzdWx0cyAqL1xuXHRcdCAgICBiYXNlTWludXNUO1xuXG5cdFx0Ly8gSGFuZGxlIHRoZSBiYXNpYyBjb2RlIHBvaW50czogbGV0IGBiYXNpY2AgYmUgdGhlIG51bWJlciBvZiBpbnB1dCBjb2RlXG5cdFx0Ly8gcG9pbnRzIGJlZm9yZSB0aGUgbGFzdCBkZWxpbWl0ZXIsIG9yIGAwYCBpZiB0aGVyZSBpcyBub25lLCB0aGVuIGNvcHlcblx0XHQvLyB0aGUgZmlyc3QgYmFzaWMgY29kZSBwb2ludHMgdG8gdGhlIG91dHB1dC5cblxuXHRcdGJhc2ljID0gaW5wdXQubGFzdEluZGV4T2YoZGVsaW1pdGVyKTtcblx0XHRpZiAoYmFzaWMgPCAwKSB7XG5cdFx0XHRiYXNpYyA9IDA7XG5cdFx0fVxuXG5cdFx0Zm9yIChqID0gMDsgaiA8IGJhc2ljOyArK2opIHtcblx0XHRcdC8vIGlmIGl0J3Mgbm90IGEgYmFzaWMgY29kZSBwb2ludFxuXHRcdFx0aWYgKGlucHV0LmNoYXJDb2RlQXQoaikgPj0gMHg4MCkge1xuXHRcdFx0XHRlcnJvcignbm90LWJhc2ljJyk7XG5cdFx0XHR9XG5cdFx0XHRvdXRwdXQucHVzaChpbnB1dC5jaGFyQ29kZUF0KGopKTtcblx0XHR9XG5cblx0XHQvLyBNYWluIGRlY29kaW5nIGxvb3A6IHN0YXJ0IGp1c3QgYWZ0ZXIgdGhlIGxhc3QgZGVsaW1pdGVyIGlmIGFueSBiYXNpYyBjb2RlXG5cdFx0Ly8gcG9pbnRzIHdlcmUgY29waWVkOyBzdGFydCBhdCB0aGUgYmVnaW5uaW5nIG90aGVyd2lzZS5cblxuXHRcdGZvciAoaW5kZXggPSBiYXNpYyA+IDAgPyBiYXNpYyArIDEgOiAwOyBpbmRleCA8IGlucHV0TGVuZ3RoOyAvKiBubyBmaW5hbCBleHByZXNzaW9uICovKSB7XG5cblx0XHRcdC8vIGBpbmRleGAgaXMgdGhlIGluZGV4IG9mIHRoZSBuZXh0IGNoYXJhY3RlciB0byBiZSBjb25zdW1lZC5cblx0XHRcdC8vIERlY29kZSBhIGdlbmVyYWxpemVkIHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyIGludG8gYGRlbHRhYCxcblx0XHRcdC8vIHdoaWNoIGdldHMgYWRkZWQgdG8gYGlgLiBUaGUgb3ZlcmZsb3cgY2hlY2tpbmcgaXMgZWFzaWVyXG5cdFx0XHQvLyBpZiB3ZSBpbmNyZWFzZSBgaWAgYXMgd2UgZ28sIHRoZW4gc3VidHJhY3Qgb2ZmIGl0cyBzdGFydGluZ1xuXHRcdFx0Ly8gdmFsdWUgYXQgdGhlIGVuZCB0byBvYnRhaW4gYGRlbHRhYC5cblx0XHRcdGZvciAob2xkaSA9IGksIHcgPSAxLCBrID0gYmFzZTsgLyogbm8gY29uZGl0aW9uICovOyBrICs9IGJhc2UpIHtcblxuXHRcdFx0XHRpZiAoaW5kZXggPj0gaW5wdXRMZW5ndGgpIHtcblx0XHRcdFx0XHRlcnJvcignaW52YWxpZC1pbnB1dCcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZGlnaXQgPSBiYXNpY1RvRGlnaXQoaW5wdXQuY2hhckNvZGVBdChpbmRleCsrKSk7XG5cblx0XHRcdFx0aWYgKGRpZ2l0ID49IGJhc2UgfHwgZGlnaXQgPiBmbG9vcigobWF4SW50IC0gaSkgLyB3KSkge1xuXHRcdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aSArPSBkaWdpdCAqIHc7XG5cdFx0XHRcdHQgPSBrIDw9IGJpYXMgPyB0TWluIDogKGsgPj0gYmlhcyArIHRNYXggPyB0TWF4IDogayAtIGJpYXMpO1xuXG5cdFx0XHRcdGlmIChkaWdpdCA8IHQpIHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGJhc2VNaW51c1QgPSBiYXNlIC0gdDtcblx0XHRcdFx0aWYgKHcgPiBmbG9vcihtYXhJbnQgLyBiYXNlTWludXNUKSkge1xuXHRcdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dyAqPSBiYXNlTWludXNUO1xuXG5cdFx0XHR9XG5cblx0XHRcdG91dCA9IG91dHB1dC5sZW5ndGggKyAxO1xuXHRcdFx0YmlhcyA9IGFkYXB0KGkgLSBvbGRpLCBvdXQsIG9sZGkgPT0gMCk7XG5cblx0XHRcdC8vIGBpYCB3YXMgc3VwcG9zZWQgdG8gd3JhcCBhcm91bmQgZnJvbSBgb3V0YCB0byBgMGAsXG5cdFx0XHQvLyBpbmNyZW1lbnRpbmcgYG5gIGVhY2ggdGltZSwgc28gd2UnbGwgZml4IHRoYXQgbm93OlxuXHRcdFx0aWYgKGZsb29yKGkgLyBvdXQpID4gbWF4SW50IC0gbikge1xuXHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdH1cblxuXHRcdFx0biArPSBmbG9vcihpIC8gb3V0KTtcblx0XHRcdGkgJT0gb3V0O1xuXG5cdFx0XHQvLyBJbnNlcnQgYG5gIGF0IHBvc2l0aW9uIGBpYCBvZiB0aGUgb3V0cHV0XG5cdFx0XHRvdXRwdXQuc3BsaWNlKGkrKywgMCwgbik7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdWNzMmVuY29kZShvdXRwdXQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scyB0byBhIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5XG5cdCAqIHN5bWJvbHMuXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIHN0cmluZyBvZiBVbmljb2RlIHN5bWJvbHMuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSByZXN1bHRpbmcgUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scy5cblx0ICovXG5cdGZ1bmN0aW9uIGVuY29kZShpbnB1dCkge1xuXHRcdHZhciBuLFxuXHRcdCAgICBkZWx0YSxcblx0XHQgICAgaGFuZGxlZENQQ291bnQsXG5cdFx0ICAgIGJhc2ljTGVuZ3RoLFxuXHRcdCAgICBiaWFzLFxuXHRcdCAgICBqLFxuXHRcdCAgICBtLFxuXHRcdCAgICBxLFxuXHRcdCAgICBrLFxuXHRcdCAgICB0LFxuXHRcdCAgICBjdXJyZW50VmFsdWUsXG5cdFx0ICAgIG91dHB1dCA9IFtdLFxuXHRcdCAgICAvKiogYGlucHV0TGVuZ3RoYCB3aWxsIGhvbGQgdGhlIG51bWJlciBvZiBjb2RlIHBvaW50cyBpbiBgaW5wdXRgLiAqL1xuXHRcdCAgICBpbnB1dExlbmd0aCxcblx0XHQgICAgLyoqIENhY2hlZCBjYWxjdWxhdGlvbiByZXN1bHRzICovXG5cdFx0ICAgIGhhbmRsZWRDUENvdW50UGx1c09uZSxcblx0XHQgICAgYmFzZU1pbnVzVCxcblx0XHQgICAgcU1pbnVzVDtcblxuXHRcdC8vIENvbnZlcnQgdGhlIGlucHV0IGluIFVDUy0yIHRvIFVuaWNvZGVcblx0XHRpbnB1dCA9IHVjczJkZWNvZGUoaW5wdXQpO1xuXG5cdFx0Ly8gQ2FjaGUgdGhlIGxlbmd0aFxuXHRcdGlucHV0TGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSB0aGUgc3RhdGVcblx0XHRuID0gaW5pdGlhbE47XG5cdFx0ZGVsdGEgPSAwO1xuXHRcdGJpYXMgPSBpbml0aWFsQmlhcztcblxuXHRcdC8vIEhhbmRsZSB0aGUgYmFzaWMgY29kZSBwb2ludHNcblx0XHRmb3IgKGogPSAwOyBqIDwgaW5wdXRMZW5ndGg7ICsraikge1xuXHRcdFx0Y3VycmVudFZhbHVlID0gaW5wdXRbal07XG5cdFx0XHRpZiAoY3VycmVudFZhbHVlIDwgMHg4MCkge1xuXHRcdFx0XHRvdXRwdXQucHVzaChzdHJpbmdGcm9tQ2hhckNvZGUoY3VycmVudFZhbHVlKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aGFuZGxlZENQQ291bnQgPSBiYXNpY0xlbmd0aCA9IG91dHB1dC5sZW5ndGg7XG5cblx0XHQvLyBgaGFuZGxlZENQQ291bnRgIGlzIHRoZSBudW1iZXIgb2YgY29kZSBwb2ludHMgdGhhdCBoYXZlIGJlZW4gaGFuZGxlZDtcblx0XHQvLyBgYmFzaWNMZW5ndGhgIGlzIHRoZSBudW1iZXIgb2YgYmFzaWMgY29kZSBwb2ludHMuXG5cblx0XHQvLyBGaW5pc2ggdGhlIGJhc2ljIHN0cmluZyAtIGlmIGl0IGlzIG5vdCBlbXB0eSAtIHdpdGggYSBkZWxpbWl0ZXJcblx0XHRpZiAoYmFzaWNMZW5ndGgpIHtcblx0XHRcdG91dHB1dC5wdXNoKGRlbGltaXRlcik7XG5cdFx0fVxuXG5cdFx0Ly8gTWFpbiBlbmNvZGluZyBsb29wOlxuXHRcdHdoaWxlIChoYW5kbGVkQ1BDb3VudCA8IGlucHV0TGVuZ3RoKSB7XG5cblx0XHRcdC8vIEFsbCBub24tYmFzaWMgY29kZSBwb2ludHMgPCBuIGhhdmUgYmVlbiBoYW5kbGVkIGFscmVhZHkuIEZpbmQgdGhlIG5leHRcblx0XHRcdC8vIGxhcmdlciBvbmU6XG5cdFx0XHRmb3IgKG0gPSBtYXhJbnQsIGogPSAwOyBqIDwgaW5wdXRMZW5ndGg7ICsraikge1xuXHRcdFx0XHRjdXJyZW50VmFsdWUgPSBpbnB1dFtqXTtcblx0XHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA+PSBuICYmIGN1cnJlbnRWYWx1ZSA8IG0pIHtcblx0XHRcdFx0XHRtID0gY3VycmVudFZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEluY3JlYXNlIGBkZWx0YWAgZW5vdWdoIHRvIGFkdmFuY2UgdGhlIGRlY29kZXIncyA8bixpPiBzdGF0ZSB0byA8bSwwPixcblx0XHRcdC8vIGJ1dCBndWFyZCBhZ2FpbnN0IG92ZXJmbG93XG5cdFx0XHRoYW5kbGVkQ1BDb3VudFBsdXNPbmUgPSBoYW5kbGVkQ1BDb3VudCArIDE7XG5cdFx0XHRpZiAobSAtIG4gPiBmbG9vcigobWF4SW50IC0gZGVsdGEpIC8gaGFuZGxlZENQQ291bnRQbHVzT25lKSkge1xuXHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdH1cblxuXHRcdFx0ZGVsdGEgKz0gKG0gLSBuKSAqIGhhbmRsZWRDUENvdW50UGx1c09uZTtcblx0XHRcdG4gPSBtO1xuXG5cdFx0XHRmb3IgKGogPSAwOyBqIDwgaW5wdXRMZW5ndGg7ICsraikge1xuXHRcdFx0XHRjdXJyZW50VmFsdWUgPSBpbnB1dFtqXTtcblxuXHRcdFx0XHRpZiAoY3VycmVudFZhbHVlIDwgbiAmJiArK2RlbHRhID4gbWF4SW50KSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoY3VycmVudFZhbHVlID09IG4pIHtcblx0XHRcdFx0XHQvLyBSZXByZXNlbnQgZGVsdGEgYXMgYSBnZW5lcmFsaXplZCB2YXJpYWJsZS1sZW5ndGggaW50ZWdlclxuXHRcdFx0XHRcdGZvciAocSA9IGRlbHRhLCBrID0gYmFzZTsgLyogbm8gY29uZGl0aW9uICovOyBrICs9IGJhc2UpIHtcblx0XHRcdFx0XHRcdHQgPSBrIDw9IGJpYXMgPyB0TWluIDogKGsgPj0gYmlhcyArIHRNYXggPyB0TWF4IDogayAtIGJpYXMpO1xuXHRcdFx0XHRcdFx0aWYgKHEgPCB0KSB7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cU1pbnVzVCA9IHEgLSB0O1xuXHRcdFx0XHRcdFx0YmFzZU1pbnVzVCA9IGJhc2UgLSB0O1xuXHRcdFx0XHRcdFx0b3V0cHV0LnB1c2goXG5cdFx0XHRcdFx0XHRcdHN0cmluZ0Zyb21DaGFyQ29kZShkaWdpdFRvQmFzaWModCArIHFNaW51c1QgJSBiYXNlTWludXNULCAwKSlcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRxID0gZmxvb3IocU1pbnVzVCAvIGJhc2VNaW51c1QpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdG91dHB1dC5wdXNoKHN0cmluZ0Zyb21DaGFyQ29kZShkaWdpdFRvQmFzaWMocSwgMCkpKTtcblx0XHRcdFx0XHRiaWFzID0gYWRhcHQoZGVsdGEsIGhhbmRsZWRDUENvdW50UGx1c09uZSwgaGFuZGxlZENQQ291bnQgPT0gYmFzaWNMZW5ndGgpO1xuXHRcdFx0XHRcdGRlbHRhID0gMDtcblx0XHRcdFx0XHQrK2hhbmRsZWRDUENvdW50O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdCsrZGVsdGE7XG5cdFx0XHQrK247XG5cblx0XHR9XG5cdFx0cmV0dXJuIG91dHB1dC5qb2luKCcnKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIFB1bnljb2RlIHN0cmluZyByZXByZXNlbnRpbmcgYSBkb21haW4gbmFtZSB0byBVbmljb2RlLiBPbmx5IHRoZVxuXHQgKiBQdW55Y29kZWQgcGFydHMgb2YgdGhlIGRvbWFpbiBuYW1lIHdpbGwgYmUgY29udmVydGVkLCBpLmUuIGl0IGRvZXNuJ3Rcblx0ICogbWF0dGVyIGlmIHlvdSBjYWxsIGl0IG9uIGEgc3RyaW5nIHRoYXQgaGFzIGFscmVhZHkgYmVlbiBjb252ZXJ0ZWQgdG9cblx0ICogVW5pY29kZS5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBkb21haW4gVGhlIFB1bnljb2RlIGRvbWFpbiBuYW1lIHRvIGNvbnZlcnQgdG8gVW5pY29kZS5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIFVuaWNvZGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIFB1bnljb2RlXG5cdCAqIHN0cmluZy5cblx0ICovXG5cdGZ1bmN0aW9uIHRvVW5pY29kZShkb21haW4pIHtcblx0XHRyZXR1cm4gbWFwRG9tYWluKGRvbWFpbiwgZnVuY3Rpb24oc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gcmVnZXhQdW55Y29kZS50ZXN0KHN0cmluZylcblx0XHRcdFx0PyBkZWNvZGUoc3RyaW5nLnNsaWNlKDQpLnRvTG93ZXJDYXNlKCkpXG5cdFx0XHRcdDogc3RyaW5nO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgVW5pY29kZSBzdHJpbmcgcmVwcmVzZW50aW5nIGEgZG9tYWluIG5hbWUgdG8gUHVueWNvZGUuIE9ubHkgdGhlXG5cdCAqIG5vbi1BU0NJSSBwYXJ0cyBvZiB0aGUgZG9tYWluIG5hbWUgd2lsbCBiZSBjb252ZXJ0ZWQsIGkuZS4gaXQgZG9lc24ndFxuXHQgKiBtYXR0ZXIgaWYgeW91IGNhbGwgaXQgd2l0aCBhIGRvbWFpbiB0aGF0J3MgYWxyZWFkeSBpbiBBU0NJSS5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBkb21haW4gVGhlIGRvbWFpbiBuYW1lIHRvIGNvbnZlcnQsIGFzIGEgVW5pY29kZSBzdHJpbmcuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBQdW55Y29kZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ2l2ZW4gZG9tYWluIG5hbWUuXG5cdCAqL1xuXHRmdW5jdGlvbiB0b0FTQ0lJKGRvbWFpbikge1xuXHRcdHJldHVybiBtYXBEb21haW4oZG9tYWluLCBmdW5jdGlvbihzdHJpbmcpIHtcblx0XHRcdHJldHVybiByZWdleE5vbkFTQ0lJLnRlc3Qoc3RyaW5nKVxuXHRcdFx0XHQ/ICd4bi0tJyArIGVuY29kZShzdHJpbmcpXG5cdFx0XHRcdDogc3RyaW5nO1xuXHRcdH0pO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqIERlZmluZSB0aGUgcHVibGljIEFQSSAqL1xuXHRwdW55Y29kZSA9IHtcblx0XHQvKipcblx0XHQgKiBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnQgUHVueWNvZGUuanMgdmVyc2lvbiBudW1iZXIuXG5cdFx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdFx0ICogQHR5cGUgU3RyaW5nXG5cdFx0ICovXG5cdFx0J3ZlcnNpb24nOiAnMS4yLjQnLFxuXHRcdC8qKlxuXHRcdCAqIEFuIG9iamVjdCBvZiBtZXRob2RzIHRvIGNvbnZlcnQgZnJvbSBKYXZhU2NyaXB0J3MgaW50ZXJuYWwgY2hhcmFjdGVyXG5cdFx0ICogcmVwcmVzZW50YXRpb24gKFVDUy0yKSB0byBVbmljb2RlIGNvZGUgcG9pbnRzLCBhbmQgYmFjay5cblx0XHQgKiBAc2VlIDxodHRwOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LWVuY29kaW5nPlxuXHRcdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHRcdCAqIEB0eXBlIE9iamVjdFxuXHRcdCAqL1xuXHRcdCd1Y3MyJzoge1xuXHRcdFx0J2RlY29kZSc6IHVjczJkZWNvZGUsXG5cdFx0XHQnZW5jb2RlJzogdWNzMmVuY29kZVxuXHRcdH0sXG5cdFx0J2RlY29kZSc6IGRlY29kZSxcblx0XHQnZW5jb2RlJzogZW5jb2RlLFxuXHRcdCd0b0FTQ0lJJzogdG9BU0NJSSxcblx0XHQndG9Vbmljb2RlJzogdG9Vbmljb2RlXG5cdH07XG5cblx0LyoqIEV4cG9zZSBgcHVueWNvZGVgICovXG5cdC8vIFNvbWUgQU1EIGJ1aWxkIG9wdGltaXplcnMsIGxpa2Ugci5qcywgY2hlY2sgZm9yIHNwZWNpZmljIGNvbmRpdGlvbiBwYXR0ZXJuc1xuXHQvLyBsaWtlIHRoZSBmb2xsb3dpbmc6XG5cdGlmIChcblx0XHR0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JyAmJlxuXHRcdGRlZmluZS5hbWRcblx0KSB7XG5cdFx0ZGVmaW5lKCdwdW55Y29kZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHB1bnljb2RlO1xuXHRcdH0pO1xuXHR9IGVsc2UgaWYgKGZyZWVFeHBvcnRzICYmICFmcmVlRXhwb3J0cy5ub2RlVHlwZSkge1xuXHRcdGlmIChmcmVlTW9kdWxlKSB7IC8vIGluIE5vZGUuanMgb3IgUmluZ29KUyB2MC44LjArXG5cdFx0XHRmcmVlTW9kdWxlLmV4cG9ydHMgPSBwdW55Y29kZTtcblx0XHR9IGVsc2UgeyAvLyBpbiBOYXJ3aGFsIG9yIFJpbmdvSlMgdjAuNy4wLVxuXHRcdFx0Zm9yIChrZXkgaW4gcHVueWNvZGUpIHtcblx0XHRcdFx0cHVueWNvZGUuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAoZnJlZUV4cG9ydHNba2V5XSA9IHB1bnljb2RlW2tleV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHsgLy8gaW4gUmhpbm8gb3IgYSB3ZWIgYnJvd3NlclxuXHRcdHJvb3QucHVueWNvZGUgPSBwdW55Y29kZTtcblx0fVxuXG59KHRoaXMpKTtcbiIsIi8vIFNvdXJjZTogaHR0cDovL2pzZmlkZGxlLm5ldC92V3g4Vi9cbi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTYwMzE5NS9mdWxsLWxpc3Qtb2YtamF2YXNjcmlwdC1rZXljb2Rlc1xuXG5cblxuLyoqXG4gKiBDb25lbmllbmNlIG1ldGhvZCByZXR1cm5zIGNvcnJlc3BvbmRpbmcgdmFsdWUgZm9yIGdpdmVuIGtleU5hbWUgb3Iga2V5Q29kZS5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSBrZXlDb2RlIHtOdW1iZXJ9IG9yIGtleU5hbWUge1N0cmluZ31cbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzZWFyY2hJbnB1dCkge1xuICAvLyBLZXlib2FyZCBFdmVudHNcbiAgaWYgKHNlYXJjaElucHV0ICYmICdvYmplY3QnID09PSB0eXBlb2Ygc2VhcmNoSW5wdXQpIHtcbiAgICB2YXIgaGFzS2V5Q29kZSA9IHNlYXJjaElucHV0LndoaWNoIHx8IHNlYXJjaElucHV0LmtleUNvZGUgfHwgc2VhcmNoSW5wdXQuY2hhckNvZGVcbiAgICBpZiAoaGFzS2V5Q29kZSkgc2VhcmNoSW5wdXQgPSBoYXNLZXlDb2RlXG4gIH1cblxuICAvLyBOdW1iZXJzXG4gIGlmICgnbnVtYmVyJyA9PT0gdHlwZW9mIHNlYXJjaElucHV0KSByZXR1cm4gbmFtZXNbc2VhcmNoSW5wdXRdXG5cbiAgLy8gRXZlcnl0aGluZyBlbHNlIChjYXN0IHRvIHN0cmluZylcbiAgdmFyIHNlYXJjaCA9IFN0cmluZyhzZWFyY2hJbnB1dClcblxuICAvLyBjaGVjayBjb2Rlc1xuICB2YXIgZm91bmROYW1lZEtleSA9IGNvZGVzW3NlYXJjaC50b0xvd2VyQ2FzZSgpXVxuICBpZiAoZm91bmROYW1lZEtleSkgcmV0dXJuIGZvdW5kTmFtZWRLZXlcblxuICAvLyBjaGVjayBhbGlhc2VzXG4gIHZhciBmb3VuZE5hbWVkS2V5ID0gYWxpYXNlc1tzZWFyY2gudG9Mb3dlckNhc2UoKV1cbiAgaWYgKGZvdW5kTmFtZWRLZXkpIHJldHVybiBmb3VuZE5hbWVkS2V5XG5cbiAgLy8gd2VpcmQgY2hhcmFjdGVyP1xuICBpZiAoc2VhcmNoLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHNlYXJjaC5jaGFyQ29kZUF0KDApXG5cbiAgcmV0dXJuIHVuZGVmaW5lZFxufVxuXG4vKipcbiAqIEdldCBieSBuYW1lXG4gKlxuICogICBleHBvcnRzLmNvZGVbJ2VudGVyJ10gLy8gPT4gMTNcbiAqL1xuXG52YXIgY29kZXMgPSBleHBvcnRzLmNvZGUgPSBleHBvcnRzLmNvZGVzID0ge1xuICAnYmFja3NwYWNlJzogOCxcbiAgJ3RhYic6IDksXG4gICdlbnRlcic6IDEzLFxuICAnc2hpZnQnOiAxNixcbiAgJ2N0cmwnOiAxNyxcbiAgJ2FsdCc6IDE4LFxuICAncGF1c2UvYnJlYWsnOiAxOSxcbiAgJ2NhcHMgbG9jayc6IDIwLFxuICAnZXNjJzogMjcsXG4gICdzcGFjZSc6IDMyLFxuICAncGFnZSB1cCc6IDMzLFxuICAncGFnZSBkb3duJzogMzQsXG4gICdlbmQnOiAzNSxcbiAgJ2hvbWUnOiAzNixcbiAgJ2xlZnQnOiAzNyxcbiAgJ3VwJzogMzgsXG4gICdyaWdodCc6IDM5LFxuICAnZG93bic6IDQwLFxuICAnaW5zZXJ0JzogNDUsXG4gICdkZWxldGUnOiA0NixcbiAgJ2NvbW1hbmQnOiA5MSxcbiAgJ3JpZ2h0IGNsaWNrJzogOTMsXG4gICdudW1wYWQgKic6IDEwNixcbiAgJ251bXBhZCArJzogMTA3LFxuICAnbnVtcGFkIC0nOiAxMDksXG4gICdudW1wYWQgLic6IDExMCxcbiAgJ251bXBhZCAvJzogMTExLFxuICAnbnVtIGxvY2snOiAxNDQsXG4gICdzY3JvbGwgbG9jayc6IDE0NSxcbiAgJ215IGNvbXB1dGVyJzogMTgyLFxuICAnbXkgY2FsY3VsYXRvcic6IDE4MyxcbiAgJzsnOiAxODYsXG4gICc9JzogMTg3LFxuICAnLCc6IDE4OCxcbiAgJy0nOiAxODksXG4gICcuJzogMTkwLFxuICAnLyc6IDE5MSxcbiAgJ2AnOiAxOTIsXG4gICdbJzogMjE5LFxuICAnXFxcXCc6IDIyMCxcbiAgJ10nOiAyMjEsXG4gIFwiJ1wiOiAyMjIsXG59XG5cbi8vIEhlbHBlciBhbGlhc2VzXG5cbnZhciBhbGlhc2VzID0gZXhwb3J0cy5hbGlhc2VzID0ge1xuICAnd2luZG93cyc6IDkxLFxuICAn4oenJzogMTYsXG4gICfijKUnOiAxOCxcbiAgJ+KMgyc6IDE3LFxuICAn4oyYJzogOTEsXG4gICdjdGwnOiAxNyxcbiAgJ2NvbnRyb2wnOiAxNyxcbiAgJ29wdGlvbic6IDE4LFxuICAncGF1c2UnOiAxOSxcbiAgJ2JyZWFrJzogMTksXG4gICdjYXBzJzogMjAsXG4gICdyZXR1cm4nOiAxMyxcbiAgJ2VzY2FwZSc6IDI3LFxuICAnc3BjJzogMzIsXG4gICdwZ3VwJzogMzMsXG4gICdwZ2RuJzogMzMsXG4gICdpbnMnOiA0NSxcbiAgJ2RlbCc6IDQ2LFxuICAnY21kJzogOTFcbn1cblxuXG4vKiFcbiAqIFByb2dyYW1hdGljYWxseSBhZGQgdGhlIGZvbGxvd2luZ1xuICovXG5cbi8vIGxvd2VyIGNhc2UgY2hhcnNcbmZvciAoaSA9IDk3OyBpIDwgMTIzOyBpKyspIGNvZGVzW1N0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaSAtIDMyXG5cbi8vIG51bWJlcnNcbmZvciAodmFyIGkgPSA0ODsgaSA8IDU4OyBpKyspIGNvZGVzW2kgLSA0OF0gPSBpXG5cbi8vIGZ1bmN0aW9uIGtleXNcbmZvciAoaSA9IDE7IGkgPCAxMzsgaSsrKSBjb2Rlc1snZicraV0gPSBpICsgMTExXG5cbi8vIG51bXBhZCBrZXlzXG5mb3IgKGkgPSAwOyBpIDwgMTA7IGkrKykgY29kZXNbJ251bXBhZCAnK2ldID0gaSArIDk2XG5cbi8qKlxuICogR2V0IGJ5IGNvZGVcbiAqXG4gKiAgIGV4cG9ydHMubmFtZVsxM10gLy8gPT4gJ0VudGVyJ1xuICovXG5cbnZhciBuYW1lcyA9IGV4cG9ydHMubmFtZXMgPSBleHBvcnRzLnRpdGxlID0ge30gLy8gdGl0bGUgZm9yIGJhY2t3YXJkIGNvbXBhdFxuXG4vLyBDcmVhdGUgcmV2ZXJzZSBtYXBwaW5nXG5mb3IgKGkgaW4gY29kZXMpIG5hbWVzW2NvZGVzW2ldXSA9IGlcblxuLy8gQWRkIGFsaWFzZXNcbmZvciAodmFyIGFsaWFzIGluIGFsaWFzZXMpIHtcbiAgY29kZXNbYWxpYXNdID0gYWxpYXNlc1thbGlhc11cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliLycpO1xuIiwiLy8gSFRNTDUgZW50aXRpZXMgbWFwOiB7IG5hbWUgLT4gdXRmMTZzdHJpbmcgfVxuLy9cbid1c2Ugc3RyaWN0JztcblxuLyplc2xpbnQgcXVvdGVzOjAqL1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCdlbnRpdGllcy9tYXBzL2VudGl0aWVzLmpzb24nKTtcbiIsIi8vIExpc3Qgb2YgdmFsaWQgaHRtbCBibG9ja3MgbmFtZXMsIGFjY29ydGluZyB0byBjb21tb25tYXJrIHNwZWNcbi8vIGh0dHA6Ly9qZ20uZ2l0aHViLmlvL0NvbW1vbk1hcmsvc3BlYy5odG1sI2h0bWwtYmxvY2tzXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGh0bWxfYmxvY2tzID0ge307XG5cbltcbiAgJ2FydGljbGUnLFxuICAnYXNpZGUnLFxuICAnYnV0dG9uJyxcbiAgJ2Jsb2NrcXVvdGUnLFxuICAnYm9keScsXG4gICdjYW52YXMnLFxuICAnY2FwdGlvbicsXG4gICdjb2wnLFxuICAnY29sZ3JvdXAnLFxuICAnZGQnLFxuICAnZGl2JyxcbiAgJ2RsJyxcbiAgJ2R0JyxcbiAgJ2VtYmVkJyxcbiAgJ2ZpZWxkc2V0JyxcbiAgJ2ZpZ2NhcHRpb24nLFxuICAnZmlndXJlJyxcbiAgJ2Zvb3RlcicsXG4gICdmb3JtJyxcbiAgJ2gxJyxcbiAgJ2gyJyxcbiAgJ2gzJyxcbiAgJ2g0JyxcbiAgJ2g1JyxcbiAgJ2g2JyxcbiAgJ2hlYWRlcicsXG4gICdoZ3JvdXAnLFxuICAnaHInLFxuICAnaWZyYW1lJyxcbiAgJ2xpJyxcbiAgJ21hcCcsXG4gICdvYmplY3QnLFxuICAnb2wnLFxuICAnb3V0cHV0JyxcbiAgJ3AnLFxuICAncHJlJyxcbiAgJ3Byb2dyZXNzJyxcbiAgJ3NjcmlwdCcsXG4gICdzZWN0aW9uJyxcbiAgJ3N0eWxlJyxcbiAgJ3RhYmxlJyxcbiAgJ3Rib2R5JyxcbiAgJ3RkJyxcbiAgJ3RleHRhcmVhJyxcbiAgJ3Rmb290JyxcbiAgJ3RoJyxcbiAgJ3RyJyxcbiAgJ3RoZWFkJyxcbiAgJ3VsJyxcbiAgJ3ZpZGVvJ1xuXS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7IGh0bWxfYmxvY2tzW25hbWVdID0gdHJ1ZTsgfSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBodG1sX2Jsb2NrcztcbiIsIi8vIFJlZ2V4cHMgdG8gbWF0Y2ggaHRtbCBlbGVtZW50c1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBhdHRyX25hbWUgICAgID0gJ1thLXpBLVpfOl1bYS16QS1aMC05Oi5fLV0qJztcblxudmFyIHVucXVvdGVkICAgICAgPSAnW15cIlxcJz08PmBcXFxceDAwLVxcXFx4MjBdKyc7XG52YXIgc2luZ2xlX3F1b3RlZCA9IFwiJ1teJ10qJ1wiO1xudmFyIGRvdWJsZV9xdW90ZWQgPSAnXCJbXlwiXSpcIic7XG5cbnZhciBhdHRyX3ZhbHVlICA9ICcoPzonICsgdW5xdW90ZWQgKyAnfCcgKyBzaW5nbGVfcXVvdGVkICsgJ3wnICsgZG91YmxlX3F1b3RlZCArICcpJztcblxudmFyIGF0dHJpYnV0ZSAgID0gJyg/OlxcXFxzKycgKyBhdHRyX25hbWUgKyAnKD86XFxcXHMqPVxcXFxzKicgKyBhdHRyX3ZhbHVlICsgJyk/KSc7XG5cbnZhciBvcGVuX3RhZyAgICA9ICc8W0EtWmEtel1bQS1aYS16MC05XFxcXC1dKicgKyBhdHRyaWJ1dGUgKyAnKlxcXFxzKlxcXFwvPz4nO1xuXG52YXIgY2xvc2VfdGFnICAgPSAnPFxcXFwvW0EtWmEtel1bQS1aYS16MC05XFxcXC1dKlxcXFxzKj4nO1xudmFyIGNvbW1lbnQgICAgID0gJzwhLS0tLT58PCEtLSg/Oi0/W14+LV0pKD86LT9bXi1dKSotLT4nO1xudmFyIHByb2Nlc3NpbmcgID0gJzxbP10uKj9bP10+JztcbnZhciBkZWNsYXJhdGlvbiA9ICc8IVtBLVpdK1xcXFxzK1tePl0qPic7XG52YXIgY2RhdGEgICAgICAgPSAnPCFcXFxcW0NEQVRBXFxcXFtbXFxcXHNcXFxcU10qP1xcXFxdXFxcXF0+JztcblxudmFyIEhUTUxfVEFHX1JFID0gbmV3IFJlZ0V4cCgnXig/OicgKyBvcGVuX3RhZyArICd8JyArIGNsb3NlX3RhZyArICd8JyArIGNvbW1lbnQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3wnICsgcHJvY2Vzc2luZyArICd8JyArIGRlY2xhcmF0aW9uICsgJ3wnICsgY2RhdGEgKyAnKScpO1xuXG5tb2R1bGUuZXhwb3J0cy5IVE1MX1RBR19SRSA9IEhUTUxfVEFHX1JFO1xuIiwiLy8gTGlzdCBvZiB2YWxpZCB1cmwgc2NoZW1hcywgYWNjb3J0aW5nIHRvIGNvbW1vbm1hcmsgc3BlY1xuLy8gaHR0cDovL2pnbS5naXRodWIuaW8vQ29tbW9uTWFyay9zcGVjLmh0bWwjYXV0b2xpbmtzXG5cbid1c2Ugc3RyaWN0JztcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgJ2NvYXAnLFxuICAnZG9pJyxcbiAgJ2phdmFzY3JpcHQnLFxuICAnYWFhJyxcbiAgJ2FhYXMnLFxuICAnYWJvdXQnLFxuICAnYWNhcCcsXG4gICdjYXAnLFxuICAnY2lkJyxcbiAgJ2NyaWQnLFxuICAnZGF0YScsXG4gICdkYXYnLFxuICAnZGljdCcsXG4gICdkbnMnLFxuICAnZmlsZScsXG4gICdmdHAnLFxuICAnZ2VvJyxcbiAgJ2dvJyxcbiAgJ2dvcGhlcicsXG4gICdoMzIzJyxcbiAgJ2h0dHAnLFxuICAnaHR0cHMnLFxuICAnaWF4JyxcbiAgJ2ljYXAnLFxuICAnaW0nLFxuICAnaW1hcCcsXG4gICdpbmZvJyxcbiAgJ2lwcCcsXG4gICdpcmlzJyxcbiAgJ2lyaXMuYmVlcCcsXG4gICdpcmlzLnhwYycsXG4gICdpcmlzLnhwY3MnLFxuICAnaXJpcy5sd3onLFxuICAnbGRhcCcsXG4gICdtYWlsdG8nLFxuICAnbWlkJyxcbiAgJ21zcnAnLFxuICAnbXNycHMnLFxuICAnbXRxcCcsXG4gICdtdXBkYXRlJyxcbiAgJ25ld3MnLFxuICAnbmZzJyxcbiAgJ25pJyxcbiAgJ25paCcsXG4gICdubnRwJyxcbiAgJ29wYXF1ZWxvY2t0b2tlbicsXG4gICdwb3AnLFxuICAncHJlcycsXG4gICdydHNwJyxcbiAgJ3NlcnZpY2UnLFxuICAnc2Vzc2lvbicsXG4gICdzaHR0cCcsXG4gICdzaWV2ZScsXG4gICdzaXAnLFxuICAnc2lwcycsXG4gICdzbXMnLFxuICAnc25tcCcsXG4gICdzb2FwLmJlZXAnLFxuICAnc29hcC5iZWVwcycsXG4gICd0YWcnLFxuICAndGVsJyxcbiAgJ3RlbG5ldCcsXG4gICd0ZnRwJyxcbiAgJ3RoaXNtZXNzYWdlJyxcbiAgJ3RuMzI3MCcsXG4gICd0aXAnLFxuICAndHYnLFxuICAndXJuJyxcbiAgJ3ZlbW1pJyxcbiAgJ3dzJyxcbiAgJ3dzcycsXG4gICd4Y29uJyxcbiAgJ3hjb24tdXNlcmlkJyxcbiAgJ3htbHJwYy5iZWVwJyxcbiAgJ3htbHJwYy5iZWVwcycsXG4gICd4bXBwJyxcbiAgJ3ozOS41MHInLFxuICAnejM5LjUwcycsXG4gICdhZGl1bXh0cmEnLFxuICAnYWZwJyxcbiAgJ2FmcycsXG4gICdhaW0nLFxuICAnYXB0JyxcbiAgJ2F0dGFjaG1lbnQnLFxuICAnYXcnLFxuICAnYmVzaGFyZScsXG4gICdiaXRjb2luJyxcbiAgJ2JvbG8nLFxuICAnY2FsbHRvJyxcbiAgJ2Nocm9tZScsXG4gICdjaHJvbWUtZXh0ZW5zaW9uJyxcbiAgJ2NvbS1ldmVudGJyaXRlLWF0dGVuZGVlJyxcbiAgJ2NvbnRlbnQnLFxuICAnY3ZzJyxcbiAgJ2RsbmEtcGxheXNpbmdsZScsXG4gICdkbG5hLXBsYXljb250YWluZXInLFxuICAnZHRuJyxcbiAgJ2R2YicsXG4gICdlZDJrJyxcbiAgJ2ZhY2V0aW1lJyxcbiAgJ2ZlZWQnLFxuICAnZmluZ2VyJyxcbiAgJ2Zpc2gnLFxuICAnZ2cnLFxuICAnZ2l0JyxcbiAgJ2dpem1vcHJvamVjdCcsXG4gICdndGFsaycsXG4gICdoY3AnLFxuICAnaWNvbicsXG4gICdpcG4nLFxuICAnaXJjJyxcbiAgJ2lyYzYnLFxuICAnaXJjcycsXG4gICdpdG1zJyxcbiAgJ2phcicsXG4gICdqbXMnLFxuICAna2V5cGFyYycsXG4gICdsYXN0Zm0nLFxuICAnbGRhcHMnLFxuICAnbWFnbmV0JyxcbiAgJ21hcHMnLFxuICAnbWFya2V0JyxcbiAgJ21lc3NhZ2UnLFxuICAnbW1zJyxcbiAgJ21zLWhlbHAnLFxuICAnbXNuaW0nLFxuICAnbXVtYmxlJyxcbiAgJ212bicsXG4gICdub3RlcycsXG4gICdvaWQnLFxuICAncGFsbScsXG4gICdwYXBhcmF6emknLFxuICAncGxhdGZvcm0nLFxuICAncHJveHknLFxuICAncHN5YycsXG4gICdxdWVyeScsXG4gICdyZXMnLFxuICAncmVzb3VyY2UnLFxuICAncm1pJyxcbiAgJ3JzeW5jJyxcbiAgJ3J0bXAnLFxuICAnc2Vjb25kbGlmZScsXG4gICdzZnRwJyxcbiAgJ3NnbicsXG4gICdza3lwZScsXG4gICdzbWInLFxuICAnc29sZGF0JyxcbiAgJ3Nwb3RpZnknLFxuICAnc3NoJyxcbiAgJ3N0ZWFtJyxcbiAgJ3N2bicsXG4gICd0ZWFtc3BlYWsnLFxuICAndGhpbmdzJyxcbiAgJ3VkcCcsXG4gICd1bnJlYWwnLFxuICAndXQyMDA0JyxcbiAgJ3ZlbnRyaWxvJyxcbiAgJ3ZpZXctc291cmNlJyxcbiAgJ3dlYmNhbCcsXG4gICd3dGFpJyxcbiAgJ3d5Y2l3eWcnLFxuICAneGZpcmUnLFxuICAneHJpJyxcbiAgJ3ltc2dyJ1xuXTtcbiIsIi8vIFV0aWxpdGllc1xuLy9cbid1c2Ugc3RyaWN0JztcblxuXG5mdW5jdGlvbiBfY2xhc3Mob2JqKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKTsgfVxuXG5mdW5jdGlvbiBpc1N0cmluZyhvYmopIHsgcmV0dXJuIF9jbGFzcyhvYmopID09PSAnW29iamVjdCBTdHJpbmddJzsgfVxuXG52YXIgX2hhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gaGFzKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBfaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSk7XG59XG5cbi8vIE1lcmdlIG9iamVjdHNcbi8vXG5mdW5jdGlvbiBhc3NpZ24ob2JqIC8qZnJvbTEsIGZyb20yLCBmcm9tMywgLi4uKi8pIHtcbiAgdmFyIHNvdXJjZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gIHNvdXJjZXMuZm9yRWFjaChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgaWYgKCFzb3VyY2UpIHsgcmV0dXJuOyB9XG5cbiAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3Ioc291cmNlICsgJ211c3QgYmUgb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIG9ialtrZXldID0gc291cmNlW2tleV07XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBvYmo7XG59XG5cbi8vIFJlbW92ZSBlbGVtZW50IGZyb20gYXJyYXkgYW5kIHB1dCBhbm90aGVyIGFycmF5IGF0IHRob3NlIHBvc2l0aW9uLlxuLy8gVXNlZnVsIGZvciBzb21lIG9wZXJhdGlvbnMgd2l0aCB0b2tlbnNcbmZ1bmN0aW9uIGFycmF5UmVwbGFjZUF0KHNyYywgcG9zLCBuZXdFbGVtZW50cykge1xuICByZXR1cm4gW10uY29uY2F0KHNyYy5zbGljZSgwLCBwb3MpLCBuZXdFbGVtZW50cywgc3JjLnNsaWNlKHBvcyArIDEpKTtcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuZnVuY3Rpb24gaXNWYWxpZEVudGl0eUNvZGUoYykge1xuICAvKmVzbGludCBuby1iaXR3aXNlOjAqL1xuICAvLyBicm9rZW4gc2VxdWVuY2VcbiAgaWYgKGMgPj0gMHhEODAwICYmIGMgPD0gMHhERkZGKSB7IHJldHVybiBmYWxzZTsgfVxuICAvLyBuZXZlciB1c2VkXG4gIGlmIChjID49IDB4RkREMCAmJiBjIDw9IDB4RkRFRikgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKChjICYgMHhGRkZGKSA9PT0gMHhGRkZGIHx8IChjICYgMHhGRkZGKSA9PT0gMHhGRkZFKSB7IHJldHVybiBmYWxzZTsgfVxuICAvLyBjb250cm9sIGNvZGVzXG4gIGlmIChjID49IDB4MDAgJiYgYyA8PSAweDA4KSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAoYyA9PT0gMHgwQikgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKGMgPj0gMHgwRSAmJiBjIDw9IDB4MUYpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmIChjID49IDB4N0YgJiYgYyA8PSAweDlGKSB7IHJldHVybiBmYWxzZTsgfVxuICAvLyBvdXQgb2YgcmFuZ2VcbiAgaWYgKGMgPiAweDEwRkZGRikgeyByZXR1cm4gZmFsc2U7IH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGZyb21Db2RlUG9pbnQoYykge1xuICAvKmVzbGludCBuby1iaXR3aXNlOjAqL1xuICBpZiAoYyA+IDB4ZmZmZikge1xuICAgIGMgLT0gMHgxMDAwMDtcbiAgICB2YXIgc3Vycm9nYXRlMSA9IDB4ZDgwMCArIChjID4+IDEwKSxcbiAgICAgICAgc3Vycm9nYXRlMiA9IDB4ZGMwMCArIChjICYgMHgzZmYpO1xuXG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoc3Vycm9nYXRlMSwgc3Vycm9nYXRlMik7XG4gIH1cbiAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoYyk7XG59XG5cblxudmFyIFVORVNDQVBFX01EX1JFICA9IC9cXFxcKFshXCIjJCUmJygpKissXFwtLlxcLzo7PD0+P0BbXFxcXFxcXV5fYHt8fX5dKS9nO1xudmFyIEVOVElUWV9SRSAgICAgICA9IC8mKFthLXojXVthLXowLTldezEsMzF9KTsvZ2k7XG52YXIgVU5FU0NBUEVfQUxMX1JFID0gbmV3IFJlZ0V4cChVTkVTQ0FQRV9NRF9SRS5zb3VyY2UgKyAnfCcgKyBFTlRJVFlfUkUuc291cmNlLCAnZ2knKTtcblxudmFyIERJR0lUQUxfRU5USVRZX1RFU1RfUkUgPSAvXiMoKD86eFthLWYwLTldezEsOH18WzAtOV17MSw4fSkpL2k7XG5cbnZhciBlbnRpdGllcyA9IHJlcXVpcmUoJy4vZW50aXRpZXMnKTtcblxuZnVuY3Rpb24gcmVwbGFjZUVudGl0eVBhdHRlcm4obWF0Y2gsIG5hbWUpIHtcbiAgdmFyIGNvZGUgPSAwO1xuXG4gIGlmIChoYXMoZW50aXRpZXMsIG5hbWUpKSB7XG4gICAgcmV0dXJuIGVudGl0aWVzW25hbWVdO1xuICB9XG5cbiAgaWYgKG5hbWUuY2hhckNvZGVBdCgwKSA9PT0gMHgyMy8qICMgKi8gJiYgRElHSVRBTF9FTlRJVFlfVEVTVF9SRS50ZXN0KG5hbWUpKSB7XG4gICAgY29kZSA9IG5hbWVbMV0udG9Mb3dlckNhc2UoKSA9PT0gJ3gnID9cbiAgICAgIHBhcnNlSW50KG5hbWUuc2xpY2UoMiksIDE2KVxuICAgIDpcbiAgICAgIHBhcnNlSW50KG5hbWUuc2xpY2UoMSksIDEwKTtcbiAgICBpZiAoaXNWYWxpZEVudGl0eUNvZGUoY29kZSkpIHtcbiAgICAgIHJldHVybiBmcm9tQ29kZVBvaW50KGNvZGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtYXRjaDtcbn1cblxuLypmdW5jdGlvbiByZXBsYWNlRW50aXRpZXMoc3RyKSB7XG4gIGlmIChzdHIuaW5kZXhPZignJicpIDwgMCkgeyByZXR1cm4gc3RyOyB9XG5cbiAgcmV0dXJuIHN0ci5yZXBsYWNlKEVOVElUWV9SRSwgcmVwbGFjZUVudGl0eVBhdHRlcm4pO1xufSovXG5cbmZ1bmN0aW9uIHVuZXNjYXBlTWQoc3RyKSB7XG4gIGlmIChzdHIuaW5kZXhPZignXFxcXCcpIDwgMCkgeyByZXR1cm4gc3RyOyB9XG4gIHJldHVybiBzdHIucmVwbGFjZShVTkVTQ0FQRV9NRF9SRSwgJyQxJyk7XG59XG5cbmZ1bmN0aW9uIHVuZXNjYXBlQWxsKHN0cikge1xuICBpZiAoc3RyLmluZGV4T2YoJ1xcXFwnKSA8IDAgJiYgc3RyLmluZGV4T2YoJyYnKSA8IDApIHsgcmV0dXJuIHN0cjsgfVxuXG4gIHJldHVybiBzdHIucmVwbGFjZShVTkVTQ0FQRV9BTExfUkUsIGZ1bmN0aW9uKG1hdGNoLCBlc2NhcGVkLCBlbnRpdHkpIHtcbiAgICBpZiAoZXNjYXBlZCkgeyByZXR1cm4gZXNjYXBlZDsgfVxuICAgIHJldHVybiByZXBsYWNlRW50aXR5UGF0dGVybihtYXRjaCwgZW50aXR5KTtcbiAgfSk7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbnZhciBIVE1MX0VTQ0FQRV9URVNUX1JFID0gL1smPD5cIl0vO1xudmFyIEhUTUxfRVNDQVBFX1JFUExBQ0VfUkUgPSAvWyY8PlwiXS9nO1xudmFyIEhUTUxfUkVQTEFDRU1FTlRTID0ge1xuICAnJic6ICcmYW1wOycsXG4gICc8JzogJyZsdDsnLFxuICAnPic6ICcmZ3Q7JyxcbiAgJ1wiJzogJyZxdW90Oydcbn07XG5cbmZ1bmN0aW9uIHJlcGxhY2VVbnNhZmVDaGFyKGNoKSB7XG4gIHJldHVybiBIVE1MX1JFUExBQ0VNRU5UU1tjaF07XG59XG5cbmZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyKSB7XG4gIGlmIChIVE1MX0VTQ0FQRV9URVNUX1JFLnRlc3Qoc3RyKSkge1xuICAgIHJldHVybiBzdHIucmVwbGFjZShIVE1MX0VTQ0FQRV9SRVBMQUNFX1JFLCByZXBsYWNlVW5zYWZlQ2hhcik7XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxudmFyIFJFR0VYUF9FU0NBUEVfUkUgPSAvWy4/KiteJFtcXF1cXFxcKCl7fXwtXS9nO1xuXG5mdW5jdGlvbiBlc2NhcGVSRSAoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZShSRUdFWFBfRVNDQVBFX1JFLCAnXFxcXCQmJyk7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8vIFpzICh1bmljb2RlIGNsYXNzKSB8fCBbXFx0XFxmXFx2XFxyXFxuXVxuZnVuY3Rpb24gaXNXaGl0ZVNwYWNlKGNvZGUpIHtcbiAgaWYgKGNvZGUgPj0gMHgyMDAwICYmIGNvZGUgPD0gMHgyMDBBKSB7IHJldHVybiB0cnVlOyB9XG4gIHN3aXRjaCAoY29kZSkge1xuICAgIGNhc2UgMHgwOTogLy8gXFx0XG4gICAgY2FzZSAweDBBOiAvLyBcXG5cbiAgICBjYXNlIDB4MEI6IC8vIFxcdlxuICAgIGNhc2UgMHgwQzogLy8gXFxmXG4gICAgY2FzZSAweDBEOiAvLyBcXHJcbiAgICBjYXNlIDB4MjA6XG4gICAgY2FzZSAweEEwOlxuICAgIGNhc2UgMHgxNjgwOlxuICAgIGNhc2UgMHgyMDJGOlxuICAgIGNhc2UgMHgyMDVGOlxuICAgIGNhc2UgMHgzMDAwOlxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vKmVzbGludC1kaXNhYmxlIG1heC1sZW4qL1xudmFyIFVOSUNPREVfUFVOQ1RfUkUgPSByZXF1aXJlKCd1Yy5taWNyby9jYXRlZ29yaWVzL1AvcmVnZXgnKTtcblxuLy8gQ3VycmVudGx5IHdpdGhvdXQgYXN0cmFsIGNoYXJhY3RlcnMgc3VwcG9ydC5cbmZ1bmN0aW9uIGlzUHVuY3RDaGFyKGNoYXIpIHtcbiAgcmV0dXJuIFVOSUNPREVfUFVOQ1RfUkUudGVzdChjaGFyKTtcbn1cblxuXG4vLyBNYXJrZG93biBBU0NJSSBwdW5jdHVhdGlvbiBjaGFyYWN0ZXJzLlxuLy9cbi8vICEsIFwiLCAjLCAkLCAlLCAmLCAnLCAoLCApLCAqLCArLCAsLCAtLCAuLCAvLCA6LCA7LCA8LCA9LCA+LCA/LCBALCBbLCBcXCwgXSwgXiwgXywgYCwgeywgfCwgfSwgb3IgflxuLy8gaHR0cDovL3NwZWMuY29tbW9ubWFyay5vcmcvMC4xNS8jYXNjaWktcHVuY3R1YXRpb24tY2hhcmFjdGVyXG4vL1xuLy8gRG9uJ3QgY29uZnVzZSB3aXRoIHVuaWNvZGUgcHVuY3R1YXRpb24gISEhIEl0IGxhY2tzIHNvbWUgY2hhcnMgaW4gYXNjaWkgcmFuZ2UuXG4vL1xuZnVuY3Rpb24gaXNNZEFzY2lpUHVuY3QoY2gpIHtcbiAgc3dpdGNoIChjaCkge1xuICAgIGNhc2UgMHgyMS8qICEgKi86XG4gICAgY2FzZSAweDIyLyogXCIgKi86XG4gICAgY2FzZSAweDIzLyogIyAqLzpcbiAgICBjYXNlIDB4MjQvKiAkICovOlxuICAgIGNhc2UgMHgyNS8qICUgKi86XG4gICAgY2FzZSAweDI2LyogJiAqLzpcbiAgICBjYXNlIDB4MjcvKiAnICovOlxuICAgIGNhc2UgMHgyOC8qICggKi86XG4gICAgY2FzZSAweDI5LyogKSAqLzpcbiAgICBjYXNlIDB4MkEvKiAqICovOlxuICAgIGNhc2UgMHgyQi8qICsgKi86XG4gICAgY2FzZSAweDJDLyogLCAqLzpcbiAgICBjYXNlIDB4MkQvKiAtICovOlxuICAgIGNhc2UgMHgyRS8qIC4gKi86XG4gICAgY2FzZSAweDJGLyogLyAqLzpcbiAgICBjYXNlIDB4M0EvKiA6ICovOlxuICAgIGNhc2UgMHgzQi8qIDsgKi86XG4gICAgY2FzZSAweDNDLyogPCAqLzpcbiAgICBjYXNlIDB4M0QvKiA9ICovOlxuICAgIGNhc2UgMHgzRS8qID4gKi86XG4gICAgY2FzZSAweDNGLyogPyAqLzpcbiAgICBjYXNlIDB4NDAvKiBAICovOlxuICAgIGNhc2UgMHg1Qi8qIFsgKi86XG4gICAgY2FzZSAweDVDLyogXFwgKi86XG4gICAgY2FzZSAweDVELyogXSAqLzpcbiAgICBjYXNlIDB4NUUvKiBeICovOlxuICAgIGNhc2UgMHg1Ri8qIF8gKi86XG4gICAgY2FzZSAweDYwLyogYCAqLzpcbiAgICBjYXNlIDB4N0IvKiB7ICovOlxuICAgIGNhc2UgMHg3Qy8qIHwgKi86XG4gICAgY2FzZSAweDdELyogfSAqLzpcbiAgICBjYXNlIDB4N0UvKiB+ICovOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vLyBIZXBsZXIgdG8gdW5pZnkgW3JlZmVyZW5jZSBsYWJlbHNdLlxuLy9cbmZ1bmN0aW9uIG5vcm1hbGl6ZVJlZmVyZW5jZShzdHIpIHtcbiAgLy8gdXNlIC50b1VwcGVyQ2FzZSgpIGluc3RlYWQgb2YgLnRvTG93ZXJDYXNlKClcbiAgLy8gaGVyZSB0byBhdm9pZCBhIGNvbmZsaWN0IHdpdGggT2JqZWN0LnByb3RvdHlwZVxuICAvLyBtZW1iZXJzIChtb3N0IG5vdGFibHksIGBfX3Byb3RvX19gKVxuICByZXR1cm4gc3RyLnRyaW0oKS5yZXBsYWNlKC9cXHMrL2csICcgJykudG9VcHBlckNhc2UoKTtcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLy8gUmUtZXhwb3J0IGxpYnJhcmllcyBjb21tb25seSB1c2VkIGluIGJvdGggbWFya2Rvd24taXQgYW5kIGl0cyBwbHVnaW5zLFxuLy8gc28gcGx1Z2lucyB3b24ndCBoYXZlIHRvIGRlcGVuZCBvbiB0aGVtIGV4cGxpY2l0bHksIHdoaWNoIHJlZHVjZXMgdGhlaXJcbi8vIGJ1bmRsZWQgc2l6ZSAoZS5nLiBhIGJyb3dzZXIgYnVpbGQpLlxuLy9cbmV4cG9ydHMubGliICAgICAgICAgICAgICAgICA9IHt9O1xuZXhwb3J0cy5saWIubWR1cmwgICAgICAgICAgID0gcmVxdWlyZSgnbWR1cmwnKTtcbmV4cG9ydHMubGliLnVjbWljcm8gICAgICAgICA9IHJlcXVpcmUoJ3VjLm1pY3JvJyk7XG5cbmV4cG9ydHMuYXNzaWduICAgICAgICAgICAgICA9IGFzc2lnbjtcbmV4cG9ydHMuaXNTdHJpbmcgICAgICAgICAgICA9IGlzU3RyaW5nO1xuZXhwb3J0cy5oYXMgICAgICAgICAgICAgICAgID0gaGFzO1xuZXhwb3J0cy51bmVzY2FwZU1kICAgICAgICAgID0gdW5lc2NhcGVNZDtcbmV4cG9ydHMudW5lc2NhcGVBbGwgICAgICAgICA9IHVuZXNjYXBlQWxsO1xuZXhwb3J0cy5pc1ZhbGlkRW50aXR5Q29kZSAgID0gaXNWYWxpZEVudGl0eUNvZGU7XG5leHBvcnRzLmZyb21Db2RlUG9pbnQgICAgICAgPSBmcm9tQ29kZVBvaW50O1xuLy8gZXhwb3J0cy5yZXBsYWNlRW50aXRpZXMgICAgID0gcmVwbGFjZUVudGl0aWVzO1xuZXhwb3J0cy5lc2NhcGVIdG1sICAgICAgICAgID0gZXNjYXBlSHRtbDtcbmV4cG9ydHMuYXJyYXlSZXBsYWNlQXQgICAgICA9IGFycmF5UmVwbGFjZUF0O1xuZXhwb3J0cy5pc1doaXRlU3BhY2UgICAgICAgID0gaXNXaGl0ZVNwYWNlO1xuZXhwb3J0cy5pc01kQXNjaWlQdW5jdCAgICAgID0gaXNNZEFzY2lpUHVuY3Q7XG5leHBvcnRzLmlzUHVuY3RDaGFyICAgICAgICAgPSBpc1B1bmN0Q2hhcjtcbmV4cG9ydHMuZXNjYXBlUkUgICAgICAgICAgICA9IGVzY2FwZVJFO1xuZXhwb3J0cy5ub3JtYWxpemVSZWZlcmVuY2UgID0gbm9ybWFsaXplUmVmZXJlbmNlO1xuIiwiLy8gSnVzdCBhIHNob3J0Y3V0IGZvciBidWxrIGV4cG9ydFxuJ3VzZSBzdHJpY3QnO1xuXG5cbmV4cG9ydHMucGFyc2VMaW5rTGFiZWwgICAgICAgPSByZXF1aXJlKCcuL3BhcnNlX2xpbmtfbGFiZWwnKTtcbmV4cG9ydHMucGFyc2VMaW5rRGVzdGluYXRpb24gPSByZXF1aXJlKCcuL3BhcnNlX2xpbmtfZGVzdGluYXRpb24nKTtcbmV4cG9ydHMucGFyc2VMaW5rVGl0bGUgICAgICAgPSByZXF1aXJlKCcuL3BhcnNlX2xpbmtfdGl0bGUnKTtcbiIsIi8vIFBhcnNlIGxpbmsgZGVzdGluYXRpb25cbi8vXG4ndXNlIHN0cmljdCc7XG5cblxudmFyIHVuZXNjYXBlQWxsICAgPSByZXF1aXJlKCcuLi9jb21tb24vdXRpbHMnKS51bmVzY2FwZUFsbDtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlTGlua0Rlc3RpbmF0aW9uKHN0ciwgcG9zLCBtYXgpIHtcbiAgdmFyIGNvZGUsIGxldmVsLFxuICAgICAgbGluZXMgPSAwLFxuICAgICAgc3RhcnQgPSBwb3MsXG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgcG9zOiAwLFxuICAgICAgICBsaW5lczogMCxcbiAgICAgICAgc3RyOiAnJ1xuICAgICAgfTtcblxuICBpZiAoc3RyLmNoYXJDb2RlQXQocG9zKSA9PT0gMHgzQyAvKiA8ICovKSB7XG4gICAgcG9zKys7XG4gICAgd2hpbGUgKHBvcyA8IG1heCkge1xuICAgICAgY29kZSA9IHN0ci5jaGFyQ29kZUF0KHBvcyk7XG4gICAgICBpZiAoY29kZSA9PT0gMHgwQSAvKiBcXG4gKi8pIHsgcmV0dXJuIHJlc3VsdDsgfVxuICAgICAgaWYgKGNvZGUgPT09IDB4M0UgLyogPiAqLykge1xuICAgICAgICByZXN1bHQucG9zID0gcG9zICsgMTtcbiAgICAgICAgcmVzdWx0LnN0ciA9IHVuZXNjYXBlQWxsKHN0ci5zbGljZShzdGFydCArIDEsIHBvcykpO1xuICAgICAgICByZXN1bHQub2sgPSB0cnVlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgICAgaWYgKGNvZGUgPT09IDB4NUMgLyogXFwgKi8gJiYgcG9zICsgMSA8IG1heCkge1xuICAgICAgICBwb3MgKz0gMjtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHBvcysrO1xuICAgIH1cblxuICAgIC8vIG5vIGNsb3NpbmcgJz4nXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8vIHRoaXMgc2hvdWxkIGJlIC4uLiB9IGVsc2UgeyAuLi4gYnJhbmNoXG5cbiAgbGV2ZWwgPSAwO1xuICB3aGlsZSAocG9zIDwgbWF4KSB7XG4gICAgY29kZSA9IHN0ci5jaGFyQ29kZUF0KHBvcyk7XG5cbiAgICBpZiAoY29kZSA9PT0gMHgyMCkgeyBicmVhazsgfVxuXG4gICAgLy8gYXNjaWkgY29udHJvbCBjaGFyYWN0ZXJzXG4gICAgaWYgKGNvZGUgPCAweDIwIHx8IGNvZGUgPT09IDB4N0YpIHsgYnJlYWs7IH1cblxuICAgIGlmIChjb2RlID09PSAweDVDIC8qIFxcICovICYmIHBvcyArIDEgPCBtYXgpIHtcbiAgICAgIHBvcyArPSAyO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGNvZGUgPT09IDB4MjggLyogKCAqLykge1xuICAgICAgbGV2ZWwrKztcbiAgICAgIGlmIChsZXZlbCA+IDEpIHsgYnJlYWs7IH1cbiAgICB9XG5cbiAgICBpZiAoY29kZSA9PT0gMHgyOSAvKiApICovKSB7XG4gICAgICBsZXZlbC0tO1xuICAgICAgaWYgKGxldmVsIDwgMCkgeyBicmVhazsgfVxuICAgIH1cblxuICAgIHBvcysrO1xuICB9XG5cbiAgaWYgKHN0YXJ0ID09PSBwb3MpIHsgcmV0dXJuIHJlc3VsdDsgfVxuXG4gIHJlc3VsdC5zdHIgPSB1bmVzY2FwZUFsbChzdHIuc2xpY2Uoc3RhcnQsIHBvcykpO1xuICByZXN1bHQubGluZXMgPSBsaW5lcztcbiAgcmVzdWx0LnBvcyA9IHBvcztcbiAgcmVzdWx0Lm9rID0gdHJ1ZTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvLyBQYXJzZSBsaW5rIGxhYmVsXG4vL1xuLy8gdGhpcyBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgZmlyc3QgY2hhcmFjdGVyIChcIltcIikgYWxyZWFkeSBtYXRjaGVzO1xuLy8gcmV0dXJucyB0aGUgZW5kIG9mIHRoZSBsYWJlbFxuLy9cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZUxpbmtMYWJlbChzdGF0ZSwgc3RhcnQsIGRpc2FibGVOZXN0ZWQpIHtcbiAgdmFyIGxldmVsLCBmb3VuZCwgbWFya2VyLCBwcmV2UG9zLFxuICAgICAgbGFiZWxFbmQgPSAtMSxcbiAgICAgIG1heCA9IHN0YXRlLnBvc01heCxcbiAgICAgIG9sZFBvcyA9IHN0YXRlLnBvcztcblxuICBzdGF0ZS5wb3MgPSBzdGFydCArIDE7XG4gIGxldmVsID0gMTtcblxuICB3aGlsZSAoc3RhdGUucG9zIDwgbWF4KSB7XG4gICAgbWFya2VyID0gc3RhdGUuc3JjLmNoYXJDb2RlQXQoc3RhdGUucG9zKTtcbiAgICBpZiAobWFya2VyID09PSAweDVEIC8qIF0gKi8pIHtcbiAgICAgIGxldmVsLS07XG4gICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcmV2UG9zID0gc3RhdGUucG9zO1xuICAgIHN0YXRlLm1kLmlubGluZS5za2lwVG9rZW4oc3RhdGUpO1xuICAgIGlmIChtYXJrZXIgPT09IDB4NUIgLyogWyAqLykge1xuICAgICAgaWYgKHByZXZQb3MgPT09IHN0YXRlLnBvcyAtIDEpIHtcbiAgICAgICAgLy8gaW5jcmVhc2UgbGV2ZWwgaWYgd2UgZmluZCB0ZXh0IGBbYCwgd2hpY2ggaXMgbm90IGEgcGFydCBvZiBhbnkgdG9rZW5cbiAgICAgICAgbGV2ZWwrKztcbiAgICAgIH0gZWxzZSBpZiAoZGlzYWJsZU5lc3RlZCkge1xuICAgICAgICBzdGF0ZS5wb3MgPSBvbGRQb3M7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoZm91bmQpIHtcbiAgICBsYWJlbEVuZCA9IHN0YXRlLnBvcztcbiAgfVxuXG4gIC8vIHJlc3RvcmUgb2xkIHN0YXRlXG4gIHN0YXRlLnBvcyA9IG9sZFBvcztcblxuICByZXR1cm4gbGFiZWxFbmQ7XG59O1xuIiwiLy8gUGFyc2UgbGluayB0aXRsZVxuLy9cbid1c2Ugc3RyaWN0JztcblxuXG52YXIgdW5lc2NhcGVBbGwgPSByZXF1aXJlKCcuLi9jb21tb24vdXRpbHMnKS51bmVzY2FwZUFsbDtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlTGlua1RpdGxlKHN0ciwgcG9zLCBtYXgpIHtcbiAgdmFyIGNvZGUsXG4gICAgICBtYXJrZXIsXG4gICAgICBsaW5lcyA9IDAsXG4gICAgICBzdGFydCA9IHBvcyxcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICBwb3M6IDAsXG4gICAgICAgIGxpbmVzOiAwLFxuICAgICAgICBzdHI6ICcnXG4gICAgICB9O1xuXG4gIGlmIChwb3MgPj0gbWF4KSB7IHJldHVybiByZXN1bHQ7IH1cblxuICBtYXJrZXIgPSBzdHIuY2hhckNvZGVBdChwb3MpO1xuXG4gIGlmIChtYXJrZXIgIT09IDB4MjIgLyogXCIgKi8gJiYgbWFya2VyICE9PSAweDI3IC8qICcgKi8gJiYgbWFya2VyICE9PSAweDI4IC8qICggKi8pIHsgcmV0dXJuIHJlc3VsdDsgfVxuXG4gIHBvcysrO1xuXG4gIC8vIGlmIG9wZW5pbmcgbWFya2VyIGlzIFwiKFwiLCBzd2l0Y2ggaXQgdG8gY2xvc2luZyBtYXJrZXIgXCIpXCJcbiAgaWYgKG1hcmtlciA9PT0gMHgyOCkgeyBtYXJrZXIgPSAweDI5OyB9XG5cbiAgd2hpbGUgKHBvcyA8IG1heCkge1xuICAgIGNvZGUgPSBzdHIuY2hhckNvZGVBdChwb3MpO1xuICAgIGlmIChjb2RlID09PSBtYXJrZXIpIHtcbiAgICAgIHJlc3VsdC5wb3MgPSBwb3MgKyAxO1xuICAgICAgcmVzdWx0LmxpbmVzID0gbGluZXM7XG4gICAgICByZXN1bHQuc3RyID0gdW5lc2NhcGVBbGwoc3RyLnNsaWNlKHN0YXJ0ICsgMSwgcG9zKSk7XG4gICAgICByZXN1bHQub2sgPSB0cnVlO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDB4MEEpIHtcbiAgICAgIGxpbmVzKys7XG4gICAgfSBlbHNlIGlmIChjb2RlID09PSAweDVDIC8qIFxcICovICYmIHBvcyArIDEgPCBtYXgpIHtcbiAgICAgIHBvcysrO1xuICAgICAgaWYgKHN0ci5jaGFyQ29kZUF0KHBvcykgPT09IDB4MEEpIHtcbiAgICAgICAgbGluZXMrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwb3MrKztcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiLy8gTWFpbiBwZXJzZXIgY2xhc3NcblxuJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciB1dGlscyAgICAgICAgPSByZXF1aXJlKCcuL2NvbW1vbi91dGlscycpO1xudmFyIGhlbHBlcnMgICAgICA9IHJlcXVpcmUoJy4vaGVscGVycycpO1xudmFyIFJlbmRlcmVyICAgICA9IHJlcXVpcmUoJy4vcmVuZGVyZXInKTtcbnZhciBQYXJzZXJDb3JlICAgPSByZXF1aXJlKCcuL3BhcnNlcl9jb3JlJyk7XG52YXIgUGFyc2VyQmxvY2sgID0gcmVxdWlyZSgnLi9wYXJzZXJfYmxvY2snKTtcbnZhciBQYXJzZXJJbmxpbmUgPSByZXF1aXJlKCcuL3BhcnNlcl9pbmxpbmUnKTtcbnZhciBMaW5raWZ5SXQgICAgPSByZXF1aXJlKCdsaW5raWZ5LWl0Jyk7XG52YXIgbWR1cmwgICAgICAgID0gcmVxdWlyZSgnbWR1cmwnKTtcbnZhciBwdW55Y29kZSAgICAgPSByZXF1aXJlKCdwdW55Y29kZScpO1xuXG5cbnZhciBjb25maWcgPSB7XG4gICdkZWZhdWx0JzogcmVxdWlyZSgnLi9wcmVzZXRzL2RlZmF1bHQnKSxcbiAgemVybzogcmVxdWlyZSgnLi9wcmVzZXRzL3plcm8nKSxcbiAgY29tbW9ubWFyazogcmVxdWlyZSgnLi9wcmVzZXRzL2NvbW1vbm1hcmsnKVxufTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vXG4vLyBUaGlzIHZhbGlkYXRvciBjYW4gcHJvaGliaXQgbW9yZSB0aGFuIHJlYWxseSBuZWVkZWQgdG8gcHJldmVudCBYU1MuIEl0J3MgYVxuLy8gdHJhZGVvZmYgdG8ga2VlcCBjb2RlIHNpbXBsZSBhbmQgdG8gYmUgc2VjdXJlIGJ5IGRlZmF1bHQuXG4vL1xuLy8gSWYgeW91IG5lZWQgZGlmZmVyZW50IHNldHVwIC0gb3ZlcnJpZGUgdmFsaWRhdG9yIG1ldGhvZCBhcyB5b3Ugd2lzaC4gT3Jcbi8vIHJlcGxhY2UgaXQgd2l0aCBkdW1teSBmdW5jdGlvbiBhbmQgdXNlIGV4dGVybmFsIHNhbml0aXplci5cbi8vXG5cbnZhciBCQURfUFJPVE9fUkUgPSAvXih2YnNjcmlwdHxqYXZhc2NyaXB0fGZpbGV8ZGF0YSk6LztcbnZhciBHT09EX0RBVEFfUkUgPSAvXmRhdGE6aW1hZ2VcXC8oZ2lmfHBuZ3xqcGVnfHdlYnApOy87XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTGluayh1cmwpIHtcbiAgLy8gdXJsIHNob3VsZCBiZSBub3JtYWxpemVkIGF0IHRoaXMgcG9pbnQsIGFuZCBleGlzdGluZyBlbnRpdGllcyBhcmUgZGVjb2RlZFxuICB2YXIgc3RyID0gdXJsLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuXG4gIHJldHVybiBCQURfUFJPVE9fUkUudGVzdChzdHIpID8gKEdPT0RfREFUQV9SRS50ZXN0KHN0cikgPyB0cnVlIDogZmFsc2UpIDogdHJ1ZTtcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG52YXIgUkVDT0RFX0hPU1ROQU1FX0ZPUiA9IFsgJ2h0dHA6JywgJ2h0dHBzOicsICdtYWlsdG86JyBdO1xuXG5mdW5jdGlvbiBub3JtYWxpemVMaW5rKHVybCkge1xuICB2YXIgcGFyc2VkID0gbWR1cmwucGFyc2UodXJsLCB0cnVlKTtcblxuICBpZiAocGFyc2VkLmhvc3RuYW1lKSB7XG4gICAgLy8gRW5jb2RlIGhvc3RuYW1lcyBpbiB1cmxzIGxpa2U6XG4gICAgLy8gYGh0dHA6Ly9ob3N0L2AsIGBodHRwczovL2hvc3QvYCwgYG1haWx0bzp1c2VyQGhvc3RgLCBgLy9ob3N0L2BcbiAgICAvL1xuICAgIC8vIFdlIGRvbid0IGVuY29kZSB1bmtub3duIHNjaGVtYXMsIGJlY2F1c2UgaXQncyBsaWtlbHkgdGhhdCB3ZSBlbmNvZGVcbiAgICAvLyBzb21ldGhpbmcgd2Ugc2hvdWxkbid0IChlLmcuIGBza3lwZTpuYW1lYCB0cmVhdGVkIGFzIGBza3lwZTpob3N0YClcbiAgICAvL1xuICAgIGlmICghcGFyc2VkLnByb3RvY29sIHx8IFJFQ09ERV9IT1NUTkFNRV9GT1IuaW5kZXhPZihwYXJzZWQucHJvdG9jb2wpID49IDApIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHBhcnNlZC5ob3N0bmFtZSA9IHB1bnljb2RlLnRvQVNDSUkocGFyc2VkLmhvc3RuYW1lKTtcbiAgICAgIH0gY2F0Y2goZXIpIHt9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG1kdXJsLmVuY29kZShtZHVybC5mb3JtYXQocGFyc2VkKSk7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUxpbmtUZXh0KHVybCkge1xuICB2YXIgcGFyc2VkID0gbWR1cmwucGFyc2UodXJsLCB0cnVlKTtcblxuICBpZiAocGFyc2VkLmhvc3RuYW1lKSB7XG4gICAgLy8gRW5jb2RlIGhvc3RuYW1lcyBpbiB1cmxzIGxpa2U6XG4gICAgLy8gYGh0dHA6Ly9ob3N0L2AsIGBodHRwczovL2hvc3QvYCwgYG1haWx0bzp1c2VyQGhvc3RgLCBgLy9ob3N0L2BcbiAgICAvL1xuICAgIC8vIFdlIGRvbid0IGVuY29kZSB1bmtub3duIHNjaGVtYXMsIGJlY2F1c2UgaXQncyBsaWtlbHkgdGhhdCB3ZSBlbmNvZGVcbiAgICAvLyBzb21ldGhpbmcgd2Ugc2hvdWxkbid0IChlLmcuIGBza3lwZTpuYW1lYCB0cmVhdGVkIGFzIGBza3lwZTpob3N0YClcbiAgICAvL1xuICAgIGlmICghcGFyc2VkLnByb3RvY29sIHx8IFJFQ09ERV9IT1NUTkFNRV9GT1IuaW5kZXhPZihwYXJzZWQucHJvdG9jb2wpID49IDApIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHBhcnNlZC5ob3N0bmFtZSA9IHB1bnljb2RlLnRvVW5pY29kZShwYXJzZWQuaG9zdG5hbWUpO1xuICAgICAgfSBjYXRjaChlcikge31cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWR1cmwuZGVjb2RlKG1kdXJsLmZvcm1hdChwYXJzZWQpKTtcbn1cblxuXG4vKipcbiAqIGNsYXNzIE1hcmtkb3duSXRcbiAqXG4gKiBNYWluIHBhcnNlci9yZW5kZXJlciBjbGFzcy5cbiAqXG4gKiAjIyMjIyBVc2FnZVxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIC8vIG5vZGUuanMsIFwiY2xhc3NpY1wiIHdheTpcbiAqIHZhciBNYXJrZG93bkl0ID0gcmVxdWlyZSgnbWFya2Rvd24taXQnKSxcbiAqICAgICBtZCA9IG5ldyBNYXJrZG93bkl0KCk7XG4gKiB2YXIgcmVzdWx0ID0gbWQucmVuZGVyKCcjIG1hcmtkb3duLWl0IHJ1bGV6eiEnKTtcbiAqXG4gKiAvLyBub2RlLmpzLCB0aGUgc2FtZSwgYnV0IHdpdGggc3VnYXI6XG4gKiB2YXIgbWQgPSByZXF1aXJlKCdtYXJrZG93bi1pdCcpKCk7XG4gKiB2YXIgcmVzdWx0ID0gbWQucmVuZGVyKCcjIG1hcmtkb3duLWl0IHJ1bGV6eiEnKTtcbiAqXG4gKiAvLyBicm93c2VyIHdpdGhvdXQgQU1ELCBhZGRlZCB0byBcIndpbmRvd1wiIG9uIHNjcmlwdCBsb2FkXG4gKiAvLyBOb3RlLCB0aGVyZSBhcmUgbm8gZGFzaC5cbiAqIHZhciBtZCA9IHdpbmRvdy5tYXJrZG93bml0KCk7XG4gKiB2YXIgcmVzdWx0ID0gbWQucmVuZGVyKCcjIG1hcmtkb3duLWl0IHJ1bGV6eiEnKTtcbiAqIGBgYFxuICpcbiAqIFNpbmdsZSBsaW5lIHJlbmRlcmluZywgd2l0aG91dCBwYXJhZ3JhcGggd3JhcDpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiB2YXIgbWQgPSByZXF1aXJlKCdtYXJrZG93bi1pdCcpKCk7XG4gKiB2YXIgcmVzdWx0ID0gbWQucmVuZGVySW5saW5lKCdfX21hcmtkb3duLWl0X18gcnVsZXp6IScpO1xuICogYGBgXG4gKiovXG5cbi8qKlxuICogbmV3IE1hcmtkb3duSXQoW3ByZXNldE5hbWUsIG9wdGlvbnNdKVxuICogLSBwcmVzZXROYW1lIChTdHJpbmcpOiBvcHRpb25hbCwgYGNvbW1vbm1hcmtgIC8gYHplcm9gXG4gKiAtIG9wdGlvbnMgKE9iamVjdClcbiAqXG4gKiBDcmVhdGVzIHBhcnNlciBpbnN0YW5zZSB3aXRoIGdpdmVuIGNvbmZpZy4gQ2FuIGJlIGNhbGxlZCB3aXRob3V0IGBuZXdgLlxuICpcbiAqICMjIyMjIHByZXNldE5hbWVcbiAqXG4gKiBNYXJrZG93bkl0IHByb3ZpZGVzIG5hbWVkIHByZXNldHMgYXMgYSBjb252ZW5pZW5jZSB0byBxdWlja2x5XG4gKiBlbmFibGUvZGlzYWJsZSBhY3RpdmUgc3ludGF4IHJ1bGVzIGFuZCBvcHRpb25zIGZvciBjb21tb24gdXNlIGNhc2VzLlxuICpcbiAqIC0gW1wiY29tbW9ubWFya1wiXShodHRwczovL2dpdGh1Yi5jb20vbWFya2Rvd24taXQvbWFya2Rvd24taXQvYmxvYi9tYXN0ZXIvbGliL3ByZXNldHMvY29tbW9ubWFyay5qcykgLVxuICogICBjb25maWd1cmVzIHBhcnNlciB0byBzdHJpY3QgW0NvbW1vbk1hcmtdKGh0dHA6Ly9jb21tb25tYXJrLm9yZy8pIG1vZGUuXG4gKiAtIFtkZWZhdWx0XShodHRwczovL2dpdGh1Yi5jb20vbWFya2Rvd24taXQvbWFya2Rvd24taXQvYmxvYi9tYXN0ZXIvbGliL3ByZXNldHMvZGVmYXVsdC5qcykgLVxuICogICBzaW1pbGFyIHRvIEdGTSwgdXNlZCB3aGVuIG5vIHByZXNldCBuYW1lIGdpdmVuLiBFbmFibGVzIGFsbCBhdmFpbGFibGUgcnVsZXMsXG4gKiAgIGJ1dCBzdGlsbCB3aXRob3V0IGh0bWwsIHR5cG9ncmFwaGVyICYgYXV0b2xpbmtlci5cbiAqIC0gW1wiemVyb1wiXShodHRwczovL2dpdGh1Yi5jb20vbWFya2Rvd24taXQvbWFya2Rvd24taXQvYmxvYi9tYXN0ZXIvbGliL3ByZXNldHMvemVyby5qcykgLVxuICogICBhbGwgcnVsZXMgZGlzYWJsZWQuIFVzZWZ1bCB0byBxdWlja2x5IHNldHVwIHlvdXIgY29uZmlnIHZpYSBgLmVuYWJsZSgpYC5cbiAqICAgRm9yIGV4YW1wbGUsIHdoZW4geW91IG5lZWQgb25seSBgYm9sZGAgYW5kIGBpdGFsaWNgIG1hcmt1cCBhbmQgbm90aGluZyBlbHNlLlxuICpcbiAqICMjIyMjIG9wdGlvbnM6XG4gKlxuICogLSBfX2h0bWxfXyAtIGBmYWxzZWAuIFNldCBgdHJ1ZWAgdG8gZW5hYmxlIEhUTUwgdGFncyBpbiBzb3VyY2UuIEJlIGNhcmVmdWwhXG4gKiAgIFRoYXQncyBub3Qgc2FmZSEgWW91IG1heSBuZWVkIGV4dGVybmFsIHNhbml0aXplciB0byBwcm90ZWN0IG91dHB1dCBmcm9tIFhTUy5cbiAqICAgSXQncyBiZXR0ZXIgdG8gZXh0ZW5kIGZlYXR1cmVzIHZpYSBwbHVnaW5zLCBpbnN0ZWFkIG9mIGVuYWJsaW5nIEhUTUwuXG4gKiAtIF9feGh0bWxPdXRfXyAtIGBmYWxzZWAuIFNldCBgdHJ1ZWAgdG8gYWRkICcvJyB3aGVuIGNsb3Npbmcgc2luZ2xlIHRhZ3NcbiAqICAgKGA8YnIgLz5gKS4gVGhpcyBpcyBuZWVkZWQgb25seSBmb3IgZnVsbCBDb21tb25NYXJrIGNvbXBhdGliaWxpdHkuIEluIHJlYWxcbiAqICAgd29ybGQgeW91IHdpbGwgbmVlZCBIVE1MIG91dHB1dC5cbiAqIC0gX19icmVha3NfXyAtIGBmYWxzZWAuIFNldCBgdHJ1ZWAgdG8gY29udmVydCBgXFxuYCBpbiBwYXJhZ3JhcGhzIGludG8gYDxicj5gLlxuICogLSBfX2xhbmdQcmVmaXhfXyAtIGBsYW5ndWFnZS1gLiBDU1MgbGFuZ3VhZ2UgY2xhc3MgcHJlZml4IGZvciBmZW5jZWQgYmxvY2tzLlxuICogICBDYW4gYmUgdXNlZnVsIGZvciBleHRlcm5hbCBoaWdobGlnaHRlcnMuXG4gKiAtIF9fbGlua2lmeV9fIC0gYGZhbHNlYC4gU2V0IGB0cnVlYCB0byBhdXRvY29udmVydCBVUkwtbGlrZSB0ZXh0IHRvIGxpbmtzLlxuICogLSBfX3R5cG9ncmFwaGVyX18gIC0gYGZhbHNlYC4gU2V0IGB0cnVlYCB0byBlbmFibGUgW3NvbWUgbGFuZ3VhZ2UtbmV1dHJhbFxuICogICByZXBsYWNlbWVudF0oaHR0cHM6Ly9naXRodWIuY29tL21hcmtkb3duLWl0L21hcmtkb3duLWl0L2Jsb2IvbWFzdGVyL2xpYi9ydWxlc19jb3JlL3JlcGxhY2VtZW50cy5qcykgK1xuICogICBxdW90ZXMgYmVhdXRpZmljYXRpb24gKHNtYXJ0cXVvdGVzKS5cbiAqIC0gX19xdW90ZXNfXyAtIGDigJzigJ3igJjigJlgLCBzdHJpbmcuIERvdWJsZSArIHNpbmdsZSBxdW90ZXMgcmVwbGFjZW1lbnQgcGFpcnMsIHdoZW5cbiAqICAgdHlwb2dyYXBoZXIgZW5hYmxlZCBhbmQgc21hcnRxdW90ZXMgb24uIFNldCBkb3VibGVzIHRvICfCq8K7JyBmb3IgUnVzc2lhbixcbiAqICAgJ+KAnuKAnCcgZm9yIEdlcm1hbi5cbiAqIC0gX19oaWdobGlnaHRfXyAtIGBudWxsYC4gSGlnaGxpZ2h0ZXIgZnVuY3Rpb24gZm9yIGZlbmNlZCBjb2RlIGJsb2Nrcy5cbiAqICAgSGlnaGxpZ2h0ZXIgYGZ1bmN0aW9uIChzdHIsIGxhbmcpYCBzaG91bGQgcmV0dXJuIGVzY2FwZWQgSFRNTC4gSXQgY2FuIGFsc29cbiAqICAgcmV0dXJuIGVtcHR5IHN0cmluZyBpZiB0aGUgc291cmNlIHdhcyBub3QgY2hhbmdlZCBhbmQgc2hvdWxkIGJlIGVzY2FwZWQgZXh0ZXJuYWx5LlxuICpcbiAqICMjIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiAvLyBjb21tb25tYXJrIG1vZGVcbiAqIHZhciBtZCA9IHJlcXVpcmUoJ21hcmtkb3duLWl0JykoJ2NvbW1vbm1hcmsnKTtcbiAqXG4gKiAvLyBkZWZhdWx0IG1vZGVcbiAqIHZhciBtZCA9IHJlcXVpcmUoJ21hcmtkb3duLWl0JykoKTtcbiAqXG4gKiAvLyBlbmFibGUgZXZlcnl0aGluZ1xuICogdmFyIG1kID0gcmVxdWlyZSgnbWFya2Rvd24taXQnKSh7XG4gKiAgIGh0bWw6IHRydWUsXG4gKiAgIGxpbmtpZnk6IHRydWUsXG4gKiAgIHR5cG9ncmFwaGVyOiB0cnVlXG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqICMjIyMjIFN5bnRheCBoaWdobGlnaHRpbmdcbiAqXG4gKiBgYGBqc1xuICogdmFyIGhsanMgPSByZXF1aXJlKCdoaWdobGlnaHQuanMnKSAvLyBodHRwczovL2hpZ2hsaWdodGpzLm9yZy9cbiAqXG4gKiB2YXIgbWQgPSByZXF1aXJlKCdtYXJrZG93bi1pdCcpKHtcbiAqICAgaGlnaGxpZ2h0OiBmdW5jdGlvbiAoc3RyLCBsYW5nKSB7XG4gKiAgICAgaWYgKGxhbmcgJiYgaGxqcy5nZXRMYW5ndWFnZShsYW5nKSkge1xuICogICAgICAgdHJ5IHtcbiAqICAgICAgICAgcmV0dXJuIGhsanMuaGlnaGxpZ2h0KGxhbmcsIHN0cikudmFsdWU7XG4gKiAgICAgICB9IGNhdGNoIChfXykge31cbiAqICAgICB9XG4gKlxuICogICAgIHRyeSB7XG4gKiAgICAgICByZXR1cm4gaGxqcy5oaWdobGlnaHRBdXRvKHN0cikudmFsdWU7XG4gKiAgICAgfSBjYXRjaCAoX18pIHt9XG4gKlxuICogICAgIHJldHVybiAnJzsgLy8gdXNlIGV4dGVybmFsIGRlZmF1bHQgZXNjYXBpbmdcbiAqICAgfVxuICogfSk7XG4gKiBgYGBcbiAqKi9cbmZ1bmN0aW9uIE1hcmtkb3duSXQocHJlc2V0TmFtZSwgb3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgTWFya2Rvd25JdCkpIHtcbiAgICByZXR1cm4gbmV3IE1hcmtkb3duSXQocHJlc2V0TmFtZSwgb3B0aW9ucyk7XG4gIH1cblxuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBpZiAoIXV0aWxzLmlzU3RyaW5nKHByZXNldE5hbWUpKSB7XG4gICAgICBvcHRpb25zID0gcHJlc2V0TmFtZSB8fCB7fTtcbiAgICAgIHByZXNldE5hbWUgPSAnZGVmYXVsdCc7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1hcmtkb3duSXQjaW5saW5lIC0+IFBhcnNlcklubGluZVxuICAgKlxuICAgKiBJbnN0YW5jZSBvZiBbW1BhcnNlcklubGluZV1dLiBZb3UgbWF5IG5lZWQgaXQgdG8gYWRkIG5ldyBydWxlcyB3aGVuXG4gICAqIHdyaXRpbmcgcGx1Z2lucy4gRm9yIHNpbXBsZSBydWxlcyBjb250cm9sIHVzZSBbW01hcmtkb3duSXQuZGlzYWJsZV1dIGFuZFxuICAgKiBbW01hcmtkb3duSXQuZW5hYmxlXV0uXG4gICAqKi9cbiAgdGhpcy5pbmxpbmUgPSBuZXcgUGFyc2VySW5saW5lKCk7XG5cbiAgLyoqXG4gICAqIE1hcmtkb3duSXQjYmxvY2sgLT4gUGFyc2VyQmxvY2tcbiAgICpcbiAgICogSW5zdGFuY2Ugb2YgW1tQYXJzZXJCbG9ja11dLiBZb3UgbWF5IG5lZWQgaXQgdG8gYWRkIG5ldyBydWxlcyB3aGVuXG4gICAqIHdyaXRpbmcgcGx1Z2lucy4gRm9yIHNpbXBsZSBydWxlcyBjb250cm9sIHVzZSBbW01hcmtkb3duSXQuZGlzYWJsZV1dIGFuZFxuICAgKiBbW01hcmtkb3duSXQuZW5hYmxlXV0uXG4gICAqKi9cbiAgdGhpcy5ibG9jayA9IG5ldyBQYXJzZXJCbG9jaygpO1xuXG4gIC8qKlxuICAgKiBNYXJrZG93bkl0I2NvcmUgLT4gQ29yZVxuICAgKlxuICAgKiBJbnN0YW5jZSBvZiBbW0NvcmVdXSBjaGFpbiBleGVjdXRvci4gWW91IG1heSBuZWVkIGl0IHRvIGFkZCBuZXcgcnVsZXMgd2hlblxuICAgKiB3cml0aW5nIHBsdWdpbnMuIEZvciBzaW1wbGUgcnVsZXMgY29udHJvbCB1c2UgW1tNYXJrZG93bkl0LmRpc2FibGVdXSBhbmRcbiAgICogW1tNYXJrZG93bkl0LmVuYWJsZV1dLlxuICAgKiovXG4gIHRoaXMuY29yZSA9IG5ldyBQYXJzZXJDb3JlKCk7XG5cbiAgLyoqXG4gICAqIE1hcmtkb3duSXQjcmVuZGVyZXIgLT4gUmVuZGVyZXJcbiAgICpcbiAgICogSW5zdGFuY2Ugb2YgW1tSZW5kZXJlcl1dLiBVc2UgaXQgdG8gbW9kaWZ5IG91dHB1dCBsb29rLiBPciB0byBhZGQgcmVuZGVyaW5nXG4gICAqIHJ1bGVzIGZvciBuZXcgdG9rZW4gdHlwZXMsIGdlbmVyYXRlZCBieSBwbHVnaW5zLlxuICAgKlxuICAgKiAjIyMjIyBFeGFtcGxlXG4gICAqXG4gICAqIGBgYGphdmFzY3JpcHRcbiAgICogdmFyIG1kID0gcmVxdWlyZSgnbWFya2Rvd24taXQnKSgpO1xuICAgKlxuICAgKiBmdW5jdGlvbiBteVRva2VuKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNlbGYpIHtcbiAgICogICAvLy4uLlxuICAgKiAgIHJldHVybiByZXN1bHQ7XG4gICAqIH07XG4gICAqXG4gICAqIG1kLnJlbmRlcmVyLnJ1bGVzWydteV90b2tlbiddID0gbXlUb2tlblxuICAgKiBgYGBcbiAgICpcbiAgICogU2VlIFtbUmVuZGVyZXJdXSBkb2NzIGFuZCBbc291cmNlIGNvZGVdKGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJrZG93bi1pdC9tYXJrZG93bi1pdC9ibG9iL21hc3Rlci9saWIvcmVuZGVyZXIuanMpLlxuICAgKiovXG4gIHRoaXMucmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIoKTtcblxuICAvKipcbiAgICogTWFya2Rvd25JdCNsaW5raWZ5IC0+IExpbmtpZnlJdFxuICAgKlxuICAgKiBbbGlua2lmeS1pdF0oaHR0cHM6Ly9naXRodWIuY29tL21hcmtkb3duLWl0L2xpbmtpZnktaXQpIGluc3RhbmNlLlxuICAgKiBVc2VkIGJ5IFtsaW5raWZ5XShodHRwczovL2dpdGh1Yi5jb20vbWFya2Rvd24taXQvbWFya2Rvd24taXQvYmxvYi9tYXN0ZXIvbGliL3J1bGVzX2NvcmUvbGlua2lmeS5qcylcbiAgICogcnVsZS5cbiAgICoqL1xuICB0aGlzLmxpbmtpZnkgPSBuZXcgTGlua2lmeUl0KCk7XG5cbiAgLyoqXG4gICAqIE1hcmtkb3duSXQjdmFsaWRhdGVMaW5rKHVybCkgLT4gQm9vbGVhblxuICAgKlxuICAgKiBMaW5rIHZhbGlkYXRpb24gZnVuY3Rpb24uIENvbW1vbk1hcmsgYWxsb3dzIHRvbyBtdWNoIGluIGxpbmtzLiBCeSBkZWZhdWx0XG4gICAqIHdlIGRpc2FibGUgYGphdmFzY3JpcHQ6YCBhbmQgYHZic2NyaXB0OmAgc2NoZW1hcy4gWW91IGNhbiBjaGFuZ2UgdGhpc1xuICAgKiBiZWhhdmlvdXIuXG4gICAqXG4gICAqIGBgYGphdmFzY3JpcHRcbiAgICogdmFyIG1kID0gcmVxdWlyZSgnbWFya2Rvd24taXQnKSgpO1xuICAgKiAvLyBlbmFibGUgZXZlcnl0aGluZ1xuICAgKiBtZC52YWxpZGF0ZUxpbmsgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0cnVlOyB9XG4gICAqIGBgYFxuICAgKiovXG4gIHRoaXMudmFsaWRhdGVMaW5rID0gdmFsaWRhdGVMaW5rO1xuXG4gIC8qKlxuICAgKiBNYXJrZG93bkl0I25vcm1hbGl6ZUxpbmsodXJsKSAtPiBTdHJpbmdcbiAgICpcbiAgICogRnVuY3Rpb24gdXNlZCB0byBlbmNvZGUgbGluayB1cmwgdG8gYSBtYWNoaW5lLXJlYWRhYmxlIGZvcm1hdCxcbiAgICogd2hpY2ggaW5jbHVkZXMgdXJsLWVuY29kaW5nLCBwdW55Y29kZSwgZXRjLlxuICAgKiovXG4gIHRoaXMubm9ybWFsaXplTGluayA9IG5vcm1hbGl6ZUxpbms7XG5cbiAgLyoqXG4gICAqIE1hcmtkb3duSXQjbm9ybWFsaXplTGlua1RleHQodXJsKSAtPiBTdHJpbmdcbiAgICpcbiAgICogRnVuY3Rpb24gdXNlZCB0byBkZWNvZGUgbGluayB1cmwgdG8gYSBodW1hbi1yZWFkYWJsZSBmb3JtYXRgXG4gICAqKi9cbiAgdGhpcy5ub3JtYWxpemVMaW5rVGV4dCA9IG5vcm1hbGl6ZUxpbmtUZXh0O1xuXG5cbiAgLy8gRXhwb3NlIHV0aWxzICYgaGVscGVycyBmb3IgZWFzeSBhY2NlcyBmcm9tIHBsdWdpbnNcblxuICAvKipcbiAgICogTWFya2Rvd25JdCN1dGlscyAtPiB1dGlsc1xuICAgKlxuICAgKiBBc3NvcnRlZCB1dGlsaXR5IGZ1bmN0aW9ucywgdXNlZnVsIHRvIHdyaXRlIHBsdWdpbnMuIFNlZSBkZXRhaWxzXG4gICAqIFtoZXJlXShodHRwczovL2dpdGh1Yi5jb20vbWFya2Rvd24taXQvbWFya2Rvd24taXQvYmxvYi9tYXN0ZXIvbGliL2NvbW1vbi91dGlscy5qcykuXG4gICAqKi9cbiAgdGhpcy51dGlscyA9IHV0aWxzO1xuXG4gIC8qKlxuICAgKiBNYXJrZG93bkl0I2hlbHBlcnMgLT4gaGVscGVyc1xuICAgKlxuICAgKiBMaW5rIGNvbXBvbmVudHMgcGFyc2VyIGZ1bmN0aW9ucywgdXNlZnVsIHRvIHdyaXRlIHBsdWdpbnMuIFNlZSBkZXRhaWxzXG4gICAqIFtoZXJlXShodHRwczovL2dpdGh1Yi5jb20vbWFya2Rvd24taXQvbWFya2Rvd24taXQvYmxvYi9tYXN0ZXIvbGliL2hlbHBlcnMpLlxuICAgKiovXG4gIHRoaXMuaGVscGVycyA9IGhlbHBlcnM7XG5cblxuICB0aGlzLm9wdGlvbnMgPSB7fTtcbiAgdGhpcy5jb25maWd1cmUocHJlc2V0TmFtZSk7XG5cbiAgaWYgKG9wdGlvbnMpIHsgdGhpcy5zZXQob3B0aW9ucyk7IH1cbn1cblxuXG4vKiogY2hhaW5hYmxlXG4gKiBNYXJrZG93bkl0LnNldChvcHRpb25zKVxuICpcbiAqIFNldCBwYXJzZXIgb3B0aW9ucyAoaW4gdGhlIHNhbWUgZm9ybWF0IGFzIGluIGNvbnN0cnVjdG9yKS4gUHJvYmFibHksIHlvdVxuICogd2lsbCBuZXZlciBuZWVkIGl0LCBidXQgeW91IGNhbiBjaGFuZ2Ugb3B0aW9ucyBhZnRlciBjb25zdHJ1Y3RvciBjYWxsLlxuICpcbiAqICMjIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiB2YXIgbWQgPSByZXF1aXJlKCdtYXJrZG93bi1pdCcpKClcbiAqICAgICAgICAgICAgIC5zZXQoeyBodG1sOiB0cnVlLCBicmVha3M6IHRydWUgfSlcbiAqICAgICAgICAgICAgIC5zZXQoeyB0eXBvZ3JhcGhlciwgdHJ1ZSB9KTtcbiAqIGBgYFxuICpcbiAqIF9fTm90ZTpfXyBUbyBhY2hpZXZlIHRoZSBiZXN0IHBvc3NpYmxlIHBlcmZvcm1hbmNlLCBkb24ndCBtb2RpZnkgYVxuICogYG1hcmtkb3duLWl0YCBpbnN0YW5jZSBvcHRpb25zIG9uIHRoZSBmbHkuIElmIHlvdSBuZWVkIG11bHRpcGxlIGNvbmZpZ3VyYXRpb25zXG4gKiBpdCdzIGJlc3QgdG8gY3JlYXRlIG11bHRpcGxlIGluc3RhbmNlcyBhbmQgaW5pdGlhbGl6ZSBlYWNoIHdpdGggc2VwYXJhdGVcbiAqIGNvbmZpZy5cbiAqKi9cbk1hcmtkb3duSXQucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIHV0aWxzLmFzc2lnbih0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuICByZXR1cm4gdGhpcztcbn07XG5cblxuLyoqIGNoYWluYWJsZSwgaW50ZXJuYWxcbiAqIE1hcmtkb3duSXQuY29uZmlndXJlKHByZXNldHMpXG4gKlxuICogQmF0Y2ggbG9hZCBvZiBhbGwgb3B0aW9ucyBhbmQgY29tcGVuZW50IHNldHRpbmdzLiBUaGlzIGlzIGludGVybmFsIG1ldGhvZCxcbiAqIGFuZCB5b3UgcHJvYmFibHkgd2lsbCBub3QgbmVlZCBpdC4gQnV0IGlmIHlvdSB3aXRoIC0gc2VlIGF2YWlsYWJsZSBwcmVzZXRzXG4gKiBhbmQgZGF0YSBzdHJ1Y3R1cmUgW2hlcmVdKGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJrZG93bi1pdC9tYXJrZG93bi1pdC90cmVlL21hc3Rlci9saWIvcHJlc2V0cylcbiAqXG4gKiBXZSBzdHJvbmdseSByZWNvbW1lbmQgdG8gdXNlIHByZXNldHMgaW5zdGVhZCBvZiBkaXJlY3QgY29uZmlnIGxvYWRzLiBUaGF0XG4gKiB3aWxsIGdpdmUgYmV0dGVyIGNvbXBhdGliaWxpdHkgd2l0aCBuZXh0IHZlcnNpb25zLlxuICoqL1xuTWFya2Rvd25JdC5wcm90b3R5cGUuY29uZmlndXJlID0gZnVuY3Rpb24gKHByZXNldHMpIHtcbiAgdmFyIHNlbGYgPSB0aGlzLCBwcmVzZXROYW1lO1xuXG4gIGlmICh1dGlscy5pc1N0cmluZyhwcmVzZXRzKSkge1xuICAgIHByZXNldE5hbWUgPSBwcmVzZXRzO1xuICAgIHByZXNldHMgPSBjb25maWdbcHJlc2V0TmFtZV07XG4gICAgaWYgKCFwcmVzZXRzKSB7IHRocm93IG5ldyBFcnJvcignV3JvbmcgYG1hcmtkb3duLWl0YCBwcmVzZXQgXCInICsgcHJlc2V0TmFtZSArICdcIiwgY2hlY2sgbmFtZScpOyB9XG4gIH1cblxuICBpZiAoIXByZXNldHMpIHsgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBgbWFya2Rvd24taXRgIHByZXNldCwgY2FuXFwndCBiZSBlbXB0eScpOyB9XG5cbiAgaWYgKHByZXNldHMub3B0aW9ucykgeyBzZWxmLnNldChwcmVzZXRzLm9wdGlvbnMpOyB9XG5cbiAgaWYgKHByZXNldHMuY29tcG9uZW50cykge1xuICAgIE9iamVjdC5rZXlzKHByZXNldHMuY29tcG9uZW50cykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgaWYgKHByZXNldHMuY29tcG9uZW50c1tuYW1lXS5ydWxlcykge1xuICAgICAgICBzZWxmW25hbWVdLnJ1bGVyLmVuYWJsZU9ubHkocHJlc2V0cy5jb21wb25lbnRzW25hbWVdLnJ1bGVzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cblxuLyoqIGNoYWluYWJsZVxuICogTWFya2Rvd25JdC5lbmFibGUobGlzdCwgaWdub3JlSW52YWxpZClcbiAqIC0gbGlzdCAoU3RyaW5nfEFycmF5KTogcnVsZSBuYW1lIG9yIGxpc3Qgb2YgcnVsZSBuYW1lcyB0byBlbmFibGVcbiAqIC0gaWdub3JlSW52YWxpZCAoQm9vbGVhbik6IHNldCBgdHJ1ZWAgdG8gaWdub3JlIGVycm9ycyB3aGVuIHJ1bGUgbm90IGZvdW5kLlxuICpcbiAqIEVuYWJsZSBsaXN0IG9yIHJ1bGVzLiBJdCB3aWxsIGF1dG9tYXRpY2FsbHkgZmluZCBhcHByb3ByaWF0ZSBjb21wb25lbnRzLFxuICogY29udGFpbmluZyBydWxlcyB3aXRoIGdpdmVuIG5hbWVzLiBJZiBydWxlIG5vdCBmb3VuZCwgYW5kIGBpZ25vcmVJbnZhbGlkYFxuICogbm90IHNldCAtIHRocm93cyBleGNlcHRpb24uXG4gKlxuICogIyMjIyMgRXhhbXBsZVxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIHZhciBtZCA9IHJlcXVpcmUoJ21hcmtkb3duLWl0JykoKVxuICogICAgICAgICAgICAgLmVuYWJsZShbJ3N1YicsICdzdXAnXSlcbiAqICAgICAgICAgICAgIC5kaXNhYmxlKCdzbWFydHF1b3RlcycpO1xuICogYGBgXG4gKiovXG5NYXJrZG93bkl0LnByb3RvdHlwZS5lbmFibGUgPSBmdW5jdGlvbiAobGlzdCwgaWdub3JlSW52YWxpZCkge1xuICB2YXIgcmVzdWx0ID0gW107XG5cbiAgaWYgKCFBcnJheS5pc0FycmF5KGxpc3QpKSB7IGxpc3QgPSBbIGxpc3QgXTsgfVxuXG4gIFsgJ2NvcmUnLCAnYmxvY2snLCAnaW5saW5lJyBdLmZvckVhY2goZnVuY3Rpb24gKGNoYWluKSB7XG4gICAgcmVzdWx0ID0gcmVzdWx0LmNvbmNhdCh0aGlzW2NoYWluXS5ydWxlci5lbmFibGUobGlzdCwgdHJ1ZSkpO1xuICB9LCB0aGlzKTtcblxuICB2YXIgbWlzc2VkID0gbGlzdC5maWx0ZXIoZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIHJlc3VsdC5pbmRleE9mKG5hbWUpIDwgMDsgfSk7XG5cbiAgaWYgKG1pc3NlZC5sZW5ndGggJiYgIWlnbm9yZUludmFsaWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01hcmtkb3duSXQuIEZhaWxlZCB0byBlbmFibGUgdW5rbm93biBydWxlKHMpOiAnICsgbWlzc2VkKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuXG4vKiogY2hhaW5hYmxlXG4gKiBNYXJrZG93bkl0LmRpc2FibGUobGlzdCwgaWdub3JlSW52YWxpZClcbiAqIC0gbGlzdCAoU3RyaW5nfEFycmF5KTogcnVsZSBuYW1lIG9yIGxpc3Qgb2YgcnVsZSBuYW1lcyB0byBkaXNhYmxlLlxuICogLSBpZ25vcmVJbnZhbGlkIChCb29sZWFuKTogc2V0IGB0cnVlYCB0byBpZ25vcmUgZXJyb3JzIHdoZW4gcnVsZSBub3QgZm91bmQuXG4gKlxuICogVGhlIHNhbWUgYXMgW1tNYXJrZG93bkl0LmVuYWJsZV1dLCBidXQgdHVybiBzcGVjaWZpZWQgcnVsZXMgb2ZmLlxuICoqL1xuTWFya2Rvd25JdC5wcm90b3R5cGUuZGlzYWJsZSA9IGZ1bmN0aW9uIChsaXN0LCBpZ25vcmVJbnZhbGlkKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcblxuICBpZiAoIUFycmF5LmlzQXJyYXkobGlzdCkpIHsgbGlzdCA9IFsgbGlzdCBdOyB9XG5cbiAgWyAnY29yZScsICdibG9jaycsICdpbmxpbmUnIF0uZm9yRWFjaChmdW5jdGlvbiAoY2hhaW4pIHtcbiAgICByZXN1bHQgPSByZXN1bHQuY29uY2F0KHRoaXNbY2hhaW5dLnJ1bGVyLmRpc2FibGUobGlzdCwgdHJ1ZSkpO1xuICB9LCB0aGlzKTtcblxuICB2YXIgbWlzc2VkID0gbGlzdC5maWx0ZXIoZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIHJlc3VsdC5pbmRleE9mKG5hbWUpIDwgMDsgfSk7XG5cbiAgaWYgKG1pc3NlZC5sZW5ndGggJiYgIWlnbm9yZUludmFsaWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01hcmtkb3duSXQuIEZhaWxlZCB0byBkaXNhYmxlIHVua25vd24gcnVsZShzKTogJyArIG1pc3NlZCk7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cbi8qKiBjaGFpbmFibGVcbiAqIE1hcmtkb3duSXQudXNlKHBsdWdpbiwgcGFyYW1zKVxuICpcbiAqIExvYWQgc3BlY2lmaWVkIHBsdWdpbiB3aXRoIGdpdmVuIHBhcmFtcyBpbnRvIGN1cnJlbnQgcGFyc2VyIGluc3RhbmNlLlxuICogSXQncyBqdXN0IGEgc3VnYXIgdG8gY2FsbCBgcGx1Z2luKG1kLCBwYXJhbXMpYCB3aXRoIGN1cnJpbmcuXG4gKlxuICogIyMjIyMgRXhhbXBsZVxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIHZhciBpdGVyYXRvciA9IHJlcXVpcmUoJ21hcmtkb3duLWl0LWZvci1pbmxpbmUnKTtcbiAqIHZhciBtZCA9IHJlcXVpcmUoJ21hcmtkb3duLWl0JykoKVxuICogICAgICAgICAgICAgLnVzZShpdGVyYXRvciwgJ2Zvb19yZXBsYWNlJywgJ3RleHQnLCBmdW5jdGlvbiAodG9rZW5zLCBpZHgpIHtcbiAqICAgICAgICAgICAgICAgdG9rZW5zW2lkeF0uY29udGVudCA9IHRva2Vuc1tpZHhdLmNvbnRlbnQucmVwbGFjZSgvZm9vL2csICdiYXInKTtcbiAqICAgICAgICAgICAgIH0pO1xuICogYGBgXG4gKiovXG5NYXJrZG93bkl0LnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiAocGx1Z2luIC8qLCBwYXJhbXMsIC4uLiAqLykge1xuICB2YXIgYXJncyA9IFsgdGhpcyBdLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgcGx1Z2luLmFwcGx5KHBsdWdpbiwgYXJncyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuXG4vKiogaW50ZXJuYWxcbiAqIE1hcmtkb3duSXQucGFyc2Uoc3JjLCBlbnYpIC0+IEFycmF5XG4gKiAtIHNyYyAoU3RyaW5nKTogc291cmNlIHN0cmluZ1xuICogLSBlbnYgKE9iamVjdCk6IGVudmlyb25tZW50IHNhbmRib3hcbiAqXG4gKiBQYXJzZSBpbnB1dCBzdHJpbmcgYW5kIHJldHVybnMgbGlzdCBvZiBibG9jayB0b2tlbnMgKHNwZWNpYWwgdG9rZW4gdHlwZVxuICogXCJpbmxpbmVcIiB3aWxsIGNvbnRhaW4gbGlzdCBvZiBpbmxpbmUgdG9rZW5zKS4gWW91IHNob3VsZCBub3QgY2FsbCB0aGlzXG4gKiBtZXRob2QgZGlyZWN0bHksIHVudGlsIHlvdSB3cml0ZSBjdXN0b20gcmVuZGVyZXIgKGZvciBleGFtcGxlLCB0byBwcm9kdWNlXG4gKiBBU1QpLlxuICpcbiAqIGBlbnZgIGlzIHVzZWQgdG8gcGFzcyBkYXRhIGJldHdlZW4gXCJkaXN0cmlidXRlZFwiIHJ1bGVzIGFuZCByZXR1cm4gYWRkaXRpb25hbFxuICogbWV0YWRhdGEgbGlrZSByZWZlcmVuY2UgaW5mbywgbmVlZGVkIGZvciBmb3IgcmVuZGVyZXIuIEl0IGFsc28gY2FuIGJlIHVzZWQgdG9cbiAqIGluamVjdCBkYXRhIGluIHNwZWNpZmljIGNhc2VzLiBVc3VhbGx5LCB5b3Ugd2lsbCBiZSBvayB0byBwYXNzIGB7fWAsXG4gKiBhbmQgdGhlbiBwYXNzIHVwZGF0ZWQgb2JqZWN0IHRvIHJlbmRlcmVyLlxuICoqL1xuTWFya2Rvd25JdC5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiAoc3JjLCBlbnYpIHtcbiAgdmFyIHN0YXRlID0gbmV3IHRoaXMuY29yZS5TdGF0ZShzcmMsIHRoaXMsIGVudik7XG5cbiAgdGhpcy5jb3JlLnByb2Nlc3Moc3RhdGUpO1xuXG4gIHJldHVybiBzdGF0ZS50b2tlbnM7XG59O1xuXG5cbi8qKlxuICogTWFya2Rvd25JdC5yZW5kZXIoc3JjIFssIGVudl0pIC0+IFN0cmluZ1xuICogLSBzcmMgKFN0cmluZyk6IHNvdXJjZSBzdHJpbmdcbiAqIC0gZW52IChPYmplY3QpOiBlbnZpcm9ubWVudCBzYW5kYm94XG4gKlxuICogUmVuZGVyIG1hcmtkb3duIHN0cmluZyBpbnRvIGh0bWwuIEl0IGRvZXMgYWxsIG1hZ2ljIGZvciB5b3UgOikuXG4gKlxuICogYGVudmAgY2FuIGJlIHVzZWQgdG8gaW5qZWN0IGFkZGl0aW9uYWwgbWV0YWRhdGEgKGB7fWAgYnkgZGVmYXVsdCkuXG4gKiBCdXQgeW91IHdpbGwgbm90IG5lZWQgaXQgd2l0aCBoaWdoIHByb2JhYmlsaXR5LiBTZWUgYWxzbyBjb21tZW50XG4gKiBpbiBbW01hcmtkb3duSXQucGFyc2VdXS5cbiAqKi9cbk1hcmtkb3duSXQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChzcmMsIGVudikge1xuICBlbnYgPSBlbnYgfHwge307XG5cbiAgcmV0dXJuIHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMucGFyc2Uoc3JjLCBlbnYpLCB0aGlzLm9wdGlvbnMsIGVudik7XG59O1xuXG5cbi8qKiBpbnRlcm5hbFxuICogTWFya2Rvd25JdC5wYXJzZUlubGluZShzcmMsIGVudikgLT4gQXJyYXlcbiAqIC0gc3JjIChTdHJpbmcpOiBzb3VyY2Ugc3RyaW5nXG4gKiAtIGVudiAoT2JqZWN0KTogZW52aXJvbm1lbnQgc2FuZGJveFxuICpcbiAqIFRoZSBzYW1lIGFzIFtbTWFya2Rvd25JdC5wYXJzZV1dIGJ1dCBza2lwIGFsbCBibG9jayBydWxlcy4gSXQgcmV0dXJucyB0aGVcbiAqIGJsb2NrIHRva2VucyBsaXN0IHdpdGggdGhlIHNpbmdsZSBgaW5saW5lYCBlbGVtZW50LCBjb250YWluaW5nIHBhcnNlZCBpbmxpbmVcbiAqIHRva2VucyBpbiBgY2hpbGRyZW5gIHByb3BlcnR5LiBBbHNvIHVwZGF0ZXMgYGVudmAgb2JqZWN0LlxuICoqL1xuTWFya2Rvd25JdC5wcm90b3R5cGUucGFyc2VJbmxpbmUgPSBmdW5jdGlvbiAoc3JjLCBlbnYpIHtcbiAgdmFyIHN0YXRlID0gbmV3IHRoaXMuY29yZS5TdGF0ZShzcmMsIHRoaXMsIGVudik7XG5cbiAgc3RhdGUuaW5saW5lTW9kZSA9IHRydWU7XG4gIHRoaXMuY29yZS5wcm9jZXNzKHN0YXRlKTtcblxuICByZXR1cm4gc3RhdGUudG9rZW5zO1xufTtcblxuXG4vKipcbiAqIE1hcmtkb3duSXQucmVuZGVySW5saW5lKHNyYyBbLCBlbnZdKSAtPiBTdHJpbmdcbiAqIC0gc3JjIChTdHJpbmcpOiBzb3VyY2Ugc3RyaW5nXG4gKiAtIGVudiAoT2JqZWN0KTogZW52aXJvbm1lbnQgc2FuZGJveFxuICpcbiAqIFNpbWlsYXIgdG8gW1tNYXJrZG93bkl0LnJlbmRlcl1dIGJ1dCBmb3Igc2luZ2xlIHBhcmFncmFwaCBjb250ZW50LiBSZXN1bHRcbiAqIHdpbGwgTk9UIGJlIHdyYXBwZWQgaW50byBgPHA+YCB0YWdzLlxuICoqL1xuTWFya2Rvd25JdC5wcm90b3R5cGUucmVuZGVySW5saW5lID0gZnVuY3Rpb24gKHNyYywgZW52KSB7XG4gIGVudiA9IGVudiB8fCB7fTtcblxuICByZXR1cm4gdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5wYXJzZUlubGluZShzcmMsIGVudiksIHRoaXMub3B0aW9ucywgZW52KTtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBNYXJrZG93bkl0O1xuIiwiLyoqIGludGVybmFsXG4gKiBjbGFzcyBQYXJzZXJCbG9ja1xuICpcbiAqIEJsb2NrLWxldmVsIHRva2VuaXplci5cbiAqKi9cbid1c2Ugc3RyaWN0JztcblxuXG52YXIgUnVsZXIgICAgICAgICAgID0gcmVxdWlyZSgnLi9ydWxlcicpO1xuXG5cbnZhciBfcnVsZXMgPSBbXG4gIC8vIEZpcnN0IDIgcGFyYW1zIC0gcnVsZSBuYW1lICYgc291cmNlLiBTZWNvbmRhcnkgYXJyYXkgLSBsaXN0IG9mIHJ1bGVzLFxuICAvLyB3aGljaCBjYW4gYmUgdGVybWluYXRlZCBieSB0aGlzIG9uZS5cbiAgWyAnY29kZScsICAgICAgIHJlcXVpcmUoJy4vcnVsZXNfYmxvY2svY29kZScpIF0sXG4gIFsgJ2ZlbmNlJywgICAgICByZXF1aXJlKCcuL3J1bGVzX2Jsb2NrL2ZlbmNlJyksICAgICAgWyAncGFyYWdyYXBoJywgJ3JlZmVyZW5jZScsICdibG9ja3F1b3RlJywgJ2xpc3QnIF0gXSxcbiAgWyAnYmxvY2txdW90ZScsIHJlcXVpcmUoJy4vcnVsZXNfYmxvY2svYmxvY2txdW90ZScpLCBbICdwYXJhZ3JhcGgnLCAncmVmZXJlbmNlJywgJ2xpc3QnIF0gXSxcbiAgWyAnaHInLCAgICAgICAgIHJlcXVpcmUoJy4vcnVsZXNfYmxvY2svaHInKSwgICAgICAgICBbICdwYXJhZ3JhcGgnLCAncmVmZXJlbmNlJywgJ2Jsb2NrcXVvdGUnLCAnbGlzdCcgXSBdLFxuICBbICdsaXN0JywgICAgICAgcmVxdWlyZSgnLi9ydWxlc19ibG9jay9saXN0JyksICAgICAgIFsgJ3BhcmFncmFwaCcsICdyZWZlcmVuY2UnLCAnYmxvY2txdW90ZScgXSBdLFxuICBbICdyZWZlcmVuY2UnLCAgcmVxdWlyZSgnLi9ydWxlc19ibG9jay9yZWZlcmVuY2UnKSBdLFxuICBbICdoZWFkaW5nJywgICAgcmVxdWlyZSgnLi9ydWxlc19ibG9jay9oZWFkaW5nJyksICAgIFsgJ3BhcmFncmFwaCcsICdyZWZlcmVuY2UnLCAnYmxvY2txdW90ZScgXSBdLFxuICBbICdsaGVhZGluZycsICAgcmVxdWlyZSgnLi9ydWxlc19ibG9jay9saGVhZGluZycpIF0sXG4gIFsgJ2h0bWxfYmxvY2snLCByZXF1aXJlKCcuL3J1bGVzX2Jsb2NrL2h0bWxfYmxvY2snKSwgWyAncGFyYWdyYXBoJywgJ3JlZmVyZW5jZScsICdibG9ja3F1b3RlJyBdIF0sXG4gIFsgJ3RhYmxlJywgICAgICByZXF1aXJlKCcuL3J1bGVzX2Jsb2NrL3RhYmxlJyksICAgICAgWyAncGFyYWdyYXBoJywgJ3JlZmVyZW5jZScgXSBdLFxuICBbICdwYXJhZ3JhcGgnLCAgcmVxdWlyZSgnLi9ydWxlc19ibG9jay9wYXJhZ3JhcGgnKSBdXG5dO1xuXG5cbi8qKlxuICogbmV3IFBhcnNlckJsb2NrKClcbiAqKi9cbmZ1bmN0aW9uIFBhcnNlckJsb2NrKCkge1xuICAvKipcbiAgICogUGFyc2VyQmxvY2sjcnVsZXIgLT4gUnVsZXJcbiAgICpcbiAgICogW1tSdWxlcl1dIGluc3RhbmNlLiBLZWVwIGNvbmZpZ3VyYXRpb24gb2YgYmxvY2sgcnVsZXMuXG4gICAqKi9cbiAgdGhpcy5ydWxlciA9IG5ldyBSdWxlcigpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgX3J1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdGhpcy5ydWxlci5wdXNoKF9ydWxlc1tpXVswXSwgX3J1bGVzW2ldWzFdLCB7IGFsdDogKF9ydWxlc1tpXVsyXSB8fCBbXSkuc2xpY2UoKSB9KTtcbiAgfVxufVxuXG5cbi8vIEdlbmVyYXRlIHRva2VucyBmb3IgaW5wdXQgcmFuZ2Vcbi8vXG5QYXJzZXJCbG9jay5wcm90b3R5cGUudG9rZW5pemUgPSBmdW5jdGlvbiAoc3RhdGUsIHN0YXJ0TGluZSwgZW5kTGluZSkge1xuICB2YXIgb2ssIGksXG4gICAgICBydWxlcyA9IHRoaXMucnVsZXIuZ2V0UnVsZXMoJycpLFxuICAgICAgbGVuID0gcnVsZXMubGVuZ3RoLFxuICAgICAgbGluZSA9IHN0YXJ0TGluZSxcbiAgICAgIGhhc0VtcHR5TGluZXMgPSBmYWxzZSxcbiAgICAgIG1heE5lc3RpbmcgPSBzdGF0ZS5tZC5vcHRpb25zLm1heE5lc3Rpbmc7XG5cbiAgd2hpbGUgKGxpbmUgPCBlbmRMaW5lKSB7XG4gICAgc3RhdGUubGluZSA9IGxpbmUgPSBzdGF0ZS5za2lwRW1wdHlMaW5lcyhsaW5lKTtcbiAgICBpZiAobGluZSA+PSBlbmRMaW5lKSB7IGJyZWFrOyB9XG5cbiAgICAvLyBUZXJtaW5hdGlvbiBjb25kaXRpb24gZm9yIG5lc3RlZCBjYWxscy5cbiAgICAvLyBOZXN0ZWQgY2FsbHMgY3VycmVudGx5IHVzZWQgZm9yIGJsb2NrcXVvdGVzICYgbGlzdHNcbiAgICBpZiAoc3RhdGUudFNoaWZ0W2xpbmVdIDwgc3RhdGUuYmxrSW5kZW50KSB7IGJyZWFrOyB9XG5cbiAgICAvLyBJZiBuZXN0aW5nIGxldmVsIGV4Y2VlZGVkIC0gc2tpcCB0YWlsIHRvIHRoZSBlbmQuIFRoYXQncyBub3Qgb3JkaW5hcnlcbiAgICAvLyBzaXR1YXRpb24gYW5kIHdlIHNob3VsZCBub3QgY2FyZSBhYm91dCBjb250ZW50LlxuICAgIGlmIChzdGF0ZS5sZXZlbCA+PSBtYXhOZXN0aW5nKSB7XG4gICAgICBzdGF0ZS5saW5lID0gZW5kTGluZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8vIFRyeSBhbGwgcG9zc2libGUgcnVsZXMuXG4gICAgLy8gT24gc3VjY2VzcywgcnVsZSBzaG91bGQ6XG4gICAgLy9cbiAgICAvLyAtIHVwZGF0ZSBgc3RhdGUubGluZWBcbiAgICAvLyAtIHVwZGF0ZSBgc3RhdGUudG9rZW5zYFxuICAgIC8vIC0gcmV0dXJuIHRydWVcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgb2sgPSBydWxlc1tpXShzdGF0ZSwgbGluZSwgZW5kTGluZSwgZmFsc2UpO1xuICAgICAgaWYgKG9rKSB7IGJyZWFrOyB9XG4gICAgfVxuXG4gICAgLy8gc2V0IHN0YXRlLnRpZ2h0IGlmZiB3ZSBoYWQgYW4gZW1wdHkgbGluZSBiZWZvcmUgY3VycmVudCB0YWdcbiAgICAvLyBpLmUuIGxhdGVzdCBlbXB0eSBsaW5lIHNob3VsZCBub3QgY291bnRcbiAgICBzdGF0ZS50aWdodCA9ICFoYXNFbXB0eUxpbmVzO1xuXG4gICAgLy8gcGFyYWdyYXBoIG1pZ2h0IFwiZWF0XCIgb25lIG5ld2xpbmUgYWZ0ZXIgaXQgaW4gbmVzdGVkIGxpc3RzXG4gICAgaWYgKHN0YXRlLmlzRW1wdHkoc3RhdGUubGluZSAtIDEpKSB7XG4gICAgICBoYXNFbXB0eUxpbmVzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBsaW5lID0gc3RhdGUubGluZTtcblxuICAgIGlmIChsaW5lIDwgZW5kTGluZSAmJiBzdGF0ZS5pc0VtcHR5KGxpbmUpKSB7XG4gICAgICBoYXNFbXB0eUxpbmVzID0gdHJ1ZTtcbiAgICAgIGxpbmUrKztcblxuICAgICAgLy8gdHdvIGVtcHR5IGxpbmVzIHNob3VsZCBzdG9wIHRoZSBwYXJzZXIgaW4gbGlzdCBtb2RlXG4gICAgICBpZiAobGluZSA8IGVuZExpbmUgJiYgc3RhdGUucGFyZW50VHlwZSA9PT0gJ2xpc3QnICYmIHN0YXRlLmlzRW1wdHkobGluZSkpIHsgYnJlYWs7IH1cbiAgICAgIHN0YXRlLmxpbmUgPSBsaW5lO1xuICAgIH1cbiAgfVxufTtcblxuXG4vKipcbiAqIFBhcnNlckJsb2NrLnBhcnNlKHN0ciwgbWQsIGVudiwgb3V0VG9rZW5zKVxuICpcbiAqIFByb2Nlc3MgaW5wdXQgc3RyaW5nIGFuZCBwdXNoIGJsb2NrIHRva2VucyBpbnRvIGBvdXRUb2tlbnNgXG4gKiovXG5QYXJzZXJCbG9jay5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiAoc3JjLCBtZCwgZW52LCBvdXRUb2tlbnMpIHtcbiAgdmFyIHN0YXRlO1xuXG4gIGlmICghc3JjKSB7IHJldHVybiBbXTsgfVxuXG4gIHN0YXRlID0gbmV3IHRoaXMuU3RhdGUoc3JjLCBtZCwgZW52LCBvdXRUb2tlbnMpO1xuXG4gIHRoaXMudG9rZW5pemUoc3RhdGUsIHN0YXRlLmxpbmUsIHN0YXRlLmxpbmVNYXgpO1xufTtcblxuXG5QYXJzZXJCbG9jay5wcm90b3R5cGUuU3RhdGUgPSByZXF1aXJlKCcuL3J1bGVzX2Jsb2NrL3N0YXRlX2Jsb2NrJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBQYXJzZXJCbG9jaztcbiIsIi8qKiBpbnRlcm5hbFxuICogY2xhc3MgQ29yZVxuICpcbiAqIFRvcC1sZXZlbCBydWxlcyBleGVjdXRvci4gR2x1ZXMgYmxvY2svaW5saW5lIHBhcnNlcnMgYW5kIGRvZXMgaW50ZXJtZWRpYXRlXG4gKiB0cmFuc2Zvcm1hdGlvbnMuXG4gKiovXG4ndXNlIHN0cmljdCc7XG5cblxudmFyIFJ1bGVyICA9IHJlcXVpcmUoJy4vcnVsZXInKTtcblxuXG52YXIgX3J1bGVzID0gW1xuICBbICdub3JtYWxpemUnLCAgICAgIHJlcXVpcmUoJy4vcnVsZXNfY29yZS9ub3JtYWxpemUnKSAgICAgIF0sXG4gIFsgJ2Jsb2NrJywgICAgICAgICAgcmVxdWlyZSgnLi9ydWxlc19jb3JlL2Jsb2NrJykgICAgICAgICAgXSxcbiAgWyAnaW5saW5lJywgICAgICAgICByZXF1aXJlKCcuL3J1bGVzX2NvcmUvaW5saW5lJykgICAgICAgICBdLFxuICBbICdsaW5raWZ5JywgICAgICAgIHJlcXVpcmUoJy4vcnVsZXNfY29yZS9saW5raWZ5JykgICAgICAgIF0sXG4gIFsgJ3JlcGxhY2VtZW50cycsICAgcmVxdWlyZSgnLi9ydWxlc19jb3JlL3JlcGxhY2VtZW50cycpICAgXSxcbiAgWyAnc21hcnRxdW90ZXMnLCAgICByZXF1aXJlKCcuL3J1bGVzX2NvcmUvc21hcnRxdW90ZXMnKSAgICBdXG5dO1xuXG5cbi8qKlxuICogbmV3IENvcmUoKVxuICoqL1xuZnVuY3Rpb24gQ29yZSgpIHtcbiAgLyoqXG4gICAqIENvcmUjcnVsZXIgLT4gUnVsZXJcbiAgICpcbiAgICogW1tSdWxlcl1dIGluc3RhbmNlLiBLZWVwIGNvbmZpZ3VyYXRpb24gb2YgY29yZSBydWxlcy5cbiAgICoqL1xuICB0aGlzLnJ1bGVyID0gbmV3IFJ1bGVyKCk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBfcnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICB0aGlzLnJ1bGVyLnB1c2goX3J1bGVzW2ldWzBdLCBfcnVsZXNbaV1bMV0pO1xuICB9XG59XG5cblxuLyoqXG4gKiBDb3JlLnByb2Nlc3Moc3RhdGUpXG4gKlxuICogRXhlY3V0ZXMgY29yZSBjaGFpbiBydWxlcy5cbiAqKi9cbkNvcmUucHJvdG90eXBlLnByb2Nlc3MgPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgdmFyIGksIGwsIHJ1bGVzO1xuXG4gIHJ1bGVzID0gdGhpcy5ydWxlci5nZXRSdWxlcygnJyk7XG5cbiAgZm9yIChpID0gMCwgbCA9IHJ1bGVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHJ1bGVzW2ldKHN0YXRlKTtcbiAgfVxufTtcblxuQ29yZS5wcm90b3R5cGUuU3RhdGUgPSByZXF1aXJlKCcuL3J1bGVzX2NvcmUvc3RhdGVfY29yZScpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gQ29yZTtcbiIsIi8qKiBpbnRlcm5hbFxuICogY2xhc3MgUGFyc2VySW5saW5lXG4gKlxuICogVG9rZW5pemVzIHBhcmFncmFwaCBjb250ZW50LlxuICoqL1xuJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciBSdWxlciAgICAgICAgICAgPSByZXF1aXJlKCcuL3J1bGVyJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFBhcnNlciBydWxlc1xuXG52YXIgX3J1bGVzID0gW1xuICBbICd0ZXh0JywgICAgICAgICAgICByZXF1aXJlKCcuL3J1bGVzX2lubGluZS90ZXh0JykgXSxcbiAgWyAnbmV3bGluZScsICAgICAgICAgcmVxdWlyZSgnLi9ydWxlc19pbmxpbmUvbmV3bGluZScpIF0sXG4gIFsgJ2VzY2FwZScsICAgICAgICAgIHJlcXVpcmUoJy4vcnVsZXNfaW5saW5lL2VzY2FwZScpIF0sXG4gIFsgJ2JhY2t0aWNrcycsICAgICAgIHJlcXVpcmUoJy4vcnVsZXNfaW5saW5lL2JhY2t0aWNrcycpIF0sXG4gIFsgJ3N0cmlrZXRocm91Z2gnLCAgIHJlcXVpcmUoJy4vcnVsZXNfaW5saW5lL3N0cmlrZXRocm91Z2gnKSBdLFxuICBbICdlbXBoYXNpcycsICAgICAgICByZXF1aXJlKCcuL3J1bGVzX2lubGluZS9lbXBoYXNpcycpIF0sXG4gIFsgJ2xpbmsnLCAgICAgICAgICAgIHJlcXVpcmUoJy4vcnVsZXNfaW5saW5lL2xpbmsnKSBdLFxuICBbICdpbWFnZScsICAgICAgICAgICByZXF1aXJlKCcuL3J1bGVzX2lubGluZS9pbWFnZScpIF0sXG4gIFsgJ2F1dG9saW5rJywgICAgICAgIHJlcXVpcmUoJy4vcnVsZXNfaW5saW5lL2F1dG9saW5rJykgXSxcbiAgWyAnaHRtbF9pbmxpbmUnLCAgICAgcmVxdWlyZSgnLi9ydWxlc19pbmxpbmUvaHRtbF9pbmxpbmUnKSBdLFxuICBbICdlbnRpdHknLCAgICAgICAgICByZXF1aXJlKCcuL3J1bGVzX2lubGluZS9lbnRpdHknKSBdXG5dO1xuXG5cbi8qKlxuICogbmV3IFBhcnNlcklubGluZSgpXG4gKiovXG5mdW5jdGlvbiBQYXJzZXJJbmxpbmUoKSB7XG4gIC8qKlxuICAgKiBQYXJzZXJJbmxpbmUjcnVsZXIgLT4gUnVsZXJcbiAgICpcbiAgICogW1tSdWxlcl1dIGluc3RhbmNlLiBLZWVwIGNvbmZpZ3VyYXRpb24gb2YgaW5saW5lIHJ1bGVzLlxuICAgKiovXG4gIHRoaXMucnVsZXIgPSBuZXcgUnVsZXIoKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IF9ydWxlcy5sZW5ndGg7IGkrKykge1xuICAgIHRoaXMucnVsZXIucHVzaChfcnVsZXNbaV1bMF0sIF9ydWxlc1tpXVsxXSk7XG4gIH1cbn1cblxuXG4vLyBTa2lwIHNpbmdsZSB0b2tlbiBieSBydW5uaW5nIGFsbCBydWxlcyBpbiB2YWxpZGF0aW9uIG1vZGU7XG4vLyByZXR1cm5zIGB0cnVlYCBpZiBhbnkgcnVsZSByZXBvcnRlZCBzdWNjZXNzXG4vL1xuUGFyc2VySW5saW5lLnByb3RvdHlwZS5za2lwVG9rZW4gPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgdmFyIGksIHBvcyA9IHN0YXRlLnBvcyxcbiAgICAgIHJ1bGVzID0gdGhpcy5ydWxlci5nZXRSdWxlcygnJyksXG4gICAgICBsZW4gPSBydWxlcy5sZW5ndGgsXG4gICAgICBtYXhOZXN0aW5nID0gc3RhdGUubWQub3B0aW9ucy5tYXhOZXN0aW5nLFxuICAgICAgY2FjaGUgPSBzdGF0ZS5jYWNoZTtcblxuXG4gIGlmICh0eXBlb2YgY2FjaGVbcG9zXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBzdGF0ZS5wb3MgPSBjYWNoZVtwb3NdO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qaXN0YW5idWwgaWdub3JlIGVsc2UqL1xuICBpZiAoc3RhdGUubGV2ZWwgPCBtYXhOZXN0aW5nKSB7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAocnVsZXNbaV0oc3RhdGUsIHRydWUpKSB7XG4gICAgICAgIGNhY2hlW3Bvc10gPSBzdGF0ZS5wb3M7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0ZS5wb3MrKztcbiAgY2FjaGVbcG9zXSA9IHN0YXRlLnBvcztcbn07XG5cblxuLy8gR2VuZXJhdGUgdG9rZW5zIGZvciBpbnB1dCByYW5nZVxuLy9cblBhcnNlcklubGluZS5wcm90b3R5cGUudG9rZW5pemUgPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgdmFyIG9rLCBpLFxuICAgICAgcnVsZXMgPSB0aGlzLnJ1bGVyLmdldFJ1bGVzKCcnKSxcbiAgICAgIGxlbiA9IHJ1bGVzLmxlbmd0aCxcbiAgICAgIGVuZCA9IHN0YXRlLnBvc01heCxcbiAgICAgIG1heE5lc3RpbmcgPSBzdGF0ZS5tZC5vcHRpb25zLm1heE5lc3Rpbmc7XG5cbiAgd2hpbGUgKHN0YXRlLnBvcyA8IGVuZCkge1xuICAgIC8vIFRyeSBhbGwgcG9zc2libGUgcnVsZXMuXG4gICAgLy8gT24gc3VjY2VzcywgcnVsZSBzaG91bGQ6XG4gICAgLy9cbiAgICAvLyAtIHVwZGF0ZSBgc3RhdGUucG9zYFxuICAgIC8vIC0gdXBkYXRlIGBzdGF0ZS50b2tlbnNgXG4gICAgLy8gLSByZXR1cm4gdHJ1ZVxuXG4gICAgaWYgKHN0YXRlLmxldmVsIDwgbWF4TmVzdGluZykge1xuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIG9rID0gcnVsZXNbaV0oc3RhdGUsIGZhbHNlKTtcbiAgICAgICAgaWYgKG9rKSB7IGJyZWFrOyB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9rKSB7XG4gICAgICBpZiAoc3RhdGUucG9zID49IGVuZCkgeyBicmVhazsgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgc3RhdGUucGVuZGluZyArPSBzdGF0ZS5zcmNbc3RhdGUucG9zKytdO1xuICB9XG5cbiAgaWYgKHN0YXRlLnBlbmRpbmcpIHtcbiAgICBzdGF0ZS5wdXNoUGVuZGluZygpO1xuICB9XG59O1xuXG5cbi8qKlxuICogUGFyc2VySW5saW5lLnBhcnNlKHN0ciwgbWQsIGVudiwgb3V0VG9rZW5zKVxuICpcbiAqIFByb2Nlc3MgaW5wdXQgc3RyaW5nIGFuZCBwdXNoIGlubGluZSB0b2tlbnMgaW50byBgb3V0VG9rZW5zYFxuICoqL1xuUGFyc2VySW5saW5lLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uIChzdHIsIG1kLCBlbnYsIG91dFRva2Vucykge1xuICB2YXIgc3RhdGUgPSBuZXcgdGhpcy5TdGF0ZShzdHIsIG1kLCBlbnYsIG91dFRva2Vucyk7XG5cbiAgdGhpcy50b2tlbml6ZShzdGF0ZSk7XG59O1xuXG5cblBhcnNlcklubGluZS5wcm90b3R5cGUuU3RhdGUgPSByZXF1aXJlKCcuL3J1bGVzX2lubGluZS9zdGF0ZV9pbmxpbmUnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhcnNlcklubGluZTtcbiIsIi8vIENvbW1vbm1hcmsgZGVmYXVsdCBvcHRpb25zXG5cbid1c2Ugc3RyaWN0JztcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgb3B0aW9uczoge1xuICAgIGh0bWw6ICAgICAgICAgdHJ1ZSwgICAgICAgICAvLyBFbmFibGUgSFRNTCB0YWdzIGluIHNvdXJjZVxuICAgIHhodG1sT3V0OiAgICAgdHJ1ZSwgICAgICAgICAvLyBVc2UgJy8nIHRvIGNsb3NlIHNpbmdsZSB0YWdzICg8YnIgLz4pXG4gICAgYnJlYWtzOiAgICAgICBmYWxzZSwgICAgICAgIC8vIENvbnZlcnQgJ1xcbicgaW4gcGFyYWdyYXBocyBpbnRvIDxicj5cbiAgICBsYW5nUHJlZml4OiAgICdsYW5ndWFnZS0nLCAgLy8gQ1NTIGxhbmd1YWdlIHByZWZpeCBmb3IgZmVuY2VkIGJsb2Nrc1xuICAgIGxpbmtpZnk6ICAgICAgZmFsc2UsICAgICAgICAvLyBhdXRvY29udmVydCBVUkwtbGlrZSB0ZXh0cyB0byBsaW5rc1xuXG4gICAgLy8gRW5hYmxlIHNvbWUgbGFuZ3VhZ2UtbmV1dHJhbCByZXBsYWNlbWVudHMgKyBxdW90ZXMgYmVhdXRpZmljYXRpb25cbiAgICB0eXBvZ3JhcGhlcjogIGZhbHNlLFxuXG4gICAgLy8gRG91YmxlICsgc2luZ2xlIHF1b3RlcyByZXBsYWNlbWVudCBwYWlycywgd2hlbiB0eXBvZ3JhcGhlciBlbmFibGVkLFxuICAgIC8vIGFuZCBzbWFydHF1b3RlcyBvbi4gU2V0IGRvdWJsZXMgdG8gJ8KrwrsnIGZvciBSdXNzaWFuLCAn4oCe4oCcJyBmb3IgR2VybWFuLlxuICAgIHF1b3RlczogJ1xcdTIwMWNcXHUyMDFkXFx1MjAxOFxcdTIwMTknIC8qIOKAnOKAneKAmOKAmSAqLyxcblxuICAgIC8vIEhpZ2hsaWdodGVyIGZ1bmN0aW9uLiBTaG91bGQgcmV0dXJuIGVzY2FwZWQgSFRNTCxcbiAgICAvLyBvciAnJyBpZiBpbnB1dCBub3QgY2hhbmdlZFxuICAgIC8vXG4gICAgLy8gZnVuY3Rpb24gKC8qc3RyLCBsYW5nKi8pIHsgcmV0dXJuICcnOyB9XG4gICAgLy9cbiAgICBoaWdobGlnaHQ6IG51bGwsXG5cbiAgICBtYXhOZXN0aW5nOiAgIDIwICAgICAgICAgICAgLy8gSW50ZXJuYWwgcHJvdGVjdGlvbiwgcmVjdXJzaW9uIGxpbWl0XG4gIH0sXG5cbiAgY29tcG9uZW50czoge1xuXG4gICAgY29yZToge1xuICAgICAgcnVsZXM6IFtcbiAgICAgICAgJ25vcm1hbGl6ZScsXG4gICAgICAgICdibG9jaycsXG4gICAgICAgICdpbmxpbmUnXG4gICAgICBdXG4gICAgfSxcblxuICAgIGJsb2NrOiB7XG4gICAgICBydWxlczogW1xuICAgICAgICAnYmxvY2txdW90ZScsXG4gICAgICAgICdjb2RlJyxcbiAgICAgICAgJ2ZlbmNlJyxcbiAgICAgICAgJ2hlYWRpbmcnLFxuICAgICAgICAnaHInLFxuICAgICAgICAnaHRtbF9ibG9jaycsXG4gICAgICAgICdsaGVhZGluZycsXG4gICAgICAgICdsaXN0JyxcbiAgICAgICAgJ3JlZmVyZW5jZScsXG4gICAgICAgICdwYXJhZ3JhcGgnXG4gICAgICBdXG4gICAgfSxcblxuICAgIGlubGluZToge1xuICAgICAgcnVsZXM6IFtcbiAgICAgICAgJ2F1dG9saW5rJyxcbiAgICAgICAgJ2JhY2t0aWNrcycsXG4gICAgICAgICdlbXBoYXNpcycsXG4gICAgICAgICdlbnRpdHknLFxuICAgICAgICAnZXNjYXBlJyxcbiAgICAgICAgJ2h0bWxfaW5saW5lJyxcbiAgICAgICAgJ2ltYWdlJyxcbiAgICAgICAgJ2xpbmsnLFxuICAgICAgICAnbmV3bGluZScsXG4gICAgICAgICd0ZXh0J1xuICAgICAgXVxuICAgIH1cbiAgfVxufTtcbiIsIi8vIG1hcmtkb3duLWl0IGRlZmF1bHQgb3B0aW9uc1xuXG4ndXNlIHN0cmljdCc7XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG9wdGlvbnM6IHtcbiAgICBodG1sOiAgICAgICAgIGZhbHNlLCAgICAgICAgLy8gRW5hYmxlIEhUTUwgdGFncyBpbiBzb3VyY2VcbiAgICB4aHRtbE91dDogICAgIGZhbHNlLCAgICAgICAgLy8gVXNlICcvJyB0byBjbG9zZSBzaW5nbGUgdGFncyAoPGJyIC8+KVxuICAgIGJyZWFrczogICAgICAgZmFsc2UsICAgICAgICAvLyBDb252ZXJ0ICdcXG4nIGluIHBhcmFncmFwaHMgaW50byA8YnI+XG4gICAgbGFuZ1ByZWZpeDogICAnbGFuZ3VhZ2UtJywgIC8vIENTUyBsYW5ndWFnZSBwcmVmaXggZm9yIGZlbmNlZCBibG9ja3NcbiAgICBsaW5raWZ5OiAgICAgIGZhbHNlLCAgICAgICAgLy8gYXV0b2NvbnZlcnQgVVJMLWxpa2UgdGV4dHMgdG8gbGlua3NcblxuICAgIC8vIEVuYWJsZSBzb21lIGxhbmd1YWdlLW5ldXRyYWwgcmVwbGFjZW1lbnRzICsgcXVvdGVzIGJlYXV0aWZpY2F0aW9uXG4gICAgdHlwb2dyYXBoZXI6ICBmYWxzZSxcblxuICAgIC8vIERvdWJsZSArIHNpbmdsZSBxdW90ZXMgcmVwbGFjZW1lbnQgcGFpcnMsIHdoZW4gdHlwb2dyYXBoZXIgZW5hYmxlZCxcbiAgICAvLyBhbmQgc21hcnRxdW90ZXMgb24uIFNldCBkb3VibGVzIHRvICfCq8K7JyBmb3IgUnVzc2lhbiwgJ+KAnuKAnCcgZm9yIEdlcm1hbi5cbiAgICBxdW90ZXM6ICdcXHUyMDFjXFx1MjAxZFxcdTIwMThcXHUyMDE5JyAvKiDigJzigJ3igJjigJkgKi8sXG5cbiAgICAvLyBIaWdobGlnaHRlciBmdW5jdGlvbi4gU2hvdWxkIHJldHVybiBlc2NhcGVkIEhUTUwsXG4gICAgLy8gb3IgJycgaWYgaW5wdXQgbm90IGNoYW5nZWRcbiAgICAvL1xuICAgIC8vIGZ1bmN0aW9uICgvKnN0ciwgbGFuZyovKSB7IHJldHVybiAnJzsgfVxuICAgIC8vXG4gICAgaGlnaGxpZ2h0OiBudWxsLFxuXG4gICAgbWF4TmVzdGluZzogICAyMCAgICAgICAgICAgIC8vIEludGVybmFsIHByb3RlY3Rpb24sIHJlY3Vyc2lvbiBsaW1pdFxuICB9LFxuXG4gIGNvbXBvbmVudHM6IHtcblxuICAgIGNvcmU6IHt9LFxuICAgIGJsb2NrOiB7fSxcbiAgICBpbmxpbmU6IHt9XG4gIH1cbn07XG4iLCIvLyBcIlplcm9cIiBwcmVzZXQsIHdpdGggbm90aGluZyBlbmFibGVkLiBVc2VmdWwgZm9yIG1hbnVhbCBjb25maWd1cmluZyBvZiBzaW1wbGVcbi8vIG1vZGVzLiBGb3IgZXhhbXBsZSwgdG8gcGFyc2UgYm9sZC9pdGFsaWMgb25seS5cblxuJ3VzZSBzdHJpY3QnO1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBvcHRpb25zOiB7XG4gICAgaHRtbDogICAgICAgICBmYWxzZSwgICAgICAgIC8vIEVuYWJsZSBIVE1MIHRhZ3MgaW4gc291cmNlXG4gICAgeGh0bWxPdXQ6ICAgICBmYWxzZSwgICAgICAgIC8vIFVzZSAnLycgdG8gY2xvc2Ugc2luZ2xlIHRhZ3MgKDxiciAvPilcbiAgICBicmVha3M6ICAgICAgIGZhbHNlLCAgICAgICAgLy8gQ29udmVydCAnXFxuJyBpbiBwYXJhZ3JhcGhzIGludG8gPGJyPlxuICAgIGxhbmdQcmVmaXg6ICAgJ2xhbmd1YWdlLScsICAvLyBDU1MgbGFuZ3VhZ2UgcHJlZml4IGZvciBmZW5jZWQgYmxvY2tzXG4gICAgbGlua2lmeTogICAgICBmYWxzZSwgICAgICAgIC8vIGF1dG9jb252ZXJ0IFVSTC1saWtlIHRleHRzIHRvIGxpbmtzXG5cbiAgICAvLyBFbmFibGUgc29tZSBsYW5ndWFnZS1uZXV0cmFsIHJlcGxhY2VtZW50cyArIHF1b3RlcyBiZWF1dGlmaWNhdGlvblxuICAgIHR5cG9ncmFwaGVyOiAgZmFsc2UsXG5cbiAgICAvLyBEb3VibGUgKyBzaW5nbGUgcXVvdGVzIHJlcGxhY2VtZW50IHBhaXJzLCB3aGVuIHR5cG9ncmFwaGVyIGVuYWJsZWQsXG4gICAgLy8gYW5kIHNtYXJ0cXVvdGVzIG9uLiBTZXQgZG91YmxlcyB0byAnwqvCuycgZm9yIFJ1c3NpYW4sICfigJ7igJwnIGZvciBHZXJtYW4uXG4gICAgcXVvdGVzOiAnXFx1MjAxY1xcdTIwMWRcXHUyMDE4XFx1MjAxOScgLyog4oCc4oCd4oCY4oCZICovLFxuXG4gICAgLy8gSGlnaGxpZ2h0ZXIgZnVuY3Rpb24uIFNob3VsZCByZXR1cm4gZXNjYXBlZCBIVE1MLFxuICAgIC8vIG9yICcnIGlmIGlucHV0IG5vdCBjaGFuZ2VkXG4gICAgLy9cbiAgICAvLyBmdW5jdGlvbiAoLypzdHIsIGxhbmcqLykgeyByZXR1cm4gJyc7IH1cbiAgICAvL1xuICAgIGhpZ2hsaWdodDogbnVsbCxcblxuICAgIG1heE5lc3Rpbmc6ICAgMjAgICAgICAgICAgICAvLyBJbnRlcm5hbCBwcm90ZWN0aW9uLCByZWN1cnNpb24gbGltaXRcbiAgfSxcblxuICBjb21wb25lbnRzOiB7XG5cbiAgICBjb3JlOiB7XG4gICAgICBydWxlczogW1xuICAgICAgICAnbm9ybWFsaXplJyxcbiAgICAgICAgJ2Jsb2NrJyxcbiAgICAgICAgJ2lubGluZSdcbiAgICAgIF1cbiAgICB9LFxuXG4gICAgYmxvY2s6IHtcbiAgICAgIHJ1bGVzOiBbXG4gICAgICAgICdwYXJhZ3JhcGgnXG4gICAgICBdXG4gICAgfSxcblxuICAgIGlubGluZToge1xuICAgICAgcnVsZXM6IFtcbiAgICAgICAgJ3RleHQnXG4gICAgICBdXG4gICAgfVxuICB9XG59O1xuIiwiLyoqXG4gKiBjbGFzcyBSZW5kZXJlclxuICpcbiAqIEdlbmVyYXRlcyBIVE1MIGZyb20gcGFyc2VkIHRva2VuIHN0cmVhbS4gRWFjaCBpbnN0YW5jZSBoYXMgaW5kZXBlbmRlbnRcbiAqIGNvcHkgb2YgcnVsZXMuIFRob3NlIGNhbiBiZSByZXdyaXR0ZW4gd2l0aCBlYXNlLiBBbHNvLCB5b3UgY2FuIGFkZCBuZXdcbiAqIHJ1bGVzIGlmIHlvdSBjcmVhdGUgcGx1Z2luIGFuZCBhZGRzIG5ldyB0b2tlbiB0eXBlcy5cbiAqKi9cbid1c2Ugc3RyaWN0JztcblxuXG52YXIgYXNzaWduICAgICAgICAgID0gcmVxdWlyZSgnLi9jb21tb24vdXRpbHMnKS5hc3NpZ247XG52YXIgdW5lc2NhcGVBbGwgICAgID0gcmVxdWlyZSgnLi9jb21tb24vdXRpbHMnKS51bmVzY2FwZUFsbDtcbnZhciBlc2NhcGVIdG1sICAgICAgPSByZXF1aXJlKCcuL2NvbW1vbi91dGlscycpLmVzY2FwZUh0bWw7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxudmFyIGRlZmF1bHRfcnVsZXMgPSB7fTtcblxuXG5kZWZhdWx0X3J1bGVzLmNvZGVfaW5saW5lID0gZnVuY3Rpb24gKHRva2VucywgaWR4IC8qLCBvcHRpb25zLCBlbnYgKi8pIHtcbiAgcmV0dXJuICc8Y29kZT4nICsgZXNjYXBlSHRtbCh0b2tlbnNbaWR4XS5jb250ZW50KSArICc8L2NvZGU+Jztcbn07XG5cblxuZGVmYXVsdF9ydWxlcy5jb2RlX2Jsb2NrID0gZnVuY3Rpb24gKHRva2VucywgaWR4IC8qLCBvcHRpb25zLCBlbnYgKi8pIHtcbiAgcmV0dXJuICc8cHJlPjxjb2RlPicgKyBlc2NhcGVIdG1sKHRva2Vuc1tpZHhdLmNvbnRlbnQpICsgJzwvY29kZT48L3ByZT5cXG4nO1xufTtcblxuXG5kZWZhdWx0X3J1bGVzLmZlbmNlID0gZnVuY3Rpb24gKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNlbGYpIHtcbiAgdmFyIHRva2VuID0gdG9rZW5zW2lkeF0sXG4gICAgICBsYW5nTmFtZSA9ICcnLFxuICAgICAgaGlnaGxpZ2h0ZWQ7XG5cbiAgaWYgKHRva2VuLmluZm8pIHtcbiAgICBsYW5nTmFtZSA9IHVuZXNjYXBlQWxsKHRva2VuLmluZm8udHJpbSgpLnNwbGl0KC9cXHMrL2cpWzBdKTtcbiAgICB0b2tlbi5hdHRyUHVzaChbICdjbGFzcycsIG9wdGlvbnMubGFuZ1ByZWZpeCArIGxhbmdOYW1lIF0pO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuaGlnaGxpZ2h0KSB7XG4gICAgaGlnaGxpZ2h0ZWQgPSBvcHRpb25zLmhpZ2hsaWdodCh0b2tlbi5jb250ZW50LCBsYW5nTmFtZSkgfHwgZXNjYXBlSHRtbCh0b2tlbi5jb250ZW50KTtcbiAgfSBlbHNlIHtcbiAgICBoaWdobGlnaHRlZCA9IGVzY2FwZUh0bWwodG9rZW4uY29udGVudCk7XG4gIH1cblxuICByZXR1cm4gICc8cHJlPjxjb2RlJyArIHNlbGYucmVuZGVyQXR0cnModG9rZW4pICsgJz4nXG4gICAgICAgICsgaGlnaGxpZ2h0ZWRcbiAgICAgICAgKyAnPC9jb2RlPjwvcHJlPlxcbic7XG59O1xuXG5cbmRlZmF1bHRfcnVsZXMuaW1hZ2UgPSBmdW5jdGlvbiAodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2VsZikge1xuICB2YXIgdG9rZW4gPSB0b2tlbnNbaWR4XTtcblxuICAvLyBcImFsdFwiIGF0dHIgTVVTVCBiZSBzZXQsIGV2ZW4gaWYgZW1wdHkuIEJlY2F1c2UgaXQncyBtYW5kYXRvcnkgYW5kXG4gIC8vIHNob3VsZCBiZSBwbGFjZWQgb24gcHJvcGVyIHBvc2l0aW9uIGZvciB0ZXN0cy5cbiAgLy9cbiAgLy8gUmVwbGFjZSBjb250ZW50IHdpdGggYWN0dWFsIHZhbHVlXG5cbiAgdG9rZW4uYXR0cnNbdG9rZW4uYXR0ckluZGV4KCdhbHQnKV1bMV0gPVxuICAgIHNlbGYucmVuZGVySW5saW5lQXNUZXh0KHRva2VuLmNoaWxkcmVuLCBvcHRpb25zLCBlbnYpO1xuXG4gIHJldHVybiBzZWxmLnJlbmRlclRva2VuKHRva2VucywgaWR4LCBvcHRpb25zKTtcbn07XG5cblxuZGVmYXVsdF9ydWxlcy5oYXJkYnJlYWsgPSBmdW5jdGlvbiAodG9rZW5zLCBpZHgsIG9wdGlvbnMgLyosIGVudiAqLykge1xuICByZXR1cm4gb3B0aW9ucy54aHRtbE91dCA/ICc8YnIgLz5cXG4nIDogJzxicj5cXG4nO1xufTtcbmRlZmF1bHRfcnVsZXMuc29mdGJyZWFrID0gZnVuY3Rpb24gKHRva2VucywgaWR4LCBvcHRpb25zIC8qLCBlbnYgKi8pIHtcbiAgcmV0dXJuIG9wdGlvbnMuYnJlYWtzID8gKG9wdGlvbnMueGh0bWxPdXQgPyAnPGJyIC8+XFxuJyA6ICc8YnI+XFxuJykgOiAnXFxuJztcbn07XG5cblxuZGVmYXVsdF9ydWxlcy50ZXh0ID0gZnVuY3Rpb24gKHRva2VucywgaWR4IC8qLCBvcHRpb25zLCBlbnYgKi8pIHtcbiAgcmV0dXJuIGVzY2FwZUh0bWwodG9rZW5zW2lkeF0uY29udGVudCk7XG59O1xuXG5cbmRlZmF1bHRfcnVsZXMuaHRtbF9ibG9jayA9IGZ1bmN0aW9uICh0b2tlbnMsIGlkeCAvKiwgb3B0aW9ucywgZW52ICovKSB7XG4gIHJldHVybiB0b2tlbnNbaWR4XS5jb250ZW50O1xufTtcbmRlZmF1bHRfcnVsZXMuaHRtbF9pbmxpbmUgPSBmdW5jdGlvbiAodG9rZW5zLCBpZHggLyosIG9wdGlvbnMsIGVudiAqLykge1xuICByZXR1cm4gdG9rZW5zW2lkeF0uY29udGVudDtcbn07XG5cblxuLyoqXG4gKiBuZXcgUmVuZGVyZXIoKVxuICpcbiAqIENyZWF0ZXMgbmV3IFtbUmVuZGVyZXJdXSBpbnN0YW5jZSBhbmQgZmlsbCBbW1JlbmRlcmVyI3J1bGVzXV0gd2l0aCBkZWZhdWx0cy5cbiAqKi9cbmZ1bmN0aW9uIFJlbmRlcmVyKCkge1xuXG4gIC8qKlxuICAgKiBSZW5kZXJlciNydWxlcyAtPiBPYmplY3RcbiAgICpcbiAgICogQ29udGFpbnMgcmVuZGVyIHJ1bGVzIGZvciB0b2tlbnMuIENhbiBiZSB1cGRhdGVkIGFuZCBleHRlbmRlZC5cbiAgICpcbiAgICogIyMjIyMgRXhhbXBsZVxuICAgKlxuICAgKiBgYGBqYXZhc2NyaXB0XG4gICAqIHZhciBtZCA9IHJlcXVpcmUoJ21hcmtkb3duLWl0JykoKTtcbiAgICpcbiAgICogbWQucmVuZGVyZXIucnVsZXMuc3Ryb25nX29wZW4gID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJzxiPic7IH07XG4gICAqIG1kLnJlbmRlcmVyLnJ1bGVzLnN0cm9uZ19jbG9zZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICc8L2I+JzsgfTtcbiAgICpcbiAgICogdmFyIHJlc3VsdCA9IG1kLnJlbmRlcklubGluZSguLi4pO1xuICAgKiBgYGBcbiAgICpcbiAgICogRWFjaCBydWxlIGlzIGNhbGxlZCBhcyBpbmRlcGVuZGVkIHN0YXRpYyBmdW5jdGlvbiB3aXRoIGZpeGVkIHNpZ25hdHVyZTpcbiAgICpcbiAgICogYGBgamF2YXNjcmlwdFxuICAgKiBmdW5jdGlvbiBteV90b2tlbl9yZW5kZXIodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgcmVuZGVyZXIpIHtcbiAgICogICAvLyAuLi5cbiAgICogICByZXR1cm4gcmVuZGVyZWRIVE1MO1xuICAgKiB9XG4gICAqIGBgYFxuICAgKlxuICAgKiBTZWUgW3NvdXJjZSBjb2RlXShodHRwczovL2dpdGh1Yi5jb20vbWFya2Rvd24taXQvbWFya2Rvd24taXQvYmxvYi9tYXN0ZXIvbGliL3JlbmRlcmVyLmpzKVxuICAgKiBmb3IgbW9yZSBkZXRhaWxzIGFuZCBleGFtcGxlcy5cbiAgICoqL1xuICB0aGlzLnJ1bGVzID0gYXNzaWduKHt9LCBkZWZhdWx0X3J1bGVzKTtcbn1cblxuXG4vKipcbiAqIFJlbmRlcmVyLnJlbmRlckF0dHJzKHRva2VuKSAtPiBTdHJpbmdcbiAqXG4gKiBSZW5kZXIgdG9rZW4gYXR0cmlidXRlcyB0byBzdHJpbmcuXG4gKiovXG5SZW5kZXJlci5wcm90b3R5cGUucmVuZGVyQXR0cnMgPSBmdW5jdGlvbiByZW5kZXJBdHRycyh0b2tlbikge1xuICB2YXIgaSwgbCwgcmVzdWx0O1xuXG4gIGlmICghdG9rZW4uYXR0cnMpIHsgcmV0dXJuICcnOyB9XG5cbiAgcmVzdWx0ID0gJyc7XG5cbiAgZm9yIChpID0gMCwgbCA9IHRva2VuLmF0dHJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHJlc3VsdCArPSAnICcgKyBlc2NhcGVIdG1sKHRva2VuLmF0dHJzW2ldWzBdKSArICc9XCInICsgZXNjYXBlSHRtbCh0b2tlbi5hdHRyc1tpXVsxXSkgKyAnXCInO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuLyoqXG4gKiBSZW5kZXJlci5yZW5kZXJUb2tlbih0b2tlbnMsIGlkeCwgb3B0aW9ucykgLT4gU3RyaW5nXG4gKiAtIHRva2VucyAoQXJyYXkpOiBsaXN0IG9mIHRva2Vuc1xuICogLSBpZHggKE51bWJlZCk6IHRva2VuIGluZGV4IHRvIHJlbmRlclxuICogLSBvcHRpb25zIChPYmplY3QpOiBwYXJhbXMgb2YgcGFyc2VyIGluc3RhbmNlXG4gKlxuICogRGVmYXVsdCB0b2tlbiByZW5kZXJlci4gQ2FuIGJlIG92ZXJyaWRlbiBieSBjdXN0b20gZnVuY3Rpb25cbiAqIGluIFtbUmVuZGVyZXIjcnVsZXNdXS5cbiAqKi9cblJlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJUb2tlbiA9IGZ1bmN0aW9uIHJlbmRlclRva2VuKHRva2VucywgaWR4LCBvcHRpb25zKSB7XG4gIHZhciBuZXh0VG9rZW4sXG4gICAgICByZXN1bHQgPSAnJyxcbiAgICAgIG5lZWRMZiA9IGZhbHNlLFxuICAgICAgdG9rZW4gPSB0b2tlbnNbaWR4XTtcblxuICAvLyBUaWdodCBsaXN0IHBhcmFncmFwaHNcbiAgaWYgKHRva2VuLmhpZGRlbikge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIC8vIEluc2VydCBhIG5ld2xpbmUgYmV0d2VlbiBoaWRkZW4gcGFyYWdyYXBoIGFuZCBzdWJzZXF1ZW50IG9wZW5pbmdcbiAgLy8gYmxvY2stbGV2ZWwgdGFnLlxuICAvL1xuICAvLyBGb3IgZXhhbXBsZSwgaGVyZSB3ZSBzaG91bGQgaW5zZXJ0IGEgbmV3bGluZSBiZWZvcmUgYmxvY2txdW90ZTpcbiAgLy8gIC0gYVxuICAvLyAgICA+XG4gIC8vXG4gIGlmICh0b2tlbi5ibG9jayAmJiB0b2tlbi5uZXN0aW5nICE9PSAtMSAmJiBpZHggJiYgdG9rZW5zW2lkeCAtIDFdLmhpZGRlbikge1xuICAgIHJlc3VsdCArPSAnXFxuJztcbiAgfVxuXG4gIC8vIEFkZCB0b2tlbiBuYW1lLCBlLmcuIGA8aW1nYFxuICByZXN1bHQgKz0gKHRva2VuLm5lc3RpbmcgPT09IC0xID8gJzwvJyA6ICc8JykgKyB0b2tlbi50YWc7XG5cbiAgLy8gRW5jb2RlIGF0dHJpYnV0ZXMsIGUuZy4gYDxpbWcgc3JjPVwiZm9vXCJgXG4gIHJlc3VsdCArPSB0aGlzLnJlbmRlckF0dHJzKHRva2VuKTtcblxuICAvLyBBZGQgYSBzbGFzaCBmb3Igc2VsZi1jbG9zaW5nIHRhZ3MsIGUuZy4gYDxpbWcgc3JjPVwiZm9vXCIgL2BcbiAgaWYgKHRva2VuLm5lc3RpbmcgPT09IDAgJiYgb3B0aW9ucy54aHRtbE91dCkge1xuICAgIHJlc3VsdCArPSAnIC8nO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgd2UgbmVlZCB0byBhZGQgYSBuZXdsaW5lIGFmdGVyIHRoaXMgdGFnXG4gIGlmICh0b2tlbi5ibG9jaykge1xuICAgIG5lZWRMZiA9IHRydWU7XG5cbiAgICBpZiAodG9rZW4ubmVzdGluZyA9PT0gMSkge1xuICAgICAgaWYgKGlkeCArIDEgPCB0b2tlbnMubGVuZ3RoKSB7XG4gICAgICAgIG5leHRUb2tlbiA9IHRva2Vuc1tpZHggKyAxXTtcblxuICAgICAgICBpZiAobmV4dFRva2VuLnR5cGUgPT09ICdpbmxpbmUnIHx8IG5leHRUb2tlbi5oaWRkZW4pIHtcbiAgICAgICAgICAvLyBCbG9jay1sZXZlbCB0YWcgY29udGFpbmluZyBhbiBpbmxpbmUgdGFnLlxuICAgICAgICAgIC8vXG4gICAgICAgICAgbmVlZExmID0gZmFsc2U7XG5cbiAgICAgICAgfSBlbHNlIGlmIChuZXh0VG9rZW4ubmVzdGluZyA9PT0gLTEgJiYgbmV4dFRva2VuLnRhZyA9PT0gdG9rZW4udGFnKSB7XG4gICAgICAgICAgLy8gT3BlbmluZyB0YWcgKyBjbG9zaW5nIHRhZyBvZiB0aGUgc2FtZSB0eXBlLiBFLmcuIGA8bGk+PC9saT5gLlxuICAgICAgICAgIC8vXG4gICAgICAgICAgbmVlZExmID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXN1bHQgKz0gbmVlZExmID8gJz5cXG4nIDogJz4nO1xuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8qKlxuICogUmVuZGVyZXIucmVuZGVySW5saW5lKHRva2Vucywgb3B0aW9ucywgZW52KSAtPiBTdHJpbmdcbiAqIC0gdG9rZW5zIChBcnJheSk6IGxpc3Qgb24gYmxvY2sgdG9rZW5zIHRvIHJlbnRlclxuICogLSBvcHRpb25zIChPYmplY3QpOiBwYXJhbXMgb2YgcGFyc2VyIGluc3RhbmNlXG4gKiAtIGVudiAoT2JqZWN0KTogYWRkaXRpb25hbCBkYXRhIGZyb20gcGFyc2VkIGlucHV0IChyZWZlcmVuY2VzLCBmb3IgZXhhbXBsZSlcbiAqXG4gKiBUaGUgc2FtZSBhcyBbW1JlbmRlcmVyLnJlbmRlcl1dLCBidXQgZm9yIHNpbmdsZSB0b2tlbiBvZiBgaW5saW5lYCB0eXBlLlxuICoqL1xuUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlcklubGluZSA9IGZ1bmN0aW9uICh0b2tlbnMsIG9wdGlvbnMsIGVudikge1xuICB2YXIgdHlwZSxcbiAgICAgIHJlc3VsdCA9ICcnLFxuICAgICAgcnVsZXMgPSB0aGlzLnJ1bGVzO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0b2tlbnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICB0eXBlID0gdG9rZW5zW2ldLnR5cGU7XG5cbiAgICBpZiAodHlwZW9mIHJ1bGVzW3R5cGVdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmVzdWx0ICs9IHJ1bGVzW3R5cGVdKHRva2VucywgaSwgb3B0aW9ucywgZW52LCB0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ICs9IHRoaXMucmVuZGVyVG9rZW4odG9rZW5zLCBpLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG4vKiogaW50ZXJuYWxcbiAqIFJlbmRlcmVyLnJlbmRlcklubGluZUFzVGV4dCh0b2tlbnMsIG9wdGlvbnMsIGVudikgLT4gU3RyaW5nXG4gKiAtIHRva2VucyAoQXJyYXkpOiBsaXN0IG9uIGJsb2NrIHRva2VucyB0byByZW50ZXJcbiAqIC0gb3B0aW9ucyAoT2JqZWN0KTogcGFyYW1zIG9mIHBhcnNlciBpbnN0YW5jZVxuICogLSBlbnYgKE9iamVjdCk6IGFkZGl0aW9uYWwgZGF0YSBmcm9tIHBhcnNlZCBpbnB1dCAocmVmZXJlbmNlcywgZm9yIGV4YW1wbGUpXG4gKlxuICogU3BlY2lhbCBrbHVkZ2UgZm9yIGltYWdlIGBhbHRgIGF0dHJpYnV0ZXMgdG8gY29uZm9ybSBDb21tb25NYXJrIHNwZWMuXG4gKiBEb24ndCB0cnkgdG8gdXNlIGl0ISBTcGVjIHJlcXVpcmVzIHRvIHNob3cgYGFsdGAgY29udGVudCB3aXRoIHN0cmlwcGVkIG1hcmt1cCxcbiAqIGluc3RlYWQgb2Ygc2ltcGxlIGVzY2FwaW5nLlxuICoqL1xuUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlcklubGluZUFzVGV4dCA9IGZ1bmN0aW9uICh0b2tlbnMsIG9wdGlvbnMsIGVudikge1xuICB2YXIgcmVzdWx0ID0gJycsXG4gICAgICBydWxlcyA9IHRoaXMucnVsZXM7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRva2Vucy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmICh0b2tlbnNbaV0udHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgICByZXN1bHQgKz0gcnVsZXMudGV4dCh0b2tlbnMsIGksIG9wdGlvbnMsIGVudiwgdGhpcyk7XG4gICAgfSBlbHNlIGlmICh0b2tlbnNbaV0udHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgcmVzdWx0ICs9IHRoaXMucmVuZGVySW5saW5lQXNUZXh0KHRva2Vuc1tpXS5jaGlsZHJlbiwgb3B0aW9ucywgZW52KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG4vKipcbiAqIFJlbmRlcmVyLnJlbmRlcih0b2tlbnMsIG9wdGlvbnMsIGVudikgLT4gU3RyaW5nXG4gKiAtIHRva2VucyAoQXJyYXkpOiBsaXN0IG9uIGJsb2NrIHRva2VucyB0byByZW50ZXJcbiAqIC0gb3B0aW9ucyAoT2JqZWN0KTogcGFyYW1zIG9mIHBhcnNlciBpbnN0YW5jZVxuICogLSBlbnYgKE9iamVjdCk6IGFkZGl0aW9uYWwgZGF0YSBmcm9tIHBhcnNlZCBpbnB1dCAocmVmZXJlbmNlcywgZm9yIGV4YW1wbGUpXG4gKlxuICogVGFrZXMgdG9rZW4gc3RyZWFtIGFuZCBnZW5lcmF0ZXMgSFRNTC4gUHJvYmFibHksIHlvdSB3aWxsIG5ldmVyIG5lZWQgdG8gY2FsbFxuICogdGhpcyBtZXRob2QgZGlyZWN0bHkuXG4gKiovXG5SZW5kZXJlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKHRva2Vucywgb3B0aW9ucywgZW52KSB7XG4gIHZhciBpLCBsZW4sIHR5cGUsXG4gICAgICByZXN1bHQgPSAnJyxcbiAgICAgIHJ1bGVzID0gdGhpcy5ydWxlcztcblxuICBmb3IgKGkgPSAwLCBsZW4gPSB0b2tlbnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICB0eXBlID0gdG9rZW5zW2ldLnR5cGU7XG5cbiAgICBpZiAodHlwZSA9PT0gJ2lubGluZScpIHtcbiAgICAgIHJlc3VsdCArPSB0aGlzLnJlbmRlcklubGluZSh0b2tlbnNbaV0uY2hpbGRyZW4sIG9wdGlvbnMsIGVudik7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcnVsZXNbdHlwZV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXN1bHQgKz0gcnVsZXNbdG9rZW5zW2ldLnR5cGVdKHRva2VucywgaSwgb3B0aW9ucywgZW52LCB0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ICs9IHRoaXMucmVuZGVyVG9rZW4odG9rZW5zLCBpLCBvcHRpb25zLCBlbnYpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlbmRlcmVyO1xuIiwiLyoqXG4gKiBjbGFzcyBSdWxlclxuICpcbiAqIEhlbHBlciBjbGFzcywgdXNlZCBieSBbW01hcmtkb3duSXQjY29yZV1dLCBbW01hcmtkb3duSXQjYmxvY2tdXSBhbmRcbiAqIFtbTWFya2Rvd25JdCNpbmxpbmVdXSB0byBtYW5hZ2Ugc2VxdWVuY2VzIG9mIGZ1bmN0aW9ucyAocnVsZXMpOlxuICpcbiAqIC0ga2VlcCBydWxlcyBpbiBkZWZpbmVkIG9yZGVyXG4gKiAtIGFzc2lnbiB0aGUgbmFtZSB0byBlYWNoIHJ1bGVcbiAqIC0gZW5hYmxlL2Rpc2FibGUgcnVsZXNcbiAqIC0gYWRkL3JlcGxhY2UgcnVsZXNcbiAqIC0gYWxsb3cgYXNzaWduIHJ1bGVzIHRvIGFkZGl0aW9uYWwgbmFtZWQgY2hhaW5zIChpbiB0aGUgc2FtZSlcbiAqIC0gY2FjaGVpbmcgbGlzdHMgb2YgYWN0aXZlIHJ1bGVzXG4gKlxuICogWW91IHdpbGwgbm90IG5lZWQgdXNlIHRoaXMgY2xhc3MgZGlyZWN0bHkgdW50aWwgd3JpdGUgcGx1Z2lucy4gRm9yIHNpbXBsZVxuICogcnVsZXMgY29udHJvbCB1c2UgW1tNYXJrZG93bkl0LmRpc2FibGVdXSwgW1tNYXJrZG93bkl0LmVuYWJsZV1dIGFuZFxuICogW1tNYXJrZG93bkl0LnVzZV1dLlxuICoqL1xuJ3VzZSBzdHJpY3QnO1xuXG5cbi8qKlxuICogbmV3IFJ1bGVyKClcbiAqKi9cbmZ1bmN0aW9uIFJ1bGVyKCkge1xuICAvLyBMaXN0IG9mIGFkZGVkIHJ1bGVzLiBFYWNoIGVsZW1lbnQgaXM6XG4gIC8vXG4gIC8vIHtcbiAgLy8gICBuYW1lOiBYWFgsXG4gIC8vICAgZW5hYmxlZDogQm9vbGVhbixcbiAgLy8gICBmbjogRnVuY3Rpb24oKSxcbiAgLy8gICBhbHQ6IFsgbmFtZTIsIG5hbWUzIF1cbiAgLy8gfVxuICAvL1xuICB0aGlzLl9fcnVsZXNfXyA9IFtdO1xuXG4gIC8vIENhY2hlZCBydWxlIGNoYWlucy5cbiAgLy9cbiAgLy8gRmlyc3QgbGV2ZWwgLSBjaGFpbiBuYW1lLCAnJyBmb3IgZGVmYXVsdC5cbiAgLy8gU2Vjb25kIGxldmVsIC0gZGlnaW5hbCBhbmNob3IgZm9yIGZhc3QgZmlsdGVyaW5nIGJ5IGNoYXJjb2Rlcy5cbiAgLy9cbiAgdGhpcy5fX2NhY2hlX18gPSBudWxsO1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gSGVscGVyIG1ldGhvZHMsIHNob3VsZCBub3QgYmUgdXNlZCBkaXJlY3RseVxuXG5cbi8vIEZpbmQgcnVsZSBpbmRleCBieSBuYW1lXG4vL1xuUnVsZXIucHJvdG90eXBlLl9fZmluZF9fID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9fcnVsZXNfXy5sZW5ndGg7IGkrKykge1xuICAgIGlmICh0aGlzLl9fcnVsZXNfX1tpXS5uYW1lID09PSBuYW1lKSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcblxuXG4vLyBCdWlsZCBydWxlcyBsb29rdXAgY2FjaGVcbi8vXG5SdWxlci5wcm90b3R5cGUuX19jb21waWxlX18gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIGNoYWlucyA9IFsgJycgXTtcblxuICAvLyBjb2xsZWN0IHVuaXF1ZSBuYW1lc1xuICBzZWxmLl9fcnVsZXNfXy5mb3JFYWNoKGZ1bmN0aW9uIChydWxlKSB7XG4gICAgaWYgKCFydWxlLmVuYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICBydWxlLmFsdC5mb3JFYWNoKGZ1bmN0aW9uIChhbHROYW1lKSB7XG4gICAgICBpZiAoY2hhaW5zLmluZGV4T2YoYWx0TmFtZSkgPCAwKSB7XG4gICAgICAgIGNoYWlucy5wdXNoKGFsdE5hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICBzZWxmLl9fY2FjaGVfXyA9IHt9O1xuXG4gIGNoYWlucy5mb3JFYWNoKGZ1bmN0aW9uIChjaGFpbikge1xuICAgIHNlbGYuX19jYWNoZV9fW2NoYWluXSA9IFtdO1xuICAgIHNlbGYuX19ydWxlc19fLmZvckVhY2goZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICAgIGlmICghcnVsZS5lbmFibGVkKSB7IHJldHVybjsgfVxuXG4gICAgICBpZiAoY2hhaW4gJiYgcnVsZS5hbHQuaW5kZXhPZihjaGFpbikgPCAwKSB7IHJldHVybjsgfVxuXG4gICAgICBzZWxmLl9fY2FjaGVfX1tjaGFpbl0ucHVzaChydWxlLmZuKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5cbi8qKlxuICogUnVsZXIuYXQobmFtZSwgZm4gWywgb3B0aW9uc10pXG4gKiAtIG5hbWUgKFN0cmluZyk6IHJ1bGUgbmFtZSB0byByZXBsYWNlLlxuICogLSBmbiAoRnVuY3Rpb24pOiBuZXcgcnVsZSBmdW5jdGlvbi5cbiAqIC0gb3B0aW9ucyAoT2JqZWN0KTogbmV3IHJ1bGUgb3B0aW9ucyAobm90IG1hbmRhdG9yeSkuXG4gKlxuICogUmVwbGFjZSBydWxlIGJ5IG5hbWUgd2l0aCBuZXcgZnVuY3Rpb24gJiBvcHRpb25zLiBUaHJvd3MgZXJyb3IgaWYgbmFtZSBub3RcbiAqIGZvdW5kLlxuICpcbiAqICMjIyMjIE9wdGlvbnM6XG4gKlxuICogLSBfX2FsdF9fIC0gYXJyYXkgd2l0aCBuYW1lcyBvZiBcImFsdGVybmF0ZVwiIGNoYWlucy5cbiAqXG4gKiAjIyMjIyBFeGFtcGxlXG4gKlxuICogUmVwbGFjZSBleGlzdGluZyB0eXBvcmdhcGhlciByZXBsYWNlbWVudCBydWxlIHdpdGggbmV3IG9uZTpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiB2YXIgbWQgPSByZXF1aXJlKCdtYXJrZG93bi1pdCcpKCk7XG4gKlxuICogbWQuY29yZS5ydWxlci5hdCgncmVwbGFjZW1lbnRzJywgZnVuY3Rpb24gcmVwbGFjZShzdGF0ZSkge1xuICogICAvLy4uLlxuICogfSk7XG4gKiBgYGBcbiAqKi9cblJ1bGVyLnByb3RvdHlwZS5hdCA9IGZ1bmN0aW9uIChuYW1lLCBmbiwgb3B0aW9ucykge1xuICB2YXIgaW5kZXggPSB0aGlzLl9fZmluZF9fKG5hbWUpO1xuICB2YXIgb3B0ID0gb3B0aW9ucyB8fCB7fTtcblxuICBpZiAoaW5kZXggPT09IC0xKSB7IHRocm93IG5ldyBFcnJvcignUGFyc2VyIHJ1bGUgbm90IGZvdW5kOiAnICsgbmFtZSk7IH1cblxuICB0aGlzLl9fcnVsZXNfX1tpbmRleF0uZm4gPSBmbjtcbiAgdGhpcy5fX3J1bGVzX19baW5kZXhdLmFsdCA9IG9wdC5hbHQgfHwgW107XG4gIHRoaXMuX19jYWNoZV9fID0gbnVsbDtcbn07XG5cblxuLyoqXG4gKiBSdWxlci5iZWZvcmUoYmVmb3JlTmFtZSwgcnVsZU5hbWUsIGZuIFssIG9wdGlvbnNdKVxuICogLSBiZWZvcmVOYW1lIChTdHJpbmcpOiBuZXcgcnVsZSB3aWxsIGJlIGFkZGVkIGJlZm9yZSB0aGlzIG9uZS5cbiAqIC0gcnVsZU5hbWUgKFN0cmluZyk6IG5hbWUgb2YgYWRkZWQgcnVsZS5cbiAqIC0gZm4gKEZ1bmN0aW9uKTogcnVsZSBmdW5jdGlvbi5cbiAqIC0gb3B0aW9ucyAoT2JqZWN0KTogcnVsZSBvcHRpb25zIChub3QgbWFuZGF0b3J5KS5cbiAqXG4gKiBBZGQgbmV3IHJ1bGUgdG8gY2hhaW4gYmVmb3JlIG9uZSB3aXRoIGdpdmVuIG5hbWUuIFNlZSBhbHNvXG4gKiBbW1J1bGVyLmFmdGVyXV0sIFtbUnVsZXIucHVzaF1dLlxuICpcbiAqICMjIyMjIE9wdGlvbnM6XG4gKlxuICogLSBfX2FsdF9fIC0gYXJyYXkgd2l0aCBuYW1lcyBvZiBcImFsdGVybmF0ZVwiIGNoYWlucy5cbiAqXG4gKiAjIyMjIyBFeGFtcGxlXG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogdmFyIG1kID0gcmVxdWlyZSgnbWFya2Rvd24taXQnKSgpO1xuICpcbiAqIG1kLmJsb2NrLnJ1bGVyLmJlZm9yZSgncGFyYWdyYXBoJywgJ215X3J1bGUnLCBmdW5jdGlvbiByZXBsYWNlKHN0YXRlKSB7XG4gKiAgIC8vLi4uXG4gKiB9KTtcbiAqIGBgYFxuICoqL1xuUnVsZXIucHJvdG90eXBlLmJlZm9yZSA9IGZ1bmN0aW9uIChiZWZvcmVOYW1lLCBydWxlTmFtZSwgZm4sIG9wdGlvbnMpIHtcbiAgdmFyIGluZGV4ID0gdGhpcy5fX2ZpbmRfXyhiZWZvcmVOYW1lKTtcbiAgdmFyIG9wdCA9IG9wdGlvbnMgfHwge307XG5cbiAgaWYgKGluZGV4ID09PSAtMSkgeyB0aHJvdyBuZXcgRXJyb3IoJ1BhcnNlciBydWxlIG5vdCBmb3VuZDogJyArIGJlZm9yZU5hbWUpOyB9XG5cbiAgdGhpcy5fX3J1bGVzX18uc3BsaWNlKGluZGV4LCAwLCB7XG4gICAgbmFtZTogcnVsZU5hbWUsXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICBmbjogZm4sXG4gICAgYWx0OiBvcHQuYWx0IHx8IFtdXG4gIH0pO1xuXG4gIHRoaXMuX19jYWNoZV9fID0gbnVsbDtcbn07XG5cblxuLyoqXG4gKiBSdWxlci5hZnRlcihhZnRlck5hbWUsIHJ1bGVOYW1lLCBmbiBbLCBvcHRpb25zXSlcbiAqIC0gYWZ0ZXJOYW1lIChTdHJpbmcpOiBuZXcgcnVsZSB3aWxsIGJlIGFkZGVkIGFmdGVyIHRoaXMgb25lLlxuICogLSBydWxlTmFtZSAoU3RyaW5nKTogbmFtZSBvZiBhZGRlZCBydWxlLlxuICogLSBmbiAoRnVuY3Rpb24pOiBydWxlIGZ1bmN0aW9uLlxuICogLSBvcHRpb25zIChPYmplY3QpOiBydWxlIG9wdGlvbnMgKG5vdCBtYW5kYXRvcnkpLlxuICpcbiAqIEFkZCBuZXcgcnVsZSB0byBjaGFpbiBhZnRlciBvbmUgd2l0aCBnaXZlbiBuYW1lLiBTZWUgYWxzb1xuICogW1tSdWxlci5iZWZvcmVdXSwgW1tSdWxlci5wdXNoXV0uXG4gKlxuICogIyMjIyMgT3B0aW9uczpcbiAqXG4gKiAtIF9fYWx0X18gLSBhcnJheSB3aXRoIG5hbWVzIG9mIFwiYWx0ZXJuYXRlXCIgY2hhaW5zLlxuICpcbiAqICMjIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiB2YXIgbWQgPSByZXF1aXJlKCdtYXJrZG93bi1pdCcpKCk7XG4gKlxuICogbWQuaW5saW5lLnJ1bGVyLmFmdGVyKCd0ZXh0JywgJ215X3J1bGUnLCBmdW5jdGlvbiByZXBsYWNlKHN0YXRlKSB7XG4gKiAgIC8vLi4uXG4gKiB9KTtcbiAqIGBgYFxuICoqL1xuUnVsZXIucHJvdG90eXBlLmFmdGVyID0gZnVuY3Rpb24gKGFmdGVyTmFtZSwgcnVsZU5hbWUsIGZuLCBvcHRpb25zKSB7XG4gIHZhciBpbmRleCA9IHRoaXMuX19maW5kX18oYWZ0ZXJOYW1lKTtcbiAgdmFyIG9wdCA9IG9wdGlvbnMgfHwge307XG5cbiAgaWYgKGluZGV4ID09PSAtMSkgeyB0aHJvdyBuZXcgRXJyb3IoJ1BhcnNlciBydWxlIG5vdCBmb3VuZDogJyArIGFmdGVyTmFtZSk7IH1cblxuICB0aGlzLl9fcnVsZXNfXy5zcGxpY2UoaW5kZXggKyAxLCAwLCB7XG4gICAgbmFtZTogcnVsZU5hbWUsXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICBmbjogZm4sXG4gICAgYWx0OiBvcHQuYWx0IHx8IFtdXG4gIH0pO1xuXG4gIHRoaXMuX19jYWNoZV9fID0gbnVsbDtcbn07XG5cbi8qKlxuICogUnVsZXIucHVzaChydWxlTmFtZSwgZm4gWywgb3B0aW9uc10pXG4gKiAtIHJ1bGVOYW1lIChTdHJpbmcpOiBuYW1lIG9mIGFkZGVkIHJ1bGUuXG4gKiAtIGZuIChGdW5jdGlvbik6IHJ1bGUgZnVuY3Rpb24uXG4gKiAtIG9wdGlvbnMgKE9iamVjdCk6IHJ1bGUgb3B0aW9ucyAobm90IG1hbmRhdG9yeSkuXG4gKlxuICogUHVzaCBuZXcgcnVsZSB0byB0aGUgZW5kIG9mIGNoYWluLiBTZWUgYWxzb1xuICogW1tSdWxlci5iZWZvcmVdXSwgW1tSdWxlci5hZnRlcl1dLlxuICpcbiAqICMjIyMjIE9wdGlvbnM6XG4gKlxuICogLSBfX2FsdF9fIC0gYXJyYXkgd2l0aCBuYW1lcyBvZiBcImFsdGVybmF0ZVwiIGNoYWlucy5cbiAqXG4gKiAjIyMjIyBFeGFtcGxlXG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogdmFyIG1kID0gcmVxdWlyZSgnbWFya2Rvd24taXQnKSgpO1xuICpcbiAqIG1kLmNvcmUucnVsZXIucHVzaCgnbXlfcnVsZScsIGZ1bmN0aW9uIHJlcGxhY2Uoc3RhdGUpIHtcbiAqICAgLy8uLi5cbiAqIH0pO1xuICogYGBgXG4gKiovXG5SdWxlci5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChydWxlTmFtZSwgZm4sIG9wdGlvbnMpIHtcbiAgdmFyIG9wdCA9IG9wdGlvbnMgfHwge307XG5cbiAgdGhpcy5fX3J1bGVzX18ucHVzaCh7XG4gICAgbmFtZTogcnVsZU5hbWUsXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICBmbjogZm4sXG4gICAgYWx0OiBvcHQuYWx0IHx8IFtdXG4gIH0pO1xuXG4gIHRoaXMuX19jYWNoZV9fID0gbnVsbDtcbn07XG5cblxuLyoqXG4gKiBSdWxlci5lbmFibGUobGlzdCBbLCBpZ25vcmVJbnZhbGlkXSkgLT4gQXJyYXlcbiAqIC0gbGlzdCAoU3RyaW5nfEFycmF5KTogbGlzdCBvZiBydWxlIG5hbWVzIHRvIGVuYWJsZS5cbiAqIC0gaWdub3JlSW52YWxpZCAoQm9vbGVhbik6IHNldCBgdHJ1ZWAgdG8gaWdub3JlIGVycm9ycyB3aGVuIHJ1bGUgbm90IGZvdW5kLlxuICpcbiAqIEVuYWJsZSBydWxlcyB3aXRoIGdpdmVuIG5hbWVzLiBJZiBhbnkgcnVsZSBuYW1lIG5vdCBmb3VuZCAtIHRocm93IEVycm9yLlxuICogRXJyb3JzIGNhbiBiZSBkaXNhYmxlZCBieSBzZWNvbmQgcGFyYW0uXG4gKlxuICogUmV0dXJucyBsaXN0IG9mIGZvdW5kIHJ1bGUgbmFtZXMgKGlmIG5vIGV4Y2VwdGlvbiBoYXBwZW5lZCkuXG4gKlxuICogU2VlIGFsc28gW1tSdWxlci5kaXNhYmxlXV0sIFtbUnVsZXIuZW5hYmxlT25seV1dLlxuICoqL1xuUnVsZXIucHJvdG90eXBlLmVuYWJsZSA9IGZ1bmN0aW9uIChsaXN0LCBpZ25vcmVJbnZhbGlkKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShsaXN0KSkgeyBsaXN0ID0gWyBsaXN0IF07IH1cblxuICB2YXIgcmVzdWx0ID0gW107XG5cbiAgLy8gU2VhcmNoIGJ5IG5hbWUgYW5kIGVuYWJsZVxuICBsaXN0LmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgaWR4ID0gdGhpcy5fX2ZpbmRfXyhuYW1lKTtcblxuICAgIGlmIChpZHggPCAwKSB7XG4gICAgICBpZiAoaWdub3JlSW52YWxpZCkgeyByZXR1cm47IH1cbiAgICAgIHRocm93IG5ldyBFcnJvcignUnVsZXMgbWFuYWdlcjogaW52YWxpZCBydWxlIG5hbWUgJyArIG5hbWUpO1xuICAgIH1cbiAgICB0aGlzLl9fcnVsZXNfX1tpZHhdLmVuYWJsZWQgPSB0cnVlO1xuICAgIHJlc3VsdC5wdXNoKG5hbWUpO1xuICB9LCB0aGlzKTtcblxuICB0aGlzLl9fY2FjaGVfXyA9IG51bGw7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8qKlxuICogUnVsZXIuZW5hYmxlT25seShsaXN0IFssIGlnbm9yZUludmFsaWRdKVxuICogLSBsaXN0IChTdHJpbmd8QXJyYXkpOiBsaXN0IG9mIHJ1bGUgbmFtZXMgdG8gZW5hYmxlICh3aGl0ZWxpc3QpLlxuICogLSBpZ25vcmVJbnZhbGlkIChCb29sZWFuKTogc2V0IGB0cnVlYCB0byBpZ25vcmUgZXJyb3JzIHdoZW4gcnVsZSBub3QgZm91bmQuXG4gKlxuICogRW5hYmxlIHJ1bGVzIHdpdGggZ2l2ZW4gbmFtZXMsIGFuZCBkaXNhYmxlIGV2ZXJ5dGhpbmcgZWxzZS4gSWYgYW55IHJ1bGUgbmFtZVxuICogbm90IGZvdW5kIC0gdGhyb3cgRXJyb3IuIEVycm9ycyBjYW4gYmUgZGlzYWJsZWQgYnkgc2Vjb25kIHBhcmFtLlxuICpcbiAqIFNlZSBhbHNvIFtbUnVsZXIuZGlzYWJsZV1dLCBbW1J1bGVyLmVuYWJsZV1dLlxuICoqL1xuUnVsZXIucHJvdG90eXBlLmVuYWJsZU9ubHkgPSBmdW5jdGlvbiAobGlzdCwgaWdub3JlSW52YWxpZCkge1xuICBpZiAoIUFycmF5LmlzQXJyYXkobGlzdCkpIHsgbGlzdCA9IFsgbGlzdCBdOyB9XG5cbiAgdGhpcy5fX3J1bGVzX18uZm9yRWFjaChmdW5jdGlvbiAocnVsZSkgeyBydWxlLmVuYWJsZWQgPSBmYWxzZTsgfSk7XG5cbiAgdGhpcy5lbmFibGUobGlzdCwgaWdub3JlSW52YWxpZCk7XG59O1xuXG5cbi8qKlxuICogUnVsZXIuZGlzYWJsZShsaXN0IFssIGlnbm9yZUludmFsaWRdKSAtPiBBcnJheVxuICogLSBsaXN0IChTdHJpbmd8QXJyYXkpOiBsaXN0IG9mIHJ1bGUgbmFtZXMgdG8gZGlzYWJsZS5cbiAqIC0gaWdub3JlSW52YWxpZCAoQm9vbGVhbik6IHNldCBgdHJ1ZWAgdG8gaWdub3JlIGVycm9ycyB3aGVuIHJ1bGUgbm90IGZvdW5kLlxuICpcbiAqIERpc2FibGUgcnVsZXMgd2l0aCBnaXZlbiBuYW1lcy4gSWYgYW55IHJ1bGUgbmFtZSBub3QgZm91bmQgLSB0aHJvdyBFcnJvci5cbiAqIEVycm9ycyBjYW4gYmUgZGlzYWJsZWQgYnkgc2Vjb25kIHBhcmFtLlxuICpcbiAqIFJldHVybnMgbGlzdCBvZiBmb3VuZCBydWxlIG5hbWVzIChpZiBubyBleGNlcHRpb24gaGFwcGVuZWQpLlxuICpcbiAqIFNlZSBhbHNvIFtbUnVsZXIuZW5hYmxlXV0sIFtbUnVsZXIuZW5hYmxlT25seV1dLlxuICoqL1xuUnVsZXIucHJvdG90eXBlLmRpc2FibGUgPSBmdW5jdGlvbiAobGlzdCwgaWdub3JlSW52YWxpZCkge1xuICBpZiAoIUFycmF5LmlzQXJyYXkobGlzdCkpIHsgbGlzdCA9IFsgbGlzdCBdOyB9XG5cbiAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gIC8vIFNlYXJjaCBieSBuYW1lIGFuZCBkaXNhYmxlXG4gIGxpc3QuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciBpZHggPSB0aGlzLl9fZmluZF9fKG5hbWUpO1xuXG4gICAgaWYgKGlkeCA8IDApIHtcbiAgICAgIGlmIChpZ25vcmVJbnZhbGlkKSB7IHJldHVybjsgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSdWxlcyBtYW5hZ2VyOiBpbnZhbGlkIHJ1bGUgbmFtZSAnICsgbmFtZSk7XG4gICAgfVxuICAgIHRoaXMuX19ydWxlc19fW2lkeF0uZW5hYmxlZCA9IGZhbHNlO1xuICAgIHJlc3VsdC5wdXNoKG5hbWUpO1xuICB9LCB0aGlzKTtcblxuICB0aGlzLl9fY2FjaGVfXyA9IG51bGw7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8qKlxuICogUnVsZXIuZ2V0UnVsZXMoY2hhaW5OYW1lKSAtPiBBcnJheVxuICpcbiAqIFJldHVybiBhcnJheSBvZiBhY3RpdmUgZnVuY3Rpb25zIChydWxlcykgZm9yIGdpdmVuIGNoYWluIG5hbWUuIEl0IGFuYWx5emVzXG4gKiBydWxlcyBjb25maWd1cmF0aW9uLCBjb21waWxlcyBjYWNoZXMgaWYgbm90IGV4aXN0cyBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogRGVmYXVsdCBjaGFpbiBuYW1lIGlzIGAnJ2AgKGVtcHR5IHN0cmluZykuIEl0IGNhbid0IGJlIHNraXBwZWQuIFRoYXQnc1xuICogZG9uZSBpbnRlbnRpb25hbGx5LCB0byBrZWVwIHNpZ25hdHVyZSBtb25vbW9ycGhpYyBmb3IgaGlnaCBzcGVlZC5cbiAqKi9cblJ1bGVyLnByb3RvdHlwZS5nZXRSdWxlcyA9IGZ1bmN0aW9uIChjaGFpbk5hbWUpIHtcbiAgaWYgKHRoaXMuX19jYWNoZV9fID09PSBudWxsKSB7XG4gICAgdGhpcy5fX2NvbXBpbGVfXygpO1xuICB9XG5cbiAgLy8gQ2hhaW4gY2FuIGJlIGVtcHR5LCBpZiBydWxlcyBkaXNhYmxlZC4gQnV0IHdlIHN0aWxsIGhhdmUgdG8gcmV0dXJuIEFycmF5LlxuICByZXR1cm4gdGhpcy5fX2NhY2hlX19bY2hhaW5OYW1lXSB8fCBbXTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUnVsZXI7XG4iLCIvLyBCbG9jayBxdW90ZXNcblxuJ3VzZSBzdHJpY3QnO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmxvY2txdW90ZShzdGF0ZSwgc3RhcnRMaW5lLCBlbmRMaW5lLCBzaWxlbnQpIHtcbiAgdmFyIG5leHRMaW5lLCBsYXN0TGluZUVtcHR5LCBvbGRUU2hpZnQsIG9sZEJNYXJrcywgb2xkSW5kZW50LCBvbGRQYXJlbnRUeXBlLCBsaW5lcyxcbiAgICAgIHRlcm1pbmF0b3JSdWxlcywgdG9rZW4sXG4gICAgICBpLCBsLCB0ZXJtaW5hdGUsXG4gICAgICBwb3MgPSBzdGF0ZS5iTWFya3Nbc3RhcnRMaW5lXSArIHN0YXRlLnRTaGlmdFtzdGFydExpbmVdLFxuICAgICAgbWF4ID0gc3RhdGUuZU1hcmtzW3N0YXJ0TGluZV07XG5cbiAgLy8gY2hlY2sgdGhlIGJsb2NrIHF1b3RlIG1hcmtlclxuICBpZiAoc3RhdGUuc3JjLmNoYXJDb2RlQXQocG9zKyspICE9PSAweDNFLyogPiAqLykgeyByZXR1cm4gZmFsc2U7IH1cblxuICAvLyB3ZSBrbm93IHRoYXQgaXQncyBnb2luZyB0byBiZSBhIHZhbGlkIGJsb2NrcXVvdGUsXG4gIC8vIHNvIG5vIHBvaW50IHRyeWluZyB0byBmaW5kIHRoZSBlbmQgb2YgaXQgaW4gc2lsZW50IG1vZGVcbiAgaWYgKHNpbGVudCkgeyByZXR1cm4gdHJ1ZTsgfVxuXG4gIC8vIHNraXAgb25lIG9wdGlvbmFsIHNwYWNlIGFmdGVyICc+J1xuICBpZiAoc3RhdGUuc3JjLmNoYXJDb2RlQXQocG9zKSA9PT0gMHgyMCkgeyBwb3MrKzsgfVxuXG4gIG9sZEluZGVudCA9IHN0YXRlLmJsa0luZGVudDtcbiAgc3RhdGUuYmxrSW5kZW50ID0gMDtcblxuICBvbGRCTWFya3MgPSBbIHN0YXRlLmJNYXJrc1tzdGFydExpbmVdIF07XG4gIHN0YXRlLmJNYXJrc1tzdGFydExpbmVdID0gcG9zO1xuXG4gIC8vIGNoZWNrIGlmIHdlIGhhdmUgYW4gZW1wdHkgYmxvY2txdW90ZVxuICBwb3MgPSBwb3MgPCBtYXggPyBzdGF0ZS5za2lwU3BhY2VzKHBvcykgOiBwb3M7XG4gIGxhc3RMaW5lRW1wdHkgPSBwb3MgPj0gbWF4O1xuXG4gIG9sZFRTaGlmdCA9IFsgc3RhdGUudFNoaWZ0W3N0YXJ0TGluZV0gXTtcbiAgc3RhdGUudFNoaWZ0W3N0YXJ0TGluZV0gPSBwb3MgLSBzdGF0ZS5iTWFya3Nbc3RhcnRMaW5lXTtcblxuICB0ZXJtaW5hdG9yUnVsZXMgPSBzdGF0ZS5tZC5ibG9jay5ydWxlci5nZXRSdWxlcygnYmxvY2txdW90ZScpO1xuXG4gIC8vIFNlYXJjaCB0aGUgZW5kIG9mIHRoZSBibG9ja1xuICAvL1xuICAvLyBCbG9jayBlbmRzIHdpdGggZWl0aGVyOlxuICAvLyAgMS4gYW4gZW1wdHkgbGluZSBvdXRzaWRlOlxuICAvLyAgICAgYGBgXG4gIC8vICAgICA+IHRlc3RcbiAgLy9cbiAgLy8gICAgIGBgYFxuICAvLyAgMi4gYW4gZW1wdHkgbGluZSBpbnNpZGU6XG4gIC8vICAgICBgYGBcbiAgLy8gICAgID5cbiAgLy8gICAgIHRlc3RcbiAgLy8gICAgIGBgYFxuICAvLyAgMy4gYW5vdGhlciB0YWdcbiAgLy8gICAgIGBgYFxuICAvLyAgICAgPiB0ZXN0XG4gIC8vICAgICAgLSAtIC1cbiAgLy8gICAgIGBgYFxuICBmb3IgKG5leHRMaW5lID0gc3RhcnRMaW5lICsgMTsgbmV4dExpbmUgPCBlbmRMaW5lOyBuZXh0TGluZSsrKSB7XG4gICAgcG9zID0gc3RhdGUuYk1hcmtzW25leHRMaW5lXSArIHN0YXRlLnRTaGlmdFtuZXh0TGluZV07XG4gICAgbWF4ID0gc3RhdGUuZU1hcmtzW25leHRMaW5lXTtcblxuICAgIGlmIChwb3MgPj0gbWF4KSB7XG4gICAgICAvLyBDYXNlIDE6IGxpbmUgaXMgbm90IGluc2lkZSB0aGUgYmxvY2txdW90ZSwgYW5kIHRoaXMgbGluZSBpcyBlbXB0eS5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChzdGF0ZS5zcmMuY2hhckNvZGVBdChwb3MrKykgPT09IDB4M0UvKiA+ICovKSB7XG4gICAgICAvLyBUaGlzIGxpbmUgaXMgaW5zaWRlIHRoZSBibG9ja3F1b3RlLlxuXG4gICAgICAvLyBza2lwIG9uZSBvcHRpb25hbCBzcGFjZSBhZnRlciAnPidcbiAgICAgIGlmIChzdGF0ZS5zcmMuY2hhckNvZGVBdChwb3MpID09PSAweDIwKSB7IHBvcysrOyB9XG5cbiAgICAgIG9sZEJNYXJrcy5wdXNoKHN0YXRlLmJNYXJrc1tuZXh0TGluZV0pO1xuICAgICAgc3RhdGUuYk1hcmtzW25leHRMaW5lXSA9IHBvcztcblxuICAgICAgcG9zID0gcG9zIDwgbWF4ID8gc3RhdGUuc2tpcFNwYWNlcyhwb3MpIDogcG9zO1xuICAgICAgbGFzdExpbmVFbXB0eSA9IHBvcyA+PSBtYXg7XG5cbiAgICAgIG9sZFRTaGlmdC5wdXNoKHN0YXRlLnRTaGlmdFtuZXh0TGluZV0pO1xuICAgICAgc3RhdGUudFNoaWZ0W25leHRMaW5lXSA9IHBvcyAtIHN0YXRlLmJNYXJrc1tuZXh0TGluZV07XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBDYXNlIDI6IGxpbmUgaXMgbm90IGluc2lkZSB0aGUgYmxvY2txdW90ZSwgYW5kIHRoZSBsYXN0IGxpbmUgd2FzIGVtcHR5LlxuICAgIGlmIChsYXN0TGluZUVtcHR5KSB7IGJyZWFrOyB9XG5cbiAgICAvLyBDYXNlIDM6IGFub3RoZXIgdGFnIGZvdW5kLlxuICAgIHRlcm1pbmF0ZSA9IGZhbHNlO1xuICAgIGZvciAoaSA9IDAsIGwgPSB0ZXJtaW5hdG9yUnVsZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAodGVybWluYXRvclJ1bGVzW2ldKHN0YXRlLCBuZXh0TGluZSwgZW5kTGluZSwgdHJ1ZSkpIHtcbiAgICAgICAgdGVybWluYXRlID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0ZXJtaW5hdGUpIHsgYnJlYWs7IH1cblxuICAgIG9sZEJNYXJrcy5wdXNoKHN0YXRlLmJNYXJrc1tuZXh0TGluZV0pO1xuICAgIG9sZFRTaGlmdC5wdXNoKHN0YXRlLnRTaGlmdFtuZXh0TGluZV0pO1xuXG4gICAgLy8gQSBuZWdhdGl2ZSBudW1iZXIgbWVhbnMgdGhhdCB0aGlzIGlzIGEgcGFyYWdyYXBoIGNvbnRpbnVhdGlvbjtcbiAgICAvL1xuICAgIC8vIEFueSBuZWdhdGl2ZSBudW1iZXIgd2lsbCBkbyB0aGUgam9iIGhlcmUsIGJ1dCBpdCdzIGJldHRlciBmb3IgaXRcbiAgICAvLyB0byBiZSBsYXJnZSBlbm91Z2ggdG8gbWFrZSBhbnkgYnVncyBvYnZpb3VzLlxuICAgIHN0YXRlLnRTaGlmdFtuZXh0TGluZV0gPSAtMTMzNztcbiAgfVxuXG4gIG9sZFBhcmVudFR5cGUgPSBzdGF0ZS5wYXJlbnRUeXBlO1xuICBzdGF0ZS5wYXJlbnRUeXBlID0gJ2Jsb2NrcXVvdGUnO1xuXG4gIHRva2VuICAgICAgICA9IHN0YXRlLnB1c2goJ2Jsb2NrcXVvdGVfb3BlbicsICdibG9ja3F1b3RlJywgMSk7XG4gIHRva2VuLm1hcmt1cCA9ICc+JztcbiAgdG9rZW4ubWFwICAgID0gbGluZXMgPSBbIHN0YXJ0TGluZSwgMCBdO1xuXG4gIHN0YXRlLm1kLmJsb2NrLnRva2VuaXplKHN0YXRlLCBzdGFydExpbmUsIG5leHRMaW5lKTtcblxuICB0b2tlbiAgICAgICAgPSBzdGF0ZS5wdXNoKCdibG9ja3F1b3RlX2Nsb3NlJywgJ2Jsb2NrcXVvdGUnLCAtMSk7XG4gIHRva2VuLm1hcmt1cCA9ICc+JztcblxuICBzdGF0ZS5wYXJlbnRUeXBlID0gb2xkUGFyZW50VHlwZTtcbiAgbGluZXNbMV0gPSBzdGF0ZS5saW5lO1xuXG4gIC8vIFJlc3RvcmUgb3JpZ2luYWwgdFNoaWZ0OyB0aGlzIG1pZ2h0IG5vdCBiZSBuZWNlc3Nhcnkgc2luY2UgdGhlIHBhcnNlclxuICAvLyBoYXMgYWxyZWFkeSBiZWVuIGhlcmUsIGJ1dCBqdXN0IHRvIG1ha2Ugc3VyZSB3ZSBjYW4gZG8gdGhhdC5cbiAgZm9yIChpID0gMDsgaSA8IG9sZFRTaGlmdC5sZW5ndGg7IGkrKykge1xuICAgIHN0YXRlLmJNYXJrc1tpICsgc3RhcnRMaW5lXSA9IG9sZEJNYXJrc1tpXTtcbiAgICBzdGF0ZS50U2hpZnRbaSArIHN0YXJ0TGluZV0gPSBvbGRUU2hpZnRbaV07XG4gIH1cbiAgc3RhdGUuYmxrSW5kZW50ID0gb2xkSW5kZW50O1xuXG4gIHJldHVybiB0cnVlO1xufTtcbiIsIi8vIENvZGUgYmxvY2sgKDQgc3BhY2VzIHBhZGRlZClcblxuJ3VzZSBzdHJpY3QnO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29kZShzdGF0ZSwgc3RhcnRMaW5lLCBlbmRMaW5lLyosIHNpbGVudCovKSB7XG4gIHZhciBuZXh0TGluZSwgbGFzdCwgdG9rZW47XG5cbiAgaWYgKHN0YXRlLnRTaGlmdFtzdGFydExpbmVdIC0gc3RhdGUuYmxrSW5kZW50IDwgNCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICBsYXN0ID0gbmV4dExpbmUgPSBzdGFydExpbmUgKyAxO1xuXG4gIHdoaWxlIChuZXh0TGluZSA8IGVuZExpbmUpIHtcbiAgICBpZiAoc3RhdGUuaXNFbXB0eShuZXh0TGluZSkpIHtcbiAgICAgIG5leHRMaW5lKys7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKHN0YXRlLnRTaGlmdFtuZXh0TGluZV0gLSBzdGF0ZS5ibGtJbmRlbnQgPj0gNCkge1xuICAgICAgbmV4dExpbmUrKztcbiAgICAgIGxhc3QgPSBuZXh0TGluZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBicmVhaztcbiAgfVxuXG4gIHN0YXRlLmxpbmUgPSBuZXh0TGluZTtcblxuICB0b2tlbiAgICAgICAgID0gc3RhdGUucHVzaCgnY29kZV9ibG9jaycsICdjb2RlJywgMCk7XG4gIHRva2VuLmNvbnRlbnQgPSBzdGF0ZS5nZXRMaW5lcyhzdGFydExpbmUsIGxhc3QsIDQgKyBzdGF0ZS5ibGtJbmRlbnQsIHRydWUpO1xuICB0b2tlbi5tYXAgICAgID0gWyBzdGFydExpbmUsIHN0YXRlLmxpbmUgXTtcblxuICByZXR1cm4gdHJ1ZTtcbn07XG4iLCIvLyBmZW5jZXMgKGBgYCBsYW5nLCB+fn4gbGFuZylcblxuJ3VzZSBzdHJpY3QnO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZmVuY2Uoc3RhdGUsIHN0YXJ0TGluZSwgZW5kTGluZSwgc2lsZW50KSB7XG4gIHZhciBtYXJrZXIsIGxlbiwgcGFyYW1zLCBuZXh0TGluZSwgbWVtLCB0b2tlbiwgbWFya3VwLFxuICAgICAgaGF2ZUVuZE1hcmtlciA9IGZhbHNlLFxuICAgICAgcG9zID0gc3RhdGUuYk1hcmtzW3N0YXJ0TGluZV0gKyBzdGF0ZS50U2hpZnRbc3RhcnRMaW5lXSxcbiAgICAgIG1heCA9IHN0YXRlLmVNYXJrc1tzdGFydExpbmVdO1xuXG4gIGlmIChwb3MgKyAzID4gbWF4KSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIG1hcmtlciA9IHN0YXRlLnNyYy5jaGFyQ29kZUF0KHBvcyk7XG5cbiAgaWYgKG1hcmtlciAhPT0gMHg3RS8qIH4gKi8gJiYgbWFya2VyICE9PSAweDYwIC8qIGAgKi8pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBzY2FuIG1hcmtlciBsZW5ndGhcbiAgbWVtID0gcG9zO1xuICBwb3MgPSBzdGF0ZS5za2lwQ2hhcnMocG9zLCBtYXJrZXIpO1xuXG4gIGxlbiA9IHBvcyAtIG1lbTtcblxuICBpZiAobGVuIDwgMykgeyByZXR1cm4gZmFsc2U7IH1cblxuICBtYXJrdXAgPSBzdGF0ZS5zcmMuc2xpY2UobWVtLCBwb3MpO1xuICBwYXJhbXMgPSBzdGF0ZS5zcmMuc2xpY2UocG9zLCBtYXgpO1xuXG4gIGlmIChwYXJhbXMuaW5kZXhPZignYCcpID49IDApIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgLy8gU2luY2Ugc3RhcnQgaXMgZm91bmQsIHdlIGNhbiByZXBvcnQgc3VjY2VzcyBoZXJlIGluIHZhbGlkYXRpb24gbW9kZVxuICBpZiAoc2lsZW50KSB7IHJldHVybiB0cnVlOyB9XG5cbiAgLy8gc2VhcmNoIGVuZCBvZiBibG9ja1xuICBuZXh0TGluZSA9IHN0YXJ0TGluZTtcblxuICBmb3IgKDs7KSB7XG4gICAgbmV4dExpbmUrKztcbiAgICBpZiAobmV4dExpbmUgPj0gZW5kTGluZSkge1xuICAgICAgLy8gdW5jbG9zZWQgYmxvY2sgc2hvdWxkIGJlIGF1dG9jbG9zZWQgYnkgZW5kIG9mIGRvY3VtZW50LlxuICAgICAgLy8gYWxzbyBibG9jayBzZWVtcyB0byBiZSBhdXRvY2xvc2VkIGJ5IGVuZCBvZiBwYXJlbnRcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHBvcyA9IG1lbSA9IHN0YXRlLmJNYXJrc1tuZXh0TGluZV0gKyBzdGF0ZS50U2hpZnRbbmV4dExpbmVdO1xuICAgIG1heCA9IHN0YXRlLmVNYXJrc1tuZXh0TGluZV07XG5cbiAgICBpZiAocG9zIDwgbWF4ICYmIHN0YXRlLnRTaGlmdFtuZXh0TGluZV0gPCBzdGF0ZS5ibGtJbmRlbnQpIHtcbiAgICAgIC8vIG5vbi1lbXB0eSBsaW5lIHdpdGggbmVnYXRpdmUgaW5kZW50IHNob3VsZCBzdG9wIHRoZSBsaXN0OlxuICAgICAgLy8gLSBgYGBcbiAgICAgIC8vICB0ZXN0XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoc3RhdGUuc3JjLmNoYXJDb2RlQXQocG9zKSAhPT0gbWFya2VyKSB7IGNvbnRpbnVlOyB9XG5cbiAgICBpZiAoc3RhdGUudFNoaWZ0W25leHRMaW5lXSAtIHN0YXRlLmJsa0luZGVudCA+PSA0KSB7XG4gICAgICAvLyBjbG9zaW5nIGZlbmNlIHNob3VsZCBiZSBpbmRlbnRlZCBsZXNzIHRoYW4gNCBzcGFjZXNcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHBvcyA9IHN0YXRlLnNraXBDaGFycyhwb3MsIG1hcmtlcik7XG5cbiAgICAvLyBjbG9zaW5nIGNvZGUgZmVuY2UgbXVzdCBiZSBhdCBsZWFzdCBhcyBsb25nIGFzIHRoZSBvcGVuaW5nIG9uZVxuICAgIGlmIChwb3MgLSBtZW0gPCBsZW4pIHsgY29udGludWU7IH1cblxuICAgIC8vIG1ha2Ugc3VyZSB0YWlsIGhhcyBzcGFjZXMgb25seVxuICAgIHBvcyA9IHN0YXRlLnNraXBTcGFjZXMocG9zKTtcblxuICAgIGlmIChwb3MgPCBtYXgpIHsgY29udGludWU7IH1cblxuICAgIGhhdmVFbmRNYXJrZXIgPSB0cnVlO1xuICAgIC8vIGZvdW5kIVxuICAgIGJyZWFrO1xuICB9XG5cbiAgLy8gSWYgYSBmZW5jZSBoYXMgaGVhZGluZyBzcGFjZXMsIHRoZXkgc2hvdWxkIGJlIHJlbW92ZWQgZnJvbSBpdHMgaW5uZXIgYmxvY2tcbiAgbGVuID0gc3RhdGUudFNoaWZ0W3N0YXJ0TGluZV07XG5cbiAgc3RhdGUubGluZSA9IG5leHRMaW5lICsgKGhhdmVFbmRNYXJrZXIgPyAxIDogMCk7XG5cbiAgdG9rZW4gICAgICAgICA9IHN0YXRlLnB1c2goJ2ZlbmNlJywgJ2NvZGUnLCAwKTtcbiAgdG9rZW4uaW5mbyAgICA9IHBhcmFtcztcbiAgdG9rZW4uY29udGVudCA9IHN0YXRlLmdldExpbmVzKHN0YXJ0TGluZSArIDEsIG5leHRMaW5lLCBsZW4sIHRydWUpO1xuICB0b2tlbi5tYXJrdXAgID0gbWFya3VwO1xuICB0b2tlbi5tYXAgICAgID0gWyBzdGFydExpbmUsIHN0YXRlLmxpbmUgXTtcblxuICByZXR1cm4gdHJ1ZTtcbn07XG4iLCIvLyBoZWFkaW5nICgjLCAjIywgLi4uKVxuXG4ndXNlIHN0cmljdCc7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoZWFkaW5nKHN0YXRlLCBzdGFydExpbmUsIGVuZExpbmUsIHNpbGVudCkge1xuICB2YXIgY2gsIGxldmVsLCB0bXAsIHRva2VuLFxuICAgICAgcG9zID0gc3RhdGUuYk1hcmtzW3N0YXJ0TGluZV0gKyBzdGF0ZS50U2hpZnRbc3RhcnRMaW5lXSxcbiAgICAgIG1heCA9IHN0YXRlLmVNYXJrc1tzdGFydExpbmVdO1xuXG4gIGNoICA9IHN0YXRlLnNyYy5jaGFyQ29kZUF0KHBvcyk7XG5cbiAgaWYgKGNoICE9PSAweDIzLyogIyAqLyB8fCBwb3MgPj0gbWF4KSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIC8vIGNvdW50IGhlYWRpbmcgbGV2ZWxcbiAgbGV2ZWwgPSAxO1xuICBjaCA9IHN0YXRlLnNyYy5jaGFyQ29kZUF0KCsrcG9zKTtcbiAgd2hpbGUgKGNoID09PSAweDIzLyogIyAqLyAmJiBwb3MgPCBtYXggJiYgbGV2ZWwgPD0gNikge1xuICAgIGxldmVsKys7XG4gICAgY2ggPSBzdGF0ZS5zcmMuY2hhckNvZGVBdCgrK3Bvcyk7XG4gIH1cblxuICBpZiAobGV2ZWwgPiA2IHx8IChwb3MgPCBtYXggJiYgY2ggIT09IDB4MjAvKiBzcGFjZSAqLykpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgaWYgKHNpbGVudCkgeyByZXR1cm4gdHJ1ZTsgfVxuXG4gIC8vIExldCdzIGN1dCB0YWlscyBsaWtlICcgICAgIyMjICAnIGZyb20gdGhlIGVuZCBvZiBzdHJpbmdcblxuICBtYXggPSBzdGF0ZS5za2lwQ2hhcnNCYWNrKG1heCwgMHgyMCwgcG9zKTsgLy8gc3BhY2VcbiAgdG1wID0gc3RhdGUuc2tpcENoYXJzQmFjayhtYXgsIDB4MjMsIHBvcyk7IC8vICNcbiAgaWYgKHRtcCA+IHBvcyAmJiBzdGF0ZS5zcmMuY2hhckNvZGVBdCh0bXAgLSAxKSA9PT0gMHgyMC8qIHNwYWNlICovKSB7XG4gICAgbWF4ID0gdG1wO1xuICB9XG5cbiAgc3RhdGUubGluZSA9IHN0YXJ0TGluZSArIDE7XG5cbiAgdG9rZW4gICAgICAgID0gc3RhdGUucHVzaCgnaGVhZGluZ19vcGVuJywgJ2gnICsgU3RyaW5nKGxldmVsKSwgMSk7XG4gIHRva2VuLm1hcmt1cCA9ICcjIyMjIyMjIycuc2xpY2UoMCwgbGV2ZWwpO1xuICB0b2tlbi5tYXAgICAgPSBbIHN0YXJ0TGluZSwgc3RhdGUubGluZSBdO1xuXG4gIHRva2VuICAgICAgICAgID0gc3RhdGUucHVzaCgnaW5saW5lJywgJycsIDApO1xuICB0b2tlbi5jb250ZW50ICA9IHN0YXRlLnNyYy5zbGljZShwb3MsIG1heCkudHJpbSgpO1xuICB0b2tlbi5tYXAgICAgICA9IFsgc3RhcnRMaW5lLCBzdGF0ZS5saW5lIF07XG4gIHRva2VuLmNoaWxkcmVuID0gW107XG5cbiAgdG9rZW4gICAgICAgID0gc3RhdGUucHVzaCgnaGVhZGluZ19jbG9zZScsICdoJyArIFN0cmluZyhsZXZlbCksIC0xKTtcbiAgdG9rZW4ubWFya3VwID0gJyMjIyMjIyMjJy5zbGljZSgwLCBsZXZlbCk7XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuIiwiLy8gSG9yaXpvbnRhbCBydWxlXG5cbid1c2Ugc3RyaWN0JztcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhyKHN0YXRlLCBzdGFydExpbmUsIGVuZExpbmUsIHNpbGVudCkge1xuICB2YXIgbWFya2VyLCBjbnQsIGNoLCB0b2tlbixcbiAgICAgIHBvcyA9IHN0YXRlLmJNYXJrc1tzdGFydExpbmVdICsgc3RhdGUudFNoaWZ0W3N0YXJ0TGluZV0sXG4gICAgICBtYXggPSBzdGF0ZS5lTWFya3Nbc3RhcnRMaW5lXTtcblxuICBtYXJrZXIgPSBzdGF0ZS5zcmMuY2hhckNvZGVBdChwb3MrKyk7XG5cbiAgLy8gQ2hlY2sgaHIgbWFya2VyXG4gIGlmIChtYXJrZXIgIT09IDB4MkEvKiAqICovICYmXG4gICAgICBtYXJrZXIgIT09IDB4MkQvKiAtICovICYmXG4gICAgICBtYXJrZXIgIT09IDB4NUYvKiBfICovKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gbWFya2VycyBjYW4gYmUgbWl4ZWQgd2l0aCBzcGFjZXMsIGJ1dCB0aGVyZSBzaG91bGQgYmUgYXQgbGVhc3QgMyBvbmVcblxuICBjbnQgPSAxO1xuICB3aGlsZSAocG9zIDwgbWF4KSB7XG4gICAgY2ggPSBzdGF0ZS5zcmMuY2hhckNvZGVBdChwb3MrKyk7XG4gICAgaWYgKGNoICE9PSBtYXJrZXIgJiYgY2ggIT09IDB4MjAvKiBzcGFjZSAqLykgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAoY2ggPT09IG1hcmtlcikgeyBjbnQrKzsgfVxuICB9XG5cbiAgaWYgKGNudCA8IDMpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgaWYgKHNpbGVudCkgeyByZXR1cm4gdHJ1ZTsgfVxuXG4gIHN0YXRlLmxpbmUgPSBzdGFydExpbmUgKyAxO1xuXG4gIHRva2VuICAgICAgICA9IHN0YXRlLnB1c2goJ2hyJywgJ2hyJywgMCk7XG4gIHRva2VuLm1hcCAgICA9IFsgc3RhcnRMaW5lLCBzdGF0ZS5saW5lIF07XG4gIHRva2VuLm1hcmt1cCA9IEFycmF5KGNudCArIDEpLmpvaW4oU3RyaW5nLmZyb21DaGFyQ29kZShtYXJrZXIpKTtcblxuICByZXR1cm4gdHJ1ZTtcbn07XG4iLCIvLyBIVE1MIGJsb2NrXG5cbid1c2Ugc3RyaWN0JztcblxuXG52YXIgYmxvY2tfbmFtZXMgPSByZXF1aXJlKCcuLi9jb21tb24vaHRtbF9ibG9ja3MnKTtcblxuXG52YXIgSFRNTF9UQUdfT1BFTl9SRSA9IC9ePChbYS16QS1aXVthLXpBLVowLTldezAsMTR9KVtcXHNcXC8+XS87XG52YXIgSFRNTF9UQUdfQ0xPU0VfUkUgPSAvXjxcXC8oW2EtekEtWl1bYS16QS1aMC05XXswLDE0fSlbXFxzPl0vO1xuXG5mdW5jdGlvbiBpc0xldHRlcihjaCkge1xuICAvKmVzbGludCBuby1iaXR3aXNlOjAqL1xuICB2YXIgbGMgPSBjaCB8IDB4MjA7IC8vIHRvIGxvd2VyIGNhc2VcbiAgcmV0dXJuIChsYyA+PSAweDYxLyogYSAqLykgJiYgKGxjIDw9IDB4N2EvKiB6ICovKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBodG1sX2Jsb2NrKHN0YXRlLCBzdGFydExpbmUsIGVuZExpbmUsIHNpbGVudCkge1xuICB2YXIgY2gsIG1hdGNoLCBuZXh0TGluZSwgdG9rZW4sXG4gICAgICBwb3MgPSBzdGF0ZS5iTWFya3Nbc3RhcnRMaW5lXSxcbiAgICAgIG1heCA9IHN0YXRlLmVNYXJrc1tzdGFydExpbmVdLFxuICAgICAgc2hpZnQgPSBzdGF0ZS50U2hpZnRbc3RhcnRMaW5lXTtcblxuICBwb3MgKz0gc2hpZnQ7XG5cbiAgaWYgKCFzdGF0ZS5tZC5vcHRpb25zLmh0bWwpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgaWYgKHNoaWZ0ID4gMyB8fCBwb3MgKyAyID49IG1heCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICBpZiAoc3RhdGUuc3JjLmNoYXJDb2RlQXQocG9zKSAhPT0gMHgzQy8qIDwgKi8pIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgY2ggPSBzdGF0ZS5zcmMuY2hhckNvZGVBdChwb3MgKyAxKTtcblxuICBpZiAoY2ggPT09IDB4MjEvKiAhICovIHx8IGNoID09PSAweDNGLyogPyAqLykge1xuICAgIC8vIERpcmVjdGl2ZSBzdGFydCAvIGNvbW1lbnQgc3RhcnQgLyBwcm9jZXNzaW5nIGluc3RydWN0aW9uIHN0YXJ0XG4gICAgaWYgKHNpbGVudCkgeyByZXR1cm4gdHJ1ZTsgfVxuXG4gIH0gZWxzZSBpZiAoY2ggPT09IDB4MkYvKiAvICovIHx8IGlzTGV0dGVyKGNoKSkge1xuXG4gICAgLy8gUHJvYmFibHkgc3RhcnQgb3IgZW5kIG9mIHRhZ1xuICAgIGlmIChjaCA9PT0gMHgyRi8qIFxcICovKSB7XG4gICAgICAvLyBjbG9zaW5nIHRhZ1xuICAgICAgbWF0Y2ggPSBzdGF0ZS5zcmMuc2xpY2UocG9zLCBtYXgpLm1hdGNoKEhUTUxfVEFHX0NMT1NFX1JFKTtcbiAgICAgIGlmICghbWF0Y2gpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG9wZW5pbmcgdGFnXG4gICAgICBtYXRjaCA9IHN0YXRlLnNyYy5zbGljZShwb3MsIG1heCkubWF0Y2goSFRNTF9UQUdfT1BFTl9SRSk7XG4gICAgICBpZiAoIW1hdGNoKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIH1cbiAgICAvLyBNYWtlIHN1cmUgdGFnIG5hbWUgaXMgdmFsaWRcbiAgICBpZiAoYmxvY2tfbmFtZXNbbWF0Y2hbMV0udG9Mb3dlckNhc2UoKV0gIT09IHRydWUpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKHNpbGVudCkgeyByZXR1cm4gdHJ1ZTsgfVxuXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gSWYgd2UgYXJlIGhlcmUgLSB3ZSBkZXRlY3RlZCBIVE1MIGJsb2NrLlxuICAvLyBMZXQncyByb2xsIGRvd24gdGlsbCBlbXB0eSBsaW5lIChibG9jayBlbmQpLlxuICBuZXh0TGluZSA9IHN0YXJ0TGluZSArIDE7XG4gIHdoaWxlIChuZXh0TGluZSA8IHN0YXRlLmxpbmVNYXggJiYgIXN0YXRlLmlzRW1wdHkobmV4dExpbmUpKSB7XG4gICAgbmV4dExpbmUrKztcbiAgfVxuXG4gIHN0YXRlLmxpbmUgPSBuZXh0TGluZTtcblxuICB0b2tlbiAgICAgICAgID0gc3RhdGUucHVzaCgnaHRtbF9ibG9jaycsICcnLCAwKTtcbiAgdG9rZW4ubWFwICAgICA9IFsgc3RhcnRMaW5lLCBzdGF0ZS5saW5lIF07XG4gIHRva2VuLmNvbnRlbnQgPSBzdGF0ZS5nZXRMaW5lcyhzdGFydExpbmUsIG5leHRMaW5lLCAwLCB0cnVlKTtcblxuICByZXR1cm4gdHJ1ZTtcbn07XG4iLCIvLyBsaGVhZGluZyAoLS0tLCA9PT0pXG5cbid1c2Ugc3RyaWN0JztcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxoZWFkaW5nKHN0YXRlLCBzdGFydExpbmUsIGVuZExpbmUvKiwgc2lsZW50Ki8pIHtcbiAgdmFyIG1hcmtlciwgcG9zLCBtYXgsIHRva2VuLCBsZXZlbCxcbiAgICAgIG5leHQgPSBzdGFydExpbmUgKyAxO1xuXG4gIGlmIChuZXh0ID49IGVuZExpbmUpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmIChzdGF0ZS50U2hpZnRbbmV4dF0gPCBzdGF0ZS5ibGtJbmRlbnQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgLy8gU2NhbiBuZXh0IGxpbmVcblxuICBpZiAoc3RhdGUudFNoaWZ0W25leHRdIC0gc3RhdGUuYmxrSW5kZW50ID4gMykgeyByZXR1cm4gZmFsc2U7IH1cblxuICBwb3MgPSBzdGF0ZS5iTWFya3NbbmV4dF0gKyBzdGF0ZS50U2hpZnRbbmV4dF07XG4gIG1heCA9IHN0YXRlLmVNYXJrc1tuZXh0XTtcblxuICBpZiAocG9zID49IG1heCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICBtYXJrZXIgPSBzdGF0ZS5zcmMuY2hhckNvZGVBdChwb3MpO1xuXG4gIGlmIChtYXJrZXIgIT09IDB4MkQvKiAtICovICYmIG1hcmtlciAhPT0gMHgzRC8qID0gKi8pIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgcG9zID0gc3RhdGUuc2tpcENoYXJzKHBvcywgbWFya2VyKTtcblxuICBwb3MgPSBzdGF0ZS5za2lwU3BhY2VzKHBvcyk7XG5cbiAgaWYgKHBvcyA8IG1heCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICBwb3MgPSBzdGF0ZS5iTWFya3Nbc3RhcnRMaW5lXSArIHN0YXRlLnRTaGlmdFtzdGFydExpbmVdO1xuXG4gIHN0YXRlLmxpbmUgPSBuZXh0ICsgMTtcbiAgbGV2ZWwgPSAobWFya2VyID09PSAweDNELyogPSAqLyA/IDEgOiAyKTtcblxuICB0b2tlbiAgICAgICAgICA9IHN0YXRlLnB1c2goJ2hlYWRpbmdfb3BlbicsICdoJyArIFN0cmluZyhsZXZlbCksIDEpO1xuICB0b2tlbi5tYXJrdXAgICA9IFN0cmluZy5mcm9tQ2hhckNvZGUobWFya2VyKTtcbiAgdG9rZW4ubWFwICAgICAgPSBbIHN0YXJ0TGluZSwgc3RhdGUubGluZSBdO1xuXG4gIHRva2VuICAgICAgICAgID0gc3RhdGUucHVzaCgnaW5saW5lJywgJycsIDApO1xuICB0b2tlbi5jb250ZW50ICA9IHN0YXRlLnNyYy5zbGljZShwb3MsIHN0YXRlLmVNYXJrc1tzdGFydExpbmVdKS50cmltKCk7XG4gIHRva2VuLm1hcCAgICAgID0gWyBzdGFydExpbmUsIHN0YXRlLmxpbmUgLSAxIF07XG4gIHRva2VuLmNoaWxkcmVuID0gW107XG5cbiAgdG9rZW4gICAgICAgICAgPSBzdGF0ZS5wdXNoKCdoZWFkaW5nX2Nsb3NlJywgJ2gnICsgU3RyaW5nKGxldmVsKSwgLTEpO1xuICB0b2tlbi5tYXJrdXAgICA9IFN0cmluZy5mcm9tQ2hhckNvZGUobWFya2VyKTtcblxuICByZXR1cm4gdHJ1ZTtcbn07XG4iLCIvLyBMaXN0c1xuXG4ndXNlIHN0cmljdCc7XG5cblxuLy8gU2VhcmNoIGBbLSsqXVtcXG4gXWAsIHJldHVybnMgbmV4dCBwb3MgYXJ0ZXIgbWFya2VyIG9uIHN1Y2Nlc3Ncbi8vIG9yIC0xIG9uIGZhaWwuXG5mdW5jdGlvbiBza2lwQnVsbGV0TGlzdE1hcmtlcihzdGF0ZSwgc3RhcnRMaW5lKSB7XG4gIHZhciBtYXJrZXIsIHBvcywgbWF4O1xuXG4gIHBvcyA9IHN0YXRlLmJNYXJrc1tzdGFydExpbmVdICsgc3RhdGUudFNoaWZ0W3N0YXJ0TGluZV07XG4gIG1heCA9IHN0YXRlLmVNYXJrc1tzdGFydExpbmVdO1xuXG4gIG1hcmtlciA9IHN0YXRlLnNyYy5jaGFyQ29kZUF0KHBvcysrKTtcbiAgLy8gQ2hlY2sgYnVsbGV0XG4gIGlmIChtYXJrZXIgIT09IDB4MkEvKiAqICovICYmXG4gICAgICBtYXJrZXIgIT09IDB4MkQvKiAtICovICYmXG4gICAgICBtYXJrZXIgIT09IDB4MkIvKiArICovKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgaWYgKHBvcyA8IG1heCAmJiBzdGF0ZS5zcmMuY2hhckNvZGVBdChwb3MpICE9PSAweDIwKSB7XG4gICAgLy8gXCIgMS50ZXN0IFwiIC0gaXMgbm90IGEgbGlzdCBpdGVtXG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgcmV0dXJuIHBvcztcbn1cblxuLy8gU2VhcmNoIGBcXGQrWy4pXVtcXG4gXWAsIHJldHVybnMgbmV4dCBwb3MgYXJ0ZXIgbWFya2VyIG9uIHN1Y2Nlc3Ncbi8vIG9yIC0xIG9uIGZhaWwuXG5mdW5jdGlvbiBza2lwT3JkZXJlZExpc3RNYXJrZXIoc3RhdGUsIHN0YXJ0TGluZSkge1xuICB2YXIgY2gsXG4gICAgICBwb3MgPSBzdGF0ZS5iTWFya3Nbc3RhcnRMaW5lXSArIHN0YXRlLnRTaGlmdFtzdGFydExpbmVdLFxuICAgICAgbWF4ID0gc3RhdGUuZU1hcmtzW3N0YXJ0TGluZV07XG5cbiAgLy8gTGlzdCBtYXJrZXIgc2hvdWxkIGhhdmUgYXQgbGVhc3QgMiBjaGFycyAoZGlnaXQgKyBkb3QpXG4gIGlmIChwb3MgKyAxID49IG1heCkgeyByZXR1cm4gLTE7IH1cblxuICBjaCA9IHN0YXRlLnNyYy5jaGFyQ29kZUF0KHBvcysrKTtcblxuICBpZiAoY2ggPCAweDMwLyogMCAqLyB8fCBjaCA+IDB4MzkvKiA5ICovKSB7IHJldHVybiAtMTsgfVxuXG4gIGZvciAoOzspIHtcbiAgICAvLyBFT0wgLT4gZmFpbFxuICAgIGlmIChwb3MgPj0gbWF4KSB7IHJldHVybiAtMTsgfVxuXG4gICAgY2ggPSBzdGF0ZS5zcmMuY2hhckNvZGVBdChwb3MrKyk7XG5cbiAgICBpZiAoY2ggPj0gMHgzMC8qIDAgKi8gJiYgY2ggPD0gMHgzOS8qIDkgKi8pIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGZvdW5kIHZhbGlkIG1hcmtlclxuICAgIGlmIChjaCA9PT0gMHgyOS8qICkgKi8gfHwgY2ggPT09IDB4MmUvKiAuICovKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gLTE7XG4gIH1cblxuXG4gIGlmIChwb3MgPCBtYXggJiYgc3RhdGUuc3JjLmNoYXJDb2RlQXQocG9zKSAhPT0gMHgyMC8qIHNwYWNlICovKSB7XG4gICAgLy8gXCIgMS50ZXN0IFwiIC0gaXMgbm90IGEgbGlzdCBpdGVtXG4gICAgcmV0dXJuIC0xO1xuICB9XG4gIHJldHVybiBwb3M7XG59XG5cbmZ1bmN0aW9uIG1hcmtUaWdodFBhcmFncmFwaHMoc3RhdGUsIGlkeCkge1xuICB2YXIgaSwgbCxcbiAgICAgIGxldmVsID0gc3RhdGUubGV2ZWwgKyAyO1xuXG4gIGZvciAoaSA9IGlkeCArIDIsIGwgPSBzdGF0ZS50b2tlbnMubGVuZ3RoIC0gMjsgaSA8IGw7IGkrKykge1xuICAgIGlmIChzdGF0ZS50b2tlbnNbaV0ubGV2ZWwgPT09IGxldmVsICYmIHN0YXRlLnRva2Vuc1tpXS50eXBlID09PSAncGFyYWdyYXBoX29wZW4nKSB7XG4gICAgICBzdGF0ZS50b2tlbnNbaSArIDJdLmhpZGRlbiA9IHRydWU7XG4gICAgICBzdGF0ZS50b2tlbnNbaV0uaGlkZGVuID0gdHJ1ZTtcbiAgICAgIGkgKz0gMjtcbiAgICB9XG4gIH1cbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxpc3Qoc3RhdGUsIHN0YXJ0TGluZSwgZW5kTGluZSwgc2lsZW50KSB7XG4gIHZhciBuZXh0TGluZSxcbiAgICAgIGluZGVudCxcbiAgICAgIG9sZFRTaGlmdCxcbiAgICAgIG9sZEluZGVudCxcbiAgICAgIG9sZFRpZ2h0LFxuICAgICAgb2xkUGFyZW50VHlwZSxcbiAgICAgIHN0YXJ0LFxuICAgICAgcG9zQWZ0ZXJNYXJrZXIsXG4gICAgICBtYXgsXG4gICAgICBpbmRlbnRBZnRlck1hcmtlcixcbiAgICAgIG1hcmtlclZhbHVlLFxuICAgICAgbWFya2VyQ2hhckNvZGUsXG4gICAgICBpc09yZGVyZWQsXG4gICAgICBjb250ZW50U3RhcnQsXG4gICAgICBsaXN0VG9rSWR4LFxuICAgICAgcHJldkVtcHR5RW5kLFxuICAgICAgbGlzdExpbmVzLFxuICAgICAgaXRlbUxpbmVzLFxuICAgICAgdGlnaHQgPSB0cnVlLFxuICAgICAgdGVybWluYXRvclJ1bGVzLFxuICAgICAgdG9rZW4sXG4gICAgICBpLCBsLCB0ZXJtaW5hdGU7XG5cbiAgLy8gRGV0ZWN0IGxpc3QgdHlwZSBhbmQgcG9zaXRpb24gYWZ0ZXIgbWFya2VyXG4gIGlmICgocG9zQWZ0ZXJNYXJrZXIgPSBza2lwT3JkZXJlZExpc3RNYXJrZXIoc3RhdGUsIHN0YXJ0TGluZSkpID49IDApIHtcbiAgICBpc09yZGVyZWQgPSB0cnVlO1xuICB9IGVsc2UgaWYgKChwb3NBZnRlck1hcmtlciA9IHNraXBCdWxsZXRMaXN0TWFya2VyKHN0YXRlLCBzdGFydExpbmUpKSA+PSAwKSB7XG4gICAgaXNPcmRlcmVkID0gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gV2Ugc2hvdWxkIHRlcm1pbmF0ZSBsaXN0IG9uIHN0eWxlIGNoYW5nZS4gUmVtZW1iZXIgZmlyc3Qgb25lIHRvIGNvbXBhcmUuXG4gIG1hcmtlckNoYXJDb2RlID0gc3RhdGUuc3JjLmNoYXJDb2RlQXQocG9zQWZ0ZXJNYXJrZXIgLSAxKTtcblxuICAvLyBGb3IgdmFsaWRhdGlvbiBtb2RlIHdlIGNhbiB0ZXJtaW5hdGUgaW1tZWRpYXRlbHlcbiAgaWYgKHNpbGVudCkgeyByZXR1cm4gdHJ1ZTsgfVxuXG4gIC8vIFN0YXJ0IGxpc3RcbiAgbGlzdFRva0lkeCA9IHN0YXRlLnRva2Vucy5sZW5ndGg7XG5cbiAgaWYgKGlzT3JkZXJlZCkge1xuICAgIHN0YXJ0ID0gc3RhdGUuYk1hcmtzW3N0YXJ0TGluZV0gKyBzdGF0ZS50U2hpZnRbc3RhcnRMaW5lXTtcbiAgICBtYXJrZXJWYWx1ZSA9IE51bWJlcihzdGF0ZS5zcmMuc3Vic3RyKHN0YXJ0LCBwb3NBZnRlck1hcmtlciAtIHN0YXJ0IC0gMSkpO1xuXG4gICAgdG9rZW4gICAgICAgPSBzdGF0ZS5wdXNoKCdvcmRlcmVkX2xpc3Rfb3BlbicsICdvbCcsIDEpO1xuICAgIGlmIChtYXJrZXJWYWx1ZSA+IDEpIHtcbiAgICAgIHRva2VuLmF0dHJzID0gWyBbICdzdGFydCcsIG1hcmtlclZhbHVlIF0gXTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB0b2tlbiAgICAgICA9IHN0YXRlLnB1c2goJ2J1bGxldF9saXN0X29wZW4nLCAndWwnLCAxKTtcbiAgfVxuXG4gIHRva2VuLm1hcCAgICA9IGxpc3RMaW5lcyA9IFsgc3RhcnRMaW5lLCAwIF07XG4gIHRva2VuLm1hcmt1cCA9IFN0cmluZy5mcm9tQ2hhckNvZGUobWFya2VyQ2hhckNvZGUpO1xuXG4gIC8vXG4gIC8vIEl0ZXJhdGUgbGlzdCBpdGVtc1xuICAvL1xuXG4gIG5leHRMaW5lID0gc3RhcnRMaW5lO1xuICBwcmV2RW1wdHlFbmQgPSBmYWxzZTtcbiAgdGVybWluYXRvclJ1bGVzID0gc3RhdGUubWQuYmxvY2sucnVsZXIuZ2V0UnVsZXMoJ2xpc3QnKTtcblxuICB3aGlsZSAobmV4dExpbmUgPCBlbmRMaW5lKSB7XG4gICAgY29udGVudFN0YXJ0ID0gc3RhdGUuc2tpcFNwYWNlcyhwb3NBZnRlck1hcmtlcik7XG4gICAgbWF4ID0gc3RhdGUuZU1hcmtzW25leHRMaW5lXTtcblxuICAgIGlmIChjb250ZW50U3RhcnQgPj0gbWF4KSB7XG4gICAgICAvLyB0cmltbWluZyBzcGFjZSBpbiBcIi0gICAgXFxuICAzXCIgY2FzZSwgaW5kZW50IGlzIDEgaGVyZVxuICAgICAgaW5kZW50QWZ0ZXJNYXJrZXIgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbmRlbnRBZnRlck1hcmtlciA9IGNvbnRlbnRTdGFydCAtIHBvc0FmdGVyTWFya2VyO1xuICAgIH1cblxuICAgIC8vIElmIHdlIGhhdmUgbW9yZSB0aGFuIDQgc3BhY2VzLCB0aGUgaW5kZW50IGlzIDFcbiAgICAvLyAodGhlIHJlc3QgaXMganVzdCBpbmRlbnRlZCBjb2RlIGJsb2NrKVxuICAgIGlmIChpbmRlbnRBZnRlck1hcmtlciA+IDQpIHsgaW5kZW50QWZ0ZXJNYXJrZXIgPSAxOyB9XG5cbiAgICAvLyBcIiAgLSAgdGVzdFwiXG4gICAgLy8gIF5eXl5eIC0gY2FsY3VsYXRpbmcgdG90YWwgbGVuZ3RoIG9mIHRoaXMgdGhpbmdcbiAgICBpbmRlbnQgPSAocG9zQWZ0ZXJNYXJrZXIgLSBzdGF0ZS5iTWFya3NbbmV4dExpbmVdKSArIGluZGVudEFmdGVyTWFya2VyO1xuXG4gICAgLy8gUnVuIHN1YnBhcnNlciAmIHdyaXRlIHRva2Vuc1xuICAgIHRva2VuICAgICAgICA9IHN0YXRlLnB1c2goJ2xpc3RfaXRlbV9vcGVuJywgJ2xpJywgMSk7XG4gICAgdG9rZW4ubWFya3VwID0gU3RyaW5nLmZyb21DaGFyQ29kZShtYXJrZXJDaGFyQ29kZSk7XG4gICAgdG9rZW4ubWFwICAgID0gaXRlbUxpbmVzID0gWyBzdGFydExpbmUsIDAgXTtcblxuICAgIG9sZEluZGVudCA9IHN0YXRlLmJsa0luZGVudDtcbiAgICBvbGRUaWdodCA9IHN0YXRlLnRpZ2h0O1xuICAgIG9sZFRTaGlmdCA9IHN0YXRlLnRTaGlmdFtzdGFydExpbmVdO1xuICAgIG9sZFBhcmVudFR5cGUgPSBzdGF0ZS5wYXJlbnRUeXBlO1xuICAgIHN0YXRlLnRTaGlmdFtzdGFydExpbmVdID0gY29udGVudFN0YXJ0IC0gc3RhdGUuYk1hcmtzW3N0YXJ0TGluZV07XG4gICAgc3RhdGUuYmxrSW5kZW50ID0gaW5kZW50O1xuICAgIHN0YXRlLnRpZ2h0ID0gdHJ1ZTtcbiAgICBzdGF0ZS5wYXJlbnRUeXBlID0gJ2xpc3QnO1xuXG4gICAgc3RhdGUubWQuYmxvY2sudG9rZW5pemUoc3RhdGUsIHN0YXJ0TGluZSwgZW5kTGluZSwgdHJ1ZSk7XG5cbiAgICAvLyBJZiBhbnkgb2YgbGlzdCBpdGVtIGlzIHRpZ2h0LCBtYXJrIGxpc3QgYXMgdGlnaHRcbiAgICBpZiAoIXN0YXRlLnRpZ2h0IHx8IHByZXZFbXB0eUVuZCkge1xuICAgICAgdGlnaHQgPSBmYWxzZTtcbiAgICB9XG4gICAgLy8gSXRlbSBiZWNvbWUgbG9vc2UgaWYgZmluaXNoIHdpdGggZW1wdHkgbGluZSxcbiAgICAvLyBidXQgd2Ugc2hvdWxkIGZpbHRlciBsYXN0IGVsZW1lbnQsIGJlY2F1c2UgaXQgbWVhbnMgbGlzdCBmaW5pc2hcbiAgICBwcmV2RW1wdHlFbmQgPSAoc3RhdGUubGluZSAtIHN0YXJ0TGluZSkgPiAxICYmIHN0YXRlLmlzRW1wdHkoc3RhdGUubGluZSAtIDEpO1xuXG4gICAgc3RhdGUuYmxrSW5kZW50ID0gb2xkSW5kZW50O1xuICAgIHN0YXRlLnRTaGlmdFtzdGFydExpbmVdID0gb2xkVFNoaWZ0O1xuICAgIHN0YXRlLnRpZ2h0ID0gb2xkVGlnaHQ7XG4gICAgc3RhdGUucGFyZW50VHlwZSA9IG9sZFBhcmVudFR5cGU7XG5cbiAgICB0b2tlbiAgICAgICAgPSBzdGF0ZS5wdXNoKCdsaXN0X2l0ZW1fY2xvc2UnLCAnbGknLCAtMSk7XG4gICAgdG9rZW4ubWFya3VwID0gU3RyaW5nLmZyb21DaGFyQ29kZShtYXJrZXJDaGFyQ29kZSk7XG5cbiAgICBuZXh0TGluZSA9IHN0YXJ0TGluZSA9IHN0YXRlLmxpbmU7XG4gICAgaXRlbUxpbmVzWzFdID0gbmV4dExpbmU7XG4gICAgY29udGVudFN0YXJ0ID0gc3RhdGUuYk1hcmtzW3N0YXJ0TGluZV07XG5cbiAgICBpZiAobmV4dExpbmUgPj0gZW5kTGluZSkgeyBicmVhazsgfVxuXG4gICAgaWYgKHN0YXRlLmlzRW1wdHkobmV4dExpbmUpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvL1xuICAgIC8vIFRyeSB0byBjaGVjayBpZiBsaXN0IGlzIHRlcm1pbmF0ZWQgb3IgY29udGludWVkLlxuICAgIC8vXG4gICAgaWYgKHN0YXRlLnRTaGlmdFtuZXh0TGluZV0gPCBzdGF0ZS5ibGtJbmRlbnQpIHsgYnJlYWs7IH1cblxuICAgIC8vIGZhaWwgaWYgdGVybWluYXRpbmcgYmxvY2sgZm91bmRcbiAgICB0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICBmb3IgKGkgPSAwLCBsID0gdGVybWluYXRvclJ1bGVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKHRlcm1pbmF0b3JSdWxlc1tpXShzdGF0ZSwgbmV4dExpbmUsIGVuZExpbmUsIHRydWUpKSB7XG4gICAgICAgIHRlcm1pbmF0ZSA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGVybWluYXRlKSB7IGJyZWFrOyB9XG5cbiAgICAvLyBmYWlsIGlmIGxpc3QgaGFzIGFub3RoZXIgdHlwZVxuICAgIGlmIChpc09yZGVyZWQpIHtcbiAgICAgIHBvc0FmdGVyTWFya2VyID0gc2tpcE9yZGVyZWRMaXN0TWFya2VyKHN0YXRlLCBuZXh0TGluZSk7XG4gICAgICBpZiAocG9zQWZ0ZXJNYXJrZXIgPCAwKSB7IGJyZWFrOyB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBvc0FmdGVyTWFya2VyID0gc2tpcEJ1bGxldExpc3RNYXJrZXIoc3RhdGUsIG5leHRMaW5lKTtcbiAgICAgIGlmIChwb3NBZnRlck1hcmtlciA8IDApIHsgYnJlYWs7IH1cbiAgICB9XG5cbiAgICBpZiAobWFya2VyQ2hhckNvZGUgIT09IHN0YXRlLnNyYy5jaGFyQ29kZUF0KHBvc0FmdGVyTWFya2VyIC0gMSkpIHsgYnJlYWs7IH1cbiAgfVxuXG4gIC8vIEZpbmlsaXplIGxpc3RcbiAgaWYgKGlzT3JkZXJlZCkge1xuICAgIHRva2VuID0gc3RhdGUucHVzaCgnb3JkZXJlZF9saXN0X2Nsb3NlJywgJ29sJywgLTEpO1xuICB9IGVsc2Uge1xuICAgIHRva2VuID0gc3RhdGUucHVzaCgnYnVsbGV0X2xpc3RfY2xvc2UnLCAndWwnLCAtMSk7XG4gIH1cbiAgdG9rZW4ubWFya3VwID0gU3RyaW5nLmZyb21DaGFyQ29kZShtYXJrZXJDaGFyQ29kZSk7XG5cbiAgbGlzdExpbmVzWzFdID0gbmV4dExpbmU7XG4gIHN0YXRlLmxpbmUgPSBuZXh0TGluZTtcblxuICAvLyBtYXJrIHBhcmFncmFwaHMgdGlnaHQgaWYgbmVlZGVkXG4gIGlmICh0aWdodCkge1xuICAgIG1hcmtUaWdodFBhcmFncmFwaHMoc3RhdGUsIGxpc3RUb2tJZHgpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuIiwiLy8gUGFyYWdyYXBoXG5cbid1c2Ugc3RyaWN0JztcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcmFncmFwaChzdGF0ZSwgc3RhcnRMaW5lLyosIGVuZExpbmUqLykge1xuICB2YXIgY29udGVudCwgdGVybWluYXRlLCBpLCBsLCB0b2tlbixcbiAgICAgIG5leHRMaW5lID0gc3RhcnRMaW5lICsgMSxcbiAgICAgIHRlcm1pbmF0b3JSdWxlcyA9IHN0YXRlLm1kLmJsb2NrLnJ1bGVyLmdldFJ1bGVzKCdwYXJhZ3JhcGgnKSxcbiAgICAgIGVuZExpbmUgPSBzdGF0ZS5saW5lTWF4O1xuXG4gIC8vIGp1bXAgbGluZS1ieS1saW5lIHVudGlsIGVtcHR5IG9uZSBvciBFT0ZcbiAgZm9yICg7IG5leHRMaW5lIDwgZW5kTGluZSAmJiAhc3RhdGUuaXNFbXB0eShuZXh0TGluZSk7IG5leHRMaW5lKyspIHtcbiAgICAvLyB0aGlzIHdvdWxkIGJlIGEgY29kZSBibG9jayBub3JtYWxseSwgYnV0IGFmdGVyIHBhcmFncmFwaFxuICAgIC8vIGl0J3MgY29uc2lkZXJlZCBhIGxhenkgY29udGludWF0aW9uIHJlZ2FyZGxlc3Mgb2Ygd2hhdCdzIHRoZXJlXG4gICAgaWYgKHN0YXRlLnRTaGlmdFtuZXh0TGluZV0gLSBzdGF0ZS5ibGtJbmRlbnQgPiAzKSB7IGNvbnRpbnVlOyB9XG5cbiAgICAvLyBTb21lIHRhZ3MgY2FuIHRlcm1pbmF0ZSBwYXJhZ3JhcGggd2l0aG91dCBlbXB0eSBsaW5lLlxuICAgIHRlcm1pbmF0ZSA9IGZhbHNlO1xuICAgIGZvciAoaSA9IDAsIGwgPSB0ZXJtaW5hdG9yUnVsZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAodGVybWluYXRvclJ1bGVzW2ldKHN0YXRlLCBuZXh0TGluZSwgZW5kTGluZSwgdHJ1ZSkpIHtcbiAgICAgICAgdGVybWluYXRlID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0ZXJtaW5hdGUpIHsgYnJlYWs7IH1cbiAgfVxuXG4gIGNvbnRlbnQgPSBzdGF0ZS5nZXRMaW5lcyhzdGFydExpbmUsIG5leHRMaW5lLCBzdGF0ZS5ibGtJbmRlbnQsIGZhbHNlKS50cmltKCk7XG5cbiAgc3RhdGUubGluZSA9IG5leHRMaW5lO1xuXG4gIHRva2VuICAgICAgICAgID0gc3RhdGUucHVzaCgncGFyYWdyYXBoX29wZW4nLCAncCcsIDEpO1xuICB0b2tlbi5tYXAgICAgICA9IFsgc3RhcnRMaW5lLCBzdGF0ZS5saW5lIF07XG5cbiAgdG9rZW4gICAgICAgICAgPSBzdGF0ZS5wdXNoKCdpbmxpbmUnLCAnJywgMCk7XG4gIHRva2VuLmNvbnRlbnQgID0gY29udGVudDtcbiAgdG9rZW4ubWFwICAgICAgPSBbIHN0YXJ0TGluZSwgc3RhdGUubGluZSBdO1xuICB0b2tlbi5jaGlsZHJlbiA9IFtdO1xuXG4gIHRva2VuICAgICAgICAgID0gc3RhdGUucHVzaCgncGFyYWdyYXBoX2Nsb3NlJywgJ3AnLCAtMSk7XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciBwYXJzZUxpbmtEZXN0aW5hdGlvbiA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvcGFyc2VfbGlua19kZXN0aW5hdGlvbicpO1xudmFyIHBhcnNlTGlua1RpdGxlICAgICAgID0gcmVxdWlyZSgnLi4vaGVscGVycy9wYXJzZV9saW5rX3RpdGxlJyk7XG52YXIgbm9ybWFsaXplUmVmZXJlbmNlICAgPSByZXF1aXJlKCcuLi9jb21tb24vdXRpbHMnKS5ub3JtYWxpemVSZWZlcmVuY2U7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByZWZlcmVuY2Uoc3RhdGUsIHN0YXJ0TGluZSwgX2VuZExpbmUsIHNpbGVudCkge1xuICB2YXIgY2gsXG4gICAgICBkZXN0RW5kUG9zLFxuICAgICAgZGVzdEVuZExpbmVObyxcbiAgICAgIGVuZExpbmUsXG4gICAgICBocmVmLFxuICAgICAgaSxcbiAgICAgIGwsXG4gICAgICBsYWJlbCxcbiAgICAgIGxhYmVsRW5kLFxuICAgICAgcmVzLFxuICAgICAgc3RhcnQsXG4gICAgICBzdHIsXG4gICAgICB0ZXJtaW5hdGUsXG4gICAgICB0ZXJtaW5hdG9yUnVsZXMsXG4gICAgICB0aXRsZSxcbiAgICAgIGxpbmVzID0gMCxcbiAgICAgIHBvcyA9IHN0YXRlLmJNYXJrc1tzdGFydExpbmVdICsgc3RhdGUudFNoaWZ0W3N0YXJ0TGluZV0sXG4gICAgICBtYXggPSBzdGF0ZS5lTWFya3Nbc3RhcnRMaW5lXSxcbiAgICAgIG5leHRMaW5lID0gc3RhcnRMaW5lICsgMTtcblxuICBpZiAoc3RhdGUuc3JjLmNoYXJDb2RlQXQocG9zKSAhPT0gMHg1Qi8qIFsgKi8pIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgLy8gU2ltcGxlIGNoZWNrIHRvIHF1aWNrbHkgaW50ZXJydXB0IHNjYW4gb24gW2xpbmtdKHVybCkgYXQgdGhlIHN0YXJ0IG9mIGxpbmUuXG4gIC8vIENhbiBiZSB1c2VmdWwgb24gcHJhY3RpY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJrZG93bi1pdC9tYXJrZG93bi1pdC9pc3N1ZXMvNTRcbiAgd2hpbGUgKCsrcG9zIDwgbWF4KSB7XG4gICAgaWYgKHN0YXRlLnNyYy5jaGFyQ29kZUF0KHBvcykgPT09IDB4NUQgLyogXSAqLyAmJlxuICAgICAgICBzdGF0ZS5zcmMuY2hhckNvZGVBdChwb3MgLSAxKSAhPT0gMHg1Qy8qIFxcICovKSB7XG4gICAgICBpZiAocG9zICsgMSA9PT0gbWF4KSB7IHJldHVybiBmYWxzZTsgfVxuICAgICAgaWYgKHN0YXRlLnNyYy5jaGFyQ29kZUF0KHBvcyArIDEpICE9PSAweDNBLyogOiAqLykgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGVuZExpbmUgPSBzdGF0ZS5saW5lTWF4O1xuXG4gIC8vIGp1bXAgbGluZS1ieS1saW5lIHVudGlsIGVtcHR5IG9uZSBvciBFT0ZcbiAgdGVybWluYXRvclJ1bGVzID0gc3RhdGUubWQuYmxvY2sucnVsZXIuZ2V0UnVsZXMoJ3JlZmVyZW5jZScpO1xuXG4gIGZvciAoOyBuZXh0TGluZSA8IGVuZExpbmUgJiYgIXN0YXRlLmlzRW1wdHkobmV4dExpbmUpOyBuZXh0TGluZSsrKSB7XG4gICAgLy8gdGhpcyB3b3VsZCBiZSBhIGNvZGUgYmxvY2sgbm9ybWFsbHksIGJ1dCBhZnRlciBwYXJhZ3JhcGhcbiAgICAvLyBpdCdzIGNvbnNpZGVyZWQgYSBsYXp5IGNvbnRpbnVhdGlvbiByZWdhcmRsZXNzIG9mIHdoYXQncyB0aGVyZVxuICAgIGlmIChzdGF0ZS50U2hpZnRbbmV4dExpbmVdIC0gc3RhdGUuYmxrSW5kZW50ID4gMykgeyBjb250aW51ZTsgfVxuXG4gICAgLy8gU29tZSB0YWdzIGNhbiB0ZXJtaW5hdGUgcGFyYWdyYXBoIHdpdGhvdXQgZW1wdHkgbGluZS5cbiAgICB0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICBmb3IgKGkgPSAwLCBsID0gdGVybWluYXRvclJ1bGVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKHRlcm1pbmF0b3JSdWxlc1tpXShzdGF0ZSwgbmV4dExpbmUsIGVuZExpbmUsIHRydWUpKSB7XG4gICAgICAgIHRlcm1pbmF0ZSA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGVybWluYXRlKSB7IGJyZWFrOyB9XG4gIH1cblxuICBzdHIgPSBzdGF0ZS5nZXRMaW5lcyhzdGFydExpbmUsIG5leHRMaW5lLCBzdGF0ZS5ibGtJbmRlbnQsIGZhbHNlKS50cmltKCk7XG4gIG1heCA9IHN0ci5sZW5ndGg7XG5cbiAgZm9yIChwb3MgPSAxOyBwb3MgPCBtYXg7IHBvcysrKSB7XG4gICAgY2ggPSBzdHIuY2hhckNvZGVBdChwb3MpO1xuICAgIGlmIChjaCA9PT0gMHg1QiAvKiBbICovKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChjaCA9PT0gMHg1RCAvKiBdICovKSB7XG4gICAgICBsYWJlbEVuZCA9IHBvcztcbiAgICAgIGJyZWFrO1xuICAgIH0gZWxzZSBpZiAoY2ggPT09IDB4MEEgLyogXFxuICovKSB7XG4gICAgICBsaW5lcysrO1xuICAgIH0gZWxzZSBpZiAoY2ggPT09IDB4NUMgLyogXFwgKi8pIHtcbiAgICAgIHBvcysrO1xuICAgICAgaWYgKHBvcyA8IG1heCAmJiBzdHIuY2hhckNvZGVBdChwb3MpID09PSAweDBBKSB7XG4gICAgICAgIGxpbmVzKys7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGxhYmVsRW5kIDwgMCB8fCBzdHIuY2hhckNvZGVBdChsYWJlbEVuZCArIDEpICE9PSAweDNBLyogOiAqLykgeyByZXR1cm4gZmFsc2U7IH1cblxuICAvLyBbbGFiZWxdOiAgIGRlc3RpbmF0aW9uICAgJ3RpdGxlJ1xuICAvLyAgICAgICAgIF5eXiBza2lwIG9wdGlvbmFsIHdoaXRlc3BhY2UgaGVyZVxuICBmb3IgKHBvcyA9IGxhYmVsRW5kICsgMjsgcG9zIDwgbWF4OyBwb3MrKykge1xuICAgIGNoID0gc3RyLmNoYXJDb2RlQXQocG9zKTtcbiAgICBpZiAoY2ggPT09IDB4MEEpIHtcbiAgICAgIGxpbmVzKys7XG4gICAgfSBlbHNlIGlmIChjaCA9PT0gMHgyMCkge1xuICAgICAgLyplc2xpbnQgbm8tZW1wdHk6MCovXG4gICAgfSBlbHNlIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vIFtsYWJlbF06ICAgZGVzdGluYXRpb24gICAndGl0bGUnXG4gIC8vICAgICAgICAgICAgXl5eXl5eXl5eXl4gcGFyc2UgdGhpc1xuICByZXMgPSBwYXJzZUxpbmtEZXN0aW5hdGlvbihzdHIsIHBvcywgbWF4KTtcbiAgaWYgKCFyZXMub2spIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgaHJlZiA9IHN0YXRlLm1kLm5vcm1hbGl6ZUxpbmsocmVzLnN0cik7XG4gIGlmICghc3RhdGUubWQudmFsaWRhdGVMaW5rKGhyZWYpKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIHBvcyA9IHJlcy5wb3M7XG4gIGxpbmVzICs9IHJlcy5saW5lcztcblxuICAvLyBzYXZlIGN1cnNvciBzdGF0ZSwgd2UgY291bGQgcmVxdWlyZSB0byByb2xsYmFjayBsYXRlclxuICBkZXN0RW5kUG9zID0gcG9zO1xuICBkZXN0RW5kTGluZU5vID0gbGluZXM7XG5cbiAgLy8gW2xhYmVsXTogICBkZXN0aW5hdGlvbiAgICd0aXRsZSdcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgIF5eXiBza2lwcGluZyB0aG9zZSBzcGFjZXNcbiAgc3RhcnQgPSBwb3M7XG4gIGZvciAoOyBwb3MgPCBtYXg7IHBvcysrKSB7XG4gICAgY2ggPSBzdHIuY2hhckNvZGVBdChwb3MpO1xuICAgIGlmIChjaCA9PT0gMHgwQSkge1xuICAgICAgbGluZXMrKztcbiAgICB9IGVsc2UgaWYgKGNoID09PSAweDIwKSB7XG4gICAgICAvKmVzbGludCBuby1lbXB0eTowKi9cbiAgICB9IGVsc2Uge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gW2xhYmVsXTogICBkZXN0aW5hdGlvbiAgICd0aXRsZSdcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgIF5eXl5eXl4gcGFyc2UgdGhpc1xuICByZXMgPSBwYXJzZUxpbmtUaXRsZShzdHIsIHBvcywgbWF4KTtcbiAgaWYgKHBvcyA8IG1heCAmJiBzdGFydCAhPT0gcG9zICYmIHJlcy5vaykge1xuICAgIHRpdGxlID0gcmVzLnN0cjtcbiAgICBwb3MgPSByZXMucG9zO1xuICAgIGxpbmVzICs9IHJlcy5saW5lcztcbiAgfSBlbHNlIHtcbiAgICB0aXRsZSA9ICcnO1xuICAgIHBvcyA9IGRlc3RFbmRQb3M7XG4gICAgbGluZXMgPSBkZXN0RW5kTGluZU5vO1xuICB9XG5cbiAgLy8gc2tpcCB0cmFpbGluZyBzcGFjZXMgdW50aWwgdGhlIHJlc3Qgb2YgdGhlIGxpbmVcbiAgd2hpbGUgKHBvcyA8IG1heCAmJiBzdHIuY2hhckNvZGVBdChwb3MpID09PSAweDIwLyogc3BhY2UgKi8pIHsgcG9zKys7IH1cblxuICBpZiAocG9zIDwgbWF4ICYmIHN0ci5jaGFyQ29kZUF0KHBvcykgIT09IDB4MEEpIHtcbiAgICAvLyBnYXJiYWdlIGF0IHRoZSBlbmQgb2YgdGhlIGxpbmVcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBSZWZlcmVuY2UgY2FuIG5vdCB0ZXJtaW5hdGUgYW55dGhpbmcuIFRoaXMgY2hlY2sgaXMgZm9yIHNhZmV0eSBvbmx5LlxuICAvKmlzdGFuYnVsIGlnbm9yZSBpZiovXG4gIGlmIChzaWxlbnQpIHsgcmV0dXJuIHRydWU7IH1cblxuICBsYWJlbCA9IG5vcm1hbGl6ZVJlZmVyZW5jZShzdHIuc2xpY2UoMSwgbGFiZWxFbmQpKTtcbiAgaWYgKHR5cGVvZiBzdGF0ZS5lbnYucmVmZXJlbmNlcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBzdGF0ZS5lbnYucmVmZXJlbmNlcyA9IHt9O1xuICB9XG4gIGlmICh0eXBlb2Ygc3RhdGUuZW52LnJlZmVyZW5jZXNbbGFiZWxdID09PSAndW5kZWZpbmVkJykge1xuICAgIHN0YXRlLmVudi5yZWZlcmVuY2VzW2xhYmVsXSA9IHsgdGl0bGU6IHRpdGxlLCBocmVmOiBocmVmIH07XG4gIH1cblxuICBzdGF0ZS5saW5lID0gc3RhcnRMaW5lICsgbGluZXMgKyAxO1xuICByZXR1cm4gdHJ1ZTtcbn07XG4iLCIvLyBQYXJzZXIgc3RhdGUgY2xhc3NcblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgVG9rZW4gPSByZXF1aXJlKCcuLi90b2tlbicpO1xuXG5cbmZ1bmN0aW9uIFN0YXRlQmxvY2soc3JjLCBtZCwgZW52LCB0b2tlbnMpIHtcbiAgdmFyIGNoLCBzLCBzdGFydCwgcG9zLCBsZW4sIGluZGVudCwgaW5kZW50X2ZvdW5kO1xuXG4gIHRoaXMuc3JjID0gc3JjO1xuXG4gIC8vIGxpbmsgdG8gcGFyc2VyIGluc3RhbmNlXG4gIHRoaXMubWQgICAgID0gbWQ7XG5cbiAgdGhpcy5lbnYgPSBlbnY7XG5cbiAgLy9cbiAgLy8gSW50ZXJuYWwgc3RhdGUgdmFydGlhYmxlc1xuICAvL1xuXG4gIHRoaXMudG9rZW5zID0gdG9rZW5zO1xuXG4gIHRoaXMuYk1hcmtzID0gW107ICAvLyBsaW5lIGJlZ2luIG9mZnNldHMgZm9yIGZhc3QganVtcHNcbiAgdGhpcy5lTWFya3MgPSBbXTsgIC8vIGxpbmUgZW5kIG9mZnNldHMgZm9yIGZhc3QganVtcHNcbiAgdGhpcy50U2hpZnQgPSBbXTsgIC8vIGluZGVudCBmb3IgZWFjaCBsaW5lXG5cbiAgLy8gYmxvY2sgcGFyc2VyIHZhcmlhYmxlc1xuICB0aGlzLmJsa0luZGVudCAgPSAwOyAvLyByZXF1aXJlZCBibG9jayBjb250ZW50IGluZGVudFxuICAgICAgICAgICAgICAgICAgICAgICAvLyAoZm9yIGV4YW1wbGUsIGlmIHdlIGFyZSBpbiBsaXN0KVxuICB0aGlzLmxpbmUgICAgICAgPSAwOyAvLyBsaW5lIGluZGV4IGluIHNyY1xuICB0aGlzLmxpbmVNYXggICAgPSAwOyAvLyBsaW5lcyBjb3VudFxuICB0aGlzLnRpZ2h0ICAgICAgPSBmYWxzZTsgIC8vIGxvb3NlL3RpZ2h0IG1vZGUgZm9yIGxpc3RzXG4gIHRoaXMucGFyZW50VHlwZSA9ICdyb290JzsgLy8gaWYgYGxpc3RgLCBibG9jayBwYXJzZXIgc3RvcHMgb24gdHdvIG5ld2xpbmVzXG4gIHRoaXMuZGRJbmRlbnQgICA9IC0xOyAvLyBpbmRlbnQgb2YgdGhlIGN1cnJlbnQgZGQgYmxvY2sgKC0xIGlmIHRoZXJlIGlzbid0IGFueSlcblxuICB0aGlzLmxldmVsID0gMDtcblxuICAvLyByZW5kZXJlclxuICB0aGlzLnJlc3VsdCA9ICcnO1xuXG4gIC8vIENyZWF0ZSBjYWNoZXNcbiAgLy8gR2VuZXJhdGUgbWFya2Vycy5cbiAgcyA9IHRoaXMuc3JjO1xuICBpbmRlbnQgPSAwO1xuICBpbmRlbnRfZm91bmQgPSBmYWxzZTtcblxuICBmb3IgKHN0YXJ0ID0gcG9zID0gaW5kZW50ID0gMCwgbGVuID0gcy5sZW5ndGg7IHBvcyA8IGxlbjsgcG9zKyspIHtcbiAgICBjaCA9IHMuY2hhckNvZGVBdChwb3MpO1xuXG4gICAgaWYgKCFpbmRlbnRfZm91bmQpIHtcbiAgICAgIGlmIChjaCA9PT0gMHgyMC8qIHNwYWNlICovKSB7XG4gICAgICAgIGluZGVudCsrO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGVudF9mb3VuZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNoID09PSAweDBBIHx8IHBvcyA9PT0gbGVuIC0gMSkge1xuICAgICAgaWYgKGNoICE9PSAweDBBKSB7IHBvcysrOyB9XG4gICAgICB0aGlzLmJNYXJrcy5wdXNoKHN0YXJ0KTtcbiAgICAgIHRoaXMuZU1hcmtzLnB1c2gocG9zKTtcbiAgICAgIHRoaXMudFNoaWZ0LnB1c2goaW5kZW50KTtcblxuICAgICAgaW5kZW50X2ZvdW5kID0gZmFsc2U7XG4gICAgICBpbmRlbnQgPSAwO1xuICAgICAgc3RhcnQgPSBwb3MgKyAxO1xuICAgIH1cbiAgfVxuXG4gIC8vIFB1c2ggZmFrZSBlbnRyeSB0byBzaW1wbGlmeSBjYWNoZSBib3VuZHMgY2hlY2tzXG4gIHRoaXMuYk1hcmtzLnB1c2gocy5sZW5ndGgpO1xuICB0aGlzLmVNYXJrcy5wdXNoKHMubGVuZ3RoKTtcbiAgdGhpcy50U2hpZnQucHVzaCgwKTtcblxuICB0aGlzLmxpbmVNYXggPSB0aGlzLmJNYXJrcy5sZW5ndGggLSAxOyAvLyBkb24ndCBjb3VudCBsYXN0IGZha2UgbGluZVxufVxuXG4vLyBQdXNoIG5ldyB0b2tlbiB0byBcInN0cmVhbVwiLlxuLy9cblN0YXRlQmxvY2sucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAodHlwZSwgdGFnLCBuZXN0aW5nKSB7XG4gIHZhciB0b2tlbiA9IG5ldyBUb2tlbih0eXBlLCB0YWcsIG5lc3RpbmcpO1xuICB0b2tlbi5ibG9jayA9IHRydWU7XG5cbiAgaWYgKG5lc3RpbmcgPCAwKSB7IHRoaXMubGV2ZWwtLTsgfVxuICB0b2tlbi5sZXZlbCA9IHRoaXMubGV2ZWw7XG4gIGlmIChuZXN0aW5nID4gMCkgeyB0aGlzLmxldmVsKys7IH1cblxuICB0aGlzLnRva2Vucy5wdXNoKHRva2VuKTtcbiAgcmV0dXJuIHRva2VuO1xufTtcblxuU3RhdGVCbG9jay5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uIGlzRW1wdHkobGluZSkge1xuICByZXR1cm4gdGhpcy5iTWFya3NbbGluZV0gKyB0aGlzLnRTaGlmdFtsaW5lXSA+PSB0aGlzLmVNYXJrc1tsaW5lXTtcbn07XG5cblN0YXRlQmxvY2sucHJvdG90eXBlLnNraXBFbXB0eUxpbmVzID0gZnVuY3Rpb24gc2tpcEVtcHR5TGluZXMoZnJvbSkge1xuICBmb3IgKHZhciBtYXggPSB0aGlzLmxpbmVNYXg7IGZyb20gPCBtYXg7IGZyb20rKykge1xuICAgIGlmICh0aGlzLmJNYXJrc1tmcm9tXSArIHRoaXMudFNoaWZ0W2Zyb21dIDwgdGhpcy5lTWFya3NbZnJvbV0pIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZnJvbTtcbn07XG5cbi8vIFNraXAgc3BhY2VzIGZyb20gZ2l2ZW4gcG9zaXRpb24uXG5TdGF0ZUJsb2NrLnByb3RvdHlwZS5za2lwU3BhY2VzID0gZnVuY3Rpb24gc2tpcFNwYWNlcyhwb3MpIHtcbiAgZm9yICh2YXIgbWF4ID0gdGhpcy5zcmMubGVuZ3RoOyBwb3MgPCBtYXg7IHBvcysrKSB7XG4gICAgaWYgKHRoaXMuc3JjLmNoYXJDb2RlQXQocG9zKSAhPT0gMHgyMC8qIHNwYWNlICovKSB7IGJyZWFrOyB9XG4gIH1cbiAgcmV0dXJuIHBvcztcbn07XG5cbi8vIFNraXAgY2hhciBjb2RlcyBmcm9tIGdpdmVuIHBvc2l0aW9uXG5TdGF0ZUJsb2NrLnByb3RvdHlwZS5za2lwQ2hhcnMgPSBmdW5jdGlvbiBza2lwQ2hhcnMocG9zLCBjb2RlKSB7XG4gIGZvciAodmFyIG1heCA9IHRoaXMuc3JjLmxlbmd0aDsgcG9zIDwgbWF4OyBwb3MrKykge1xuICAgIGlmICh0aGlzLnNyYy5jaGFyQ29kZUF0KHBvcykgIT09IGNvZGUpIHsgYnJlYWs7IH1cbiAgfVxuICByZXR1cm4gcG9zO1xufTtcblxuLy8gU2tpcCBjaGFyIGNvZGVzIHJldmVyc2UgZnJvbSBnaXZlbiBwb3NpdGlvbiAtIDFcblN0YXRlQmxvY2sucHJvdG90eXBlLnNraXBDaGFyc0JhY2sgPSBmdW5jdGlvbiBza2lwQ2hhcnNCYWNrKHBvcywgY29kZSwgbWluKSB7XG4gIGlmIChwb3MgPD0gbWluKSB7IHJldHVybiBwb3M7IH1cblxuICB3aGlsZSAocG9zID4gbWluKSB7XG4gICAgaWYgKGNvZGUgIT09IHRoaXMuc3JjLmNoYXJDb2RlQXQoLS1wb3MpKSB7IHJldHVybiBwb3MgKyAxOyB9XG4gIH1cbiAgcmV0dXJuIHBvcztcbn07XG5cbi8vIGN1dCBsaW5lcyByYW5nZSBmcm9tIHNvdXJjZS5cblN0YXRlQmxvY2sucHJvdG90eXBlLmdldExpbmVzID0gZnVuY3Rpb24gZ2V0TGluZXMoYmVnaW4sIGVuZCwgaW5kZW50LCBrZWVwTGFzdExGKSB7XG4gIHZhciBpLCBmaXJzdCwgbGFzdCwgcXVldWUsIHNoaWZ0LFxuICAgICAgbGluZSA9IGJlZ2luO1xuXG4gIGlmIChiZWdpbiA+PSBlbmQpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICAvLyBPcHQ6IGRvbid0IHVzZSBwdXNoIHF1ZXVlIGZvciBzaW5nbGUgbGluZTtcbiAgaWYgKGxpbmUgKyAxID09PSBlbmQpIHtcbiAgICBmaXJzdCA9IHRoaXMuYk1hcmtzW2xpbmVdICsgTWF0aC5taW4odGhpcy50U2hpZnRbbGluZV0sIGluZGVudCk7XG4gICAgbGFzdCA9IGtlZXBMYXN0TEYgPyB0aGlzLmJNYXJrc1tlbmRdIDogdGhpcy5lTWFya3NbZW5kIC0gMV07XG4gICAgcmV0dXJuIHRoaXMuc3JjLnNsaWNlKGZpcnN0LCBsYXN0KTtcbiAgfVxuXG4gIHF1ZXVlID0gbmV3IEFycmF5KGVuZCAtIGJlZ2luKTtcblxuICBmb3IgKGkgPSAwOyBsaW5lIDwgZW5kOyBsaW5lKyssIGkrKykge1xuICAgIHNoaWZ0ID0gdGhpcy50U2hpZnRbbGluZV07XG4gICAgaWYgKHNoaWZ0ID4gaW5kZW50KSB7IHNoaWZ0ID0gaW5kZW50OyB9XG4gICAgaWYgKHNoaWZ0IDwgMCkgeyBzaGlmdCA9IDA7IH1cblxuICAgIGZpcnN0ID0gdGhpcy5iTWFya3NbbGluZV0gKyBzaGlmdDtcblxuICAgIGlmIChsaW5lICsgMSA8IGVuZCB8fCBrZWVwTGFzdExGKSB7XG4gICAgICAvLyBObyBuZWVkIGZvciBib3VuZHMgY2hlY2sgYmVjYXVzZSB3ZSBoYXZlIGZha2UgZW50cnkgb24gdGFpbC5cbiAgICAgIGxhc3QgPSB0aGlzLmVNYXJrc1tsaW5lXSArIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhc3QgPSB0aGlzLmVNYXJrc1tsaW5lXTtcbiAgICB9XG5cbiAgICBxdWV1ZVtpXSA9IHRoaXMuc3JjLnNsaWNlKGZpcnN0LCBsYXN0KTtcbiAgfVxuXG4gIHJldHVybiBxdWV1ZS5qb2luKCcnKTtcbn07XG5cbi8vIHJlLWV4cG9ydCBUb2tlbiBjbGFzcyB0byB1c2UgaW4gYmxvY2sgcnVsZXNcblN0YXRlQmxvY2sucHJvdG90eXBlLlRva2VuID0gVG9rZW47XG5cblxubW9kdWxlLmV4cG9ydHMgPSBTdGF0ZUJsb2NrO1xuIiwiLy8gR0ZNIHRhYmxlLCBub24tc3RhbmRhcmRcblxuJ3VzZSBzdHJpY3QnO1xuXG5cbmZ1bmN0aW9uIGdldExpbmUoc3RhdGUsIGxpbmUpIHtcbiAgdmFyIHBvcyA9IHN0YXRlLmJNYXJrc1tsaW5lXSArIHN0YXRlLmJsa0luZGVudCxcbiAgICAgIG1heCA9IHN0YXRlLmVNYXJrc1tsaW5lXTtcblxuICByZXR1cm4gc3RhdGUuc3JjLnN1YnN0cihwb3MsIG1heCAtIHBvcyk7XG59XG5cbmZ1bmN0aW9uIGVzY2FwZWRTcGxpdChzdHIpIHtcbiAgdmFyIHJlc3VsdCA9IFtdLFxuICAgICAgcG9zID0gMCxcbiAgICAgIG1heCA9IHN0ci5sZW5ndGgsXG4gICAgICBjaCxcbiAgICAgIGVzY2FwZXMgPSAwLFxuICAgICAgbGFzdFBvcyA9IDAsXG4gICAgICBiYWNrVGlja2VkID0gZmFsc2UsXG4gICAgICBsYXN0QmFja1RpY2sgPSAwO1xuXG4gIGNoICA9IHN0ci5jaGFyQ29kZUF0KHBvcyk7XG5cbiAgd2hpbGUgKHBvcyA8IG1heCkge1xuICAgIGlmIChjaCA9PT0gMHg2MC8qIGAgKi8gJiYgKGVzY2FwZXMgJSAyID09PSAwKSkge1xuICAgICAgYmFja1RpY2tlZCA9ICFiYWNrVGlja2VkO1xuICAgICAgbGFzdEJhY2tUaWNrID0gcG9zO1xuICAgIH0gZWxzZSBpZiAoY2ggPT09IDB4N2MvKiB8ICovICYmIChlc2NhcGVzICUgMiA9PT0gMCkgJiYgIWJhY2tUaWNrZWQpIHtcbiAgICAgIHJlc3VsdC5wdXNoKHN0ci5zdWJzdHJpbmcobGFzdFBvcywgcG9zKSk7XG4gICAgICBsYXN0UG9zID0gcG9zICsgMTtcbiAgICB9IGVsc2UgaWYgKGNoID09PSAweDVjLyogXFwgKi8pIHtcbiAgICAgIGVzY2FwZXMrKztcbiAgICB9IGVsc2Uge1xuICAgICAgZXNjYXBlcyA9IDA7XG4gICAgfVxuXG4gICAgcG9zKys7XG5cbiAgICAvLyBJZiB0aGVyZSB3YXMgYW4gdW4tY2xvc2VkIGJhY2t0aWNrLCBnbyBiYWNrIHRvIGp1c3QgYWZ0ZXJcbiAgICAvLyB0aGUgbGFzdCBiYWNrdGljaywgYnV0IGFzIGlmIGl0IHdhcyBhIG5vcm1hbCBjaGFyYWN0ZXJcbiAgICBpZiAocG9zID09PSBtYXggJiYgYmFja1RpY2tlZCkge1xuICAgICAgYmFja1RpY2tlZCA9IGZhbHNlO1xuICAgICAgcG9zID0gbGFzdEJhY2tUaWNrICsgMTtcbiAgICB9XG5cbiAgICBjaCA9IHN0ci5jaGFyQ29kZUF0KHBvcyk7XG4gIH1cblxuICByZXN1bHQucHVzaChzdHIuc3Vic3RyaW5nKGxhc3RQb3MpKTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGFibGUoc3RhdGUsIHN0YXJ0TGluZSwgZW5kTGluZSwgc2lsZW50KSB7XG4gIHZhciBjaCwgbGluZVRleHQsIHBvcywgaSwgbmV4dExpbmUsIHJvd3MsIHRva2VuLFxuICAgICAgYWxpZ25zLCB0LCB0YWJsZUxpbmVzLCB0Ym9keUxpbmVzO1xuXG4gIC8vIHNob3VsZCBoYXZlIGF0IGxlYXN0IHRocmVlIGxpbmVzXG4gIGlmIChzdGFydExpbmUgKyAyID4gZW5kTGluZSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICBuZXh0TGluZSA9IHN0YXJ0TGluZSArIDE7XG5cbiAgaWYgKHN0YXRlLnRTaGlmdFtuZXh0TGluZV0gPCBzdGF0ZS5ibGtJbmRlbnQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgLy8gZmlyc3QgY2hhcmFjdGVyIG9mIHRoZSBzZWNvbmQgbGluZSBzaG91bGQgYmUgJ3wnIG9yICctJ1xuXG4gIHBvcyA9IHN0YXRlLmJNYXJrc1tuZXh0TGluZV0gKyBzdGF0ZS50U2hpZnRbbmV4dExpbmVdO1xuICBpZiAocG9zID49IHN0YXRlLmVNYXJrc1tuZXh0TGluZV0pIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgY2ggPSBzdGF0ZS5zcmMuY2hhckNvZGVBdChwb3MpO1xuICBpZiAoY2ggIT09IDB4N0MvKiB8ICovICYmIGNoICE9PSAweDJELyogLSAqLyAmJiBjaCAhPT0gMHgzQS8qIDogKi8pIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgbGluZVRleHQgPSBnZXRMaW5lKHN0YXRlLCBzdGFydExpbmUgKyAxKTtcbiAgaWYgKCEvXlstOnwgXSskLy50ZXN0KGxpbmVUZXh0KSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICByb3dzID0gbGluZVRleHQuc3BsaXQoJ3wnKTtcbiAgaWYgKHJvd3MubGVuZ3RoIDwgMikgeyByZXR1cm4gZmFsc2U7IH1cbiAgYWxpZ25zID0gW107XG4gIGZvciAoaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgdCA9IHJvd3NbaV0udHJpbSgpO1xuICAgIGlmICghdCkge1xuICAgICAgLy8gYWxsb3cgZW1wdHkgY29sdW1ucyBiZWZvcmUgYW5kIGFmdGVyIHRhYmxlLCBidXQgbm90IGluIGJldHdlZW4gY29sdW1ucztcbiAgICAgIC8vIGUuZy4gYWxsb3cgYCB8LS0tfCBgLCBkaXNhbGxvdyBgIC0tLXx8LS0tIGBcbiAgICAgIGlmIChpID09PSAwIHx8IGkgPT09IHJvd3MubGVuZ3RoIC0gMSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIS9eOj8tKzo/JC8udGVzdCh0KSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAodC5jaGFyQ29kZUF0KHQubGVuZ3RoIC0gMSkgPT09IDB4M0EvKiA6ICovKSB7XG4gICAgICBhbGlnbnMucHVzaCh0LmNoYXJDb2RlQXQoMCkgPT09IDB4M0EvKiA6ICovID8gJ2NlbnRlcicgOiAncmlnaHQnKTtcbiAgICB9IGVsc2UgaWYgKHQuY2hhckNvZGVBdCgwKSA9PT0gMHgzQS8qIDogKi8pIHtcbiAgICAgIGFsaWducy5wdXNoKCdsZWZ0Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFsaWducy5wdXNoKCcnKTtcbiAgICB9XG4gIH1cblxuICBsaW5lVGV4dCA9IGdldExpbmUoc3RhdGUsIHN0YXJ0TGluZSkudHJpbSgpO1xuICBpZiAobGluZVRleHQuaW5kZXhPZignfCcpID09PSAtMSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgcm93cyA9IGVzY2FwZWRTcGxpdChsaW5lVGV4dC5yZXBsYWNlKC9eXFx8fFxcfCQvZywgJycpKTtcbiAgaWYgKGFsaWducy5sZW5ndGggIT09IHJvd3MubGVuZ3RoKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAoc2lsZW50KSB7IHJldHVybiB0cnVlOyB9XG5cbiAgdG9rZW4gICAgID0gc3RhdGUucHVzaCgndGFibGVfb3BlbicsICd0YWJsZScsIDEpO1xuICB0b2tlbi5tYXAgPSB0YWJsZUxpbmVzID0gWyBzdGFydExpbmUsIDAgXTtcblxuICB0b2tlbiAgICAgPSBzdGF0ZS5wdXNoKCd0aGVhZF9vcGVuJywgJ3RoZWFkJywgMSk7XG4gIHRva2VuLm1hcCA9IFsgc3RhcnRMaW5lLCBzdGFydExpbmUgKyAxIF07XG5cbiAgdG9rZW4gICAgID0gc3RhdGUucHVzaCgndHJfb3BlbicsICd0cicsIDEpO1xuICB0b2tlbi5tYXAgPSBbIHN0YXJ0TGluZSwgc3RhcnRMaW5lICsgMSBdO1xuXG4gIGZvciAoaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgdG9rZW4gICAgICAgICAgPSBzdGF0ZS5wdXNoKCd0aF9vcGVuJywgJ3RoJywgMSk7XG4gICAgdG9rZW4ubWFwICAgICAgPSBbIHN0YXJ0TGluZSwgc3RhcnRMaW5lICsgMSBdO1xuICAgIGlmIChhbGlnbnNbaV0pIHtcbiAgICAgIHRva2VuLmF0dHJzICA9IFsgWyAnc3R5bGUnLCAndGV4dC1hbGlnbjonICsgYWxpZ25zW2ldIF0gXTtcbiAgICB9XG5cbiAgICB0b2tlbiAgICAgICAgICA9IHN0YXRlLnB1c2goJ2lubGluZScsICcnLCAwKTtcbiAgICB0b2tlbi5jb250ZW50ICA9IHJvd3NbaV0udHJpbSgpO1xuICAgIHRva2VuLm1hcCAgICAgID0gWyBzdGFydExpbmUsIHN0YXJ0TGluZSArIDEgXTtcbiAgICB0b2tlbi5jaGlsZHJlbiA9IFtdO1xuXG4gICAgdG9rZW4gICAgICAgICAgPSBzdGF0ZS5wdXNoKCd0aF9jbG9zZScsICd0aCcsIC0xKTtcbiAgfVxuXG4gIHRva2VuICAgICA9IHN0YXRlLnB1c2goJ3RyX2Nsb3NlJywgJ3RyJywgLTEpO1xuICB0b2tlbiAgICAgPSBzdGF0ZS5wdXNoKCd0aGVhZF9jbG9zZScsICd0aGVhZCcsIC0xKTtcblxuICB0b2tlbiAgICAgPSBzdGF0ZS5wdXNoKCd0Ym9keV9vcGVuJywgJ3Rib2R5JywgMSk7XG4gIHRva2VuLm1hcCA9IHRib2R5TGluZXMgPSBbIHN0YXJ0TGluZSArIDIsIDAgXTtcblxuICBmb3IgKG5leHRMaW5lID0gc3RhcnRMaW5lICsgMjsgbmV4dExpbmUgPCBlbmRMaW5lOyBuZXh0TGluZSsrKSB7XG4gICAgaWYgKHN0YXRlLnRTaGlmdFtuZXh0TGluZV0gPCBzdGF0ZS5ibGtJbmRlbnQpIHsgYnJlYWs7IH1cblxuICAgIGxpbmVUZXh0ID0gZ2V0TGluZShzdGF0ZSwgbmV4dExpbmUpLnRyaW0oKTtcbiAgICBpZiAobGluZVRleHQuaW5kZXhPZignfCcpID09PSAtMSkgeyBicmVhazsgfVxuICAgIHJvd3MgPSBlc2NhcGVkU3BsaXQobGluZVRleHQucmVwbGFjZSgvXlxcfHxcXHwkL2csICcnKSk7XG5cbiAgICAvLyBzZXQgbnVtYmVyIG9mIGNvbHVtbnMgdG8gbnVtYmVyIG9mIGNvbHVtbnMgaW4gaGVhZGVyIHJvd1xuICAgIHJvd3MubGVuZ3RoID0gYWxpZ25zLmxlbmd0aDtcblxuICAgIHRva2VuID0gc3RhdGUucHVzaCgndHJfb3BlbicsICd0cicsIDEpO1xuICAgIGZvciAoaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0b2tlbiAgICAgICAgICA9IHN0YXRlLnB1c2goJ3RkX29wZW4nLCAndGQnLCAxKTtcbiAgICAgIGlmIChhbGlnbnNbaV0pIHtcbiAgICAgICAgdG9rZW4uYXR0cnMgID0gWyBbICdzdHlsZScsICd0ZXh0LWFsaWduOicgKyBhbGlnbnNbaV0gXSBdO1xuICAgICAgfVxuXG4gICAgICB0b2tlbiAgICAgICAgICA9IHN0YXRlLnB1c2goJ2lubGluZScsICcnLCAwKTtcbiAgICAgIHRva2VuLmNvbnRlbnQgID0gcm93c1tpXSA/IHJvd3NbaV0udHJpbSgpIDogJyc7XG4gICAgICB0b2tlbi5jaGlsZHJlbiA9IFtdO1xuXG4gICAgICB0b2tlbiAgICAgICAgICA9IHN0YXRlLnB1c2goJ3RkX2Nsb3NlJywgJ3RkJywgLTEpO1xuICAgIH1cbiAgICB0b2tlbiA9IHN0YXRlLnB1c2goJ3RyX2Nsb3NlJywgJ3RyJywgLTEpO1xuICB9XG4gIHRva2VuID0gc3RhdGUucHVzaCgndGJvZHlfY2xvc2UnLCAndGJvZHknLCAtMSk7XG4gIHRva2VuID0gc3RhdGUucHVzaCgndGFibGVfY2xvc2UnLCAndGFibGUnLCAtMSk7XG5cbiAgdGFibGVMaW5lc1sxXSA9IHRib2R5TGluZXNbMV0gPSBuZXh0TGluZTtcbiAgc3RhdGUubGluZSA9IG5leHRMaW5lO1xuICByZXR1cm4gdHJ1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBibG9jayhzdGF0ZSkge1xuICB2YXIgdG9rZW47XG5cbiAgaWYgKHN0YXRlLmlubGluZU1vZGUpIHtcbiAgICB0b2tlbiAgICAgICAgICA9IG5ldyBzdGF0ZS5Ub2tlbignaW5saW5lJywgJycsIDApO1xuICAgIHRva2VuLmNvbnRlbnQgID0gc3RhdGUuc3JjO1xuICAgIHRva2VuLm1hcCAgICAgID0gWyAwLCAxIF07XG4gICAgdG9rZW4uY2hpbGRyZW4gPSBbXTtcbiAgICBzdGF0ZS50b2tlbnMucHVzaCh0b2tlbik7XG4gIH0gZWxzZSB7XG4gICAgc3RhdGUubWQuYmxvY2sucGFyc2Uoc3RhdGUuc3JjLCBzdGF0ZS5tZCwgc3RhdGUuZW52LCBzdGF0ZS50b2tlbnMpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlubGluZShzdGF0ZSkge1xuICB2YXIgdG9rZW5zID0gc3RhdGUudG9rZW5zLCB0b2ssIGksIGw7XG5cbiAgLy8gUGFyc2UgaW5saW5lc1xuICBmb3IgKGkgPSAwLCBsID0gdG9rZW5zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHRvayA9IHRva2Vuc1tpXTtcbiAgICBpZiAodG9rLnR5cGUgPT09ICdpbmxpbmUnKSB7XG4gICAgICBzdGF0ZS5tZC5pbmxpbmUucGFyc2UodG9rLmNvbnRlbnQsIHN0YXRlLm1kLCBzdGF0ZS5lbnYsIHRvay5jaGlsZHJlbik7XG4gICAgfVxuICB9XG59O1xuIiwiLy8gUmVwbGFjZSBsaW5rLWxpa2UgdGV4dHMgd2l0aCBsaW5rIG5vZGVzLlxuLy9cbi8vIEN1cnJlbnRseSByZXN0cmljdGVkIGJ5IGBtZC52YWxpZGF0ZUxpbmsoKWAgdG8gaHR0cC9odHRwcy9mdHBcbi8vXG4ndXNlIHN0cmljdCc7XG5cblxudmFyIGFycmF5UmVwbGFjZUF0ID0gcmVxdWlyZSgnLi4vY29tbW9uL3V0aWxzJykuYXJyYXlSZXBsYWNlQXQ7XG5cblxuZnVuY3Rpb24gaXNMaW5rT3BlbihzdHIpIHtcbiAgcmV0dXJuIC9ePGFbPlxcc10vaS50ZXN0KHN0cik7XG59XG5mdW5jdGlvbiBpc0xpbmtDbG9zZShzdHIpIHtcbiAgcmV0dXJuIC9ePFxcL2FcXHMqPi9pLnRlc3Qoc3RyKTtcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxpbmtpZnkoc3RhdGUpIHtcbiAgdmFyIGksIGosIGwsIHRva2VucywgdG9rZW4sIGN1cnJlbnRUb2tlbiwgbm9kZXMsIGxuLCB0ZXh0LCBwb3MsIGxhc3RQb3MsXG4gICAgICBsZXZlbCwgaHRtbExpbmtMZXZlbCwgdXJsLCBmdWxsVXJsLCB1cmxUZXh0LFxuICAgICAgYmxvY2tUb2tlbnMgPSBzdGF0ZS50b2tlbnMsXG4gICAgICBsaW5rcztcblxuICBpZiAoIXN0YXRlLm1kLm9wdGlvbnMubGlua2lmeSkgeyByZXR1cm47IH1cblxuICBmb3IgKGogPSAwLCBsID0gYmxvY2tUb2tlbnMubGVuZ3RoOyBqIDwgbDsgaisrKSB7XG4gICAgaWYgKGJsb2NrVG9rZW5zW2pdLnR5cGUgIT09ICdpbmxpbmUnIHx8XG4gICAgICAgICFzdGF0ZS5tZC5saW5raWZ5LnByZXRlc3QoYmxvY2tUb2tlbnNbal0uY29udGVudCkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHRva2VucyA9IGJsb2NrVG9rZW5zW2pdLmNoaWxkcmVuO1xuXG4gICAgaHRtbExpbmtMZXZlbCA9IDA7XG5cbiAgICAvLyBXZSBzY2FuIGZyb20gdGhlIGVuZCwgdG8ga2VlcCBwb3NpdGlvbiB3aGVuIG5ldyB0YWdzIGFkZGVkLlxuICAgIC8vIFVzZSByZXZlcnNlZCBsb2dpYyBpbiBsaW5rcyBzdGFydC9lbmQgbWF0Y2hcbiAgICBmb3IgKGkgPSB0b2tlbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGN1cnJlbnRUb2tlbiA9IHRva2Vuc1tpXTtcblxuICAgICAgLy8gU2tpcCBjb250ZW50IG9mIG1hcmtkb3duIGxpbmtzXG4gICAgICBpZiAoY3VycmVudFRva2VuLnR5cGUgPT09ICdsaW5rX2Nsb3NlJykge1xuICAgICAgICBpLS07XG4gICAgICAgIHdoaWxlICh0b2tlbnNbaV0ubGV2ZWwgIT09IGN1cnJlbnRUb2tlbi5sZXZlbCAmJiB0b2tlbnNbaV0udHlwZSAhPT0gJ2xpbmtfb3BlbicpIHtcbiAgICAgICAgICBpLS07XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIFNraXAgY29udGVudCBvZiBodG1sIHRhZyBsaW5rc1xuICAgICAgaWYgKGN1cnJlbnRUb2tlbi50eXBlID09PSAnaHRtbF9pbmxpbmUnKSB7XG4gICAgICAgIGlmIChpc0xpbmtPcGVuKGN1cnJlbnRUb2tlbi5jb250ZW50KSAmJiBodG1sTGlua0xldmVsID4gMCkge1xuICAgICAgICAgIGh0bWxMaW5rTGV2ZWwtLTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNMaW5rQ2xvc2UoY3VycmVudFRva2VuLmNvbnRlbnQpKSB7XG4gICAgICAgICAgaHRtbExpbmtMZXZlbCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaHRtbExpbmtMZXZlbCA+IDApIHsgY29udGludWU7IH1cblxuICAgICAgaWYgKGN1cnJlbnRUb2tlbi50eXBlID09PSAndGV4dCcgJiYgc3RhdGUubWQubGlua2lmeS50ZXN0KGN1cnJlbnRUb2tlbi5jb250ZW50KSkge1xuXG4gICAgICAgIHRleHQgPSBjdXJyZW50VG9rZW4uY29udGVudDtcbiAgICAgICAgbGlua3MgPSBzdGF0ZS5tZC5saW5raWZ5Lm1hdGNoKHRleHQpO1xuXG4gICAgICAgIC8vIE5vdyBzcGxpdCBzdHJpbmcgdG8gbm9kZXNcbiAgICAgICAgbm9kZXMgPSBbXTtcbiAgICAgICAgbGV2ZWwgPSBjdXJyZW50VG9rZW4ubGV2ZWw7XG4gICAgICAgIGxhc3RQb3MgPSAwO1xuXG4gICAgICAgIGZvciAobG4gPSAwOyBsbiA8IGxpbmtzLmxlbmd0aDsgbG4rKykge1xuXG4gICAgICAgICAgdXJsID0gbGlua3NbbG5dLnVybDtcbiAgICAgICAgICBmdWxsVXJsID0gc3RhdGUubWQubm9ybWFsaXplTGluayh1cmwpO1xuICAgICAgICAgIGlmICghc3RhdGUubWQudmFsaWRhdGVMaW5rKGZ1bGxVcmwpKSB7IGNvbnRpbnVlOyB9XG5cbiAgICAgICAgICB1cmxUZXh0ID0gbGlua3NbbG5dLnRleHQ7XG5cbiAgICAgICAgICAvLyBMaW5raWZpZXIgbWlnaHQgc2VuZCByYXcgaG9zdG5hbWVzIGxpa2UgXCJleGFtcGxlLmNvbVwiLCB3aGVyZSB1cmxcbiAgICAgICAgICAvLyBzdGFydHMgd2l0aCBkb21haW4gbmFtZS4gU28gd2UgcHJlcGVuZCBodHRwOi8vIGluIHRob3NlIGNhc2VzLFxuICAgICAgICAgIC8vIGFuZCByZW1vdmUgaXQgYWZ0ZXJ3YXJkcy5cbiAgICAgICAgICAvL1xuICAgICAgICAgIGlmICghbGlua3NbbG5dLnNjaGVtYSkge1xuICAgICAgICAgICAgdXJsVGV4dCA9IHN0YXRlLm1kLm5vcm1hbGl6ZUxpbmtUZXh0KCdodHRwOi8vJyArIHVybFRleHQpLnJlcGxhY2UoL15odHRwOlxcL1xcLy8sICcnKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGxpbmtzW2xuXS5zY2hlbWEgPT09ICdtYWlsdG86JyAmJiAhL15tYWlsdG86L2kudGVzdCh1cmxUZXh0KSkge1xuICAgICAgICAgICAgdXJsVGV4dCA9IHN0YXRlLm1kLm5vcm1hbGl6ZUxpbmtUZXh0KCdtYWlsdG86JyArIHVybFRleHQpLnJlcGxhY2UoL15tYWlsdG86LywgJycpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1cmxUZXh0ID0gc3RhdGUubWQubm9ybWFsaXplTGlua1RleHQodXJsVGV4dCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcG9zID0gbGlua3NbbG5dLmluZGV4O1xuXG4gICAgICAgICAgaWYgKHBvcyA+IGxhc3RQb3MpIHtcbiAgICAgICAgICAgIHRva2VuICAgICAgICAgPSBuZXcgc3RhdGUuVG9rZW4oJ3RleHQnLCAnJywgMCk7XG4gICAgICAgICAgICB0b2tlbi5jb250ZW50ID0gdGV4dC5zbGljZShsYXN0UG9zLCBwb3MpO1xuICAgICAgICAgICAgdG9rZW4ubGV2ZWwgICA9IGxldmVsO1xuICAgICAgICAgICAgbm9kZXMucHVzaCh0b2tlbik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdG9rZW4gICAgICAgICA9IG5ldyBzdGF0ZS5Ub2tlbignbGlua19vcGVuJywgJ2EnLCAxKTtcbiAgICAgICAgICB0b2tlbi5hdHRycyAgID0gWyBbICdocmVmJywgZnVsbFVybCBdIF07XG4gICAgICAgICAgdG9rZW4ubGV2ZWwgICA9IGxldmVsKys7XG4gICAgICAgICAgdG9rZW4ubWFya3VwICA9ICdsaW5raWZ5JztcbiAgICAgICAgICB0b2tlbi5pbmZvICAgID0gJ2F1dG8nO1xuICAgICAgICAgIG5vZGVzLnB1c2godG9rZW4pO1xuXG4gICAgICAgICAgdG9rZW4gICAgICAgICA9IG5ldyBzdGF0ZS5Ub2tlbigndGV4dCcsICcnLCAwKTtcbiAgICAgICAgICB0b2tlbi5jb250ZW50ID0gdXJsVGV4dDtcbiAgICAgICAgICB0b2tlbi5sZXZlbCAgID0gbGV2ZWw7XG4gICAgICAgICAgbm9kZXMucHVzaCh0b2tlbik7XG5cbiAgICAgICAgICB0b2tlbiAgICAgICAgID0gbmV3IHN0YXRlLlRva2VuKCdsaW5rX2Nsb3NlJywgJ2EnLCAtMSk7XG4gICAgICAgICAgdG9rZW4ubGV2ZWwgICA9IC0tbGV2ZWw7XG4gICAgICAgICAgdG9rZW4ubWFya3VwICA9ICdsaW5raWZ5JztcbiAgICAgICAgICB0b2tlbi5pbmZvICAgID0gJ2F1dG8nO1xuICAgICAgICAgIG5vZGVzLnB1c2godG9rZW4pO1xuXG4gICAgICAgICAgbGFzdFBvcyA9IGxpbmtzW2xuXS5sYXN0SW5kZXg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxhc3RQb3MgPCB0ZXh0Lmxlbmd0aCkge1xuICAgICAgICAgIHRva2VuICAgICAgICAgPSBuZXcgc3RhdGUuVG9rZW4oJ3RleHQnLCAnJywgMCk7XG4gICAgICAgICAgdG9rZW4uY29udGVudCA9IHRleHQuc2xpY2UobGFzdFBvcyk7XG4gICAgICAgICAgdG9rZW4ubGV2ZWwgICA9IGxldmVsO1xuICAgICAgICAgIG5vZGVzLnB1c2godG9rZW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVwbGFjZSBjdXJyZW50IG5vZGVcbiAgICAgICAgYmxvY2tUb2tlbnNbal0uY2hpbGRyZW4gPSB0b2tlbnMgPSBhcnJheVJlcGxhY2VBdCh0b2tlbnMsIGksIG5vZGVzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG4iLCIvLyBOb3JtYWxpemUgaW5wdXQgc3RyaW5nXG5cbid1c2Ugc3RyaWN0JztcblxuXG52YXIgVEFCU19TQ0FOX1JFID0gL1tcXG5cXHRdL2c7XG52YXIgTkVXTElORVNfUkUgID0gL1xccltcXG5cXHUwMDg1XXxbXFx1MjQyNFxcdTIwMjhcXHUwMDg1XS9nO1xudmFyIE5VTExfUkUgICAgICA9IC9cXHUwMDAwL2c7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmxpbmUoc3RhdGUpIHtcbiAgdmFyIHN0ciwgbGluZVN0YXJ0LCBsYXN0VGFiUG9zO1xuXG4gIC8vIE5vcm1hbGl6ZSBuZXdsaW5lc1xuICBzdHIgPSBzdGF0ZS5zcmMucmVwbGFjZShORVdMSU5FU19SRSwgJ1xcbicpO1xuXG4gIC8vIFJlcGxhY2UgTlVMTCBjaGFyYWN0ZXJzXG4gIHN0ciA9IHN0ci5yZXBsYWNlKE5VTExfUkUsICdcXHVGRkZEJyk7XG5cbiAgLy8gUmVwbGFjZSB0YWJzIHdpdGggcHJvcGVyIG51bWJlciBvZiBzcGFjZXMgKDEuLjQpXG4gIGlmIChzdHIuaW5kZXhPZignXFx0JykgPj0gMCkge1xuICAgIGxpbmVTdGFydCA9IDA7XG4gICAgbGFzdFRhYlBvcyA9IDA7XG5cbiAgICBzdHIgPSBzdHIucmVwbGFjZShUQUJTX1NDQU5fUkUsIGZ1bmN0aW9uIChtYXRjaCwgb2Zmc2V0KSB7XG4gICAgICB2YXIgcmVzdWx0O1xuICAgICAgaWYgKHN0ci5jaGFyQ29kZUF0KG9mZnNldCkgPT09IDB4MEEpIHtcbiAgICAgICAgbGluZVN0YXJ0ID0gb2Zmc2V0ICsgMTtcbiAgICAgICAgbGFzdFRhYlBvcyA9IDA7XG4gICAgICAgIHJldHVybiBtYXRjaDtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCA9ICcgICAgJy5zbGljZSgob2Zmc2V0IC0gbGluZVN0YXJ0IC0gbGFzdFRhYlBvcykgJSA0KTtcbiAgICAgIGxhc3RUYWJQb3MgPSBvZmZzZXQgLSBsaW5lU3RhcnQgKyAxO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRlLnNyYyA9IHN0cjtcbn07XG4iLCIvLyBTaW1wbGUgdHlwb2dyYXBoeWMgcmVwbGFjZW1lbnRzXG4vL1xuLy8gJycg4oaSIOKAmOKAmVxuLy8gXCJcIiDihpIg4oCc4oCdLiBTZXQgJ8KrwrsnIGZvciBSdXNzaWFuLCAn4oCe4oCcJyBmb3IgR2VybWFuLCBlbXB0eSB0byBkaXNhYmxlXG4vLyAoYykgKEMpIOKGkiDCqVxuLy8gKHRtKSAoVE0pIOKGkiDihKJcbi8vIChyKSAoUikg4oaSIMKuXG4vLyArLSDihpIgwrFcbi8vIChwKSAoUCkgLT4gwqdcbi8vIC4uLiDihpIg4oCmIChhbHNvID8uLi4uIOKGkiA/Li4sICEuLi4uIOKGkiAhLi4pXG4vLyA/Pz8/Pz8/PyDihpIgPz8/LCAhISEhISDihpIgISEhLCBgLCxgIOKGkiBgLGBcbi8vIC0tIOKGkiAmbmRhc2g7LCAtLS0g4oaSICZtZGFzaDtcbi8vXG4ndXNlIHN0cmljdCc7XG5cbi8vIFRPRE86XG4vLyAtIGZyYWN0aW9uYWxzIDEvMiwgMS80LCAzLzQgLT4gwr0sIMK8LCDCvlxuLy8gLSBtaWx0aXBsaWNhdGlvbiAyIHggNCAtPiAyIMOXIDRcblxudmFyIFJBUkVfUkUgPSAvXFwrLXxcXC5cXC58XFw/XFw/XFw/XFw/fCEhISF8LCx8LS0vO1xuXG4vLyBXb3JrYXJvdW5kIGZvciBwaGFudG9tanMgLSBuZWVkIHJlZ2V4IHdpdGhvdXQgL2cgZmxhZyxcbi8vIG9yIHJvb3QgY2hlY2sgd2lsbCBmYWlsIGV2ZXJ5IHNlY29uZCB0aW1lXG52YXIgU0NPUEVEX0FCQlJfVEVTVF9SRSA9IC9cXCgoY3x0bXxyfHApXFwpL2k7XG5cbnZhciBTQ09QRURfQUJCUl9SRSA9IC9cXCgoY3x0bXxyfHApXFwpL2lnO1xudmFyIFNDT1BFRF9BQkJSID0ge1xuICAnYyc6ICfCqScsXG4gICdyJzogJ8KuJyxcbiAgJ3AnOiAnwqcnLFxuICAndG0nOiAn4oSiJ1xufTtcblxuZnVuY3Rpb24gcmVwbGFjZUZuKG1hdGNoLCBuYW1lKSB7XG4gIHJldHVybiBTQ09QRURfQUJCUltuYW1lLnRvTG93ZXJDYXNlKCldO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlX3Njb3BlZChpbmxpbmVUb2tlbnMpIHtcbiAgdmFyIGksIHRva2VuO1xuXG4gIGZvciAoaSA9IGlubGluZVRva2Vucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHRva2VuID0gaW5saW5lVG9rZW5zW2ldO1xuICAgIGlmICh0b2tlbi50eXBlID09PSAndGV4dCcpIHtcbiAgICAgIHRva2VuLmNvbnRlbnQgPSB0b2tlbi5jb250ZW50LnJlcGxhY2UoU0NPUEVEX0FCQlJfUkUsIHJlcGxhY2VGbik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VfcmFyZShpbmxpbmVUb2tlbnMpIHtcbiAgdmFyIGksIHRva2VuO1xuXG4gIGZvciAoaSA9IGlubGluZVRva2Vucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHRva2VuID0gaW5saW5lVG9rZW5zW2ldO1xuICAgIGlmICh0b2tlbi50eXBlID09PSAndGV4dCcpIHtcbiAgICAgIGlmIChSQVJFX1JFLnRlc3QodG9rZW4uY29udGVudCkpIHtcbiAgICAgICAgdG9rZW4uY29udGVudCA9IHRva2VuLmNvbnRlbnRcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcKy0vZywgJ8KxJylcbiAgICAgICAgICAgICAgICAgICAgLy8gLi4sIC4uLiwgLi4uLi4uLiAtPiDigKZcbiAgICAgICAgICAgICAgICAgICAgLy8gYnV0ID8uLi4uLiAmICEuLi4uLiAtPiA/Li4gJiAhLi5cbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcLnsyLH0vZywgJ+KApicpLnJlcGxhY2UoLyhbPyFdKeKApi9nLCAnJDEuLicpXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oWz8hXSl7NCx9L2csICckMSQxJDEnKS5yZXBsYWNlKC8sezIsfS9nLCAnLCcpXG4gICAgICAgICAgICAgICAgICAgIC8vIGVtLWRhc2hcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyhefFteLV0pLS0tKFteLV18JCkvbWcsICckMVxcdTIwMTQkMicpXG4gICAgICAgICAgICAgICAgICAgIC8vIGVuLWRhc2hcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyhefFxccyktLShcXHN8JCkvbWcsICckMVxcdTIwMTMkMicpXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oXnxbXi1cXHNdKS0tKFteLVxcc118JCkvbWcsICckMVxcdTIwMTMkMicpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmVwbGFjZShzdGF0ZSkge1xuICB2YXIgYmxrSWR4O1xuXG4gIGlmICghc3RhdGUubWQub3B0aW9ucy50eXBvZ3JhcGhlcikgeyByZXR1cm47IH1cblxuICBmb3IgKGJsa0lkeCA9IHN0YXRlLnRva2Vucy5sZW5ndGggLSAxOyBibGtJZHggPj0gMDsgYmxrSWR4LS0pIHtcblxuICAgIGlmIChzdGF0ZS50b2tlbnNbYmxrSWR4XS50eXBlICE9PSAnaW5saW5lJykgeyBjb250aW51ZTsgfVxuXG4gICAgaWYgKFNDT1BFRF9BQkJSX1RFU1RfUkUudGVzdChzdGF0ZS50b2tlbnNbYmxrSWR4XS5jb250ZW50KSkge1xuICAgICAgcmVwbGFjZV9zY29wZWQoc3RhdGUudG9rZW5zW2Jsa0lkeF0uY2hpbGRyZW4pO1xuICAgIH1cblxuICAgIGlmIChSQVJFX1JFLnRlc3Qoc3RhdGUudG9rZW5zW2Jsa0lkeF0uY29udGVudCkpIHtcbiAgICAgIHJlcGxhY2VfcmFyZShzdGF0ZS50b2tlbnNbYmxrSWR4XS5jaGlsZHJlbik7XG4gICAgfVxuXG4gIH1cbn07XG4iLCIvLyBDb252ZXJ0IHN0cmFpZ2h0IHF1b3RhdGlvbiBtYXJrcyB0byB0eXBvZ3JhcGhpYyBvbmVzXG4vL1xuJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciBpc1doaXRlU3BhY2UgICA9IHJlcXVpcmUoJy4uL2NvbW1vbi91dGlscycpLmlzV2hpdGVTcGFjZTtcbnZhciBpc1B1bmN0Q2hhciAgICA9IHJlcXVpcmUoJy4uL2NvbW1vbi91dGlscycpLmlzUHVuY3RDaGFyO1xudmFyIGlzTWRBc2NpaVB1bmN0ID0gcmVxdWlyZSgnLi4vY29tbW9uL3V0aWxzJykuaXNNZEFzY2lpUHVuY3Q7XG5cbnZhciBRVU9URV9URVNUX1JFID0gL1snXCJdLztcbnZhciBRVU9URV9SRSA9IC9bJ1wiXS9nO1xudmFyIEFQT1NUUk9QSEUgPSAnXFx1MjAxOSc7IC8qIOKAmSAqL1xuXG5cbmZ1bmN0aW9uIHJlcGxhY2VBdChzdHIsIGluZGV4LCBjaCkge1xuICByZXR1cm4gc3RyLnN1YnN0cigwLCBpbmRleCkgKyBjaCArIHN0ci5zdWJzdHIoaW5kZXggKyAxKTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc19pbmxpbmVzKHRva2Vucywgc3RhdGUpIHtcbiAgdmFyIGksIHRva2VuLCB0ZXh0LCB0LCBwb3MsIG1heCwgdGhpc0xldmVsLCBpdGVtLCBsYXN0Q2hhciwgbmV4dENoYXIsXG4gICAgICBpc0xhc3RQdW5jdENoYXIsIGlzTmV4dFB1bmN0Q2hhciwgaXNMYXN0V2hpdGVTcGFjZSwgaXNOZXh0V2hpdGVTcGFjZSxcbiAgICAgIGNhbk9wZW4sIGNhbkNsb3NlLCBqLCBpc1NpbmdsZSwgc3RhY2s7XG5cbiAgc3RhY2sgPSBbXTtcblxuICBmb3IgKGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgdG9rZW4gPSB0b2tlbnNbaV07XG5cbiAgICB0aGlzTGV2ZWwgPSB0b2tlbnNbaV0ubGV2ZWw7XG5cbiAgICBmb3IgKGogPSBzdGFjay5sZW5ndGggLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgaWYgKHN0YWNrW2pdLmxldmVsIDw9IHRoaXNMZXZlbCkgeyBicmVhazsgfVxuICAgIH1cbiAgICBzdGFjay5sZW5ndGggPSBqICsgMTtcblxuICAgIGlmICh0b2tlbi50eXBlICE9PSAndGV4dCcpIHsgY29udGludWU7IH1cblxuICAgIHRleHQgPSB0b2tlbi5jb250ZW50O1xuICAgIHBvcyA9IDA7XG4gICAgbWF4ID0gdGV4dC5sZW5ndGg7XG5cbiAgICAvKmVzbGludCBuby1sYWJlbHM6MCxibG9jay1zY29wZWQtdmFyOjAqL1xuICAgIE9VVEVSOlxuICAgIHdoaWxlIChwb3MgPCBtYXgpIHtcbiAgICAgIFFVT1RFX1JFLmxhc3RJbmRleCA9IHBvcztcbiAgICAgIHQgPSBRVU9URV9SRS5leGVjKHRleHQpO1xuICAgICAgaWYgKCF0KSB7IGJyZWFrOyB9XG5cbiAgICAgIGNhbk9wZW4gPSBjYW5DbG9zZSA9IHRydWU7XG4gICAgICBwb3MgPSB0LmluZGV4ICsgMTtcbiAgICAgIGlzU2luZ2xlID0gKHRbMF0gPT09IFwiJ1wiKTtcblxuICAgICAgLy8gdHJlYXQgYmVnaW4vZW5kIG9mIHRoZSBsaW5lIGFzIGEgd2hpdGVzcGFjZVxuICAgICAgbGFzdENoYXIgPSB0LmluZGV4IC0gMSA+PSAwID8gdGV4dC5jaGFyQ29kZUF0KHQuaW5kZXggLSAxKSA6IDB4MjA7XG4gICAgICBuZXh0Q2hhciA9IHBvcyA8IG1heCA/IHRleHQuY2hhckNvZGVBdChwb3MpIDogMHgyMDtcblxuICAgICAgaXNMYXN0UHVuY3RDaGFyID0gaXNNZEFzY2lpUHVuY3QobGFzdENoYXIpIHx8IGlzUHVuY3RDaGFyKFN0cmluZy5mcm9tQ2hhckNvZGUobGFzdENoYXIpKTtcbiAgICAgIGlzTmV4dFB1bmN0Q2hhciA9IGlzTWRBc2NpaVB1bmN0KG5leHRDaGFyKSB8fCBpc1B1bmN0Q2hhcihTdHJpbmcuZnJvbUNoYXJDb2RlKG5leHRDaGFyKSk7XG5cbiAgICAgIGlzTGFzdFdoaXRlU3BhY2UgPSBpc1doaXRlU3BhY2UobGFzdENoYXIpO1xuICAgICAgaXNOZXh0V2hpdGVTcGFjZSA9IGlzV2hpdGVTcGFjZShuZXh0Q2hhcik7XG5cbiAgICAgIGlmIChpc05leHRXaGl0ZVNwYWNlKSB7XG4gICAgICAgIGNhbk9wZW4gPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoaXNOZXh0UHVuY3RDaGFyKSB7XG4gICAgICAgIGlmICghKGlzTGFzdFdoaXRlU3BhY2UgfHwgaXNMYXN0UHVuY3RDaGFyKSkge1xuICAgICAgICAgIGNhbk9wZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaXNMYXN0V2hpdGVTcGFjZSkge1xuICAgICAgICBjYW5DbG9zZSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChpc0xhc3RQdW5jdENoYXIpIHtcbiAgICAgICAgaWYgKCEoaXNOZXh0V2hpdGVTcGFjZSB8fCBpc05leHRQdW5jdENoYXIpKSB7XG4gICAgICAgICAgY2FuQ2xvc2UgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobmV4dENoYXIgPT09IDB4MjIgLyogXCIgKi8gJiYgdFswXSA9PT0gJ1wiJykge1xuICAgICAgICBpZiAobGFzdENoYXIgPj0gMHgzMCAvKiAwICovICYmIGxhc3RDaGFyIDw9IDB4MzkgLyogOSAqLykge1xuICAgICAgICAgIC8vIHNwZWNpYWwgY2FzZTogMVwiXCIgLSBjb3VudCBmaXJzdCBxdW90ZSBhcyBhbiBpbmNoXG4gICAgICAgICAgY2FuQ2xvc2UgPSBjYW5PcGVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGNhbk9wZW4gJiYgY2FuQ2xvc2UpIHtcbiAgICAgICAgLy8gdHJlYXQgdGhpcyBhcyB0aGUgbWlkZGxlIG9mIHRoZSB3b3JkXG4gICAgICAgIGNhbk9wZW4gPSBmYWxzZTtcbiAgICAgICAgY2FuQ2xvc2UgPSBpc05leHRQdW5jdENoYXI7XG4gICAgICB9XG5cbiAgICAgIGlmICghY2FuT3BlbiAmJiAhY2FuQ2xvc2UpIHtcbiAgICAgICAgLy8gbWlkZGxlIG9mIHdvcmRcbiAgICAgICAgaWYgKGlzU2luZ2xlKSB7XG4gICAgICAgICAgdG9rZW4uY29udGVudCA9IHJlcGxhY2VBdCh0b2tlbi5jb250ZW50LCB0LmluZGV4LCBBUE9TVFJPUEhFKTtcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNhbkNsb3NlKSB7XG4gICAgICAgIC8vIHRoaXMgY291bGQgYmUgYSBjbG9zaW5nIHF1b3RlLCByZXdpbmQgdGhlIHN0YWNrIHRvIGdldCBhIG1hdGNoXG4gICAgICAgIGZvciAoaiA9IHN0YWNrLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XG4gICAgICAgICAgaXRlbSA9IHN0YWNrW2pdO1xuICAgICAgICAgIGlmIChzdGFja1tqXS5sZXZlbCA8IHRoaXNMZXZlbCkgeyBicmVhazsgfVxuICAgICAgICAgIGlmIChpdGVtLnNpbmdsZSA9PT0gaXNTaW5nbGUgJiYgc3RhY2tbal0ubGV2ZWwgPT09IHRoaXNMZXZlbCkge1xuICAgICAgICAgICAgaXRlbSA9IHN0YWNrW2pdO1xuICAgICAgICAgICAgaWYgKGlzU2luZ2xlKSB7XG4gICAgICAgICAgICAgIHRva2Vuc1tpdGVtLnRva2VuXS5jb250ZW50ID0gcmVwbGFjZUF0KFxuICAgICAgICAgICAgICAgIHRva2Vuc1tpdGVtLnRva2VuXS5jb250ZW50LCBpdGVtLnBvcywgc3RhdGUubWQub3B0aW9ucy5xdW90ZXNbMl0pO1xuICAgICAgICAgICAgICB0b2tlbi5jb250ZW50ID0gcmVwbGFjZUF0KFxuICAgICAgICAgICAgICAgIHRva2VuLmNvbnRlbnQsIHQuaW5kZXgsIHN0YXRlLm1kLm9wdGlvbnMucXVvdGVzWzNdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRva2Vuc1tpdGVtLnRva2VuXS5jb250ZW50ID0gcmVwbGFjZUF0KFxuICAgICAgICAgICAgICAgIHRva2Vuc1tpdGVtLnRva2VuXS5jb250ZW50LCBpdGVtLnBvcywgc3RhdGUubWQub3B0aW9ucy5xdW90ZXNbMF0pO1xuICAgICAgICAgICAgICB0b2tlbi5jb250ZW50ID0gcmVwbGFjZUF0KHRva2VuLmNvbnRlbnQsIHQuaW5kZXgsIHN0YXRlLm1kLm9wdGlvbnMucXVvdGVzWzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YWNrLmxlbmd0aCA9IGo7XG4gICAgICAgICAgICBjb250aW51ZSBPVVRFUjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGNhbk9wZW4pIHtcbiAgICAgICAgc3RhY2sucHVzaCh7XG4gICAgICAgICAgdG9rZW46IGksXG4gICAgICAgICAgcG9zOiB0LmluZGV4LFxuICAgICAgICAgIHNpbmdsZTogaXNTaW5nbGUsXG4gICAgICAgICAgbGV2ZWw6IHRoaXNMZXZlbFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoY2FuQ2xvc2UgJiYgaXNTaW5nbGUpIHtcbiAgICAgICAgdG9rZW4uY29udGVudCA9IHJlcGxhY2VBdCh0b2tlbi5jb250ZW50LCB0LmluZGV4LCBBUE9TVFJPUEhFKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNtYXJ0cXVvdGVzKHN0YXRlKSB7XG4gIC8qZXNsaW50IG1heC1kZXB0aDowKi9cbiAgdmFyIGJsa0lkeDtcblxuICBpZiAoIXN0YXRlLm1kLm9wdGlvbnMudHlwb2dyYXBoZXIpIHsgcmV0dXJuOyB9XG5cbiAgZm9yIChibGtJZHggPSBzdGF0ZS50b2tlbnMubGVuZ3RoIC0gMTsgYmxrSWR4ID49IDA7IGJsa0lkeC0tKSB7XG5cbiAgICBpZiAoc3RhdGUudG9rZW5zW2Jsa0lkeF0udHlwZSAhPT0gJ2lubGluZScgfHxcbiAgICAgICAgIVFVT1RFX1RFU1RfUkUudGVzdChzdGF0ZS50b2tlbnNbYmxrSWR4XS5jb250ZW50KSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgcHJvY2Vzc19pbmxpbmVzKHN0YXRlLnRva2Vuc1tibGtJZHhdLmNoaWxkcmVuLCBzdGF0ZSk7XG4gIH1cbn07XG4iLCIvLyBDb3JlIHN0YXRlIG9iamVjdFxuLy9cbid1c2Ugc3RyaWN0JztcblxudmFyIFRva2VuID0gcmVxdWlyZSgnLi4vdG9rZW4nKTtcblxuXG5mdW5jdGlvbiBTdGF0ZUNvcmUoc3JjLCBtZCwgZW52KSB7XG4gIHRoaXMuc3JjID0gc3JjO1xuICB0aGlzLmVudiA9IGVudjtcbiAgdGhpcy50b2tlbnMgPSBbXTtcbiAgdGhpcy5pbmxpbmVNb2RlID0gZmFsc2U7XG4gIHRoaXMubWQgPSBtZDsgLy8gbGluayB0byBwYXJzZXIgaW5zdGFuY2Vcbn1cblxuLy8gcmUtZXhwb3J0IFRva2VuIGNsYXNzIHRvIHVzZSBpbiBjb3JlIHJ1bGVzXG5TdGF0ZUNvcmUucHJvdG90eXBlLlRva2VuID0gVG9rZW47XG5cblxubW9kdWxlLmV4cG9ydHMgPSBTdGF0ZUNvcmU7XG4iLCIvLyBQcm9jZXNzIGF1dG9saW5rcyAnPHByb3RvY29sOi4uLj4nXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHVybF9zY2hlbWFzID0gcmVxdWlyZSgnLi4vY29tbW9uL3VybF9zY2hlbWFzJyk7XG5cblxuLyplc2xpbnQgbWF4LWxlbjowKi9cbnZhciBFTUFJTF9SRSAgICA9IC9ePChbYS16QS1aMC05LiEjJCUmJyorXFwvPT9eX2B7fH1+LV0rQFthLXpBLVowLTldKD86W2EtekEtWjAtOS1dezAsNjF9W2EtekEtWjAtOV0pPyg/OlxcLlthLXpBLVowLTldKD86W2EtekEtWjAtOS1dezAsNjF9W2EtekEtWjAtOV0pPykqKT4vO1xudmFyIEFVVE9MSU5LX1JFID0gL148KFthLXpBLVouXFwtXXsxLDI1fSk6KFtePD5cXHgwMC1cXHgyMF0qKT4vO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXV0b2xpbmsoc3RhdGUsIHNpbGVudCkge1xuICB2YXIgdGFpbCwgbGlua01hdGNoLCBlbWFpbE1hdGNoLCB1cmwsIGZ1bGxVcmwsIHRva2VuLFxuICAgICAgcG9zID0gc3RhdGUucG9zO1xuXG4gIGlmIChzdGF0ZS5zcmMuY2hhckNvZGVBdChwb3MpICE9PSAweDNDLyogPCAqLykgeyByZXR1cm4gZmFsc2U7IH1cblxuICB0YWlsID0gc3RhdGUuc3JjLnNsaWNlKHBvcyk7XG5cbiAgaWYgKHRhaWwuaW5kZXhPZignPicpIDwgMCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICBpZiAoQVVUT0xJTktfUkUudGVzdCh0YWlsKSkge1xuICAgIGxpbmtNYXRjaCA9IHRhaWwubWF0Y2goQVVUT0xJTktfUkUpO1xuXG4gICAgaWYgKHVybF9zY2hlbWFzLmluZGV4T2YobGlua01hdGNoWzFdLnRvTG93ZXJDYXNlKCkpIDwgMCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIHVybCA9IGxpbmtNYXRjaFswXS5zbGljZSgxLCAtMSk7XG4gICAgZnVsbFVybCA9IHN0YXRlLm1kLm5vcm1hbGl6ZUxpbmsodXJsKTtcbiAgICBpZiAoIXN0YXRlLm1kLnZhbGlkYXRlTGluayhmdWxsVXJsKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIGlmICghc2lsZW50KSB7XG4gICAgICB0b2tlbiAgICAgICAgID0gc3RhdGUucHVzaCgnbGlua19vcGVuJywgJ2EnLCAxKTtcbiAgICAgIHRva2VuLmF0dHJzICAgPSBbIFsgJ2hyZWYnLCBmdWxsVXJsIF0gXTtcblxuICAgICAgdG9rZW4gICAgICAgICA9IHN0YXRlLnB1c2goJ3RleHQnLCAnJywgMCk7XG4gICAgICB0b2tlbi5jb250ZW50ID0gc3RhdGUubWQubm9ybWFsaXplTGlua1RleHQodXJsKTtcblxuICAgICAgdG9rZW4gICAgICAgICA9IHN0YXRlLnB1c2goJ2xpbmtfY2xvc2UnLCAnYScsIC0xKTtcbiAgICB9XG5cbiAgICBzdGF0ZS5wb3MgKz0gbGlua01hdGNoWzBdLmxlbmd0aDtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmIChFTUFJTF9SRS50ZXN0KHRhaWwpKSB7XG4gICAgZW1haWxNYXRjaCA9IHRhaWwubWF0Y2goRU1BSUxfUkUpO1xuXG4gICAgdXJsID0gZW1haWxNYXRjaFswXS5zbGljZSgxLCAtMSk7XG4gICAgZnVsbFVybCA9IHN0YXRlLm1kLm5vcm1hbGl6ZUxpbmsoJ21haWx0bzonICsgdXJsKTtcbiAgICBpZiAoIXN0YXRlLm1kLnZhbGlkYXRlTGluayhmdWxsVXJsKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIGlmICghc2lsZW50KSB7XG4gICAgICB0b2tlbiAgICAgICAgID0gc3RhdGUucHVzaCgnbGlua19vcGVuJywgJ2EnLCAxKTtcbiAgICAgIHRva2VuLmF0dHJzICAgPSBbIFsgJ2hyZWYnLCBmdWxsVXJsIF0gXTtcbiAgICAgIHRva2VuLm1hcmt1cCAgPSAnYXV0b2xpbmsnO1xuICAgICAgdG9rZW4uaW5mbyAgICA9ICdhdXRvJztcblxuICAgICAgdG9rZW4gICAgICAgICA9IHN0YXRlLnB1c2goJ3RleHQnLCAnJywgMCk7XG4gICAgICB0b2tlbi5jb250ZW50ID0gc3RhdGUubWQubm9ybWFsaXplTGlua1RleHQodXJsKTtcblxuICAgICAgdG9rZW4gICAgICAgICA9IHN0YXRlLnB1c2goJ2xpbmtfY2xvc2UnLCAnYScsIC0xKTtcbiAgICAgIHRva2VuLm1hcmt1cCAgPSAnYXV0b2xpbmsnO1xuICAgICAgdG9rZW4uaW5mbyAgICA9ICdhdXRvJztcbiAgICB9XG5cbiAgICBzdGF0ZS5wb3MgKz0gZW1haWxNYXRjaFswXS5sZW5ndGg7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59O1xuIiwiLy8gUGFyc2UgYmFja3RpY2tzXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiYWNrdGljayhzdGF0ZSwgc2lsZW50KSB7XG4gIHZhciBzdGFydCwgbWF4LCBtYXJrZXIsIG1hdGNoU3RhcnQsIG1hdGNoRW5kLCB0b2tlbixcbiAgICAgIHBvcyA9IHN0YXRlLnBvcyxcbiAgICAgIGNoID0gc3RhdGUuc3JjLmNoYXJDb2RlQXQocG9zKTtcblxuICBpZiAoY2ggIT09IDB4NjAvKiBgICovKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIHN0YXJ0ID0gcG9zO1xuICBwb3MrKztcbiAgbWF4ID0gc3RhdGUucG9zTWF4O1xuXG4gIHdoaWxlIChwb3MgPCBtYXggJiYgc3RhdGUuc3JjLmNoYXJDb2RlQXQocG9zKSA9PT0gMHg2MC8qIGAgKi8pIHsgcG9zKys7IH1cblxuICBtYXJrZXIgPSBzdGF0ZS5zcmMuc2xpY2Uoc3RhcnQsIHBvcyk7XG5cbiAgbWF0Y2hTdGFydCA9IG1hdGNoRW5kID0gcG9zO1xuXG4gIHdoaWxlICgobWF0Y2hTdGFydCA9IHN0YXRlLnNyYy5pbmRleE9mKCdgJywgbWF0Y2hFbmQpKSAhPT0gLTEpIHtcbiAgICBtYXRjaEVuZCA9IG1hdGNoU3RhcnQgKyAxO1xuXG4gICAgd2hpbGUgKG1hdGNoRW5kIDwgbWF4ICYmIHN0YXRlLnNyYy5jaGFyQ29kZUF0KG1hdGNoRW5kKSA9PT0gMHg2MC8qIGAgKi8pIHsgbWF0Y2hFbmQrKzsgfVxuXG4gICAgaWYgKG1hdGNoRW5kIC0gbWF0Y2hTdGFydCA9PT0gbWFya2VyLmxlbmd0aCkge1xuICAgICAgaWYgKCFzaWxlbnQpIHtcbiAgICAgICAgdG9rZW4gICAgICAgICA9IHN0YXRlLnB1c2goJ2NvZGVfaW5saW5lJywgJ2NvZGUnLCAwKTtcbiAgICAgICAgdG9rZW4ubWFya3VwICA9IG1hcmtlcjtcbiAgICAgICAgdG9rZW4uY29udGVudCA9IHN0YXRlLnNyYy5zbGljZShwb3MsIG1hdGNoU3RhcnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvWyBcXG5dKy9nLCAnICcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudHJpbSgpO1xuICAgICAgfVxuICAgICAgc3RhdGUucG9zID0gbWF0Y2hFbmQ7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoIXNpbGVudCkgeyBzdGF0ZS5wZW5kaW5nICs9IG1hcmtlcjsgfVxuICBzdGF0ZS5wb3MgKz0gbWFya2VyLmxlbmd0aDtcbiAgcmV0dXJuIHRydWU7XG59O1xuIiwiLy8gUHJvY2VzcyAqdGhpcyogYW5kIF90aGF0X1xuLy9cbid1c2Ugc3RyaWN0JztcblxuXG52YXIgaXNXaGl0ZVNwYWNlICAgPSByZXF1aXJlKCcuLi9jb21tb24vdXRpbHMnKS5pc1doaXRlU3BhY2U7XG52YXIgaXNQdW5jdENoYXIgICAgPSByZXF1aXJlKCcuLi9jb21tb24vdXRpbHMnKS5pc1B1bmN0Q2hhcjtcbnZhciBpc01kQXNjaWlQdW5jdCA9IHJlcXVpcmUoJy4uL2NvbW1vbi91dGlscycpLmlzTWRBc2NpaVB1bmN0O1xuXG5cbi8vIHBhcnNlIHNlcXVlbmNlIG9mIGVtcGhhc2lzIG1hcmtlcnMsXG4vLyBcInN0YXJ0XCIgc2hvdWxkIHBvaW50IGF0IGEgdmFsaWQgbWFya2VyXG5mdW5jdGlvbiBzY2FuRGVsaW1zKHN0YXRlLCBzdGFydCkge1xuICB2YXIgcG9zID0gc3RhcnQsIGxhc3RDaGFyLCBuZXh0Q2hhciwgY291bnQsIGNhbl9vcGVuLCBjYW5fY2xvc2UsXG4gICAgICBpc0xhc3RXaGl0ZVNwYWNlLCBpc0xhc3RQdW5jdENoYXIsXG4gICAgICBpc05leHRXaGl0ZVNwYWNlLCBpc05leHRQdW5jdENoYXIsXG4gICAgICBsZWZ0X2ZsYW5raW5nID0gdHJ1ZSxcbiAgICAgIHJpZ2h0X2ZsYW5raW5nID0gdHJ1ZSxcbiAgICAgIG1heCA9IHN0YXRlLnBvc01heCxcbiAgICAgIG1hcmtlciA9IHN0YXRlLnNyYy5jaGFyQ29kZUF0KHN0YXJ0KTtcblxuICAvLyB0cmVhdCBiZWdpbm5pbmcgb2YgdGhlIGxpbmUgYXMgYSB3aGl0ZXNwYWNlXG4gIGxhc3RDaGFyID0gc3RhcnQgPiAwID8gc3RhdGUuc3JjLmNoYXJDb2RlQXQoc3RhcnQgLSAxKSA6IDB4MjA7XG5cbiAgd2hpbGUgKHBvcyA8IG1heCAmJiBzdGF0ZS5zcmMuY2hhckNvZGVBdChwb3MpID09PSBtYXJrZXIpIHsgcG9zKys7IH1cblxuICBjb3VudCA9IHBvcyAtIHN0YXJ0O1xuXG4gIC8vIHRyZWF0IGVuZCBvZiB0aGUgbGluZSBhcyBhIHdoaXRlc3BhY2VcbiAgbmV4dENoYXIgPSBwb3MgPCBtYXggPyBzdGF0ZS5zcmMuY2hhckNvZGVBdChwb3MpIDogMHgyMDtcblxuICBpc0xhc3RQdW5jdENoYXIgPSBpc01kQXNjaWlQdW5jdChsYXN0Q2hhcikgfHwgaXNQdW5jdENoYXIoU3RyaW5nLmZyb21DaGFyQ29kZShsYXN0Q2hhcikpO1xuICBpc05leHRQdW5jdENoYXIgPSBpc01kQXNjaWlQdW5jdChuZXh0Q2hhcikgfHwgaXNQdW5jdENoYXIoU3RyaW5nLmZyb21DaGFyQ29kZShuZXh0Q2hhcikpO1xuXG4gIGlzTGFzdFdoaXRlU3BhY2UgPSBpc1doaXRlU3BhY2UobGFzdENoYXIpO1xuICBpc05leHRXaGl0ZVNwYWNlID0gaXNXaGl0ZVNwYWNlKG5leHRDaGFyKTtcblxuICBpZiAoaXNOZXh0V2hpdGVTcGFjZSkge1xuICAgIGxlZnRfZmxhbmtpbmcgPSBmYWxzZTtcbiAgfSBlbHNlIGlmIChpc05leHRQdW5jdENoYXIpIHtcbiAgICBpZiAoIShpc0xhc3RXaGl0ZVNwYWNlIHx8IGlzTGFzdFB1bmN0Q2hhcikpIHtcbiAgICAgIGxlZnRfZmxhbmtpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBpZiAoaXNMYXN0V2hpdGVTcGFjZSkge1xuICAgIHJpZ2h0X2ZsYW5raW5nID0gZmFsc2U7XG4gIH0gZWxzZSBpZiAoaXNMYXN0UHVuY3RDaGFyKSB7XG4gICAgaWYgKCEoaXNOZXh0V2hpdGVTcGFjZSB8fCBpc05leHRQdW5jdENoYXIpKSB7XG4gICAgICByaWdodF9mbGFua2luZyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGlmIChtYXJrZXIgPT09IDB4NUYgLyogXyAqLykge1xuICAgIC8vIFwiX1wiIGluc2lkZSBhIHdvcmQgY2FuIG5laXRoZXIgb3BlbiBub3IgY2xvc2UgYW4gZW1waGFzaXNcbiAgICBjYW5fb3BlbiAgPSBsZWZ0X2ZsYW5raW5nICAmJiAoIXJpZ2h0X2ZsYW5raW5nIHx8IGlzTGFzdFB1bmN0Q2hhcik7XG4gICAgY2FuX2Nsb3NlID0gcmlnaHRfZmxhbmtpbmcgJiYgKCFsZWZ0X2ZsYW5raW5nICB8fCBpc05leHRQdW5jdENoYXIpO1xuICB9IGVsc2Uge1xuICAgIGNhbl9vcGVuICA9IGxlZnRfZmxhbmtpbmc7XG4gICAgY2FuX2Nsb3NlID0gcmlnaHRfZmxhbmtpbmc7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNhbl9vcGVuOiBjYW5fb3BlbixcbiAgICBjYW5fY2xvc2U6IGNhbl9jbG9zZSxcbiAgICBkZWxpbXM6IGNvdW50XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW1waGFzaXMoc3RhdGUsIHNpbGVudCkge1xuICB2YXIgc3RhcnRDb3VudCxcbiAgICAgIGNvdW50LFxuICAgICAgZm91bmQsXG4gICAgICBvbGRDb3VudCxcbiAgICAgIG5ld0NvdW50LFxuICAgICAgc3RhY2ssXG4gICAgICByZXMsXG4gICAgICB0b2tlbixcbiAgICAgIG1heCA9IHN0YXRlLnBvc01heCxcbiAgICAgIHN0YXJ0ID0gc3RhdGUucG9zLFxuICAgICAgbWFya2VyID0gc3RhdGUuc3JjLmNoYXJDb2RlQXQoc3RhcnQpO1xuXG4gIGlmIChtYXJrZXIgIT09IDB4NUYvKiBfICovICYmIG1hcmtlciAhPT0gMHgyQSAvKiAqICovKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAoc2lsZW50KSB7IHJldHVybiBmYWxzZTsgfSAvLyBkb24ndCBydW4gYW55IHBhaXJzIGluIHZhbGlkYXRpb24gbW9kZVxuXG4gIHJlcyA9IHNjYW5EZWxpbXMoc3RhdGUsIHN0YXJ0KTtcbiAgc3RhcnRDb3VudCA9IHJlcy5kZWxpbXM7XG4gIGlmICghcmVzLmNhbl9vcGVuKSB7XG4gICAgc3RhdGUucG9zICs9IHN0YXJ0Q291bnQ7XG4gICAgLy8gRWFybGllciB3ZSBjaGVja2VkICFzaWxlbnQsIGJ1dCB0aGlzIGltcGxlbWVudGF0aW9uIGRvZXMgbm90IG5lZWQgaXRcbiAgICBzdGF0ZS5wZW5kaW5nICs9IHN0YXRlLnNyYy5zbGljZShzdGFydCwgc3RhdGUucG9zKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN0YXRlLnBvcyA9IHN0YXJ0ICsgc3RhcnRDb3VudDtcbiAgc3RhY2sgPSBbIHN0YXJ0Q291bnQgXTtcblxuICB3aGlsZSAoc3RhdGUucG9zIDwgbWF4KSB7XG4gICAgaWYgKHN0YXRlLnNyYy5jaGFyQ29kZUF0KHN0YXRlLnBvcykgPT09IG1hcmtlcikge1xuICAgICAgcmVzID0gc2NhbkRlbGltcyhzdGF0ZSwgc3RhdGUucG9zKTtcbiAgICAgIGNvdW50ID0gcmVzLmRlbGltcztcbiAgICAgIGlmIChyZXMuY2FuX2Nsb3NlKSB7XG4gICAgICAgIG9sZENvdW50ID0gc3RhY2sucG9wKCk7XG4gICAgICAgIG5ld0NvdW50ID0gY291bnQ7XG5cbiAgICAgICAgd2hpbGUgKG9sZENvdW50ICE9PSBuZXdDb3VudCkge1xuICAgICAgICAgIGlmIChuZXdDb3VudCA8IG9sZENvdW50KSB7XG4gICAgICAgICAgICBzdGFjay5wdXNoKG9sZENvdW50IC0gbmV3Q291bnQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gYXNzZXJ0KG5ld0NvdW50ID4gb2xkQ291bnQpXG4gICAgICAgICAgbmV3Q291bnQgLT0gb2xkQ291bnQ7XG5cbiAgICAgICAgICBpZiAoc3RhY2subGVuZ3RoID09PSAwKSB7IGJyZWFrOyB9XG4gICAgICAgICAgc3RhdGUucG9zICs9IG9sZENvdW50O1xuICAgICAgICAgIG9sZENvdW50ID0gc3RhY2sucG9wKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhY2subGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgc3RhcnRDb3VudCA9IG9sZENvdW50O1xuICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZS5wb3MgKz0gY291bnQ7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVzLmNhbl9vcGVuKSB7IHN0YWNrLnB1c2goY291bnQpOyB9XG4gICAgICBzdGF0ZS5wb3MgKz0gY291bnQ7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBzdGF0ZS5tZC5pbmxpbmUuc2tpcFRva2VuKHN0YXRlKTtcbiAgfVxuXG4gIGlmICghZm91bmQpIHtcbiAgICAvLyBwYXJzZXIgZmFpbGVkIHRvIGZpbmQgZW5kaW5nIHRhZywgc28gaXQncyBub3QgdmFsaWQgZW1waGFzaXNcbiAgICBzdGF0ZS5wb3MgPSBzdGFydDtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBmb3VuZCFcbiAgc3RhdGUucG9zTWF4ID0gc3RhdGUucG9zO1xuICBzdGF0ZS5wb3MgPSBzdGFydCArIHN0YXJ0Q291bnQ7XG5cbiAgLy8gRWFybGllciB3ZSBjaGVja2VkICFzaWxlbnQsIGJ1dCB0aGlzIGltcGxlbWVudGF0aW9uIGRvZXMgbm90IG5lZWQgaXRcblxuICAvLyB3ZSBoYXZlIGBzdGFydENvdW50YCBzdGFydGluZyBhbmQgZW5kaW5nIG1hcmtlcnMsXG4gIC8vIG5vdyB0cnlpbmcgdG8gc2VyaWFsaXplIHRoZW0gaW50byB0b2tlbnNcbiAgZm9yIChjb3VudCA9IHN0YXJ0Q291bnQ7IGNvdW50ID4gMTsgY291bnQgLT0gMikge1xuICAgIHRva2VuICAgICAgICA9IHN0YXRlLnB1c2goJ3N0cm9uZ19vcGVuJywgJ3N0cm9uZycsIDEpO1xuICAgIHRva2VuLm1hcmt1cCA9IFN0cmluZy5mcm9tQ2hhckNvZGUobWFya2VyKSArIFN0cmluZy5mcm9tQ2hhckNvZGUobWFya2VyKTtcbiAgfVxuICBpZiAoY291bnQgJSAyKSB7XG4gICAgdG9rZW4gICAgICAgID0gc3RhdGUucHVzaCgnZW1fb3BlbicsICdlbScsIDEpO1xuICAgIHRva2VuLm1hcmt1cCA9IFN0cmluZy5mcm9tQ2hhckNvZGUobWFya2VyKTtcbiAgfVxuXG4gIHN0YXRlLm1kLmlubGluZS50b2tlbml6ZShzdGF0ZSk7XG5cbiAgaWYgKGNvdW50ICUgMikge1xuICAgIHRva2VuICAgICAgICA9IHN0YXRlLnB1c2goJ2VtX2Nsb3NlJywgJ2VtJywgLTEpO1xuICAgIHRva2VuLm1hcmt1cCA9IFN0cmluZy5mcm9tQ2hhckNvZGUobWFya2VyKTtcbiAgfVxuICBmb3IgKGNvdW50ID0gc3RhcnRDb3VudDsgY291bnQgPiAxOyBjb3VudCAtPSAyKSB7XG4gICAgdG9rZW4gICAgICAgID0gc3RhdGUucHVzaCgnc3Ryb25nX2Nsb3NlJywgJ3N0cm9uZycsIC0xKTtcbiAgICB0b2tlbi5tYXJrdXAgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKG1hcmtlcikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKG1hcmtlcik7XG4gIH1cblxuICBzdGF0ZS5wb3MgPSBzdGF0ZS5wb3NNYXggKyBzdGFydENvdW50O1xuICBzdGF0ZS5wb3NNYXggPSBtYXg7XG4gIHJldHVybiB0cnVlO1xufTtcbiIsIi8vIFByb2Nlc3MgaHRtbCBlbnRpdHkgLSAmIzEyMzssICYjeEFGOywgJnF1b3Q7LCAuLi5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW50aXRpZXMgICAgICAgICAgPSByZXF1aXJlKCcuLi9jb21tb24vZW50aXRpZXMnKTtcbnZhciBoYXMgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4uL2NvbW1vbi91dGlscycpLmhhcztcbnZhciBpc1ZhbGlkRW50aXR5Q29kZSA9IHJlcXVpcmUoJy4uL2NvbW1vbi91dGlscycpLmlzVmFsaWRFbnRpdHlDb2RlO1xudmFyIGZyb21Db2RlUG9pbnQgICAgID0gcmVxdWlyZSgnLi4vY29tbW9uL3V0aWxzJykuZnJvbUNvZGVQb2ludDtcblxuXG52YXIgRElHSVRBTF9SRSA9IC9eJiMoKD86eFthLWYwLTldezEsOH18WzAtOV17MSw4fSkpOy9pO1xudmFyIE5BTUVEX1JFICAgPSAvXiYoW2Etel1bYS16MC05XXsxLDMxfSk7L2k7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbnRpdHkoc3RhdGUsIHNpbGVudCkge1xuICB2YXIgY2gsIGNvZGUsIG1hdGNoLCBwb3MgPSBzdGF0ZS5wb3MsIG1heCA9IHN0YXRlLnBvc01heDtcblxuICBpZiAoc3RhdGUuc3JjLmNoYXJDb2RlQXQocG9zKSAhPT0gMHgyNi8qICYgKi8pIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgaWYgKHBvcyArIDEgPCBtYXgpIHtcbiAgICBjaCA9IHN0YXRlLnNyYy5jaGFyQ29kZUF0KHBvcyArIDEpO1xuXG4gICAgaWYgKGNoID09PSAweDIzIC8qICMgKi8pIHtcbiAgICAgIG1hdGNoID0gc3RhdGUuc3JjLnNsaWNlKHBvcykubWF0Y2goRElHSVRBTF9SRSk7XG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgaWYgKCFzaWxlbnQpIHtcbiAgICAgICAgICBjb2RlID0gbWF0Y2hbMV1bMF0udG9Mb3dlckNhc2UoKSA9PT0gJ3gnID8gcGFyc2VJbnQobWF0Y2hbMV0uc2xpY2UoMSksIDE2KSA6IHBhcnNlSW50KG1hdGNoWzFdLCAxMCk7XG4gICAgICAgICAgc3RhdGUucGVuZGluZyArPSBpc1ZhbGlkRW50aXR5Q29kZShjb2RlKSA/IGZyb21Db2RlUG9pbnQoY29kZSkgOiBmcm9tQ29kZVBvaW50KDB4RkZGRCk7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUucG9zICs9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hdGNoID0gc3RhdGUuc3JjLnNsaWNlKHBvcykubWF0Y2goTkFNRURfUkUpO1xuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIGlmIChoYXMoZW50aXRpZXMsIG1hdGNoWzFdKSkge1xuICAgICAgICAgIGlmICghc2lsZW50KSB7IHN0YXRlLnBlbmRpbmcgKz0gZW50aXRpZXNbbWF0Y2hbMV1dOyB9XG4gICAgICAgICAgc3RhdGUucG9zICs9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmICghc2lsZW50KSB7IHN0YXRlLnBlbmRpbmcgKz0gJyYnOyB9XG4gIHN0YXRlLnBvcysrO1xuICByZXR1cm4gdHJ1ZTtcbn07XG4iLCIvLyBQcm9jZWVzcyBlc2NhcGVkIGNoYXJzIGFuZCBoYXJkYnJlYWtzXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIEVTQ0FQRUQgPSBbXTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7IGkrKykgeyBFU0NBUEVELnB1c2goMCk7IH1cblxuJ1xcXFwhXCIjJCUmXFwnKCkqKywuLzo7PD0+P0BbXV5fYHt8fX4tJ1xuICAuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24oY2gpIHsgRVNDQVBFRFtjaC5jaGFyQ29kZUF0KDApXSA9IDE7IH0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXNjYXBlKHN0YXRlLCBzaWxlbnQpIHtcbiAgdmFyIGNoLCBwb3MgPSBzdGF0ZS5wb3MsIG1heCA9IHN0YXRlLnBvc01heDtcblxuICBpZiAoc3RhdGUuc3JjLmNoYXJDb2RlQXQocG9zKSAhPT0gMHg1Qy8qIFxcICovKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIHBvcysrO1xuXG4gIGlmIChwb3MgPCBtYXgpIHtcbiAgICBjaCA9IHN0YXRlLnNyYy5jaGFyQ29kZUF0KHBvcyk7XG5cbiAgICBpZiAoY2ggPCAyNTYgJiYgRVNDQVBFRFtjaF0gIT09IDApIHtcbiAgICAgIGlmICghc2lsZW50KSB7IHN0YXRlLnBlbmRpbmcgKz0gc3RhdGUuc3JjW3Bvc107IH1cbiAgICAgIHN0YXRlLnBvcyArPSAyO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGNoID09PSAweDBBKSB7XG4gICAgICBpZiAoIXNpbGVudCkge1xuICAgICAgICBzdGF0ZS5wdXNoKCdoYXJkYnJlYWsnLCAnYnInLCAwKTtcbiAgICAgIH1cblxuICAgICAgcG9zKys7XG4gICAgICAvLyBza2lwIGxlYWRpbmcgd2hpdGVzcGFjZXMgZnJvbSBuZXh0IGxpbmVcbiAgICAgIHdoaWxlIChwb3MgPCBtYXggJiYgc3RhdGUuc3JjLmNoYXJDb2RlQXQocG9zKSA9PT0gMHgyMCkgeyBwb3MrKzsgfVxuXG4gICAgICBzdGF0ZS5wb3MgPSBwb3M7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoIXNpbGVudCkgeyBzdGF0ZS5wZW5kaW5nICs9ICdcXFxcJzsgfVxuICBzdGF0ZS5wb3MrKztcbiAgcmV0dXJuIHRydWU7XG59O1xuIiwiLy8gUHJvY2VzcyBodG1sIHRhZ3NcblxuJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciBIVE1MX1RBR19SRSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9odG1sX3JlJykuSFRNTF9UQUdfUkU7XG5cblxuZnVuY3Rpb24gaXNMZXR0ZXIoY2gpIHtcbiAgLyplc2xpbnQgbm8tYml0d2lzZTowKi9cbiAgdmFyIGxjID0gY2ggfCAweDIwOyAvLyB0byBsb3dlciBjYXNlXG4gIHJldHVybiAobGMgPj0gMHg2MS8qIGEgKi8pICYmIChsYyA8PSAweDdhLyogeiAqLyk7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBodG1sX2lubGluZShzdGF0ZSwgc2lsZW50KSB7XG4gIHZhciBjaCwgbWF0Y2gsIG1heCwgdG9rZW4sXG4gICAgICBwb3MgPSBzdGF0ZS5wb3M7XG5cbiAgaWYgKCFzdGF0ZS5tZC5vcHRpb25zLmh0bWwpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgLy8gQ2hlY2sgc3RhcnRcbiAgbWF4ID0gc3RhdGUucG9zTWF4O1xuICBpZiAoc3RhdGUuc3JjLmNoYXJDb2RlQXQocG9zKSAhPT0gMHgzQy8qIDwgKi8gfHxcbiAgICAgIHBvcyArIDIgPj0gbWF4KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gUXVpY2sgZmFpbCBvbiBzZWNvbmQgY2hhclxuICBjaCA9IHN0YXRlLnNyYy5jaGFyQ29kZUF0KHBvcyArIDEpO1xuICBpZiAoY2ggIT09IDB4MjEvKiAhICovICYmXG4gICAgICBjaCAhPT0gMHgzRi8qID8gKi8gJiZcbiAgICAgIGNoICE9PSAweDJGLyogLyAqLyAmJlxuICAgICAgIWlzTGV0dGVyKGNoKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIG1hdGNoID0gc3RhdGUuc3JjLnNsaWNlKHBvcykubWF0Y2goSFRNTF9UQUdfUkUpO1xuICBpZiAoIW1hdGNoKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIGlmICghc2lsZW50KSB7XG4gICAgdG9rZW4gICAgICAgICA9IHN0YXRlLnB1c2goJ2h0bWxfaW5saW5lJywgJycsIDApO1xuICAgIHRva2VuLmNvbnRlbnQgPSBzdGF0ZS5zcmMuc2xpY2UocG9zLCBwb3MgKyBtYXRjaFswXS5sZW5ndGgpO1xuICB9XG4gIHN0YXRlLnBvcyArPSBtYXRjaFswXS5sZW5ndGg7XG4gIHJldHVybiB0cnVlO1xufTtcbiIsIi8vIFByb2Nlc3MgIVtpbWFnZV0oPHNyYz4gXCJ0aXRsZVwiKVxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBwYXJzZUxpbmtMYWJlbCAgICAgICA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvcGFyc2VfbGlua19sYWJlbCcpO1xudmFyIHBhcnNlTGlua0Rlc3RpbmF0aW9uID0gcmVxdWlyZSgnLi4vaGVscGVycy9wYXJzZV9saW5rX2Rlc3RpbmF0aW9uJyk7XG52YXIgcGFyc2VMaW5rVGl0bGUgICAgICAgPSByZXF1aXJlKCcuLi9oZWxwZXJzL3BhcnNlX2xpbmtfdGl0bGUnKTtcbnZhciBub3JtYWxpemVSZWZlcmVuY2UgICA9IHJlcXVpcmUoJy4uL2NvbW1vbi91dGlscycpLm5vcm1hbGl6ZVJlZmVyZW5jZTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGltYWdlKHN0YXRlLCBzaWxlbnQpIHtcbiAgdmFyIGF0dHJzLFxuICAgICAgY29kZSxcbiAgICAgIGxhYmVsLFxuICAgICAgbGFiZWxFbmQsXG4gICAgICBsYWJlbFN0YXJ0LFxuICAgICAgcG9zLFxuICAgICAgcmVmLFxuICAgICAgcmVzLFxuICAgICAgdGl0bGUsXG4gICAgICB0b2tlbixcbiAgICAgIHRva2VucyxcbiAgICAgIHN0YXJ0LFxuICAgICAgaHJlZiA9ICcnLFxuICAgICAgb2xkUG9zID0gc3RhdGUucG9zLFxuICAgICAgbWF4ID0gc3RhdGUucG9zTWF4O1xuXG4gIGlmIChzdGF0ZS5zcmMuY2hhckNvZGVBdChzdGF0ZS5wb3MpICE9PSAweDIxLyogISAqLykgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKHN0YXRlLnNyYy5jaGFyQ29kZUF0KHN0YXRlLnBvcyArIDEpICE9PSAweDVCLyogWyAqLykgeyByZXR1cm4gZmFsc2U7IH1cblxuICBsYWJlbFN0YXJ0ID0gc3RhdGUucG9zICsgMjtcbiAgbGFiZWxFbmQgPSBwYXJzZUxpbmtMYWJlbChzdGF0ZSwgc3RhdGUucG9zICsgMSwgZmFsc2UpO1xuXG4gIC8vIHBhcnNlciBmYWlsZWQgdG8gZmluZCAnXScsIHNvIGl0J3Mgbm90IGEgdmFsaWQgbGlua1xuICBpZiAobGFiZWxFbmQgPCAwKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIHBvcyA9IGxhYmVsRW5kICsgMTtcbiAgaWYgKHBvcyA8IG1heCAmJiBzdGF0ZS5zcmMuY2hhckNvZGVBdChwb3MpID09PSAweDI4LyogKCAqLykge1xuICAgIC8vXG4gICAgLy8gSW5saW5lIGxpbmtcbiAgICAvL1xuXG4gICAgLy8gW2xpbmtdKCAgPGhyZWY+ICBcInRpdGxlXCIgIClcbiAgICAvLyAgICAgICAgXl4gc2tpcHBpbmcgdGhlc2Ugc3BhY2VzXG4gICAgcG9zKys7XG4gICAgZm9yICg7IHBvcyA8IG1heDsgcG9zKyspIHtcbiAgICAgIGNvZGUgPSBzdGF0ZS5zcmMuY2hhckNvZGVBdChwb3MpO1xuICAgICAgaWYgKGNvZGUgIT09IDB4MjAgJiYgY29kZSAhPT0gMHgwQSkgeyBicmVhazsgfVxuICAgIH1cbiAgICBpZiAocG9zID49IG1heCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgIC8vIFtsaW5rXSggIDxocmVmPiAgXCJ0aXRsZVwiICApXG4gICAgLy8gICAgICAgICAgXl5eXl5eIHBhcnNpbmcgbGluayBkZXN0aW5hdGlvblxuICAgIHN0YXJ0ID0gcG9zO1xuICAgIHJlcyA9IHBhcnNlTGlua0Rlc3RpbmF0aW9uKHN0YXRlLnNyYywgcG9zLCBzdGF0ZS5wb3NNYXgpO1xuICAgIGlmIChyZXMub2spIHtcbiAgICAgIGhyZWYgPSBzdGF0ZS5tZC5ub3JtYWxpemVMaW5rKHJlcy5zdHIpO1xuICAgICAgaWYgKHN0YXRlLm1kLnZhbGlkYXRlTGluayhocmVmKSkge1xuICAgICAgICBwb3MgPSByZXMucG9zO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaHJlZiA9ICcnO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFtsaW5rXSggIDxocmVmPiAgXCJ0aXRsZVwiICApXG4gICAgLy8gICAgICAgICAgICAgICAgXl4gc2tpcHBpbmcgdGhlc2Ugc3BhY2VzXG4gICAgc3RhcnQgPSBwb3M7XG4gICAgZm9yICg7IHBvcyA8IG1heDsgcG9zKyspIHtcbiAgICAgIGNvZGUgPSBzdGF0ZS5zcmMuY2hhckNvZGVBdChwb3MpO1xuICAgICAgaWYgKGNvZGUgIT09IDB4MjAgJiYgY29kZSAhPT0gMHgwQSkgeyBicmVhazsgfVxuICAgIH1cblxuICAgIC8vIFtsaW5rXSggIDxocmVmPiAgXCJ0aXRsZVwiICApXG4gICAgLy8gICAgICAgICAgICAgICAgICBeXl5eXl5eIHBhcnNpbmcgbGluayB0aXRsZVxuICAgIHJlcyA9IHBhcnNlTGlua1RpdGxlKHN0YXRlLnNyYywgcG9zLCBzdGF0ZS5wb3NNYXgpO1xuICAgIGlmIChwb3MgPCBtYXggJiYgc3RhcnQgIT09IHBvcyAmJiByZXMub2spIHtcbiAgICAgIHRpdGxlID0gcmVzLnN0cjtcbiAgICAgIHBvcyA9IHJlcy5wb3M7XG5cbiAgICAgIC8vIFtsaW5rXSggIDxocmVmPiAgXCJ0aXRsZVwiICApXG4gICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBeXiBza2lwcGluZyB0aGVzZSBzcGFjZXNcbiAgICAgIGZvciAoOyBwb3MgPCBtYXg7IHBvcysrKSB7XG4gICAgICAgIGNvZGUgPSBzdGF0ZS5zcmMuY2hhckNvZGVBdChwb3MpO1xuICAgICAgICBpZiAoY29kZSAhPT0gMHgyMCAmJiBjb2RlICE9PSAweDBBKSB7IGJyZWFrOyB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpdGxlID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKHBvcyA+PSBtYXggfHwgc3RhdGUuc3JjLmNoYXJDb2RlQXQocG9zKSAhPT0gMHgyOS8qICkgKi8pIHtcbiAgICAgIHN0YXRlLnBvcyA9IG9sZFBvcztcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcG9zKys7XG4gIH0gZWxzZSB7XG4gICAgLy9cbiAgICAvLyBMaW5rIHJlZmVyZW5jZVxuICAgIC8vXG4gICAgaWYgKHR5cGVvZiBzdGF0ZS5lbnYucmVmZXJlbmNlcyA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAvLyBbZm9vXSAgW2Jhcl1cbiAgICAvLyAgICAgIF5eIG9wdGlvbmFsIHdoaXRlc3BhY2UgKGNhbiBpbmNsdWRlIG5ld2xpbmVzKVxuICAgIGZvciAoOyBwb3MgPCBtYXg7IHBvcysrKSB7XG4gICAgICBjb2RlID0gc3RhdGUuc3JjLmNoYXJDb2RlQXQocG9zKTtcbiAgICAgIGlmIChjb2RlICE9PSAweDIwICYmIGNvZGUgIT09IDB4MEEpIHsgYnJlYWs7IH1cbiAgICB9XG5cbiAgICBpZiAocG9zIDwgbWF4ICYmIHN0YXRlLnNyYy5jaGFyQ29kZUF0KHBvcykgPT09IDB4NUIvKiBbICovKSB7XG4gICAgICBzdGFydCA9IHBvcyArIDE7XG4gICAgICBwb3MgPSBwYXJzZUxpbmtMYWJlbChzdGF0ZSwgcG9zKTtcbiAgICAgIGlmIChwb3MgPj0gMCkge1xuICAgICAgICBsYWJlbCA9IHN0YXRlLnNyYy5zbGljZShzdGFydCwgcG9zKyspO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcG9zID0gbGFiZWxFbmQgKyAxO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwb3MgPSBsYWJlbEVuZCArIDE7XG4gICAgfVxuXG4gICAgLy8gY292ZXJzIGxhYmVsID09PSAnJyBhbmQgbGFiZWwgPT09IHVuZGVmaW5lZFxuICAgIC8vIChjb2xsYXBzZWQgcmVmZXJlbmNlIGxpbmsgYW5kIHNob3J0Y3V0IHJlZmVyZW5jZSBsaW5rIHJlc3BlY3RpdmVseSlcbiAgICBpZiAoIWxhYmVsKSB7IGxhYmVsID0gc3RhdGUuc3JjLnNsaWNlKGxhYmVsU3RhcnQsIGxhYmVsRW5kKTsgfVxuXG4gICAgcmVmID0gc3RhdGUuZW52LnJlZmVyZW5jZXNbbm9ybWFsaXplUmVmZXJlbmNlKGxhYmVsKV07XG4gICAgaWYgKCFyZWYpIHtcbiAgICAgIHN0YXRlLnBvcyA9IG9sZFBvcztcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaHJlZiA9IHJlZi5ocmVmO1xuICAgIHRpdGxlID0gcmVmLnRpdGxlO1xuICB9XG5cbiAgLy9cbiAgLy8gV2UgZm91bmQgdGhlIGVuZCBvZiB0aGUgbGluaywgYW5kIGtub3cgZm9yIGEgZmFjdCBpdCdzIGEgdmFsaWQgbGluaztcbiAgLy8gc28gYWxsIHRoYXQncyBsZWZ0IHRvIGRvIGlzIHRvIGNhbGwgdG9rZW5pemVyLlxuICAvL1xuICBpZiAoIXNpbGVudCkge1xuICAgIHN0YXRlLnBvcyA9IGxhYmVsU3RhcnQ7XG4gICAgc3RhdGUucG9zTWF4ID0gbGFiZWxFbmQ7XG5cbiAgICB2YXIgbmV3U3RhdGUgPSBuZXcgc3RhdGUubWQuaW5saW5lLlN0YXRlKFxuICAgICAgc3RhdGUuc3JjLnNsaWNlKGxhYmVsU3RhcnQsIGxhYmVsRW5kKSxcbiAgICAgIHN0YXRlLm1kLFxuICAgICAgc3RhdGUuZW52LFxuICAgICAgdG9rZW5zID0gW11cbiAgICApO1xuICAgIG5ld1N0YXRlLm1kLmlubGluZS50b2tlbml6ZShuZXdTdGF0ZSk7XG5cbiAgICB0b2tlbiAgICAgICAgICA9IHN0YXRlLnB1c2goJ2ltYWdlJywgJ2ltZycsIDApO1xuICAgIHRva2VuLmF0dHJzICAgID0gYXR0cnMgPSBbIFsgJ3NyYycsIGhyZWYgXSwgWyAnYWx0JywgJycgXSBdO1xuICAgIHRva2VuLmNoaWxkcmVuID0gdG9rZW5zO1xuICAgIGlmICh0aXRsZSkge1xuICAgICAgYXR0cnMucHVzaChbICd0aXRsZScsIHRpdGxlIF0pO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRlLnBvcyA9IHBvcztcbiAgc3RhdGUucG9zTWF4ID0gbWF4O1xuICByZXR1cm4gdHJ1ZTtcbn07XG4iLCIvLyBQcm9jZXNzIFtsaW5rXSg8dG8+IFwic3R1ZmZcIilcblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgcGFyc2VMaW5rTGFiZWwgICAgICAgPSByZXF1aXJlKCcuLi9oZWxwZXJzL3BhcnNlX2xpbmtfbGFiZWwnKTtcbnZhciBwYXJzZUxpbmtEZXN0aW5hdGlvbiA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvcGFyc2VfbGlua19kZXN0aW5hdGlvbicpO1xudmFyIHBhcnNlTGlua1RpdGxlICAgICAgID0gcmVxdWlyZSgnLi4vaGVscGVycy9wYXJzZV9saW5rX3RpdGxlJyk7XG52YXIgbm9ybWFsaXplUmVmZXJlbmNlICAgPSByZXF1aXJlKCcuLi9jb21tb24vdXRpbHMnKS5ub3JtYWxpemVSZWZlcmVuY2U7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsaW5rKHN0YXRlLCBzaWxlbnQpIHtcbiAgdmFyIGF0dHJzLFxuICAgICAgY29kZSxcbiAgICAgIGxhYmVsLFxuICAgICAgbGFiZWxFbmQsXG4gICAgICBsYWJlbFN0YXJ0LFxuICAgICAgcG9zLFxuICAgICAgcmVzLFxuICAgICAgcmVmLFxuICAgICAgdGl0bGUsXG4gICAgICB0b2tlbixcbiAgICAgIGhyZWYgPSAnJyxcbiAgICAgIG9sZFBvcyA9IHN0YXRlLnBvcyxcbiAgICAgIG1heCA9IHN0YXRlLnBvc01heCxcbiAgICAgIHN0YXJ0ID0gc3RhdGUucG9zO1xuXG4gIGlmIChzdGF0ZS5zcmMuY2hhckNvZGVBdChzdGF0ZS5wb3MpICE9PSAweDVCLyogWyAqLykgeyByZXR1cm4gZmFsc2U7IH1cblxuICBsYWJlbFN0YXJ0ID0gc3RhdGUucG9zICsgMTtcbiAgbGFiZWxFbmQgPSBwYXJzZUxpbmtMYWJlbChzdGF0ZSwgc3RhdGUucG9zLCB0cnVlKTtcblxuICAvLyBwYXJzZXIgZmFpbGVkIHRvIGZpbmQgJ10nLCBzbyBpdCdzIG5vdCBhIHZhbGlkIGxpbmtcbiAgaWYgKGxhYmVsRW5kIDwgMCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICBwb3MgPSBsYWJlbEVuZCArIDE7XG4gIGlmIChwb3MgPCBtYXggJiYgc3RhdGUuc3JjLmNoYXJDb2RlQXQocG9zKSA9PT0gMHgyOC8qICggKi8pIHtcbiAgICAvL1xuICAgIC8vIElubGluZSBsaW5rXG4gICAgLy9cblxuICAgIC8vIFtsaW5rXSggIDxocmVmPiAgXCJ0aXRsZVwiICApXG4gICAgLy8gICAgICAgIF5eIHNraXBwaW5nIHRoZXNlIHNwYWNlc1xuICAgIHBvcysrO1xuICAgIGZvciAoOyBwb3MgPCBtYXg7IHBvcysrKSB7XG4gICAgICBjb2RlID0gc3RhdGUuc3JjLmNoYXJDb2RlQXQocG9zKTtcbiAgICAgIGlmIChjb2RlICE9PSAweDIwICYmIGNvZGUgIT09IDB4MEEpIHsgYnJlYWs7IH1cbiAgICB9XG4gICAgaWYgKHBvcyA+PSBtYXgpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICAvLyBbbGlua10oICA8aHJlZj4gIFwidGl0bGVcIiAgKVxuICAgIC8vICAgICAgICAgIF5eXl5eXiBwYXJzaW5nIGxpbmsgZGVzdGluYXRpb25cbiAgICBzdGFydCA9IHBvcztcbiAgICByZXMgPSBwYXJzZUxpbmtEZXN0aW5hdGlvbihzdGF0ZS5zcmMsIHBvcywgc3RhdGUucG9zTWF4KTtcbiAgICBpZiAocmVzLm9rKSB7XG4gICAgICBocmVmID0gc3RhdGUubWQubm9ybWFsaXplTGluayhyZXMuc3RyKTtcbiAgICAgIGlmIChzdGF0ZS5tZC52YWxpZGF0ZUxpbmsoaHJlZikpIHtcbiAgICAgICAgcG9zID0gcmVzLnBvcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhyZWYgPSAnJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBbbGlua10oICA8aHJlZj4gIFwidGl0bGVcIiAgKVxuICAgIC8vICAgICAgICAgICAgICAgIF5eIHNraXBwaW5nIHRoZXNlIHNwYWNlc1xuICAgIHN0YXJ0ID0gcG9zO1xuICAgIGZvciAoOyBwb3MgPCBtYXg7IHBvcysrKSB7XG4gICAgICBjb2RlID0gc3RhdGUuc3JjLmNoYXJDb2RlQXQocG9zKTtcbiAgICAgIGlmIChjb2RlICE9PSAweDIwICYmIGNvZGUgIT09IDB4MEEpIHsgYnJlYWs7IH1cbiAgICB9XG5cbiAgICAvLyBbbGlua10oICA8aHJlZj4gIFwidGl0bGVcIiAgKVxuICAgIC8vICAgICAgICAgICAgICAgICAgXl5eXl5eXiBwYXJzaW5nIGxpbmsgdGl0bGVcbiAgICByZXMgPSBwYXJzZUxpbmtUaXRsZShzdGF0ZS5zcmMsIHBvcywgc3RhdGUucG9zTWF4KTtcbiAgICBpZiAocG9zIDwgbWF4ICYmIHN0YXJ0ICE9PSBwb3MgJiYgcmVzLm9rKSB7XG4gICAgICB0aXRsZSA9IHJlcy5zdHI7XG4gICAgICBwb3MgPSByZXMucG9zO1xuXG4gICAgICAvLyBbbGlua10oICA8aHJlZj4gIFwidGl0bGVcIiAgKVxuICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgXl4gc2tpcHBpbmcgdGhlc2Ugc3BhY2VzXG4gICAgICBmb3IgKDsgcG9zIDwgbWF4OyBwb3MrKykge1xuICAgICAgICBjb2RlID0gc3RhdGUuc3JjLmNoYXJDb2RlQXQocG9zKTtcbiAgICAgICAgaWYgKGNvZGUgIT09IDB4MjAgJiYgY29kZSAhPT0gMHgwQSkgeyBicmVhazsgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aXRsZSA9ICcnO1xuICAgIH1cblxuICAgIGlmIChwb3MgPj0gbWF4IHx8IHN0YXRlLnNyYy5jaGFyQ29kZUF0KHBvcykgIT09IDB4MjkvKiApICovKSB7XG4gICAgICBzdGF0ZS5wb3MgPSBvbGRQb3M7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHBvcysrO1xuICB9IGVsc2Uge1xuICAgIC8vXG4gICAgLy8gTGluayByZWZlcmVuY2VcbiAgICAvL1xuICAgIGlmICh0eXBlb2Ygc3RhdGUuZW52LnJlZmVyZW5jZXMgPT09ICd1bmRlZmluZWQnKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgLy8gW2Zvb10gIFtiYXJdXG4gICAgLy8gICAgICBeXiBvcHRpb25hbCB3aGl0ZXNwYWNlIChjYW4gaW5jbHVkZSBuZXdsaW5lcylcbiAgICBmb3IgKDsgcG9zIDwgbWF4OyBwb3MrKykge1xuICAgICAgY29kZSA9IHN0YXRlLnNyYy5jaGFyQ29kZUF0KHBvcyk7XG4gICAgICBpZiAoY29kZSAhPT0gMHgyMCAmJiBjb2RlICE9PSAweDBBKSB7IGJyZWFrOyB9XG4gICAgfVxuXG4gICAgaWYgKHBvcyA8IG1heCAmJiBzdGF0ZS5zcmMuY2hhckNvZGVBdChwb3MpID09PSAweDVCLyogWyAqLykge1xuICAgICAgc3RhcnQgPSBwb3MgKyAxO1xuICAgICAgcG9zID0gcGFyc2VMaW5rTGFiZWwoc3RhdGUsIHBvcyk7XG4gICAgICBpZiAocG9zID49IDApIHtcbiAgICAgICAgbGFiZWwgPSBzdGF0ZS5zcmMuc2xpY2Uoc3RhcnQsIHBvcysrKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBvcyA9IGxhYmVsRW5kICsgMTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcG9zID0gbGFiZWxFbmQgKyAxO1xuICAgIH1cblxuICAgIC8vIGNvdmVycyBsYWJlbCA9PT0gJycgYW5kIGxhYmVsID09PSB1bmRlZmluZWRcbiAgICAvLyAoY29sbGFwc2VkIHJlZmVyZW5jZSBsaW5rIGFuZCBzaG9ydGN1dCByZWZlcmVuY2UgbGluayByZXNwZWN0aXZlbHkpXG4gICAgaWYgKCFsYWJlbCkgeyBsYWJlbCA9IHN0YXRlLnNyYy5zbGljZShsYWJlbFN0YXJ0LCBsYWJlbEVuZCk7IH1cblxuICAgIHJlZiA9IHN0YXRlLmVudi5yZWZlcmVuY2VzW25vcm1hbGl6ZVJlZmVyZW5jZShsYWJlbCldO1xuICAgIGlmICghcmVmKSB7XG4gICAgICBzdGF0ZS5wb3MgPSBvbGRQb3M7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGhyZWYgPSByZWYuaHJlZjtcbiAgICB0aXRsZSA9IHJlZi50aXRsZTtcbiAgfVxuXG4gIC8vXG4gIC8vIFdlIGZvdW5kIHRoZSBlbmQgb2YgdGhlIGxpbmssIGFuZCBrbm93IGZvciBhIGZhY3QgaXQncyBhIHZhbGlkIGxpbms7XG4gIC8vIHNvIGFsbCB0aGF0J3MgbGVmdCB0byBkbyBpcyB0byBjYWxsIHRva2VuaXplci5cbiAgLy9cbiAgaWYgKCFzaWxlbnQpIHtcbiAgICBzdGF0ZS5wb3MgPSBsYWJlbFN0YXJ0O1xuICAgIHN0YXRlLnBvc01heCA9IGxhYmVsRW5kO1xuXG4gICAgdG9rZW4gICAgICAgID0gc3RhdGUucHVzaCgnbGlua19vcGVuJywgJ2EnLCAxKTtcbiAgICB0b2tlbi5hdHRycyAgPSBhdHRycyA9IFsgWyAnaHJlZicsIGhyZWYgXSBdO1xuICAgIGlmICh0aXRsZSkge1xuICAgICAgYXR0cnMucHVzaChbICd0aXRsZScsIHRpdGxlIF0pO1xuICAgIH1cblxuICAgIHN0YXRlLm1kLmlubGluZS50b2tlbml6ZShzdGF0ZSk7XG5cbiAgICB0b2tlbiAgICAgICAgPSBzdGF0ZS5wdXNoKCdsaW5rX2Nsb3NlJywgJ2EnLCAtMSk7XG4gIH1cblxuICBzdGF0ZS5wb3MgPSBwb3M7XG4gIHN0YXRlLnBvc01heCA9IG1heDtcbiAgcmV0dXJuIHRydWU7XG59O1xuIiwiLy8gUHJvY2Vlc3MgJ1xcbidcblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5ld2xpbmUoc3RhdGUsIHNpbGVudCkge1xuICB2YXIgcG1heCwgbWF4LCBwb3MgPSBzdGF0ZS5wb3M7XG5cbiAgaWYgKHN0YXRlLnNyYy5jaGFyQ29kZUF0KHBvcykgIT09IDB4MEEvKiBcXG4gKi8pIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgcG1heCA9IHN0YXRlLnBlbmRpbmcubGVuZ3RoIC0gMTtcbiAgbWF4ID0gc3RhdGUucG9zTWF4O1xuXG4gIC8vICcgIFxcbicgLT4gaGFyZGJyZWFrXG4gIC8vIExvb2t1cCBpbiBwZW5kaW5nIGNoYXJzIGlzIGJhZCBwcmFjdGljZSEgRG9uJ3QgY29weSB0byBvdGhlciBydWxlcyFcbiAgLy8gUGVuZGluZyBzdHJpbmcgaXMgc3RvcmVkIGluIGNvbmNhdCBtb2RlLCBpbmRleGVkIGxvb2t1cHMgd2lsbCBjYXVzZVxuICAvLyBjb252ZXJ0aW9uIHRvIGZsYXQgbW9kZS5cbiAgaWYgKCFzaWxlbnQpIHtcbiAgICBpZiAocG1heCA+PSAwICYmIHN0YXRlLnBlbmRpbmcuY2hhckNvZGVBdChwbWF4KSA9PT0gMHgyMCkge1xuICAgICAgaWYgKHBtYXggPj0gMSAmJiBzdGF0ZS5wZW5kaW5nLmNoYXJDb2RlQXQocG1heCAtIDEpID09PSAweDIwKSB7XG4gICAgICAgIHN0YXRlLnBlbmRpbmcgPSBzdGF0ZS5wZW5kaW5nLnJlcGxhY2UoLyArJC8sICcnKTtcbiAgICAgICAgc3RhdGUucHVzaCgnaGFyZGJyZWFrJywgJ2JyJywgMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0ZS5wZW5kaW5nID0gc3RhdGUucGVuZGluZy5zbGljZSgwLCAtMSk7XG4gICAgICAgIHN0YXRlLnB1c2goJ3NvZnRicmVhaycsICdicicsIDApO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlLnB1c2goJ3NvZnRicmVhaycsICdicicsIDApO1xuICAgIH1cbiAgfVxuXG4gIHBvcysrO1xuXG4gIC8vIHNraXAgaGVhZGluZyBzcGFjZXMgZm9yIG5leHQgbGluZVxuICB3aGlsZSAocG9zIDwgbWF4ICYmIHN0YXRlLnNyYy5jaGFyQ29kZUF0KHBvcykgPT09IDB4MjApIHsgcG9zKys7IH1cblxuICBzdGF0ZS5wb3MgPSBwb3M7XG4gIHJldHVybiB0cnVlO1xufTtcbiIsIi8vIElubGluZSBwYXJzZXIgc3RhdGVcblxuJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciBUb2tlbiA9IHJlcXVpcmUoJy4uL3Rva2VuJyk7XG5cbmZ1bmN0aW9uIFN0YXRlSW5saW5lKHNyYywgbWQsIGVudiwgb3V0VG9rZW5zKSB7XG4gIHRoaXMuc3JjID0gc3JjO1xuICB0aGlzLmVudiA9IGVudjtcbiAgdGhpcy5tZCA9IG1kO1xuICB0aGlzLnRva2VucyA9IG91dFRva2VucztcblxuICB0aGlzLnBvcyA9IDA7XG4gIHRoaXMucG9zTWF4ID0gdGhpcy5zcmMubGVuZ3RoO1xuICB0aGlzLmxldmVsID0gMDtcbiAgdGhpcy5wZW5kaW5nID0gJyc7XG4gIHRoaXMucGVuZGluZ0xldmVsID0gMDtcblxuICB0aGlzLmNhY2hlID0ge307ICAgICAgICAvLyBTdG9yZXMgeyBzdGFydDogZW5kIH0gcGFpcnMuIFVzZWZ1bCBmb3IgYmFja3RyYWNrXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9wdGltaXphdGlvbiBvZiBwYWlycyBwYXJzZSAoZW1waGFzaXMsIHN0cmlrZXMpLlxufVxuXG5cbi8vIEZsdXNoIHBlbmRpbmcgdGV4dFxuLy9cblN0YXRlSW5saW5lLnByb3RvdHlwZS5wdXNoUGVuZGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRva2VuID0gbmV3IFRva2VuKCd0ZXh0JywgJycsIDApO1xuICB0b2tlbi5jb250ZW50ID0gdGhpcy5wZW5kaW5nO1xuICB0b2tlbi5sZXZlbCA9IHRoaXMucGVuZGluZ0xldmVsO1xuICB0aGlzLnRva2Vucy5wdXNoKHRva2VuKTtcbiAgdGhpcy5wZW5kaW5nID0gJyc7XG4gIHJldHVybiB0b2tlbjtcbn07XG5cblxuLy8gUHVzaCBuZXcgdG9rZW4gdG8gXCJzdHJlYW1cIi5cbi8vIElmIHBlbmRpbmcgdGV4dCBleGlzdHMgLSBmbHVzaCBpdCBhcyB0ZXh0IHRva2VuXG4vL1xuU3RhdGVJbmxpbmUucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAodHlwZSwgdGFnLCBuZXN0aW5nKSB7XG4gIGlmICh0aGlzLnBlbmRpbmcpIHtcbiAgICB0aGlzLnB1c2hQZW5kaW5nKCk7XG4gIH1cblxuICB2YXIgdG9rZW4gPSBuZXcgVG9rZW4odHlwZSwgdGFnLCBuZXN0aW5nKTtcblxuICBpZiAobmVzdGluZyA8IDApIHsgdGhpcy5sZXZlbC0tOyB9XG4gIHRva2VuLmxldmVsID0gdGhpcy5sZXZlbDtcbiAgaWYgKG5lc3RpbmcgPiAwKSB7IHRoaXMubGV2ZWwrKzsgfVxuXG4gIHRoaXMucGVuZGluZ0xldmVsID0gdGhpcy5sZXZlbDtcbiAgdGhpcy50b2tlbnMucHVzaCh0b2tlbik7XG4gIHJldHVybiB0b2tlbjtcbn07XG5cbi8vIHJlLWV4cG9ydCBUb2tlbiBjbGFzcyB0byB1c2UgaW4gYmxvY2sgcnVsZXNcblN0YXRlSW5saW5lLnByb3RvdHlwZS5Ub2tlbiA9IFRva2VuO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gU3RhdGVJbmxpbmU7XG4iLCIvLyB+fnN0cmlrZSB0aHJvdWdofn5cbi8vXG4ndXNlIHN0cmljdCc7XG5cblxudmFyIGlzV2hpdGVTcGFjZSAgID0gcmVxdWlyZSgnLi4vY29tbW9uL3V0aWxzJykuaXNXaGl0ZVNwYWNlO1xudmFyIGlzUHVuY3RDaGFyICAgID0gcmVxdWlyZSgnLi4vY29tbW9uL3V0aWxzJykuaXNQdW5jdENoYXI7XG52YXIgaXNNZEFzY2lpUHVuY3QgPSByZXF1aXJlKCcuLi9jb21tb24vdXRpbHMnKS5pc01kQXNjaWlQdW5jdDtcblxuXG4vLyBwYXJzZSBzZXF1ZW5jZSBvZiBtYXJrZXJzLFxuLy8gXCJzdGFydFwiIHNob3VsZCBwb2ludCBhdCBhIHZhbGlkIG1hcmtlclxuZnVuY3Rpb24gc2NhbkRlbGltcyhzdGF0ZSwgc3RhcnQpIHtcbiAgdmFyIHBvcyA9IHN0YXJ0LCBsYXN0Q2hhciwgbmV4dENoYXIsIGNvdW50LFxuICAgICAgaXNMYXN0V2hpdGVTcGFjZSwgaXNMYXN0UHVuY3RDaGFyLFxuICAgICAgaXNOZXh0V2hpdGVTcGFjZSwgaXNOZXh0UHVuY3RDaGFyLFxuICAgICAgY2FuX29wZW4gPSB0cnVlLFxuICAgICAgY2FuX2Nsb3NlID0gdHJ1ZSxcbiAgICAgIG1heCA9IHN0YXRlLnBvc01heCxcbiAgICAgIG1hcmtlciA9IHN0YXRlLnNyYy5jaGFyQ29kZUF0KHN0YXJ0KTtcblxuICAvLyB0cmVhdCBiZWdpbm5pbmcgb2YgdGhlIGxpbmUgYXMgYSB3aGl0ZXNwYWNlXG4gIGxhc3RDaGFyID0gc3RhcnQgPiAwID8gc3RhdGUuc3JjLmNoYXJDb2RlQXQoc3RhcnQgLSAxKSA6IDB4MjA7XG5cbiAgd2hpbGUgKHBvcyA8IG1heCAmJiBzdGF0ZS5zcmMuY2hhckNvZGVBdChwb3MpID09PSBtYXJrZXIpIHsgcG9zKys7IH1cblxuICBpZiAocG9zID49IG1heCkge1xuICAgIGNhbl9vcGVuID0gZmFsc2U7XG4gIH1cblxuICBjb3VudCA9IHBvcyAtIHN0YXJ0O1xuXG4gIC8vIHRyZWF0IGVuZCBvZiB0aGUgbGluZSBhcyBhIHdoaXRlc3BhY2VcbiAgbmV4dENoYXIgPSBwb3MgPCBtYXggPyBzdGF0ZS5zcmMuY2hhckNvZGVBdChwb3MpIDogMHgyMDtcblxuICBpc0xhc3RQdW5jdENoYXIgPSBpc01kQXNjaWlQdW5jdChsYXN0Q2hhcikgfHwgaXNQdW5jdENoYXIoU3RyaW5nLmZyb21DaGFyQ29kZShsYXN0Q2hhcikpO1xuICBpc05leHRQdW5jdENoYXIgPSBpc01kQXNjaWlQdW5jdChuZXh0Q2hhcikgfHwgaXNQdW5jdENoYXIoU3RyaW5nLmZyb21DaGFyQ29kZShuZXh0Q2hhcikpO1xuXG4gIGlzTGFzdFdoaXRlU3BhY2UgPSBpc1doaXRlU3BhY2UobGFzdENoYXIpO1xuICBpc05leHRXaGl0ZVNwYWNlID0gaXNXaGl0ZVNwYWNlKG5leHRDaGFyKTtcblxuICBpZiAoaXNOZXh0V2hpdGVTcGFjZSkge1xuICAgIGNhbl9vcGVuID0gZmFsc2U7XG4gIH0gZWxzZSBpZiAoaXNOZXh0UHVuY3RDaGFyKSB7XG4gICAgaWYgKCEoaXNMYXN0V2hpdGVTcGFjZSB8fCBpc0xhc3RQdW5jdENoYXIpKSB7XG4gICAgICBjYW5fb3BlbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGlmIChpc0xhc3RXaGl0ZVNwYWNlKSB7XG4gICAgY2FuX2Nsb3NlID0gZmFsc2U7XG4gIH0gZWxzZSBpZiAoaXNMYXN0UHVuY3RDaGFyKSB7XG4gICAgaWYgKCEoaXNOZXh0V2hpdGVTcGFjZSB8fCBpc05leHRQdW5jdENoYXIpKSB7XG4gICAgICBjYW5fY2xvc2UgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNhbl9vcGVuOiBjYW5fb3BlbixcbiAgICBjYW5fY2xvc2U6IGNhbl9jbG9zZSxcbiAgICBkZWxpbXM6IGNvdW50XG4gIH07XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdHJpa2V0aHJvdWdoKHN0YXRlLCBzaWxlbnQpIHtcbiAgdmFyIHN0YXJ0Q291bnQsXG4gICAgICBjb3VudCxcbiAgICAgIHRhZ0NvdW50LFxuICAgICAgZm91bmQsXG4gICAgICBzdGFjayxcbiAgICAgIHJlcyxcbiAgICAgIHRva2VuLFxuICAgICAgbWF4ID0gc3RhdGUucG9zTWF4LFxuICAgICAgc3RhcnQgPSBzdGF0ZS5wb3MsXG4gICAgICBtYXJrZXIgPSBzdGF0ZS5zcmMuY2hhckNvZGVBdChzdGFydCk7XG5cbiAgaWYgKG1hcmtlciAhPT0gMHg3RS8qIH4gKi8pIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmIChzaWxlbnQpIHsgcmV0dXJuIGZhbHNlOyB9IC8vIGRvbid0IHJ1biBhbnkgcGFpcnMgaW4gdmFsaWRhdGlvbiBtb2RlXG5cbiAgcmVzID0gc2NhbkRlbGltcyhzdGF0ZSwgc3RhcnQpO1xuICBzdGFydENvdW50ID0gcmVzLmRlbGltcztcbiAgaWYgKCFyZXMuY2FuX29wZW4pIHtcbiAgICBzdGF0ZS5wb3MgKz0gc3RhcnRDb3VudDtcbiAgICAvLyBFYXJsaWVyIHdlIGNoZWNrZWQgIXNpbGVudCwgYnV0IHRoaXMgaW1wbGVtZW50YXRpb24gZG9lcyBub3QgbmVlZCBpdFxuICAgIHN0YXRlLnBlbmRpbmcgKz0gc3RhdGUuc3JjLnNsaWNlKHN0YXJ0LCBzdGF0ZS5wb3MpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3RhY2sgPSBNYXRoLmZsb29yKHN0YXJ0Q291bnQgLyAyKTtcbiAgaWYgKHN0YWNrIDw9IDApIHsgcmV0dXJuIGZhbHNlOyB9XG4gIHN0YXRlLnBvcyA9IHN0YXJ0ICsgc3RhcnRDb3VudDtcblxuICB3aGlsZSAoc3RhdGUucG9zIDwgbWF4KSB7XG4gICAgaWYgKHN0YXRlLnNyYy5jaGFyQ29kZUF0KHN0YXRlLnBvcykgPT09IG1hcmtlcikge1xuICAgICAgcmVzID0gc2NhbkRlbGltcyhzdGF0ZSwgc3RhdGUucG9zKTtcbiAgICAgIGNvdW50ID0gcmVzLmRlbGltcztcbiAgICAgIHRhZ0NvdW50ID0gTWF0aC5mbG9vcihjb3VudCAvIDIpO1xuICAgICAgaWYgKHJlcy5jYW5fY2xvc2UpIHtcbiAgICAgICAgaWYgKHRhZ0NvdW50ID49IHN0YWNrKSB7XG4gICAgICAgICAgc3RhdGUucG9zICs9IGNvdW50IC0gMjtcbiAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgc3RhY2sgLT0gdGFnQ291bnQ7XG4gICAgICAgIHN0YXRlLnBvcyArPSBjb3VudDtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXMuY2FuX29wZW4pIHsgc3RhY2sgKz0gdGFnQ291bnQ7IH1cbiAgICAgIHN0YXRlLnBvcyArPSBjb3VudDtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHN0YXRlLm1kLmlubGluZS5za2lwVG9rZW4oc3RhdGUpO1xuICB9XG5cbiAgaWYgKCFmb3VuZCkge1xuICAgIC8vIHBhcnNlciBmYWlsZWQgdG8gZmluZCBlbmRpbmcgdGFnLCBzbyBpdCdzIG5vdCB2YWxpZCBlbXBoYXNpc1xuICAgIHN0YXRlLnBvcyA9IHN0YXJ0O1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIGZvdW5kIVxuICBzdGF0ZS5wb3NNYXggPSBzdGF0ZS5wb3M7XG4gIHN0YXRlLnBvcyA9IHN0YXJ0ICsgMjtcblxuICAvLyBFYXJsaWVyIHdlIGNoZWNrZWQgIXNpbGVudCwgYnV0IHRoaXMgaW1wbGVtZW50YXRpb24gZG9lcyBub3QgbmVlZCBpdFxuICB0b2tlbiAgICAgICAgPSBzdGF0ZS5wdXNoKCdzX29wZW4nLCAncycsIDEpO1xuICB0b2tlbi5tYXJrdXAgPSAnfn4nO1xuXG4gIHN0YXRlLm1kLmlubGluZS50b2tlbml6ZShzdGF0ZSk7XG5cbiAgdG9rZW4gICAgICAgID0gc3RhdGUucHVzaCgnc19jbG9zZScsICdzJywgLTEpO1xuICB0b2tlbi5tYXJrdXAgPSAnfn4nO1xuXG4gIHN0YXRlLnBvcyA9IHN0YXRlLnBvc01heCArIDI7XG4gIHN0YXRlLnBvc01heCA9IG1heDtcbiAgcmV0dXJuIHRydWU7XG59O1xuIiwiLy8gU2tpcCB0ZXh0IGNoYXJhY3RlcnMgZm9yIHRleHQgdG9rZW4sIHBsYWNlIHRob3NlIHRvIHBlbmRpbmcgYnVmZmVyXG4vLyBhbmQgaW5jcmVtZW50IGN1cnJlbnQgcG9zXG5cbid1c2Ugc3RyaWN0JztcblxuXG4vLyBSdWxlIHRvIHNraXAgcHVyZSB0ZXh0XG4vLyAne30kJUB+Kz06JyByZXNlcnZlZCBmb3IgZXh0ZW50aW9uc1xuXG4vLyAhLCBcIiwgIywgJCwgJSwgJiwgJywgKCwgKSwgKiwgKywgLCwgLSwgLiwgLywgOiwgOywgPCwgPSwgPiwgPywgQCwgWywgXFwsIF0sIF4sIF8sIGAsIHssIHwsIH0sIG9yIH5cblxuLy8gISEhISBEb24ndCBjb25mdXNlIHdpdGggXCJNYXJrZG93biBBU0NJSSBQdW5jdHVhdGlvblwiIGNoYXJzXG4vLyBodHRwOi8vc3BlYy5jb21tb25tYXJrLm9yZy8wLjE1LyNhc2NpaS1wdW5jdHVhdGlvbi1jaGFyYWN0ZXJcbmZ1bmN0aW9uIGlzVGVybWluYXRvckNoYXIoY2gpIHtcbiAgc3dpdGNoIChjaCkge1xuICAgIGNhc2UgMHgwQS8qIFxcbiAqLzpcbiAgICBjYXNlIDB4MjEvKiAhICovOlxuICAgIGNhc2UgMHgyMy8qICMgKi86XG4gICAgY2FzZSAweDI0LyogJCAqLzpcbiAgICBjYXNlIDB4MjUvKiAlICovOlxuICAgIGNhc2UgMHgyNi8qICYgKi86XG4gICAgY2FzZSAweDJBLyogKiAqLzpcbiAgICBjYXNlIDB4MkIvKiArICovOlxuICAgIGNhc2UgMHgyRC8qIC0gKi86XG4gICAgY2FzZSAweDNBLyogOiAqLzpcbiAgICBjYXNlIDB4M0MvKiA8ICovOlxuICAgIGNhc2UgMHgzRC8qID0gKi86XG4gICAgY2FzZSAweDNFLyogPiAqLzpcbiAgICBjYXNlIDB4NDAvKiBAICovOlxuICAgIGNhc2UgMHg1Qi8qIFsgKi86XG4gICAgY2FzZSAweDVDLyogXFwgKi86XG4gICAgY2FzZSAweDVELyogXSAqLzpcbiAgICBjYXNlIDB4NUUvKiBeICovOlxuICAgIGNhc2UgMHg1Ri8qIF8gKi86XG4gICAgY2FzZSAweDYwLyogYCAqLzpcbiAgICBjYXNlIDB4N0IvKiB7ICovOlxuICAgIGNhc2UgMHg3RC8qIH0gKi86XG4gICAgY2FzZSAweDdFLyogfiAqLzpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZXh0KHN0YXRlLCBzaWxlbnQpIHtcbiAgdmFyIHBvcyA9IHN0YXRlLnBvcztcblxuICB3aGlsZSAocG9zIDwgc3RhdGUucG9zTWF4ICYmICFpc1Rlcm1pbmF0b3JDaGFyKHN0YXRlLnNyYy5jaGFyQ29kZUF0KHBvcykpKSB7XG4gICAgcG9zKys7XG4gIH1cblxuICBpZiAocG9zID09PSBzdGF0ZS5wb3MpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgaWYgKCFzaWxlbnQpIHsgc3RhdGUucGVuZGluZyArPSBzdGF0ZS5zcmMuc2xpY2Uoc3RhdGUucG9zLCBwb3MpOyB9XG5cbiAgc3RhdGUucG9zID0gcG9zO1xuXG4gIHJldHVybiB0cnVlO1xufTtcblxuLy8gQWx0ZXJuYXRpdmUgaW1wbGVtZW50YXRpb24sIGZvciBtZW1vcnkuXG4vL1xuLy8gSXQgY29zdHMgMTAlIG9mIHBlcmZvcm1hbmNlLCBidXQgYWxsb3dzIGV4dGVuZCB0ZXJtaW5hdG9ycyBsaXN0LCBpZiBwbGFjZSBpdFxuLy8gdG8gYFBhcmNlcklubGluZWAgcHJvcGVydHkuIFByb2JhYmx5LCB3aWxsIHN3aXRjaCB0byBpdCBzb21ldGltZSwgc3VjaFxuLy8gZmxleGliaWxpdHkgcmVxdWlyZWQuXG5cbi8qXG52YXIgVEVSTUlOQVRPUl9SRSA9IC9bXFxuISMkJSYqK1xcLTo8PT5AW1xcXFxcXF1eX2B7fX5dLztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZXh0KHN0YXRlLCBzaWxlbnQpIHtcbiAgdmFyIHBvcyA9IHN0YXRlLnBvcyxcbiAgICAgIGlkeCA9IHN0YXRlLnNyYy5zbGljZShwb3MpLnNlYXJjaChURVJNSU5BVE9SX1JFKTtcblxuICAvLyBmaXJzdCBjaGFyIGlzIHRlcm1pbmF0b3IgLT4gZW1wdHkgdGV4dFxuICBpZiAoaWR4ID09PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIC8vIG5vIHRlcm1pbmF0b3IgLT4gdGV4dCB0aWxsIGVuZCBvZiBzdHJpbmdcbiAgaWYgKGlkeCA8IDApIHtcbiAgICBpZiAoIXNpbGVudCkgeyBzdGF0ZS5wZW5kaW5nICs9IHN0YXRlLnNyYy5zbGljZShwb3MpOyB9XG4gICAgc3RhdGUucG9zID0gc3RhdGUuc3JjLmxlbmd0aDtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmICghc2lsZW50KSB7IHN0YXRlLnBlbmRpbmcgKz0gc3RhdGUuc3JjLnNsaWNlKHBvcywgcG9zICsgaWR4KTsgfVxuXG4gIHN0YXRlLnBvcyArPSBpZHg7XG5cbiAgcmV0dXJuIHRydWU7XG59OyovXG4iLCIvLyBUb2tlbiBjbGFzc1xuXG4ndXNlIHN0cmljdCc7XG5cblxuLyoqXG4gKiBjbGFzcyBUb2tlblxuICoqL1xuXG4vKipcbiAqIG5ldyBUb2tlbih0eXBlLCB0YWcsIG5lc3RpbmcpXG4gKlxuICogQ3JlYXRlIG5ldyB0b2tlbiBhbmQgZmlsbCBwYXNzZWQgcHJvcGVydGllcy5cbiAqKi9cbmZ1bmN0aW9uIFRva2VuKHR5cGUsIHRhZywgbmVzdGluZykge1xuICAvKipcbiAgICogVG9rZW4jdHlwZSAtPiBTdHJpbmdcbiAgICpcbiAgICogVHlwZSBvZiB0aGUgdG9rZW4gKHN0cmluZywgZS5nLiBcInBhcmFncmFwaF9vcGVuXCIpXG4gICAqKi9cbiAgdGhpcy50eXBlICAgICA9IHR5cGU7XG5cbiAgLyoqXG4gICAqIFRva2VuI3RhZyAtPiBTdHJpbmdcbiAgICpcbiAgICogaHRtbCB0YWcgbmFtZSwgZS5nLiBcInBcIlxuICAgKiovXG4gIHRoaXMudGFnICAgICAgPSB0YWc7XG5cbiAgLyoqXG4gICAqIFRva2VuI2F0dHJzIC0+IEFycmF5XG4gICAqXG4gICAqIEh0bWwgYXR0cmlidXRlcy4gRm9ybWF0OiBgWyBbIG5hbWUxLCB2YWx1ZTEgXSwgWyBuYW1lMiwgdmFsdWUyIF0gXWBcbiAgICoqL1xuICB0aGlzLmF0dHJzICAgID0gbnVsbDtcblxuICAvKipcbiAgICogVG9rZW4jbWFwIC0+IEFycmF5XG4gICAqXG4gICAqIFNvdXJjZSBtYXAgaW5mby4gRm9ybWF0OiBgWyBsaW5lX2JlZ2luLCBsaW5lX2VuZCBdYFxuICAgKiovXG4gIHRoaXMubWFwICAgICAgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBUb2tlbiNuZXN0aW5nIC0+IE51bWJlclxuICAgKlxuICAgKiBMZXZlbCBjaGFuZ2UgKG51bWJlciBpbiB7LTEsIDAsIDF9IHNldCksIHdoZXJlOlxuICAgKlxuICAgKiAtICBgMWAgbWVhbnMgdGhlIHRhZyBpcyBvcGVuaW5nXG4gICAqIC0gIGAwYCBtZWFucyB0aGUgdGFnIGlzIHNlbGYtY2xvc2luZ1xuICAgKiAtIGAtMWAgbWVhbnMgdGhlIHRhZyBpcyBjbG9zaW5nXG4gICAqKi9cbiAgdGhpcy5uZXN0aW5nICA9IG5lc3Rpbmc7XG5cbiAgLyoqXG4gICAqIFRva2VuI2xldmVsIC0+IE51bWJlclxuICAgKlxuICAgKiBuZXN0aW5nIGxldmVsLCB0aGUgc2FtZSBhcyBgc3RhdGUubGV2ZWxgXG4gICAqKi9cbiAgdGhpcy5sZXZlbCAgICA9IDA7XG5cbiAgLyoqXG4gICAqIFRva2VuI2NoaWxkcmVuIC0+IEFycmF5XG4gICAqXG4gICAqIEFuIGFycmF5IG9mIGNoaWxkIG5vZGVzIChpbmxpbmUgYW5kIGltZyB0b2tlbnMpXG4gICAqKi9cbiAgdGhpcy5jaGlsZHJlbiA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFRva2VuI2NvbnRlbnQgLT4gU3RyaW5nXG4gICAqXG4gICAqIEluIGEgY2FzZSBvZiBzZWxmLWNsb3NpbmcgdGFnIChjb2RlLCBodG1sLCBmZW5jZSwgZXRjLiksXG4gICAqIGl0IGhhcyBjb250ZW50cyBvZiB0aGlzIHRhZy5cbiAgICoqL1xuICB0aGlzLmNvbnRlbnQgID0gJyc7XG5cbiAgLyoqXG4gICAqIFRva2VuI21hcmt1cCAtPiBTdHJpbmdcbiAgICpcbiAgICogJyonIG9yICdfJyBmb3IgZW1waGFzaXMsIGZlbmNlIHN0cmluZyBmb3IgZmVuY2UsIGV0Yy5cbiAgICoqL1xuICB0aGlzLm1hcmt1cCAgID0gJyc7XG5cbiAgLyoqXG4gICAqIFRva2VuI2luZm8gLT4gU3RyaW5nXG4gICAqXG4gICAqIGZlbmNlIGluZm9zdHJpbmdcbiAgICoqL1xuICB0aGlzLmluZm8gICAgID0gJyc7XG5cbiAgLyoqXG4gICAqIFRva2VuI21ldGEgLT4gT2JqZWN0XG4gICAqXG4gICAqIEEgcGxhY2UgZm9yIHBsdWdpbnMgdG8gc3RvcmUgYW4gYXJiaXRyYXJ5IGRhdGFcbiAgICoqL1xuICB0aGlzLm1ldGEgICAgID0gbnVsbDtcblxuICAvKipcbiAgICogVG9rZW4jYmxvY2sgLT4gQm9vbGVhblxuICAgKlxuICAgKiBUcnVlIGZvciBibG9jay1sZXZlbCB0b2tlbnMsIGZhbHNlIGZvciBpbmxpbmUgdG9rZW5zLlxuICAgKiBVc2VkIGluIHJlbmRlcmVyIHRvIGNhbGN1bGF0ZSBsaW5lIGJyZWFrc1xuICAgKiovXG4gIHRoaXMuYmxvY2sgICAgPSBmYWxzZTtcblxuICAvKipcbiAgICogVG9rZW4jaGlkZGVuIC0+IEJvb2xlYW5cbiAgICpcbiAgICogSWYgaXQncyB0cnVlLCBpZ25vcmUgdGhpcyBlbGVtZW50IHdoZW4gcmVuZGVyaW5nLiBVc2VkIGZvciB0aWdodCBsaXN0c1xuICAgKiB0byBoaWRlIHBhcmFncmFwaHMuXG4gICAqKi9cbiAgdGhpcy5oaWRkZW4gICA9IGZhbHNlO1xufVxuXG5cbi8qKlxuICogVG9rZW4uYXR0ckluZGV4KG5hbWUpIC0+IE51bWJlclxuICpcbiAqIFNlYXJjaCBhdHRyaWJ1dGUgaW5kZXggYnkgbmFtZS5cbiAqKi9cblRva2VuLnByb3RvdHlwZS5hdHRySW5kZXggPSBmdW5jdGlvbiBhdHRySW5kZXgobmFtZSkge1xuICB2YXIgYXR0cnMsIGksIGxlbjtcblxuICBpZiAoIXRoaXMuYXR0cnMpIHsgcmV0dXJuIC0xOyB9XG5cbiAgYXR0cnMgPSB0aGlzLmF0dHJzO1xuXG4gIGZvciAoaSA9IDAsIGxlbiA9IGF0dHJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGF0dHJzW2ldWzBdID09PSBuYW1lKSB7IHJldHVybiBpOyB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcblxuXG4vKipcbiAqIFRva2VuLmF0dHJQdXNoKGF0dHJEYXRhKVxuICpcbiAqIEFkZCBgWyBuYW1lLCB2YWx1ZSBdYCBhdHRyaWJ1dGUgdG8gbGlzdC4gSW5pdCBhdHRycyBpZiBuZWNlc3NhcnlcbiAqKi9cblRva2VuLnByb3RvdHlwZS5hdHRyUHVzaCA9IGZ1bmN0aW9uIGF0dHJQdXNoKGF0dHJEYXRhKSB7XG4gIGlmICh0aGlzLmF0dHJzKSB7XG4gICAgdGhpcy5hdHRycy5wdXNoKGF0dHJEYXRhKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmF0dHJzID0gWyBhdHRyRGF0YSBdO1xuICB9XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gVG9rZW47XG4iLCJtb2R1bGUuZXhwb3J0cz17XCJBYWN1dGVcIjpcIlxcdTAwQzFcIixcImFhY3V0ZVwiOlwiXFx1MDBFMVwiLFwiQWJyZXZlXCI6XCJcXHUwMTAyXCIsXCJhYnJldmVcIjpcIlxcdTAxMDNcIixcImFjXCI6XCJcXHUyMjNFXCIsXCJhY2RcIjpcIlxcdTIyM0ZcIixcImFjRVwiOlwiXFx1MjIzRVxcdTAzMzNcIixcIkFjaXJjXCI6XCJcXHUwMEMyXCIsXCJhY2lyY1wiOlwiXFx1MDBFMlwiLFwiYWN1dGVcIjpcIlxcdTAwQjRcIixcIkFjeVwiOlwiXFx1MDQxMFwiLFwiYWN5XCI6XCJcXHUwNDMwXCIsXCJBRWxpZ1wiOlwiXFx1MDBDNlwiLFwiYWVsaWdcIjpcIlxcdTAwRTZcIixcImFmXCI6XCJcXHUyMDYxXCIsXCJBZnJcIjpcIlxcdUQ4MzVcXHVERDA0XCIsXCJhZnJcIjpcIlxcdUQ4MzVcXHVERDFFXCIsXCJBZ3JhdmVcIjpcIlxcdTAwQzBcIixcImFncmF2ZVwiOlwiXFx1MDBFMFwiLFwiYWxlZnN5bVwiOlwiXFx1MjEzNVwiLFwiYWxlcGhcIjpcIlxcdTIxMzVcIixcIkFscGhhXCI6XCJcXHUwMzkxXCIsXCJhbHBoYVwiOlwiXFx1MDNCMVwiLFwiQW1hY3JcIjpcIlxcdTAxMDBcIixcImFtYWNyXCI6XCJcXHUwMTAxXCIsXCJhbWFsZ1wiOlwiXFx1MkEzRlwiLFwiYW1wXCI6XCImXCIsXCJBTVBcIjpcIiZcIixcImFuZGFuZFwiOlwiXFx1MkE1NVwiLFwiQW5kXCI6XCJcXHUyQTUzXCIsXCJhbmRcIjpcIlxcdTIyMjdcIixcImFuZGRcIjpcIlxcdTJBNUNcIixcImFuZHNsb3BlXCI6XCJcXHUyQTU4XCIsXCJhbmR2XCI6XCJcXHUyQTVBXCIsXCJhbmdcIjpcIlxcdTIyMjBcIixcImFuZ2VcIjpcIlxcdTI5QTRcIixcImFuZ2xlXCI6XCJcXHUyMjIwXCIsXCJhbmdtc2RhYVwiOlwiXFx1MjlBOFwiLFwiYW5nbXNkYWJcIjpcIlxcdTI5QTlcIixcImFuZ21zZGFjXCI6XCJcXHUyOUFBXCIsXCJhbmdtc2RhZFwiOlwiXFx1MjlBQlwiLFwiYW5nbXNkYWVcIjpcIlxcdTI5QUNcIixcImFuZ21zZGFmXCI6XCJcXHUyOUFEXCIsXCJhbmdtc2RhZ1wiOlwiXFx1MjlBRVwiLFwiYW5nbXNkYWhcIjpcIlxcdTI5QUZcIixcImFuZ21zZFwiOlwiXFx1MjIyMVwiLFwiYW5ncnRcIjpcIlxcdTIyMUZcIixcImFuZ3J0dmJcIjpcIlxcdTIyQkVcIixcImFuZ3J0dmJkXCI6XCJcXHUyOTlEXCIsXCJhbmdzcGhcIjpcIlxcdTIyMjJcIixcImFuZ3N0XCI6XCJcXHUwMEM1XCIsXCJhbmd6YXJyXCI6XCJcXHUyMzdDXCIsXCJBb2dvblwiOlwiXFx1MDEwNFwiLFwiYW9nb25cIjpcIlxcdTAxMDVcIixcIkFvcGZcIjpcIlxcdUQ4MzVcXHVERDM4XCIsXCJhb3BmXCI6XCJcXHVEODM1XFx1REQ1MlwiLFwiYXBhY2lyXCI6XCJcXHUyQTZGXCIsXCJhcFwiOlwiXFx1MjI0OFwiLFwiYXBFXCI6XCJcXHUyQTcwXCIsXCJhcGVcIjpcIlxcdTIyNEFcIixcImFwaWRcIjpcIlxcdTIyNEJcIixcImFwb3NcIjpcIidcIixcIkFwcGx5RnVuY3Rpb25cIjpcIlxcdTIwNjFcIixcImFwcHJveFwiOlwiXFx1MjI0OFwiLFwiYXBwcm94ZXFcIjpcIlxcdTIyNEFcIixcIkFyaW5nXCI6XCJcXHUwMEM1XCIsXCJhcmluZ1wiOlwiXFx1MDBFNVwiLFwiQXNjclwiOlwiXFx1RDgzNVxcdURDOUNcIixcImFzY3JcIjpcIlxcdUQ4MzVcXHVEQ0I2XCIsXCJBc3NpZ25cIjpcIlxcdTIyNTRcIixcImFzdFwiOlwiKlwiLFwiYXN5bXBcIjpcIlxcdTIyNDhcIixcImFzeW1wZXFcIjpcIlxcdTIyNERcIixcIkF0aWxkZVwiOlwiXFx1MDBDM1wiLFwiYXRpbGRlXCI6XCJcXHUwMEUzXCIsXCJBdW1sXCI6XCJcXHUwMEM0XCIsXCJhdW1sXCI6XCJcXHUwMEU0XCIsXCJhd2NvbmludFwiOlwiXFx1MjIzM1wiLFwiYXdpbnRcIjpcIlxcdTJBMTFcIixcImJhY2tjb25nXCI6XCJcXHUyMjRDXCIsXCJiYWNrZXBzaWxvblwiOlwiXFx1MDNGNlwiLFwiYmFja3ByaW1lXCI6XCJcXHUyMDM1XCIsXCJiYWNrc2ltXCI6XCJcXHUyMjNEXCIsXCJiYWNrc2ltZXFcIjpcIlxcdTIyQ0RcIixcIkJhY2tzbGFzaFwiOlwiXFx1MjIxNlwiLFwiQmFydlwiOlwiXFx1MkFFN1wiLFwiYmFydmVlXCI6XCJcXHUyMkJEXCIsXCJiYXJ3ZWRcIjpcIlxcdTIzMDVcIixcIkJhcndlZFwiOlwiXFx1MjMwNlwiLFwiYmFyd2VkZ2VcIjpcIlxcdTIzMDVcIixcImJicmtcIjpcIlxcdTIzQjVcIixcImJicmt0YnJrXCI6XCJcXHUyM0I2XCIsXCJiY29uZ1wiOlwiXFx1MjI0Q1wiLFwiQmN5XCI6XCJcXHUwNDExXCIsXCJiY3lcIjpcIlxcdTA0MzFcIixcImJkcXVvXCI6XCJcXHUyMDFFXCIsXCJiZWNhdXNcIjpcIlxcdTIyMzVcIixcImJlY2F1c2VcIjpcIlxcdTIyMzVcIixcIkJlY2F1c2VcIjpcIlxcdTIyMzVcIixcImJlbXB0eXZcIjpcIlxcdTI5QjBcIixcImJlcHNpXCI6XCJcXHUwM0Y2XCIsXCJiZXJub3VcIjpcIlxcdTIxMkNcIixcIkJlcm5vdWxsaXNcIjpcIlxcdTIxMkNcIixcIkJldGFcIjpcIlxcdTAzOTJcIixcImJldGFcIjpcIlxcdTAzQjJcIixcImJldGhcIjpcIlxcdTIxMzZcIixcImJldHdlZW5cIjpcIlxcdTIyNkNcIixcIkJmclwiOlwiXFx1RDgzNVxcdUREMDVcIixcImJmclwiOlwiXFx1RDgzNVxcdUREMUZcIixcImJpZ2NhcFwiOlwiXFx1MjJDMlwiLFwiYmlnY2lyY1wiOlwiXFx1MjVFRlwiLFwiYmlnY3VwXCI6XCJcXHUyMkMzXCIsXCJiaWdvZG90XCI6XCJcXHUyQTAwXCIsXCJiaWdvcGx1c1wiOlwiXFx1MkEwMVwiLFwiYmlnb3RpbWVzXCI6XCJcXHUyQTAyXCIsXCJiaWdzcWN1cFwiOlwiXFx1MkEwNlwiLFwiYmlnc3RhclwiOlwiXFx1MjYwNVwiLFwiYmlndHJpYW5nbGVkb3duXCI6XCJcXHUyNUJEXCIsXCJiaWd0cmlhbmdsZXVwXCI6XCJcXHUyNUIzXCIsXCJiaWd1cGx1c1wiOlwiXFx1MkEwNFwiLFwiYmlndmVlXCI6XCJcXHUyMkMxXCIsXCJiaWd3ZWRnZVwiOlwiXFx1MjJDMFwiLFwiYmthcm93XCI6XCJcXHUyOTBEXCIsXCJibGFja2xvemVuZ2VcIjpcIlxcdTI5RUJcIixcImJsYWNrc3F1YXJlXCI6XCJcXHUyNUFBXCIsXCJibGFja3RyaWFuZ2xlXCI6XCJcXHUyNUI0XCIsXCJibGFja3RyaWFuZ2xlZG93blwiOlwiXFx1MjVCRVwiLFwiYmxhY2t0cmlhbmdsZWxlZnRcIjpcIlxcdTI1QzJcIixcImJsYWNrdHJpYW5nbGVyaWdodFwiOlwiXFx1MjVCOFwiLFwiYmxhbmtcIjpcIlxcdTI0MjNcIixcImJsazEyXCI6XCJcXHUyNTkyXCIsXCJibGsxNFwiOlwiXFx1MjU5MVwiLFwiYmxrMzRcIjpcIlxcdTI1OTNcIixcImJsb2NrXCI6XCJcXHUyNTg4XCIsXCJibmVcIjpcIj1cXHUyMEU1XCIsXCJibmVxdWl2XCI6XCJcXHUyMjYxXFx1MjBFNVwiLFwiYk5vdFwiOlwiXFx1MkFFRFwiLFwiYm5vdFwiOlwiXFx1MjMxMFwiLFwiQm9wZlwiOlwiXFx1RDgzNVxcdUREMzlcIixcImJvcGZcIjpcIlxcdUQ4MzVcXHVERDUzXCIsXCJib3RcIjpcIlxcdTIyQTVcIixcImJvdHRvbVwiOlwiXFx1MjJBNVwiLFwiYm93dGllXCI6XCJcXHUyMkM4XCIsXCJib3hib3hcIjpcIlxcdTI5QzlcIixcImJveGRsXCI6XCJcXHUyNTEwXCIsXCJib3hkTFwiOlwiXFx1MjU1NVwiLFwiYm94RGxcIjpcIlxcdTI1NTZcIixcImJveERMXCI6XCJcXHUyNTU3XCIsXCJib3hkclwiOlwiXFx1MjUwQ1wiLFwiYm94ZFJcIjpcIlxcdTI1NTJcIixcImJveERyXCI6XCJcXHUyNTUzXCIsXCJib3hEUlwiOlwiXFx1MjU1NFwiLFwiYm94aFwiOlwiXFx1MjUwMFwiLFwiYm94SFwiOlwiXFx1MjU1MFwiLFwiYm94aGRcIjpcIlxcdTI1MkNcIixcImJveEhkXCI6XCJcXHUyNTY0XCIsXCJib3hoRFwiOlwiXFx1MjU2NVwiLFwiYm94SERcIjpcIlxcdTI1NjZcIixcImJveGh1XCI6XCJcXHUyNTM0XCIsXCJib3hIdVwiOlwiXFx1MjU2N1wiLFwiYm94aFVcIjpcIlxcdTI1NjhcIixcImJveEhVXCI6XCJcXHUyNTY5XCIsXCJib3htaW51c1wiOlwiXFx1MjI5RlwiLFwiYm94cGx1c1wiOlwiXFx1MjI5RVwiLFwiYm94dGltZXNcIjpcIlxcdTIyQTBcIixcImJveHVsXCI6XCJcXHUyNTE4XCIsXCJib3h1TFwiOlwiXFx1MjU1QlwiLFwiYm94VWxcIjpcIlxcdTI1NUNcIixcImJveFVMXCI6XCJcXHUyNTVEXCIsXCJib3h1clwiOlwiXFx1MjUxNFwiLFwiYm94dVJcIjpcIlxcdTI1NThcIixcImJveFVyXCI6XCJcXHUyNTU5XCIsXCJib3hVUlwiOlwiXFx1MjU1QVwiLFwiYm94dlwiOlwiXFx1MjUwMlwiLFwiYm94VlwiOlwiXFx1MjU1MVwiLFwiYm94dmhcIjpcIlxcdTI1M0NcIixcImJveHZIXCI6XCJcXHUyNTZBXCIsXCJib3hWaFwiOlwiXFx1MjU2QlwiLFwiYm94VkhcIjpcIlxcdTI1NkNcIixcImJveHZsXCI6XCJcXHUyNTI0XCIsXCJib3h2TFwiOlwiXFx1MjU2MVwiLFwiYm94VmxcIjpcIlxcdTI1NjJcIixcImJveFZMXCI6XCJcXHUyNTYzXCIsXCJib3h2clwiOlwiXFx1MjUxQ1wiLFwiYm94dlJcIjpcIlxcdTI1NUVcIixcImJveFZyXCI6XCJcXHUyNTVGXCIsXCJib3hWUlwiOlwiXFx1MjU2MFwiLFwiYnByaW1lXCI6XCJcXHUyMDM1XCIsXCJicmV2ZVwiOlwiXFx1MDJEOFwiLFwiQnJldmVcIjpcIlxcdTAyRDhcIixcImJydmJhclwiOlwiXFx1MDBBNlwiLFwiYnNjclwiOlwiXFx1RDgzNVxcdURDQjdcIixcIkJzY3JcIjpcIlxcdTIxMkNcIixcImJzZW1pXCI6XCJcXHUyMDRGXCIsXCJic2ltXCI6XCJcXHUyMjNEXCIsXCJic2ltZVwiOlwiXFx1MjJDRFwiLFwiYnNvbGJcIjpcIlxcdTI5QzVcIixcImJzb2xcIjpcIlxcXFxcIixcImJzb2xoc3ViXCI6XCJcXHUyN0M4XCIsXCJidWxsXCI6XCJcXHUyMDIyXCIsXCJidWxsZXRcIjpcIlxcdTIwMjJcIixcImJ1bXBcIjpcIlxcdTIyNEVcIixcImJ1bXBFXCI6XCJcXHUyQUFFXCIsXCJidW1wZVwiOlwiXFx1MjI0RlwiLFwiQnVtcGVxXCI6XCJcXHUyMjRFXCIsXCJidW1wZXFcIjpcIlxcdTIyNEZcIixcIkNhY3V0ZVwiOlwiXFx1MDEwNlwiLFwiY2FjdXRlXCI6XCJcXHUwMTA3XCIsXCJjYXBhbmRcIjpcIlxcdTJBNDRcIixcImNhcGJyY3VwXCI6XCJcXHUyQTQ5XCIsXCJjYXBjYXBcIjpcIlxcdTJBNEJcIixcImNhcFwiOlwiXFx1MjIyOVwiLFwiQ2FwXCI6XCJcXHUyMkQyXCIsXCJjYXBjdXBcIjpcIlxcdTJBNDdcIixcImNhcGRvdFwiOlwiXFx1MkE0MFwiLFwiQ2FwaXRhbERpZmZlcmVudGlhbERcIjpcIlxcdTIxNDVcIixcImNhcHNcIjpcIlxcdTIyMjlcXHVGRTAwXCIsXCJjYXJldFwiOlwiXFx1MjA0MVwiLFwiY2Fyb25cIjpcIlxcdTAyQzdcIixcIkNheWxleXNcIjpcIlxcdTIxMkRcIixcImNjYXBzXCI6XCJcXHUyQTREXCIsXCJDY2Fyb25cIjpcIlxcdTAxMENcIixcImNjYXJvblwiOlwiXFx1MDEwRFwiLFwiQ2NlZGlsXCI6XCJcXHUwMEM3XCIsXCJjY2VkaWxcIjpcIlxcdTAwRTdcIixcIkNjaXJjXCI6XCJcXHUwMTA4XCIsXCJjY2lyY1wiOlwiXFx1MDEwOVwiLFwiQ2NvbmludFwiOlwiXFx1MjIzMFwiLFwiY2N1cHNcIjpcIlxcdTJBNENcIixcImNjdXBzc21cIjpcIlxcdTJBNTBcIixcIkNkb3RcIjpcIlxcdTAxMEFcIixcImNkb3RcIjpcIlxcdTAxMEJcIixcImNlZGlsXCI6XCJcXHUwMEI4XCIsXCJDZWRpbGxhXCI6XCJcXHUwMEI4XCIsXCJjZW1wdHl2XCI6XCJcXHUyOUIyXCIsXCJjZW50XCI6XCJcXHUwMEEyXCIsXCJjZW50ZXJkb3RcIjpcIlxcdTAwQjdcIixcIkNlbnRlckRvdFwiOlwiXFx1MDBCN1wiLFwiY2ZyXCI6XCJcXHVEODM1XFx1REQyMFwiLFwiQ2ZyXCI6XCJcXHUyMTJEXCIsXCJDSGN5XCI6XCJcXHUwNDI3XCIsXCJjaGN5XCI6XCJcXHUwNDQ3XCIsXCJjaGVja1wiOlwiXFx1MjcxM1wiLFwiY2hlY2ttYXJrXCI6XCJcXHUyNzEzXCIsXCJDaGlcIjpcIlxcdTAzQTdcIixcImNoaVwiOlwiXFx1MDNDN1wiLFwiY2lyY1wiOlwiXFx1MDJDNlwiLFwiY2lyY2VxXCI6XCJcXHUyMjU3XCIsXCJjaXJjbGVhcnJvd2xlZnRcIjpcIlxcdTIxQkFcIixcImNpcmNsZWFycm93cmlnaHRcIjpcIlxcdTIxQkJcIixcImNpcmNsZWRhc3RcIjpcIlxcdTIyOUJcIixcImNpcmNsZWRjaXJjXCI6XCJcXHUyMjlBXCIsXCJjaXJjbGVkZGFzaFwiOlwiXFx1MjI5RFwiLFwiQ2lyY2xlRG90XCI6XCJcXHUyMjk5XCIsXCJjaXJjbGVkUlwiOlwiXFx1MDBBRVwiLFwiY2lyY2xlZFNcIjpcIlxcdTI0QzhcIixcIkNpcmNsZU1pbnVzXCI6XCJcXHUyMjk2XCIsXCJDaXJjbGVQbHVzXCI6XCJcXHUyMjk1XCIsXCJDaXJjbGVUaW1lc1wiOlwiXFx1MjI5N1wiLFwiY2lyXCI6XCJcXHUyNUNCXCIsXCJjaXJFXCI6XCJcXHUyOUMzXCIsXCJjaXJlXCI6XCJcXHUyMjU3XCIsXCJjaXJmbmludFwiOlwiXFx1MkExMFwiLFwiY2lybWlkXCI6XCJcXHUyQUVGXCIsXCJjaXJzY2lyXCI6XCJcXHUyOUMyXCIsXCJDbG9ja3dpc2VDb250b3VySW50ZWdyYWxcIjpcIlxcdTIyMzJcIixcIkNsb3NlQ3VybHlEb3VibGVRdW90ZVwiOlwiXFx1MjAxRFwiLFwiQ2xvc2VDdXJseVF1b3RlXCI6XCJcXHUyMDE5XCIsXCJjbHVic1wiOlwiXFx1MjY2M1wiLFwiY2x1YnN1aXRcIjpcIlxcdTI2NjNcIixcImNvbG9uXCI6XCI6XCIsXCJDb2xvblwiOlwiXFx1MjIzN1wiLFwiQ29sb25lXCI6XCJcXHUyQTc0XCIsXCJjb2xvbmVcIjpcIlxcdTIyNTRcIixcImNvbG9uZXFcIjpcIlxcdTIyNTRcIixcImNvbW1hXCI6XCIsXCIsXCJjb21tYXRcIjpcIkBcIixcImNvbXBcIjpcIlxcdTIyMDFcIixcImNvbXBmblwiOlwiXFx1MjIxOFwiLFwiY29tcGxlbWVudFwiOlwiXFx1MjIwMVwiLFwiY29tcGxleGVzXCI6XCJcXHUyMTAyXCIsXCJjb25nXCI6XCJcXHUyMjQ1XCIsXCJjb25nZG90XCI6XCJcXHUyQTZEXCIsXCJDb25ncnVlbnRcIjpcIlxcdTIyNjFcIixcImNvbmludFwiOlwiXFx1MjIyRVwiLFwiQ29uaW50XCI6XCJcXHUyMjJGXCIsXCJDb250b3VySW50ZWdyYWxcIjpcIlxcdTIyMkVcIixcImNvcGZcIjpcIlxcdUQ4MzVcXHVERDU0XCIsXCJDb3BmXCI6XCJcXHUyMTAyXCIsXCJjb3Byb2RcIjpcIlxcdTIyMTBcIixcIkNvcHJvZHVjdFwiOlwiXFx1MjIxMFwiLFwiY29weVwiOlwiXFx1MDBBOVwiLFwiQ09QWVwiOlwiXFx1MDBBOVwiLFwiY29weXNyXCI6XCJcXHUyMTE3XCIsXCJDb3VudGVyQ2xvY2t3aXNlQ29udG91ckludGVncmFsXCI6XCJcXHUyMjMzXCIsXCJjcmFyclwiOlwiXFx1MjFCNVwiLFwiY3Jvc3NcIjpcIlxcdTI3MTdcIixcIkNyb3NzXCI6XCJcXHUyQTJGXCIsXCJDc2NyXCI6XCJcXHVEODM1XFx1REM5RVwiLFwiY3NjclwiOlwiXFx1RDgzNVxcdURDQjhcIixcImNzdWJcIjpcIlxcdTJBQ0ZcIixcImNzdWJlXCI6XCJcXHUyQUQxXCIsXCJjc3VwXCI6XCJcXHUyQUQwXCIsXCJjc3VwZVwiOlwiXFx1MkFEMlwiLFwiY3Rkb3RcIjpcIlxcdTIyRUZcIixcImN1ZGFycmxcIjpcIlxcdTI5MzhcIixcImN1ZGFycnJcIjpcIlxcdTI5MzVcIixcImN1ZXByXCI6XCJcXHUyMkRFXCIsXCJjdWVzY1wiOlwiXFx1MjJERlwiLFwiY3VsYXJyXCI6XCJcXHUyMUI2XCIsXCJjdWxhcnJwXCI6XCJcXHUyOTNEXCIsXCJjdXBicmNhcFwiOlwiXFx1MkE0OFwiLFwiY3VwY2FwXCI6XCJcXHUyQTQ2XCIsXCJDdXBDYXBcIjpcIlxcdTIyNERcIixcImN1cFwiOlwiXFx1MjIyQVwiLFwiQ3VwXCI6XCJcXHUyMkQzXCIsXCJjdXBjdXBcIjpcIlxcdTJBNEFcIixcImN1cGRvdFwiOlwiXFx1MjI4RFwiLFwiY3Vwb3JcIjpcIlxcdTJBNDVcIixcImN1cHNcIjpcIlxcdTIyMkFcXHVGRTAwXCIsXCJjdXJhcnJcIjpcIlxcdTIxQjdcIixcImN1cmFycm1cIjpcIlxcdTI5M0NcIixcImN1cmx5ZXFwcmVjXCI6XCJcXHUyMkRFXCIsXCJjdXJseWVxc3VjY1wiOlwiXFx1MjJERlwiLFwiY3VybHl2ZWVcIjpcIlxcdTIyQ0VcIixcImN1cmx5d2VkZ2VcIjpcIlxcdTIyQ0ZcIixcImN1cnJlblwiOlwiXFx1MDBBNFwiLFwiY3VydmVhcnJvd2xlZnRcIjpcIlxcdTIxQjZcIixcImN1cnZlYXJyb3dyaWdodFwiOlwiXFx1MjFCN1wiLFwiY3V2ZWVcIjpcIlxcdTIyQ0VcIixcImN1d2VkXCI6XCJcXHUyMkNGXCIsXCJjd2NvbmludFwiOlwiXFx1MjIzMlwiLFwiY3dpbnRcIjpcIlxcdTIyMzFcIixcImN5bGN0eVwiOlwiXFx1MjMyRFwiLFwiZGFnZ2VyXCI6XCJcXHUyMDIwXCIsXCJEYWdnZXJcIjpcIlxcdTIwMjFcIixcImRhbGV0aFwiOlwiXFx1MjEzOFwiLFwiZGFyclwiOlwiXFx1MjE5M1wiLFwiRGFyclwiOlwiXFx1MjFBMVwiLFwiZEFyclwiOlwiXFx1MjFEM1wiLFwiZGFzaFwiOlwiXFx1MjAxMFwiLFwiRGFzaHZcIjpcIlxcdTJBRTRcIixcImRhc2h2XCI6XCJcXHUyMkEzXCIsXCJkYmthcm93XCI6XCJcXHUyOTBGXCIsXCJkYmxhY1wiOlwiXFx1MDJERFwiLFwiRGNhcm9uXCI6XCJcXHUwMTBFXCIsXCJkY2Fyb25cIjpcIlxcdTAxMEZcIixcIkRjeVwiOlwiXFx1MDQxNFwiLFwiZGN5XCI6XCJcXHUwNDM0XCIsXCJkZGFnZ2VyXCI6XCJcXHUyMDIxXCIsXCJkZGFyclwiOlwiXFx1MjFDQVwiLFwiRERcIjpcIlxcdTIxNDVcIixcImRkXCI6XCJcXHUyMTQ2XCIsXCJERG90cmFoZFwiOlwiXFx1MjkxMVwiLFwiZGRvdHNlcVwiOlwiXFx1MkE3N1wiLFwiZGVnXCI6XCJcXHUwMEIwXCIsXCJEZWxcIjpcIlxcdTIyMDdcIixcIkRlbHRhXCI6XCJcXHUwMzk0XCIsXCJkZWx0YVwiOlwiXFx1MDNCNFwiLFwiZGVtcHR5dlwiOlwiXFx1MjlCMVwiLFwiZGZpc2h0XCI6XCJcXHUyOTdGXCIsXCJEZnJcIjpcIlxcdUQ4MzVcXHVERDA3XCIsXCJkZnJcIjpcIlxcdUQ4MzVcXHVERDIxXCIsXCJkSGFyXCI6XCJcXHUyOTY1XCIsXCJkaGFybFwiOlwiXFx1MjFDM1wiLFwiZGhhcnJcIjpcIlxcdTIxQzJcIixcIkRpYWNyaXRpY2FsQWN1dGVcIjpcIlxcdTAwQjRcIixcIkRpYWNyaXRpY2FsRG90XCI6XCJcXHUwMkQ5XCIsXCJEaWFjcml0aWNhbERvdWJsZUFjdXRlXCI6XCJcXHUwMkREXCIsXCJEaWFjcml0aWNhbEdyYXZlXCI6XCJgXCIsXCJEaWFjcml0aWNhbFRpbGRlXCI6XCJcXHUwMkRDXCIsXCJkaWFtXCI6XCJcXHUyMkM0XCIsXCJkaWFtb25kXCI6XCJcXHUyMkM0XCIsXCJEaWFtb25kXCI6XCJcXHUyMkM0XCIsXCJkaWFtb25kc3VpdFwiOlwiXFx1MjY2NlwiLFwiZGlhbXNcIjpcIlxcdTI2NjZcIixcImRpZVwiOlwiXFx1MDBBOFwiLFwiRGlmZmVyZW50aWFsRFwiOlwiXFx1MjE0NlwiLFwiZGlnYW1tYVwiOlwiXFx1MDNERFwiLFwiZGlzaW5cIjpcIlxcdTIyRjJcIixcImRpdlwiOlwiXFx1MDBGN1wiLFwiZGl2aWRlXCI6XCJcXHUwMEY3XCIsXCJkaXZpZGVvbnRpbWVzXCI6XCJcXHUyMkM3XCIsXCJkaXZvbnhcIjpcIlxcdTIyQzdcIixcIkRKY3lcIjpcIlxcdTA0MDJcIixcImRqY3lcIjpcIlxcdTA0NTJcIixcImRsY29yblwiOlwiXFx1MjMxRVwiLFwiZGxjcm9wXCI6XCJcXHUyMzBEXCIsXCJkb2xsYXJcIjpcIiRcIixcIkRvcGZcIjpcIlxcdUQ4MzVcXHVERDNCXCIsXCJkb3BmXCI6XCJcXHVEODM1XFx1REQ1NVwiLFwiRG90XCI6XCJcXHUwMEE4XCIsXCJkb3RcIjpcIlxcdTAyRDlcIixcIkRvdERvdFwiOlwiXFx1MjBEQ1wiLFwiZG90ZXFcIjpcIlxcdTIyNTBcIixcImRvdGVxZG90XCI6XCJcXHUyMjUxXCIsXCJEb3RFcXVhbFwiOlwiXFx1MjI1MFwiLFwiZG90bWludXNcIjpcIlxcdTIyMzhcIixcImRvdHBsdXNcIjpcIlxcdTIyMTRcIixcImRvdHNxdWFyZVwiOlwiXFx1MjJBMVwiLFwiZG91YmxlYmFyd2VkZ2VcIjpcIlxcdTIzMDZcIixcIkRvdWJsZUNvbnRvdXJJbnRlZ3JhbFwiOlwiXFx1MjIyRlwiLFwiRG91YmxlRG90XCI6XCJcXHUwMEE4XCIsXCJEb3VibGVEb3duQXJyb3dcIjpcIlxcdTIxRDNcIixcIkRvdWJsZUxlZnRBcnJvd1wiOlwiXFx1MjFEMFwiLFwiRG91YmxlTGVmdFJpZ2h0QXJyb3dcIjpcIlxcdTIxRDRcIixcIkRvdWJsZUxlZnRUZWVcIjpcIlxcdTJBRTRcIixcIkRvdWJsZUxvbmdMZWZ0QXJyb3dcIjpcIlxcdTI3RjhcIixcIkRvdWJsZUxvbmdMZWZ0UmlnaHRBcnJvd1wiOlwiXFx1MjdGQVwiLFwiRG91YmxlTG9uZ1JpZ2h0QXJyb3dcIjpcIlxcdTI3RjlcIixcIkRvdWJsZVJpZ2h0QXJyb3dcIjpcIlxcdTIxRDJcIixcIkRvdWJsZVJpZ2h0VGVlXCI6XCJcXHUyMkE4XCIsXCJEb3VibGVVcEFycm93XCI6XCJcXHUyMUQxXCIsXCJEb3VibGVVcERvd25BcnJvd1wiOlwiXFx1MjFENVwiLFwiRG91YmxlVmVydGljYWxCYXJcIjpcIlxcdTIyMjVcIixcIkRvd25BcnJvd0JhclwiOlwiXFx1MjkxM1wiLFwiZG93bmFycm93XCI6XCJcXHUyMTkzXCIsXCJEb3duQXJyb3dcIjpcIlxcdTIxOTNcIixcIkRvd25hcnJvd1wiOlwiXFx1MjFEM1wiLFwiRG93bkFycm93VXBBcnJvd1wiOlwiXFx1MjFGNVwiLFwiRG93bkJyZXZlXCI6XCJcXHUwMzExXCIsXCJkb3duZG93bmFycm93c1wiOlwiXFx1MjFDQVwiLFwiZG93bmhhcnBvb25sZWZ0XCI6XCJcXHUyMUMzXCIsXCJkb3duaGFycG9vbnJpZ2h0XCI6XCJcXHUyMUMyXCIsXCJEb3duTGVmdFJpZ2h0VmVjdG9yXCI6XCJcXHUyOTUwXCIsXCJEb3duTGVmdFRlZVZlY3RvclwiOlwiXFx1Mjk1RVwiLFwiRG93bkxlZnRWZWN0b3JCYXJcIjpcIlxcdTI5NTZcIixcIkRvd25MZWZ0VmVjdG9yXCI6XCJcXHUyMUJEXCIsXCJEb3duUmlnaHRUZWVWZWN0b3JcIjpcIlxcdTI5NUZcIixcIkRvd25SaWdodFZlY3RvckJhclwiOlwiXFx1Mjk1N1wiLFwiRG93blJpZ2h0VmVjdG9yXCI6XCJcXHUyMUMxXCIsXCJEb3duVGVlQXJyb3dcIjpcIlxcdTIxQTdcIixcIkRvd25UZWVcIjpcIlxcdTIyQTRcIixcImRyYmthcm93XCI6XCJcXHUyOTEwXCIsXCJkcmNvcm5cIjpcIlxcdTIzMUZcIixcImRyY3JvcFwiOlwiXFx1MjMwQ1wiLFwiRHNjclwiOlwiXFx1RDgzNVxcdURDOUZcIixcImRzY3JcIjpcIlxcdUQ4MzVcXHVEQ0I5XCIsXCJEU2N5XCI6XCJcXHUwNDA1XCIsXCJkc2N5XCI6XCJcXHUwNDU1XCIsXCJkc29sXCI6XCJcXHUyOUY2XCIsXCJEc3Ryb2tcIjpcIlxcdTAxMTBcIixcImRzdHJva1wiOlwiXFx1MDExMVwiLFwiZHRkb3RcIjpcIlxcdTIyRjFcIixcImR0cmlcIjpcIlxcdTI1QkZcIixcImR0cmlmXCI6XCJcXHUyNUJFXCIsXCJkdWFyclwiOlwiXFx1MjFGNVwiLFwiZHVoYXJcIjpcIlxcdTI5NkZcIixcImR3YW5nbGVcIjpcIlxcdTI5QTZcIixcIkRaY3lcIjpcIlxcdTA0MEZcIixcImR6Y3lcIjpcIlxcdTA0NUZcIixcImR6aWdyYXJyXCI6XCJcXHUyN0ZGXCIsXCJFYWN1dGVcIjpcIlxcdTAwQzlcIixcImVhY3V0ZVwiOlwiXFx1MDBFOVwiLFwiZWFzdGVyXCI6XCJcXHUyQTZFXCIsXCJFY2Fyb25cIjpcIlxcdTAxMUFcIixcImVjYXJvblwiOlwiXFx1MDExQlwiLFwiRWNpcmNcIjpcIlxcdTAwQ0FcIixcImVjaXJjXCI6XCJcXHUwMEVBXCIsXCJlY2lyXCI6XCJcXHUyMjU2XCIsXCJlY29sb25cIjpcIlxcdTIyNTVcIixcIkVjeVwiOlwiXFx1MDQyRFwiLFwiZWN5XCI6XCJcXHUwNDREXCIsXCJlRERvdFwiOlwiXFx1MkE3N1wiLFwiRWRvdFwiOlwiXFx1MDExNlwiLFwiZWRvdFwiOlwiXFx1MDExN1wiLFwiZURvdFwiOlwiXFx1MjI1MVwiLFwiZWVcIjpcIlxcdTIxNDdcIixcImVmRG90XCI6XCJcXHUyMjUyXCIsXCJFZnJcIjpcIlxcdUQ4MzVcXHVERDA4XCIsXCJlZnJcIjpcIlxcdUQ4MzVcXHVERDIyXCIsXCJlZ1wiOlwiXFx1MkE5QVwiLFwiRWdyYXZlXCI6XCJcXHUwMEM4XCIsXCJlZ3JhdmVcIjpcIlxcdTAwRThcIixcImVnc1wiOlwiXFx1MkE5NlwiLFwiZWdzZG90XCI6XCJcXHUyQTk4XCIsXCJlbFwiOlwiXFx1MkE5OVwiLFwiRWxlbWVudFwiOlwiXFx1MjIwOFwiLFwiZWxpbnRlcnNcIjpcIlxcdTIzRTdcIixcImVsbFwiOlwiXFx1MjExM1wiLFwiZWxzXCI6XCJcXHUyQTk1XCIsXCJlbHNkb3RcIjpcIlxcdTJBOTdcIixcIkVtYWNyXCI6XCJcXHUwMTEyXCIsXCJlbWFjclwiOlwiXFx1MDExM1wiLFwiZW1wdHlcIjpcIlxcdTIyMDVcIixcImVtcHR5c2V0XCI6XCJcXHUyMjA1XCIsXCJFbXB0eVNtYWxsU3F1YXJlXCI6XCJcXHUyNUZCXCIsXCJlbXB0eXZcIjpcIlxcdTIyMDVcIixcIkVtcHR5VmVyeVNtYWxsU3F1YXJlXCI6XCJcXHUyNUFCXCIsXCJlbXNwMTNcIjpcIlxcdTIwMDRcIixcImVtc3AxNFwiOlwiXFx1MjAwNVwiLFwiZW1zcFwiOlwiXFx1MjAwM1wiLFwiRU5HXCI6XCJcXHUwMTRBXCIsXCJlbmdcIjpcIlxcdTAxNEJcIixcImVuc3BcIjpcIlxcdTIwMDJcIixcIkVvZ29uXCI6XCJcXHUwMTE4XCIsXCJlb2dvblwiOlwiXFx1MDExOVwiLFwiRW9wZlwiOlwiXFx1RDgzNVxcdUREM0NcIixcImVvcGZcIjpcIlxcdUQ4MzVcXHVERDU2XCIsXCJlcGFyXCI6XCJcXHUyMkQ1XCIsXCJlcGFyc2xcIjpcIlxcdTI5RTNcIixcImVwbHVzXCI6XCJcXHUyQTcxXCIsXCJlcHNpXCI6XCJcXHUwM0I1XCIsXCJFcHNpbG9uXCI6XCJcXHUwMzk1XCIsXCJlcHNpbG9uXCI6XCJcXHUwM0I1XCIsXCJlcHNpdlwiOlwiXFx1MDNGNVwiLFwiZXFjaXJjXCI6XCJcXHUyMjU2XCIsXCJlcWNvbG9uXCI6XCJcXHUyMjU1XCIsXCJlcXNpbVwiOlwiXFx1MjI0MlwiLFwiZXFzbGFudGd0clwiOlwiXFx1MkE5NlwiLFwiZXFzbGFudGxlc3NcIjpcIlxcdTJBOTVcIixcIkVxdWFsXCI6XCJcXHUyQTc1XCIsXCJlcXVhbHNcIjpcIj1cIixcIkVxdWFsVGlsZGVcIjpcIlxcdTIyNDJcIixcImVxdWVzdFwiOlwiXFx1MjI1RlwiLFwiRXF1aWxpYnJpdW1cIjpcIlxcdTIxQ0NcIixcImVxdWl2XCI6XCJcXHUyMjYxXCIsXCJlcXVpdkREXCI6XCJcXHUyQTc4XCIsXCJlcXZwYXJzbFwiOlwiXFx1MjlFNVwiLFwiZXJhcnJcIjpcIlxcdTI5NzFcIixcImVyRG90XCI6XCJcXHUyMjUzXCIsXCJlc2NyXCI6XCJcXHUyMTJGXCIsXCJFc2NyXCI6XCJcXHUyMTMwXCIsXCJlc2RvdFwiOlwiXFx1MjI1MFwiLFwiRXNpbVwiOlwiXFx1MkE3M1wiLFwiZXNpbVwiOlwiXFx1MjI0MlwiLFwiRXRhXCI6XCJcXHUwMzk3XCIsXCJldGFcIjpcIlxcdTAzQjdcIixcIkVUSFwiOlwiXFx1MDBEMFwiLFwiZXRoXCI6XCJcXHUwMEYwXCIsXCJFdW1sXCI6XCJcXHUwMENCXCIsXCJldW1sXCI6XCJcXHUwMEVCXCIsXCJldXJvXCI6XCJcXHUyMEFDXCIsXCJleGNsXCI6XCIhXCIsXCJleGlzdFwiOlwiXFx1MjIwM1wiLFwiRXhpc3RzXCI6XCJcXHUyMjAzXCIsXCJleHBlY3RhdGlvblwiOlwiXFx1MjEzMFwiLFwiZXhwb25lbnRpYWxlXCI6XCJcXHUyMTQ3XCIsXCJFeHBvbmVudGlhbEVcIjpcIlxcdTIxNDdcIixcImZhbGxpbmdkb3RzZXFcIjpcIlxcdTIyNTJcIixcIkZjeVwiOlwiXFx1MDQyNFwiLFwiZmN5XCI6XCJcXHUwNDQ0XCIsXCJmZW1hbGVcIjpcIlxcdTI2NDBcIixcImZmaWxpZ1wiOlwiXFx1RkIwM1wiLFwiZmZsaWdcIjpcIlxcdUZCMDBcIixcImZmbGxpZ1wiOlwiXFx1RkIwNFwiLFwiRmZyXCI6XCJcXHVEODM1XFx1REQwOVwiLFwiZmZyXCI6XCJcXHVEODM1XFx1REQyM1wiLFwiZmlsaWdcIjpcIlxcdUZCMDFcIixcIkZpbGxlZFNtYWxsU3F1YXJlXCI6XCJcXHUyNUZDXCIsXCJGaWxsZWRWZXJ5U21hbGxTcXVhcmVcIjpcIlxcdTI1QUFcIixcImZqbGlnXCI6XCJmalwiLFwiZmxhdFwiOlwiXFx1MjY2RFwiLFwiZmxsaWdcIjpcIlxcdUZCMDJcIixcImZsdG5zXCI6XCJcXHUyNUIxXCIsXCJmbm9mXCI6XCJcXHUwMTkyXCIsXCJGb3BmXCI6XCJcXHVEODM1XFx1REQzRFwiLFwiZm9wZlwiOlwiXFx1RDgzNVxcdURENTdcIixcImZvcmFsbFwiOlwiXFx1MjIwMFwiLFwiRm9yQWxsXCI6XCJcXHUyMjAwXCIsXCJmb3JrXCI6XCJcXHUyMkQ0XCIsXCJmb3JrdlwiOlwiXFx1MkFEOVwiLFwiRm91cmllcnRyZlwiOlwiXFx1MjEzMVwiLFwiZnBhcnRpbnRcIjpcIlxcdTJBMERcIixcImZyYWMxMlwiOlwiXFx1MDBCRFwiLFwiZnJhYzEzXCI6XCJcXHUyMTUzXCIsXCJmcmFjMTRcIjpcIlxcdTAwQkNcIixcImZyYWMxNVwiOlwiXFx1MjE1NVwiLFwiZnJhYzE2XCI6XCJcXHUyMTU5XCIsXCJmcmFjMThcIjpcIlxcdTIxNUJcIixcImZyYWMyM1wiOlwiXFx1MjE1NFwiLFwiZnJhYzI1XCI6XCJcXHUyMTU2XCIsXCJmcmFjMzRcIjpcIlxcdTAwQkVcIixcImZyYWMzNVwiOlwiXFx1MjE1N1wiLFwiZnJhYzM4XCI6XCJcXHUyMTVDXCIsXCJmcmFjNDVcIjpcIlxcdTIxNThcIixcImZyYWM1NlwiOlwiXFx1MjE1QVwiLFwiZnJhYzU4XCI6XCJcXHUyMTVEXCIsXCJmcmFjNzhcIjpcIlxcdTIxNUVcIixcImZyYXNsXCI6XCJcXHUyMDQ0XCIsXCJmcm93blwiOlwiXFx1MjMyMlwiLFwiZnNjclwiOlwiXFx1RDgzNVxcdURDQkJcIixcIkZzY3JcIjpcIlxcdTIxMzFcIixcImdhY3V0ZVwiOlwiXFx1MDFGNVwiLFwiR2FtbWFcIjpcIlxcdTAzOTNcIixcImdhbW1hXCI6XCJcXHUwM0IzXCIsXCJHYW1tYWRcIjpcIlxcdTAzRENcIixcImdhbW1hZFwiOlwiXFx1MDNERFwiLFwiZ2FwXCI6XCJcXHUyQTg2XCIsXCJHYnJldmVcIjpcIlxcdTAxMUVcIixcImdicmV2ZVwiOlwiXFx1MDExRlwiLFwiR2NlZGlsXCI6XCJcXHUwMTIyXCIsXCJHY2lyY1wiOlwiXFx1MDExQ1wiLFwiZ2NpcmNcIjpcIlxcdTAxMURcIixcIkdjeVwiOlwiXFx1MDQxM1wiLFwiZ2N5XCI6XCJcXHUwNDMzXCIsXCJHZG90XCI6XCJcXHUwMTIwXCIsXCJnZG90XCI6XCJcXHUwMTIxXCIsXCJnZVwiOlwiXFx1MjI2NVwiLFwiZ0VcIjpcIlxcdTIyNjdcIixcImdFbFwiOlwiXFx1MkE4Q1wiLFwiZ2VsXCI6XCJcXHUyMkRCXCIsXCJnZXFcIjpcIlxcdTIyNjVcIixcImdlcXFcIjpcIlxcdTIyNjdcIixcImdlcXNsYW50XCI6XCJcXHUyQTdFXCIsXCJnZXNjY1wiOlwiXFx1MkFBOVwiLFwiZ2VzXCI6XCJcXHUyQTdFXCIsXCJnZXNkb3RcIjpcIlxcdTJBODBcIixcImdlc2RvdG9cIjpcIlxcdTJBODJcIixcImdlc2RvdG9sXCI6XCJcXHUyQTg0XCIsXCJnZXNsXCI6XCJcXHUyMkRCXFx1RkUwMFwiLFwiZ2VzbGVzXCI6XCJcXHUyQTk0XCIsXCJHZnJcIjpcIlxcdUQ4MzVcXHVERDBBXCIsXCJnZnJcIjpcIlxcdUQ4MzVcXHVERDI0XCIsXCJnZ1wiOlwiXFx1MjI2QlwiLFwiR2dcIjpcIlxcdTIyRDlcIixcImdnZ1wiOlwiXFx1MjJEOVwiLFwiZ2ltZWxcIjpcIlxcdTIxMzdcIixcIkdKY3lcIjpcIlxcdTA0MDNcIixcImdqY3lcIjpcIlxcdTA0NTNcIixcImdsYVwiOlwiXFx1MkFBNVwiLFwiZ2xcIjpcIlxcdTIyNzdcIixcImdsRVwiOlwiXFx1MkE5MlwiLFwiZ2xqXCI6XCJcXHUyQUE0XCIsXCJnbmFwXCI6XCJcXHUyQThBXCIsXCJnbmFwcHJveFwiOlwiXFx1MkE4QVwiLFwiZ25lXCI6XCJcXHUyQTg4XCIsXCJnbkVcIjpcIlxcdTIyNjlcIixcImduZXFcIjpcIlxcdTJBODhcIixcImduZXFxXCI6XCJcXHUyMjY5XCIsXCJnbnNpbVwiOlwiXFx1MjJFN1wiLFwiR29wZlwiOlwiXFx1RDgzNVxcdUREM0VcIixcImdvcGZcIjpcIlxcdUQ4MzVcXHVERDU4XCIsXCJncmF2ZVwiOlwiYFwiLFwiR3JlYXRlckVxdWFsXCI6XCJcXHUyMjY1XCIsXCJHcmVhdGVyRXF1YWxMZXNzXCI6XCJcXHUyMkRCXCIsXCJHcmVhdGVyRnVsbEVxdWFsXCI6XCJcXHUyMjY3XCIsXCJHcmVhdGVyR3JlYXRlclwiOlwiXFx1MkFBMlwiLFwiR3JlYXRlckxlc3NcIjpcIlxcdTIyNzdcIixcIkdyZWF0ZXJTbGFudEVxdWFsXCI6XCJcXHUyQTdFXCIsXCJHcmVhdGVyVGlsZGVcIjpcIlxcdTIyNzNcIixcIkdzY3JcIjpcIlxcdUQ4MzVcXHVEQ0EyXCIsXCJnc2NyXCI6XCJcXHUyMTBBXCIsXCJnc2ltXCI6XCJcXHUyMjczXCIsXCJnc2ltZVwiOlwiXFx1MkE4RVwiLFwiZ3NpbWxcIjpcIlxcdTJBOTBcIixcImd0Y2NcIjpcIlxcdTJBQTdcIixcImd0Y2lyXCI6XCJcXHUyQTdBXCIsXCJndFwiOlwiPlwiLFwiR1RcIjpcIj5cIixcIkd0XCI6XCJcXHUyMjZCXCIsXCJndGRvdFwiOlwiXFx1MjJEN1wiLFwiZ3RsUGFyXCI6XCJcXHUyOTk1XCIsXCJndHF1ZXN0XCI6XCJcXHUyQTdDXCIsXCJndHJhcHByb3hcIjpcIlxcdTJBODZcIixcImd0cmFyclwiOlwiXFx1Mjk3OFwiLFwiZ3RyZG90XCI6XCJcXHUyMkQ3XCIsXCJndHJlcWxlc3NcIjpcIlxcdTIyREJcIixcImd0cmVxcWxlc3NcIjpcIlxcdTJBOENcIixcImd0cmxlc3NcIjpcIlxcdTIyNzdcIixcImd0cnNpbVwiOlwiXFx1MjI3M1wiLFwiZ3ZlcnRuZXFxXCI6XCJcXHUyMjY5XFx1RkUwMFwiLFwiZ3ZuRVwiOlwiXFx1MjI2OVxcdUZFMDBcIixcIkhhY2VrXCI6XCJcXHUwMkM3XCIsXCJoYWlyc3BcIjpcIlxcdTIwMEFcIixcImhhbGZcIjpcIlxcdTAwQkRcIixcImhhbWlsdFwiOlwiXFx1MjEwQlwiLFwiSEFSRGN5XCI6XCJcXHUwNDJBXCIsXCJoYXJkY3lcIjpcIlxcdTA0NEFcIixcImhhcnJjaXJcIjpcIlxcdTI5NDhcIixcImhhcnJcIjpcIlxcdTIxOTRcIixcImhBcnJcIjpcIlxcdTIxRDRcIixcImhhcnJ3XCI6XCJcXHUyMUFEXCIsXCJIYXRcIjpcIl5cIixcImhiYXJcIjpcIlxcdTIxMEZcIixcIkhjaXJjXCI6XCJcXHUwMTI0XCIsXCJoY2lyY1wiOlwiXFx1MDEyNVwiLFwiaGVhcnRzXCI6XCJcXHUyNjY1XCIsXCJoZWFydHN1aXRcIjpcIlxcdTI2NjVcIixcImhlbGxpcFwiOlwiXFx1MjAyNlwiLFwiaGVyY29uXCI6XCJcXHUyMkI5XCIsXCJoZnJcIjpcIlxcdUQ4MzVcXHVERDI1XCIsXCJIZnJcIjpcIlxcdTIxMENcIixcIkhpbGJlcnRTcGFjZVwiOlwiXFx1MjEwQlwiLFwiaGtzZWFyb3dcIjpcIlxcdTI5MjVcIixcImhrc3dhcm93XCI6XCJcXHUyOTI2XCIsXCJob2FyclwiOlwiXFx1MjFGRlwiLFwiaG9tdGh0XCI6XCJcXHUyMjNCXCIsXCJob29rbGVmdGFycm93XCI6XCJcXHUyMUE5XCIsXCJob29rcmlnaHRhcnJvd1wiOlwiXFx1MjFBQVwiLFwiaG9wZlwiOlwiXFx1RDgzNVxcdURENTlcIixcIkhvcGZcIjpcIlxcdTIxMERcIixcImhvcmJhclwiOlwiXFx1MjAxNVwiLFwiSG9yaXpvbnRhbExpbmVcIjpcIlxcdTI1MDBcIixcImhzY3JcIjpcIlxcdUQ4MzVcXHVEQ0JEXCIsXCJIc2NyXCI6XCJcXHUyMTBCXCIsXCJoc2xhc2hcIjpcIlxcdTIxMEZcIixcIkhzdHJva1wiOlwiXFx1MDEyNlwiLFwiaHN0cm9rXCI6XCJcXHUwMTI3XCIsXCJIdW1wRG93bkh1bXBcIjpcIlxcdTIyNEVcIixcIkh1bXBFcXVhbFwiOlwiXFx1MjI0RlwiLFwiaHlidWxsXCI6XCJcXHUyMDQzXCIsXCJoeXBoZW5cIjpcIlxcdTIwMTBcIixcIklhY3V0ZVwiOlwiXFx1MDBDRFwiLFwiaWFjdXRlXCI6XCJcXHUwMEVEXCIsXCJpY1wiOlwiXFx1MjA2M1wiLFwiSWNpcmNcIjpcIlxcdTAwQ0VcIixcImljaXJjXCI6XCJcXHUwMEVFXCIsXCJJY3lcIjpcIlxcdTA0MThcIixcImljeVwiOlwiXFx1MDQzOFwiLFwiSWRvdFwiOlwiXFx1MDEzMFwiLFwiSUVjeVwiOlwiXFx1MDQxNVwiLFwiaWVjeVwiOlwiXFx1MDQzNVwiLFwiaWV4Y2xcIjpcIlxcdTAwQTFcIixcImlmZlwiOlwiXFx1MjFENFwiLFwiaWZyXCI6XCJcXHVEODM1XFx1REQyNlwiLFwiSWZyXCI6XCJcXHUyMTExXCIsXCJJZ3JhdmVcIjpcIlxcdTAwQ0NcIixcImlncmF2ZVwiOlwiXFx1MDBFQ1wiLFwiaWlcIjpcIlxcdTIxNDhcIixcImlpaWludFwiOlwiXFx1MkEwQ1wiLFwiaWlpbnRcIjpcIlxcdTIyMkRcIixcImlpbmZpblwiOlwiXFx1MjlEQ1wiLFwiaWlvdGFcIjpcIlxcdTIxMjlcIixcIklKbGlnXCI6XCJcXHUwMTMyXCIsXCJpamxpZ1wiOlwiXFx1MDEzM1wiLFwiSW1hY3JcIjpcIlxcdTAxMkFcIixcImltYWNyXCI6XCJcXHUwMTJCXCIsXCJpbWFnZVwiOlwiXFx1MjExMVwiLFwiSW1hZ2luYXJ5SVwiOlwiXFx1MjE0OFwiLFwiaW1hZ2xpbmVcIjpcIlxcdTIxMTBcIixcImltYWdwYXJ0XCI6XCJcXHUyMTExXCIsXCJpbWF0aFwiOlwiXFx1MDEzMVwiLFwiSW1cIjpcIlxcdTIxMTFcIixcImltb2ZcIjpcIlxcdTIyQjdcIixcImltcGVkXCI6XCJcXHUwMUI1XCIsXCJJbXBsaWVzXCI6XCJcXHUyMUQyXCIsXCJpbmNhcmVcIjpcIlxcdTIxMDVcIixcImluXCI6XCJcXHUyMjA4XCIsXCJpbmZpblwiOlwiXFx1MjIxRVwiLFwiaW5maW50aWVcIjpcIlxcdTI5RERcIixcImlub2RvdFwiOlwiXFx1MDEzMVwiLFwiaW50Y2FsXCI6XCJcXHUyMkJBXCIsXCJpbnRcIjpcIlxcdTIyMkJcIixcIkludFwiOlwiXFx1MjIyQ1wiLFwiaW50ZWdlcnNcIjpcIlxcdTIxMjRcIixcIkludGVncmFsXCI6XCJcXHUyMjJCXCIsXCJpbnRlcmNhbFwiOlwiXFx1MjJCQVwiLFwiSW50ZXJzZWN0aW9uXCI6XCJcXHUyMkMyXCIsXCJpbnRsYXJoa1wiOlwiXFx1MkExN1wiLFwiaW50cHJvZFwiOlwiXFx1MkEzQ1wiLFwiSW52aXNpYmxlQ29tbWFcIjpcIlxcdTIwNjNcIixcIkludmlzaWJsZVRpbWVzXCI6XCJcXHUyMDYyXCIsXCJJT2N5XCI6XCJcXHUwNDAxXCIsXCJpb2N5XCI6XCJcXHUwNDUxXCIsXCJJb2dvblwiOlwiXFx1MDEyRVwiLFwiaW9nb25cIjpcIlxcdTAxMkZcIixcIklvcGZcIjpcIlxcdUQ4MzVcXHVERDQwXCIsXCJpb3BmXCI6XCJcXHVEODM1XFx1REQ1QVwiLFwiSW90YVwiOlwiXFx1MDM5OVwiLFwiaW90YVwiOlwiXFx1MDNCOVwiLFwiaXByb2RcIjpcIlxcdTJBM0NcIixcImlxdWVzdFwiOlwiXFx1MDBCRlwiLFwiaXNjclwiOlwiXFx1RDgzNVxcdURDQkVcIixcIklzY3JcIjpcIlxcdTIxMTBcIixcImlzaW5cIjpcIlxcdTIyMDhcIixcImlzaW5kb3RcIjpcIlxcdTIyRjVcIixcImlzaW5FXCI6XCJcXHUyMkY5XCIsXCJpc2luc1wiOlwiXFx1MjJGNFwiLFwiaXNpbnN2XCI6XCJcXHUyMkYzXCIsXCJpc2ludlwiOlwiXFx1MjIwOFwiLFwiaXRcIjpcIlxcdTIwNjJcIixcIkl0aWxkZVwiOlwiXFx1MDEyOFwiLFwiaXRpbGRlXCI6XCJcXHUwMTI5XCIsXCJJdWtjeVwiOlwiXFx1MDQwNlwiLFwiaXVrY3lcIjpcIlxcdTA0NTZcIixcIkl1bWxcIjpcIlxcdTAwQ0ZcIixcIml1bWxcIjpcIlxcdTAwRUZcIixcIkpjaXJjXCI6XCJcXHUwMTM0XCIsXCJqY2lyY1wiOlwiXFx1MDEzNVwiLFwiSmN5XCI6XCJcXHUwNDE5XCIsXCJqY3lcIjpcIlxcdTA0MzlcIixcIkpmclwiOlwiXFx1RDgzNVxcdUREMERcIixcImpmclwiOlwiXFx1RDgzNVxcdUREMjdcIixcImptYXRoXCI6XCJcXHUwMjM3XCIsXCJKb3BmXCI6XCJcXHVEODM1XFx1REQ0MVwiLFwiam9wZlwiOlwiXFx1RDgzNVxcdURENUJcIixcIkpzY3JcIjpcIlxcdUQ4MzVcXHVEQ0E1XCIsXCJqc2NyXCI6XCJcXHVEODM1XFx1RENCRlwiLFwiSnNlcmN5XCI6XCJcXHUwNDA4XCIsXCJqc2VyY3lcIjpcIlxcdTA0NThcIixcIkp1a2N5XCI6XCJcXHUwNDA0XCIsXCJqdWtjeVwiOlwiXFx1MDQ1NFwiLFwiS2FwcGFcIjpcIlxcdTAzOUFcIixcImthcHBhXCI6XCJcXHUwM0JBXCIsXCJrYXBwYXZcIjpcIlxcdTAzRjBcIixcIktjZWRpbFwiOlwiXFx1MDEzNlwiLFwia2NlZGlsXCI6XCJcXHUwMTM3XCIsXCJLY3lcIjpcIlxcdTA0MUFcIixcImtjeVwiOlwiXFx1MDQzQVwiLFwiS2ZyXCI6XCJcXHVEODM1XFx1REQwRVwiLFwia2ZyXCI6XCJcXHVEODM1XFx1REQyOFwiLFwia2dyZWVuXCI6XCJcXHUwMTM4XCIsXCJLSGN5XCI6XCJcXHUwNDI1XCIsXCJraGN5XCI6XCJcXHUwNDQ1XCIsXCJLSmN5XCI6XCJcXHUwNDBDXCIsXCJramN5XCI6XCJcXHUwNDVDXCIsXCJLb3BmXCI6XCJcXHVEODM1XFx1REQ0MlwiLFwia29wZlwiOlwiXFx1RDgzNVxcdURENUNcIixcIktzY3JcIjpcIlxcdUQ4MzVcXHVEQ0E2XCIsXCJrc2NyXCI6XCJcXHVEODM1XFx1RENDMFwiLFwibEFhcnJcIjpcIlxcdTIxREFcIixcIkxhY3V0ZVwiOlwiXFx1MDEzOVwiLFwibGFjdXRlXCI6XCJcXHUwMTNBXCIsXCJsYWVtcHR5dlwiOlwiXFx1MjlCNFwiLFwibGFncmFuXCI6XCJcXHUyMTEyXCIsXCJMYW1iZGFcIjpcIlxcdTAzOUJcIixcImxhbWJkYVwiOlwiXFx1MDNCQlwiLFwibGFuZ1wiOlwiXFx1MjdFOFwiLFwiTGFuZ1wiOlwiXFx1MjdFQVwiLFwibGFuZ2RcIjpcIlxcdTI5OTFcIixcImxhbmdsZVwiOlwiXFx1MjdFOFwiLFwibGFwXCI6XCJcXHUyQTg1XCIsXCJMYXBsYWNldHJmXCI6XCJcXHUyMTEyXCIsXCJsYXF1b1wiOlwiXFx1MDBBQlwiLFwibGFycmJcIjpcIlxcdTIxRTRcIixcImxhcnJiZnNcIjpcIlxcdTI5MUZcIixcImxhcnJcIjpcIlxcdTIxOTBcIixcIkxhcnJcIjpcIlxcdTIxOUVcIixcImxBcnJcIjpcIlxcdTIxRDBcIixcImxhcnJmc1wiOlwiXFx1MjkxRFwiLFwibGFycmhrXCI6XCJcXHUyMUE5XCIsXCJsYXJybHBcIjpcIlxcdTIxQUJcIixcImxhcnJwbFwiOlwiXFx1MjkzOVwiLFwibGFycnNpbVwiOlwiXFx1Mjk3M1wiLFwibGFycnRsXCI6XCJcXHUyMUEyXCIsXCJsYXRhaWxcIjpcIlxcdTI5MTlcIixcImxBdGFpbFwiOlwiXFx1MjkxQlwiLFwibGF0XCI6XCJcXHUyQUFCXCIsXCJsYXRlXCI6XCJcXHUyQUFEXCIsXCJsYXRlc1wiOlwiXFx1MkFBRFxcdUZFMDBcIixcImxiYXJyXCI6XCJcXHUyOTBDXCIsXCJsQmFyclwiOlwiXFx1MjkwRVwiLFwibGJicmtcIjpcIlxcdTI3NzJcIixcImxicmFjZVwiOlwie1wiLFwibGJyYWNrXCI6XCJbXCIsXCJsYnJrZVwiOlwiXFx1Mjk4QlwiLFwibGJya3NsZFwiOlwiXFx1Mjk4RlwiLFwibGJya3NsdVwiOlwiXFx1Mjk4RFwiLFwiTGNhcm9uXCI6XCJcXHUwMTNEXCIsXCJsY2Fyb25cIjpcIlxcdTAxM0VcIixcIkxjZWRpbFwiOlwiXFx1MDEzQlwiLFwibGNlZGlsXCI6XCJcXHUwMTNDXCIsXCJsY2VpbFwiOlwiXFx1MjMwOFwiLFwibGN1YlwiOlwie1wiLFwiTGN5XCI6XCJcXHUwNDFCXCIsXCJsY3lcIjpcIlxcdTA0M0JcIixcImxkY2FcIjpcIlxcdTI5MzZcIixcImxkcXVvXCI6XCJcXHUyMDFDXCIsXCJsZHF1b3JcIjpcIlxcdTIwMUVcIixcImxkcmRoYXJcIjpcIlxcdTI5NjdcIixcImxkcnVzaGFyXCI6XCJcXHUyOTRCXCIsXCJsZHNoXCI6XCJcXHUyMUIyXCIsXCJsZVwiOlwiXFx1MjI2NFwiLFwibEVcIjpcIlxcdTIyNjZcIixcIkxlZnRBbmdsZUJyYWNrZXRcIjpcIlxcdTI3RThcIixcIkxlZnRBcnJvd0JhclwiOlwiXFx1MjFFNFwiLFwibGVmdGFycm93XCI6XCJcXHUyMTkwXCIsXCJMZWZ0QXJyb3dcIjpcIlxcdTIxOTBcIixcIkxlZnRhcnJvd1wiOlwiXFx1MjFEMFwiLFwiTGVmdEFycm93UmlnaHRBcnJvd1wiOlwiXFx1MjFDNlwiLFwibGVmdGFycm93dGFpbFwiOlwiXFx1MjFBMlwiLFwiTGVmdENlaWxpbmdcIjpcIlxcdTIzMDhcIixcIkxlZnREb3VibGVCcmFja2V0XCI6XCJcXHUyN0U2XCIsXCJMZWZ0RG93blRlZVZlY3RvclwiOlwiXFx1Mjk2MVwiLFwiTGVmdERvd25WZWN0b3JCYXJcIjpcIlxcdTI5NTlcIixcIkxlZnREb3duVmVjdG9yXCI6XCJcXHUyMUMzXCIsXCJMZWZ0Rmxvb3JcIjpcIlxcdTIzMEFcIixcImxlZnRoYXJwb29uZG93blwiOlwiXFx1MjFCRFwiLFwibGVmdGhhcnBvb251cFwiOlwiXFx1MjFCQ1wiLFwibGVmdGxlZnRhcnJvd3NcIjpcIlxcdTIxQzdcIixcImxlZnRyaWdodGFycm93XCI6XCJcXHUyMTk0XCIsXCJMZWZ0UmlnaHRBcnJvd1wiOlwiXFx1MjE5NFwiLFwiTGVmdHJpZ2h0YXJyb3dcIjpcIlxcdTIxRDRcIixcImxlZnRyaWdodGFycm93c1wiOlwiXFx1MjFDNlwiLFwibGVmdHJpZ2h0aGFycG9vbnNcIjpcIlxcdTIxQ0JcIixcImxlZnRyaWdodHNxdWlnYXJyb3dcIjpcIlxcdTIxQURcIixcIkxlZnRSaWdodFZlY3RvclwiOlwiXFx1Mjk0RVwiLFwiTGVmdFRlZUFycm93XCI6XCJcXHUyMUE0XCIsXCJMZWZ0VGVlXCI6XCJcXHUyMkEzXCIsXCJMZWZ0VGVlVmVjdG9yXCI6XCJcXHUyOTVBXCIsXCJsZWZ0dGhyZWV0aW1lc1wiOlwiXFx1MjJDQlwiLFwiTGVmdFRyaWFuZ2xlQmFyXCI6XCJcXHUyOUNGXCIsXCJMZWZ0VHJpYW5nbGVcIjpcIlxcdTIyQjJcIixcIkxlZnRUcmlhbmdsZUVxdWFsXCI6XCJcXHUyMkI0XCIsXCJMZWZ0VXBEb3duVmVjdG9yXCI6XCJcXHUyOTUxXCIsXCJMZWZ0VXBUZWVWZWN0b3JcIjpcIlxcdTI5NjBcIixcIkxlZnRVcFZlY3RvckJhclwiOlwiXFx1Mjk1OFwiLFwiTGVmdFVwVmVjdG9yXCI6XCJcXHUyMUJGXCIsXCJMZWZ0VmVjdG9yQmFyXCI6XCJcXHUyOTUyXCIsXCJMZWZ0VmVjdG9yXCI6XCJcXHUyMUJDXCIsXCJsRWdcIjpcIlxcdTJBOEJcIixcImxlZ1wiOlwiXFx1MjJEQVwiLFwibGVxXCI6XCJcXHUyMjY0XCIsXCJsZXFxXCI6XCJcXHUyMjY2XCIsXCJsZXFzbGFudFwiOlwiXFx1MkE3RFwiLFwibGVzY2NcIjpcIlxcdTJBQThcIixcImxlc1wiOlwiXFx1MkE3RFwiLFwibGVzZG90XCI6XCJcXHUyQTdGXCIsXCJsZXNkb3RvXCI6XCJcXHUyQTgxXCIsXCJsZXNkb3RvclwiOlwiXFx1MkE4M1wiLFwibGVzZ1wiOlwiXFx1MjJEQVxcdUZFMDBcIixcImxlc2dlc1wiOlwiXFx1MkE5M1wiLFwibGVzc2FwcHJveFwiOlwiXFx1MkE4NVwiLFwibGVzc2RvdFwiOlwiXFx1MjJENlwiLFwibGVzc2VxZ3RyXCI6XCJcXHUyMkRBXCIsXCJsZXNzZXFxZ3RyXCI6XCJcXHUyQThCXCIsXCJMZXNzRXF1YWxHcmVhdGVyXCI6XCJcXHUyMkRBXCIsXCJMZXNzRnVsbEVxdWFsXCI6XCJcXHUyMjY2XCIsXCJMZXNzR3JlYXRlclwiOlwiXFx1MjI3NlwiLFwibGVzc2d0clwiOlwiXFx1MjI3NlwiLFwiTGVzc0xlc3NcIjpcIlxcdTJBQTFcIixcImxlc3NzaW1cIjpcIlxcdTIyNzJcIixcIkxlc3NTbGFudEVxdWFsXCI6XCJcXHUyQTdEXCIsXCJMZXNzVGlsZGVcIjpcIlxcdTIyNzJcIixcImxmaXNodFwiOlwiXFx1Mjk3Q1wiLFwibGZsb29yXCI6XCJcXHUyMzBBXCIsXCJMZnJcIjpcIlxcdUQ4MzVcXHVERDBGXCIsXCJsZnJcIjpcIlxcdUQ4MzVcXHVERDI5XCIsXCJsZ1wiOlwiXFx1MjI3NlwiLFwibGdFXCI6XCJcXHUyQTkxXCIsXCJsSGFyXCI6XCJcXHUyOTYyXCIsXCJsaGFyZFwiOlwiXFx1MjFCRFwiLFwibGhhcnVcIjpcIlxcdTIxQkNcIixcImxoYXJ1bFwiOlwiXFx1Mjk2QVwiLFwibGhibGtcIjpcIlxcdTI1ODRcIixcIkxKY3lcIjpcIlxcdTA0MDlcIixcImxqY3lcIjpcIlxcdTA0NTlcIixcImxsYXJyXCI6XCJcXHUyMUM3XCIsXCJsbFwiOlwiXFx1MjI2QVwiLFwiTGxcIjpcIlxcdTIyRDhcIixcImxsY29ybmVyXCI6XCJcXHUyMzFFXCIsXCJMbGVmdGFycm93XCI6XCJcXHUyMURBXCIsXCJsbGhhcmRcIjpcIlxcdTI5NkJcIixcImxsdHJpXCI6XCJcXHUyNUZBXCIsXCJMbWlkb3RcIjpcIlxcdTAxM0ZcIixcImxtaWRvdFwiOlwiXFx1MDE0MFwiLFwibG1vdXN0YWNoZVwiOlwiXFx1MjNCMFwiLFwibG1vdXN0XCI6XCJcXHUyM0IwXCIsXCJsbmFwXCI6XCJcXHUyQTg5XCIsXCJsbmFwcHJveFwiOlwiXFx1MkE4OVwiLFwibG5lXCI6XCJcXHUyQTg3XCIsXCJsbkVcIjpcIlxcdTIyNjhcIixcImxuZXFcIjpcIlxcdTJBODdcIixcImxuZXFxXCI6XCJcXHUyMjY4XCIsXCJsbnNpbVwiOlwiXFx1MjJFNlwiLFwibG9hbmdcIjpcIlxcdTI3RUNcIixcImxvYXJyXCI6XCJcXHUyMUZEXCIsXCJsb2Jya1wiOlwiXFx1MjdFNlwiLFwibG9uZ2xlZnRhcnJvd1wiOlwiXFx1MjdGNVwiLFwiTG9uZ0xlZnRBcnJvd1wiOlwiXFx1MjdGNVwiLFwiTG9uZ2xlZnRhcnJvd1wiOlwiXFx1MjdGOFwiLFwibG9uZ2xlZnRyaWdodGFycm93XCI6XCJcXHUyN0Y3XCIsXCJMb25nTGVmdFJpZ2h0QXJyb3dcIjpcIlxcdTI3RjdcIixcIkxvbmdsZWZ0cmlnaHRhcnJvd1wiOlwiXFx1MjdGQVwiLFwibG9uZ21hcHN0b1wiOlwiXFx1MjdGQ1wiLFwibG9uZ3JpZ2h0YXJyb3dcIjpcIlxcdTI3RjZcIixcIkxvbmdSaWdodEFycm93XCI6XCJcXHUyN0Y2XCIsXCJMb25ncmlnaHRhcnJvd1wiOlwiXFx1MjdGOVwiLFwibG9vcGFycm93bGVmdFwiOlwiXFx1MjFBQlwiLFwibG9vcGFycm93cmlnaHRcIjpcIlxcdTIxQUNcIixcImxvcGFyXCI6XCJcXHUyOTg1XCIsXCJMb3BmXCI6XCJcXHVEODM1XFx1REQ0M1wiLFwibG9wZlwiOlwiXFx1RDgzNVxcdURENURcIixcImxvcGx1c1wiOlwiXFx1MkEyRFwiLFwibG90aW1lc1wiOlwiXFx1MkEzNFwiLFwibG93YXN0XCI6XCJcXHUyMjE3XCIsXCJsb3diYXJcIjpcIl9cIixcIkxvd2VyTGVmdEFycm93XCI6XCJcXHUyMTk5XCIsXCJMb3dlclJpZ2h0QXJyb3dcIjpcIlxcdTIxOThcIixcImxvelwiOlwiXFx1MjVDQVwiLFwibG96ZW5nZVwiOlwiXFx1MjVDQVwiLFwibG96ZlwiOlwiXFx1MjlFQlwiLFwibHBhclwiOlwiKFwiLFwibHBhcmx0XCI6XCJcXHUyOTkzXCIsXCJscmFyclwiOlwiXFx1MjFDNlwiLFwibHJjb3JuZXJcIjpcIlxcdTIzMUZcIixcImxyaGFyXCI6XCJcXHUyMUNCXCIsXCJscmhhcmRcIjpcIlxcdTI5NkRcIixcImxybVwiOlwiXFx1MjAwRVwiLFwibHJ0cmlcIjpcIlxcdTIyQkZcIixcImxzYXF1b1wiOlwiXFx1MjAzOVwiLFwibHNjclwiOlwiXFx1RDgzNVxcdURDQzFcIixcIkxzY3JcIjpcIlxcdTIxMTJcIixcImxzaFwiOlwiXFx1MjFCMFwiLFwiTHNoXCI6XCJcXHUyMUIwXCIsXCJsc2ltXCI6XCJcXHUyMjcyXCIsXCJsc2ltZVwiOlwiXFx1MkE4RFwiLFwibHNpbWdcIjpcIlxcdTJBOEZcIixcImxzcWJcIjpcIltcIixcImxzcXVvXCI6XCJcXHUyMDE4XCIsXCJsc3F1b3JcIjpcIlxcdTIwMUFcIixcIkxzdHJva1wiOlwiXFx1MDE0MVwiLFwibHN0cm9rXCI6XCJcXHUwMTQyXCIsXCJsdGNjXCI6XCJcXHUyQUE2XCIsXCJsdGNpclwiOlwiXFx1MkE3OVwiLFwibHRcIjpcIjxcIixcIkxUXCI6XCI8XCIsXCJMdFwiOlwiXFx1MjI2QVwiLFwibHRkb3RcIjpcIlxcdTIyRDZcIixcImx0aHJlZVwiOlwiXFx1MjJDQlwiLFwibHRpbWVzXCI6XCJcXHUyMkM5XCIsXCJsdGxhcnJcIjpcIlxcdTI5NzZcIixcImx0cXVlc3RcIjpcIlxcdTJBN0JcIixcImx0cmlcIjpcIlxcdTI1QzNcIixcImx0cmllXCI6XCJcXHUyMkI0XCIsXCJsdHJpZlwiOlwiXFx1MjVDMlwiLFwibHRyUGFyXCI6XCJcXHUyOTk2XCIsXCJsdXJkc2hhclwiOlwiXFx1Mjk0QVwiLFwibHVydWhhclwiOlwiXFx1Mjk2NlwiLFwibHZlcnRuZXFxXCI6XCJcXHUyMjY4XFx1RkUwMFwiLFwibHZuRVwiOlwiXFx1MjI2OFxcdUZFMDBcIixcIm1hY3JcIjpcIlxcdTAwQUZcIixcIm1hbGVcIjpcIlxcdTI2NDJcIixcIm1hbHRcIjpcIlxcdTI3MjBcIixcIm1hbHRlc2VcIjpcIlxcdTI3MjBcIixcIk1hcFwiOlwiXFx1MjkwNVwiLFwibWFwXCI6XCJcXHUyMUE2XCIsXCJtYXBzdG9cIjpcIlxcdTIxQTZcIixcIm1hcHN0b2Rvd25cIjpcIlxcdTIxQTdcIixcIm1hcHN0b2xlZnRcIjpcIlxcdTIxQTRcIixcIm1hcHN0b3VwXCI6XCJcXHUyMUE1XCIsXCJtYXJrZXJcIjpcIlxcdTI1QUVcIixcIm1jb21tYVwiOlwiXFx1MkEyOVwiLFwiTWN5XCI6XCJcXHUwNDFDXCIsXCJtY3lcIjpcIlxcdTA0M0NcIixcIm1kYXNoXCI6XCJcXHUyMDE0XCIsXCJtRERvdFwiOlwiXFx1MjIzQVwiLFwibWVhc3VyZWRhbmdsZVwiOlwiXFx1MjIyMVwiLFwiTWVkaXVtU3BhY2VcIjpcIlxcdTIwNUZcIixcIk1lbGxpbnRyZlwiOlwiXFx1MjEzM1wiLFwiTWZyXCI6XCJcXHVEODM1XFx1REQxMFwiLFwibWZyXCI6XCJcXHVEODM1XFx1REQyQVwiLFwibWhvXCI6XCJcXHUyMTI3XCIsXCJtaWNyb1wiOlwiXFx1MDBCNVwiLFwibWlkYXN0XCI6XCIqXCIsXCJtaWRjaXJcIjpcIlxcdTJBRjBcIixcIm1pZFwiOlwiXFx1MjIyM1wiLFwibWlkZG90XCI6XCJcXHUwMEI3XCIsXCJtaW51c2JcIjpcIlxcdTIyOUZcIixcIm1pbnVzXCI6XCJcXHUyMjEyXCIsXCJtaW51c2RcIjpcIlxcdTIyMzhcIixcIm1pbnVzZHVcIjpcIlxcdTJBMkFcIixcIk1pbnVzUGx1c1wiOlwiXFx1MjIxM1wiLFwibWxjcFwiOlwiXFx1MkFEQlwiLFwibWxkclwiOlwiXFx1MjAyNlwiLFwibW5wbHVzXCI6XCJcXHUyMjEzXCIsXCJtb2RlbHNcIjpcIlxcdTIyQTdcIixcIk1vcGZcIjpcIlxcdUQ4MzVcXHVERDQ0XCIsXCJtb3BmXCI6XCJcXHVEODM1XFx1REQ1RVwiLFwibXBcIjpcIlxcdTIyMTNcIixcIm1zY3JcIjpcIlxcdUQ4MzVcXHVEQ0MyXCIsXCJNc2NyXCI6XCJcXHUyMTMzXCIsXCJtc3Rwb3NcIjpcIlxcdTIyM0VcIixcIk11XCI6XCJcXHUwMzlDXCIsXCJtdVwiOlwiXFx1MDNCQ1wiLFwibXVsdGltYXBcIjpcIlxcdTIyQjhcIixcIm11bWFwXCI6XCJcXHUyMkI4XCIsXCJuYWJsYVwiOlwiXFx1MjIwN1wiLFwiTmFjdXRlXCI6XCJcXHUwMTQzXCIsXCJuYWN1dGVcIjpcIlxcdTAxNDRcIixcIm5hbmdcIjpcIlxcdTIyMjBcXHUyMEQyXCIsXCJuYXBcIjpcIlxcdTIyNDlcIixcIm5hcEVcIjpcIlxcdTJBNzBcXHUwMzM4XCIsXCJuYXBpZFwiOlwiXFx1MjI0QlxcdTAzMzhcIixcIm5hcG9zXCI6XCJcXHUwMTQ5XCIsXCJuYXBwcm94XCI6XCJcXHUyMjQ5XCIsXCJuYXR1cmFsXCI6XCJcXHUyNjZFXCIsXCJuYXR1cmFsc1wiOlwiXFx1MjExNVwiLFwibmF0dXJcIjpcIlxcdTI2NkVcIixcIm5ic3BcIjpcIlxcdTAwQTBcIixcIm5idW1wXCI6XCJcXHUyMjRFXFx1MDMzOFwiLFwibmJ1bXBlXCI6XCJcXHUyMjRGXFx1MDMzOFwiLFwibmNhcFwiOlwiXFx1MkE0M1wiLFwiTmNhcm9uXCI6XCJcXHUwMTQ3XCIsXCJuY2Fyb25cIjpcIlxcdTAxNDhcIixcIk5jZWRpbFwiOlwiXFx1MDE0NVwiLFwibmNlZGlsXCI6XCJcXHUwMTQ2XCIsXCJuY29uZ1wiOlwiXFx1MjI0N1wiLFwibmNvbmdkb3RcIjpcIlxcdTJBNkRcXHUwMzM4XCIsXCJuY3VwXCI6XCJcXHUyQTQyXCIsXCJOY3lcIjpcIlxcdTA0MURcIixcIm5jeVwiOlwiXFx1MDQzRFwiLFwibmRhc2hcIjpcIlxcdTIwMTNcIixcIm5lYXJoa1wiOlwiXFx1MjkyNFwiLFwibmVhcnJcIjpcIlxcdTIxOTdcIixcIm5lQXJyXCI6XCJcXHUyMUQ3XCIsXCJuZWFycm93XCI6XCJcXHUyMTk3XCIsXCJuZVwiOlwiXFx1MjI2MFwiLFwibmVkb3RcIjpcIlxcdTIyNTBcXHUwMzM4XCIsXCJOZWdhdGl2ZU1lZGl1bVNwYWNlXCI6XCJcXHUyMDBCXCIsXCJOZWdhdGl2ZVRoaWNrU3BhY2VcIjpcIlxcdTIwMEJcIixcIk5lZ2F0aXZlVGhpblNwYWNlXCI6XCJcXHUyMDBCXCIsXCJOZWdhdGl2ZVZlcnlUaGluU3BhY2VcIjpcIlxcdTIwMEJcIixcIm5lcXVpdlwiOlwiXFx1MjI2MlwiLFwibmVzZWFyXCI6XCJcXHUyOTI4XCIsXCJuZXNpbVwiOlwiXFx1MjI0MlxcdTAzMzhcIixcIk5lc3RlZEdyZWF0ZXJHcmVhdGVyXCI6XCJcXHUyMjZCXCIsXCJOZXN0ZWRMZXNzTGVzc1wiOlwiXFx1MjI2QVwiLFwiTmV3TGluZVwiOlwiXFxuXCIsXCJuZXhpc3RcIjpcIlxcdTIyMDRcIixcIm5leGlzdHNcIjpcIlxcdTIyMDRcIixcIk5mclwiOlwiXFx1RDgzNVxcdUREMTFcIixcIm5mclwiOlwiXFx1RDgzNVxcdUREMkJcIixcIm5nRVwiOlwiXFx1MjI2N1xcdTAzMzhcIixcIm5nZVwiOlwiXFx1MjI3MVwiLFwibmdlcVwiOlwiXFx1MjI3MVwiLFwibmdlcXFcIjpcIlxcdTIyNjdcXHUwMzM4XCIsXCJuZ2Vxc2xhbnRcIjpcIlxcdTJBN0VcXHUwMzM4XCIsXCJuZ2VzXCI6XCJcXHUyQTdFXFx1MDMzOFwiLFwibkdnXCI6XCJcXHUyMkQ5XFx1MDMzOFwiLFwibmdzaW1cIjpcIlxcdTIyNzVcIixcIm5HdFwiOlwiXFx1MjI2QlxcdTIwRDJcIixcIm5ndFwiOlwiXFx1MjI2RlwiLFwibmd0clwiOlwiXFx1MjI2RlwiLFwibkd0dlwiOlwiXFx1MjI2QlxcdTAzMzhcIixcIm5oYXJyXCI6XCJcXHUyMUFFXCIsXCJuaEFyclwiOlwiXFx1MjFDRVwiLFwibmhwYXJcIjpcIlxcdTJBRjJcIixcIm5pXCI6XCJcXHUyMjBCXCIsXCJuaXNcIjpcIlxcdTIyRkNcIixcIm5pc2RcIjpcIlxcdTIyRkFcIixcIm5pdlwiOlwiXFx1MjIwQlwiLFwiTkpjeVwiOlwiXFx1MDQwQVwiLFwibmpjeVwiOlwiXFx1MDQ1QVwiLFwibmxhcnJcIjpcIlxcdTIxOUFcIixcIm5sQXJyXCI6XCJcXHUyMUNEXCIsXCJubGRyXCI6XCJcXHUyMDI1XCIsXCJubEVcIjpcIlxcdTIyNjZcXHUwMzM4XCIsXCJubGVcIjpcIlxcdTIyNzBcIixcIm5sZWZ0YXJyb3dcIjpcIlxcdTIxOUFcIixcIm5MZWZ0YXJyb3dcIjpcIlxcdTIxQ0RcIixcIm5sZWZ0cmlnaHRhcnJvd1wiOlwiXFx1MjFBRVwiLFwibkxlZnRyaWdodGFycm93XCI6XCJcXHUyMUNFXCIsXCJubGVxXCI6XCJcXHUyMjcwXCIsXCJubGVxcVwiOlwiXFx1MjI2NlxcdTAzMzhcIixcIm5sZXFzbGFudFwiOlwiXFx1MkE3RFxcdTAzMzhcIixcIm5sZXNcIjpcIlxcdTJBN0RcXHUwMzM4XCIsXCJubGVzc1wiOlwiXFx1MjI2RVwiLFwibkxsXCI6XCJcXHUyMkQ4XFx1MDMzOFwiLFwibmxzaW1cIjpcIlxcdTIyNzRcIixcIm5MdFwiOlwiXFx1MjI2QVxcdTIwRDJcIixcIm5sdFwiOlwiXFx1MjI2RVwiLFwibmx0cmlcIjpcIlxcdTIyRUFcIixcIm5sdHJpZVwiOlwiXFx1MjJFQ1wiLFwibkx0dlwiOlwiXFx1MjI2QVxcdTAzMzhcIixcIm5taWRcIjpcIlxcdTIyMjRcIixcIk5vQnJlYWtcIjpcIlxcdTIwNjBcIixcIk5vbkJyZWFraW5nU3BhY2VcIjpcIlxcdTAwQTBcIixcIm5vcGZcIjpcIlxcdUQ4MzVcXHVERDVGXCIsXCJOb3BmXCI6XCJcXHUyMTE1XCIsXCJOb3RcIjpcIlxcdTJBRUNcIixcIm5vdFwiOlwiXFx1MDBBQ1wiLFwiTm90Q29uZ3J1ZW50XCI6XCJcXHUyMjYyXCIsXCJOb3RDdXBDYXBcIjpcIlxcdTIyNkRcIixcIk5vdERvdWJsZVZlcnRpY2FsQmFyXCI6XCJcXHUyMjI2XCIsXCJOb3RFbGVtZW50XCI6XCJcXHUyMjA5XCIsXCJOb3RFcXVhbFwiOlwiXFx1MjI2MFwiLFwiTm90RXF1YWxUaWxkZVwiOlwiXFx1MjI0MlxcdTAzMzhcIixcIk5vdEV4aXN0c1wiOlwiXFx1MjIwNFwiLFwiTm90R3JlYXRlclwiOlwiXFx1MjI2RlwiLFwiTm90R3JlYXRlckVxdWFsXCI6XCJcXHUyMjcxXCIsXCJOb3RHcmVhdGVyRnVsbEVxdWFsXCI6XCJcXHUyMjY3XFx1MDMzOFwiLFwiTm90R3JlYXRlckdyZWF0ZXJcIjpcIlxcdTIyNkJcXHUwMzM4XCIsXCJOb3RHcmVhdGVyTGVzc1wiOlwiXFx1MjI3OVwiLFwiTm90R3JlYXRlclNsYW50RXF1YWxcIjpcIlxcdTJBN0VcXHUwMzM4XCIsXCJOb3RHcmVhdGVyVGlsZGVcIjpcIlxcdTIyNzVcIixcIk5vdEh1bXBEb3duSHVtcFwiOlwiXFx1MjI0RVxcdTAzMzhcIixcIk5vdEh1bXBFcXVhbFwiOlwiXFx1MjI0RlxcdTAzMzhcIixcIm5vdGluXCI6XCJcXHUyMjA5XCIsXCJub3RpbmRvdFwiOlwiXFx1MjJGNVxcdTAzMzhcIixcIm5vdGluRVwiOlwiXFx1MjJGOVxcdTAzMzhcIixcIm5vdGludmFcIjpcIlxcdTIyMDlcIixcIm5vdGludmJcIjpcIlxcdTIyRjdcIixcIm5vdGludmNcIjpcIlxcdTIyRjZcIixcIk5vdExlZnRUcmlhbmdsZUJhclwiOlwiXFx1MjlDRlxcdTAzMzhcIixcIk5vdExlZnRUcmlhbmdsZVwiOlwiXFx1MjJFQVwiLFwiTm90TGVmdFRyaWFuZ2xlRXF1YWxcIjpcIlxcdTIyRUNcIixcIk5vdExlc3NcIjpcIlxcdTIyNkVcIixcIk5vdExlc3NFcXVhbFwiOlwiXFx1MjI3MFwiLFwiTm90TGVzc0dyZWF0ZXJcIjpcIlxcdTIyNzhcIixcIk5vdExlc3NMZXNzXCI6XCJcXHUyMjZBXFx1MDMzOFwiLFwiTm90TGVzc1NsYW50RXF1YWxcIjpcIlxcdTJBN0RcXHUwMzM4XCIsXCJOb3RMZXNzVGlsZGVcIjpcIlxcdTIyNzRcIixcIk5vdE5lc3RlZEdyZWF0ZXJHcmVhdGVyXCI6XCJcXHUyQUEyXFx1MDMzOFwiLFwiTm90TmVzdGVkTGVzc0xlc3NcIjpcIlxcdTJBQTFcXHUwMzM4XCIsXCJub3RuaVwiOlwiXFx1MjIwQ1wiLFwibm90bml2YVwiOlwiXFx1MjIwQ1wiLFwibm90bml2YlwiOlwiXFx1MjJGRVwiLFwibm90bml2Y1wiOlwiXFx1MjJGRFwiLFwiTm90UHJlY2VkZXNcIjpcIlxcdTIyODBcIixcIk5vdFByZWNlZGVzRXF1YWxcIjpcIlxcdTJBQUZcXHUwMzM4XCIsXCJOb3RQcmVjZWRlc1NsYW50RXF1YWxcIjpcIlxcdTIyRTBcIixcIk5vdFJldmVyc2VFbGVtZW50XCI6XCJcXHUyMjBDXCIsXCJOb3RSaWdodFRyaWFuZ2xlQmFyXCI6XCJcXHUyOUQwXFx1MDMzOFwiLFwiTm90UmlnaHRUcmlhbmdsZVwiOlwiXFx1MjJFQlwiLFwiTm90UmlnaHRUcmlhbmdsZUVxdWFsXCI6XCJcXHUyMkVEXCIsXCJOb3RTcXVhcmVTdWJzZXRcIjpcIlxcdTIyOEZcXHUwMzM4XCIsXCJOb3RTcXVhcmVTdWJzZXRFcXVhbFwiOlwiXFx1MjJFMlwiLFwiTm90U3F1YXJlU3VwZXJzZXRcIjpcIlxcdTIyOTBcXHUwMzM4XCIsXCJOb3RTcXVhcmVTdXBlcnNldEVxdWFsXCI6XCJcXHUyMkUzXCIsXCJOb3RTdWJzZXRcIjpcIlxcdTIyODJcXHUyMEQyXCIsXCJOb3RTdWJzZXRFcXVhbFwiOlwiXFx1MjI4OFwiLFwiTm90U3VjY2VlZHNcIjpcIlxcdTIyODFcIixcIk5vdFN1Y2NlZWRzRXF1YWxcIjpcIlxcdTJBQjBcXHUwMzM4XCIsXCJOb3RTdWNjZWVkc1NsYW50RXF1YWxcIjpcIlxcdTIyRTFcIixcIk5vdFN1Y2NlZWRzVGlsZGVcIjpcIlxcdTIyN0ZcXHUwMzM4XCIsXCJOb3RTdXBlcnNldFwiOlwiXFx1MjI4M1xcdTIwRDJcIixcIk5vdFN1cGVyc2V0RXF1YWxcIjpcIlxcdTIyODlcIixcIk5vdFRpbGRlXCI6XCJcXHUyMjQxXCIsXCJOb3RUaWxkZUVxdWFsXCI6XCJcXHUyMjQ0XCIsXCJOb3RUaWxkZUZ1bGxFcXVhbFwiOlwiXFx1MjI0N1wiLFwiTm90VGlsZGVUaWxkZVwiOlwiXFx1MjI0OVwiLFwiTm90VmVydGljYWxCYXJcIjpcIlxcdTIyMjRcIixcIm5wYXJhbGxlbFwiOlwiXFx1MjIyNlwiLFwibnBhclwiOlwiXFx1MjIyNlwiLFwibnBhcnNsXCI6XCJcXHUyQUZEXFx1MjBFNVwiLFwibnBhcnRcIjpcIlxcdTIyMDJcXHUwMzM4XCIsXCJucG9saW50XCI6XCJcXHUyQTE0XCIsXCJucHJcIjpcIlxcdTIyODBcIixcIm5wcmN1ZVwiOlwiXFx1MjJFMFwiLFwibnByZWNcIjpcIlxcdTIyODBcIixcIm5wcmVjZXFcIjpcIlxcdTJBQUZcXHUwMzM4XCIsXCJucHJlXCI6XCJcXHUyQUFGXFx1MDMzOFwiLFwibnJhcnJjXCI6XCJcXHUyOTMzXFx1MDMzOFwiLFwibnJhcnJcIjpcIlxcdTIxOUJcIixcIm5yQXJyXCI6XCJcXHUyMUNGXCIsXCJucmFycndcIjpcIlxcdTIxOURcXHUwMzM4XCIsXCJucmlnaHRhcnJvd1wiOlwiXFx1MjE5QlwiLFwiblJpZ2h0YXJyb3dcIjpcIlxcdTIxQ0ZcIixcIm5ydHJpXCI6XCJcXHUyMkVCXCIsXCJucnRyaWVcIjpcIlxcdTIyRURcIixcIm5zY1wiOlwiXFx1MjI4MVwiLFwibnNjY3VlXCI6XCJcXHUyMkUxXCIsXCJuc2NlXCI6XCJcXHUyQUIwXFx1MDMzOFwiLFwiTnNjclwiOlwiXFx1RDgzNVxcdURDQTlcIixcIm5zY3JcIjpcIlxcdUQ4MzVcXHVEQ0MzXCIsXCJuc2hvcnRtaWRcIjpcIlxcdTIyMjRcIixcIm5zaG9ydHBhcmFsbGVsXCI6XCJcXHUyMjI2XCIsXCJuc2ltXCI6XCJcXHUyMjQxXCIsXCJuc2ltZVwiOlwiXFx1MjI0NFwiLFwibnNpbWVxXCI6XCJcXHUyMjQ0XCIsXCJuc21pZFwiOlwiXFx1MjIyNFwiLFwibnNwYXJcIjpcIlxcdTIyMjZcIixcIm5zcXN1YmVcIjpcIlxcdTIyRTJcIixcIm5zcXN1cGVcIjpcIlxcdTIyRTNcIixcIm5zdWJcIjpcIlxcdTIyODRcIixcIm5zdWJFXCI6XCJcXHUyQUM1XFx1MDMzOFwiLFwibnN1YmVcIjpcIlxcdTIyODhcIixcIm5zdWJzZXRcIjpcIlxcdTIyODJcXHUyMEQyXCIsXCJuc3Vic2V0ZXFcIjpcIlxcdTIyODhcIixcIm5zdWJzZXRlcXFcIjpcIlxcdTJBQzVcXHUwMzM4XCIsXCJuc3VjY1wiOlwiXFx1MjI4MVwiLFwibnN1Y2NlcVwiOlwiXFx1MkFCMFxcdTAzMzhcIixcIm5zdXBcIjpcIlxcdTIyODVcIixcIm5zdXBFXCI6XCJcXHUyQUM2XFx1MDMzOFwiLFwibnN1cGVcIjpcIlxcdTIyODlcIixcIm5zdXBzZXRcIjpcIlxcdTIyODNcXHUyMEQyXCIsXCJuc3Vwc2V0ZXFcIjpcIlxcdTIyODlcIixcIm5zdXBzZXRlcXFcIjpcIlxcdTJBQzZcXHUwMzM4XCIsXCJudGdsXCI6XCJcXHUyMjc5XCIsXCJOdGlsZGVcIjpcIlxcdTAwRDFcIixcIm50aWxkZVwiOlwiXFx1MDBGMVwiLFwibnRsZ1wiOlwiXFx1MjI3OFwiLFwibnRyaWFuZ2xlbGVmdFwiOlwiXFx1MjJFQVwiLFwibnRyaWFuZ2xlbGVmdGVxXCI6XCJcXHUyMkVDXCIsXCJudHJpYW5nbGVyaWdodFwiOlwiXFx1MjJFQlwiLFwibnRyaWFuZ2xlcmlnaHRlcVwiOlwiXFx1MjJFRFwiLFwiTnVcIjpcIlxcdTAzOURcIixcIm51XCI6XCJcXHUwM0JEXCIsXCJudW1cIjpcIiNcIixcIm51bWVyb1wiOlwiXFx1MjExNlwiLFwibnVtc3BcIjpcIlxcdTIwMDdcIixcIm52YXBcIjpcIlxcdTIyNERcXHUyMEQyXCIsXCJudmRhc2hcIjpcIlxcdTIyQUNcIixcIm52RGFzaFwiOlwiXFx1MjJBRFwiLFwiblZkYXNoXCI6XCJcXHUyMkFFXCIsXCJuVkRhc2hcIjpcIlxcdTIyQUZcIixcIm52Z2VcIjpcIlxcdTIyNjVcXHUyMEQyXCIsXCJudmd0XCI6XCI+XFx1MjBEMlwiLFwibnZIYXJyXCI6XCJcXHUyOTA0XCIsXCJudmluZmluXCI6XCJcXHUyOURFXCIsXCJudmxBcnJcIjpcIlxcdTI5MDJcIixcIm52bGVcIjpcIlxcdTIyNjRcXHUyMEQyXCIsXCJudmx0XCI6XCI8XFx1MjBEMlwiLFwibnZsdHJpZVwiOlwiXFx1MjJCNFxcdTIwRDJcIixcIm52ckFyclwiOlwiXFx1MjkwM1wiLFwibnZydHJpZVwiOlwiXFx1MjJCNVxcdTIwRDJcIixcIm52c2ltXCI6XCJcXHUyMjNDXFx1MjBEMlwiLFwibndhcmhrXCI6XCJcXHUyOTIzXCIsXCJud2FyclwiOlwiXFx1MjE5NlwiLFwibndBcnJcIjpcIlxcdTIxRDZcIixcIm53YXJyb3dcIjpcIlxcdTIxOTZcIixcIm53bmVhclwiOlwiXFx1MjkyN1wiLFwiT2FjdXRlXCI6XCJcXHUwMEQzXCIsXCJvYWN1dGVcIjpcIlxcdTAwRjNcIixcIm9hc3RcIjpcIlxcdTIyOUJcIixcIk9jaXJjXCI6XCJcXHUwMEQ0XCIsXCJvY2lyY1wiOlwiXFx1MDBGNFwiLFwib2NpclwiOlwiXFx1MjI5QVwiLFwiT2N5XCI6XCJcXHUwNDFFXCIsXCJvY3lcIjpcIlxcdTA0M0VcIixcIm9kYXNoXCI6XCJcXHUyMjlEXCIsXCJPZGJsYWNcIjpcIlxcdTAxNTBcIixcIm9kYmxhY1wiOlwiXFx1MDE1MVwiLFwib2RpdlwiOlwiXFx1MkEzOFwiLFwib2RvdFwiOlwiXFx1MjI5OVwiLFwib2Rzb2xkXCI6XCJcXHUyOUJDXCIsXCJPRWxpZ1wiOlwiXFx1MDE1MlwiLFwib2VsaWdcIjpcIlxcdTAxNTNcIixcIm9mY2lyXCI6XCJcXHUyOUJGXCIsXCJPZnJcIjpcIlxcdUQ4MzVcXHVERDEyXCIsXCJvZnJcIjpcIlxcdUQ4MzVcXHVERDJDXCIsXCJvZ29uXCI6XCJcXHUwMkRCXCIsXCJPZ3JhdmVcIjpcIlxcdTAwRDJcIixcIm9ncmF2ZVwiOlwiXFx1MDBGMlwiLFwib2d0XCI6XCJcXHUyOUMxXCIsXCJvaGJhclwiOlwiXFx1MjlCNVwiLFwib2htXCI6XCJcXHUwM0E5XCIsXCJvaW50XCI6XCJcXHUyMjJFXCIsXCJvbGFyclwiOlwiXFx1MjFCQVwiLFwib2xjaXJcIjpcIlxcdTI5QkVcIixcIm9sY3Jvc3NcIjpcIlxcdTI5QkJcIixcIm9saW5lXCI6XCJcXHUyMDNFXCIsXCJvbHRcIjpcIlxcdTI5QzBcIixcIk9tYWNyXCI6XCJcXHUwMTRDXCIsXCJvbWFjclwiOlwiXFx1MDE0RFwiLFwiT21lZ2FcIjpcIlxcdTAzQTlcIixcIm9tZWdhXCI6XCJcXHUwM0M5XCIsXCJPbWljcm9uXCI6XCJcXHUwMzlGXCIsXCJvbWljcm9uXCI6XCJcXHUwM0JGXCIsXCJvbWlkXCI6XCJcXHUyOUI2XCIsXCJvbWludXNcIjpcIlxcdTIyOTZcIixcIk9vcGZcIjpcIlxcdUQ4MzVcXHVERDQ2XCIsXCJvb3BmXCI6XCJcXHVEODM1XFx1REQ2MFwiLFwib3BhclwiOlwiXFx1MjlCN1wiLFwiT3BlbkN1cmx5RG91YmxlUXVvdGVcIjpcIlxcdTIwMUNcIixcIk9wZW5DdXJseVF1b3RlXCI6XCJcXHUyMDE4XCIsXCJvcGVycFwiOlwiXFx1MjlCOVwiLFwib3BsdXNcIjpcIlxcdTIyOTVcIixcIm9yYXJyXCI6XCJcXHUyMUJCXCIsXCJPclwiOlwiXFx1MkE1NFwiLFwib3JcIjpcIlxcdTIyMjhcIixcIm9yZFwiOlwiXFx1MkE1RFwiLFwib3JkZXJcIjpcIlxcdTIxMzRcIixcIm9yZGVyb2ZcIjpcIlxcdTIxMzRcIixcIm9yZGZcIjpcIlxcdTAwQUFcIixcIm9yZG1cIjpcIlxcdTAwQkFcIixcIm9yaWdvZlwiOlwiXFx1MjJCNlwiLFwib3JvclwiOlwiXFx1MkE1NlwiLFwib3JzbG9wZVwiOlwiXFx1MkE1N1wiLFwib3J2XCI6XCJcXHUyQTVCXCIsXCJvU1wiOlwiXFx1MjRDOFwiLFwiT3NjclwiOlwiXFx1RDgzNVxcdURDQUFcIixcIm9zY3JcIjpcIlxcdTIxMzRcIixcIk9zbGFzaFwiOlwiXFx1MDBEOFwiLFwib3NsYXNoXCI6XCJcXHUwMEY4XCIsXCJvc29sXCI6XCJcXHUyMjk4XCIsXCJPdGlsZGVcIjpcIlxcdTAwRDVcIixcIm90aWxkZVwiOlwiXFx1MDBGNVwiLFwib3RpbWVzYXNcIjpcIlxcdTJBMzZcIixcIk90aW1lc1wiOlwiXFx1MkEzN1wiLFwib3RpbWVzXCI6XCJcXHUyMjk3XCIsXCJPdW1sXCI6XCJcXHUwMEQ2XCIsXCJvdW1sXCI6XCJcXHUwMEY2XCIsXCJvdmJhclwiOlwiXFx1MjMzRFwiLFwiT3ZlckJhclwiOlwiXFx1MjAzRVwiLFwiT3ZlckJyYWNlXCI6XCJcXHUyM0RFXCIsXCJPdmVyQnJhY2tldFwiOlwiXFx1MjNCNFwiLFwiT3ZlclBhcmVudGhlc2lzXCI6XCJcXHUyM0RDXCIsXCJwYXJhXCI6XCJcXHUwMEI2XCIsXCJwYXJhbGxlbFwiOlwiXFx1MjIyNVwiLFwicGFyXCI6XCJcXHUyMjI1XCIsXCJwYXJzaW1cIjpcIlxcdTJBRjNcIixcInBhcnNsXCI6XCJcXHUyQUZEXCIsXCJwYXJ0XCI6XCJcXHUyMjAyXCIsXCJQYXJ0aWFsRFwiOlwiXFx1MjIwMlwiLFwiUGN5XCI6XCJcXHUwNDFGXCIsXCJwY3lcIjpcIlxcdTA0M0ZcIixcInBlcmNudFwiOlwiJVwiLFwicGVyaW9kXCI6XCIuXCIsXCJwZXJtaWxcIjpcIlxcdTIwMzBcIixcInBlcnBcIjpcIlxcdTIyQTVcIixcInBlcnRlbmtcIjpcIlxcdTIwMzFcIixcIlBmclwiOlwiXFx1RDgzNVxcdUREMTNcIixcInBmclwiOlwiXFx1RDgzNVxcdUREMkRcIixcIlBoaVwiOlwiXFx1MDNBNlwiLFwicGhpXCI6XCJcXHUwM0M2XCIsXCJwaGl2XCI6XCJcXHUwM0Q1XCIsXCJwaG1tYXRcIjpcIlxcdTIxMzNcIixcInBob25lXCI6XCJcXHUyNjBFXCIsXCJQaVwiOlwiXFx1MDNBMFwiLFwicGlcIjpcIlxcdTAzQzBcIixcInBpdGNoZm9ya1wiOlwiXFx1MjJENFwiLFwicGl2XCI6XCJcXHUwM0Q2XCIsXCJwbGFuY2tcIjpcIlxcdTIxMEZcIixcInBsYW5ja2hcIjpcIlxcdTIxMEVcIixcInBsYW5rdlwiOlwiXFx1MjEwRlwiLFwicGx1c2FjaXJcIjpcIlxcdTJBMjNcIixcInBsdXNiXCI6XCJcXHUyMjlFXCIsXCJwbHVzY2lyXCI6XCJcXHUyQTIyXCIsXCJwbHVzXCI6XCIrXCIsXCJwbHVzZG9cIjpcIlxcdTIyMTRcIixcInBsdXNkdVwiOlwiXFx1MkEyNVwiLFwicGx1c2VcIjpcIlxcdTJBNzJcIixcIlBsdXNNaW51c1wiOlwiXFx1MDBCMVwiLFwicGx1c21uXCI6XCJcXHUwMEIxXCIsXCJwbHVzc2ltXCI6XCJcXHUyQTI2XCIsXCJwbHVzdHdvXCI6XCJcXHUyQTI3XCIsXCJwbVwiOlwiXFx1MDBCMVwiLFwiUG9pbmNhcmVwbGFuZVwiOlwiXFx1MjEwQ1wiLFwicG9pbnRpbnRcIjpcIlxcdTJBMTVcIixcInBvcGZcIjpcIlxcdUQ4MzVcXHVERDYxXCIsXCJQb3BmXCI6XCJcXHUyMTE5XCIsXCJwb3VuZFwiOlwiXFx1MDBBM1wiLFwicHJhcFwiOlwiXFx1MkFCN1wiLFwiUHJcIjpcIlxcdTJBQkJcIixcInByXCI6XCJcXHUyMjdBXCIsXCJwcmN1ZVwiOlwiXFx1MjI3Q1wiLFwicHJlY2FwcHJveFwiOlwiXFx1MkFCN1wiLFwicHJlY1wiOlwiXFx1MjI3QVwiLFwicHJlY2N1cmx5ZXFcIjpcIlxcdTIyN0NcIixcIlByZWNlZGVzXCI6XCJcXHUyMjdBXCIsXCJQcmVjZWRlc0VxdWFsXCI6XCJcXHUyQUFGXCIsXCJQcmVjZWRlc1NsYW50RXF1YWxcIjpcIlxcdTIyN0NcIixcIlByZWNlZGVzVGlsZGVcIjpcIlxcdTIyN0VcIixcInByZWNlcVwiOlwiXFx1MkFBRlwiLFwicHJlY25hcHByb3hcIjpcIlxcdTJBQjlcIixcInByZWNuZXFxXCI6XCJcXHUyQUI1XCIsXCJwcmVjbnNpbVwiOlwiXFx1MjJFOFwiLFwicHJlXCI6XCJcXHUyQUFGXCIsXCJwckVcIjpcIlxcdTJBQjNcIixcInByZWNzaW1cIjpcIlxcdTIyN0VcIixcInByaW1lXCI6XCJcXHUyMDMyXCIsXCJQcmltZVwiOlwiXFx1MjAzM1wiLFwicHJpbWVzXCI6XCJcXHUyMTE5XCIsXCJwcm5hcFwiOlwiXFx1MkFCOVwiLFwicHJuRVwiOlwiXFx1MkFCNVwiLFwicHJuc2ltXCI6XCJcXHUyMkU4XCIsXCJwcm9kXCI6XCJcXHUyMjBGXCIsXCJQcm9kdWN0XCI6XCJcXHUyMjBGXCIsXCJwcm9mYWxhclwiOlwiXFx1MjMyRVwiLFwicHJvZmxpbmVcIjpcIlxcdTIzMTJcIixcInByb2ZzdXJmXCI6XCJcXHUyMzEzXCIsXCJwcm9wXCI6XCJcXHUyMjFEXCIsXCJQcm9wb3J0aW9uYWxcIjpcIlxcdTIyMURcIixcIlByb3BvcnRpb25cIjpcIlxcdTIyMzdcIixcInByb3B0b1wiOlwiXFx1MjIxRFwiLFwicHJzaW1cIjpcIlxcdTIyN0VcIixcInBydXJlbFwiOlwiXFx1MjJCMFwiLFwiUHNjclwiOlwiXFx1RDgzNVxcdURDQUJcIixcInBzY3JcIjpcIlxcdUQ4MzVcXHVEQ0M1XCIsXCJQc2lcIjpcIlxcdTAzQThcIixcInBzaVwiOlwiXFx1MDNDOFwiLFwicHVuY3NwXCI6XCJcXHUyMDA4XCIsXCJRZnJcIjpcIlxcdUQ4MzVcXHVERDE0XCIsXCJxZnJcIjpcIlxcdUQ4MzVcXHVERDJFXCIsXCJxaW50XCI6XCJcXHUyQTBDXCIsXCJxb3BmXCI6XCJcXHVEODM1XFx1REQ2MlwiLFwiUW9wZlwiOlwiXFx1MjExQVwiLFwicXByaW1lXCI6XCJcXHUyMDU3XCIsXCJRc2NyXCI6XCJcXHVEODM1XFx1RENBQ1wiLFwicXNjclwiOlwiXFx1RDgzNVxcdURDQzZcIixcInF1YXRlcm5pb25zXCI6XCJcXHUyMTBEXCIsXCJxdWF0aW50XCI6XCJcXHUyQTE2XCIsXCJxdWVzdFwiOlwiP1wiLFwicXVlc3RlcVwiOlwiXFx1MjI1RlwiLFwicXVvdFwiOlwiXFxcIlwiLFwiUVVPVFwiOlwiXFxcIlwiLFwickFhcnJcIjpcIlxcdTIxREJcIixcInJhY2VcIjpcIlxcdTIyM0RcXHUwMzMxXCIsXCJSYWN1dGVcIjpcIlxcdTAxNTRcIixcInJhY3V0ZVwiOlwiXFx1MDE1NVwiLFwicmFkaWNcIjpcIlxcdTIyMUFcIixcInJhZW1wdHl2XCI6XCJcXHUyOUIzXCIsXCJyYW5nXCI6XCJcXHUyN0U5XCIsXCJSYW5nXCI6XCJcXHUyN0VCXCIsXCJyYW5nZFwiOlwiXFx1Mjk5MlwiLFwicmFuZ2VcIjpcIlxcdTI5QTVcIixcInJhbmdsZVwiOlwiXFx1MjdFOVwiLFwicmFxdW9cIjpcIlxcdTAwQkJcIixcInJhcnJhcFwiOlwiXFx1Mjk3NVwiLFwicmFycmJcIjpcIlxcdTIxRTVcIixcInJhcnJiZnNcIjpcIlxcdTI5MjBcIixcInJhcnJjXCI6XCJcXHUyOTMzXCIsXCJyYXJyXCI6XCJcXHUyMTkyXCIsXCJSYXJyXCI6XCJcXHUyMUEwXCIsXCJyQXJyXCI6XCJcXHUyMUQyXCIsXCJyYXJyZnNcIjpcIlxcdTI5MUVcIixcInJhcnJoa1wiOlwiXFx1MjFBQVwiLFwicmFycmxwXCI6XCJcXHUyMUFDXCIsXCJyYXJycGxcIjpcIlxcdTI5NDVcIixcInJhcnJzaW1cIjpcIlxcdTI5NzRcIixcIlJhcnJ0bFwiOlwiXFx1MjkxNlwiLFwicmFycnRsXCI6XCJcXHUyMUEzXCIsXCJyYXJyd1wiOlwiXFx1MjE5RFwiLFwicmF0YWlsXCI6XCJcXHUyOTFBXCIsXCJyQXRhaWxcIjpcIlxcdTI5MUNcIixcInJhdGlvXCI6XCJcXHUyMjM2XCIsXCJyYXRpb25hbHNcIjpcIlxcdTIxMUFcIixcInJiYXJyXCI6XCJcXHUyOTBEXCIsXCJyQmFyclwiOlwiXFx1MjkwRlwiLFwiUkJhcnJcIjpcIlxcdTI5MTBcIixcInJiYnJrXCI6XCJcXHUyNzczXCIsXCJyYnJhY2VcIjpcIn1cIixcInJicmFja1wiOlwiXVwiLFwicmJya2VcIjpcIlxcdTI5OENcIixcInJicmtzbGRcIjpcIlxcdTI5OEVcIixcInJicmtzbHVcIjpcIlxcdTI5OTBcIixcIlJjYXJvblwiOlwiXFx1MDE1OFwiLFwicmNhcm9uXCI6XCJcXHUwMTU5XCIsXCJSY2VkaWxcIjpcIlxcdTAxNTZcIixcInJjZWRpbFwiOlwiXFx1MDE1N1wiLFwicmNlaWxcIjpcIlxcdTIzMDlcIixcInJjdWJcIjpcIn1cIixcIlJjeVwiOlwiXFx1MDQyMFwiLFwicmN5XCI6XCJcXHUwNDQwXCIsXCJyZGNhXCI6XCJcXHUyOTM3XCIsXCJyZGxkaGFyXCI6XCJcXHUyOTY5XCIsXCJyZHF1b1wiOlwiXFx1MjAxRFwiLFwicmRxdW9yXCI6XCJcXHUyMDFEXCIsXCJyZHNoXCI6XCJcXHUyMUIzXCIsXCJyZWFsXCI6XCJcXHUyMTFDXCIsXCJyZWFsaW5lXCI6XCJcXHUyMTFCXCIsXCJyZWFscGFydFwiOlwiXFx1MjExQ1wiLFwicmVhbHNcIjpcIlxcdTIxMURcIixcIlJlXCI6XCJcXHUyMTFDXCIsXCJyZWN0XCI6XCJcXHUyNUFEXCIsXCJyZWdcIjpcIlxcdTAwQUVcIixcIlJFR1wiOlwiXFx1MDBBRVwiLFwiUmV2ZXJzZUVsZW1lbnRcIjpcIlxcdTIyMEJcIixcIlJldmVyc2VFcXVpbGlicml1bVwiOlwiXFx1MjFDQlwiLFwiUmV2ZXJzZVVwRXF1aWxpYnJpdW1cIjpcIlxcdTI5NkZcIixcInJmaXNodFwiOlwiXFx1Mjk3RFwiLFwicmZsb29yXCI6XCJcXHUyMzBCXCIsXCJyZnJcIjpcIlxcdUQ4MzVcXHVERDJGXCIsXCJSZnJcIjpcIlxcdTIxMUNcIixcInJIYXJcIjpcIlxcdTI5NjRcIixcInJoYXJkXCI6XCJcXHUyMUMxXCIsXCJyaGFydVwiOlwiXFx1MjFDMFwiLFwicmhhcnVsXCI6XCJcXHUyOTZDXCIsXCJSaG9cIjpcIlxcdTAzQTFcIixcInJob1wiOlwiXFx1MDNDMVwiLFwicmhvdlwiOlwiXFx1MDNGMVwiLFwiUmlnaHRBbmdsZUJyYWNrZXRcIjpcIlxcdTI3RTlcIixcIlJpZ2h0QXJyb3dCYXJcIjpcIlxcdTIxRTVcIixcInJpZ2h0YXJyb3dcIjpcIlxcdTIxOTJcIixcIlJpZ2h0QXJyb3dcIjpcIlxcdTIxOTJcIixcIlJpZ2h0YXJyb3dcIjpcIlxcdTIxRDJcIixcIlJpZ2h0QXJyb3dMZWZ0QXJyb3dcIjpcIlxcdTIxQzRcIixcInJpZ2h0YXJyb3d0YWlsXCI6XCJcXHUyMUEzXCIsXCJSaWdodENlaWxpbmdcIjpcIlxcdTIzMDlcIixcIlJpZ2h0RG91YmxlQnJhY2tldFwiOlwiXFx1MjdFN1wiLFwiUmlnaHREb3duVGVlVmVjdG9yXCI6XCJcXHUyOTVEXCIsXCJSaWdodERvd25WZWN0b3JCYXJcIjpcIlxcdTI5NTVcIixcIlJpZ2h0RG93blZlY3RvclwiOlwiXFx1MjFDMlwiLFwiUmlnaHRGbG9vclwiOlwiXFx1MjMwQlwiLFwicmlnaHRoYXJwb29uZG93blwiOlwiXFx1MjFDMVwiLFwicmlnaHRoYXJwb29udXBcIjpcIlxcdTIxQzBcIixcInJpZ2h0bGVmdGFycm93c1wiOlwiXFx1MjFDNFwiLFwicmlnaHRsZWZ0aGFycG9vbnNcIjpcIlxcdTIxQ0NcIixcInJpZ2h0cmlnaHRhcnJvd3NcIjpcIlxcdTIxQzlcIixcInJpZ2h0c3F1aWdhcnJvd1wiOlwiXFx1MjE5RFwiLFwiUmlnaHRUZWVBcnJvd1wiOlwiXFx1MjFBNlwiLFwiUmlnaHRUZWVcIjpcIlxcdTIyQTJcIixcIlJpZ2h0VGVlVmVjdG9yXCI6XCJcXHUyOTVCXCIsXCJyaWdodHRocmVldGltZXNcIjpcIlxcdTIyQ0NcIixcIlJpZ2h0VHJpYW5nbGVCYXJcIjpcIlxcdTI5RDBcIixcIlJpZ2h0VHJpYW5nbGVcIjpcIlxcdTIyQjNcIixcIlJpZ2h0VHJpYW5nbGVFcXVhbFwiOlwiXFx1MjJCNVwiLFwiUmlnaHRVcERvd25WZWN0b3JcIjpcIlxcdTI5NEZcIixcIlJpZ2h0VXBUZWVWZWN0b3JcIjpcIlxcdTI5NUNcIixcIlJpZ2h0VXBWZWN0b3JCYXJcIjpcIlxcdTI5NTRcIixcIlJpZ2h0VXBWZWN0b3JcIjpcIlxcdTIxQkVcIixcIlJpZ2h0VmVjdG9yQmFyXCI6XCJcXHUyOTUzXCIsXCJSaWdodFZlY3RvclwiOlwiXFx1MjFDMFwiLFwicmluZ1wiOlwiXFx1MDJEQVwiLFwicmlzaW5nZG90c2VxXCI6XCJcXHUyMjUzXCIsXCJybGFyclwiOlwiXFx1MjFDNFwiLFwicmxoYXJcIjpcIlxcdTIxQ0NcIixcInJsbVwiOlwiXFx1MjAwRlwiLFwicm1vdXN0YWNoZVwiOlwiXFx1MjNCMVwiLFwicm1vdXN0XCI6XCJcXHUyM0IxXCIsXCJybm1pZFwiOlwiXFx1MkFFRVwiLFwicm9hbmdcIjpcIlxcdTI3RURcIixcInJvYXJyXCI6XCJcXHUyMUZFXCIsXCJyb2Jya1wiOlwiXFx1MjdFN1wiLFwicm9wYXJcIjpcIlxcdTI5ODZcIixcInJvcGZcIjpcIlxcdUQ4MzVcXHVERDYzXCIsXCJSb3BmXCI6XCJcXHUyMTFEXCIsXCJyb3BsdXNcIjpcIlxcdTJBMkVcIixcInJvdGltZXNcIjpcIlxcdTJBMzVcIixcIlJvdW5kSW1wbGllc1wiOlwiXFx1Mjk3MFwiLFwicnBhclwiOlwiKVwiLFwicnBhcmd0XCI6XCJcXHUyOTk0XCIsXCJycHBvbGludFwiOlwiXFx1MkExMlwiLFwicnJhcnJcIjpcIlxcdTIxQzlcIixcIlJyaWdodGFycm93XCI6XCJcXHUyMURCXCIsXCJyc2FxdW9cIjpcIlxcdTIwM0FcIixcInJzY3JcIjpcIlxcdUQ4MzVcXHVEQ0M3XCIsXCJSc2NyXCI6XCJcXHUyMTFCXCIsXCJyc2hcIjpcIlxcdTIxQjFcIixcIlJzaFwiOlwiXFx1MjFCMVwiLFwicnNxYlwiOlwiXVwiLFwicnNxdW9cIjpcIlxcdTIwMTlcIixcInJzcXVvclwiOlwiXFx1MjAxOVwiLFwicnRocmVlXCI6XCJcXHUyMkNDXCIsXCJydGltZXNcIjpcIlxcdTIyQ0FcIixcInJ0cmlcIjpcIlxcdTI1QjlcIixcInJ0cmllXCI6XCJcXHUyMkI1XCIsXCJydHJpZlwiOlwiXFx1MjVCOFwiLFwicnRyaWx0cmlcIjpcIlxcdTI5Q0VcIixcIlJ1bGVEZWxheWVkXCI6XCJcXHUyOUY0XCIsXCJydWx1aGFyXCI6XCJcXHUyOTY4XCIsXCJyeFwiOlwiXFx1MjExRVwiLFwiU2FjdXRlXCI6XCJcXHUwMTVBXCIsXCJzYWN1dGVcIjpcIlxcdTAxNUJcIixcInNicXVvXCI6XCJcXHUyMDFBXCIsXCJzY2FwXCI6XCJcXHUyQUI4XCIsXCJTY2Fyb25cIjpcIlxcdTAxNjBcIixcInNjYXJvblwiOlwiXFx1MDE2MVwiLFwiU2NcIjpcIlxcdTJBQkNcIixcInNjXCI6XCJcXHUyMjdCXCIsXCJzY2N1ZVwiOlwiXFx1MjI3RFwiLFwic2NlXCI6XCJcXHUyQUIwXCIsXCJzY0VcIjpcIlxcdTJBQjRcIixcIlNjZWRpbFwiOlwiXFx1MDE1RVwiLFwic2NlZGlsXCI6XCJcXHUwMTVGXCIsXCJTY2lyY1wiOlwiXFx1MDE1Q1wiLFwic2NpcmNcIjpcIlxcdTAxNURcIixcInNjbmFwXCI6XCJcXHUyQUJBXCIsXCJzY25FXCI6XCJcXHUyQUI2XCIsXCJzY25zaW1cIjpcIlxcdTIyRTlcIixcInNjcG9saW50XCI6XCJcXHUyQTEzXCIsXCJzY3NpbVwiOlwiXFx1MjI3RlwiLFwiU2N5XCI6XCJcXHUwNDIxXCIsXCJzY3lcIjpcIlxcdTA0NDFcIixcInNkb3RiXCI6XCJcXHUyMkExXCIsXCJzZG90XCI6XCJcXHUyMkM1XCIsXCJzZG90ZVwiOlwiXFx1MkE2NlwiLFwic2VhcmhrXCI6XCJcXHUyOTI1XCIsXCJzZWFyclwiOlwiXFx1MjE5OFwiLFwic2VBcnJcIjpcIlxcdTIxRDhcIixcInNlYXJyb3dcIjpcIlxcdTIxOThcIixcInNlY3RcIjpcIlxcdTAwQTdcIixcInNlbWlcIjpcIjtcIixcInNlc3dhclwiOlwiXFx1MjkyOVwiLFwic2V0bWludXNcIjpcIlxcdTIyMTZcIixcInNldG1uXCI6XCJcXHUyMjE2XCIsXCJzZXh0XCI6XCJcXHUyNzM2XCIsXCJTZnJcIjpcIlxcdUQ4MzVcXHVERDE2XCIsXCJzZnJcIjpcIlxcdUQ4MzVcXHVERDMwXCIsXCJzZnJvd25cIjpcIlxcdTIzMjJcIixcInNoYXJwXCI6XCJcXHUyNjZGXCIsXCJTSENIY3lcIjpcIlxcdTA0MjlcIixcInNoY2hjeVwiOlwiXFx1MDQ0OVwiLFwiU0hjeVwiOlwiXFx1MDQyOFwiLFwic2hjeVwiOlwiXFx1MDQ0OFwiLFwiU2hvcnREb3duQXJyb3dcIjpcIlxcdTIxOTNcIixcIlNob3J0TGVmdEFycm93XCI6XCJcXHUyMTkwXCIsXCJzaG9ydG1pZFwiOlwiXFx1MjIyM1wiLFwic2hvcnRwYXJhbGxlbFwiOlwiXFx1MjIyNVwiLFwiU2hvcnRSaWdodEFycm93XCI6XCJcXHUyMTkyXCIsXCJTaG9ydFVwQXJyb3dcIjpcIlxcdTIxOTFcIixcInNoeVwiOlwiXFx1MDBBRFwiLFwiU2lnbWFcIjpcIlxcdTAzQTNcIixcInNpZ21hXCI6XCJcXHUwM0MzXCIsXCJzaWdtYWZcIjpcIlxcdTAzQzJcIixcInNpZ21hdlwiOlwiXFx1MDNDMlwiLFwic2ltXCI6XCJcXHUyMjNDXCIsXCJzaW1kb3RcIjpcIlxcdTJBNkFcIixcInNpbWVcIjpcIlxcdTIyNDNcIixcInNpbWVxXCI6XCJcXHUyMjQzXCIsXCJzaW1nXCI6XCJcXHUyQTlFXCIsXCJzaW1nRVwiOlwiXFx1MkFBMFwiLFwic2ltbFwiOlwiXFx1MkE5RFwiLFwic2ltbEVcIjpcIlxcdTJBOUZcIixcInNpbW5lXCI6XCJcXHUyMjQ2XCIsXCJzaW1wbHVzXCI6XCJcXHUyQTI0XCIsXCJzaW1yYXJyXCI6XCJcXHUyOTcyXCIsXCJzbGFyclwiOlwiXFx1MjE5MFwiLFwiU21hbGxDaXJjbGVcIjpcIlxcdTIyMThcIixcInNtYWxsc2V0bWludXNcIjpcIlxcdTIyMTZcIixcInNtYXNocFwiOlwiXFx1MkEzM1wiLFwic21lcGFyc2xcIjpcIlxcdTI5RTRcIixcInNtaWRcIjpcIlxcdTIyMjNcIixcInNtaWxlXCI6XCJcXHUyMzIzXCIsXCJzbXRcIjpcIlxcdTJBQUFcIixcInNtdGVcIjpcIlxcdTJBQUNcIixcInNtdGVzXCI6XCJcXHUyQUFDXFx1RkUwMFwiLFwiU09GVGN5XCI6XCJcXHUwNDJDXCIsXCJzb2Z0Y3lcIjpcIlxcdTA0NENcIixcInNvbGJhclwiOlwiXFx1MjMzRlwiLFwic29sYlwiOlwiXFx1MjlDNFwiLFwic29sXCI6XCIvXCIsXCJTb3BmXCI6XCJcXHVEODM1XFx1REQ0QVwiLFwic29wZlwiOlwiXFx1RDgzNVxcdURENjRcIixcInNwYWRlc1wiOlwiXFx1MjY2MFwiLFwic3BhZGVzdWl0XCI6XCJcXHUyNjYwXCIsXCJzcGFyXCI6XCJcXHUyMjI1XCIsXCJzcWNhcFwiOlwiXFx1MjI5M1wiLFwic3FjYXBzXCI6XCJcXHUyMjkzXFx1RkUwMFwiLFwic3FjdXBcIjpcIlxcdTIyOTRcIixcInNxY3Vwc1wiOlwiXFx1MjI5NFxcdUZFMDBcIixcIlNxcnRcIjpcIlxcdTIyMUFcIixcInNxc3ViXCI6XCJcXHUyMjhGXCIsXCJzcXN1YmVcIjpcIlxcdTIyOTFcIixcInNxc3Vic2V0XCI6XCJcXHUyMjhGXCIsXCJzcXN1YnNldGVxXCI6XCJcXHUyMjkxXCIsXCJzcXN1cFwiOlwiXFx1MjI5MFwiLFwic3FzdXBlXCI6XCJcXHUyMjkyXCIsXCJzcXN1cHNldFwiOlwiXFx1MjI5MFwiLFwic3FzdXBzZXRlcVwiOlwiXFx1MjI5MlwiLFwic3F1YXJlXCI6XCJcXHUyNUExXCIsXCJTcXVhcmVcIjpcIlxcdTI1QTFcIixcIlNxdWFyZUludGVyc2VjdGlvblwiOlwiXFx1MjI5M1wiLFwiU3F1YXJlU3Vic2V0XCI6XCJcXHUyMjhGXCIsXCJTcXVhcmVTdWJzZXRFcXVhbFwiOlwiXFx1MjI5MVwiLFwiU3F1YXJlU3VwZXJzZXRcIjpcIlxcdTIyOTBcIixcIlNxdWFyZVN1cGVyc2V0RXF1YWxcIjpcIlxcdTIyOTJcIixcIlNxdWFyZVVuaW9uXCI6XCJcXHUyMjk0XCIsXCJzcXVhcmZcIjpcIlxcdTI1QUFcIixcInNxdVwiOlwiXFx1MjVBMVwiLFwic3F1ZlwiOlwiXFx1MjVBQVwiLFwic3JhcnJcIjpcIlxcdTIxOTJcIixcIlNzY3JcIjpcIlxcdUQ4MzVcXHVEQ0FFXCIsXCJzc2NyXCI6XCJcXHVEODM1XFx1RENDOFwiLFwic3NldG1uXCI6XCJcXHUyMjE2XCIsXCJzc21pbGVcIjpcIlxcdTIzMjNcIixcInNzdGFyZlwiOlwiXFx1MjJDNlwiLFwiU3RhclwiOlwiXFx1MjJDNlwiLFwic3RhclwiOlwiXFx1MjYwNlwiLFwic3RhcmZcIjpcIlxcdTI2MDVcIixcInN0cmFpZ2h0ZXBzaWxvblwiOlwiXFx1MDNGNVwiLFwic3RyYWlnaHRwaGlcIjpcIlxcdTAzRDVcIixcInN0cm5zXCI6XCJcXHUwMEFGXCIsXCJzdWJcIjpcIlxcdTIyODJcIixcIlN1YlwiOlwiXFx1MjJEMFwiLFwic3ViZG90XCI6XCJcXHUyQUJEXCIsXCJzdWJFXCI6XCJcXHUyQUM1XCIsXCJzdWJlXCI6XCJcXHUyMjg2XCIsXCJzdWJlZG90XCI6XCJcXHUyQUMzXCIsXCJzdWJtdWx0XCI6XCJcXHUyQUMxXCIsXCJzdWJuRVwiOlwiXFx1MkFDQlwiLFwic3VibmVcIjpcIlxcdTIyOEFcIixcInN1YnBsdXNcIjpcIlxcdTJBQkZcIixcInN1YnJhcnJcIjpcIlxcdTI5NzlcIixcInN1YnNldFwiOlwiXFx1MjI4MlwiLFwiU3Vic2V0XCI6XCJcXHUyMkQwXCIsXCJzdWJzZXRlcVwiOlwiXFx1MjI4NlwiLFwic3Vic2V0ZXFxXCI6XCJcXHUyQUM1XCIsXCJTdWJzZXRFcXVhbFwiOlwiXFx1MjI4NlwiLFwic3Vic2V0bmVxXCI6XCJcXHUyMjhBXCIsXCJzdWJzZXRuZXFxXCI6XCJcXHUyQUNCXCIsXCJzdWJzaW1cIjpcIlxcdTJBQzdcIixcInN1YnN1YlwiOlwiXFx1MkFENVwiLFwic3Vic3VwXCI6XCJcXHUyQUQzXCIsXCJzdWNjYXBwcm94XCI6XCJcXHUyQUI4XCIsXCJzdWNjXCI6XCJcXHUyMjdCXCIsXCJzdWNjY3VybHllcVwiOlwiXFx1MjI3RFwiLFwiU3VjY2VlZHNcIjpcIlxcdTIyN0JcIixcIlN1Y2NlZWRzRXF1YWxcIjpcIlxcdTJBQjBcIixcIlN1Y2NlZWRzU2xhbnRFcXVhbFwiOlwiXFx1MjI3RFwiLFwiU3VjY2VlZHNUaWxkZVwiOlwiXFx1MjI3RlwiLFwic3VjY2VxXCI6XCJcXHUyQUIwXCIsXCJzdWNjbmFwcHJveFwiOlwiXFx1MkFCQVwiLFwic3VjY25lcXFcIjpcIlxcdTJBQjZcIixcInN1Y2Nuc2ltXCI6XCJcXHUyMkU5XCIsXCJzdWNjc2ltXCI6XCJcXHUyMjdGXCIsXCJTdWNoVGhhdFwiOlwiXFx1MjIwQlwiLFwic3VtXCI6XCJcXHUyMjExXCIsXCJTdW1cIjpcIlxcdTIyMTFcIixcInN1bmdcIjpcIlxcdTI2NkFcIixcInN1cDFcIjpcIlxcdTAwQjlcIixcInN1cDJcIjpcIlxcdTAwQjJcIixcInN1cDNcIjpcIlxcdTAwQjNcIixcInN1cFwiOlwiXFx1MjI4M1wiLFwiU3VwXCI6XCJcXHUyMkQxXCIsXCJzdXBkb3RcIjpcIlxcdTJBQkVcIixcInN1cGRzdWJcIjpcIlxcdTJBRDhcIixcInN1cEVcIjpcIlxcdTJBQzZcIixcInN1cGVcIjpcIlxcdTIyODdcIixcInN1cGVkb3RcIjpcIlxcdTJBQzRcIixcIlN1cGVyc2V0XCI6XCJcXHUyMjgzXCIsXCJTdXBlcnNldEVxdWFsXCI6XCJcXHUyMjg3XCIsXCJzdXBoc29sXCI6XCJcXHUyN0M5XCIsXCJzdXBoc3ViXCI6XCJcXHUyQUQ3XCIsXCJzdXBsYXJyXCI6XCJcXHUyOTdCXCIsXCJzdXBtdWx0XCI6XCJcXHUyQUMyXCIsXCJzdXBuRVwiOlwiXFx1MkFDQ1wiLFwic3VwbmVcIjpcIlxcdTIyOEJcIixcInN1cHBsdXNcIjpcIlxcdTJBQzBcIixcInN1cHNldFwiOlwiXFx1MjI4M1wiLFwiU3Vwc2V0XCI6XCJcXHUyMkQxXCIsXCJzdXBzZXRlcVwiOlwiXFx1MjI4N1wiLFwic3Vwc2V0ZXFxXCI6XCJcXHUyQUM2XCIsXCJzdXBzZXRuZXFcIjpcIlxcdTIyOEJcIixcInN1cHNldG5lcXFcIjpcIlxcdTJBQ0NcIixcInN1cHNpbVwiOlwiXFx1MkFDOFwiLFwic3Vwc3ViXCI6XCJcXHUyQUQ0XCIsXCJzdXBzdXBcIjpcIlxcdTJBRDZcIixcInN3YXJoa1wiOlwiXFx1MjkyNlwiLFwic3dhcnJcIjpcIlxcdTIxOTlcIixcInN3QXJyXCI6XCJcXHUyMUQ5XCIsXCJzd2Fycm93XCI6XCJcXHUyMTk5XCIsXCJzd253YXJcIjpcIlxcdTI5MkFcIixcInN6bGlnXCI6XCJcXHUwMERGXCIsXCJUYWJcIjpcIlxcdFwiLFwidGFyZ2V0XCI6XCJcXHUyMzE2XCIsXCJUYXVcIjpcIlxcdTAzQTRcIixcInRhdVwiOlwiXFx1MDNDNFwiLFwidGJya1wiOlwiXFx1MjNCNFwiLFwiVGNhcm9uXCI6XCJcXHUwMTY0XCIsXCJ0Y2Fyb25cIjpcIlxcdTAxNjVcIixcIlRjZWRpbFwiOlwiXFx1MDE2MlwiLFwidGNlZGlsXCI6XCJcXHUwMTYzXCIsXCJUY3lcIjpcIlxcdTA0MjJcIixcInRjeVwiOlwiXFx1MDQ0MlwiLFwidGRvdFwiOlwiXFx1MjBEQlwiLFwidGVscmVjXCI6XCJcXHUyMzE1XCIsXCJUZnJcIjpcIlxcdUQ4MzVcXHVERDE3XCIsXCJ0ZnJcIjpcIlxcdUQ4MzVcXHVERDMxXCIsXCJ0aGVyZTRcIjpcIlxcdTIyMzRcIixcInRoZXJlZm9yZVwiOlwiXFx1MjIzNFwiLFwiVGhlcmVmb3JlXCI6XCJcXHUyMjM0XCIsXCJUaGV0YVwiOlwiXFx1MDM5OFwiLFwidGhldGFcIjpcIlxcdTAzQjhcIixcInRoZXRhc3ltXCI6XCJcXHUwM0QxXCIsXCJ0aGV0YXZcIjpcIlxcdTAzRDFcIixcInRoaWNrYXBwcm94XCI6XCJcXHUyMjQ4XCIsXCJ0aGlja3NpbVwiOlwiXFx1MjIzQ1wiLFwiVGhpY2tTcGFjZVwiOlwiXFx1MjA1RlxcdTIwMEFcIixcIlRoaW5TcGFjZVwiOlwiXFx1MjAwOVwiLFwidGhpbnNwXCI6XCJcXHUyMDA5XCIsXCJ0aGthcFwiOlwiXFx1MjI0OFwiLFwidGhrc2ltXCI6XCJcXHUyMjNDXCIsXCJUSE9STlwiOlwiXFx1MDBERVwiLFwidGhvcm5cIjpcIlxcdTAwRkVcIixcInRpbGRlXCI6XCJcXHUwMkRDXCIsXCJUaWxkZVwiOlwiXFx1MjIzQ1wiLFwiVGlsZGVFcXVhbFwiOlwiXFx1MjI0M1wiLFwiVGlsZGVGdWxsRXF1YWxcIjpcIlxcdTIyNDVcIixcIlRpbGRlVGlsZGVcIjpcIlxcdTIyNDhcIixcInRpbWVzYmFyXCI6XCJcXHUyQTMxXCIsXCJ0aW1lc2JcIjpcIlxcdTIyQTBcIixcInRpbWVzXCI6XCJcXHUwMEQ3XCIsXCJ0aW1lc2RcIjpcIlxcdTJBMzBcIixcInRpbnRcIjpcIlxcdTIyMkRcIixcInRvZWFcIjpcIlxcdTI5MjhcIixcInRvcGJvdFwiOlwiXFx1MjMzNlwiLFwidG9wY2lyXCI6XCJcXHUyQUYxXCIsXCJ0b3BcIjpcIlxcdTIyQTRcIixcIlRvcGZcIjpcIlxcdUQ4MzVcXHVERDRCXCIsXCJ0b3BmXCI6XCJcXHVEODM1XFx1REQ2NVwiLFwidG9wZm9ya1wiOlwiXFx1MkFEQVwiLFwidG9zYVwiOlwiXFx1MjkyOVwiLFwidHByaW1lXCI6XCJcXHUyMDM0XCIsXCJ0cmFkZVwiOlwiXFx1MjEyMlwiLFwiVFJBREVcIjpcIlxcdTIxMjJcIixcInRyaWFuZ2xlXCI6XCJcXHUyNUI1XCIsXCJ0cmlhbmdsZWRvd25cIjpcIlxcdTI1QkZcIixcInRyaWFuZ2xlbGVmdFwiOlwiXFx1MjVDM1wiLFwidHJpYW5nbGVsZWZ0ZXFcIjpcIlxcdTIyQjRcIixcInRyaWFuZ2xlcVwiOlwiXFx1MjI1Q1wiLFwidHJpYW5nbGVyaWdodFwiOlwiXFx1MjVCOVwiLFwidHJpYW5nbGVyaWdodGVxXCI6XCJcXHUyMkI1XCIsXCJ0cmlkb3RcIjpcIlxcdTI1RUNcIixcInRyaWVcIjpcIlxcdTIyNUNcIixcInRyaW1pbnVzXCI6XCJcXHUyQTNBXCIsXCJUcmlwbGVEb3RcIjpcIlxcdTIwREJcIixcInRyaXBsdXNcIjpcIlxcdTJBMzlcIixcInRyaXNiXCI6XCJcXHUyOUNEXCIsXCJ0cml0aW1lXCI6XCJcXHUyQTNCXCIsXCJ0cnBleml1bVwiOlwiXFx1MjNFMlwiLFwiVHNjclwiOlwiXFx1RDgzNVxcdURDQUZcIixcInRzY3JcIjpcIlxcdUQ4MzVcXHVEQ0M5XCIsXCJUU2N5XCI6XCJcXHUwNDI2XCIsXCJ0c2N5XCI6XCJcXHUwNDQ2XCIsXCJUU0hjeVwiOlwiXFx1MDQwQlwiLFwidHNoY3lcIjpcIlxcdTA0NUJcIixcIlRzdHJva1wiOlwiXFx1MDE2NlwiLFwidHN0cm9rXCI6XCJcXHUwMTY3XCIsXCJ0d2l4dFwiOlwiXFx1MjI2Q1wiLFwidHdvaGVhZGxlZnRhcnJvd1wiOlwiXFx1MjE5RVwiLFwidHdvaGVhZHJpZ2h0YXJyb3dcIjpcIlxcdTIxQTBcIixcIlVhY3V0ZVwiOlwiXFx1MDBEQVwiLFwidWFjdXRlXCI6XCJcXHUwMEZBXCIsXCJ1YXJyXCI6XCJcXHUyMTkxXCIsXCJVYXJyXCI6XCJcXHUyMTlGXCIsXCJ1QXJyXCI6XCJcXHUyMUQxXCIsXCJVYXJyb2NpclwiOlwiXFx1Mjk0OVwiLFwiVWJyY3lcIjpcIlxcdTA0MEVcIixcInVicmN5XCI6XCJcXHUwNDVFXCIsXCJVYnJldmVcIjpcIlxcdTAxNkNcIixcInVicmV2ZVwiOlwiXFx1MDE2RFwiLFwiVWNpcmNcIjpcIlxcdTAwREJcIixcInVjaXJjXCI6XCJcXHUwMEZCXCIsXCJVY3lcIjpcIlxcdTA0MjNcIixcInVjeVwiOlwiXFx1MDQ0M1wiLFwidWRhcnJcIjpcIlxcdTIxQzVcIixcIlVkYmxhY1wiOlwiXFx1MDE3MFwiLFwidWRibGFjXCI6XCJcXHUwMTcxXCIsXCJ1ZGhhclwiOlwiXFx1Mjk2RVwiLFwidWZpc2h0XCI6XCJcXHUyOTdFXCIsXCJVZnJcIjpcIlxcdUQ4MzVcXHVERDE4XCIsXCJ1ZnJcIjpcIlxcdUQ4MzVcXHVERDMyXCIsXCJVZ3JhdmVcIjpcIlxcdTAwRDlcIixcInVncmF2ZVwiOlwiXFx1MDBGOVwiLFwidUhhclwiOlwiXFx1Mjk2M1wiLFwidWhhcmxcIjpcIlxcdTIxQkZcIixcInVoYXJyXCI6XCJcXHUyMUJFXCIsXCJ1aGJsa1wiOlwiXFx1MjU4MFwiLFwidWxjb3JuXCI6XCJcXHUyMzFDXCIsXCJ1bGNvcm5lclwiOlwiXFx1MjMxQ1wiLFwidWxjcm9wXCI6XCJcXHUyMzBGXCIsXCJ1bHRyaVwiOlwiXFx1MjVGOFwiLFwiVW1hY3JcIjpcIlxcdTAxNkFcIixcInVtYWNyXCI6XCJcXHUwMTZCXCIsXCJ1bWxcIjpcIlxcdTAwQThcIixcIlVuZGVyQmFyXCI6XCJfXCIsXCJVbmRlckJyYWNlXCI6XCJcXHUyM0RGXCIsXCJVbmRlckJyYWNrZXRcIjpcIlxcdTIzQjVcIixcIlVuZGVyUGFyZW50aGVzaXNcIjpcIlxcdTIzRERcIixcIlVuaW9uXCI6XCJcXHUyMkMzXCIsXCJVbmlvblBsdXNcIjpcIlxcdTIyOEVcIixcIlVvZ29uXCI6XCJcXHUwMTcyXCIsXCJ1b2dvblwiOlwiXFx1MDE3M1wiLFwiVW9wZlwiOlwiXFx1RDgzNVxcdURENENcIixcInVvcGZcIjpcIlxcdUQ4MzVcXHVERDY2XCIsXCJVcEFycm93QmFyXCI6XCJcXHUyOTEyXCIsXCJ1cGFycm93XCI6XCJcXHUyMTkxXCIsXCJVcEFycm93XCI6XCJcXHUyMTkxXCIsXCJVcGFycm93XCI6XCJcXHUyMUQxXCIsXCJVcEFycm93RG93bkFycm93XCI6XCJcXHUyMUM1XCIsXCJ1cGRvd25hcnJvd1wiOlwiXFx1MjE5NVwiLFwiVXBEb3duQXJyb3dcIjpcIlxcdTIxOTVcIixcIlVwZG93bmFycm93XCI6XCJcXHUyMUQ1XCIsXCJVcEVxdWlsaWJyaXVtXCI6XCJcXHUyOTZFXCIsXCJ1cGhhcnBvb25sZWZ0XCI6XCJcXHUyMUJGXCIsXCJ1cGhhcnBvb25yaWdodFwiOlwiXFx1MjFCRVwiLFwidXBsdXNcIjpcIlxcdTIyOEVcIixcIlVwcGVyTGVmdEFycm93XCI6XCJcXHUyMTk2XCIsXCJVcHBlclJpZ2h0QXJyb3dcIjpcIlxcdTIxOTdcIixcInVwc2lcIjpcIlxcdTAzQzVcIixcIlVwc2lcIjpcIlxcdTAzRDJcIixcInVwc2loXCI6XCJcXHUwM0QyXCIsXCJVcHNpbG9uXCI6XCJcXHUwM0E1XCIsXCJ1cHNpbG9uXCI6XCJcXHUwM0M1XCIsXCJVcFRlZUFycm93XCI6XCJcXHUyMUE1XCIsXCJVcFRlZVwiOlwiXFx1MjJBNVwiLFwidXB1cGFycm93c1wiOlwiXFx1MjFDOFwiLFwidXJjb3JuXCI6XCJcXHUyMzFEXCIsXCJ1cmNvcm5lclwiOlwiXFx1MjMxRFwiLFwidXJjcm9wXCI6XCJcXHUyMzBFXCIsXCJVcmluZ1wiOlwiXFx1MDE2RVwiLFwidXJpbmdcIjpcIlxcdTAxNkZcIixcInVydHJpXCI6XCJcXHUyNUY5XCIsXCJVc2NyXCI6XCJcXHVEODM1XFx1RENCMFwiLFwidXNjclwiOlwiXFx1RDgzNVxcdURDQ0FcIixcInV0ZG90XCI6XCJcXHUyMkYwXCIsXCJVdGlsZGVcIjpcIlxcdTAxNjhcIixcInV0aWxkZVwiOlwiXFx1MDE2OVwiLFwidXRyaVwiOlwiXFx1MjVCNVwiLFwidXRyaWZcIjpcIlxcdTI1QjRcIixcInV1YXJyXCI6XCJcXHUyMUM4XCIsXCJVdW1sXCI6XCJcXHUwMERDXCIsXCJ1dW1sXCI6XCJcXHUwMEZDXCIsXCJ1d2FuZ2xlXCI6XCJcXHUyOUE3XCIsXCJ2YW5ncnRcIjpcIlxcdTI5OUNcIixcInZhcmVwc2lsb25cIjpcIlxcdTAzRjVcIixcInZhcmthcHBhXCI6XCJcXHUwM0YwXCIsXCJ2YXJub3RoaW5nXCI6XCJcXHUyMjA1XCIsXCJ2YXJwaGlcIjpcIlxcdTAzRDVcIixcInZhcnBpXCI6XCJcXHUwM0Q2XCIsXCJ2YXJwcm9wdG9cIjpcIlxcdTIyMURcIixcInZhcnJcIjpcIlxcdTIxOTVcIixcInZBcnJcIjpcIlxcdTIxRDVcIixcInZhcnJob1wiOlwiXFx1MDNGMVwiLFwidmFyc2lnbWFcIjpcIlxcdTAzQzJcIixcInZhcnN1YnNldG5lcVwiOlwiXFx1MjI4QVxcdUZFMDBcIixcInZhcnN1YnNldG5lcXFcIjpcIlxcdTJBQ0JcXHVGRTAwXCIsXCJ2YXJzdXBzZXRuZXFcIjpcIlxcdTIyOEJcXHVGRTAwXCIsXCJ2YXJzdXBzZXRuZXFxXCI6XCJcXHUyQUNDXFx1RkUwMFwiLFwidmFydGhldGFcIjpcIlxcdTAzRDFcIixcInZhcnRyaWFuZ2xlbGVmdFwiOlwiXFx1MjJCMlwiLFwidmFydHJpYW5nbGVyaWdodFwiOlwiXFx1MjJCM1wiLFwidkJhclwiOlwiXFx1MkFFOFwiLFwiVmJhclwiOlwiXFx1MkFFQlwiLFwidkJhcnZcIjpcIlxcdTJBRTlcIixcIlZjeVwiOlwiXFx1MDQxMlwiLFwidmN5XCI6XCJcXHUwNDMyXCIsXCJ2ZGFzaFwiOlwiXFx1MjJBMlwiLFwidkRhc2hcIjpcIlxcdTIyQThcIixcIlZkYXNoXCI6XCJcXHUyMkE5XCIsXCJWRGFzaFwiOlwiXFx1MjJBQlwiLFwiVmRhc2hsXCI6XCJcXHUyQUU2XCIsXCJ2ZWViYXJcIjpcIlxcdTIyQkJcIixcInZlZVwiOlwiXFx1MjIyOFwiLFwiVmVlXCI6XCJcXHUyMkMxXCIsXCJ2ZWVlcVwiOlwiXFx1MjI1QVwiLFwidmVsbGlwXCI6XCJcXHUyMkVFXCIsXCJ2ZXJiYXJcIjpcInxcIixcIlZlcmJhclwiOlwiXFx1MjAxNlwiLFwidmVydFwiOlwifFwiLFwiVmVydFwiOlwiXFx1MjAxNlwiLFwiVmVydGljYWxCYXJcIjpcIlxcdTIyMjNcIixcIlZlcnRpY2FsTGluZVwiOlwifFwiLFwiVmVydGljYWxTZXBhcmF0b3JcIjpcIlxcdTI3NThcIixcIlZlcnRpY2FsVGlsZGVcIjpcIlxcdTIyNDBcIixcIlZlcnlUaGluU3BhY2VcIjpcIlxcdTIwMEFcIixcIlZmclwiOlwiXFx1RDgzNVxcdUREMTlcIixcInZmclwiOlwiXFx1RDgzNVxcdUREMzNcIixcInZsdHJpXCI6XCJcXHUyMkIyXCIsXCJ2bnN1YlwiOlwiXFx1MjI4MlxcdTIwRDJcIixcInZuc3VwXCI6XCJcXHUyMjgzXFx1MjBEMlwiLFwiVm9wZlwiOlwiXFx1RDgzNVxcdURENERcIixcInZvcGZcIjpcIlxcdUQ4MzVcXHVERDY3XCIsXCJ2cHJvcFwiOlwiXFx1MjIxRFwiLFwidnJ0cmlcIjpcIlxcdTIyQjNcIixcIlZzY3JcIjpcIlxcdUQ4MzVcXHVEQ0IxXCIsXCJ2c2NyXCI6XCJcXHVEODM1XFx1RENDQlwiLFwidnN1Ym5FXCI6XCJcXHUyQUNCXFx1RkUwMFwiLFwidnN1Ym5lXCI6XCJcXHUyMjhBXFx1RkUwMFwiLFwidnN1cG5FXCI6XCJcXHUyQUNDXFx1RkUwMFwiLFwidnN1cG5lXCI6XCJcXHUyMjhCXFx1RkUwMFwiLFwiVnZkYXNoXCI6XCJcXHUyMkFBXCIsXCJ2emlnemFnXCI6XCJcXHUyOTlBXCIsXCJXY2lyY1wiOlwiXFx1MDE3NFwiLFwid2NpcmNcIjpcIlxcdTAxNzVcIixcIndlZGJhclwiOlwiXFx1MkE1RlwiLFwid2VkZ2VcIjpcIlxcdTIyMjdcIixcIldlZGdlXCI6XCJcXHUyMkMwXCIsXCJ3ZWRnZXFcIjpcIlxcdTIyNTlcIixcIndlaWVycFwiOlwiXFx1MjExOFwiLFwiV2ZyXCI6XCJcXHVEODM1XFx1REQxQVwiLFwid2ZyXCI6XCJcXHVEODM1XFx1REQzNFwiLFwiV29wZlwiOlwiXFx1RDgzNVxcdURENEVcIixcIndvcGZcIjpcIlxcdUQ4MzVcXHVERDY4XCIsXCJ3cFwiOlwiXFx1MjExOFwiLFwid3JcIjpcIlxcdTIyNDBcIixcIndyZWF0aFwiOlwiXFx1MjI0MFwiLFwiV3NjclwiOlwiXFx1RDgzNVxcdURDQjJcIixcIndzY3JcIjpcIlxcdUQ4MzVcXHVEQ0NDXCIsXCJ4Y2FwXCI6XCJcXHUyMkMyXCIsXCJ4Y2lyY1wiOlwiXFx1MjVFRlwiLFwieGN1cFwiOlwiXFx1MjJDM1wiLFwieGR0cmlcIjpcIlxcdTI1QkRcIixcIlhmclwiOlwiXFx1RDgzNVxcdUREMUJcIixcInhmclwiOlwiXFx1RDgzNVxcdUREMzVcIixcInhoYXJyXCI6XCJcXHUyN0Y3XCIsXCJ4aEFyclwiOlwiXFx1MjdGQVwiLFwiWGlcIjpcIlxcdTAzOUVcIixcInhpXCI6XCJcXHUwM0JFXCIsXCJ4bGFyclwiOlwiXFx1MjdGNVwiLFwieGxBcnJcIjpcIlxcdTI3RjhcIixcInhtYXBcIjpcIlxcdTI3RkNcIixcInhuaXNcIjpcIlxcdTIyRkJcIixcInhvZG90XCI6XCJcXHUyQTAwXCIsXCJYb3BmXCI6XCJcXHVEODM1XFx1REQ0RlwiLFwieG9wZlwiOlwiXFx1RDgzNVxcdURENjlcIixcInhvcGx1c1wiOlwiXFx1MkEwMVwiLFwieG90aW1lXCI6XCJcXHUyQTAyXCIsXCJ4cmFyclwiOlwiXFx1MjdGNlwiLFwieHJBcnJcIjpcIlxcdTI3RjlcIixcIlhzY3JcIjpcIlxcdUQ4MzVcXHVEQ0IzXCIsXCJ4c2NyXCI6XCJcXHVEODM1XFx1RENDRFwiLFwieHNxY3VwXCI6XCJcXHUyQTA2XCIsXCJ4dXBsdXNcIjpcIlxcdTJBMDRcIixcInh1dHJpXCI6XCJcXHUyNUIzXCIsXCJ4dmVlXCI6XCJcXHUyMkMxXCIsXCJ4d2VkZ2VcIjpcIlxcdTIyQzBcIixcIllhY3V0ZVwiOlwiXFx1MDBERFwiLFwieWFjdXRlXCI6XCJcXHUwMEZEXCIsXCJZQWN5XCI6XCJcXHUwNDJGXCIsXCJ5YWN5XCI6XCJcXHUwNDRGXCIsXCJZY2lyY1wiOlwiXFx1MDE3NlwiLFwieWNpcmNcIjpcIlxcdTAxNzdcIixcIlljeVwiOlwiXFx1MDQyQlwiLFwieWN5XCI6XCJcXHUwNDRCXCIsXCJ5ZW5cIjpcIlxcdTAwQTVcIixcIllmclwiOlwiXFx1RDgzNVxcdUREMUNcIixcInlmclwiOlwiXFx1RDgzNVxcdUREMzZcIixcIllJY3lcIjpcIlxcdTA0MDdcIixcInlpY3lcIjpcIlxcdTA0NTdcIixcIllvcGZcIjpcIlxcdUQ4MzVcXHVERDUwXCIsXCJ5b3BmXCI6XCJcXHVEODM1XFx1REQ2QVwiLFwiWXNjclwiOlwiXFx1RDgzNVxcdURDQjRcIixcInlzY3JcIjpcIlxcdUQ4MzVcXHVEQ0NFXCIsXCJZVWN5XCI6XCJcXHUwNDJFXCIsXCJ5dWN5XCI6XCJcXHUwNDRFXCIsXCJ5dW1sXCI6XCJcXHUwMEZGXCIsXCJZdW1sXCI6XCJcXHUwMTc4XCIsXCJaYWN1dGVcIjpcIlxcdTAxNzlcIixcInphY3V0ZVwiOlwiXFx1MDE3QVwiLFwiWmNhcm9uXCI6XCJcXHUwMTdEXCIsXCJ6Y2Fyb25cIjpcIlxcdTAxN0VcIixcIlpjeVwiOlwiXFx1MDQxN1wiLFwiemN5XCI6XCJcXHUwNDM3XCIsXCJaZG90XCI6XCJcXHUwMTdCXCIsXCJ6ZG90XCI6XCJcXHUwMTdDXCIsXCJ6ZWV0cmZcIjpcIlxcdTIxMjhcIixcIlplcm9XaWR0aFNwYWNlXCI6XCJcXHUyMDBCXCIsXCJaZXRhXCI6XCJcXHUwMzk2XCIsXCJ6ZXRhXCI6XCJcXHUwM0I2XCIsXCJ6ZnJcIjpcIlxcdUQ4MzVcXHVERDM3XCIsXCJaZnJcIjpcIlxcdTIxMjhcIixcIlpIY3lcIjpcIlxcdTA0MTZcIixcInpoY3lcIjpcIlxcdTA0MzZcIixcInppZ3JhcnJcIjpcIlxcdTIxRERcIixcInpvcGZcIjpcIlxcdUQ4MzVcXHVERDZCXCIsXCJab3BmXCI6XCJcXHUyMTI0XCIsXCJac2NyXCI6XCJcXHVEODM1XFx1RENCNVwiLFwienNjclwiOlwiXFx1RDgzNVxcdURDQ0ZcIixcInp3alwiOlwiXFx1MjAwRFwiLFwiendualwiOlwiXFx1MjAwQ1wifSIsIid1c2Ugc3RyaWN0JztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gSGVscGVyc1xuXG4vLyBNZXJnZSBvYmplY3RzXG4vL1xuZnVuY3Rpb24gYXNzaWduKG9iaiAvKmZyb20xLCBmcm9tMiwgZnJvbTMsIC4uLiovKSB7XG4gIHZhciBzb3VyY2VzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuICBzb3VyY2VzLmZvckVhY2goZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgIGlmICghc291cmNlKSB7IHJldHVybjsgfVxuXG4gICAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIG9ialtrZXldID0gc291cmNlW2tleV07XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBvYmo7XG59XG5cbmZ1bmN0aW9uIF9jbGFzcyhvYmopIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopOyB9XG5mdW5jdGlvbiBpc1N0cmluZyhvYmopIHsgcmV0dXJuIF9jbGFzcyhvYmopID09PSAnW29iamVjdCBTdHJpbmddJzsgfVxuZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7IHJldHVybiBfY2xhc3Mob2JqKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7IH1cbmZ1bmN0aW9uIGlzUmVnRXhwKG9iaikgeyByZXR1cm4gX2NsYXNzKG9iaikgPT09ICdbb2JqZWN0IFJlZ0V4cF0nOyB9XG5mdW5jdGlvbiBpc0Z1bmN0aW9uKG9iaikgeyByZXR1cm4gX2NsYXNzKG9iaikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7IH1cblxuXG5mdW5jdGlvbiBlc2NhcGVSRSAoc3RyKSB7IHJldHVybiBzdHIucmVwbGFjZSgvWy4/KiteJFtcXF1cXFxcKCl7fXwtXS9nLCAnXFxcXCQmJyk7IH1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG52YXIgZGVmYXVsdE9wdGlvbnMgPSB7XG4gIGZ1enp5TGluazogdHJ1ZSxcbiAgZnV6enlFbWFpbDogdHJ1ZSxcbiAgZnV6enlJUDogZmFsc2Vcbn07XG5cblxuZnVuY3Rpb24gaXNPcHRpb25zT2JqKG9iaikge1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqIHx8IHt9KS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgaykge1xuICAgIHJldHVybiBhY2MgfHwgZGVmYXVsdE9wdGlvbnMuaGFzT3duUHJvcGVydHkoayk7XG4gIH0sIGZhbHNlKTtcbn1cblxuXG52YXIgZGVmYXVsdFNjaGVtYXMgPSB7XG4gICdodHRwOic6IHtcbiAgICB2YWxpZGF0ZTogZnVuY3Rpb24gKHRleHQsIHBvcywgc2VsZikge1xuICAgICAgdmFyIHRhaWwgPSB0ZXh0LnNsaWNlKHBvcyk7XG5cbiAgICAgIGlmICghc2VsZi5yZS5odHRwKSB7XG4gICAgICAgIC8vIGNvbXBpbGUgbGF6aWx5LCBiZWNhdXNlIFwiaG9zdFwiLWNvbnRhaW5pbmcgdmFyaWFibGVzIGNhbiBjaGFuZ2Ugb24gdGxkcyB1cGRhdGUuXG4gICAgICAgIHNlbGYucmUuaHR0cCA9ICBuZXcgUmVnRXhwKFxuICAgICAgICAgICdeXFxcXC9cXFxcLycgKyBzZWxmLnJlLnNyY19hdXRoICsgc2VsZi5yZS5zcmNfaG9zdF9wb3J0X3N0cmljdCArIHNlbGYucmUuc3JjX3BhdGgsICdpJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKHNlbGYucmUuaHR0cC50ZXN0KHRhaWwpKSB7XG4gICAgICAgIHJldHVybiB0YWlsLm1hdGNoKHNlbGYucmUuaHR0cClbMF0ubGVuZ3RoO1xuICAgICAgfVxuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICB9LFxuICAnaHR0cHM6JzogICdodHRwOicsXG4gICdmdHA6JzogICAgJ2h0dHA6JyxcbiAgJy8vJzogICAgICB7XG4gICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh0ZXh0LCBwb3MsIHNlbGYpIHtcbiAgICAgIHZhciB0YWlsID0gdGV4dC5zbGljZShwb3MpO1xuXG4gICAgICBpZiAoIXNlbGYucmUubm9faHR0cCkge1xuICAgICAgLy8gY29tcGlsZSBsYXppbHksIGJlY2F5c2UgXCJob3N0XCItY29udGFpbmluZyB2YXJpYWJsZXMgY2FuIGNoYW5nZSBvbiB0bGRzIHVwZGF0ZS5cbiAgICAgICAgc2VsZi5yZS5ub19odHRwID0gIG5ldyBSZWdFeHAoXG4gICAgICAgICAgJ14nICsgc2VsZi5yZS5zcmNfYXV0aCArIHNlbGYucmUuc3JjX2hvc3RfcG9ydF9zdHJpY3QgKyBzZWxmLnJlLnNyY19wYXRoLCAnaSdcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNlbGYucmUubm9faHR0cC50ZXN0KHRhaWwpKSB7XG4gICAgICAgIC8vIHNob3VsZCBub3QgYmUgYDovL2AsIHRoYXQgcHJvdGVjdHMgZnJvbSBlcnJvcnMgaW4gcHJvdG9jb2wgbmFtZVxuICAgICAgICBpZiAocG9zID49IDMgJiYgdGV4dFtwb3MgLSAzXSA9PT0gJzonKSB7IHJldHVybiAwOyB9XG4gICAgICAgIHJldHVybiB0YWlsLm1hdGNoKHNlbGYucmUubm9faHR0cClbMF0ubGVuZ3RoO1xuICAgICAgfVxuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICB9LFxuICAnbWFpbHRvOic6IHtcbiAgICB2YWxpZGF0ZTogZnVuY3Rpb24gKHRleHQsIHBvcywgc2VsZikge1xuICAgICAgdmFyIHRhaWwgPSB0ZXh0LnNsaWNlKHBvcyk7XG5cbiAgICAgIGlmICghc2VsZi5yZS5tYWlsdG8pIHtcbiAgICAgICAgc2VsZi5yZS5tYWlsdG8gPSAgbmV3IFJlZ0V4cChcbiAgICAgICAgICAnXicgKyBzZWxmLnJlLnNyY19lbWFpbF9uYW1lICsgJ0AnICsgc2VsZi5yZS5zcmNfaG9zdF9zdHJpY3QsICdpJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKHNlbGYucmUubWFpbHRvLnRlc3QodGFpbCkpIHtcbiAgICAgICAgcmV0dXJuIHRhaWwubWF0Y2goc2VsZi5yZS5tYWlsdG8pWzBdLmxlbmd0aDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfVxufTtcblxuLyplc2xpbnQtZGlzYWJsZSBtYXgtbGVuKi9cblxuLy8gUkUgcGF0dGVybiBmb3IgMi1jaGFyYWN0ZXIgdGxkcyAoYXV0b2dlbmVyYXRlZCBieSAuL3N1cHBvcnQvdGxkc18yY2hhcl9nZW4uanMpXG52YXIgdGxkc18yY2hfc3JjX3JlID0gJ2FbY2RlZmdpbG1ub3Fyc3R1d3h6XXxiW2FiZGVmZ2hpam1ub3JzdHZ3eXpdfGNbYWNkZmdoaWtsbW5vcnV2d3h5el18ZFtlamttb3pdfGVbY2VncnN0dV18Zltpamttb3JdfGdbYWJkZWZnaGlsbW5wcXJzdHV3eV18aFtrbW5ydHVdfGlbZGVsbW5vcXJzdF18altlbW9wXXxrW2VnaGltbnByd3l6XXxsW2FiY2lrcnN0dXZ5XXxtW2FjZGVnaGtsbW5vcHFyc3R1dnd4eXpdfG5bYWNlZmdpbG9wcnV6XXxvbXxwW2FlZmdoa2xtbnJzdHd5XXxxYXxyW2Vvc3V3XXxzW2FiY2RlZ2hpamtsbW5vcnR1dnh5el18dFtjZGZnaGprbG1ub3J0dnd6XXx1W2Fna3N5el18dlthY2VnaW51XXx3W2ZzXXx5W2V0XXx6W2Ftd10nO1xuXG4vLyBET04nVCB0cnkgdG8gbWFrZSBQUnMgd2l0aCBjaGFuZ2VzLiBFeHRlbmQgVExEcyB3aXRoIExpbmtpZnlJdC50bGRzKCkgaW5zdGVhZFxudmFyIHRsZHNfZGVmYXVsdCA9ICdiaXp8Y29tfGVkdXxnb3Z8bmV0fG9yZ3xwcm98d2VifHh4eHxhZXJvfGFzaWF8Y29vcHxpbmZvfG11c2V1bXxuYW1lfHNob3B80YDRhCcuc3BsaXQoJ3wnKTtcblxuLyplc2xpbnQtZW5hYmxlIG1heC1sZW4qL1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5mdW5jdGlvbiByZXNldFNjYW5DYWNoZShzZWxmKSB7XG4gIHNlbGYuX19pbmRleF9fID0gLTE7XG4gIHNlbGYuX190ZXh0X2NhY2hlX18gICA9ICcnO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVWYWxpZGF0b3IocmUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0ZXh0LCBwb3MpIHtcbiAgICB2YXIgdGFpbCA9IHRleHQuc2xpY2UocG9zKTtcblxuICAgIGlmIChyZS50ZXN0KHRhaWwpKSB7XG4gICAgICByZXR1cm4gdGFpbC5tYXRjaChyZSlbMF0ubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTm9ybWFsaXplcigpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChtYXRjaCwgc2VsZikge1xuICAgIHNlbGYubm9ybWFsaXplKG1hdGNoKTtcbiAgfTtcbn1cblxuLy8gU2NoZW1hcyBjb21waWxlci4gQnVpbGQgcmVnZXhwcy5cbi8vXG5mdW5jdGlvbiBjb21waWxlKHNlbGYpIHtcblxuICAvLyBMb2FkICYgY2xvbmUgUkUgcGF0dGVybnMuXG4gIHZhciByZSA9IHNlbGYucmUgPSBhc3NpZ24oe30sIHJlcXVpcmUoJy4vbGliL3JlJykpO1xuXG4gIC8vIERlZmluZSBkeW5hbWljIHBhdHRlcm5zXG4gIHZhciB0bGRzID0gc2VsZi5fX3RsZHNfXy5zbGljZSgpO1xuXG4gIGlmICghc2VsZi5fX3RsZHNfcmVwbGFjZWRfXykge1xuICAgIHRsZHMucHVzaCh0bGRzXzJjaF9zcmNfcmUpO1xuICB9XG4gIHRsZHMucHVzaChyZS5zcmNfeG4pO1xuXG4gIHJlLnNyY190bGRzID0gdGxkcy5qb2luKCd8Jyk7XG5cbiAgZnVuY3Rpb24gdW50cGwodHBsKSB7IHJldHVybiB0cGwucmVwbGFjZSgnJVRMRFMlJywgcmUuc3JjX3RsZHMpOyB9XG5cbiAgcmUuZW1haWxfZnV6enkgICAgICA9IFJlZ0V4cCh1bnRwbChyZS50cGxfZW1haWxfZnV6enkpLCAnaScpO1xuICByZS5saW5rX2Z1enp5ICAgICAgID0gUmVnRXhwKHVudHBsKHJlLnRwbF9saW5rX2Z1enp5KSwgJ2knKTtcbiAgcmUubGlua19ub19pcF9mdXp6eSA9IFJlZ0V4cCh1bnRwbChyZS50cGxfbGlua19ub19pcF9mdXp6eSksICdpJyk7XG4gIHJlLmhvc3RfZnV6enlfdGVzdCAgPSBSZWdFeHAodW50cGwocmUudHBsX2hvc3RfZnV6enlfdGVzdCksICdpJyk7XG5cbiAgLy9cbiAgLy8gQ29tcGlsZSBlYWNoIHNjaGVtYVxuICAvL1xuXG4gIHZhciBhbGlhc2VzID0gW107XG5cbiAgc2VsZi5fX2NvbXBpbGVkX18gPSB7fTsgLy8gUmVzZXQgY29tcGlsZWQgZGF0YVxuXG4gIGZ1bmN0aW9uIHNjaGVtYUVycm9yKG5hbWUsIHZhbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignKExpbmtpZnlJdCkgSW52YWxpZCBzY2hlbWEgXCInICsgbmFtZSArICdcIjogJyArIHZhbCk7XG4gIH1cblxuICBPYmplY3Qua2V5cyhzZWxmLl9fc2NoZW1hc19fKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdmFyIHZhbCA9IHNlbGYuX19zY2hlbWFzX19bbmFtZV07XG5cbiAgICAvLyBza2lwIGRpc2FibGVkIG1ldGhvZHNcbiAgICBpZiAodmFsID09PSBudWxsKSB7IHJldHVybjsgfVxuXG4gICAgdmFyIGNvbXBpbGVkID0geyB2YWxpZGF0ZTogbnVsbCwgbGluazogbnVsbCB9O1xuXG4gICAgc2VsZi5fX2NvbXBpbGVkX19bbmFtZV0gPSBjb21waWxlZDtcblxuICAgIGlmIChpc09iamVjdCh2YWwpKSB7XG4gICAgICBpZiAoaXNSZWdFeHAodmFsLnZhbGlkYXRlKSkge1xuICAgICAgICBjb21waWxlZC52YWxpZGF0ZSA9IGNyZWF0ZVZhbGlkYXRvcih2YWwudmFsaWRhdGUpO1xuICAgICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKHZhbC52YWxpZGF0ZSkpIHtcbiAgICAgICAgY29tcGlsZWQudmFsaWRhdGUgPSB2YWwudmFsaWRhdGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY2hlbWFFcnJvcihuYW1lLCB2YWwpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNGdW5jdGlvbih2YWwubm9ybWFsaXplKSkge1xuICAgICAgICBjb21waWxlZC5ub3JtYWxpemUgPSB2YWwubm9ybWFsaXplO1xuICAgICAgfSBlbHNlIGlmICghdmFsLm5vcm1hbGl6ZSkge1xuICAgICAgICBjb21waWxlZC5ub3JtYWxpemUgPSBjcmVhdGVOb3JtYWxpemVyKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY2hlbWFFcnJvcihuYW1lLCB2YWwpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGlzU3RyaW5nKHZhbCkpIHtcbiAgICAgIGFsaWFzZXMucHVzaChuYW1lKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzY2hlbWFFcnJvcihuYW1lLCB2YWwpO1xuICB9KTtcblxuICAvL1xuICAvLyBDb21waWxlIHBvc3Rwb25lZCBhbGlhc2VzXG4gIC8vXG5cbiAgYWxpYXNlcy5mb3JFYWNoKGZ1bmN0aW9uIChhbGlhcykge1xuICAgIGlmICghc2VsZi5fX2NvbXBpbGVkX19bc2VsZi5fX3NjaGVtYXNfX1thbGlhc11dKSB7XG4gICAgICAvLyBTaWxlbnRseSBmYWlsIG9uIG1pc3NlZCBzY2hlbWFzIHRvIGF2b2lkIGVycm9ucyBvbiBkaXNhYmxlLlxuICAgICAgLy8gc2NoZW1hRXJyb3IoYWxpYXMsIHNlbGYuX19zY2hlbWFzX19bYWxpYXNdKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZWxmLl9fY29tcGlsZWRfX1thbGlhc10udmFsaWRhdGUgPVxuICAgICAgc2VsZi5fX2NvbXBpbGVkX19bc2VsZi5fX3NjaGVtYXNfX1thbGlhc11dLnZhbGlkYXRlO1xuICAgIHNlbGYuX19jb21waWxlZF9fW2FsaWFzXS5ub3JtYWxpemUgPVxuICAgICAgc2VsZi5fX2NvbXBpbGVkX19bc2VsZi5fX3NjaGVtYXNfX1thbGlhc11dLm5vcm1hbGl6ZTtcbiAgfSk7XG5cbiAgLy9cbiAgLy8gRmFrZSByZWNvcmQgZm9yIGd1ZXNzZWQgbGlua3NcbiAgLy9cbiAgc2VsZi5fX2NvbXBpbGVkX19bJyddID0geyB2YWxpZGF0ZTogbnVsbCwgbm9ybWFsaXplOiBjcmVhdGVOb3JtYWxpemVyKCkgfTtcblxuICAvL1xuICAvLyBCdWlsZCBzY2hlbWEgY29uZGl0aW9uXG4gIC8vXG4gIHZhciBzbGlzdCA9IE9iamVjdC5rZXlzKHNlbGYuX19jb21waWxlZF9fKVxuICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24obmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmlsdGVyIGRpc2FibGVkICYgZmFrZSBzY2hlbWFzXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmFtZS5sZW5ndGggPiAwICYmIHNlbGYuX19jb21waWxlZF9fW25hbWVdO1xuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgLm1hcChlc2NhcGVSRSlcbiAgICAgICAgICAgICAgICAgICAgICAuam9pbignfCcpO1xuICAvLyAoPyFfKSBjYXVzZSAxLjV4IHNsb3dkb3duXG4gIHNlbGYucmUuc2NoZW1hX3Rlc3QgICA9IFJlZ0V4cCgnKF58KD8hXykoPzo+fCcgKyByZS5zcmNfWlBDYyArICcpKSgnICsgc2xpc3QgKyAnKScsICdpJyk7XG4gIHNlbGYucmUuc2NoZW1hX3NlYXJjaCA9IFJlZ0V4cCgnKF58KD8hXykoPzo+fCcgKyByZS5zcmNfWlBDYyArICcpKSgnICsgc2xpc3QgKyAnKScsICdpZycpO1xuXG4gIHNlbGYucmUucHJldGVzdCAgICAgICA9IFJlZ0V4cChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnKCcgKyBzZWxmLnJlLnNjaGVtYV90ZXN0LnNvdXJjZSArICcpfCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcoJyArIHNlbGYucmUuaG9zdF9mdXp6eV90ZXN0LnNvdXJjZSArICcpfCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdAJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaScpO1xuXG4gIC8vXG4gIC8vIENsZWFudXBcbiAgLy9cblxuICByZXNldFNjYW5DYWNoZShzZWxmKTtcbn1cblxuLyoqXG4gKiBjbGFzcyBNYXRjaFxuICpcbiAqIE1hdGNoIHJlc3VsdC4gU2luZ2xlIGVsZW1lbnQgb2YgYXJyYXksIHJldHVybmVkIGJ5IFtbTGlua2lmeUl0I21hdGNoXV1cbiAqKi9cbmZ1bmN0aW9uIE1hdGNoKHNlbGYsIHNoaWZ0KSB7XG4gIHZhciBzdGFydCA9IHNlbGYuX19pbmRleF9fLFxuICAgICAgZW5kICAgPSBzZWxmLl9fbGFzdF9pbmRleF9fLFxuICAgICAgdGV4dCAgPSBzZWxmLl9fdGV4dF9jYWNoZV9fLnNsaWNlKHN0YXJ0LCBlbmQpO1xuXG4gIC8qKlxuICAgKiBNYXRjaCNzY2hlbWEgLT4gU3RyaW5nXG4gICAqXG4gICAqIFByZWZpeCAocHJvdG9jb2wpIGZvciBtYXRjaGVkIHN0cmluZy5cbiAgICoqL1xuICB0aGlzLnNjaGVtYSAgICA9IHNlbGYuX19zY2hlbWFfXy50b0xvd2VyQ2FzZSgpO1xuICAvKipcbiAgICogTWF0Y2gjaW5kZXggLT4gTnVtYmVyXG4gICAqXG4gICAqIEZpcnN0IHBvc2l0aW9uIG9mIG1hdGNoZWQgc3RyaW5nLlxuICAgKiovXG4gIHRoaXMuaW5kZXggICAgID0gc3RhcnQgKyBzaGlmdDtcbiAgLyoqXG4gICAqIE1hdGNoI2xhc3RJbmRleCAtPiBOdW1iZXJcbiAgICpcbiAgICogTmV4dCBwb3NpdGlvbiBhZnRlciBtYXRjaGVkIHN0cmluZy5cbiAgICoqL1xuICB0aGlzLmxhc3RJbmRleCA9IGVuZCArIHNoaWZ0O1xuICAvKipcbiAgICogTWF0Y2gjcmF3IC0+IFN0cmluZ1xuICAgKlxuICAgKiBNYXRjaGVkIHN0cmluZy5cbiAgICoqL1xuICB0aGlzLnJhdyAgICAgICA9IHRleHQ7XG4gIC8qKlxuICAgKiBNYXRjaCN0ZXh0IC0+IFN0cmluZ1xuICAgKlxuICAgKiBOb3RtYWxpemVkIHRleHQgb2YgbWF0Y2hlZCBzdHJpbmcuXG4gICAqKi9cbiAgdGhpcy50ZXh0ICAgICAgPSB0ZXh0O1xuICAvKipcbiAgICogTWF0Y2gjdXJsIC0+IFN0cmluZ1xuICAgKlxuICAgKiBOb3JtYWxpemVkIHVybCBvZiBtYXRjaGVkIHN0cmluZy5cbiAgICoqL1xuICB0aGlzLnVybCAgICAgICA9IHRleHQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU1hdGNoKHNlbGYsIHNoaWZ0KSB7XG4gIHZhciBtYXRjaCA9IG5ldyBNYXRjaChzZWxmLCBzaGlmdCk7XG5cbiAgc2VsZi5fX2NvbXBpbGVkX19bbWF0Y2guc2NoZW1hXS5ub3JtYWxpemUobWF0Y2gsIHNlbGYpO1xuXG4gIHJldHVybiBtYXRjaDtcbn1cblxuXG4vKipcbiAqIGNsYXNzIExpbmtpZnlJdFxuICoqL1xuXG4vKipcbiAqIG5ldyBMaW5raWZ5SXQoc2NoZW1hcywgb3B0aW9ucylcbiAqIC0gc2NoZW1hcyAoT2JqZWN0KTogT3B0aW9uYWwuIEFkZGl0aW9uYWwgc2NoZW1hcyB0byB2YWxpZGF0ZSAocHJlZml4L3ZhbGlkYXRvcilcbiAqIC0gb3B0aW9ucyAoT2JqZWN0KTogeyBmdXp6eUxpbmt8ZnV6enlFbWFpbHxmdXp6eUlQOiB0cnVlfGZhbHNlIH1cbiAqXG4gKiBDcmVhdGVzIG5ldyBsaW5raWZpZXIgaW5zdGFuY2Ugd2l0aCBvcHRpb25hbCBhZGRpdGlvbmFsIHNjaGVtYXMuXG4gKiBDYW4gYmUgY2FsbGVkIHdpdGhvdXQgYG5ld2Aga2V5d29yZCBmb3IgY29udmVuaWVuY2UuXG4gKlxuICogQnkgZGVmYXVsdCB1bmRlcnN0YW5kczpcbiAqXG4gKiAtIGBodHRwKHMpOi8vLi4uYCAsIGBmdHA6Ly8uLi5gLCBgbWFpbHRvOi4uLmAgJiBgLy8uLi5gIGxpbmtzXG4gKiAtIFwiZnV6enlcIiBsaW5rcyBhbmQgZW1haWxzIChleGFtcGxlLmNvbSwgZm9vQGJhci5jb20pLlxuICpcbiAqIGBzY2hlbWFzYCBpcyBhbiBvYmplY3QsIHdoZXJlIGVhY2gga2V5L3ZhbHVlIGRlc2NyaWJlcyBwcm90b2NvbC9ydWxlOlxuICpcbiAqIC0gX19rZXlfXyAtIGxpbmsgcHJlZml4ICh1c3VhbGx5LCBwcm90b2NvbCBuYW1lIHdpdGggYDpgIGF0IHRoZSBlbmQsIGBza3lwZTpgXG4gKiAgIGZvciBleGFtcGxlKS4gYGxpbmtpZnktaXRgIG1ha2VzIHNodXJlIHRoYXQgcHJlZml4IGlzIG5vdCBwcmVjZWVkZWQgd2l0aFxuICogICBhbHBoYW51bWVyaWMgY2hhciBhbmQgc3ltYm9scy4gT25seSB3aGl0ZXNwYWNlcyBhbmQgcHVuY3R1YXRpb24gYWxsb3dlZC5cbiAqIC0gX192YWx1ZV9fIC0gcnVsZSB0byBjaGVjayB0YWlsIGFmdGVyIGxpbmsgcHJlZml4XG4gKiAgIC0gX1N0cmluZ18gLSBqdXN0IGFsaWFzIHRvIGV4aXN0aW5nIHJ1bGVcbiAqICAgLSBfT2JqZWN0X1xuICogICAgIC0gX3ZhbGlkYXRlXyAtIHZhbGlkYXRvciBmdW5jdGlvbiAoc2hvdWxkIHJldHVybiBtYXRjaGVkIGxlbmd0aCBvbiBzdWNjZXNzKSxcbiAqICAgICAgIG9yIGBSZWdFeHBgLlxuICogICAgIC0gX25vcm1hbGl6ZV8gLSBvcHRpb25hbCBmdW5jdGlvbiB0byBub3JtYWxpemUgdGV4dCAmIHVybCBvZiBtYXRjaGVkIHJlc3VsdFxuICogICAgICAgKGZvciBleGFtcGxlLCBmb3IgQHR3aXR0ZXIgbWVudGlvbnMpLlxuICpcbiAqIGBvcHRpb25zYDpcbiAqXG4gKiAtIF9fZnV6enlMaW5rX18gLSByZWNvZ25pZ2UgVVJMLXMgd2l0aG91dCBgaHR0cChzKTpgIHByZWZpeC4gRGVmYXVsdCBgdHJ1ZWAuXG4gKiAtIF9fZnV6enlJUF9fIC0gYWxsb3cgSVBzIGluIGZ1enp5IGxpbmtzIGFib3ZlLiBDYW4gY29uZmxpY3Qgd2l0aCBzb21lIHRleHRzXG4gKiAgIGxpa2UgdmVyc2lvbiBudW1iZXJzLiBEZWZhdWx0IGBmYWxzZWAuXG4gKiAtIF9fZnV6enlFbWFpbF9fIC0gcmVjb2duaXplIGVtYWlscyB3aXRob3V0IGBtYWlsdG86YCBwcmVmaXguXG4gKlxuICoqL1xuZnVuY3Rpb24gTGlua2lmeUl0KHNjaGVtYXMsIG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIExpbmtpZnlJdCkpIHtcbiAgICByZXR1cm4gbmV3IExpbmtpZnlJdChzY2hlbWFzLCBvcHRpb25zKTtcbiAgfVxuXG4gIGlmICghb3B0aW9ucykge1xuICAgIGlmIChpc09wdGlvbnNPYmooc2NoZW1hcykpIHtcbiAgICAgIG9wdGlvbnMgPSBzY2hlbWFzO1xuICAgICAgc2NoZW1hcyA9IHt9O1xuICAgIH1cbiAgfVxuXG4gIHRoaXMuX19vcHRzX18gICAgICAgICAgID0gYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgLy8gQ2FjaGUgbGFzdCB0ZXN0ZWQgcmVzdWx0LiBVc2VkIHRvIHNraXAgcmVwZWF0aW5nIHN0ZXBzIG9uIG5leHQgYG1hdGNoYCBjYWxsLlxuICB0aGlzLl9faW5kZXhfXyAgICAgICAgICA9IC0xO1xuICB0aGlzLl9fbGFzdF9pbmRleF9fICAgICA9IC0xOyAvLyBOZXh0IHNjYW4gcG9zaXRpb25cbiAgdGhpcy5fX3NjaGVtYV9fICAgICAgICAgPSAnJztcbiAgdGhpcy5fX3RleHRfY2FjaGVfXyAgICAgPSAnJztcblxuICB0aGlzLl9fc2NoZW1hc19fICAgICAgICA9IGFzc2lnbih7fSwgZGVmYXVsdFNjaGVtYXMsIHNjaGVtYXMpO1xuICB0aGlzLl9fY29tcGlsZWRfXyAgICAgICA9IHt9O1xuXG4gIHRoaXMuX190bGRzX18gICAgICAgICAgID0gdGxkc19kZWZhdWx0O1xuICB0aGlzLl9fdGxkc19yZXBsYWNlZF9fICA9IGZhbHNlO1xuXG4gIHRoaXMucmUgPSB7fTtcblxuICBjb21waWxlKHRoaXMpO1xufVxuXG5cbi8qKiBjaGFpbmFibGVcbiAqIExpbmtpZnlJdCNhZGQoc2NoZW1hLCBkZWZpbml0aW9uKVxuICogLSBzY2hlbWEgKFN0cmluZyk6IHJ1bGUgbmFtZSAoZml4ZWQgcGF0dGVybiBwcmVmaXgpXG4gKiAtIGRlZmluaXRpb24gKFN0cmluZ3xSZWdFeHB8T2JqZWN0KTogc2NoZW1hIGRlZmluaXRpb25cbiAqXG4gKiBBZGQgbmV3IHJ1bGUgZGVmaW5pdGlvbi4gU2VlIGNvbnN0cnVjdG9yIGRlc2NyaXB0aW9uIGZvciBkZXRhaWxzLlxuICoqL1xuTGlua2lmeUl0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBhZGQoc2NoZW1hLCBkZWZpbml0aW9uKSB7XG4gIHRoaXMuX19zY2hlbWFzX19bc2NoZW1hXSA9IGRlZmluaXRpb247XG4gIGNvbXBpbGUodGhpcyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuXG4vKiogY2hhaW5hYmxlXG4gKiBMaW5raWZ5SXQjc2V0KG9wdGlvbnMpXG4gKiAtIG9wdGlvbnMgKE9iamVjdCk6IHsgZnV6enlMaW5rfGZ1enp5RW1haWx8ZnV6enlJUDogdHJ1ZXxmYWxzZSB9XG4gKlxuICogU2V0IHJlY29nbml0aW9uIG9wdGlvbnMgZm9yIGxpbmtzIHdpdGhvdXQgc2NoZW1hLlxuICoqL1xuTGlua2lmeUl0LnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQob3B0aW9ucykge1xuICB0aGlzLl9fb3B0c19fID0gYXNzaWduKHRoaXMuX19vcHRzX18sIG9wdGlvbnMpO1xuICByZXR1cm4gdGhpcztcbn07XG5cblxuLyoqXG4gKiBMaW5raWZ5SXQjdGVzdCh0ZXh0KSAtPiBCb29sZWFuXG4gKlxuICogU2VhcmNoZXMgbGlua2lmaWFibGUgcGF0dGVybiBhbmQgcmV0dXJucyBgdHJ1ZWAgb24gc3VjY2VzcyBvciBgZmFsc2VgIG9uIGZhaWwuXG4gKiovXG5MaW5raWZ5SXQucHJvdG90eXBlLnRlc3QgPSBmdW5jdGlvbiB0ZXN0KHRleHQpIHtcbiAgLy8gUmVzZXQgc2NhbiBjYWNoZVxuICB0aGlzLl9fdGV4dF9jYWNoZV9fID0gdGV4dDtcbiAgdGhpcy5fX2luZGV4X18gICAgICA9IC0xO1xuXG4gIGlmICghdGV4dC5sZW5ndGgpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgdmFyIG0sIG1sLCBtZSwgbGVuLCBzaGlmdCwgbmV4dCwgcmUsIHRsZF9wb3MsIGF0X3BvcztcblxuICAvLyB0cnkgdG8gc2NhbiBmb3IgbGluayB3aXRoIHNjaGVtYSAtIHRoYXQncyB0aGUgbW9zdCBzaW1wbGUgcnVsZVxuICBpZiAodGhpcy5yZS5zY2hlbWFfdGVzdC50ZXN0KHRleHQpKSB7XG4gICAgcmUgPSB0aGlzLnJlLnNjaGVtYV9zZWFyY2g7XG4gICAgcmUubGFzdEluZGV4ID0gMDtcbiAgICB3aGlsZSAoKG0gPSByZS5leGVjKHRleHQpKSAhPT0gbnVsbCkge1xuICAgICAgbGVuID0gdGhpcy50ZXN0U2NoZW1hQXQodGV4dCwgbVsyXSwgcmUubGFzdEluZGV4KTtcbiAgICAgIGlmIChsZW4pIHtcbiAgICAgICAgdGhpcy5fX3NjaGVtYV9fICAgICA9IG1bMl07XG4gICAgICAgIHRoaXMuX19pbmRleF9fICAgICAgPSBtLmluZGV4ICsgbVsxXS5sZW5ndGg7XG4gICAgICAgIHRoaXMuX19sYXN0X2luZGV4X18gPSBtLmluZGV4ICsgbVswXS5sZW5ndGggKyBsZW47XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmICh0aGlzLl9fb3B0c19fLmZ1enp5TGluayAmJiB0aGlzLl9fY29tcGlsZWRfX1snaHR0cDonXSkge1xuICAgIC8vIGd1ZXNzIHNjaGVtYWxlc3MgbGlua3NcbiAgICB0bGRfcG9zID0gdGV4dC5zZWFyY2godGhpcy5yZS5ob3N0X2Z1enp5X3Rlc3QpO1xuICAgIGlmICh0bGRfcG9zID49IDApIHtcbiAgICAgIC8vIGlmIHRsZCBpcyBsb2NhdGVkIGFmdGVyIGZvdW5kIGxpbmsgLSBubyBuZWVkIHRvIGNoZWNrIGZ1enp5IHBhdHRlcm5cbiAgICAgIGlmICh0aGlzLl9faW5kZXhfXyA8IDAgfHwgdGxkX3BvcyA8IHRoaXMuX19pbmRleF9fKSB7XG4gICAgICAgIGlmICgobWwgPSB0ZXh0Lm1hdGNoKHRoaXMuX19vcHRzX18uZnV6enlJUCA/IHRoaXMucmUubGlua19mdXp6eSA6IHRoaXMucmUubGlua19ub19pcF9mdXp6eSkpICE9PSBudWxsKSB7XG5cbiAgICAgICAgICBzaGlmdCA9IG1sLmluZGV4ICsgbWxbMV0ubGVuZ3RoO1xuXG4gICAgICAgICAgaWYgKHRoaXMuX19pbmRleF9fIDwgMCB8fCBzaGlmdCA8IHRoaXMuX19pbmRleF9fKSB7XG4gICAgICAgICAgICB0aGlzLl9fc2NoZW1hX18gICAgID0gJyc7XG4gICAgICAgICAgICB0aGlzLl9faW5kZXhfXyAgICAgID0gc2hpZnQ7XG4gICAgICAgICAgICB0aGlzLl9fbGFzdF9pbmRleF9fID0gbWwuaW5kZXggKyBtbFswXS5sZW5ndGg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHRoaXMuX19vcHRzX18uZnV6enlFbWFpbCAmJiB0aGlzLl9fY29tcGlsZWRfX1snbWFpbHRvOiddKSB7XG4gICAgLy8gZ3Vlc3Mgc2NoZW1hbGVzcyBlbWFpbHNcbiAgICBhdF9wb3MgPSB0ZXh0LmluZGV4T2YoJ0AnKTtcbiAgICBpZiAoYXRfcG9zID49IDApIHtcbiAgICAgIC8vIFdlIGNhbid0IHNraXAgdGhpcyBjaGVjaywgYmVjYXVzZSB0aGlzIGNhc2VzIGFyZSBwb3NzaWJsZTpcbiAgICAgIC8vIDE5Mi4xNjguMS4xQGdtYWlsLmNvbSwgbXkuaW5AZXhhbXBsZS5jb21cbiAgICAgIGlmICgobWUgPSB0ZXh0Lm1hdGNoKHRoaXMucmUuZW1haWxfZnV6enkpKSAhPT0gbnVsbCkge1xuXG4gICAgICAgIHNoaWZ0ID0gbWUuaW5kZXggKyBtZVsxXS5sZW5ndGg7XG4gICAgICAgIG5leHQgID0gbWUuaW5kZXggKyBtZVswXS5sZW5ndGg7XG5cbiAgICAgICAgaWYgKHRoaXMuX19pbmRleF9fIDwgMCB8fCBzaGlmdCA8IHRoaXMuX19pbmRleF9fIHx8XG4gICAgICAgICAgICAoc2hpZnQgPT09IHRoaXMuX19pbmRleF9fICYmIG5leHQgPiB0aGlzLl9fbGFzdF9pbmRleF9fKSkge1xuICAgICAgICAgIHRoaXMuX19zY2hlbWFfXyAgICAgPSAnbWFpbHRvOic7XG4gICAgICAgICAgdGhpcy5fX2luZGV4X18gICAgICA9IHNoaWZ0O1xuICAgICAgICAgIHRoaXMuX19sYXN0X2luZGV4X18gPSBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXMuX19pbmRleF9fID49IDA7XG59O1xuXG5cbi8qKlxuICogTGlua2lmeUl0I3ByZXRlc3QodGV4dCkgLT4gQm9vbGVhblxuICpcbiAqIFZlcnkgcXVpY2sgY2hlY2ssIHRoYXQgY2FuIGdpdmUgZmFsc2UgcG9zaXRpdmVzLiBSZXR1cm5zIHRydWUgaWYgbGluayBNQVkgQkVcbiAqIGNhbiBleGlzdHMuIENhbiBiZSB1c2VkIGZvciBzcGVlZCBvcHRpbWl6YXRpb24sIHdoZW4geW91IG5lZWQgdG8gY2hlY2sgdGhhdFxuICogbGluayBOT1QgZXhpc3RzLlxuICoqL1xuTGlua2lmeUl0LnByb3RvdHlwZS5wcmV0ZXN0ID0gZnVuY3Rpb24gcHJldGVzdCh0ZXh0KSB7XG4gIHJldHVybiB0aGlzLnJlLnByZXRlc3QudGVzdCh0ZXh0KTtcbn07XG5cblxuLyoqXG4gKiBMaW5raWZ5SXQjdGVzdFNjaGVtYUF0KHRleHQsIG5hbWUsIHBvc2l0aW9uKSAtPiBOdW1iZXJcbiAqIC0gdGV4dCAoU3RyaW5nKTogdGV4dCB0byBzY2FuXG4gKiAtIG5hbWUgKFN0cmluZyk6IHJ1bGUgKHNjaGVtYSkgbmFtZVxuICogLSBwb3NpdGlvbiAoTnVtYmVyKTogdGV4dCBvZmZzZXQgdG8gY2hlY2sgZnJvbVxuICpcbiAqIFNpbWlsYXIgdG8gW1tMaW5raWZ5SXQjdGVzdF1dIGJ1dCBjaGVja3Mgb25seSBzcGVjaWZpYyBwcm90b2NvbCB0YWlsIGV4YWN0bHlcbiAqIGF0IGdpdmVuIHBvc2l0aW9uLiBSZXR1cm5zIGxlbmd0aCBvZiBmb3VuZCBwYXR0ZXJuICgwIG9uIGZhaWwpLlxuICoqL1xuTGlua2lmeUl0LnByb3RvdHlwZS50ZXN0U2NoZW1hQXQgPSBmdW5jdGlvbiB0ZXN0U2NoZW1hQXQodGV4dCwgc2NoZW1hLCBwb3MpIHtcbiAgLy8gSWYgbm90IHN1cHBvcnRlZCBzY2hlbWEgY2hlY2sgcmVxdWVzdGVkIC0gdGVybWluYXRlXG4gIGlmICghdGhpcy5fX2NvbXBpbGVkX19bc2NoZW1hLnRvTG93ZXJDYXNlKCldKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX19jb21waWxlZF9fW3NjaGVtYS50b0xvd2VyQ2FzZSgpXS52YWxpZGF0ZSh0ZXh0LCBwb3MsIHRoaXMpO1xufTtcblxuXG4vKipcbiAqIExpbmtpZnlJdCNtYXRjaCh0ZXh0KSAtPiBBcnJheXxudWxsXG4gKlxuICogUmV0dXJucyBhcnJheSBvZiBmb3VuZCBsaW5rIGRlc2NyaXB0aW9ucyBvciBgbnVsbGAgb24gZmFpbC4gV2Ugc3Ryb25nbHlcbiAqIHRvIHVzZSBbW0xpbmtpZnlJdCN0ZXN0XV0gZmlyc3QsIGZvciBiZXN0IHNwZWVkLlxuICpcbiAqICMjIyMjIFJlc3VsdCBtYXRjaCBkZXNjcmlwdGlvblxuICpcbiAqIC0gX19zY2hlbWFfXyAtIGxpbmsgc2NoZW1hLCBjYW4gYmUgZW1wdHkgZm9yIGZ1enp5IGxpbmtzLCBvciBgLy9gIGZvclxuICogICBwcm90b2NvbC1uZXV0cmFsICBsaW5rcy5cbiAqIC0gX19pbmRleF9fIC0gb2Zmc2V0IG9mIG1hdGNoZWQgdGV4dFxuICogLSBfX2xhc3RJbmRleF9fIC0gaW5kZXggb2YgbmV4dCBjaGFyIGFmdGVyIG1hdGhjaCBlbmRcbiAqIC0gX19yYXdfXyAtIG1hdGNoZWQgdGV4dFxuICogLSBfX3RleHRfXyAtIG5vcm1hbGl6ZWQgdGV4dFxuICogLSBfX3VybF9fIC0gbGluaywgZ2VuZXJhdGVkIGZyb20gbWF0Y2hlZCB0ZXh0XG4gKiovXG5MaW5raWZ5SXQucHJvdG90eXBlLm1hdGNoID0gZnVuY3Rpb24gbWF0Y2godGV4dCkge1xuICB2YXIgc2hpZnQgPSAwLCByZXN1bHQgPSBbXTtcblxuICAvLyBUcnkgdG8gdGFrZSBwcmV2aW91cyBlbGVtZW50IGZyb20gY2FjaGUsIGlmIC50ZXN0KCkgY2FsbGVkIGJlZm9yZVxuICBpZiAodGhpcy5fX2luZGV4X18gPj0gMCAmJiB0aGlzLl9fdGV4dF9jYWNoZV9fID09PSB0ZXh0KSB7XG4gICAgcmVzdWx0LnB1c2goY3JlYXRlTWF0Y2godGhpcywgc2hpZnQpKTtcbiAgICBzaGlmdCA9IHRoaXMuX19sYXN0X2luZGV4X187XG4gIH1cblxuICAvLyBDdXQgaGVhZCBpZiBjYWNoZSB3YXMgdXNlZFxuICB2YXIgdGFpbCA9IHNoaWZ0ID8gdGV4dC5zbGljZShzaGlmdCkgOiB0ZXh0O1xuXG4gIC8vIFNjYW4gc3RyaW5nIHVudGlsIGVuZCByZWFjaGVkXG4gIHdoaWxlICh0aGlzLnRlc3QodGFpbCkpIHtcbiAgICByZXN1bHQucHVzaChjcmVhdGVNYXRjaCh0aGlzLCBzaGlmdCkpO1xuXG4gICAgdGFpbCA9IHRhaWwuc2xpY2UodGhpcy5fX2xhc3RfaW5kZXhfXyk7XG4gICAgc2hpZnQgKz0gdGhpcy5fX2xhc3RfaW5kZXhfXztcbiAgfVxuXG4gIGlmIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufTtcblxuXG4vKiogY2hhaW5hYmxlXG4gKiBMaW5raWZ5SXQjdGxkcyhsaXN0IFssIGtlZXBPbGRdKSAtPiB0aGlzXG4gKiAtIGxpc3QgKEFycmF5KTogbGlzdCBvZiB0bGRzXG4gKiAtIGtlZXBPbGQgKEJvb2xlYW4pOiBtZXJnZSB3aXRoIGN1cnJlbnQgbGlzdCBpZiBgdHJ1ZWAgKGBmYWxzZWAgYnkgZGVmYXVsdClcbiAqXG4gKiBMb2FkIChvciBtZXJnZSkgbmV3IHRsZHMgbGlzdC4gVGhvc2UgYXJlIHVzZXIgZm9yIGZ1enp5IGxpbmtzICh3aXRob3V0IHByZWZpeClcbiAqIHRvIGF2b2lkIGZhbHNlIHBvc2l0aXZlcy4gQnkgZGVmYXVsdCB0aGlzIGFsZ29yeXRobSB1c2VkOlxuICpcbiAqIC0gaG9zdG5hbWUgd2l0aCBhbnkgMi1sZXR0ZXIgcm9vdCB6b25lcyBhcmUgb2suXG4gKiAtIGJpenxjb218ZWR1fGdvdnxuZXR8b3JnfHByb3x3ZWJ8eHh4fGFlcm98YXNpYXxjb29wfGluZm98bXVzZXVtfG5hbWV8c2hvcHzRgNGEXG4gKiAgIGFyZSBvay5cbiAqIC0gZW5jb2RlZCAoYHhuLS0uLi5gKSByb290IHpvbmVzIGFyZSBvay5cbiAqXG4gKiBJZiBsaXN0IGlzIHJlcGxhY2VkLCB0aGVuIGV4YWN0IG1hdGNoIGZvciAyLWNoYXJzIHJvb3Qgem9uZXMgd2lsbCBiZSBjaGVja2VkLlxuICoqL1xuTGlua2lmeUl0LnByb3RvdHlwZS50bGRzID0gZnVuY3Rpb24gdGxkcyhsaXN0LCBrZWVwT2xkKSB7XG4gIGxpc3QgPSBBcnJheS5pc0FycmF5KGxpc3QpID8gbGlzdCA6IFsgbGlzdCBdO1xuXG4gIGlmICgha2VlcE9sZCkge1xuICAgIHRoaXMuX190bGRzX18gPSBsaXN0LnNsaWNlKCk7XG4gICAgdGhpcy5fX3RsZHNfcmVwbGFjZWRfXyA9IHRydWU7XG4gICAgY29tcGlsZSh0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHRoaXMuX190bGRzX18gPSB0aGlzLl9fdGxkc19fLmNvbmNhdChsaXN0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zb3J0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKGVsLCBpZHgsIGFycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsICE9PSBhcnJbaWR4IC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmV2ZXJzZSgpO1xuXG4gIGNvbXBpbGUodGhpcyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBMaW5raWZ5SXQjbm9ybWFsaXplKG1hdGNoKVxuICpcbiAqIERlZmF1bHQgbm9ybWFsaXplciAoaWYgc2NoZW1hIGRvZXMgbm90IGRlZmluZSBpdCdzIG93bikuXG4gKiovXG5MaW5raWZ5SXQucHJvdG90eXBlLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uIG5vcm1hbGl6ZShtYXRjaCkge1xuXG4gIC8vIERvIG1pbmltYWwgcG9zc2libGUgY2hhbmdlcyBieSBkZWZhdWx0LiBOZWVkIHRvIGNvbGxlY3QgZmVlZGJhY2sgcHJpb3JcbiAgLy8gdG8gbW92ZSBmb3J3YXJkIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJrZG93bi1pdC9saW5raWZ5LWl0L2lzc3Vlcy8xXG5cbiAgaWYgKCFtYXRjaC5zY2hlbWEpIHsgbWF0Y2gudXJsID0gJ2h0dHA6Ly8nICsgbWF0Y2gudXJsOyB9XG5cbiAgaWYgKG1hdGNoLnNjaGVtYSA9PT0gJ21haWx0bzonICYmICEvXm1haWx0bzovaS50ZXN0KG1hdGNoLnVybCkpIHtcbiAgICBtYXRjaC51cmwgPSAnbWFpbHRvOicgKyBtYXRjaC51cmw7XG4gIH1cbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBMaW5raWZ5SXQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIFVzZSBkaXJlY3QgZXh0cmFjdCBpbnN0ZWFkIG9mIGByZWdlbmVyYXRlYCB0byByZWR1c2UgYnJvd3NlcmlmaWVkIHNpemVcbnZhciBzcmNfQW55ID0gZXhwb3J0cy5zcmNfQW55ID0gcmVxdWlyZSgndWMubWljcm8vcHJvcGVydGllcy9BbnkvcmVnZXgnKS5zb3VyY2U7XG52YXIgc3JjX0NjICA9IGV4cG9ydHMuc3JjX0NjID0gcmVxdWlyZSgndWMubWljcm8vY2F0ZWdvcmllcy9DYy9yZWdleCcpLnNvdXJjZTtcbnZhciBzcmNfWiAgID0gZXhwb3J0cy5zcmNfWiAgPSByZXF1aXJlKCd1Yy5taWNyby9jYXRlZ29yaWVzL1ovcmVnZXgnKS5zb3VyY2U7XG52YXIgc3JjX1AgICA9IGV4cG9ydHMuc3JjX1AgID0gcmVxdWlyZSgndWMubWljcm8vY2F0ZWdvcmllcy9QL3JlZ2V4Jykuc291cmNlO1xuXG4vLyBcXHB7XFxaXFxQXFxDY1xcQ0Z9ICh3aGl0ZSBzcGFjZXMgKyBjb250cm9sICsgZm9ybWF0ICsgcHVuY3R1YXRpb24pXG52YXIgc3JjX1pQQ2MgPSBleHBvcnRzLnNyY19aUENjID0gWyBzcmNfWiwgc3JjX1AsIHNyY19DYyBdLmpvaW4oJ3wnKTtcblxuLy8gXFxwe1xcWlxcQ2N9ICh3aGl0ZSBzcGFjZXMgKyBjb250cm9sKVxudmFyIHNyY19aQ2MgPSBleHBvcnRzLnNyY19aQ2MgPSBbIHNyY19aLCBzcmNfQ2MgXS5qb2luKCd8Jyk7XG5cbi8vIEFsbCBwb3NzaWJsZSB3b3JkIGNoYXJhY3RlcnMgKGV2ZXJ5dGhpbmcgd2l0aG91dCBwdW5jdHVhdGlvbiwgc3BhY2VzICYgY29udHJvbHMpXG4vLyBEZWZpbmVkIHZpYSBwdW5jdHVhdGlvbiAmIHNwYWNlcyB0byBzYXZlIHNwYWNlXG4vLyBTaG91bGQgYmUgc29tZXRoaW5nIGxpa2UgXFxwe1xcTFxcTlxcU1xcTX0gKFxcdyBidXQgd2l0aG91dCBgX2ApXG52YXIgc3JjX3BzZXVkb19sZXR0ZXIgICAgICAgPSAnKD86KD8hJyArIHNyY19aUENjICsgJyknICsgc3JjX0FueSArICcpJztcbi8vIFRoZSBzYW1lIGFzIGFib3RoZSBidXQgd2l0aG91dCBbMC05XVxudmFyIHNyY19wc2V1ZG9fbGV0dGVyX25vbl9kID0gJyg/Oig/IVswLTldfCcgKyBzcmNfWlBDYyArICcpJyArIHNyY19BbnkgKyAnKSc7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbnZhciBzcmNfaXA0ID0gZXhwb3J0cy5zcmNfaXA0ID1cblxuICAnKD86KDI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcXFxcLil7M30oMjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KSc7XG5cbmV4cG9ydHMuc3JjX2F1dGggICAgPSAnKD86KD86KD8hJyArIHNyY19aQ2MgKyAnKS4pK0ApPyc7XG5cbnZhciBzcmNfcG9ydCA9IGV4cG9ydHMuc3JjX3BvcnQgPVxuXG4gICcoPzo6KD86Nig/OlswLTRdXFxcXGR7M318NSg/OlswLTRdXFxcXGR7Mn18NSg/OlswLTJdXFxcXGR8M1swLTVdKSkpfFsxLTVdP1xcXFxkezEsNH0pKT8nO1xuXG52YXIgc3JjX2hvc3RfdGVybWluYXRvciA9IGV4cG9ydHMuc3JjX2hvc3RfdGVybWluYXRvciA9XG5cbiAgJyg/PSR8JyArIHNyY19aUENjICsgJykoPyEtfF98OlxcXFxkfFxcXFwuLXxcXFxcLig/ISR8JyArIHNyY19aUENjICsgJykpJztcblxudmFyIHNyY19wYXRoID0gZXhwb3J0cy5zcmNfcGF0aCA9XG5cbiAgJyg/OicgK1xuICAgICdbLz8jXScgK1xuICAgICAgJyg/OicgK1xuICAgICAgICAnKD8hJyArIHNyY19aQ2MgKyAnfFsoKVtcXFxcXXt9LixcIlxcJz8hXFxcXC1dKS58JyArXG4gICAgICAgICdcXFxcWyg/Oig/IScgKyBzcmNfWkNjICsgJ3xcXFxcXSkuKSpcXFxcXXwnICtcbiAgICAgICAgJ1xcXFwoKD86KD8hJyArIHNyY19aQ2MgKyAnfFspXSkuKSpcXFxcKXwnICtcbiAgICAgICAgJ1xcXFx7KD86KD8hJyArIHNyY19aQ2MgKyAnfFt9XSkuKSpcXFxcfXwnICtcbiAgICAgICAgJ1xcXFxcIig/Oig/IScgKyBzcmNfWkNjICsgJ3xbXCJdKS4pK1xcXFxcInwnICtcbiAgICAgICAgXCJcXFxcJyg/Oig/IVwiICsgc3JjX1pDYyArIFwifFsnXSkuKStcXFxcJ3xcIiArXG4gICAgICAgIFwiXFxcXCcoPz1cIiArIHNyY19wc2V1ZG9fbGV0dGVyICsgJykufCcgKyAgLy8gYWxsb3cgYEknbV9raW5nYCBpZiBubyBwYWlyIGZvdW5kXG4gICAgICAgICdcXFxcLnsyLDN9W2EtekEtWjAtOSVdfCcgKyAvLyBnaXRodWIgaGFzIC4uLiBpbiBjb21taXQgcmFuZ2UgbGlua3MuIFJlc3RyaWN0IHRvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZW5nbGlzaCAmIHBlcmNlbnQtZW5jb2RlZCBvbmx5LCB1bnRpbCBtb3JlIGV4YW1wbGVzIGZvdW5kLlxuICAgICAgICAnXFxcXC4oPyEnICsgc3JjX1pDYyArICd8Wy5dKS58JyArXG4gICAgICAgICdcXFxcLSg/IScgKyBzcmNfWkNjICsgJ3wtLSg/OlteLV18JCkpKD86Wy1dK3wuKXwnICsgIC8vIGAtLS1gID0+IGxvbmcgZGFzaCwgdGVybWluYXRlXG4gICAgICAgICdcXFxcLCg/IScgKyBzcmNfWkNjICsgJykufCcgKyAgICAgIC8vIGFsbG93IGAsLCxgIGluIHBhdGhzXG4gICAgICAgICdcXFxcISg/IScgKyBzcmNfWkNjICsgJ3xbIV0pLnwnICtcbiAgICAgICAgJ1xcXFw/KD8hJyArIHNyY19aQ2MgKyAnfFs/XSkuJyArXG4gICAgICAnKSsnICtcbiAgICAnfFxcXFwvJyArXG4gICcpPyc7XG5cbnZhciBzcmNfZW1haWxfbmFtZSA9IGV4cG9ydHMuc3JjX2VtYWlsX25hbWUgPVxuXG4gICdbXFxcXC07OiY9XFxcXCtcXFxcJCxcXFxcXCJcXFxcLmEtekEtWjAtOV9dKyc7XG5cbnZhciBzcmNfeG4gPSBleHBvcnRzLnNyY194biA9XG5cbiAgJ3huLS1bYS16MC05XFxcXC1dezEsNTl9JztcblxuLy8gTW9yZSB0byByZWFkIGFib3V0IGRvbWFpbiBuYW1lc1xuLy8gaHR0cDovL3NlcnZlcmZhdWx0LmNvbS9xdWVzdGlvbnMvNjM4MjYwL1xuXG52YXIgc3JjX2RvbWFpbl9yb290ID0gZXhwb3J0cy5zcmNfZG9tYWluX3Jvb3QgPVxuXG4gIC8vIENhbid0IGhhdmUgZGlnaXRzIGFuZCBkYXNoZXNcbiAgJyg/OicgK1xuICAgIHNyY194biArXG4gICAgJ3wnICtcbiAgICBzcmNfcHNldWRvX2xldHRlcl9ub25fZCArICd7MSw2M30nICtcbiAgJyknO1xuXG52YXIgc3JjX2RvbWFpbiA9IGV4cG9ydHMuc3JjX2RvbWFpbiA9XG5cbiAgJyg/OicgK1xuICAgIHNyY194biArXG4gICAgJ3wnICtcbiAgICAnKD86JyArIHNyY19wc2V1ZG9fbGV0dGVyICsgJyknICtcbiAgICAnfCcgK1xuICAgIC8vIGRvbid0IGFsbG93IGAtLWAgaW4gZG9tYWluIG5hbWVzLCBiZWNhdXNlOlxuICAgIC8vIC0gdGhhdCBjYW4gY29uZmxpY3Qgd2l0aCBtYXJrZG93biAmbWRhc2g7IC8gJm5kYXNoO1xuICAgIC8vIC0gbm9ib2R5IHVzZSB0aG9zZSBhbnl3YXlcbiAgICAnKD86JyArIHNyY19wc2V1ZG9fbGV0dGVyICsgJyg/Oi0oPyEtKXwnICsgc3JjX3BzZXVkb19sZXR0ZXIgKyAnKXswLDYxfScgKyBzcmNfcHNldWRvX2xldHRlciArICcpJyArXG4gICcpJztcblxudmFyIHNyY19ob3N0ID0gZXhwb3J0cy5zcmNfaG9zdCA9XG5cbiAgJyg/OicgK1xuICAgIHNyY19pcDQgK1xuICAnfCcgK1xuICAgICcoPzooPzooPzonICsgc3JjX2RvbWFpbiArICcpXFxcXC4pKicgKyBzcmNfZG9tYWluX3Jvb3QgKyAnKScgK1xuICAnKSc7XG5cbnZhciB0cGxfaG9zdF9mdXp6eSA9IGV4cG9ydHMudHBsX2hvc3RfZnV6enkgPVxuXG4gICcoPzonICtcbiAgICBzcmNfaXA0ICtcbiAgJ3wnICtcbiAgICAnKD86KD86KD86JyArIHNyY19kb21haW4gKyAnKVxcXFwuKSsoPzolVExEUyUpKScgK1xuICAnKSc7XG5cbnZhciB0cGxfaG9zdF9ub19pcF9mdXp6eSA9IGV4cG9ydHMudHBsX2hvc3Rfbm9faXBfZnV6enkgPVxuXG4gICcoPzooPzooPzonICsgc3JjX2RvbWFpbiArICcpXFxcXC4pKyg/OiVUTERTJSkpJztcblxuZXhwb3J0cy5zcmNfaG9zdF9zdHJpY3QgPVxuXG4gIHNyY19ob3N0ICsgc3JjX2hvc3RfdGVybWluYXRvcjtcblxudmFyIHRwbF9ob3N0X2Z1enp5X3N0cmljdCA9IGV4cG9ydHMudHBsX2hvc3RfZnV6enlfc3RyaWN0ID1cblxuICB0cGxfaG9zdF9mdXp6eSArIHNyY19ob3N0X3Rlcm1pbmF0b3I7XG5cbmV4cG9ydHMuc3JjX2hvc3RfcG9ydF9zdHJpY3QgPVxuXG4gIHNyY19ob3N0ICsgc3JjX3BvcnQgKyBzcmNfaG9zdF90ZXJtaW5hdG9yO1xuXG52YXIgdHBsX2hvc3RfcG9ydF9mdXp6eV9zdHJpY3QgPSBleHBvcnRzLnRwbF9ob3N0X3BvcnRfZnV6enlfc3RyaWN0ID1cblxuICB0cGxfaG9zdF9mdXp6eSArIHNyY19wb3J0ICsgc3JjX2hvc3RfdGVybWluYXRvcjtcblxudmFyIHRwbF9ob3N0X3BvcnRfbm9faXBfZnV6enlfc3RyaWN0ID0gZXhwb3J0cy50cGxfaG9zdF9wb3J0X25vX2lwX2Z1enp5X3N0cmljdCA9XG5cbiAgdHBsX2hvc3Rfbm9faXBfZnV6enkgKyBzcmNfcG9ydCArIHNyY19ob3N0X3Rlcm1pbmF0b3I7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIE1haW4gcnVsZXNcblxuLy8gUnVkZSB0ZXN0IGZ1enp5IGxpbmtzIGJ5IGhvc3QsIGZvciBxdWljayBkZW55XG5leHBvcnRzLnRwbF9ob3N0X2Z1enp5X3Rlc3QgPVxuXG4gICdsb2NhbGhvc3R8XFxcXC5cXFxcZHsxLDN9XFxcXC58KD86XFxcXC4oPzolVExEUyUpKD86JyArIHNyY19aUENjICsgJ3wkKSknO1xuXG5leHBvcnRzLnRwbF9lbWFpbF9mdXp6eSA9XG5cbiAgICAnKF58PnwnICsgc3JjX1pDYyArICcpKCcgKyBzcmNfZW1haWxfbmFtZSArICdAJyArIHRwbF9ob3N0X2Z1enp5X3N0cmljdCArICcpJztcblxuZXhwb3J0cy50cGxfbGlua19mdXp6eSA9XG4gICAgLy8gRnV6enkgbGluayBjYW4ndCBiZSBwcmVwZW5kZWQgd2l0aCAuOi9cXC0gYW5kIG5vbiBwdW5jdHVhdGlvbi5cbiAgICAvLyBidXQgY2FuIHN0YXJ0IHdpdGggPiAobWFya2Rvd24gYmxvY2txdW90ZSlcbiAgICAnKF58KD8hWy46L1xcXFwtX0BdKSg/OlskKzw9Pl5gfF18JyArIHNyY19aUENjICsgJykpJyArXG4gICAgJygoPyFbJCs8PT5eYHxdKScgKyB0cGxfaG9zdF9wb3J0X2Z1enp5X3N0cmljdCArIHNyY19wYXRoICsgJyknO1xuXG5leHBvcnRzLnRwbF9saW5rX25vX2lwX2Z1enp5ID1cbiAgICAvLyBGdXp6eSBsaW5rIGNhbid0IGJlIHByZXBlbmRlZCB3aXRoIC46L1xcLSBhbmQgbm9uIHB1bmN0dWF0aW9uLlxuICAgIC8vIGJ1dCBjYW4gc3RhcnQgd2l0aCA+IChtYXJrZG93biBibG9ja3F1b3RlKVxuICAgICcoXnwoPyFbLjovXFxcXC1fQF0pKD86WyQrPD0+XmB8XXwnICsgc3JjX1pQQ2MgKyAnKSknICtcbiAgICAnKCg/IVskKzw9Pl5gfF0pJyArIHRwbF9ob3N0X3BvcnRfbm9faXBfZnV6enlfc3RyaWN0ICsgc3JjX3BhdGggKyAnKSc7XG4iLCJcbid1c2Ugc3RyaWN0JztcblxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1iaXR3aXNlICovXG5cbnZhciBkZWNvZGVDYWNoZSA9IHt9O1xuXG5mdW5jdGlvbiBnZXREZWNvZGVDYWNoZShleGNsdWRlKSB7XG4gIHZhciBpLCBjaCwgY2FjaGUgPSBkZWNvZGVDYWNoZVtleGNsdWRlXTtcbiAgaWYgKGNhY2hlKSB7IHJldHVybiBjYWNoZTsgfVxuXG4gIGNhY2hlID0gZGVjb2RlQ2FjaGVbZXhjbHVkZV0gPSBbXTtcblxuICBmb3IgKGkgPSAwOyBpIDwgMTI4OyBpKyspIHtcbiAgICBjaCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoaSk7XG4gICAgY2FjaGUucHVzaChjaCk7XG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgZXhjbHVkZS5sZW5ndGg7IGkrKykge1xuICAgIGNoID0gZXhjbHVkZS5jaGFyQ29kZUF0KGkpO1xuICAgIGNhY2hlW2NoXSA9ICclJyArICgnMCcgKyBjaC50b1N0cmluZygxNikudG9VcHBlckNhc2UoKSkuc2xpY2UoLTIpO1xuICB9XG5cbiAgcmV0dXJuIGNhY2hlO1xufVxuXG5cbi8vIERlY29kZSBwZXJjZW50LWVuY29kZWQgc3RyaW5nLlxuLy9cbmZ1bmN0aW9uIGRlY29kZShzdHJpbmcsIGV4Y2x1ZGUpIHtcbiAgdmFyIGNhY2hlO1xuXG4gIGlmICh0eXBlb2YgZXhjbHVkZSAhPT0gJ3N0cmluZycpIHtcbiAgICBleGNsdWRlID0gZGVjb2RlLmRlZmF1bHRDaGFycztcbiAgfVxuXG4gIGNhY2hlID0gZ2V0RGVjb2RlQ2FjaGUoZXhjbHVkZSk7XG5cbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oJVthLWYwLTldezJ9KSsvZ2ksIGZ1bmN0aW9uKHNlcSkge1xuICAgIHZhciBpLCBsLCBiMSwgYjIsIGIzLCBiNCwgY2hhcixcbiAgICAgICAgcmVzdWx0ID0gJyc7XG5cbiAgICBmb3IgKGkgPSAwLCBsID0gc2VxLmxlbmd0aDsgaSA8IGw7IGkgKz0gMykge1xuICAgICAgYjEgPSBwYXJzZUludChzZXEuc2xpY2UoaSArIDEsIGkgKyAzKSwgMTYpO1xuXG4gICAgICBpZiAoYjEgPCAweDgwKSB7XG4gICAgICAgIHJlc3VsdCArPSBjYWNoZVtiMV07XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoKGIxICYgMHhFMCkgPT09IDB4QzAgJiYgKGkgKyAzIDwgbCkpIHtcbiAgICAgICAgLy8gMTEweHh4eHggMTB4eHh4eHhcbiAgICAgICAgYjIgPSBwYXJzZUludChzZXEuc2xpY2UoaSArIDQsIGkgKyA2KSwgMTYpO1xuXG4gICAgICAgIGlmICgoYjIgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgIGNoYXIgPSAoKGIxIDw8IDYpICYgMHg3QzApIHwgKGIyICYgMHgzRik7XG5cbiAgICAgICAgICBpZiAoY2hhciA8IDB4ODApIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSAnXFx1ZmZmZFxcdWZmZmQnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjaGFyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpICs9IDM7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKChiMSAmIDB4RjApID09PSAweEUwICYmIChpICsgNiA8IGwpKSB7XG4gICAgICAgIC8vIDExMTB4eHh4IDEweHh4eHh4IDEweHh4eHh4XG4gICAgICAgIGIyID0gcGFyc2VJbnQoc2VxLnNsaWNlKGkgKyA0LCBpICsgNiksIDE2KTtcbiAgICAgICAgYjMgPSBwYXJzZUludChzZXEuc2xpY2UoaSArIDcsIGkgKyA5KSwgMTYpO1xuXG4gICAgICAgIGlmICgoYjIgJiAweEMwKSA9PT0gMHg4MCAmJiAoYjMgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgIGNoYXIgPSAoKGIxIDw8IDEyKSAmIDB4RjAwMCkgfCAoKGIyIDw8IDYpICYgMHhGQzApIHwgKGIzICYgMHgzRik7XG5cbiAgICAgICAgICBpZiAoY2hhciA8IDB4ODAwIHx8IChjaGFyID49IDB4RDgwMCAmJiBjaGFyIDw9IDB4REZGRikpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSAnXFx1ZmZmZFxcdWZmZmRcXHVmZmZkJztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY2hhcik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaSArPSA2O1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICgoYjEgJiAweEY4KSA9PT0gMHhGMCAmJiAoaSArIDkgPCBsKSkge1xuICAgICAgICAvLyAxMTExMTB4eCAxMHh4eHh4eCAxMHh4eHh4eCAxMHh4eHh4eFxuICAgICAgICBiMiA9IHBhcnNlSW50KHNlcS5zbGljZShpICsgNCwgaSArIDYpLCAxNik7XG4gICAgICAgIGIzID0gcGFyc2VJbnQoc2VxLnNsaWNlKGkgKyA3LCBpICsgOSksIDE2KTtcbiAgICAgICAgYjQgPSBwYXJzZUludChzZXEuc2xpY2UoaSArIDEwLCBpICsgMTIpLCAxNik7XG5cbiAgICAgICAgaWYgKChiMiAmIDB4QzApID09PSAweDgwICYmIChiMyAmIDB4QzApID09PSAweDgwICYmIChiNCAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgY2hhciA9ICgoYjEgPDwgMTgpICYgMHgxQzAwMDApIHwgKChiMiA8PCAxMikgJiAweDNGMDAwKSB8ICgoYjMgPDwgNikgJiAweEZDMCkgfCAoYjQgJiAweDNGKTtcblxuICAgICAgICAgIGlmIChjaGFyIDwgMHgxMDAwMCB8fCBjaGFyID4gMHgxMEZGRkYpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSAnXFx1ZmZmZFxcdWZmZmRcXHVmZmZkXFx1ZmZmZCc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNoYXIgLT0gMHgxMDAwMDtcbiAgICAgICAgICAgIHJlc3VsdCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4RDgwMCArIChjaGFyID4+IDEwKSwgMHhEQzAwICsgKGNoYXIgJiAweDNGRikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGkgKz0gOTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXN1bHQgKz0gJ1xcdWZmZmQnO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0pO1xufVxuXG5cbmRlY29kZS5kZWZhdWx0Q2hhcnMgICA9ICc7Lz86QCY9KyQsIyc7XG5kZWNvZGUuY29tcG9uZW50Q2hhcnMgPSAnJztcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlY29kZTtcbiIsIlxuJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciBlbmNvZGVDYWNoZSA9IHt9O1xuXG5cbi8vIENyZWF0ZSBhIGxvb2t1cCBhcnJheSB3aGVyZSBhbnl0aGluZyBidXQgY2hhcmFjdGVycyBpbiBgY2hhcnNgIHN0cmluZ1xuLy8gYW5kIGFscGhhbnVtZXJpYyBjaGFycyBpcyBwZXJjZW50LWVuY29kZWQuXG4vL1xuZnVuY3Rpb24gZ2V0RW5jb2RlQ2FjaGUoZXhjbHVkZSkge1xuICB2YXIgaSwgY2gsIGNhY2hlID0gZW5jb2RlQ2FjaGVbZXhjbHVkZV07XG4gIGlmIChjYWNoZSkgeyByZXR1cm4gY2FjaGU7IH1cblxuICBjYWNoZSA9IGVuY29kZUNhY2hlW2V4Y2x1ZGVdID0gW107XG5cbiAgZm9yIChpID0gMDsgaSA8IDEyODsgaSsrKSB7XG4gICAgY2ggPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpO1xuXG4gICAgaWYgKC9eWzAtOWEtel0kL2kudGVzdChjaCkpIHtcbiAgICAgIC8vIGFsd2F5cyBhbGxvdyB1bmVuY29kZWQgYWxwaGFudW1lcmljIGNoYXJhY3RlcnNcbiAgICAgIGNhY2hlLnB1c2goY2gpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWNoZS5wdXNoKCclJyArICgnMCcgKyBpLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpKS5zbGljZSgtMikpO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoaSA9IDA7IGkgPCBleGNsdWRlLmxlbmd0aDsgaSsrKSB7XG4gICAgY2FjaGVbZXhjbHVkZS5jaGFyQ29kZUF0KGkpXSA9IGV4Y2x1ZGVbaV07XG4gIH1cblxuICByZXR1cm4gY2FjaGU7XG59XG5cblxuLy8gRW5jb2RlIHVuc2FmZSBjaGFyYWN0ZXJzIHdpdGggcGVyY2VudC1lbmNvZGluZywgc2tpcHBpbmcgYWxyZWFkeVxuLy8gZW5jb2RlZCBzZXF1ZW5jZXMuXG4vL1xuLy8gIC0gc3RyaW5nICAgICAgIC0gc3RyaW5nIHRvIGVuY29kZVxuLy8gIC0gZXhjbHVkZSAgICAgIC0gbGlzdCBvZiBjaGFyYWN0ZXJzIHRvIGlnbm9yZSAoaW4gYWRkaXRpb24gdG8gYS16QS1aMC05KVxuLy8gIC0ga2VlcEVzY2FwZWQgIC0gZG9uJ3QgZW5jb2RlICclJyBpbiBhIGNvcnJlY3QgZXNjYXBlIHNlcXVlbmNlIChkZWZhdWx0OiB0cnVlKVxuLy9cbmZ1bmN0aW9uIGVuY29kZShzdHJpbmcsIGV4Y2x1ZGUsIGtlZXBFc2NhcGVkKSB7XG4gIHZhciBpLCBsLCBjb2RlLCBuZXh0Q29kZSwgY2FjaGUsXG4gICAgICByZXN1bHQgPSAnJztcblxuICBpZiAodHlwZW9mIGV4Y2x1ZGUgIT09ICdzdHJpbmcnKSB7XG4gICAgLy8gZW5jb2RlKHN0cmluZywga2VlcEVzY2FwZWQpXG4gICAga2VlcEVzY2FwZWQgID0gZXhjbHVkZTtcbiAgICBleGNsdWRlID0gZW5jb2RlLmRlZmF1bHRDaGFycztcbiAgfVxuXG4gIGlmICh0eXBlb2Yga2VlcEVzY2FwZWQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAga2VlcEVzY2FwZWQgPSB0cnVlO1xuICB9XG5cbiAgY2FjaGUgPSBnZXRFbmNvZGVDYWNoZShleGNsdWRlKTtcblxuICBmb3IgKGkgPSAwLCBsID0gc3RyaW5nLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGNvZGUgPSBzdHJpbmcuY2hhckNvZGVBdChpKTtcblxuICAgIGlmIChrZWVwRXNjYXBlZCAmJiBjb2RlID09PSAweDI1IC8qICUgKi8gJiYgaSArIDIgPCBsKSB7XG4gICAgICBpZiAoL15bMC05YS1mXXsyfSQvaS50ZXN0KHN0cmluZy5zbGljZShpICsgMSwgaSArIDMpKSkge1xuICAgICAgICByZXN1bHQgKz0gc3RyaW5nLnNsaWNlKGksIGkgKyAzKTtcbiAgICAgICAgaSArPSAyO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZSA8IDEyOCkge1xuICAgICAgcmVzdWx0ICs9IGNhY2hlW2NvZGVdO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGNvZGUgPj0gMHhEODAwICYmIGNvZGUgPD0gMHhERkZGKSB7XG4gICAgICBpZiAoY29kZSA+PSAweEQ4MDAgJiYgY29kZSA8PSAweERCRkYgJiYgaSArIDEgPCBsKSB7XG4gICAgICAgIG5leHRDb2RlID0gc3RyaW5nLmNoYXJDb2RlQXQoaSArIDEpO1xuICAgICAgICBpZiAobmV4dENvZGUgPj0gMHhEQzAwICYmIG5leHRDb2RlIDw9IDB4REZGRikge1xuICAgICAgICAgIHJlc3VsdCArPSBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5nW2ldICsgc3RyaW5nW2kgKyAxXSk7XG4gICAgICAgICAgaSsrO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXN1bHQgKz0gJyVFRiVCRiVCRCc7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICByZXN1bHQgKz0gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ1tpXSk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5lbmNvZGUuZGVmYXVsdENoYXJzICAgPSBcIjsvPzpAJj0rJCwtXy4hfionKCkjXCI7XG5lbmNvZGUuY29tcG9uZW50Q2hhcnMgPSBcIi1fLiF+KicoKVwiO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZW5jb2RlO1xuIiwiXG4ndXNlIHN0cmljdCc7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmb3JtYXQodXJsKSB7XG4gIHZhciByZXN1bHQgPSAnJztcblxuICByZXN1bHQgKz0gdXJsLnByb3RvY29sIHx8ICcnO1xuICByZXN1bHQgKz0gdXJsLnNsYXNoZXMgPyAnLy8nIDogJyc7XG4gIHJlc3VsdCArPSB1cmwuYXV0aCA/IHVybC5hdXRoICsgJ0AnIDogJyc7XG5cbiAgaWYgKHVybC5ob3N0bmFtZSAmJiB1cmwuaG9zdG5hbWUuaW5kZXhPZignOicpICE9PSAtMSkge1xuICAgIC8vIGlwdjYgYWRkcmVzc1xuICAgIHJlc3VsdCArPSAnWycgKyB1cmwuaG9zdG5hbWUgKyAnXSc7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ICs9IHVybC5ob3N0bmFtZSB8fCAnJztcbiAgfVxuXG4gIHJlc3VsdCArPSB1cmwucG9ydCA/ICc6JyArIHVybC5wb3J0IDogJyc7XG4gIHJlc3VsdCArPSB1cmwucGF0aG5hbWUgfHwgJyc7XG4gIHJlc3VsdCArPSB1cmwuc2VhcmNoIHx8ICcnO1xuICByZXN1bHQgKz0gdXJsLmhhc2ggfHwgJyc7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cblxubW9kdWxlLmV4cG9ydHMuZW5jb2RlID0gcmVxdWlyZSgnLi9lbmNvZGUnKTtcbm1vZHVsZS5leHBvcnRzLmRlY29kZSA9IHJlcXVpcmUoJy4vZGVjb2RlJyk7XG5tb2R1bGUuZXhwb3J0cy5mb3JtYXQgPSByZXF1aXJlKCcuL2Zvcm1hdCcpO1xubW9kdWxlLmV4cG9ydHMucGFyc2UgID0gcmVxdWlyZSgnLi9wYXJzZScpO1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxuLy9cbi8vIENoYW5nZXMgZnJvbSBqb3llbnQvbm9kZTpcbi8vXG4vLyAxLiBObyBsZWFkaW5nIHNsYXNoIGluIHBhdGhzLFxuLy8gICAgZS5nLiBpbiBgdXJsLnBhcnNlKCdodHRwOi8vZm9vP2JhcicpYCBwYXRobmFtZSBpcyBgYCwgbm90IGAvYFxuLy9cbi8vIDIuIEJhY2tzbGFzaGVzIGFyZSBub3QgcmVwbGFjZWQgd2l0aCBzbGFzaGVzLFxuLy8gICAgc28gYGh0dHA6XFxcXGV4YW1wbGUub3JnXFxgIGlzIHRyZWF0ZWQgbGlrZSBhIHJlbGF0aXZlIHBhdGhcbi8vXG4vLyAzLiBUcmFpbGluZyBjb2xvbiBpcyB0cmVhdGVkIGxpa2UgYSBwYXJ0IG9mIHRoZSBwYXRoLFxuLy8gICAgaS5lLiBpbiBgaHR0cDovL2V4YW1wbGUub3JnOmZvb2AgcGF0aG5hbWUgaXMgYDpmb29gXG4vL1xuLy8gNC4gTm90aGluZyBpcyBVUkwtZW5jb2RlZCBpbiB0aGUgcmVzdWx0aW5nIG9iamVjdCxcbi8vICAgIChpbiBqb3llbnQvbm9kZSBzb21lIGNoYXJzIGluIGF1dGggYW5kIHBhdGhzIGFyZSBlbmNvZGVkKVxuLy9cbi8vIDUuIGB1cmwucGFyc2UoKWAgZG9lcyBub3QgaGF2ZSBgcGFyc2VRdWVyeVN0cmluZ2AgYXJndW1lbnRcbi8vXG4vLyA2LiBSZW1vdmVkIGV4dHJhbmVvdXMgcmVzdWx0IHByb3BlcnRpZXM6IGBob3N0YCwgYHBhdGhgLCBgcXVlcnlgLCBldGMuLFxuLy8gICAgd2hpY2ggY2FuIGJlIGNvbnN0cnVjdGVkIHVzaW5nIG90aGVyIHBhcnRzIG9mIHRoZSB1cmwuXG4vL1xuXG5cbmZ1bmN0aW9uIFVybCgpIHtcbiAgdGhpcy5wcm90b2NvbCA9IG51bGw7XG4gIHRoaXMuc2xhc2hlcyA9IG51bGw7XG4gIHRoaXMuYXV0aCA9IG51bGw7XG4gIHRoaXMucG9ydCA9IG51bGw7XG4gIHRoaXMuaG9zdG5hbWUgPSBudWxsO1xuICB0aGlzLmhhc2ggPSBudWxsO1xuICB0aGlzLnNlYXJjaCA9IG51bGw7XG4gIHRoaXMucGF0aG5hbWUgPSBudWxsO1xufVxuXG4vLyBSZWZlcmVuY2U6IFJGQyAzOTg2LCBSRkMgMTgwOCwgUkZDIDIzOTZcblxuLy8gZGVmaW5lIHRoZXNlIGhlcmUgc28gYXQgbGVhc3QgdGhleSBvbmx5IGhhdmUgdG8gYmVcbi8vIGNvbXBpbGVkIG9uY2Ugb24gdGhlIGZpcnN0IG1vZHVsZSBsb2FkLlxudmFyIHByb3RvY29sUGF0dGVybiA9IC9eKFthLXowLTkuKy1dKzopL2ksXG4gICAgcG9ydFBhdHRlcm4gPSAvOlswLTldKiQvLFxuXG4gICAgLy8gU3BlY2lhbCBjYXNlIGZvciBhIHNpbXBsZSBwYXRoIFVSTFxuICAgIHNpbXBsZVBhdGhQYXR0ZXJuID0gL14oXFwvXFwvPyg/IVxcLylbXlxcP1xcc10qKShcXD9bXlxcc10qKT8kLyxcblxuICAgIC8vIFJGQyAyMzk2OiBjaGFyYWN0ZXJzIHJlc2VydmVkIGZvciBkZWxpbWl0aW5nIFVSTHMuXG4gICAgLy8gV2UgYWN0dWFsbHkganVzdCBhdXRvLWVzY2FwZSB0aGVzZS5cbiAgICBkZWxpbXMgPSBbICc8JywgJz4nLCAnXCInLCAnYCcsICcgJywgJ1xccicsICdcXG4nLCAnXFx0JyBdLFxuXG4gICAgLy8gUkZDIDIzOTY6IGNoYXJhY3RlcnMgbm90IGFsbG93ZWQgZm9yIHZhcmlvdXMgcmVhc29ucy5cbiAgICB1bndpc2UgPSBbICd7JywgJ30nLCAnfCcsICdcXFxcJywgJ14nLCAnYCcgXS5jb25jYXQoZGVsaW1zKSxcblxuICAgIC8vIEFsbG93ZWQgYnkgUkZDcywgYnV0IGNhdXNlIG9mIFhTUyBhdHRhY2tzLiAgQWx3YXlzIGVzY2FwZSB0aGVzZS5cbiAgICBhdXRvRXNjYXBlID0gWyAnXFwnJyBdLmNvbmNhdCh1bndpc2UpLFxuICAgIC8vIENoYXJhY3RlcnMgdGhhdCBhcmUgbmV2ZXIgZXZlciBhbGxvd2VkIGluIGEgaG9zdG5hbWUuXG4gICAgLy8gTm90ZSB0aGF0IGFueSBpbnZhbGlkIGNoYXJzIGFyZSBhbHNvIGhhbmRsZWQsIGJ1dCB0aGVzZVxuICAgIC8vIGFyZSB0aGUgb25lcyB0aGF0IGFyZSAqZXhwZWN0ZWQqIHRvIGJlIHNlZW4sIHNvIHdlIGZhc3QtcGF0aFxuICAgIC8vIHRoZW0uXG4gICAgbm9uSG9zdENoYXJzID0gWyAnJScsICcvJywgJz8nLCAnOycsICcjJyBdLmNvbmNhdChhdXRvRXNjYXBlKSxcbiAgICBob3N0RW5kaW5nQ2hhcnMgPSBbICcvJywgJz8nLCAnIycgXSxcbiAgICBob3N0bmFtZU1heExlbiA9IDI1NSxcbiAgICBob3N0bmFtZVBhcnRQYXR0ZXJuID0gL15bK2EtejAtOUEtWl8tXXswLDYzfSQvLFxuICAgIGhvc3RuYW1lUGFydFN0YXJ0ID0gL14oWythLXowLTlBLVpfLV17MCw2M30pKC4qKSQvLFxuICAgIC8vIHByb3RvY29scyB0aGF0IGNhbiBhbGxvdyBcInVuc2FmZVwiIGFuZCBcInVud2lzZVwiIGNoYXJzLlxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXNjcmlwdC11cmwgKi9cbiAgICAvLyBwcm90b2NvbHMgdGhhdCBuZXZlciBoYXZlIGEgaG9zdG5hbWUuXG4gICAgaG9zdGxlc3NQcm90b2NvbCA9IHtcbiAgICAgICdqYXZhc2NyaXB0JzogdHJ1ZSxcbiAgICAgICdqYXZhc2NyaXB0Oic6IHRydWVcbiAgICB9LFxuICAgIC8vIHByb3RvY29scyB0aGF0IGFsd2F5cyBjb250YWluIGEgLy8gYml0LlxuICAgIHNsYXNoZWRQcm90b2NvbCA9IHtcbiAgICAgICdodHRwJzogdHJ1ZSxcbiAgICAgICdodHRwcyc6IHRydWUsXG4gICAgICAnZnRwJzogdHJ1ZSxcbiAgICAgICdnb3BoZXInOiB0cnVlLFxuICAgICAgJ2ZpbGUnOiB0cnVlLFxuICAgICAgJ2h0dHA6JzogdHJ1ZSxcbiAgICAgICdodHRwczonOiB0cnVlLFxuICAgICAgJ2Z0cDonOiB0cnVlLFxuICAgICAgJ2dvcGhlcjonOiB0cnVlLFxuICAgICAgJ2ZpbGU6JzogdHJ1ZVxuICAgIH07XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby1zY3JpcHQtdXJsICovXG5cbmZ1bmN0aW9uIHVybFBhcnNlKHVybCwgc2xhc2hlc0Rlbm90ZUhvc3QpIHtcbiAgaWYgKHVybCAmJiB1cmwgaW5zdGFuY2VvZiBVcmwpIHsgcmV0dXJuIHVybDsgfVxuXG4gIHZhciB1ID0gbmV3IFVybCgpO1xuICB1LnBhcnNlKHVybCwgc2xhc2hlc0Rlbm90ZUhvc3QpO1xuICByZXR1cm4gdTtcbn1cblxuVXJsLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uKHVybCwgc2xhc2hlc0Rlbm90ZUhvc3QpIHtcbiAgdmFyIGksIGwsIGxvd2VyUHJvdG8sIGhlYywgc2xhc2hlcyxcbiAgICAgIHJlc3QgPSB1cmw7XG5cbiAgLy8gdHJpbSBiZWZvcmUgcHJvY2VlZGluZy5cbiAgLy8gVGhpcyBpcyB0byBzdXBwb3J0IHBhcnNlIHN0dWZmIGxpa2UgXCIgIGh0dHA6Ly9mb28uY29tICBcXG5cIlxuICByZXN0ID0gcmVzdC50cmltKCk7XG5cbiAgaWYgKCFzbGFzaGVzRGVub3RlSG9zdCAmJiB1cmwuc3BsaXQoJyMnKS5sZW5ndGggPT09IDEpIHtcbiAgICAvLyBUcnkgZmFzdCBwYXRoIHJlZ2V4cFxuICAgIHZhciBzaW1wbGVQYXRoID0gc2ltcGxlUGF0aFBhdHRlcm4uZXhlYyhyZXN0KTtcbiAgICBpZiAoc2ltcGxlUGF0aCkge1xuICAgICAgdGhpcy5wYXRobmFtZSA9IHNpbXBsZVBhdGhbMV07XG4gICAgICBpZiAoc2ltcGxlUGF0aFsyXSkge1xuICAgICAgICB0aGlzLnNlYXJjaCA9IHNpbXBsZVBhdGhbMl07XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1cblxuICB2YXIgcHJvdG8gPSBwcm90b2NvbFBhdHRlcm4uZXhlYyhyZXN0KTtcbiAgaWYgKHByb3RvKSB7XG4gICAgcHJvdG8gPSBwcm90b1swXTtcbiAgICBsb3dlclByb3RvID0gcHJvdG8udG9Mb3dlckNhc2UoKTtcbiAgICB0aGlzLnByb3RvY29sID0gcHJvdG87XG4gICAgcmVzdCA9IHJlc3Quc3Vic3RyKHByb3RvLmxlbmd0aCk7XG4gIH1cblxuICAvLyBmaWd1cmUgb3V0IGlmIGl0J3MgZ290IGEgaG9zdFxuICAvLyB1c2VyQHNlcnZlciBpcyAqYWx3YXlzKiBpbnRlcnByZXRlZCBhcyBhIGhvc3RuYW1lLCBhbmQgdXJsXG4gIC8vIHJlc29sdXRpb24gd2lsbCB0cmVhdCAvL2Zvby9iYXIgYXMgaG9zdD1mb28scGF0aD1iYXIgYmVjYXVzZSB0aGF0J3NcbiAgLy8gaG93IHRoZSBicm93c2VyIHJlc29sdmVzIHJlbGF0aXZlIFVSTHMuXG4gIGlmIChzbGFzaGVzRGVub3RlSG9zdCB8fCBwcm90byB8fCByZXN0Lm1hdGNoKC9eXFwvXFwvW15AXFwvXStAW15AXFwvXSsvKSkge1xuICAgIHNsYXNoZXMgPSByZXN0LnN1YnN0cigwLCAyKSA9PT0gJy8vJztcbiAgICBpZiAoc2xhc2hlcyAmJiAhKHByb3RvICYmIGhvc3RsZXNzUHJvdG9jb2xbcHJvdG9dKSkge1xuICAgICAgcmVzdCA9IHJlc3Quc3Vic3RyKDIpO1xuICAgICAgdGhpcy5zbGFzaGVzID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWhvc3RsZXNzUHJvdG9jb2xbcHJvdG9dICYmXG4gICAgICAoc2xhc2hlcyB8fCAocHJvdG8gJiYgIXNsYXNoZWRQcm90b2NvbFtwcm90b10pKSkge1xuXG4gICAgLy8gdGhlcmUncyBhIGhvc3RuYW1lLlxuICAgIC8vIHRoZSBmaXJzdCBpbnN0YW5jZSBvZiAvLCA/LCA7LCBvciAjIGVuZHMgdGhlIGhvc3QuXG4gICAgLy9cbiAgICAvLyBJZiB0aGVyZSBpcyBhbiBAIGluIHRoZSBob3N0bmFtZSwgdGhlbiBub24taG9zdCBjaGFycyAqYXJlKiBhbGxvd2VkXG4gICAgLy8gdG8gdGhlIGxlZnQgb2YgdGhlIGxhc3QgQCBzaWduLCB1bmxlc3Mgc29tZSBob3N0LWVuZGluZyBjaGFyYWN0ZXJcbiAgICAvLyBjb21lcyAqYmVmb3JlKiB0aGUgQC1zaWduLlxuICAgIC8vIFVSTHMgYXJlIG9ibm94aW91cy5cbiAgICAvL1xuICAgIC8vIGV4OlxuICAgIC8vIGh0dHA6Ly9hQGJAYy8gPT4gdXNlcjphQGIgaG9zdDpjXG4gICAgLy8gaHR0cDovL2FAYj9AYyA9PiB1c2VyOmEgaG9zdDpjIHBhdGg6Lz9AY1xuXG4gICAgLy8gdjAuMTIgVE9ETyhpc2FhY3MpOiBUaGlzIGlzIG5vdCBxdWl0ZSBob3cgQ2hyb21lIGRvZXMgdGhpbmdzLlxuICAgIC8vIFJldmlldyBvdXIgdGVzdCBjYXNlIGFnYWluc3QgYnJvd3NlcnMgbW9yZSBjb21wcmVoZW5zaXZlbHkuXG5cbiAgICAvLyBmaW5kIHRoZSBmaXJzdCBpbnN0YW5jZSBvZiBhbnkgaG9zdEVuZGluZ0NoYXJzXG4gICAgdmFyIGhvc3RFbmQgPSAtMTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgaG9zdEVuZGluZ0NoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBoZWMgPSByZXN0LmluZGV4T2YoaG9zdEVuZGluZ0NoYXJzW2ldKTtcbiAgICAgIGlmIChoZWMgIT09IC0xICYmIChob3N0RW5kID09PSAtMSB8fCBoZWMgPCBob3N0RW5kKSkge1xuICAgICAgICBob3N0RW5kID0gaGVjO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGF0IHRoaXMgcG9pbnQsIGVpdGhlciB3ZSBoYXZlIGFuIGV4cGxpY2l0IHBvaW50IHdoZXJlIHRoZVxuICAgIC8vIGF1dGggcG9ydGlvbiBjYW5ub3QgZ28gcGFzdCwgb3IgdGhlIGxhc3QgQCBjaGFyIGlzIHRoZSBkZWNpZGVyLlxuICAgIHZhciBhdXRoLCBhdFNpZ247XG4gICAgaWYgKGhvc3RFbmQgPT09IC0xKSB7XG4gICAgICAvLyBhdFNpZ24gY2FuIGJlIGFueXdoZXJlLlxuICAgICAgYXRTaWduID0gcmVzdC5sYXN0SW5kZXhPZignQCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhdFNpZ24gbXVzdCBiZSBpbiBhdXRoIHBvcnRpb24uXG4gICAgICAvLyBodHRwOi8vYUBiL2NAZCA9PiBob3N0OmIgYXV0aDphIHBhdGg6L2NAZFxuICAgICAgYXRTaWduID0gcmVzdC5sYXN0SW5kZXhPZignQCcsIGhvc3RFbmQpO1xuICAgIH1cblxuICAgIC8vIE5vdyB3ZSBoYXZlIGEgcG9ydGlvbiB3aGljaCBpcyBkZWZpbml0ZWx5IHRoZSBhdXRoLlxuICAgIC8vIFB1bGwgdGhhdCBvZmYuXG4gICAgaWYgKGF0U2lnbiAhPT0gLTEpIHtcbiAgICAgIGF1dGggPSByZXN0LnNsaWNlKDAsIGF0U2lnbik7XG4gICAgICByZXN0ID0gcmVzdC5zbGljZShhdFNpZ24gKyAxKTtcbiAgICAgIHRoaXMuYXV0aCA9IGF1dGg7XG4gICAgfVxuXG4gICAgLy8gdGhlIGhvc3QgaXMgdGhlIHJlbWFpbmluZyB0byB0aGUgbGVmdCBvZiB0aGUgZmlyc3Qgbm9uLWhvc3QgY2hhclxuICAgIGhvc3RFbmQgPSAtMTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbm9uSG9zdENoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBoZWMgPSByZXN0LmluZGV4T2Yobm9uSG9zdENoYXJzW2ldKTtcbiAgICAgIGlmIChoZWMgIT09IC0xICYmIChob3N0RW5kID09PSAtMSB8fCBoZWMgPCBob3N0RW5kKSkge1xuICAgICAgICBob3N0RW5kID0gaGVjO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBpZiB3ZSBzdGlsbCBoYXZlIG5vdCBoaXQgaXQsIHRoZW4gdGhlIGVudGlyZSB0aGluZyBpcyBhIGhvc3QuXG4gICAgaWYgKGhvc3RFbmQgPT09IC0xKSB7XG4gICAgICBob3N0RW5kID0gcmVzdC5sZW5ndGg7XG4gICAgfVxuXG4gICAgaWYgKHJlc3RbaG9zdEVuZCAtIDFdID09PSAnOicpIHsgaG9zdEVuZC0tOyB9XG4gICAgdmFyIGhvc3QgPSByZXN0LnNsaWNlKDAsIGhvc3RFbmQpO1xuICAgIHJlc3QgPSByZXN0LnNsaWNlKGhvc3RFbmQpO1xuXG4gICAgLy8gcHVsbCBvdXQgcG9ydC5cbiAgICB0aGlzLnBhcnNlSG9zdChob3N0KTtcblxuICAgIC8vIHdlJ3ZlIGluZGljYXRlZCB0aGF0IHRoZXJlIGlzIGEgaG9zdG5hbWUsXG4gICAgLy8gc28gZXZlbiBpZiBpdCdzIGVtcHR5LCBpdCBoYXMgdG8gYmUgcHJlc2VudC5cbiAgICB0aGlzLmhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZSB8fCAnJztcblxuICAgIC8vIGlmIGhvc3RuYW1lIGJlZ2lucyB3aXRoIFsgYW5kIGVuZHMgd2l0aCBdXG4gICAgLy8gYXNzdW1lIHRoYXQgaXQncyBhbiBJUHY2IGFkZHJlc3MuXG4gICAgdmFyIGlwdjZIb3N0bmFtZSA9IHRoaXMuaG9zdG5hbWVbMF0gPT09ICdbJyAmJlxuICAgICAgICB0aGlzLmhvc3RuYW1lW3RoaXMuaG9zdG5hbWUubGVuZ3RoIC0gMV0gPT09ICddJztcblxuICAgIC8vIHZhbGlkYXRlIGEgbGl0dGxlLlxuICAgIGlmICghaXB2Nkhvc3RuYW1lKSB7XG4gICAgICB2YXIgaG9zdHBhcnRzID0gdGhpcy5ob3N0bmFtZS5zcGxpdCgvXFwuLyk7XG4gICAgICBmb3IgKGkgPSAwLCBsID0gaG9zdHBhcnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB2YXIgcGFydCA9IGhvc3RwYXJ0c1tpXTtcbiAgICAgICAgaWYgKCFwYXJ0KSB7IGNvbnRpbnVlOyB9XG4gICAgICAgIGlmICghcGFydC5tYXRjaChob3N0bmFtZVBhcnRQYXR0ZXJuKSkge1xuICAgICAgICAgIHZhciBuZXdwYXJ0ID0gJyc7XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDAsIGsgPSBwYXJ0Lmxlbmd0aDsgaiA8IGs7IGorKykge1xuICAgICAgICAgICAgaWYgKHBhcnQuY2hhckNvZGVBdChqKSA+IDEyNykge1xuICAgICAgICAgICAgICAvLyB3ZSByZXBsYWNlIG5vbi1BU0NJSSBjaGFyIHdpdGggYSB0ZW1wb3JhcnkgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgICAgLy8gd2UgbmVlZCB0aGlzIHRvIG1ha2Ugc3VyZSBzaXplIG9mIGhvc3RuYW1lIGlzIG5vdFxuICAgICAgICAgICAgICAvLyBicm9rZW4gYnkgcmVwbGFjaW5nIG5vbi1BU0NJSSBieSBub3RoaW5nXG4gICAgICAgICAgICAgIG5ld3BhcnQgKz0gJ3gnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbmV3cGFydCArPSBwYXJ0W2pdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyB3ZSB0ZXN0IGFnYWluIHdpdGggQVNDSUkgY2hhciBvbmx5XG4gICAgICAgICAgaWYgKCFuZXdwYXJ0Lm1hdGNoKGhvc3RuYW1lUGFydFBhdHRlcm4pKSB7XG4gICAgICAgICAgICB2YXIgdmFsaWRQYXJ0cyA9IGhvc3RwYXJ0cy5zbGljZSgwLCBpKTtcbiAgICAgICAgICAgIHZhciBub3RIb3N0ID0gaG9zdHBhcnRzLnNsaWNlKGkgKyAxKTtcbiAgICAgICAgICAgIHZhciBiaXQgPSBwYXJ0Lm1hdGNoKGhvc3RuYW1lUGFydFN0YXJ0KTtcbiAgICAgICAgICAgIGlmIChiaXQpIHtcbiAgICAgICAgICAgICAgdmFsaWRQYXJ0cy5wdXNoKGJpdFsxXSk7XG4gICAgICAgICAgICAgIG5vdEhvc3QudW5zaGlmdChiaXRbMl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vdEhvc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHJlc3QgPSBub3RIb3N0LmpvaW4oJy4nKSArIHJlc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmhvc3RuYW1lID0gdmFsaWRQYXJ0cy5qb2luKCcuJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5ob3N0bmFtZS5sZW5ndGggPiBob3N0bmFtZU1heExlbikge1xuICAgICAgdGhpcy5ob3N0bmFtZSA9ICcnO1xuICAgIH1cblxuICAgIC8vIHN0cmlwIFsgYW5kIF0gZnJvbSB0aGUgaG9zdG5hbWVcbiAgICAvLyB0aGUgaG9zdCBmaWVsZCBzdGlsbCByZXRhaW5zIHRoZW0sIHRob3VnaFxuICAgIGlmIChpcHY2SG9zdG5hbWUpIHtcbiAgICAgIHRoaXMuaG9zdG5hbWUgPSB0aGlzLmhvc3RuYW1lLnN1YnN0cigxLCB0aGlzLmhvc3RuYW1lLmxlbmd0aCAtIDIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGNob3Agb2ZmIGZyb20gdGhlIHRhaWwgZmlyc3QuXG4gIHZhciBoYXNoID0gcmVzdC5pbmRleE9mKCcjJyk7XG4gIGlmIChoYXNoICE9PSAtMSkge1xuICAgIC8vIGdvdCBhIGZyYWdtZW50IHN0cmluZy5cbiAgICB0aGlzLmhhc2ggPSByZXN0LnN1YnN0cihoYXNoKTtcbiAgICByZXN0ID0gcmVzdC5zbGljZSgwLCBoYXNoKTtcbiAgfVxuICB2YXIgcW0gPSByZXN0LmluZGV4T2YoJz8nKTtcbiAgaWYgKHFtICE9PSAtMSkge1xuICAgIHRoaXMuc2VhcmNoID0gcmVzdC5zdWJzdHIocW0pO1xuICAgIHJlc3QgPSByZXN0LnNsaWNlKDAsIHFtKTtcbiAgfVxuICBpZiAocmVzdCkgeyB0aGlzLnBhdGhuYW1lID0gcmVzdDsgfVxuICBpZiAoc2xhc2hlZFByb3RvY29sW2xvd2VyUHJvdG9dICYmXG4gICAgICB0aGlzLmhvc3RuYW1lICYmICF0aGlzLnBhdGhuYW1lKSB7XG4gICAgdGhpcy5wYXRobmFtZSA9ICcnO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5VcmwucHJvdG90eXBlLnBhcnNlSG9zdCA9IGZ1bmN0aW9uKGhvc3QpIHtcbiAgdmFyIHBvcnQgPSBwb3J0UGF0dGVybi5leGVjKGhvc3QpO1xuICBpZiAocG9ydCkge1xuICAgIHBvcnQgPSBwb3J0WzBdO1xuICAgIGlmIChwb3J0ICE9PSAnOicpIHtcbiAgICAgIHRoaXMucG9ydCA9IHBvcnQuc3Vic3RyKDEpO1xuICAgIH1cbiAgICBob3N0ID0gaG9zdC5zdWJzdHIoMCwgaG9zdC5sZW5ndGggLSBwb3J0Lmxlbmd0aCk7XG4gIH1cbiAgaWYgKGhvc3QpIHsgdGhpcy5ob3N0bmFtZSA9IGhvc3Q7IH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gdXJsUGFyc2U7XG4iLCJtb2R1bGUuZXhwb3J0cz0vW1xcMC1cXHgxRlxceDdGLVxceDlGXS8iLCJtb2R1bGUuZXhwb3J0cz0vW1xceEFEXFx1MDYwMC1cXHUwNjA1XFx1MDYxQ1xcdTA2RERcXHUwNzBGXFx1MTgwRVxcdTIwMEItXFx1MjAwRlxcdTIwMkEtXFx1MjAyRVxcdTIwNjAtXFx1MjA2NFxcdTIwNjYtXFx1MjA2RlxcdUZFRkZcXHVGRkY5LVxcdUZGRkJdfFxcdUQ4MDRcXHVEQ0JEfFxcdUQ4MkZbXFx1RENBMC1cXHVEQ0EzXXxcXHVEODM0W1xcdURENzMtXFx1REQ3QV18XFx1REI0MFtcXHVEQzAxXFx1REMyMC1cXHVEQzdGXS8iLCJtb2R1bGUuZXhwb3J0cz0vWyEtIyUtXFwqLC0vOjtcXD9AXFxbLVxcXV9cXHtcXH1cXHhBMVxceEE3XFx4QUJcXHhCNlxceEI3XFx4QkJcXHhCRlxcdTAzN0VcXHUwMzg3XFx1MDU1QS1cXHUwNTVGXFx1MDU4OVxcdTA1OEFcXHUwNUJFXFx1MDVDMFxcdTA1QzNcXHUwNUM2XFx1MDVGM1xcdTA1RjRcXHUwNjA5XFx1MDYwQVxcdTA2MENcXHUwNjBEXFx1MDYxQlxcdTA2MUVcXHUwNjFGXFx1MDY2QS1cXHUwNjZEXFx1MDZENFxcdTA3MDAtXFx1MDcwRFxcdTA3RjctXFx1MDdGOVxcdTA4MzAtXFx1MDgzRVxcdTA4NUVcXHUwOTY0XFx1MDk2NVxcdTA5NzBcXHUwQUYwXFx1MERGNFxcdTBFNEZcXHUwRTVBXFx1MEU1QlxcdTBGMDQtXFx1MEYxMlxcdTBGMTRcXHUwRjNBLVxcdTBGM0RcXHUwRjg1XFx1MEZEMC1cXHUwRkQ0XFx1MEZEOVxcdTBGREFcXHUxMDRBLVxcdTEwNEZcXHUxMEZCXFx1MTM2MC1cXHUxMzY4XFx1MTQwMFxcdTE2NkRcXHUxNjZFXFx1MTY5QlxcdTE2OUNcXHUxNkVCLVxcdTE2RURcXHUxNzM1XFx1MTczNlxcdTE3RDQtXFx1MTdENlxcdTE3RDgtXFx1MTdEQVxcdTE4MDAtXFx1MTgwQVxcdTE5NDRcXHUxOTQ1XFx1MUExRVxcdTFBMUZcXHUxQUEwLVxcdTFBQTZcXHUxQUE4LVxcdTFBQURcXHUxQjVBLVxcdTFCNjBcXHUxQkZDLVxcdTFCRkZcXHUxQzNCLVxcdTFDM0ZcXHUxQzdFXFx1MUM3RlxcdTFDQzAtXFx1MUNDN1xcdTFDRDNcXHUyMDEwLVxcdTIwMjdcXHUyMDMwLVxcdTIwNDNcXHUyMDQ1LVxcdTIwNTFcXHUyMDUzLVxcdTIwNUVcXHUyMDdEXFx1MjA3RVxcdTIwOERcXHUyMDhFXFx1MjMwOC1cXHUyMzBCXFx1MjMyOVxcdTIzMkFcXHUyNzY4LVxcdTI3NzVcXHUyN0M1XFx1MjdDNlxcdTI3RTYtXFx1MjdFRlxcdTI5ODMtXFx1Mjk5OFxcdTI5RDgtXFx1MjlEQlxcdTI5RkNcXHUyOUZEXFx1MkNGOS1cXHUyQ0ZDXFx1MkNGRVxcdTJDRkZcXHUyRDcwXFx1MkUwMC1cXHUyRTJFXFx1MkUzMC1cXHUyRTQyXFx1MzAwMS1cXHUzMDAzXFx1MzAwOC1cXHUzMDExXFx1MzAxNC1cXHUzMDFGXFx1MzAzMFxcdTMwM0RcXHUzMEEwXFx1MzBGQlxcdUE0RkVcXHVBNEZGXFx1QTYwRC1cXHVBNjBGXFx1QTY3M1xcdUE2N0VcXHVBNkYyLVxcdUE2RjdcXHVBODc0LVxcdUE4NzdcXHVBOENFXFx1QThDRlxcdUE4RjgtXFx1QThGQVxcdUE5MkVcXHVBOTJGXFx1QTk1RlxcdUE5QzEtXFx1QTlDRFxcdUE5REVcXHVBOURGXFx1QUE1Qy1cXHVBQTVGXFx1QUFERVxcdUFBREZcXHVBQUYwXFx1QUFGMVxcdUFCRUJcXHVGRDNFXFx1RkQzRlxcdUZFMTAtXFx1RkUxOVxcdUZFMzAtXFx1RkU1MlxcdUZFNTQtXFx1RkU2MVxcdUZFNjNcXHVGRTY4XFx1RkU2QVxcdUZFNkJcXHVGRjAxLVxcdUZGMDNcXHVGRjA1LVxcdUZGMEFcXHVGRjBDLVxcdUZGMEZcXHVGRjFBXFx1RkYxQlxcdUZGMUZcXHVGRjIwXFx1RkYzQi1cXHVGRjNEXFx1RkYzRlxcdUZGNUJcXHVGRjVEXFx1RkY1Ri1cXHVGRjY1XXxcXHVEODAwW1xcdUREMDAtXFx1REQwMlxcdURGOUZcXHVERkQwXXxcXHVEODAxXFx1REQ2RnxcXHVEODAyW1xcdURDNTdcXHVERDFGXFx1REQzRlxcdURFNTAtXFx1REU1OFxcdURFN0ZcXHVERUYwLVxcdURFRjZcXHVERjM5LVxcdURGM0ZcXHVERjk5LVxcdURGOUNdfFxcdUQ4MDRbXFx1REM0Ny1cXHVEQzREXFx1RENCQlxcdURDQkNcXHVEQ0JFLVxcdURDQzFcXHVERDQwLVxcdURENDNcXHVERDc0XFx1REQ3NVxcdUREQzUtXFx1RERDOFxcdUREQ0RcXHVERTM4LVxcdURFM0RdfFxcdUQ4MDVbXFx1RENDNlxcdUREQzEtXFx1RERDOVxcdURFNDEtXFx1REU0M118XFx1RDgwOVtcXHVEQzcwLVxcdURDNzRdfFxcdUQ4MUFbXFx1REU2RVxcdURFNkZcXHVERUY1XFx1REYzNy1cXHVERjNCXFx1REY0NF18XFx1RDgyRlxcdURDOUYvIiwibW9kdWxlLmV4cG9ydHM9L1sgXFx4QTBcXHUxNjgwXFx1MjAwMC1cXHUyMDBBXFx1MjAyOFxcdTIwMjlcXHUyMDJGXFx1MjA1RlxcdTMwMDBdLyIsIlxubW9kdWxlLmV4cG9ydHMuQW55ID0gcmVxdWlyZSgnLi9wcm9wZXJ0aWVzL0FueS9yZWdleCcpO1xubW9kdWxlLmV4cG9ydHMuQ2MgID0gcmVxdWlyZSgnLi9jYXRlZ29yaWVzL0NjL3JlZ2V4Jyk7XG5tb2R1bGUuZXhwb3J0cy5DZiAgPSByZXF1aXJlKCcuL2NhdGVnb3JpZXMvQ2YvcmVnZXgnKTtcbm1vZHVsZS5leHBvcnRzLlAgICA9IHJlcXVpcmUoJy4vY2F0ZWdvcmllcy9QL3JlZ2V4Jyk7XG5tb2R1bGUuZXhwb3J0cy5aICAgPSByZXF1aXJlKCcuL2NhdGVnb3JpZXMvWi9yZWdleCcpO1xuIiwibW9kdWxlLmV4cG9ydHM9L1tcXDAtXFx1RDdGRlxcdURDMDAtXFx1RkZGRl18W1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXXxbXFx1RDgwMC1cXHVEQkZGXS8iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIFRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09IG51bGwpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIga2V5cztcblx0dmFyIHRvID0gVG9PYmplY3QodGFyZ2V0KTtcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBhcmd1bWVudHNbc107XG5cdFx0a2V5cyA9IE9iamVjdC5rZXlzKE9iamVjdChmcm9tKSk7XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRvW2tleXNbaV1dID0gZnJvbVtrZXlzW2ldXTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQmFjb24gZnJvbSAnYmFjb25qcyc7XG5pbXBvcnQgdXRpbCAgZnJvbSAnLi91dGlsJztcblxuY29uc3QgQVRUUl9CQUNLRkFDRSAgPSAnYmFja2ZhY2UnO1xuY29uc3QgQVRUUl9GSUxURVIgICAgPSAnYmFja2ZhY2UtZmlsdGVyJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBCYWNrZmFjZVJldHVybnNcbiAqIEBwcm9wZXJ0eSB7QmFjb24uQnVzfSBiZ0ltYWdlQnVzXG4gKiBAcHJvcGVydHkge0JhY29uLkJ1c30gYmdGaWx0ZXJCdXNcbiAqL1xuXG4vKipcbiAqIGJhY2tmYWNlXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXRcbiAqIEByZXR1cm5zIHtCYWNrZmFjZVJldHVybnN9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHRhcmdldCkge1xuXG4gIGxldCBiZ0ltYWdlQnVzID0gbmV3IEJhY29uLkJ1cygpO1xuICBsZXQgYmdGaWx0ZXJCdXMgPSBuZXcgQmFjb24uQnVzKCk7XG5cbiAgLy8gYmFja2ZhY2UgaW1hZ2VcbiAgYmdJbWFnZUJ1c1xuICAgIC5tYXAoJy5nZXRBdHRyaWJ1dGUnLCBBVFRSX0JBQ0tGQUNFKVxuICAgIC5tYXAoKHNyYykgPT4gc3JjID8gYHVybCgke3NyY30pYCA6ICcnKVxuICAgIC5vblZhbHVlKHV0aWwuc3R5bGVBc3NpZ25PZih0YXJnZXQsICdiYWNrZ3JvdW5kLWltYWdlJykpO1xuXG4gIC8vIGJhY2tmYWNlIGltYWdlIGNzcyBmaWx0ZXJcbiAgYmdGaWx0ZXJCdXNcbiAgICAubWFwKCcuZ2V0QXR0cmlidXRlJywgQVRUUl9GSUxURVIpXG4gICAgLm9uVmFsdWUodXRpbC5zdHlsZUFzc2lnbk9mKHRhcmdldCwgdXRpbC5zdHlsZVByZWZpeERldGVjdCgnZmlsdGVyJykpKTtcblxuICBCYWNvbi5mcm9tQXJyYXkodXRpbC50b0FycmF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFske0FUVFJfQkFDS0ZBQ0V9XWApKSlcbiAgICAubWFwKCcuZ2V0QXR0cmlidXRlJywgQVRUUl9CQUNLRkFDRSlcbiAgICAuZmlsdGVyKCh2KSA9PiAhIXYpXG4gICAgLm9uVmFsdWUodXRpbC5wcmVsb2FkSW1nKTtcblxuICByZXR1cm4ge1xuICAgIGJnSW1hZ2VCdXMgIDogYmdJbWFnZUJ1cyxcbiAgICBiZ0ZpbHRlckJ1cyA6IGJnRmlsdGVyQnVzXG4gIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBCYWNvbiAgIGZyb20gJ2JhY29uanMnO1xuaW1wb3J0IGtleWNvZGUgZnJvbSAna2V5Y29kZSc7XG5cbmNvbnN0IEVWRU5UX0tFWVVQID0gQmFjb24uZnJvbUV2ZW50VGFyZ2V0KGRvY3VtZW50LCAna2V5dXAnKTtcbmNvbnN0IEVWRU5UX0tFWURPV04gPSBCYWNvbi5mcm9tRXZlbnRUYXJnZXQoZG9jdW1lbnQsICdrZXlkb3duJyk7XG5cbi8qKlxuICogY3JlYXRlIEV2ZW50U3RyZWFtIGZyb20gdXNlciBpbnB1dFxuICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IGNoYXJLZXlcbiAgICogQHJldHVybnMge0V2ZW50U3RyZWFtfVxuICAgKi9cbiAga2V5KGNoYXJLZXkpIHtcbiAgICBsZXQga2V5Q29kZSA9IHR5cGVvZiBjaGFyS2V5ID09PSAnc3RyaW5nJyA/IGtleWNvZGUoY2hhcktleSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGNoYXJLZXk7XG4gICAgcmV0dXJuIEVWRU5UX0tFWVVQLmZpbHRlcihrZXlDb2RlSXMoa2V5Q29kZSkpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IGNoYXJLZXlcbiAgICogQHJldHVybnMge0V2ZW50U3RyZWFtfVxuICAgKi9cbiAga2V5ZG93bihjaGFyS2V5KSB7XG4gICAgbGV0IGtleUNvZGUgPSB0eXBlb2YgY2hhcktleSA9PT0gJ3N0cmluZycgPyBrZXljb2RlKGNoYXJLZXkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBjaGFyS2V5O1xuICAgIHJldHVybiBFVkVOVF9LRVlET1dOLmZpbHRlcihrZXlDb2RlSXMoa2V5Q29kZSkpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEByZXR1cm5zIHtFdmVudFN0cmVhbX1cbiAgICovXG4gIGNsaWNrKGVsKSB7XG4gICAgcmV0dXJuIEJhY29uLmZyb21FdmVudFRhcmdldChlbCwgJ2NsaWNrJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gW2VsID0gZG9jdW1lbnQuYm9keV1cbiAgICogQHJldHVybnMge0V2ZW50U3RyZWFtfVxuICAgKi9cbiAgbW91c2Vtb3ZlKGVsID0gZG9jdW1lbnQuYm9keSkge1xuICAgIHJldHVybiBCYWNvbi5mcm9tRXZlbnRUYXJnZXQoZWwsICdtb3VzZW1vdmUnKTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcmV0dXJucyB7RXZlbnRTdHJlYW19XG4gICAqL1xuICB0b3VjaHN0YXJ0KGVsKSB7XG4gICAgcmV0dXJuIEJhY29uLmZyb21FdmVudFRhcmdldChlbCwgJ3RvdWNoc3RhcnQnKTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcmV0dXJucyB7RXZlbnRTdHJlYW19XG4gICAqL1xuICB0b3VjaGVuZChlbCkge1xuICAgIHJldHVybiBCYWNvbi5mcm9tRXZlbnRUYXJnZXQoZWwsICd0b3VjaGVuZCcpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEByZXR1cm5zIHtFdmVudFN0cmVhbX1cbiAgICovXG4gIHRvdWNobW92ZShlbCkge1xuICAgIHJldHVybiBCYWNvbi5mcm9tRXZlbnRUYXJnZXQoZWwsICd0b3VjaG1vdmUnKTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge0JhY29uLkJ1c30gW3N0b3BCdXMgPSBuZXcgQmFjb24uQnVzKCldXG4gICAqIEByZXR1cm5zIHtFdmVudFN0cmVhbX1cbiAgICovXG4gIHN3aXBlKGVsLCBzdG9wQnVzID0gbmV3IEJhY29uLkJ1cygpKSB7XG4gICAgbGV0IHN0YXJ0ID0gdGhpcy50b3VjaHN0YXJ0KGVsKS5kb0FjdGlvbignLnByZXZlbnREZWZhdWx0Jyk7XG4gICAgbGV0IG1vdmUgID0gdGhpcy50b3VjaG1vdmUoZWwpLmRvQWN0aW9uKCcucHJldmVudERlZmF1bHQnKS50aHJvdHRsZSgxMDApO1xuICAgIGxldCBlbmQgICA9IHRoaXMudG91Y2hlbmQoZWwpLmRvQWN0aW9uKCcucHJldmVudERlZmF1bHQnKTtcblxuICAgIHN0b3BCdXMucGx1ZyhlbmQpO1xuXG4gICAgcmV0dXJuIHN0YXJ0LmZsYXRNYXAoZnVuY3Rpb24oaW5pdGlhbCkge1xuICAgICAgbGV0IGluaXRpYWxWYWx1ZSA9IHtcbiAgICAgICAgaW5pdCA6IGluaXRpYWwuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCxcbiAgICAgICAgY3VydCA6IDBcbiAgICAgIH07XG4gICAgICByZXR1cm4gbW92ZS50YWtlVW50aWwoc3RvcEJ1cykuc2Nhbihpbml0aWFsVmFsdWUsIGZ1bmN0aW9uKGFjYywgY3VycmVudCkge1xuICAgICAgICBhY2MuY3VydCA9IGN1cnJlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0pLnNraXAoMSk7XG4gICAgfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gW2VsID0gZG9jdW1lbnQuYm9keV1cbiAgICogQHJldHVybnMge0V2ZW50U3RyZWFtfVxuICAgKi9cbiAgc3dpcGVMZWZ0KGVsID0gZG9jdW1lbnQuYm9keSkge1xuICAgIGxldCBzdG9wQnVzID0gbmV3IEJhY29uLkJ1cygpO1xuXG4gICAgcmV0dXJuIHRoaXMuc3dpcGUoZWwsIHN0b3BCdXMpLmZpbHRlcigobW92ZXMpID0+IHtcbiAgICAgIGxldCB7aW5pdCwgY3VydH0gPSBtb3ZlcztcbiAgICAgIGxldCBkZWx0YSA9IGN1cnQgLSBpbml0O1xuICAgICAgcmV0dXJuIGRlbHRhIDwgLTEwICYmIHN0b3BCdXMucHVzaCh0cnVlKTtcbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtFbGVtZW50fSBbZWwgPSBkb2N1bWVudC5ib2R5XVxuICAgKiBAcmV0dXJucyB7RXZlbnRTdHJlYW19XG4gICAqL1xuICBzd2lwZVJpZ2h0KGVsID0gZG9jdW1lbnQuYm9keSkge1xuICAgIGxldCBzdG9wQnVzID0gbmV3IEJhY29uLkJ1cygpO1xuXG4gICAgcmV0dXJuIHRoaXMuc3dpcGUoZWwsIHN0b3BCdXMpLmZpbHRlcigobW92ZXMpID0+IHtcbiAgICAgIGxldCB7aW5pdCwgY3VydH0gPSBtb3ZlcztcbiAgICAgIGxldCBkZWx0YSA9IGN1cnQgLSBpbml0O1xuICAgICAgcmV0dXJuIGRlbHRhID4gMTAgJiYgc3RvcEJ1cy5wdXNoKHRydWUpO1xuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7RXZlbnRTdHJlYW19XG4gICAqL1xuICByZXNpemUoKSB7XG4gICAgcmV0dXJuIEJhY29uLmZyb21FdmVudFRhcmdldCh3aW5kb3csICdyZXNpemUnKTtcbiAgfSxcblxuICAvKipcbiAgICogQHJldHVybnMge0V2ZW50U3RyZWFtfVxuICAgKi9cbiAgaGFzaGNoYW5nZSgpIHtcbiAgICByZXR1cm4gQmFjb24uZnJvbUV2ZW50VGFyZ2V0KHdpbmRvdywgJ2hhc2hjaGFuZ2UnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge051bWJlcn0ga2V5Q29kZVxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBrZXlDb2RlSXMoa2V5Q29kZSkge1xuICByZXR1cm4gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICByZXR1cm4gZXZlbnQua2V5Q29kZSA9PT0ga2V5Q29kZTtcbiAgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEJhY29uICAgZnJvbSAnYmFjb25qcyc7XG5cbi8qKlxuICogZnVsbCBzY3JlZW5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldFxuICogQHJldHVybnMgdm9pZFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0YXJnZXQpIHtcbiAgbGV0IGJ1cyA9IG5ldyBCYWNvbi5CdXMoKTtcbiAgYnVzLm9uVmFsdWUodG9nZ2xlU2NyZWVuT2YodGFyZ2V0KSk7XG4gIHJldHVybiBidXM7XG59XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiB0b2dnbGVTY3JlZW5PZihlbCkge1xuICBsZXQgcmVxdWVzdCwgZXhpdDtcblxuICBpZiAoZWwucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICByZXF1ZXN0ID0gJ3JlcXVlc3RGdWxsc2NyZWVuJztcbiAgfSBlbHNlIGlmIChlbC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgIHJlcXVlc3QgPSAnd2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4nO1xuICB9IGVsc2UgaWYgKGVsLm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XG4gICAgcmVxdWVzdCA9ICdtb3pSZXF1ZXN0RnVsbFNjcmVlbic7XG4gIH0gZWxzZSBpZiAoZWwubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgIHJlcXVlc3QgPSAnbXNSZXF1ZXN0RnVsbHNjcmVlbic7XG4gIH1cblxuICBpZiAoZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4pIHtcbiAgICBleGl0ID0gJ2V4aXRGdWxsc2NyZWVuJztcbiAgfSBlbHNlIGlmIChkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbikge1xuICAgIGV4aXQgPSAnd2Via2l0RXhpdEZ1bGxzY3JlZW4nO1xuICB9IGVsc2UgaWYgKGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICBleGl0ID0gJ21vekNhbmNlbEZ1bGxTY3JlZW4nO1xuICB9IGVsc2UgaWYgKGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4pIHtcbiAgICBleGl0ID0gJ21zRXhpdEZ1bGxzY3JlZW4nO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGlmICghZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQgJiZcbiAgICAgICFkb2N1bWVudC5tb3pGdWxsU2NyZWVuRWxlbWVudCAmJlxuICAgICAgIWRvY3VtZW50LndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50ICYmXG4gICAgICAhZG9jdW1lbnQubXNGdWxsc2NyZWVuRWxlbWVudCkge1xuICAgICAgZWxbcmVxdWVzdF0oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnRbZXhpdF0oKTtcbiAgICB9XG4gIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBCYWNvbiAgIGZyb20gJ2JhY29uanMnO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFBhZ2luZ09wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBzdGFydFBhZ2VcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBlbmRQYWdlXG4gKiBAcHJvcGVydHkge0FycmF5PEVsZW1lbnQ+fSBzbGlkZUVsZW1lbnRzXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQYWdpbmdSZXR1cm5zXG4gKiBAcHJvcGVydHkge0JhY29uLkV2ZW50U3RyZWFtfSBjdXJyZW50RXNcbiAqIEBwcm9wZXJ0eSB7QmFjb24uRXZlbnRTdHJlYW19IHN0YXJ0RXNcbiAqIEBwcm9wZXJ0eSB7QmFjb24uRXZlbnRTdHJlYW19IGVuZEVzXG4gKiBAcHJvcGVydHkge0JhY29uLkV2ZW50U3RyZWFtfSBjaGFuZ2VkRXNcbiAqIEBwcm9wZXJ0eSB7QmFjb24uRXZlbnRTdHJlYW19IHBlcmNlbnRFc1xuICogQHByb3BlcnR5IHtCYWNvbi5CdXN9IG5leHRCdXNcbiAqIEBwcm9wZXJ0eSB7QmFjb24uQnVzfSBwcmV2QnVzXG4gKiBAcHJvcGVydHkge0JhY29uLkJ1c30gbW92ZUJ1c1xuICovXG5cbi8qKlxuICogcGFnaW5nIGNvbnRyb2xcbiAqXG4gKiBAcGFyYW0ge1BhZ2luZ09wdGlvbnN9IG9wdGlvbnNcbiAqIEByZXR1cm5zIHtQYWdpbmdSZXR1cm5zfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgbGV0IG5leHRCdXMgPSBuZXcgQmFjb24uQnVzKCk7XG4gIGxldCBwcmV2QnVzID0gbmV3IEJhY29uLkJ1cygpO1xuICBsZXQgbW92ZUJ1cyA9IG5ldyBCYWNvbi5CdXMoKTtcblxuICBsZXQgY3VycmVudEJ1cyAgPSBuZXcgQmFjb24uQnVzKCk7XG4gIGxldCBjdXJyZW50UGFnZSA9IGN1cnJlbnRCdXNcbiAgICAubWFwKGluUmFuZ2VPZigxLCBvcHRpb25zLmVuZFBhZ2UpKVxuICAgIC50b1Byb3BlcnR5KG9wdGlvbnMuc3RhcnRQYWdlIHx8IDEpXG4gICAgLnNraXBEdXBsaWNhdGVzKCk7XG5cbiAgbGV0IG5leHRFcyA9IGN1cnJlbnRQYWdlLnNhbXBsZWRCeShuZXh0QnVzKS5tYXAoKHYpID0+IHYgKyAxKTtcbiAgbGV0IHByZXZFcyA9IGN1cnJlbnRQYWdlLnNhbXBsZWRCeShwcmV2QnVzKS5tYXAoKHYpID0+IHYgLSAxKTtcbiAgbGV0IG1vdmVFcyA9IG1vdmVCdXMubWFwKCh2KSA9PiB2IC8qbm9vcCovKTtcblxuICBsZXQgcGVyY2VudFN0cmluZyA9IGN1cnJlbnRQYWdlLm1hcChwZXJjZW50T2Yob3B0aW9ucy5lbmRQYWdlKSk7XG4gIGxldCBjdXJyZW50U2xpZGUgID0gY3VycmVudFBhZ2UubWFwKChpKSA9PiBvcHRpb25zLnNsaWRlRWxlbWVudHNbaSAtIDFdKTtcblxuICBjdXJyZW50QnVzLnBsdWcobmV4dEVzLm1lcmdlKHByZXZFcykubWVyZ2UobW92ZUVzKSk7XG5cbiAgY3VycmVudFNsaWRlLm9uVmFsdWUoZnVuY3Rpb24oY3VycmVudCkge1xuICAgIG9wdGlvbnMuc2xpZGVFbGVtZW50cy5mb3JFYWNoKHRvSW52aXNpYmxlKTtcbiAgICBjdXJyZW50ICYmIHRvVmlzaWJsZShjdXJyZW50KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICBjdXJyZW50RXMgOiBjdXJyZW50UGFnZSxcbiAgICBzdGFydEVzICAgOiBjdXJyZW50UGFnZS5maWx0ZXIoKHYpID0+IHYgPT09IDEpLFxuICAgIGVuZEVzICAgICA6IGN1cnJlbnRQYWdlLmZpbHRlcigodikgPT4gdiA9PT0gb3B0aW9ucy5lbmRQYWdlKSxcbiAgICBjaGFuZ2VkRXMgOiBjdXJyZW50U2xpZGUsXG4gICAgcGVyY2VudEVzIDogcGVyY2VudFN0cmluZyxcbiAgICBuZXh0QnVzICAgOiBuZXh0QnVzLFxuICAgIHByZXZCdXMgICA6IHByZXZCdXMsXG4gICAgbW92ZUJ1cyAgIDogbW92ZUJ1c1xuICB9O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAqL1xuZnVuY3Rpb24gdG9JbnZpc2libGUoZWwpIHtcbiAgZWwucmVtb3ZlQXR0cmlidXRlKCd2aXNpYmxlJyk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICovXG5mdW5jdGlvbiB0b1Zpc2libGUoZWwpIHtcbiAgZWwuc2V0QXR0cmlidXRlKCd2aXNpYmxlJywgMSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1pblxuICogQHBhcmFtIHtOdW1iZXJ9IG1heFxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBpblJhbmdlT2YobWluLCBtYXgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHopIHtcbiAgICByZXR1cm4gTWF0aC5taW4obWF4LCBNYXRoLm1heCh6LCBtaW4pKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge051bWJlcn0gbWF4XG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHBlcmNlbnRPZihtYXgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGN1cnJlbnQpIHtcbiAgICByZXR1cm4gKCgxMDAgLyBtYXgpICogY3VycmVudCkgKyAnJSc7XG4gIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBCYWNvbiBmcm9tICdiYWNvbmpzJztcbmltcG9ydCB1dGlsICBmcm9tICcuL3V0aWwnO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFBvaW50ZXJSZXR1cm5zXG4gKiBAcHJvcGVydHkge0JhY29uLkJ1c30gY29vcmRCdXNcbiAqIEBwcm9wZXJ0eSB7QmFjb24uQnVzfSB0b2dnbGVCdXNcbiAqL1xuXG4vKipcbiAqIHBvaW50ZXIgbW9kZVxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0XG4gKiBAcmV0dXJucyB7UG9pbnRlclJldHVybnN9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHRhcmdldCkge1xuXG4gIGxldCBjb29yZEJ1cyAgPSBuZXcgQmFjb24uQnVzKCk7XG4gIGxldCB0b2dnbGVCdXMgPSBuZXcgQmFjb24uQnVzKCk7XG5cbiAgbGV0IHggPSBjb29yZEJ1cy5tYXAoKGUpID0+IGUuY2xpZW50WCArICdweCcpO1xuICBsZXQgeSA9IGNvb3JkQnVzLm1hcCgoZSkgPT4gZS5jbGllbnRZICsgJ3B4Jyk7XG5cbiAgeC5vblZhbHVlKHV0aWwuc3R5bGVBc3NpZ25PZih0YXJnZXQsICdsZWZ0JykpO1xuICB5Lm9uVmFsdWUodXRpbC5zdHlsZUFzc2lnbk9mKHRhcmdldCwgJ3RvcCcpKTtcblxuICB0b2dnbGVCdXNcbiAgICAuc2NhbihmYWxzZSwgKGFjYykgPT4gIWFjYylcbiAgICAubWFwKChib29sKSA9PiBib29sID8gJ3Zpc2libGUnIDogJ2hpZGRlbicpXG4gICAgLm9uVmFsdWUodXRpbC5zdHlsZUFzc2lnbk9mKHRhcmdldCwgJ3Zpc2liaWxpdHknKSk7XG5cbiAgcmV0dXJuIHtcbiAgICBjb29yZEJ1cyAgOiBjb29yZEJ1cyxcbiAgICB0b2dnbGVCdXMgOiB0b2dnbGVCdXNcbiAgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWwgZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKiBxdWVyeSBwYXJhbWV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHBhcnNlUXVlcnk7XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5XG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBwYXJzZVF1ZXJ5KHF1ZXJ5KSB7XG4gIGxldCByZXQgPSAge307XG4gIHF1ZXJ5XG4gICAgLnNsaWNlKDEpXG4gICAgLnNwbGl0KCcmJylcbiAgICAubWFwKChrZXlFcVZhbCkgPT4ga2V5RXFWYWwuc3BsaXQoJz0nKSlcbiAgICAuZm9yRWFjaCgoa3YpID0+IHJldFtrdlswXV0gPSB1dGlsLmdldFByaW1pdGl2ZUZyb21TdHJpbmcoa3ZbMV0pKTtcbiAgcmV0dXJuIHJldDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEJhY29uIGZyb20gJ2JhY29uanMnO1xuaW1wb3J0IHV0aWwgIGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gUmF0aW9PcHRpb25zXG4gKiBAcHJvcGVydHkge051bWJlcn0gd2lkdGhcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBoZWlnaHRcbiAqIEBwcm9wZXJ0eSB7RWxlbWVudH0gdGFyZ2V0XG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBSYXRpb1JldHVybnNcbiAqIEBwcm9wZXJ0eSB7QmFjb24uQnVzfSBzY2FsZUJ1c1xuICogQHByb3BlcnR5IHtCYWNvbi5Qcm9wZXJ0eX0gY3VycmVudFJhdGlvXG4gKi9cblxuLyoqXG4gKiBjb21wdXRlIHJhdGlvXG4gKlxuICogQHBhcmFtIHtSYXRpb09wdGlvbnN9IG9wdGlvbnNcbiAqIEByZXR1cm5zIHtSYXRpb1JldHVybnN9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnMgPSB7fSkge1xuXG4gIGxldCBidXMgPSBuZXcgQmFjb24uQnVzKCk7XG5cbiAgbGV0IGhSYXRpb0ZuID0gaG9yaXpvbnRhbFJhdGlvT2Yob3B0aW9ucy53aWR0aCk7XG4gIGxldCB2UmF0aW9GbiA9IHZlcnRpY2FsUmF0aW9PZihvcHRpb25zLmhlaWdodCk7XG5cbiAgbGV0IGhSYXRpbyA9IGJ1cy5tYXAoaFJhdGlvRm4pLnRvUHJvcGVydHkoaFJhdGlvRm4oKSk7XG4gIGxldCB2UmF0aW8gPSBidXMubWFwKHZSYXRpb0ZuKS50b1Byb3BlcnR5KHZSYXRpb0ZuKCkpO1xuXG4gIGxldCBzY2FsZSA9IHV0aWwuY29tcG9zZShjZW50ZXJpbmdPZihvcHRpb25zLnRhcmdldCksIHNjYWxpbmdPZihvcHRpb25zLnRhcmdldCkpO1xuXG4gIGxldCBjdXJyZW50UmF0aW8gPSBCYWNvbi5jb21iaW5lV2l0aChNYXRoLm1pbiwgaFJhdGlvLCB2UmF0aW8pLnRvUHJvcGVydHkoKTtcblxuICBjdXJyZW50UmF0aW8ub25WYWx1ZShzY2FsZSk7XG5cbiAgcmV0dXJuIHtcbiAgICBzY2FsZUJ1cyAgICAgOiBidXMsXG4gICAgY3VycmVudFJhdGlvIDogY3VycmVudFJhdGlvXG4gIH07XG59XG5cbi8qKlxuICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIGhvcml6b250YWxSYXRpb09mKHdpZHRoKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGggLyB3aWR0aDtcbiAgfTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0XG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHZlcnRpY2FsUmF0aW9PZihoZWlnaHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQgLyBoZWlnaHQ7XG4gIH07XG59XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBzY2FsaW5nT2YoZWwpIHtcbiAgbGV0IHRyYW5zZm9ybSA9IHV0aWwuc3R5bGVQcmVmaXhEZXRlY3QoJ3RyYW5zZm9ybScpO1xuICByZXR1cm4gZnVuY3Rpb24ocmF0aW8pIHtcbiAgICBlbC5zdHlsZVt0cmFuc2Zvcm1dID0gYHNjYWxlKCR7TWF0aC5hYnMocmF0aW8pfSlgO1xuICB9O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gY2VudGVyaW5nT2YoZWwpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGxldCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgZWwuc3R5bGUubGVmdCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAtIHJlY3Qud2lkdGgpIC8gMjtcbiAgICBlbC5zdHlsZS50b3AgID0gKHdpbmRvdy5pbm5lckhlaWdodCAtIHJlY3QuaGVpZ2h0KSAvIDI7XG4gIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBtYXJrZG93biBmcm9tICdtYXJrZG93bi1pdCc7XG5pbXBvcnQgdXRpbCAgIGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogc2V0dXAgbWFya2Rvd25cbiAqL1xubGV0IG1kID0gbWFya2Rvd24oe1xuICBsYW5nUHJlZml4IDogJ2hsanMgJyxcbiAgaGlnaGxpZ2h0ICA6IGZ1bmN0aW9uKHN0ciwgbGFuZykge1xuICAgIGlmICh3aW5kb3cuaGxqcyA9PSBudWxsKSB7XG4gICAgICBjb25zb2xlLmxvZygnaGlnaGxpZ2h0LmpzIChgd2luZG93LmhsanNgKSBpcyBtaXNzaW5nJyk7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgaWYgKGxhbmcgJiYgd2luZG93LmhsanMuZ2V0TGFuZ3VhZ2UobGFuZykpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuaGxqcy5oaWdobGlnaHQobGFuZywgc3RyKS52YWx1ZTtcbiAgICAgIH0gY2F0Y2ggKF9fKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKF9fKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHdpbmRvdy5obGpzLmhpZ2hsaWdodEF1dG8oc3RyKS52YWx1ZTtcbiAgICB9IGNhdGNoIChfXykge1xuICAgICAgY29uc29sZS5sb2coX18pO1xuICAgIH1cblxuICAgIHJldHVybiAnJzsgLy8gdXNlIGV4dGVybmFsIGRlZmF1bHQgZXNjYXBpbmdcbiAgfVxufSk7XG5cbi8qKlxuICogY29tcGlsZSBtYXJrZG93blxuICpcbiAqIEByZXR1cm5zIHZvaWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBjb21waWxlTWFya2Rvd24gOiBjb21waWxlTWFya2Rvd24sXG4gIGV4dHJhY3ROb3RlICAgICA6IGV4dHJhY3ROb3RlXG59O1xuXG4vKipcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3ROb3RlKGVsKSB7XG4gIGxldCBbY29udGVudCwgbm90ZV0gPSBlbC5pbm5lckhUTUwuc3BsaXQoLzxoclxccz9cXC8/Pi8pO1xuICBlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29udGFpbmVyLmlubmVySFRNTCA9IG5vdGUgfHwgJyc7XG4gIHJldHVybiAoY29udGFpbmVyLnRleHRDb250ZW50IHx8ICcnKS5yZXBsYWNlKC9eXFxuKi8sICcnKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gKiBAcmV0dXJucyB7RWxlbWVudH1cbiAqL1xuZnVuY3Rpb24gY29tcGlsZU1hcmtkb3duKGVsKSB7XG4gIGxldCBzZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICBzZWN0aW9uLmlubmVySFRNTCA9IG1kLnJlbmRlcihlbC5pbm5lckhUTUwpO1xuICB1dGlsLnRvQXJyYXkoZWwuYXR0cmlidXRlcykuZmlsdGVyKG5vdFR5cGVBdHRyaWJ1dGUpLmZvckVhY2goY29weUF0dHJpYnV0ZVRvKHNlY3Rpb24pKTtcbiAgZWwucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoc2VjdGlvbiwgZWwpO1xuICByZXR1cm4gc2VjdGlvbjtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIGNvcHlBdHRyaWJ1dGVUbyhlbCkge1xuICByZXR1cm4gZnVuY3Rpb24oYXR0cikge1xuICAgIGVsLnNldEF0dHJpYnV0ZShhdHRyLm5hbWUsIGF0dHIudmFsdWUpO1xuICB9O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7QXR0cmlidXRlTm9kZX0gYXR0clxuICovXG5mdW5jdGlvbiBub3RUeXBlQXR0cmlidXRlKGF0dHIpIHtcbiAgcmV0dXJuIGF0dHIubmFtZSAhPT0gJ3R5cGUnO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgYXNzaWduIGZyb20gJ29iamVjdC1hc3NpZ24nO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge2FycmF5fSBsaXN0XG4gICAqIEByZXR1cm5zIHtBcnJheS48VD59XG4gICAqL1xuICB0b0FycmF5KGxpc3QpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobGlzdCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcmlnXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0c1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKi9cbiAgZGVmYXVsdHMob3JpZywgZGVmcykge1xuICAgIGxldCByZXQgPSB0aGlzLmNsb25lKG9yaWcpO1xuICAgIE9iamVjdC5rZXlzKGRlZnMpLmZvckVhY2goKGspPT4ge1xuICAgICAgaWYgKGsgaW4gcmV0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJldFtrXSA9IGRlZnNba107XG4gICAgfSk7XG4gICAgcmV0dXJuIHJldDtcbiAgfSxcblxuICAvKipcbiAgICogc2hhbGxvdyBjbG9uZSBmdW5jXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcmlnXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqL1xuICBjbG9uZShvcmlnKSB7XG4gICAgbGV0IHJldCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKG9yaWcpLmZvckVhY2goKGspPT4gcmV0W2tdID0gb3JpZ1trXSk7XG4gICAgcmV0dXJuIHJldDtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxuICAgKiBAcGFyYW0ge09iamVjdH0gLi4uc291cmNlc1xuICAgKi9cbiAgZXh0ZW5kIDogYXNzaWduLFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmbi4uLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gICAqL1xuICBjb21wb3NlKCkge1xuICAgIC8vIGh0dHA6Ly91bmRlcnNjb3JlanMub3JnLyNjb21wb3NlXG4gICAgbGV0IGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgbGV0IHN0YXJ0ID0gYXJncy5sZW5ndGggLSAxO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGxldCBpID0gc3RhcnQ7XG4gICAgICBsZXQgcmVzdWx0ID0gYXJnc1tzdGFydF0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgcmVzdWx0ID0gYXJnc1tpXS5jYWxsKHRoaXMsIHJlc3VsdCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH0sXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRlbnRcbiAgICogQHJldHVybnMge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0QnlJZChpZGVudCkge1xuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZGVudCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICovXG4gIHRleHRBc3NpZ25PZihlbCkge1xuICAgIHJldHVybiBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICBlbC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgfTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICovXG4gIHN0eWxlQXNzaWduT2YoZWwsIHByb3BlcnR5KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBlbC5zdHlsZVtwcm9wZXJ0eV0gPSB2YWx1ZSA9PT0gJycgPyBudWxsIDogdmFsdWU7XG4gICAgfTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge1N0cmluZ30gYXR0cmlidXRlXG4gICAqL1xuICBhdHRyaWJ1dGVBc3NpZ25PZihlbCwgYXR0cmlidXRlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICAgIH1cbiAgICB9O1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3JjXG4gICAqL1xuICBwcmVsb2FkSW1nKHNyYykge1xuICAgIGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBpbWcub25sb2FkID0gKCk9PiBpbWcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpbWcpO1xuICAgIGltZy5zcmMgPSBzcmM7XG4gICAgaW1nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpbWcpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgKi9cbiAgZ2V0UGFnZU51bWJlckZyb21IYXNoKCkge1xuICAgIHJldHVybiBwYXJzZUludChsb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJyksIDEwKSB8fCAwO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldFByaW1pdGl2ZUZyb21TdHJpbmcoc3RyKSB7XG4gICAgbGV0IHJldCA9IChzdHIgPT0gbnVsbCkgPyBudWxsIDogc3RyICsgJyc7XG5cbiAgICBpZiAoc3RyID09PSAndHJ1ZScpIHtcbiAgICAgIHJldCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChzdHIgPT09ICdmYWxzZScpIHtcbiAgICAgIHJldCA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoc3RyID09IG51bGwpIHtcbiAgICAgIHJldCA9IG51bGw7XG4gICAgfSBlbHNlIGlmIChzdHIubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICByZXQgPSBwYXJzZUludChzdHIsIDEwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICogQHJldHVybnMge1N0cmluZ31cbiAgICovXG4gIHN0eWxlUHJlZml4RGV0ZWN0KHByb3BlcnR5KSB7XG4gICAgbGV0IHZhbGlkUHJvcGVydHk7XG4gICAgbGV0IHN0eWxlcyA9IHRoaXMudG9BcnJheSh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsICcnKSk7XG4gICAgbGV0IGluY2x1ZGVzID0gKG5lZWRsZSkgPT4gc3R5bGVzLmluZGV4T2YobmVlZGxlKSAhPT0gLTE7XG5cbiAgICBpZiAoaW5jbHVkZXMoYC13ZWJraXQtJHtwcm9wZXJ0eX1gKSkge1xuICAgICAgdmFsaWRQcm9wZXJ0eSA9IGAtd2Via2l0LSR7cHJvcGVydHl9YDtcbiAgICB9IGVsc2UgaWYgKGluY2x1ZGVzKGAtbW96LSR7cHJvcGVydHl9YCkpIHtcbiAgICAgIHZhbGlkUHJvcGVydHkgPSBgLW1vei0ke3Byb3BlcnR5fWA7XG4gICAgfSBlbHNlIGlmIChpbmNsdWRlcyhgLW1zLSR7cHJvcGVydHl9YCkpIHtcbiAgICAgIHZhbGlkUHJvcGVydHkgPSBgLW1zLSR7cHJvcGVydHl9YDtcbiAgICB9IGVsc2UgaWYgKGluY2x1ZGVzKHByb3BlcnR5KSkge1xuICAgICAgdmFsaWRQcm9wZXJ0eSA9IHByb3BlcnR5O1xuICAgIH1cblxuICAgIHJldHVybiB2YWxpZFByb3BlcnR5O1xuICB9XG59O1xuIl19
