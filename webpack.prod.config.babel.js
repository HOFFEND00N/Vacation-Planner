import HTMLWebpackPlugin from "html-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import webpack from "webpack";
import getCSSModuleLoader from "./getCSSModuleLoader.js";
import config from "./developmentConfig.json"

//TODO: pass only necessary fields
const envKeys = Object.keys(config).reduce((prev, next) => {
  prev[`${next}`] = JSON.stringify(config[next]);
  return prev;
}, {});

const webpackProdConfigBabel = {
  entry: "./src/client/ui/index.tsx",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", getCSSModuleLoader({ sourceMap: true })],
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
  mode: "production",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};

export default webpackProdConfigBabel;
