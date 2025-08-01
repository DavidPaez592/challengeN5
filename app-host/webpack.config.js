const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  devtool: 'source-map',

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'auto',
    clean: true,
  },

  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
    open: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'appHost',
      remotes: {
        'mfe-rick': 'mfeRick@http://localhost:3001/remoteEntry.js',
        'mfe-dbz': 'mfeDbz@http://localhost:3002/remoteEntry.js',
        'mfe-anime': 'mfeAnime@http://localhost:3003/remoteEntry.js',
        'mfe-harry': 'mfeHarry@http://localhost:3004/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^19.1.1' },
        'react-dom': { singleton: true, requiredVersion: '^19.1.1' },
        'styled-components': { singleton: true },
        'react-i18next': { singleton: true },
        i18next: { singleton: true },
      },
    }),
  ],
};
