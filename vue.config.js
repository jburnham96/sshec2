module.exports = {
    pluginOptions: {
      electronBuilder: {
        nodeIntegration: true,
      },
    },
    chainWebpack: config => {
      config.module
        .rule('node')
        .test(/\.node$/)
        .use('node-loader')
        .loader('node-loader')
        .end();
    }
  };
  