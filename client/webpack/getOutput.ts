import { Configuration } from 'webpack';
import path from 'path';

const CONTENT_HASH = '.[contenthash:8]';

export const getOutput = (isDev: boolean): Configuration['output'] => {
  const assetModuleFilename = `static/media/[name]${CONTENT_HASH}[ext]`;
  const chunkFilename = `static/js/[name]${!isDev ? `${CONTENT_HASH}` : ''}.js`;
  const filename = `static/js/[name]${!isDev ? `${CONTENT_HASH}` : ''}.js`;

  // вообще не понятно, что тут
  return {
    assetModuleFilename,
    chunkFilename,
    clean: true,
    filename,
    path: path.resolve(process.cwd(), 'build'),
    publicPath: 'auto',
  };
};
