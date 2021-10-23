// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const tailwindcss = require("./src/config/plugins/tailwindcss.ts");
const typescript = require("./src/config/plugins/typescript.ts");
const vueMark = require("./src/config/plugins/vue-mark.ts");
const posts = require("./src/config/plugins/post-source-filesystem.ts");
const jobs = require("./src/config/plugins/job-source-filesystem.ts");
const projects = require("./src/config/plugins/project-source-filesystem.ts");
const authors = require("./src/config/plugins/author-source-filesystem.ts");
const netlifyCMS = require("./src/config/plugins/netlify-cms.ts");
const rss = require("./src/config/plugins/rss.ts");
const pwa = require("./src/config/plugins/pwa.ts");
const robotTxt = require("./src/config/plugins/robot-txt.ts");
const sitemap = require("./src/config/plugins/sitemap.ts");
const i18n = require("./src/config/plugins/i18n.ts");

module.exports = {
  siteName: "Blastkode",
  siteDescription: "Yuniel Acosta's blog and portfolio",
  siteUrl: "https://blastkode.com",
  plugins: [
    tailwindcss,
    typescript,
    vueMark,
    posts,
    jobs,
    projects,
    authors,
    netlifyCMS,
    rss,
    pwa,
    robotTxt,
    sitemap,
    i18n,
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
