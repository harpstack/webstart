const { series, parallel } = require("gulp");

const public = require("./tasks/public");
const clean = require("./tasks/clean");
const { vendor } = require("./tasks/vendor");
const styles = require("./tasks/styles");
const scripts = require("./tasks/scripts");
const html = require("./tasks/html");
const { serve } = require("./tasks/serve");
const monitor = require("./tasks/monitor");

const build = series(clean, parallel(public, vendor, styles, scripts, html));
const start = series(build, serve, monitor);

exports.build = build;
exports.start = start;
exports.default = start;
