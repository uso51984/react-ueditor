var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BUILD_PATH = path.resolve(__dirname, './dist');
var TMP_PATH = path.resolve(__dirname,'./templates/index.html');

module.exports = {
  entry: {
    'app': [
      './src/app.js',
    ],
    vendor: ['react', 'react-dom']
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].js' //输出js
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name:'vendor', filename: 'vendor.js'}),
    new HtmlWebpackPlugin({
        title: 'reactdemo',
        template: TMP_PATH,
        filename: 'index.html',
        chunks: ['app','vendor'],
        inject: 'body'
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development") // development,production
      }
    })
  ],

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [ 'babel-loader?presets[]=es2015,presets[]=react,presets[]=stage-0'],
      exclude: /node_modules/
    },{
        test: /\.less$/,
        loaders: ['style', 'css?sourceMap', 'less?&sourceMap&includePaths[]=./user-center/style/index.less']
      },
      { test: /\.css$/, loader: "style-loader!css-loader" }
      ,
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader?name=images/[name].[ext]',
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
    ]
  }
};