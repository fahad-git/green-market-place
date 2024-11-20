const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  plugins: [
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif|js|css|html)$/,
          handler: 'CacheFirst',
        },
        {
          urlPattern: /\/api\/blogs/,
          handler: 'NetworkFirst',
        },
        {
          urlPattern: /\/api\/products/,
          handler: 'NetworkFirst',
        },
      ],
    }),
  ],
};
