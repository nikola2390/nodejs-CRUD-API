const config = {
  entry: "./src/server.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: process.cwd() + "/dist",
    filename: "bundle.js",
  },

  mode: "production",
  target: "node",
};

export default config;
