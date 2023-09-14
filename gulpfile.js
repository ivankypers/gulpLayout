const {src, dest, series, watch} = require('gulp')

const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')

const styles = () => {
    return src('src/styles/**/*.css')
        .pipe(concat("main.css"))
        .pipe(dest('dist'))
}


const htmlMinify = () => {
    return src('src/**/*.html')
        .pipe(htmlMin({
            collapseWhitespace: true,
        }))
        .pipe(dest('dist'))
}

exports.default = series(styles, htmlMinify)
