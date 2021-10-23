module.exports = {
  use: '@gridsome/source-filesystem',
  options: {
    path: 'content/blog/**/*.md',
    typeName: 'Post',
    refs: {
      categories: {
        typeName: 'Category',
        create: true,
      },
      tags: {
        typeName: 'Tag',
        create: true,
      },
    },
  },
};
