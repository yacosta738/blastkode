// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const { version } = require("./package.json");

module.exports = function (api, options) {
  process.env.GRIDSOME_BASE_URL = api.config.publicPath;
  process.env.GRIDSOME_VERSION = version;
  api.chainWebpack(async (config, { isClient, isProd }) => {
    if (isProd && isClient) {
      config.optimization.splitChunks({
        chunks: "all",
        maxInitialRequests: Infinity,
        cacheGroups: {
          vueVendor: {
            test: /[\\/]node_modules[\\/](vue|vuex|vue-router)[\\/]/,
            name: "vue-vendors",
          },
          gridsome: {
            test: /[\\/]node_modules[\\/](gridsome|vue-meta)[\\/]/,
            name: "gridsome-vendors",
          },
          polyfill: {
            test: /[\\/]node_modules[\\/]core-js[\\/]/,
            name: "core-js",
          },
          // axios: {
          //   test: /[\\/]node_modules[\\/]axios[\\/]/,
          //   minSize: 10000,
          //   name: "axios",
          // },
        },
      });
    }
  });
  api.loadSource((store) => {});
};
