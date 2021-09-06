// const escapeStringRegexp = require("escape-string-regexp")

// const pagePath = `content`
const indexName = `Pages`

// const pageQuery = `{
//   pages: allMarkdownRemark(
//     filter: {
//       fileAbsolutePath: { regex: "/${escapeStringRegexp(pagePath)}/" },
//     }
//   ) {
//     edges {
//       node {
//         id
//         frontmatter {
//           title
//         }
//         fields {
//           slug
//         }
//         excerpt(pruneLength: 5000)
//       }
//     }
//   }
// }`

const pageQuery = `{
  nodes: allNodePage(filter: { status: { eq: true } }) {
    edges {
      node {
        id
        changed
        langcode
        path {
          alias
        }
        title
        body {
          excerpt: processed
        }
      }
    }
  }
}`

const articleQuery = `{
  nodes: allNodeArticle(filter: { status: { eq: true } }) {
    edges {
      node {
        id
        changed
        langcode
        path {
          alias
        }
        title
        body {
          excerpt: processed
        }
      }
    }
  }
}`

const recipeQuery = `{
  nodes: allNodeRecipe(filter: { status: { eq: true } }) {
    edges {
      node {
        id
        changed
        langcode
        path {
          alias
        }
        title
        field_summary {
          excerpt: processed
        }
        field_ingredients
        field_recipe_instruction {
          field_recipe_instruction: processed
        }
        field_difficulty
        field_cooking_time
        field_preparation_time
      }
    }
  }
}`

function pageToAlgoliaRecord({ node: { id, path, body, ...rest } }) {
  return {
    objectID: id,
    ...path,
    ...body,
    ...rest,
  }
}

function recipeToAlgoliaRecord({
  node: { id, path, field_summary, field_recipe_instruction, ...rest },
}) {
  return {
    objectID: id,
    ...path,
    ...field_summary,
    ...field_recipe_instruction,
    ...rest,
  }
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.nodes.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
  {
    query: articleQuery,
    transformer: ({ data }) => data.nodes.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
  {
    query: recipeQuery,
    transformer: ({ data }) => data.nodes.edges.map(recipeToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
]

module.exports = queries
