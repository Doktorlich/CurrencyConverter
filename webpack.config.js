const path = require("path"); //
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { config } = require("process");
const { SourceMap } = require("module");
//const html =require('html-loader')

const devMode = process.env.NODE_ENV == "development";
const prodMode = !devMode

const optimization = ()=>{
  const config ={
    splitChunks:{
      chunks: 'all'
    }
  }
  if(prodMode){
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ]
  }
  return config
}

const filename = ext => devMode ? `[name].${ext}` : `[name].[hash].${ext}`
const babelOptions = preset =>{
  const opts = {
    presets: [
      '@babel/preset-env'
    ],
    plugins: [
            
    ]
  }

  if (preset){
    opts.presets.push(preset)
  }

  return opts
}

/*
const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions()
  }]
                                                //код для eslint
  if (devMode){
    loaders.push('eslint-loader')
  }

  return loaders
}
//*/

// const sourceMap = () =>{
//   if(devMode){
//     return 'source-map'
//   }
// }
module.exports = {
  context: path.resolve(__dirname,'src'),
  mode: "development",
  entry: {
    main: ['@babel/polyfill', "./index.js", "./js/fetch.js"],
    analytics: "./analytics.ts",
    
  }, //указываем входной файл для нашего приложения,  начало работы вебпака
  output: {
    //указываем куда скалдывать результаты работы вебпака
    filename: filename('js'), //параметр имени файла
    path: path.resolve(__dirname, "dist"), // указываем место хранения
  },
  resolve:{
   // extensions:['.js','.json','.png'],
   alias:{
     '@models': path.resolve(__dirname, 'src/models'),
      '@': path.resolve(__dirname,'src'),
   }

  },
  optimization:optimization(),
    devServer:{
    port:5000,
    open: true,
  
  },
  // devtool: sourceMap(),
 //devtool:  devMode ? 'source-map' : '', //при использовании в build моде выдает ошибку
  plugins: [
      new HTMLWebpackPlugin({
         
         template:'./index.html',
        
         inject:"body",
         minify:{
           collapseWhitespace: prodMode,
         }

      }),
      
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: devMode ? "[name].css" : "[name].[hash].css",
        chunkFilename: devMode ? "[id].css" : "[id].[hash].css",
      }),
      new CopyWebpackPlugin({
        patterns: [
            {
                from: path.resolve(__dirname, 'src/assets/favicon.ico'),
                to: path.resolve(__dirname, 'dist')
            } 
        ]
    })
  ],
  module:{
      rules:[
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
             // "postcss-loader",
               //"scss-loader",
            ],
          },
          {
            test: /\.s[ac]ss$/,
            use: [
              MiniCssExtractPlugin.loader,
              //"css-loader",
             // "postcss-loader",
              "css-loader",
               "sass-loader",
            ],
          },
            
          
            // {
            //   test: /\.html$/i,
            //   loader: "html-loader",  //попытка сделать сборщик файлов html
            // },



          {
            test:/\.(png|jpg|gif|svg)$/,
            type: 'asset/resource'
          },
          {
            test:/\.(ttf|woff|woff2|eot)$/,
            type: 'asset/resource'
          },
          {
            test:/\.xml$/,
            use: ['xml-loader']
            
          },
          // {
          //   test: /\.m?js$/,
          //   exclude: /node_modules/,  //eslint так же выдает 2 ошибки
          //   use: jsLoaders()
          // },


          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use:  {
              loader: 'babel-loader',
            options: babelOptions()
          }
          },
         



          {
            test: /\.m?ts$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: babelOptions('@babel/preset-typescript')            }
          },
          {
            test: /\.m?jsx$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: babelOptions('@babel/preset-react')            }
          },
      ]
  }
};

