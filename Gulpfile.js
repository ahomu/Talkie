var gulp     = require('gulp');
var plumber  = require('gulp-plumber');
var rename     = require('gulp-rename');
var package  = require('./package.json');
var banner   = '/*! <%= name %> - v<%= version %> */';

var FILE_BROWSERIFY_INDEX = './src/index.js';
var FILE_PLEEEASE_INDEX   = './src/style/index.css';
var FILE_TEST_RUNNER      = './test/runner.js';

var DIR_DIST = './dist';
var DIR_TEMP = './temp';

var GLOB_TEST_FILES = ['./test/**/*.js', '!./test/runner.js'];
var GLOB_SRC_FILES  = ['./src/**/*.js'];
var GLOB_CSS_FILES  = ['./src/**/*.css'];
var GLOB_DIST_FILES = ['./dist/**/*'];

function bufferedBrowserify(standaloneName) {
  var transform  = require('vinyl-transform');
  var browserify = require('browserify');
  var babelify   = require('babelify');

  return transform(function(filename) {
    return browserify(filename, {
        standalone : standaloneName,
        debug      : true,
        noParse    : [
          require.resolve('baconjs'),
          require.resolve('babel/browser-polyfill')
        ]
      })
      .transform(babelify.configure({
        experimental : false,
        playground   : false
      }))
      .bundle()
      .on('error', function(err){
        console.error(err.message);
        this.emit('end');
      })
      ;
  });
}

function releaseCommit(type) {
  var bump   = require('gulp-bump');
  var git    = require('gulp-git');
  var tag    = require('gulp-tag-version');
  var filter = require('gulp-filter');

  var onlyPackageJson = filter('package.json');

  return gulp.src(GLOB_DIST_FILES.concat('./package.json'))
    .pipe(onlyPackageJson)
    .pipe(bump({type: type}))
    .pipe(gulp.dest('./'))
    .pipe(onlyPackageJson.restore())
    .pipe(git.commit('bump version'))
    .pipe(onlyPackageJson)
    .pipe(tag({prefix: ''}));
}

gulp.task('jshint', function() {
  var jshint   = require('gulp-jshint');

  return gulp.src(GLOB_SRC_FILES)
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('pretest', function() {
  gulp.start('build', 'build-test');
});

gulp.task('patch-release', ['build', 'build-css'], function() {
  return releaseCommit('patch');
});

gulp.task('minor-release', ['build', 'build-css'], function() {
  return releaseCommit('minor');
});

gulp.task('major-release', ['build', 'build-css'], function() {
  return releaseCommit('major');
});

gulp.task('watch', function() {
  gulp.watch(GLOB_SRC_FILES, function() {
    gulp.start('jshint', 'build');
  });
  gulp.watch(GLOB_CSS_FILES, function() {
    gulp.start('build-css');
  });
});

gulp.task('build', function() {
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

gulp.task('build-css', function () {
  var please   = require('gulp-pleeease');
  var path     = require('path');
  var fileName = 'talkie';

  return gulp.src(FILE_PLEEEASE_INDEX)
    .pipe(plumber())
    .pipe(please({
      import: {
        path: path.dirname(FILE_PLEEEASE_INDEX)
      },
      autoprefixer: {
        browsers: ["last 2 versions", "Android 4.0"]
      }
    }))
    .pipe(rename(fileName + '.min.css'))
    .pipe(gulp.dest(DIR_DIST));
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
