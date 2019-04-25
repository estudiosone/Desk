module.exports = {
  pwa: {
    name: 'Yhair Stylist',
    themeColor: '#A52518',
  },

  configureWebpack: {
    performance: {
      hints: 'warning', // enum
      maxAssetSize: 1048576, // int (in bytes),
      maxEntrypointSize: 1048576, // int (in bytes)
    },
  },

  publicPath: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,
  css: undefined,
};
