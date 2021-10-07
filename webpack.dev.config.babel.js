import HTMLWebpackPlugin from "html-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import webpack from "webpack";
import getStudioCSSModuleLoader from "./getStudioCSSModuleLoader.js";
import config from "./.env.development.json"

const envKeys = Object.keys(config).reduce((prev, next) => {
  // Used JSON.stringify to add quotes to string, because plugin does a direct text replacement,
  // the value given to it must include actual quotes inside of the string itself
  prev[`${next}`] = JSON.stringify(config[next]);
  return prev;
}, {});

const webpackClientConfig = () => {
  return {
    entry: "./src/index.tsx",
    devtool: "inline-source-map",
    devServer: {
      port: config.clientPort || 3001,
      static: "./dist",
      historyApiFallback: true,
      allowedHosts: "all",
      hot: true,
    },
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
};

export default webpackClientConfig();
