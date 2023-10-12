const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    devServer: {
      hot: "only",
    },
    plugins: [
      // here we added HtmlWebpackPlugin to generate HTML files
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "JATE",
      }),

      // here we added WebpackPwaManifest to generate a PWA manifest
      new WebpackPwaManifest({
        name: "JATE",
        short_name: "JATE",
        description: "A simple text editor",
        background_color: "#7eb4e2",
        theme_color: "#7eb4e2",
        start_url: "/",
        publicPath: "/",
        fingerprints: false,
        inject: true,
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),

      // here we added InjectManifest to generate and inject the service worker
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
    ],
    module: {
      rules: [
        // here is the CSS loader configuration
        {
          test: /\.css$/i,
          use: ['style-loader', "css-loader"],
        },

        // here we handle the image files 
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },

        // finally we added Babel loader to transpile JavaScript files
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/transform-runtime',
              ],
            },
          },
        },
      ],
    },
  };
};
