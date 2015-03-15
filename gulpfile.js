// for dev
var gulp = require('gulp');
var changed = require('gulp-changed');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var less = require('gulp-less');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

// for pre-processing before producion
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');

// utils
var path = require('path');
var del = require('del');

var server = {
  app: 'app.js',
  routes: 'routes/*.js',
  views: 'views/*.ejs'
};

var public = {
  scripts: {
    lint: './src/**/*.js',
    src : './src/main.js',
    dest: './public'
  },
  styles: {
    src : './less/main.less',
    dest: './public'
  }
}

gulp.task('clean', function(cb) {
  // clean public/ except public/.git
  del(['public/main.js', 'public/main.css'], cb);
});

gulp.task('view-reload', function() {
  return gulp.src(server.views)
    .pipe(livereload());
});

gulp.task('lint-server', function() {
  return gulp.src([server.app, server.routes])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish))
});

gulp.task('lint-public', function() {
  return gulp.src(public.scripts.lint)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish))
});

gulp.task('scripts',['lint-public'], function() {
  return browserify(public.scripts.src)
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest(public.scripts.dest))
    .pipe(livereload());
});

gulp.task('less', function() {
  return gulp.src(public.styles.src)
    .pipe(changed(public.styles.dest))
    .pipe(less({
      paths: [ path.join(__dirname, 'src', 'less', 'includes')]
    }))
    .pipe(gulp.dest(public.styles.dest))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(server.app, ['lint-server']);
  gulp.watch(server.routes, ['lint-server']);
  gulp.watch(server.views, ['view-reload']);
  gulp.watch(public.scripts.lint, ['lint-public', 'scripts']); // need to structure this better
  gulp.watch(public.styles.src, ['less']);
});

gulp.task('lint', ['lint-public', /*'lint-server'*/]);

gulp.task('default', ['clean', 'scripts', 'less', 'watch']);
