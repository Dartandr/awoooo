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
    patterns: [
      {
        from: path.resolve(__dirname, 'src/test'),
        to: path.resolve(__dirname, 'dist'),
      },
    ],
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
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
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
        use:{
          loader: 'babel-loader',
          options: babelOptions('tsx'),
        } 
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
