import HtmlWebpackPlugin from 'html-webpack-plugin';
import { DotenvParseOutput } from 'dotenv-flow';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack, { Configuration } from 'webpack';
import path from 'path';

const htmlWebpackPluginDev = {
  filename: 'index.html',
  inject: true,
  publicPath: '/',
  template: path.resolve(process.cwd(), 'src/dev.html'),
};

const htmlWebpackPluginProd = {
  inject: true,
  minify: {
    collapseWhitespace: true,
    keepClosingSlash: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
  },
  template: path.resolve(process.cwd(), 'src/prod.html'),
};

export const getPlugins = (isDev: boolean, env: DotenvParseOutput) => [
  new HtmlWebpackPlugin(
    isDev ? htmlWebpackPluginDev : htmlWebpackPluginProd,
  ),
  env.BUNDLE_ANALYZE === 'true' && new BundleAnalyzerPlugin(),
  new webpack.DefinePlugin({
    'process.env': JSON.stringify(env),
  }),
  !isDev && new MiniCssExtractPlugin(),
  // isDev && (
  //   new ReactRefreshWebpackPlugin({
  //     overlay: false,
  //     exclude: [/node_modules/, /bootstrap\.tsx$/],
  //   })
  // ),
].filter(Boolean) as Configuration['plugins'];
