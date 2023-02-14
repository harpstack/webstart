const { src, dest } = require("gulp");
const cached = require("gulp-cached");
const sourcemaps = require("gulp-sourcemaps");
const noop = require("gulp-noop");
const remember = require("gulp-remember");
const concat = require("gulp-concat");
const eslint = require("gulp-eslint");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const { browserSync } = require("./serve");
const argv = require("yargs").argv;

const prod = argv.prod;

function scripts() {
  return src(["./src/scripts/**/*.js"])
    .pipe(cached("main-scripts"))
    .pipe(eslint({ envs: ["es6", "browser"], extends: "eslint:recommended" }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(prod ? noop() : sourcemaps.init())
    .pipe(babel({ presets: ["@babel/env"] }))
    .pipe(uglify({ mangle: true, compress: true }))
    .pipe(remember("main-scripts"))
    .pipe(concat("main.js"))
    .pipe(prod ? noop() : sourcemaps.write("./"))
    .pipe(dest("./dist/js/"))
    .pipe(prod ? noop() : browserSync.stream());
}

module.exports = scripts;
