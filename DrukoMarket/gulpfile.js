const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

// Saas Task
function scssTask(){
    return src('src/scss/style.scss', {sourcemaps: true})
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(dest('dist/css', { sourcemaps: '.'}));
}

// Bootsrap Task
function bootstrapTask(){
    return src('src/scss/bootstrap.scss', {sourcemaps: true})
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(dest('dist/css', {sourcemaps: '.'}));
}

// JavaScript Task
function jsTask(){
    return src('src/js/main.js', {sourcemaps: true})
    // .pipe(terser())
    .pipe(dest('dist/js', { soutcemaps: '.'}));
}

function indexhtml() {
    return src('src/index.html')
    .pipe(dest('dist'));
}

// Browsersync Tasks
function browsersyncServe(cb){
    browsersync.init({
        server:{
            baseDir: 'dist'
        }
    });
    cb();
}

function browsersyncReload(cb){
    browsersync.reload();
    cb();
}

// Watch Task
function watchTask(){
    watch('src/index.html', browsersyncReload);
    watch(['src/scss/**/*.scss', 'src/js/**/*.js'], series(scssTask, bootstrapTask, jsTask, browsersyncReload));
}

//Default Gulp Task
exports.default = series(
    scssTask,
    bootstrapTask,
    jsTask,
    indexhtml,
    browsersyncServe,
    watchTask
);