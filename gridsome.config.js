// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`


module.exports = {
  siteName: 'Blastkode',
  siteDescription: 'Yuniel Acosta\'s blog and portfolio',
  siteUrl: 'https://gridsome-portfolio-starter.netlify.com',
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
          authors: {
            typeName: 'Author',
            create: true
          },
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
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000, // default
      }
    },
  ],
  templates: {
    Tag: '/tag/:id'
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
