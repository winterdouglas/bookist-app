module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [
          ".ios.js",
          ".android.js",
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
          ".json",
        ],
        alias: {
          "^@/(.+)": "./src/\\1",
        },
      },
    ],
    // WARN: react-native-reanimated/plugin has to be listed last.
    "react-native-reanimated/plugin",
  ],
};
