const { src, dest } = require("gulp");
const cached = require("gulp-cached");
const noop = require("gulp-noop");
const sourcemaps = require("gulp-sourcemaps");
const remember = require("gulp-remember");
const concat = require("gulp-concat");
const sassPartialsImported = require("gulp-sass-partials-imported");
const sass = require("gulp-sass")(require("sass"));
const prefix = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");
const { browserSync } = require("./serve");
const argv = require("yargs").argv;

const prod = argv.prod;

function styles() {
  const scssDir = "./src/styles/";
  const includePaths = [
    "./src/styles/common",
    "./src/styles/components",
    "./src/styles/pages",
  ];
  return src(["./src/styles/**/*.scss", "!./src/styles/bootstrap/**/*.scss"])
    .pipe(cached("main-styles"))
    .pipe(sassPartialsImported(scssDir, includePaths))
    .pipe(prod ? noop() : sourcemaps.init())
    .pipe(sass({ includePaths: scssDir }).on("error", sass.logError))
    .pipe(remember("main-styles"))
    .pipe(concat("main.css"))
    .pipe(prefix())
    .pipe(minify({ level: { 1: { specialComments: 0 } } }))
    .pipe(prod ? noop() : sourcemaps.write("./"))
    .pipe(dest("./dist/css/"))
    .pipe(prod ? noop() : browserSync.stream());
}

module.exports = styles;
