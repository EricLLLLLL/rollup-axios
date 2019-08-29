"use strict";

const { TARGET } = process.env;

const rollup = require("rollup");
const { resolve } = require("path");

const { inputOptions, outputOptions } = require("./rollup.config.js");

function getOutputFileName() {
  switch (TARGET) {
    case "umd":
      return `index.umd.js`;
    case "es":
      return "index.mjs";
    default:
      return "index.js";
  }
}

async function build() {
  const bundle = await rollup.rollup({
    input: resolve("./index.js"),
    ...inputOptions
  });

  // or write the bundle to disk
  await bundle.write({
    format: TARGET,
    file: resolve("./dist", getOutputFileName()),
    name: "bundle",
    ...outputOptions
  });
}

return build();
