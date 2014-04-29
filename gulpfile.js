var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('build', function () {
  gulp.src(['./js/envii.js', './js/!(envii)*.js'])
    .pipe(uglify())
    .pipe(concat('envii.min.js'))
    .pipe(gulp.dest('./build'));
});

gulp.task('default', ['build']);
