module .exports = {
    use: 'gridsome-plugin-robots-txt',
    options: {
        host: 'https://blastkode.com',
        sitemap: 'https://blastkode.com/configs/sitemap.xml',
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
