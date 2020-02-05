
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const cleanCSS = require('gulp-clean-css');
const minifyHTMl = require('html-minifier').minify;
const uglify = require('gulp-uglify-es').default;
const browserify = require('browserify');
const prefix = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const ts = require('gulp-typescript');
const modifyFile = require('gulp-modify-file');
const aliasify = require('aliasify');
const rename = require('gulp-rename');
const path = require("path");
const browserSync = require('browser-sync').create();

const public = "./www/";
const dist = "./assets/";
const tmp = "./tmp/";

gulp.task('sass', (done) => {

    gulp.src(dist + 'sass/*.sass')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(prefix())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(public + 'css'));

    browserSync.reload();
    done();

});

gulp.task('js', done => {

    const htmlFiles = {};

    gulp
        .src(dist + 'ts/**/*.html')
        .pipe(modifyFile((content, filePath, file) => {
            htmlFiles[`./${path.basename(filePath)}`] = {
                "relative": `./${path.basename(filePath)}.js`
            }
            return `"use strict";
            Object.defineProperty(exports, "__esModule", { value: true });
            var template = \`${minifyHTMl(content)}\`;
            exports.default = template;`;
        }))
        .pipe(rename((path) => {
            path.extname += ".js";
        }))
        .pipe(gulp.dest(tmp + 'js'))
        .on("end", () => {
            gulp.src(dist + 'ts/**/*.ts')
                .pipe(ts({
                    target: "ES5",
                    lib: ["es2015", "dom"]
                }))
                .pipe(gulp.dest(tmp + 'js'))
                .on("end", () => {
                    browserify({
                        entries: tmp + 'js/main.js',
                        debug: true
                    })
                    .transform(aliasify, {
                        "aliases": htmlFiles
                    })
                    .bundle()
                    .pipe(source("main.js"))
                    .pipe(buffer())
                    .pipe(sourcemaps.init({loadMaps: true}))
                        .pipe(uglify())
                        .on('error', console.log)
                    .pipe(sourcemaps.write('./'))
                    .pipe(gulp.dest(public + 'js'))
                    .on("end", () => {
                        browserSync.reload();
                        done();
                    })
                });
        })
        
});

gulp.task('copy', done => {

    gulp.src(dist + 'fonts/**/*')
        .pipe(gulp.dest(public + 'fonts'));
    gulp.src(dist + 'lib/**/*')
        .pipe(gulp.dest(public + 'lib'));
    gulp.src(dist + 'img/**/*')
        .pipe(gulp.dest(public + 'img'));
    gulp.src(dist + '*.html')
        .pipe(gulp.dest(public));
    
    browserSync.reload();
    done();

});

gulp.task('watch', () => {

    browserSync.init({
        server: {
            baseDir: "./www",
            cors: true
        }
    });

    gulp.watch(dist + 'sass/**/*.sass', gulp.series('sass'));
    gulp.watch(dist + 'ts/**/*.ts', gulp.series('js'));
    gulp.watch(dist + 'ts/**/*.html', gulp.series('js'))
    gulp.watch(dist + 'fonts/**/*', gulp.series('copy'));
    gulp.watch(dist + 'img/**/*', gulp.series('copy'));
    gulp.watch(dist + 'lib/**/*', gulp.series('copy'));
    gulp.watch(dist + '*.html', gulp.series('copy'));

    return;

});

gulp.task('default', gulp.series([
    'js',
    'copy',
    'sass',
    'watch'
]));