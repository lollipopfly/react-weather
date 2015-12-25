var gulp = require('gulp');
var react = require('gulp-react');
var plumber = require('gulp-plumber');

gulp.task('jsx', function () {
    return gulp.src('js/common.js')
	    .pipe(plumber())
        .pipe(react())
        .pipe(gulp.dest('js/build'));
});

gulp.task('watch', function() {
	gulp.watch('js/common.js', false, ['jsx']);
});

gulp.task('default', ['jsx', 'watch']);
