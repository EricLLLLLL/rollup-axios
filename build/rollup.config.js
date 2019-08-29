// process.env.NODE_ENV = 'production';

// const { uglify } = require('rollup-plugin-uglify');
// const configList = require('./rollup.config');

// const resolveFile = function(filePath) {
//   return path.join(__dirname, '..', filePath)
// }

// configList.map((config, index) => {

//   config.output.sourcemap = false;
//   config.plugins = [
//     ...config.plugins,
//     ...[
//       uglify()
//     ]
//   ]

//   return config;
// })

// module.exports = configList;

"use strict";

const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");

const babel = require("rollup-plugin-babel");
const { terser } = require("rollup-plugin-terser");
const json = require("rollup-plugin-json");

const builtins = require("rollup-plugin-node-builtins");
const globals = require("rollup-plugin-node-globals");

const inputOptions = {
  plugins: [
    // resolve(),
    resolve({ mainFields: ["jsnext", "preferBuiltins", "browser"] }),
    // resolve({ jsnext: true, preferBuiltins: true, browser: true }),
    // builtins(),
    commonjs({
      browser: true
    }),
    babel({
      exclude: ["node_modules/**"],
      runtimeHelpers: true
    }),
    terser(),
    json()
  ],
  // external: [
  //   "http",
  //   "https",
  //   "url",
  //   "assert",
  //   "stream",
  //   "tty",
  //   "util",
  //   "os",
  //   "zlib"
  // ],
  onwarn: function(warning) {
    // referer: https://github.com/rollup/rollup/issues/794#issuecomment-270803587
    //
    // Suppress this error message... there are hundreds of them. Angular team says to ignore it.
    // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
    if (warning.code === "THIS_IS_UNDEFINED") {
      return;
    }
    console.error(warning.message);
  }
};

const outputOptions = {
  exports: "named"
};

module.exports = { inputOptions, outputOptions };
