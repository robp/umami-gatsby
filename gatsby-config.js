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
        name: `Umami Food Magazine`,
        short_name: `Umami`,
        description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
        lang: `en`,
        start_url: `/en`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
        localize: [
          {
            name: `Revista Umami Food`,
            short_name: `Umami`,
            description: `Comienza tu próximo gran proyecto de Gatsby con este motor de arranque predeterminado. Este iniciador básico se envía con los principales archivos de configuración de Gatsby que pueda necesitar.`,
            lang: `es`,
            start_url: `/es`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: process.env.DRUPAL_BASE_URL,
        apiBase: process.env.DRUPAL_API_BASE, // optional, defaults to `jsonapi`
        basicAuth: {
          username: process.env.BASIC_AUTH_USERNAME,
          password: process.env.BASIC_AUTH_PASSWORD,
        },
        languageConfig: {
          defaultLanguage: languages.defaultLangKey,
          enabledLanguages: languages.langs,
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
      resolve: `gatsby-source-drupal-menu-links`,
      options: {
        baseUrl: process.env.DRUPAL_BASE_URL,
        apiBase: process.env.DRUPAL_API_BASE,
        basicAuth: {
          username: process.env.BASIC_AUTH_USERNAME,
          password: process.env.BASIC_AUTH_PASSWORD,
        },
        menus: ["main"], // Which menus to fetch, these are the menu IDs.
        languages: languages.langs,
      },
    },
    {
      resolve: "gatsby-plugin-i18n",
      options: {
        langKeyDefault: languages.defaultLangKey,
        langKeyForNull: "any",
        useLangKeyLayout: false,
      },
    },
    `gatsby-plugin-remove-trailing-slashes`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-netlify`, // make sure to keep it last in the array
  ],
}
