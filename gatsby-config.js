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
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          placeholder: `none`,
        },
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
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
        display: `minimal-ui`,
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
            "block_content--banner_block",
            "block_content--disclaimer_block",
            "block_content--footer_promo_block",
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
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/locales`,
        name: `locale`,
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
        languages: languages.langs,
        defaultLanguage: languages.defaultLangKey,
        generateDefaultLanguagePage: true,
        redirect: true,
        // if you are using Helmet, you must include siteUrl, and make sure you add http:https
        // siteUrl: `https://example.com/`,
        // you can pass any i18next options
        // pass following options to allow message content as a key
        i18nextOptions: {
          debug: process.env.I18NEXT_DEBUG,
          interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
          },
          keySeparator: false,
          nsSeparator: false,
          // detection: {
          //   order: ["path", "htmlTag"],
          // },
        },
        pages: [
          {
            matchPath: "/:lang/:slug+",
            getLanguageFromPath: true,
          },
          {
            matchPath: "/:slug/",
            getLanguageFromPath: false,
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Open Sans:400,400i,700,700i", "Scope One"],
        },
      },
    },
    `gatsby-plugin-remove-trailing-slashes`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-netlify`, // make sure to keep it last in the array
  ],
}
