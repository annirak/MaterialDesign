var gulp = require('gulp');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');
var rename = require('gulp-rename');
var cheerio = require('gulp-cheerio');

var icons = [
    'account',
    'account-alert',
    'account-card-details',
    'account-box-outline',
    'account-circle',
    'account-multiple',
    'account-multiple-outline',
    'account-multiple-plus',
    'account-outline',
    'account-plus',
    'account-search',
    'account-settings-variant',
    'alert',
    'alert-circle',
    'arrow-down',
    'arrow-left',
    'arrow-right',
    'assistant',
    'basket-unfill',
    'barcode-scan',
    'bell',
    'book',
    'book-multiple',
    'book-open',
    'book-open-page-variant',
    'cancel',
    'calculator',
    'calendar',
    'calendar-clock',
    'calendar-multiple',
    'calendar-multiple-check',
    'cash',
    'cash-100',
    'cash-multiple',
    'cash-usd',
    'chart-areaspline',
    'chart-line',
    'chart-pie',
    'chart-timeline',
    'check',
    'check-circle',
    'checkbox-marked-circle',
    'checkbox-multiple-marked-outline',
    'chevron-down',
    'chevron-left',
    'chevron-right',
    'chevron-up',
    'cisco-webex',
    'clipboard-account',
    'clipboard-text',
    'clock-alert',
    'close',
    'close-circle',
    'comment-alert',
    'content-save',
    'credit-card',
    'database',
    'delete',
    'delete-forever',
    'desktop-classic',
    'details',
    'document',
    'dots-vertical',
    'download',
    'email',
    'emoticon-cool',
    'export',
    'file',
    'file-account',
    'file-chart',
    'file-check',
    'file-document-box',
    'folder-account',
    'format-list-bulleted',
    'gauge',
    'history',
    'home',
    'information',
    'information-outline',
    'library',
    'link',
    'lock',
    'logout',
    'magnify',
    'map-marker',
    'more',
    'note',
    'page-first',
    'page-last',
    'pencil',
    'phone',
    'plus',
    'printer',
    'remote',
    'settings',
    'sort-ascending',
    'sort-descending',
    'speedometer',
    'swap-horizontal',
    'table',
    'table-edit',
    'table-row-plus-after',
    'tablet-android',
    'ticket-account',
    'transfer',
    'tree',
    'undo',
    'update',
    'view-list',
    'water-pump',
    'web'
];

let appsDirIcons = [
    'account-box-outline',
    'book',
    'book-multiple',
    'calendar',
    'card-icon',
    'chart-line',
    'chart-timeline',
    'cisco-webex',
    'clipboard-account',
    'clipboard-text',
    'credit-card',
    'database',
    'domain',
    'export',
    'gauge',
    'lan',
    'library',
    'more',
    'settings',
    'swap-horizontal',
    'table',
    'tablet-android',
    'tree',
    'water-pump',
    'web'
];

var svgFolder = 'icons/svg/';

function iconSrc(iconName) {
    return svgFolder + iconName + '.svg';
}

gulp.task('svgstoreall', function() {
    var srcFiles = iconSrc('*');
    return (gulp
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
            .pipe(
                rename({
                    basename: 'mdi-all',
                    extname: '.svg'
                })
            )
            .pipe(gulp.dest('test/dest')) );
});

gulp.task('svgstore', function() {
    var srcFiles = [];
    appsDirIcons.forEach(function(icon) {
        srcFiles.push(iconSrc(icon));
    }, this);
    //var dest = 'test/dest';
    //var dest='C:/tfs/Browser CIS/NYCDEP_BrowserCIS/NYC.DEP.BCIS.WebApp';
    //var dest='C:/tfs/DEP/BrowserCIS/Main/NYC.DEP.BrowserCIS/src/NYC.DEP.BrowserCIS.Web/wwwroot/images';
    var dest =
        'C:/Users/kmireles.DS/Documents/visual studio 2015/Projects/AppsDir/AppsDir/images';
    // var dest =
    //     'C:/Users/kmireles.DS/Source/Repos/NYC.DEP.BrowserCIS/src/NYC.DEP.BrowserCIS.Web/wwwroot/images';
    return (gulp
            .src(srcFiles)
            .pipe(svgstore({ inlineSvg: true }))
            .pipe(
                cheerio({
                    run: function($) {
                        $('[fill]').removeAttr('fill');
                        $('[stroke-width]').removeAttr('stroke-width');
                        $('[fill-opacity]').removeAttr('fill-opacity');
                        $('[stroke-linejoin]').removeAttr('stroke-linejoin');
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
                })
            )
            .pipe(
                rename({
                    basename: 'mdi',
                    extname: '.svg'
                })
            )
            //.pipe(gulp.dest(dest));
            //.pipe(gulp.dest('test/dest'));
            /* .pipe(rename({ basename: "mdiSprite",extname: ".svg" }))
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
        }))*/
            .pipe(gulp.dest(dest)) );
});
