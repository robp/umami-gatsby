/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require("path")
const languages = require("./src/data/languages")

const { normalizeString } = require("./src/utils/functions")

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
