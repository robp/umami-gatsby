/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require("path")
const languages = require("./src/data/languages")

const { normalizeString } = require("./src/utils/functions")

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    interface TaxonomyTermInterface implements Node {
      id: ID!
      drupal_id: String!
      drupal_internal__tid: Int!
      langcode: String!
      path: Path
      name: String!
      description: LongText
      status: Boolean!
      weight: Int!
    }

    interface ContentInterface implements Node {
      id: ID!
      changed: Date! @dateformat
      created: Date! @dateformat
      drupal_id: String!
      drupal_internal__nid: Int!
      langcode: String!
      path: Path
      promote: Boolean!
      status: Boolean!
      sticky: Boolean!
      title: String!
    }

    interface CardInterface implements Node {
      id: ID!
      langcode: String!
      created: Date! @dateformat
      path: Path
      title: String!
    }

    interface LongTextInterface {
      format: String
      processed: String
      value: String
    }

    type LongText implements LongTextInterface @dontInfer {
      format: String
      processed: String
      value: String
    }

    type LongTextWithSummary implements LongTextInterface @dontInfer {
      format: String
      processed: String
      summary: String
      value: String
    }

    type Image @dontInfer {
      alt: String
      height: Int
      width: Int
    }

    type Path @dontInfer {
      alias: String
      langcode: String
      pid: Int
    }

    type user__user implements Node @dontInfer {
      drupal_id: String!
      display_name: String!
    }

    type media__image implements Node @dontInfer {
      drupal_id: String!
      name: String
      langcode: String!
      field_media_image: Image
      relationships: media__imageRelationships
    }
    type media__imageRelationships implements Node @dontInfer {
      field_media_image: file__file @link(from: "field_media_image___NODE")
    }

    type node__article implements Node & ContentInterface & CardInterface @dontInfer {
      changed: Date! @dateformat
      created: Date! @dateformat
      drupal_id: String!
      drupal_internal__nid: Int!
      langcode: String!
      path: Path
      title: String!
      body: LongTextWithSummary
      promote: Boolean!
      status: Boolean!
      sticky: Boolean!
      relationships: node__articleRelationships
    }
    type node__articleRelationships implements Node @dontInfer {
      field_media_image: media__image @link(from: "field_media_image___NODE")
      field_tags: [taxonomy_term__tags] @link(from: "field_tags___NODE")
      uid: user__user @link(from: "uid___NODE")
    }

    type node__page implements Node & ContentInterface @dontInfer {
      changed: Date! @dateformat
      created: Date! @dateformat
      drupal_id: String!
      drupal_internal__nid: Int!
      langcode: String!
      path: Path
      title: String!
      body: LongTextWithSummary
      promote: Boolean!
      status: Boolean!
      sticky: Boolean!
      relationships: node__pageRelationships
    }
    type node__pageRelationships implements Node @dontInfer {
      uid: user__user @link(from: "uid___NODE")
    }

    type node__recipe implements Node & ContentInterface & CardInterface @dontInfer {
      changed: Date! @dateformat
      created: Date! @dateformat
      drupal_id: String!
      drupal_internal__nid: Int!
      langcode: String!
      path: Path
      promote: Boolean!
      status: Boolean!
      sticky: Boolean!
      title: String!
      field_cooking_time: Int
      field_difficulty: String
      field_ingredients: [String]
      field_number_of_servings: Int
      field_preparation_time: Int
      field_recipe_instruction: LongText
      field_summary: LongText
      relationships: node__recipeRelationships
    }
    type node__recipeRelationships implements Node @dontInfer {
      field_media_image: media__image @link(from: "field_media_image___NODE")
      field_recipe_category: [taxonomy_term__recipe_category] @link(from: "field_recipe_category___NODE")
      field_tags: [taxonomy_term__tags] @link(from: "field_tags___NODE")
      uid: user__user @link(from: "uid___NODE")
    }

    type taxonomy_term__recipe_category implements Node & TaxonomyTermInterface @dontInfer {
      drupal_id: String!
      drupal_internal__tid: Int!
      langcode: String!
      path: Path
      name: String!
      description: LongText
      status: Boolean!
      weight: Int!
      relationships: taxonomy_term__recipeCategoryRelationships
    }
    type taxonomy_term__recipeCategoryRelationships implements Node @dontInfer {
      node__recipe: [node__recipe] @link(from: "node__recipe___NODE")
    }

    type taxonomy_term__tags implements Node & TaxonomyTermInterface @dontInfer {
      drupal_id: String!
      drupal_internal__tid: Int!
      langcode: String!
      path: Path
      name: String!
      description: LongText
      status: Boolean!
      weight: Int!
      relationships: taxonomy_term__tagsRelationships
    }
    type taxonomy_term__tagsRelationships implements Node @dontInfer {
      node__article: [node__article] @link(from: "node__article___NODE")
      node__page: [node__page] @link(from: "node__page___NODE")
      node__recipe: [node__recipe] @link(from: "node__recipe___NODE")
    }
  `
  createTypes(typeDefs)
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  const createPath = node => {
    return `/${node.langcode}${normalizeString(node.path.alias)}`
  }

  // const languages = [`en`, `es`]

  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  return graphql(
    `
      query loadDataQuery($limit: Int!) {
        # allNodeTypeNodeType {
        #   edges {
        #     node {
        #       id
        #       drupal_internal__type
        #     }
        #   }
        # }
        allNodeArticle(filter: { status: { eq: true } }, limit: $limit) {
          edges {
            node {
              langcode
              id
              drupal_internal__nid
              path {
                alias
              }
              promote
              sticky
              created
            }
          }
        }
        allNodeRecipe(filter: { status: { eq: true } }, limit: $limit) {
          edges {
            node {
              langcode
              id
              drupal_internal__nid
              path {
                alias
              }
              promote
              sticky
              created
            }
          }
        }
        allNodePage(filter: { status: { eq: true } }, limit: $limit) {
          edges {
            node {
              langcode
              id
              drupal_internal__nid
              path {
                alias
              }
              promote
              sticky
              created
            }
          }
        }
        allTaxonomyTermTags(limit: $limit) {
          edges {
            node {
              langcode
              id
              drupal_internal__tid
              path {
                alias
              }
            }
          }
        }
        allTaxonomyTermRecipeCategory(limit: $limit) {
          edges {
            node {
              langcode
              id
              drupal_internal__tid
              path {
                alias
              }
            }
          }
        }
      }
    `,
    { limit: 1000 }
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create node type pages.
    // result.data.allNodeTypeNodeType.edges.forEach(edge => {
    //   languages.map(langcode => {
    //     createPage({
    //       path: `/${langcode}/${edge.node.drupal_internal__type}`,
    //       component: path.resolve("src/templates/node-type.js"),
    //       context: {
    //         nodeId: edge.node.id,
    //         langcode: `${langcode}`,
    //         nodeType: `node__${edge.node.drupal_internal__type}`,
    //       },
    //     })
    //   })
    // })

    // Create article pages.
    result.data.allNodeArticle.edges.forEach(edge => {
      createPage({
        path: createPath(edge.node),
        component: path.resolve("src/templates/article.js"),
        context: {
          nodeId: edge.node.id,
          internalNid: edge.node.drupal_internal__nid,
        },
      })
    })

    // Create recipe pages.
    result.data.allNodeRecipe.edges.forEach(edge => {
      createPage({
        path: createPath(edge.node),
        component: path.resolve("src/templates/recipe.js"),
        context: {
          nodeId: edge.node.id,
          internalNid: edge.node.drupal_internal__nid,
        },
      })
    })

    // Create basic pages.
    result.data.allNodePage.edges.forEach(edge => {
      createPage({
        path: createPath(edge.node),
        component: path.resolve("src/templates/basic-page.js"),
        context: {
          nodeId: edge.node.id,
          internalNid: edge.node.drupal_internal__nid,
        },
      })
    })

    // Create tags pages.
    result.data.allTaxonomyTermTags.edges.forEach(edge => {
      createPage({
        path: createPath(edge.node),
        component: path.resolve("src/templates/tag.js"),
        context: {
          nodeId: edge.node.id,
          internalTid: edge.node.drupal_internal__tid,
        },
      })
    })

    // Create recipe category pages.
    result.data.allTaxonomyTermRecipeCategory.edges.forEach(edge => {
      createPage({
        path: createPath(edge.node),
        component: path.resolve("src/templates/recipe-category.js"),
        context: {
          nodeId: edge.node.id,
          internalTid: edge.node.drupal_internal__tid,
        },
      })
    })

    // Create redirects for `/` based on browser language, plus a fallback.
    languages.langs.map(langcode => {
      createRedirect({
        fromPath: `/`,
        toPath: `/${langcode}`,
        Language: langcode,
        isPermanent: true,
      })
    })
    createRedirect({
      fromPath: `/`,
      toPath: `/${languages.defaultLangKey}`,
      isPermanent: true,
    })
  })
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  // Gatsby/i18next doesn't set page.matchPath correctly for client-only routes
  // with locales, so we have to add the locale here.
  if (page.path.match(/^\/.+\/user\//) && page.matchPath.match(/^\/user\//)) {
    const oldPage = Object.assign({}, page)
    deletePage(oldPage)
    page.matchPath = `/${page.context.language}/user/*`
    createPage(page)
  }
}
