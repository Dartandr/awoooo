const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };
  if (!devMode) {
    config.minimizer = [new TerserPlugin(), new CssMinimizerPlugin()];
    config.minimize = true;
  }
  return config;
};

const copy = () => {
  const patterns = [
    {
      from: path.resolve(__dirname, 'src/mpv'),
      to: path.resolve(__dirname, 'dist/mpv'),
    },
    {
      from: path.resolve(__dirname, 'node_modules/@ffmpeg-installer/win32-x64/ffmpeg.exe'),
      to: path.resolve(__dirname, 'dist/node_modules/@ffmpeg-installer/win32-x64/ffmpeg.exe'),
    },
  ];
  if (!devMode) {
    patterns.push({
      from: path.resolve(__dirname, 'src/electron.js'),
      to: path.resolve(__dirname, 'dist'),
    });
    patterns.push({
      from: path.resolve(__dirname, 'src/icon.png'),
      to: path.resolve(__dirname, 'dist'),
    })
  }
  return patterns;
};

const plugins = [
  new HtmlWebpackPlugin({
    template: './index.html',
    minify: {
      collapseWhitespace: !devMode,
    },
  }),
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
  }),
  new CopyWebpackPlugin({
    patterns: copy(),
  }),
];

const babelOptions = (type) => {
  const options = {
    presets: ['@babel/preset-env'],
  };
  switch (type) {
    case 'jsx':
      options.presets.push('@babel/preset-react');
      break;
    case 'tsx':
      options.presets.push('@babel/preset-typescript');
      options.presets.push('@babel/preset-react');
      break;
    default:
      break;
  }
  return options;
};

if (devMode) {
  console.log('dev');
  plugins.push(
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
  );
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: devMode ? 'development' : 'production',
  devtool: devMode ? 'source-map' : false,
  entry: ['@babel/polyfill', './index.tsx'],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: devMode ? '/' : './',
  },
  resolve: {
    extensions: ['.js', '.ts', '.svg', '.jsx', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    fallback: {
      fs: false,
      path: false,
    },
  },
  optimization: optimization(),
  devServer: {
    port: 3020,
    open: true,
    historyApiFallback: true,
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|svg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(ttf|woff|eot)$/,
        type: 'asset/resource',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions(),
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions('tsx'),
        },
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions('jsx'),
        },
      },
    ],
  },
};
