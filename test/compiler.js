import path from "path";
import webpack from "webpack";
import { createFsFromVolume, Volume } from "memfs";

// @ts-check

export default (fixture, options = {}) => {
  const compiler = webpack({
    context: __dirname,
    entry: fixture,
    output: {
      path: path.resolve(__dirname),
      filename: "[name].js",
    },
    mode: "production",
    stats: {
      source: true,
    },
    module: {
      rules: [
        {
          test: /\.liquid$/,
          use: {
            loader: path.resolve(__dirname, "../src/index.js"),
            options,
          },
        },
        {
          test: /\.js$/,
          use: ["babel-loader"],
        },
        {
          test: /\.s?css$/,
          type: "asset/source",
          use: [
            // "raw-loader",
            "extract-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [["autoprefixer"]],
                },
              },
            },
            {
              loader: "sass-loader",
            },
            {
              loader: "style-resources-loader",
              options: {
                patterns: [
                  `${path.resolve(__dirname, "lib/variables.scss")}`,
                  `${path.resolve(__dirname, "lib/mixins.scss")}`,
                ],
              },
            },
          ],
        },
        {
          test: /\.json$/,
          type: "asset/source",
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js", ".liquid", ".scss"],
      alias: {
        lib: path.resolve(__dirname, "lib"),
      },
    },
  });

  // compiler.outputFileSystem = createFsFromVolume(new Volume());
  // compiler.outputFileSystem.join = path.join.bind(path);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      if (stats.hasErrors()) reject(stats.toJson().errors);

      resolve(stats);
    });
  });
};
