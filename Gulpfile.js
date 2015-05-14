var gulp     = require('gulp');
var plumber  = require('gulp-plumber');
var rename   = require('gulp-rename');
var package  = require('./package.json');
var banner   = '/*! <%= name %> - v<%= version %> */';

var FILE_BROWSERIFY_INDEX = './src/index.js';
var FILE_PLEEEASE_INDEX   = './src/style/index.css';
var FILE_TEST_RUNNER      = './test/runner.js';

var DIR_DIST  = './dist';
var DIR_TEMP  = './temp';
var DIR_THEME = './src/theme';

var GLOB_TEST_FILES    = ['./test/**/*.js', '!./test/runner.js'];
var GLOB_JS_SRC_FILES  = ['./src/**/*.js'];
var GLOB_CSS_SRC_FILES = ['./src/**/*.css'];

function bufferedBrowserify(standaloneName) {
  var transform  = require('vinyl-transform');
  var browserify = require('browserify');
  var babelify   = require('babelify');

  return transform(function(filename) {
    return browserify(filename, {
        standalone : standaloneName,
        debug      : true,
        noParse    : [
          require.resolve('baconjs')
        ]
      })
      .transform(babelify.configure({
      }))
      .bundle()
      .on('error', function(err){
        console.error(err.message);
        this.emit('end');
      })
      ;
  });
}

function cssPostProcess(inputFileName, outputFileName) {
  var please   = require('gulp-pleeease');
  var path     = require('path');

  return gulp.src(inputFileName)
    .pipe(plumber())
    .pipe(please({
      import: {
        path: path.dirname(inputFileName)
      },
      autoprefixer: {
        browsers: ["last 2 versions", "Android 4.0"]
      }
    }))
    .pipe(rename(function(path) {
      path.basename = outputFileName;
    }))
    .pipe(gulp.dest(DIR_DIST));
}

gulp.task('lint', function() {
  var eslint   = require('gulp-eslint');

  return gulp.src(GLOB_JS_SRC_FILES)
    .pipe(eslint({useEslintrc: true}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('build', function() {
  gulp.start('build-js', 'build-style', 'build-theme');
});

gulp.task('pretest', function() {
  gulp.start('build-js', 'build-test');
});

gulp.task('watch-css', function() {
  gulp.watch(GLOB_CSS_SRC_FILES, function() {
    gulp.start('build-style', 'build-theme');
  });
});

gulp.task('build-js', ['lint'], function() {
  var uglify     = require('gulp-uglify');
  var header     = require('gulp-header');
  var fileName   = 'talkie';
  var exportName = fileName.slice(0, 1).toUpperCase() + fileName.slice(1);

  return gulp.src(FILE_BROWSERIFY_INDEX)
    .pipe(bufferedBrowserify(exportName))
    .pipe(header(banner, {name: fileName, version: package.version}))
    .pipe(rename(fileName + '.js'))
    .pipe(gulp.dest(DIR_DIST))
    .pipe(plumber())
    .pipe(uglify({
      preserveComments: 'some'
    }))
    .pipe(rename(fileName + '.min.js'))
    .pipe(gulp.dest(DIR_DIST))
});

gulp.task('build-style', function () {
  return cssPostProcess(FILE_PLEEEASE_INDEX, 'talkie.min');
});

gulp.task('build-theme', function () {
  var minimist = require('minimist');

  // if you run `gulp build-theme --target example` will create `dist/talkie-example.min.css`
  var options = minimist(process.argv.slice(2), {
    default: {target: 'default'}
  });

  var targetThemeIndex = DIR_THEME + '/' + options.target + '/index.css';
  return cssPostProcess(targetThemeIndex, 'talkie-' + options.target + '.min');
});

gulp.task('build-test', function() {
  var espower = require('gulp-espower');

  gulp.src(FILE_TEST_RUNNER)
    .pipe(bufferedBrowserify(null))
    .pipe(gulp.dest(DIR_TEMP));

  return gulp.src(GLOB_TEST_FILES)
    .pipe(bufferedBrowserify(null))
    .pipe(espower())
    .pipe(gulp.dest(DIR_TEMP));
});
