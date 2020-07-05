const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const optimization = () => {
   const config = {
      splitChunks: {
         chunks: "all",
      },
   };
   if (isProd) {
      config.minimizer = [
         new OptimizeCssAssetsPlugin(),
         new TerserWebpackPlugin(),
      ];
   }

   return config;
};

const cssLoaders = (extra) => {
   const loaders = [
      {
         loader: MiniCssExtractPlugin.loader,
         options: {
            hmr: isDev,
            reloadAll: true,
         },
      },
      "css-loader",
   ];

   if (extra) {
      loaders.push(extra);
   }

   return loaders;
};

const babelOptions = (preset) => {
   const opts = {
      presets: ["@babel/preset-env"],
      plugins: ["@babel/plugin-proposal-class-properties"],
   };

   if (preset) {
      opts.presets.push();
   }

   return opts;
};

const jsLoaders = () => {
   const loaders = [
      {
         loader: "babel-loader",
         options: babelOptions(),
      },
   ];

   if (isDev) {
      loaders.push("eslint-loader");
   }

   return loaders;
};

const plugins = () => {
   const base = [
      new HTMLWebpackPlugin({
         template: "./index.html",
         minify: {
            collapseWhitespace: isProd,
         },
      }),
      new CleanWebpackPlugin(),
      new CopyPlugin({
         patterns: [
            {
               from: path.resolve(__dirname, "src/favicon.ico"),
               to: path.resolve(__dirname, "dist"),
            },
         ],
      }),
      new MiniCssExtractPlugin({
         filename: "style.css",
      }),
   ];

   // if (isProd) {
   //    base.push(new BundleAnalyzerPlugin());
   // }

   return base;
};

module.exports = {
   context: path.resolve(__dirname, "src"),
   mode: "development",
   entry: {
      main: ["@babel/polyfill", "./index.js"],
   },
   output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist"),
   },
   resolve: {
      extensions: [".js", ".json"],
      alias: {
         "@blocks": path.resolve(__dirname, "src/blocks"),
         "@styles": path.resolve(__dirname, "src/styles"),
         "@": path.resolve(__dirname, "src"),
      },
   },
   optimization: optimization(),
   devServer: {
      port: 3001,
      hot: isDev,
   },
   devtool: isDev ? "source-map" : "",
   plugins: plugins(),
   module: {
      rules: [
         //Loader HTML
         {
            test: /\.html$/i,
            loader: "html-loader",
         },
         //Loader CSS
         {
            test: /\.css$/,
            use: cssLoaders(),
         },
         //Loader LESS
         {
            test: /\.less$/,
            use: cssLoaders("less-loader"),
         },
         //Loader SASS
         {
            test: /\.s[ac]ss$/,
            use: cssLoaders("sass-loader"),
         },
         // Loader Images
         {
            test: /\.(png|jpg|jpeg|svg|gif)$/,
            use: ["file-loader"],
         },
         // Loader Fonts
         {
            test: /\.(ttf|woff|woff2|eot)$/,
            use: ["file-loader"],
         },
         // Loader xml
         {
            test: /\/xml$/,
            use: ["xml-loader"],
         },
         // Loader CSV
         {
            test: /\/csv$/,
            use: ["csv-loader"],
         },
         // Loader Babel
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: jsLoaders,
         },
         // Loader Babel Typescript
         {
            test: /\.ts$/,
            exclude: /node_modules/,
            loader: {
               loader: "babel-loader",
               options: babelOptions("@babel/preset-typescript"),
            },
         },
         // Loader Babel React
         {
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: {
               loader: "babel-loader",
               options: babelOptions("@babel/preset-react"),
            },
         },
      ],
   },
};
