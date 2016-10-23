var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');


gulp.task('build', function () {
  gulp.src(['./js/envii.js', './js/!(envii)*.js'])
    .pipe(uglify())
    .pipe(concat('envii.min.js'))
    .pipe(gulp.dest('./build'));
});

gulp.task('bundle-js', function () {
  gulp.src(['./js/envii.js', './js/!(envii)*.js'])
    .pipe(concat('envii.js'))
    .pipe(gulp.dest('./test'));
});


gulp.task('dev', function() {
  return watch(['./js/*.js'], function() {
    gulp.run(['bundle-js']);
  });
});

gulp.task('default', ['build']);


