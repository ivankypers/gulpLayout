const {src, dest, series, watch} = require('gulp')

const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename')
const inject = require('gulp-inject');
const replace = require('gulp-replace')


function styles() {
    return src('src/styles/**/*.css')
        .pipe(concat('main.css'))
        .pipe(cleanCSS())
        .pipe(dest('dist'));
}

const htmlMinify = () => {
    return src('src/**/*.html')
        .pipe(htmlMin({
            collapseWhitespace: true,
        }))
        .pipe(rename({dirname: ''}))
        .pipe(dest('dist'))
}

exports.default = series(styles, htmlMinify)

