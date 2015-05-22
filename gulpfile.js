/* global -$ */
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('styles', function () {
    return gulp.src('css/main.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            includePaths: ['_sass/'],
            outputStyle: 'nested',
            onError: console.error.bind(console, 'Sass error:')
        }))
        .pipe($.postcss([
            require('autoprefixer-core')({browsers: ['last 2 version']})
        ]))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('.tmp/css'))
        .pipe(reload({stream: true}));
});

gulp.task('jshint', function () {
    return gulp.src(['gulpfile.js', 'js/**/*.js', '!js/vendor/*.js'])
        .pipe(reload({stream: true, once: true}))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('default', ['styles', 'jshint']);

gulp.task('serve', ['styles'], function () {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['.tmp', '.']
        }
    });

    gulp.watch([
        './*.html',
        'js/**/*.js'
    ]).on('change', reload);

    gulp.watch(['css/main.scss', '_sass/**/*.scss'], ['styles']);
});
