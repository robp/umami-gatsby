// Use .env for environment configuration.
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const languages = require("./src/data/languages")

module.exports = {
  siteMetadata: {
    title: `Umami Food Magazine`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
    languages,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: process.env.DRUPAL_BASE_URL,
        apiBase: process.env.DRUPAL_API_BASE, // optional, defaults to `jsonapi`
        languageConfig: {
          defaultLanguage: "en",
          enabledLanguages: ["en", "es"],
          translatableEntities: [
            "node--article",
            "node--recipe",
            "node--page",
            "taxonomy_term--recipe_category",
            "taxonomy_term--tags",
            "taxonomy_vocabulary--taxonomy_vocabulary",
            "media--image",
            "file--file",
            "media_type--media_type",
            "menu_link_content--menu_link_content",
            "menu_items",
          ],
        },
      },
      fastBuilds: true,
    },
    {
      resolve: "gatsby-plugin-i18n",
      options: {
        langKeyDefault: languages.defaultLangKey,
        langKeyForNull: "any",
        useLangKeyLayout: false,
      },
    },
    {
      resolve: `gatsby-source-drupal-menu-links`,
      options: {
        baseUrl: process.env.DRUPAL_BASE_URL,
        apiBase: process.env.DRUPAL_API_BASE,
        menus: ["main", "footer"], // Which menus to fetch, there are the menu IDs.
        languages: ["en"],
      },
    },
    `gatsby-plugin-remove-trailing-slashes`,
    `gatsby-plugin-sass`,
  ],
}
