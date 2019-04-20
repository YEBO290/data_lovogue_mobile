'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // assetsPublicPath: './', // 修改解决跨域
    proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    // host: '192.168.1.102',
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },

  // 开发环境
  // dev: {
  //   env:require('./dev.env'), // 使用 config/dev.env.js 中定义的编译环境
  //   port: 8080,    // 运行测试页面的端口

  //   autoOpenBrowser: true,    //是否自动打开浏览器

  //   assetsSubDirectory: 'static',    // 编译输出的二级目录

  //   assetsPublicPath: '/',    // 编译发布上线路径的根目录，可配置为资源服务器域名或 CDN 域名

  //   proxyTable: {
  //       //https://github.com/chimurai/http-proxy-middleware,配置方式
  //   },    // 需要 proxyTable 代理的接口（可跨域）http://vuejs-templates.github.io/webpack/proxy.html

  //   // CSS Sourcemaps off by default because relative paths are "buggy"
  //   // with this option, according to the CSS-Loader README
  //   // (https://github.com/webpack/css-loader#sourcemaps)
  //   // In our experience, they generally work as expected,
  //   // just be aware of this issue when enabling this option.

  //   cssSourceMap: false   // 是否开启 cssSourceMap
  // }
  
    // 生产环境配置
  //   build: {
  //     // 使用 config/prod.env.js 中定义的编译环境

  //     env: require('./prod.env'),
  //     index: path.resolve(__dirname, '../dist/index.html'),   // 编译注入的 index.html 文件,必须是本地的绝对路径
  //     assetsRoot: path.resolve(__dirname, '../dist'),   // 编译输出的静态资源根路径
  //     assetsSubDirectory: 'static',    // 编译输出的二级目录
  //     assetsPublicPath: '/',    // 编译发布上线路径的根目录，可配置为资源服务器域名或 CDN 域名
  //     productionSourceMap: true,    //生成用于生产构建的源映射

  //     // Gzip off by default as many popular static hosts such as
  //     // Surge or Netlify already gzip all static assets for you.
  //     // Before setting to `true`, make sure to:
  //     // npm install --save-dev compression-webpack-plugin

  //     productionGzip: false,    // 是否开启 gzip

  //     productionGzipExtensions: ['js', 'css'],    // 需要使用 gzip 压缩的文件扩展名

  //     // Run the build command with an extra argument to
  //     // View the bundle analyzer report after build finishes:
  //     // `npm run build --report`
  //     // Set to `true` or `false` to always turn it on or off
  //     bundleAnalyzerReport: process.env.npm_config_report    //一个实用工具,用于分析项目的依赖关系https://www.npmjs.com/package/webpack-bundle-analyzer
  // }
 
}

