const gulp = require('gulp');
const browserSync = require('browser-sync');
const cleanCSS = require('gulp-clean-css');
const concatCSS = require('gulp-concat-css');
const includeJS = require('gulp-include');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const clean = require('gulp-clean');

// Concat css files
gulp.task('styles', () => {
  return gulp.src('app/css/app.css')
    .pipe(concatCSS('css/app.css'))
    .pipe(gulp.dest('dest'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

// Minify css files
gulp.task('minify-css', ['styles'], () => {
  return gulp.src('dest/css/app.css')
    .pipe(cleanCSS({ compatibility: 'ie8'}))
    .pipe(rename({ suffix: '.min'}))
    .pipe(gulp.dest('dest/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Concat js files
gulp.task("scripts", function() {
  return gulp.src("app/js/app.js")
    .pipe(includeJS())
      .on('error', console.log)
    .pipe(gulp.dest("dest/js"))
    .pipe(browserSync.reload({
        stream: true
    }));
});

// Minify js files
gulp.task('minify-js', function() {
  return gulp.src('dest/js/app.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dest/js'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

// Copy html files
gulp.task('copy-html', () => {
  return gulp.src('app/*.html')
    .pipe(gulp.dest('dest'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Copy fonts
gulp.task('copy-fonts', () => {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dest/fonts'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Copy fonts
gulp.task('copy-images', () => {
  return gulp.src('app/images/**/*')
    .pipe(gulp.dest('dest/images'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Configure browser-sync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dest'
      },
  });
});

// default task
gulp.task('default', ['browserSync', 'copy-html', 'styles', 'minify-css',
                      'scripts', 'minify-js', 'copy-fonts', 'copy-images'], () => {
  gulp.watch('app/*.html', ['copy-html']);
  gulp.watch('app/css/*.css', ['minify-css']);
  gulp.watch('app/fonts/**/*', ['copy-fonts']);
  gulp.watch('app/js/*.js', ['minify-js']);
  gulp.watch('app/images/**/*', ['copy-images']);
});
