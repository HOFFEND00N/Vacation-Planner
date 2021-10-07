// import fs from "fs";
import HTMLWebpackPlugin from "html-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import webpack from "webpack";
import getStudioCSSModuleLoader from "./getStudioCSSModuleLoader.js";
import config from "./.env.development.json"
// Ways to fix:
// 1) use require instead of import
// 2) compile webpack config with babel to common js modules
// 3) add package json for a webpack config, and specify there type: "module"
// const config = JSON.parse(fs.readFileSync(`${__dirname}/.env.development.json`).toString());

const envKeys = Object.keys(config).reduce((prev, next) => {
  prev[`${next}`] = `"${config[next]}"`;
  return prev;
}, {});

const webpackClientConfigBabel = {
  entry: "./src/index.tsx",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", getStudioCSSModuleLoader({ sourceMap: true })],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./public/index.html",
    }),
    new ESLintPlugin(),
    new webpack.DefinePlugin(envKeys),
  ],
  mode: "development",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};

export default webpackClientConfigBabel;
