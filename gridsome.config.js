// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`


module.exports = {
  siteName: 'Blastkode',
  siteDescription: 'Yuniel Acosta\'s blog and portfolio',
  siteUrl: 'https://blastkode.com',
  plugins: [
    {
      use: 'gridsome-plugin-tailwindcss',
       options: {
        tailwindConfig: './tailwind.config.js',
        presetEnvConfig: {},
        shouldImport: false,
        shouldTimeTravel: false
      }
      },
    {
      use: 'gridsome-plugin-typescript',
    },
    {
      use: '@gridsome/vue-remark',
      options: {
        typeName: 'Documentation', // Required
        baseDir: './docs', // Where .md files are located
        pathPrefix: '/docs', // Add route prefix. Optional
        template: './src/templates/Documentation.vue', // Optional
        plugins: [
          [ 'gridsome-plugin-remark-shiki', { theme: 'Material-Theme-Palenight', skipInline: true } ]
        ],
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/blog/**/*.md',
        typeName: 'Post',
        refs: {
          categories: {
            typeName: 'Category',
            create: true
          },
          tags: {
            typeName: 'Tag',
            create: true
          },
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/jobs/**/*.md',
        typeName: 'Job'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/projects/**/*.md',
        typeName: 'Project'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/authors/**/*.md',
        typeName: 'Author'
      }
    },
    {
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'Post',
        feedOptions: {
          title: 'Yuniel Acosta\'s blog and portfolio',
          feed_url: 'https://www.blastkode.com/rss.xml',
          site_url: 'https://www.blastkode.com/'
        },
        feedItemOptions: node => ({
          title: node.title,
          description: node.summary,
          url: 'https://www.blastkode.com' + node.path,
          author: 'Yuniel Acosta',
          date: node.date
        }),
        output: {
          dir: './static',
          name: 'rss.xml'
        }
      }
    },
    {
      use: 'gridsome-plugin-pwa',
      options: {
        // Service Worker Options
        disableServiceWorker: false,
        serviceWorkerPath: './src/service-worker.js',
        cachedFileTypes: 'js,json,css,html,png,jpg,jpeg,svg,gif',
        disableTemplatedUrls: false,       // Optional
        // Manifest Options (https://developer.mozilla.org/en-US/docs/Web/Manifest)
        manifestPath: 'manifest.json',
        title: 'Blastkode',
        startUrl: '/',
        display: 'standalone',
        statusBarStyle: 'default',
        themeColor: '#0a192f',
        backgroundColor: '#ffffff',
        icon: 'static/logo.svg',
        shortName: 'Blastkode',              // Optional
        description: 'Yuniel Acosta\'s blog and portfolio',// Optional
        categories: ['blog', 'tech', 'portfolio'],          // Optional
        lang: 'en-GB',                      // Optional
        dir: 'auto',                        // Optional
        maskableIcon: true,                 // Optional
        screenshots: [                      // Optional
          {
            src: 'screenshots/demo.png',
            sizes: '1280x720',
            type: 'image/png',
          },
        ],
        gcmSenderId: undefined,             // Optional

        // Standard Meta Tags
        svgFavicon: './src/favicon.png',          // Optional. Requires favicon.ico fallback

        // Microsoft Windows Meta Tags
        msTileColor: '#0a192f',             // Optional

        // Apple MacOS Meta Tags
        appleMaskIcon: './src/favicon.png',       // Optional
        appleMaskIconColor: '#0a192f',      // Optional

      }
    },
    {
      use: "gridsome-plugin-manifest",
      options: {
        background_color: "#ffffff",
        icon_path: "static/logo.svg",
        name: "Blastkode",
        short_name: "Blastkode",
        theme_color: "#ffffff",
        lang: "en",
        display: "standalone"
      },
    },
    {
      use: 'gridsome-plugin-robots-txt',
      options: {
        host: 'https://blastkode.com',
        sitemap: 'https://blastkode.com/configs/sitemap.xml',
        policy: [
          {
            userAgent: "Googlebot",
            allow: "/",
            disallow: "/search",
            crawlDelay: 2
          },
          {
            userAgent: "*",
            allow: "/",
            disallow: "/search",
            crawlDelay: 10,
            cleanParam: "ref /articles/"
          }
        ]
      }
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000, // default
      }
    },
  ],
  templates: {
    Tag: '/tag/:id',
    Category: '/category/:id'
  },
  transformers: {
    remark: {
      plugins: [
        [ 'gridsome-plugin-remark-shiki', { theme: 'Material-Theme-Palenight', skipInline: true } ]
      ],
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
    }
  },
}
