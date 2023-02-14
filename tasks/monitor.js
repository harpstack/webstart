const { watch } = require("gulp");
const styles = require("./styles");
const { vendor_styles } = require("./vendor");
const scripts = require("./scripts");
const html = require("./html");
const { browserSync } = require("./serve");

function monitor() {
  browserSync.watch("./dist/*.html").on("change", browserSync.reload);
  watch(["./src/html/**/*.html", "./src/templates/**/*.html"], html);
  watch(["./src/scripts/**/*.js"], scripts);
  watch(["./src/styles/bootstrap/**/*.scss"], vendor_styles);
  watch(
    ["./src/styles/**/*.scss", "!./src/styles/bootstrap/**/*.scss"],
    styles
  );
}

module.exports = monitor;
