const { src, dest } = require("gulp");
const cached = require("gulp-cached");
const remember = require("gulp-remember");
const ejs = require("gulp-ejs");
const htmlmin = require("gulp-htmlmin");
const argv = require("yargs").argv;

const prod = argv.prod;

function html() {
  return src(["./src/html/**/*.html"])
    .pipe(ejs())
    .pipe(cached("html-caches"))
    .pipe(htmlmin({ collapseWhitespace: prod }))
    .pipe(remember("html-caches"))
    .pipe(dest("./dist/"));
}

module.exports = html;
