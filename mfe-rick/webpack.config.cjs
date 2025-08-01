const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  devServer: {
    port: 3001,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    publicPath: 'auto',
    clean: true,
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
    new ModuleFederationPlugin({
      name: 'mfeRick',
      filename: 'remoteEntry.js',
      exposes: {
        './CharacterList': './src/components/CharacterList',
      },
      shared: {
        react: { singleton: true, requiredVersion: deps.react },
        'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
        'styled-components': { singleton: true, requiredVersion: deps['styled-components'] },
        'react-i18next': { singleton: true },
        i18next: { singleton: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
