var gulp = require('gulp');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');

var icons = ['printer', 'close'];
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
        .pipe(svgstore())
        .pipe(gulp.dest('test/dest'));
});

gulp.task('svgstore', function () {
    var srcFiles = [];
    icons.forEach(function (icon) {
        srcFiles.push(iconSrc(icon));
    }, this);

    return gulp
        .src(srcFiles)
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(gulp.dest('test/dest'));
});