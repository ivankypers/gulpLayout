const {src, dest, series, watch} = require('gulp')

const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const autoprefixes = require('gulp-autoprefixer');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const notify = require("gulp-notify");
const browserSync = require('browser-sync').create();

const styles = () => {
   return src('src/styles/**/*.css')
       .pipe(concat('main.css'))
       .pipe(autoprefixes({
           cascade: false,
       }))
       .pipe(cleanCSS({
           level: 2,
       }))
       .pipe(dest('dist'))
       .pipe(browserSync.stream())
}

const htmlMinify = () => {
    return src('src/**/*.html')
        .pipe(htmlMin({
            collapseWhitespace: true,
        }))
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

const svgSprites = () => {
    return src('src/assets/img/**/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg'
                }
            }
        }))
        .pipe(dest('dist/images'))
}

const scripts = () => {
    return src([
        'src/js/components/**/*.js',
        'src/js/main.js'
    ])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('app.js'))
        .pipe(uglify({
            toplevel: true,
        }).on('error', notify.onError))
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

const images = () => {
    return src([
        './src/assets/img/**.jpg',
        './src/assets/img/**.png',
        './src/assets/img/**.jpeg',
        './src/assets/img/*.svg',
        './src/assets/img/**/*.jpg',
        './src/assets/img/**/*.png',
        './src/assets/img/**/*.jpeg'
    ])
        .pipe(image())
        .pipe(dest('dist/images'))
};

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: `dist`
        }
    })
}

watch('src/**/*.html', htmlMinify)
watch("src/**/*.css", styles)
watch('src/assets/img/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)


exports.scripts = scripts

exports.default = series(styles, htmlMinify, images, svgSprites, scripts, watchFiles)

