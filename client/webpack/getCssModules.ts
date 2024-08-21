import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const developmentConfig = [
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
          modules: 'icss',
        },
      },
    ],
    sideEffects: true,
  },
  {
    test: /\.module\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          sourceMap: true,
          modules: 'module',
        },
      },
    ],
  }
];

const productionConfig = [
  {
    test: /\.css$/,
    exclude: /\.module\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          sourceMap: false,
          modules: 'icss',
        },
      },
    ],
    sideEffects: true,
  },
  {
    test: /\.module\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          sourceMap: false,
          modules: 'module',
        },
      },
    ],
  }
];

export const getCssModules = (isDev: boolean) => isDev
  ? developmentConfig : productionConfig;
