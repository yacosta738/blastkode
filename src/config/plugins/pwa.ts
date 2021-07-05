module.exports = {
    use: '@allanchain/gridsome-plugin-pwa',
    options: {
        manifestPath: 'manifest.json',
        name: 'Blastkode',
        themeColor: '#64ffda',
        icon: {
            androidChrome: [
                {
                    src: './logo.png',
                    sizes: [512, 384, 192, 144],
                    purpose: 'maskable',
                },
                {
                    sizes: [512, 384, 192, 144, 96, 72, 48],
                    purpose: 'any',
                },
            ],
            appleMaskIcon: {url: './safari-pinned-tab.svg'},
        },
        manifestOptions: {
            short_name: 'Blastkode',
            description: "Yuniel Acosta's blog and portfolio",
            start_url: '.',
            display: 'standalone',
            background_color: '#112240',
        },
        msTileColor: '#64ffda',
        appShellPath: '/index.html',
        workboxPluginMode: 'generateSW',
        workboxOptions: {
            globPatterns: ['assets/@(js|css)/*', '/index.html'],
            navigateFallback: '/index.html',
            navigateFallbackAllowlist: [/\/$/],
            skipWaiting: true,
            runtimeCaching: [
                {
                    urlPattern: new RegExp('/search.json$'),
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'Post-Data',
                        networkTimeoutSeconds: 3,
                        expiration: {maxEntries: 20},
                    },
                },
                {
                    urlPattern: new RegExp('/blog'),
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'Post-Data',
                        networkTimeoutSeconds: 3,
                        expiration: {maxEntries: 20},
                    },
                },
                {
                    urlPattern: new RegExp('/projects'),
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'Post-Data',
                        networkTimeoutSeconds: 3,
                        expiration: {maxEntries: 20},
                    },
                },
                {
                    urlPattern: new RegExp('/authors'),
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'Post-Data',
                        networkTimeoutSeconds: 3,
                        expiration: {maxEntries: 20},
                    },
                },
            ],
        },
    },
}
;
