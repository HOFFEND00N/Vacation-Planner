import HTMLWebpackPlugin from "html-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import webpack from "webpack";
import getCSSModuleLoader from "./getCSSModuleLoader.js";
import config from "./developmentConfig.json";

// Used JSON.stringify to add quotes to string, because plugin does a direct text replacement,
// the value given to it must include actual quotes inside of the string itself.
const variablesToReplace = {
  SITE_PROTOCOL: JSON.stringify(config.SITE_PROTOCOL),
  SITE_DOMAIN: JSON.stringify(config.SITE_DOMAIN),
  SITE_SERVER_PORT: JSON.stringify(config.SITE_SERVER_PORT),
};

const webpackClientConfig = () => {
  return {
    entry: "./src/client/ui/index.tsx",
    devtool: "eval-source-map",
    devServer: {
      port: config.SITE_CLIENT_PORT || 3001,
      allowedHosts: "all",
      hot: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /.s?css$/,
          use: ["style-loader", getCSSModuleLoader({ sourceMap: true })],
          include: [/node_modules/],
        },
        {
          test: /^((?!\.module).)*\.s?css$/,
          use: ["style-loader", "css-loader"],
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: "./public/index.html",
      }),
      new ESLintPlugin(),
      new webpack.DefinePlugin(variablesToReplace),
    ],
    mode: "development",
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
  };
};

export default webpackClientConfig();
