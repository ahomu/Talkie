'use strict';

module.exports = function(config) {
  config.set({
    frameworks : ['browserify', 'mocha'],

    files : [
      'test/**/*.js'
    ],

    preprocessors : {
      'test/**/*.js' : 'browserify'
    },

    browserify : {
      plugin : [
        require('tsify')
      ],
      transform : [
        require('babelify').configure({
          plugins : ['babel-plugin-espower']
        })
      ],
      debug      : true,
      extensions : ['.js', '.ts']
    },

    browsers : ['Chrome', 'Firefox'],

    autoWatch : true,

    reporters : ['dots']
  });
};
