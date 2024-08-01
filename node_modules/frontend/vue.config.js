const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.module
      .rule('scss')
      .oneOf('normal')
      .use('sass-loader')
      .loader('sass-loader')
      .tap(options => {
        options.sassOptions = {
          ...options.sassOptions,
          quietDeps: true,
        };
        return options;
      });
  }
});
