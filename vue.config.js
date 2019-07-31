module.exports = {
  publicPath: "./",
  productionSourceMap: false,

  devServer: {
    port: 9010,
    proxy: 'http://xxx.com/'
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  }
}