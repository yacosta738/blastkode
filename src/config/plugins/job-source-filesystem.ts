module .exports = {
    use: '@gridsome/source-filesystem',
    options: {
        path: 'content/jobs/**/*.md',
        typeName: 'Job',
    },
};
