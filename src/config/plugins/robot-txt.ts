module.exports = {
  use: 'gridsome-plugin-robots-txt',
  options: {
    host: 'https://yunielacosta.com',
    sitemap: 'https://yunielacosta.com/configs/sitemap.xml',
    policy: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: '/search',
        crawlDelay: 2,
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: '/search',
        crawlDelay: 10,
        cleanParam: 'ref /articles/',
      },
    ],
  },
};
