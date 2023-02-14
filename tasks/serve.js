const browserSync = require("browser-sync").create();

function serve(cb) {
  browserSync.init(
    {
      server: {
        baseDir: "./dist/",
      },
    },
    cb
  );
}

module.exports = { serve, browserSync };
