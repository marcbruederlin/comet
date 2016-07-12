(function() {
  'use strict';

  var gulp = require('gulp'),
      sass = require('gulp-sass'),
      clean = require('gulp-clean'),
      rename = require('gulp-rename'),
      cleanCSS = require('gulp-clean-css'),
      autoprefixer = require('gulp-autoprefixer');

  gulp.task('build:clean', function() {
    return gulp.src(['./dist'])
      .pipe(clean({force: true}));
  });  

  gulp.task('build:sass', ['build:clean'], function() {
    return gulp.src('./src/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(gulp.dest('./dist'));
  });

    gulp.task('build:minify', ['build:sass'], function() {
    return gulp.src('./dist/*.css')
      .pipe(cleanCSS({compatibility: 'ie10'}))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./dist'));
  });

  gulp.task('build', ['build:clean', 'build:sass', 'build:minify']);
})();