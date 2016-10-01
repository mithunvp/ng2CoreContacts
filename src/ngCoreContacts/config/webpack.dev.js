var path = require('path');
const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');

console.log(__dirname);

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const HMR = helpers.hasProcessFlag('hot');
const METADATA = webpackMerge(commonConfig({env: ENV}).metadata, {
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: HMR
});

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function(options) {
  return webpackMerge(commonConfig({env: ENV}), {

    
    metadata: METADATA,
    debug: true,
    devtool: 'cheap-module-source-map',    
    output: {
        path: helpers.root('/wwwroot/dist'),
        filename: 'dist/[name].bundle.js',
        sourceMapFilename: '[name].map',
        publicPath: "/",
        chunkFilename: '[id].chunk.js',
    },
    plugins: [    
    // NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
    new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
        'process.env': {
            'ENV': JSON.stringify(METADATA.ENV),
            'NODE_ENV': JSON.stringify(METADATA.ENV),
            'HMR': METADATA.HMR,
        }
    }),
      new NamedModulesPlugin(),
    ],
    tslint: {
      emitErrors: false,
      failOnHint: false,
      resourcePath: 'clientsrc'
    },
    
    devServer: {
      port: METADATA.port,
      host: METADATA.host,
      historyApiFallback: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      },      
      outputPath: path.join(__dirname, 'wwwroot/')
    },
  });
}
