const {dependencies} = require('./package.json');

const HAS_FAST_REFRESH = process.env.FAST_REFRESH === 'true';
const IS_DEV = process.env.NODE_ENV === 'development';
const IS_PROD = process.env.NODE_ENV === 'production';

module.exports = {
  assumptions: {
    setPublicClassFields: true,
  },
  presets: [
    [
      '@babel/preset-env',
      {
        modules: IS_DEV || IS_PROD ? false : 'auto',
        bugfixes: true,
        shippedProposals: true,
        useBuiltIns: 'usage',
        corejs: dependencies['core-js'].replace(/\^/, '').substring(0, 4),
      },
    ],
    ['@babel/preset-react', {runtime: 'automatic'}],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: {
          version: 3,
          proposals: true,
        },
        version: dependencies['@babel/runtime-corejs3'],
      },
    ],
    /** Нужен для работы styled-components/macro */
    // 'babel-plugin-macros',
    HAS_FAST_REFRESH && IS_DEV && 'react-refresh/babel',
  ].filter(Boolean),
};
