module.exports = {
    use: '@gridsome/vue-remark',
    options: {
        typeName: 'Documentation', // Required
        baseDir: './docs', // Where .md files are located
        pathPrefix: '/docs', // Add route prefix. Optional
        template: './src/templates/Documentation.vue', // Optional
        plugins: [
            [
                'gridsome-plugin-remark-shiki',
                {theme: 'Material-Theme-Palenight', skipInline: true},
            ],
        ],
    },
};
