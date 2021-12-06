import HTMLWebpackPlugin from "html-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import webpack from "webpack";
import getCSSModuleLoader from "./getCSSModuleLoader.js";
import config from "./developmentConfig.json"

// Used JSON.stringify to add quotes to string, because plugin does a direct text replacement,
// the value given to it must include actual quotes inside of the string itself.
const variablesToReplace = {
  SITE_PROTOCOL: JSON.stringify(config.SITE_PROTOCOL),
  SITE_DOMAIN: JSON.stringify(config.SITE_DOMAIN),
  SITE_SERVER_PORT: JSON.stringify(config.SITE_SERVER_PORT),
};

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
    new webpack.DefinePlugin(variablesToReplace),
  ],
  mode: "production",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};

export default webpackProdConfigBabel;
