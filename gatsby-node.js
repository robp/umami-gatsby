/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  return graphql(
    `
      query loadDrupalQuery($limit: Int!) {
        allNodeArticle(limit: $limit) {
          edges {
            node {
              id
              path {
                alias
              }
            }
          }
        }
        allNodeRecipe(limit: $limit) {
          edges {
            node {
              id
              path {
                alias
              }
            }
          }
        }
        allNodePage {
          edges {
            node {
              id
              path {
                alias
              }
            }
          }
        }
        allTaxonomyTermTags {
          edges {
            node {
              id
              path {
                alias
              }
            }
          }
        }
        allTaxonomyTermRecipeCategory {
          edges {
            node {
              id
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

    // Create article pages.
    result.data.allNodeArticle.edges.forEach(edge => {
      createPage({
        path: edge.node.path.alias,
        component: path.resolve("src/templates/article.js"),
        context: {
          nodeId: edge.node.id,
        },
      })
    })

    // Create recipe pages.
    result.data.allNodeRecipe.edges.forEach(edge => {
      createPage({
        path: edge.node.path.alias,
        component: path.resolve("src/templates/recipe.js"),
        context: {
          nodeId: edge.node.id,
        },
      })
    })

    // Create basic pages.
    result.data.allNodePage.edges.forEach(edge => {
      createPage({
        path: edge.node.path.alias,
        component: path.resolve("src/templates/basic-page.js"),
        context: {
          nodeId: edge.node.id,
        },
      })
    })

    // Create tags pages.
    result.data.allTaxonomyTermTags.edges.forEach(edge => {
      createPage({
        path: edge.node.path.alias,
        component: path.resolve("src/templates/tag.js"),
        context: {
          nodeId: edge.node.id,
        },
      })
    })

    // Create recipe category pages.
    result.data.allTaxonomyTermRecipeCategory.edges.forEach(edge => {
      createPage({
        path: edge.node.path.alias,
        component: path.resolve("src/templates/recipe-category.js"),
        context: {
          nodeId: edge.node.id,
        },
      })
    })
  })
}
