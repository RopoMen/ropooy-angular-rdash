(function() {
  'use strict';

  var gulp = require('gulp');
  var dateFormat = require('dateformat');
  var uglify = require('gulp-uglify');
  var rename = require('gulp-rename');
  var header = require('gulp-header');
  var ngAnnotate = require('gulp-ng-annotate');
  var KarmaServer = require('karma').Server;
  var jshint = require('gulp-jshint');
  var connect = require('gulp-connect');

  var pkg = {};
  var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @build time <%= buildTime %>',
    ' * @author <%= pkg.author %>',
    ' * @version v<%= pkg.version %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''].join('\n');
  var buildTime = '';

  gulp.task('example', function() {
    connect.server();
  });

  gulp.task('jshint', function() {
    gulp.src([
      './gulpfile.js',
      './*.js',
      './test/**/*.js',
      './example/*.html'])
      .pipe(jshint.extract())
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('jshint-stylish'));
  });

  gulp.task('test', ['jshint'], function() {
    new KarmaServer({
	    configFile: __dirname + '/karma.config.js',
	    singleRun: true
	  }).start();
  });

  gulp.task('minify', function() {
    pkg = require('./package.json');
    buildTime = dateFormat(new Date(), 'yyyy-MM-dd HH:MM');

    gulp.src('angular-lodash.js')
      .pipe(ngAnnotate({single_quotes: true}))
      .pipe(uglify())
      .pipe(header(banner, {pkg : pkg, buildTime: buildTime}))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./dist'));
  });

  gulp.task('build', ['test', 'minify'], function() {
    /*Note: pkg and buildTime are resolved in minification process.*/
    gulp.src('angular-lodash.js')
      .pipe(ngAnnotate({single_quotes: true}))
      .pipe(header(banner, {pkg : pkg, buildTime: buildTime}))
      .pipe(gulp.dest('./dist'));
  });

  gulp.task('default', ['jshint']);
})();