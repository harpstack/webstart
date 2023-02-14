const fs = require("fs");
const { src, dest, lastRun } = require("gulp");
const cached = require("gulp-cached");
const noop = require("gulp-noop");
const sourcemaps = require("gulp-sourcemaps");
const remember = require("gulp-remember");
const concat = require("gulp-concat");
const sassPartialsImported = require("gulp-sass-partials-imported");
const sass = require("gulp-sass")(require("sass"));
const prefix = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const { browserSync } = require("./serve");
const argv = require("yargs").argv;

const prod = argv.prod;

const config = JSON.parse(fs.readFileSync("./src/vendor.json"));

function fonts() {
  src(config.fonts, { since: lastRun(vendor) }).pipe(dest("./dist/fonts/"));
}

function scripts() {
  src(config.js)
    .pipe(cached("vendor-scripts"))
    .pipe(prod ? noop() : sourcemaps.init())
    .pipe(babel({ presets: ["@babel/env"] }))
    .pipe(remember("vendor-scripts"))
    .pipe(concat("vendor.js"))
    .pipe(uglify({ mangle: true, compress: true }))
    .pipe(sourcemaps.write("./"))
    .pipe(dest("./dist/js/"))
    .pipe(prod ? noop() : browserSync.stream());
}

function vendor_styles() {
  const scssDir = "./src/styles/bootstrap/";
  const includePaths = ["./src/styles/bootstrap/custom"];
  return src("./src/styles/bootstrap/**/*.scss")
    .pipe(cached("bootstrap-scss"))
    .pipe(sassPartialsImported(scssDir, includePaths))
    .pipe(prod ? noop() : sourcemaps.init())
    .pipe(sass({ includePaths: scssDir }).on("error", sass.logError))
    .pipe(remember("bootstrap-scss"))
    .pipe(concat("bootstrap.css"))
    .pipe(src(config.css))
    .pipe(concat("vendor.css"))
    .pipe(prefix())
    .pipe(minify({ level: { 1: { specialComments: 0 } } }))
    .pipe(prod ? noop() : sourcemaps.write("./"))
    .pipe(dest("./dist/css/"))
    .pipe(prod ? noop() : browserSync.stream());
}

function vendor(cb) {
  fonts();
  scripts();
  vendor_styles(), cb();
}

module.exports = { vendor, vendor_styles };
