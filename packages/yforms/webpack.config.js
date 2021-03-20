const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/style/index.tsx'),
  devtool: false,
  mode: 'production',
  output: {
    filename: 'yforms.js',
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: {
                  // '@ant-prefix': 'demo',
                },
              },
            },
          },
        ],
      },
      { test: /\.tsx?$/, include: /src/, use: { loader: 'babel-loader' } },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'yforms.css',
    }),
  ],
};
