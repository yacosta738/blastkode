// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Blastkode",
  siteDescription: "Yuniel Acosta's blog and portfolio",
  siteUrl: "https://blastkode.com",
  plugins: [
    {
      use: "gridsome-plugin-tailwindcss",
      options: {
        tailwindConfig: "./tailwind.config.js",
        presetEnvConfig: {},
        shouldImport: false,
        shouldTimeTravel: false,
      },
    },
    {
      use: "gridsome-plugin-typescript",
    },
    {
      use: "@gridsome/vue-remark",
      options: {
        typeName: "Documentation", // Required
        baseDir: "./docs", // Where .md files are located
        pathPrefix: "/docs", // Add route prefix. Optional
        template: "./src/templates/Documentation.vue", // Optional
        plugins: [
          [
            "gridsome-plugin-remark-shiki",
            { theme: "Material-Theme-Palenight", skipInline: true },
          ],
        ],
      },
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/blog/**/*.md",
        typeName: "Post",
        refs: {
          categories: {
            typeName: "Category",
            create: true,
          },
          tags: {
            typeName: "Tag",
            create: true,
          },
        },
      },
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/jobs/**/*.md",
        typeName: "Job",
      },
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/projects/**/*.md",
        typeName: "Project",
      },
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/authors/**/*.md",
        typeName: "Author",
      },
    },
    {
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: `/admin`,
        modulePath: `src/admin/index.js`,
      },
    },
    {
      use: "gridsome-plugin-rss",
      options: {
        contentTypeName: "Post",
        feedOptions: {
          title: "Yuniel Acosta's blog and portfolio",
          feed_url: "https://www.blastkode.com/rss.xml",
          site_url: "https://www.blastkode.com/",
        },
        feedItemOptions: (node) => ({
          title: node.title,
          description: node.summary,
          url: "https://www.blastkode.com" + node.path,
          author: "Yuniel Acosta",
          date: node.date,
        }),
        output: {
          dir: "./static",
          name: "rss.xml",
        },
      },
    },
    {
      use: "@allanchain/gridsome-plugin-pwa",
      options: {
        manifestPath: "manifest.json",
        name: "Blastkode",
        themeColor: "#64ffda",
        icon: {
          androidChrome: [
            {
              src: "./src/favicon.png",
              sizes: [512, 384, 192, 144],
              purpose: "maskable",
            },
            {
              sizes: [512, 384, 192, 144, 96, 72, 48],
              purpose: "any",
            },
          ],
        },
        manifestOptions: {
          short_name: "Blastkode",
          description: "Yuniel Acosta's blog and portfolio",
          start_url: ".",
          display: "standalone",
          background_color: "#112240",
        },
        appShellPath: "offline/index.html",
        workboxPluginMode: "generateSW",
        workboxOptions: {
          globPatterns: ["assets/@(js|css)/*", "offline/index.html"],
          navigateFallback: "/offline/index.html",
          navigateFallbackAllowlist: [/\/$/],
          runtimeCaching: [
            {
              urlPattern: new RegExp("/search.json$"),
              handler: "NetworkFirst",
              options: {
                cacheName: "Post-Data",
                networkTimeoutSeconds: 3,
                expiration: { maxEntries: 20 },
              },
            },
          ],
        },
      },
    },
    {
      use: "gridsome-plugin-robots-txt",
      options: {
        host: "https://blastkode.com",
        sitemap: "https://blastkode.com/configs/sitemap.xml",
        policy: [
          {
            userAgent: "Googlebot",
            allow: "/",
            disallow: "/search",
            crawlDelay: 2,
          },
          {
            userAgent: "*",
            allow: "/",
            disallow: "/search",
            crawlDelay: 10,
            cleanParam: "ref /articles/",
          },
        ],
      },
    },
    {
      use: "@gridsome/plugin-sitemap",
      options: {
        cacheTime: 600000, // default
      },
    },
  ],
  templates: {
    Tag: "/tag/:id",
    Category: "/category/:id",
  },
  transformers: {
    remark: {
      plugins: [
        [
          "gridsome-plugin-remark-shiki",
          { theme: "Material-Theme-Palenight", skipInline: true },
        ],
      ],
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"],
      anchorClassName: "icon icon-link",
    },
  },
};
