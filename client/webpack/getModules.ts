import { DotenvParseOutput } from 'dotenv-flow';
import { Configuration } from 'webpack';

import { getCssModules } from './getCssModules';

export const getModules = (isDev: boolean, env: DotenvParseOutput): Configuration['module'] => (
  {
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
          ...getCssModules(isDev),
          {// а это зачем?
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            type: 'asset/resource',
          },
        ],
      },
    ],
  }
);
