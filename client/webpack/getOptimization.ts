import TerserPlugin from 'terser-webpack-plugin';
import { Configuration } from 'webpack';

const devConfig: Configuration['optimization'] = {
  minimize: false,
  runtimeChunk: false,
  splitChunks: false,
};

const prodConfig: Configuration['optimization'] = {
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
};

export const getOptimization = (isDev: boolean): Configuration['optimization'] =>
    // вообще непонятно, что тут
  isDev ? devConfig : prodConfig;
