module.exports = {
  use: 'gridsome-plugin-rss',
  options: {
    contentTypeName: 'Post',
    feedOptions: {
      title: "Yuniel Acosta's blog and portfolio",
      feed_url: 'https://www.yunielacosta.com/rss.xml',
      site_url: 'https://www.yunielacosta.com/',
    },
    feedItemOptions: node => ({
      title: node.title,
      description: node.summary,
      url: 'https://www.yunielacosta.com' + node.path,
      author: 'Yuniel Acosta',
      date: node.date,
    }),
    output: {
      dir: './static',
      name: 'rss.xml',
    },
  },
};
