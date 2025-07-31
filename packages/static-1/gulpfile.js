/* eslint-disable @typescript-eslint/no-require-imports */
const gulp = require('gulp');
const zip = require('gulp-zip');
const htmlmin = require('gulp-html-minifier-terser');
const clean = require('gulp-clean');
const dayjs = require('dayjs');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const pkg = require('./package.json');

const outputDir = 'dist';
const destDir = outputDir;

const htmlSrc = 'src/**/*.html';
const cssSrc = 'src/**/*.css';
const jsSrc = 'src/**/*.js';
const otherSrc = [`src/**`, `!${htmlSrc}`, `!${cssSrc}`, `!${jsSrc}`];

function cleanDist() {
  return gulp.src(outputDir, { read: false, allowEmpty: true }).pipe(clean());
}

function html() {
  return gulp
    .src(htmlSrc)
    .pipe(
      htmlmin({
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input checked />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
      })
    )
    .pipe(gulp.dest(destDir));
}

function css() {
  return gulp
    .src(cssSrc)
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest(destDir));
}

function js() {
  return gulp
    .src(jsSrc)
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest(destDir));
}

function copyOther() {
  return gulp.src(otherSrc).pipe(gulp.dest(destDir));
}

function compress() {
  return gulp
    .src(`${outputDir}/**`)
    .pipe(zip(`${pkg.name}_${pkg.version}_${dayjs().format('YYYYMMDD-HHmmss')}.zip`))
    .pipe(gulp.dest('build'));
}

exports.default = gulp.series(cleanDist, gulp.parallel(html, js, css, copyOther), compress);
