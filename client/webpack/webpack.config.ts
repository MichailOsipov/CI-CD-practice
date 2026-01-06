import dotenv, { DotenvParseOutput } from 'dotenv-flow';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const MODE = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
} as const;

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

const CONTENT_HASH = '.[contenthash:8]';

export default () => {
  const mode = process.env.NODE_ENV || 'development';

  const isDev = mode === MODE.DEVELOPMENT;
  const env = dotenv.config({ silent: !isDev }).parsed;

  const {
      HOST,
      HAS_FAST_REFRESH,
      OPEN_IN_BROWSER,
      PAGE_ALIAS,
      PORT,
  } = env as DotenvParseOutput;

  const FAST_REFRESH = HAS_FAST_REFRESH === 'true';
  const OPEN_BROWSER = OPEN_IN_BROWSER !== 'false';
  const port = PORT || 3001;

  if (!env) {
    return console.log(
      '\x1b[31mwebpack [ERROR]: environment not found\x1b[0m'
    );
  }

  return {
    mode: 'development',
    devtool: (
      isDev
        /** https://webpack.js.org/configuration/devtool/ */
        ? 'cheap-module-source-map'
        : false
    ),
    entry: path.resolve(process.cwd(), 'src/index.tsx'),
    devServer: isDev ? {
        host: HOST || '0.0.0.0',
        hot: FAST_REFRESH,
        open: (
          OPEN_BROWSER
            ? {
                target: [`http://localhost:${port}`],
              }
            : false
        ),
        port,
        server: 'http',
        proxy: {
          '/api/': {
            target: 'http://localhost:2999',
          }
        }
    } : undefined,
    output: {
      assetModuleFilename: `static/media/[name]${CONTENT_HASH}[ext]`,
      chunkFilename: `static/js/[name]${!isDev ? `${CONTENT_HASH}` : ''}.js`,
      clean: true,
      filename: `static/js/[name]${!isDev ? `${CONTENT_HASH}` : ''}.js`,
      path: path.resolve(process.cwd(), 'build'),
      publicPath: 'auto',
    },
    optimization: isDev ? {
      minimize: false,
      runtimeChunk: false,
      splitChunks: false,
    } : {
      concatenateModules: true,
      chunkIds: 'deterministic',
      innerGraph: true,
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            sourceMap: false,
            keep_fnames: true,
            parse: {
              ecma: 2018,
            },
            compress: {
              ecma: 5,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            safari10: true,
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
        }),
      ],
      moduleIds: 'deterministic',
      removeAvailableModules: true,
      runtimeChunk: false,
      sideEffects: true,
      splitChunks: {
        chunks: 'all',
        minChunks: 2,
        usedExports: true,
      },
    },
    resolve: {
      extensions: ['.ts', '.js', '.tsx', '.json'], // js ??
      alias: {},
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              type: 'asset',
              parser: {
                dataUrlCondition: {
                  maxSize: parseInt(env.IMAGE_INLINE_SIZE_LIMIT || '10000', 10),
                },
              },
            },
            {
              test: /\.svg$/i, // подрезать тут?
              issuer: {
                and: [/\.(js|ts)x?$/],
              },
              use: [
                {
                  loader: '@svgr/webpack',
                  options: {
                    prettier: false,
                    svgo: false,
                    svgoConfig: {
                      plugins: [{ name: 'removeViewBox', active: false }],
                    },
                    titleProp: true,
                    ref: true,
                  },
                },
                {
                  loader: 'file-loader',
                  options: {
                    name: 'static/media/[name].[contenthash:8].[ext]',
                  },
                },
              ],
            },
            {
              test: /\.(mjs|js|ts)x?$/, // mjs?
              include: /src/,
              loader: 'babel-loader',
              options: {
                sourceType: 'unambiguous',
                cacheDirectory: true,
                cacheCompression: !isDev,
                compact: !isDev,
              },
            },
            {
              test: /\.css$/,
              exclude: /\.module\.css$/,
              use: [
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                    sourceMap: true,
                    modules: true
                  },
                },
              ],
              sideEffects: true,
            },
            {// а это зачем?
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              type: 'asset/resource',
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin(
        isDev ? htmlWebpackPluginDev : htmlWebpackPluginProd,
      ),
      env.BUNDLE_ANALYZE === 'true' && new BundleAnalyzerPlugin(),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(env),
      }),
      !isDev && new MiniCssExtractPlugin(),
    ].filter(Boolean),
  };
};

// TODO
// 1. connect to node server
// 2. client-shop
// 3. server-shop
// 4. file-saver ?? node-forge ?? react-beautiful-dnd ?? 
// react-custom-scrollbars ?? react-transition-group ?? copy-webpack-plugin
// eventemitter2
// 5. PAGE_ALIAS
// 6. https

// done
// 0. first launch