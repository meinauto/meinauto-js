'use strict';

/**
 * @type {Gulp} gulp
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var jsdoc = require('gulp-jsdoc3');
var del = require('del');
var config = require('./gulp.json');
var docConfig = require('./jsdoc.json');

/**
 * @param {Object} cfg
 * @returns {*}
 */
function cleanup(cfg) {
    return del(cfg.dest);
}

/**
 * @param {Object} cfg
 * @param {(null|Object|function)=} builder
 * @param {string=} base
 * @returns {Gulp}
 */
function build(cfg, builder, base) {
    builder = builder || null;
    base = base || '';

    var wrap = gulp.src(cfg.src, {base: base});

    if (null !== builder) {
        wrap.pipe(plumber())
            .pipe(sourcemaps.init())
                .pipe(builder)
            .pipe(sourcemaps.write())
        .pipe(plumber.stop());
    }

    wrap.pipe(gulp.dest(cfg.dest));

    return wrap;
}

/**
 * @param {Object} cfg
 * @returns {Gulp}
 */
function buildVendors(cfg) {
    return build(cfg);
}

/**
 * @param {Object} cfg
 * @returns {Gulp}
 */
function buildDocs(cfg) {
    return gulp.src(cfg.src, {read: false})
        .pipe(jsdoc(docConfig));
}

/**
 * @param {Object} cfg
 * @returns {Gulp}
 */
function buildTestUnit(cfg) {
    return build(cfg);
}

/**
 * @param {Object} cfg
 * @returns {Gulp}
 */
function buildTests(cfg) {
    return build(cfg, null, './src');
}

/**
 * @param {Object} cfg
 * @returns {Gulp}
 */
function buildConfigs(cfg) {
    return build(cfg);
}

/**
 * @param {Object} cfg
 * @returns {Gulp}
 */
function buildScripts(cfg) {
    return build(cfg, uglify(), './src');
}

/**
 * @param {Object} cfg
 * @returns {Gulp}
 */
function buildStyles(cfg) {
    return build(cfg, sass({outputStyle: 'compressed'}), './src/lib/ui');
}


/* dev */
gulp.task('dev:scripts', function() {
    buildVendors(config.vendors);
    buildTestUnit(config.testunit);
    buildConfigs(config.configs);
    buildScripts(config.scripts);
    buildTests(config.tests);
});

gulp.task('dev:styles', function() {
    buildStyles(config.styles);
});

gulp.task('dev:docs', function () {
    buildDocs(config.docs);
});


/* init commands "dev" and "dev:watch" */
gulp.task('dev', ['dev:scripts', 'dev:styles', 'dev:docs']);

gulp.task('dev:watch', function () {
    gulp.watch(config.scripts.src, ['dev:scripts']);
    gulp.watch(config.styles.src, ['dev:styles']);
    gulp.watch(config.docs.src, ['dev:docs']);
});
