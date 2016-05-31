var gulp = require('gulp');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');
var rename = require("gulp-rename");
var cheerio = require('gulp-cheerio');

var icons = ['printer', 'close', 'lock', 'account', 'email', 'phone', 'arrow-right', 'checkbox-marked-circle',
    'alert-circle', 'dots-vertical', 'plus', 'check', 'library', 'tablet-android', 'account-box-outline', 'water-pump',
    'swap-horizontal', 'clipboard-account', 'database', 'settings', 'export', 'clipboard-text', 'book', 'tree', 'chart-line',
    'book-multiple', 'web', 'chart-timeline', 'more'];

var svgFolder = 'icons/svg/';

function iconSrc(iconName) {
    return svgFolder + iconName + '.svg';
}

gulp.task('svgstoreall', function () {
    var srcFiles = iconSrc('*');
    return gulp
        .src(srcFiles)
        // .pipe(svgmin(function (file) {
        //     var prefix = path.basename(file.relative, path.extname(file.relative));
        //     return {
        //         plugins: [{
        //             cleanupIDs: {
        //                 prefix: prefix + '-',
        //                 minify: true
        //             }
        //         }]
        //     }
        // }))
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(rename({
            basename: "mdi-all",
            extname: ".svg"
        }))
        .pipe(gulp.dest('test/dest'));
});

gulp.task('svgstore', function () {
    var srcFiles = [];
    icons.forEach(function (icon) {
        srcFiles.push(iconSrc(icon));
    }, this);

    return gulp
        .src(srcFiles)
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
            },
            parserOptions: { xmlMode: true }
        }))
        // .pipe(svgmin(function (file) {
        //     var prefix = path.basename(file.relative, path.extname(file.relative));
        //     return {
        //         plugins: [{
        //             cleanupIDs: {
        //                 prefix: prefix + '-',
        //                 minify: true
        //             }
        //         }]
        //     }
        // }))
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(rename({
            basename: "mdi",
            extname: ".svg"
        }))
        .pipe(gulp.dest('C:/tfs/Browser CIS/NYCDEP_BrowserCIS/NYC.DEP.BCIS.WebApp'));
    //.pipe(gulp.dest('test/dest'));
});