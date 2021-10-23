module.exports = {
  use: '@gridsome/source-filesystem',
  options: {
    path: 'content/projects/**/*.md',
    typeName: 'Project',
  },
};
