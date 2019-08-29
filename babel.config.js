module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        targets: {
          browsers: [
            "last 5 versions",
            "Android >= 4.2",
            "iOS > 8",
            "safari > 8",
            "ie >= 10"
          ]
        }
      }
    ]
  ],
  env: {
    test: {
      plugins: ["@babel/plugin-transform-modules-commonjs"]
    }
  },
  plugins: [["@babel/plugin-transform-runtime"]]
};
