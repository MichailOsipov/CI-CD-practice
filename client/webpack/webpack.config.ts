import dotenv from 'dotenv-flow';
import path from 'path';

import { getDevServer } from './getDevServer';
import { getOutput } from './getOutput';
import { getOptimization } from './getOptimization';
import { getModules } from './getModules';
import { getPlugins } from './getPlugins';

const MODE = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
} as const;

export default () => {
  const mode = process.env.NODE_ENV || 'development';

  const isDev = mode === MODE.DEVELOPMENT;
  const env = dotenv.config({ silent: !isDev }).parsed;

  if (!env) {
    return console.log(
      '\x1b[31mwebpack [ERROR]: environment not found\x1b[0m'
    );
  }

  return {
    mode,
    devtool: (
      isDev
        /** https://webpack.js.org/configuration/devtool/ */
        ? 'cheap-module-source-map'
        : false
    ),
    entry: path.resolve(process.cwd(), 'src/index.tsx'),
    devServer: isDev ? getDevServer(env) : undefined,
    output: getOutput(isDev),
    optimization: getOptimization(isDev),
    resolve: {
      extensions: ['.ts', '.js', '.tsx', '.json'], // js ??
      alias: {},
    },
    module: getModules(isDev, env),
    plugins: getPlugins(isDev, env),
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