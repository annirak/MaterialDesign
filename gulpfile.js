var gulp = require('gulp');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');
var rename = require("gulp-rename");
var cheerio = require('gulp-cheerio');

var icons = ['account', 'account-box-outline', 'account-circle', 'account-search', 'alert-circle', 'arrow-right',
    'book', 'book-multiple', 'calendar-clock', 'cash-usd', 'chart-line', 'chart-pie', 'chart-timeline', 'check', 'check-circle', 
    'checkbox-marked-circle', 'chevron-down', 'chevron-left', 'chevron-right', 'chevron-up', 'clipboard-account', 'clipboard-text', 
    'close', 'close-circle', 'comment-alert', 'content-save', 'database', 'delete', 'details', 'document', 'dots-vertical', 'download', 
    'email', 'export', 'file', 'file-check', 'file-document-box', 'home', 'information', 'information-outline', 'library', 'lock', 
    'lock-unlocked', 'logout', 'magnify', 'more', 'pencil', 'phone', 'plus', 'printer', 'settings', 'speedometer', 'swap-horizontal', 
    'table', 'table-edit', 'tablet-android', 'tree', 'water-pump', 'web'];

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
    //var dest = 'test/dest';
    //var dest='C:/tfs/Browser CIS/NYCDEP_BrowserCIS/NYC.DEP.BCIS.WebApp';
    //var dest='C:/tfs/DEP/BrowserCIS/Main/NYC.DEP.BrowserCIS/src/NYC.DEP.BrowserCIS.Web/wwwroot/images';
    var dest = 'C:/Users/kmireles.DS/Source/Repos/NYC.DEP.BrowserCIS/src/NYC.DEP.BrowserCIS.Web/wwwroot/images';
    return gulp
        .src(srcFiles)
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                // let x = 0;
                // let y = 0;
                // $('symbol').each(function () {
                //     let id = $(this).attr('id');
                //     let viewBox = "" + x + " " + y + " 24 24";
                //     $('svg').append('<view id="' + id + '-view" viewBox="' + viewBox + '" />');
                //     var vb = viewBox.split(" ");
                //     $('svg').append('<use xlink:href="#' + id + '" width="' + vb[2] + '" height="' + vb[3] + '" x="' + vb[0] + '" y="' + vb[1] + '" style="fill:rgba(0, 0, 0, 0.54);"></use>');
                //     y += 24;
                // });
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(rename({
            basename: "mdi",
            extname: ".svg"
        }))
        .pipe(gulp.dest(dest));
        //.pipe(gulp.dest('test/dest'));
        /* .pipe(rename({ basename: "mdiSprite" }))
        .pipe(cheerio({
            run: function ($) {
                //$('[fill]').removeAttr('fill');
                let x = 0;
                let y = 0;
                $('symbol').each(function () {
                    let id = $(this).attr('id');
                    let viewBox = "" + x + " " + y + " 24 24";
                    $('svg').append('<view id="' + id + '" viewBox="' + viewBox + '" />');
                    var vb = viewBox.split(" ");
                    $('svg').append('<use xlink:href="mdi.svg#' + id + '" width="' + vb[2] + '" height="' + vb[3] + '" x="' + vb[0] + '" y="' + vb[1] + '" style="fill:rgba(0, 0, 0, 0.54);"></use>');
                    y += 24;
                });
                $('symbol').remove();
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(gulp.dest(dest));*/
});