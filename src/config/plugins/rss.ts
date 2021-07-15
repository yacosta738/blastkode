module.exports = {
  use: 'gridsome-plugin-rss',
  options: {
    contentTypeName: 'Post',
    feedOptions: {
      title: "Yuniel Acosta's blog and portfolio",
      feed_url: 'https://www.blastkode.com/rss.xml',
      site_url: 'https://www.blastkode.com/',
    },
    feedItemOptions: node => ({
      title: node.title,
      description: node.summary,
      url: 'https://www.blastkode.com' + node.path,
      author: 'Yuniel Acosta',
      date: node.date,
    }),
    output: {
      dir: './static',
      name: 'rss.xml',
    },
  },
};
