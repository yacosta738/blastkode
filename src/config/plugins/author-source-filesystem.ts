module .exports = {
    use: '@gridsome/source-filesystem',
    options: {
        path: 'content/authors/**/*.md',
        typeName: 'Author',
    },
};
