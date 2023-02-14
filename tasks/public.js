const { src, dest, lastRun } = require("gulp");

function public() {
  return src(["./public/**/*.*"], { since: lastRun(public) }).pipe(
    dest("./dist/")
  );
}

module.exports = public;
