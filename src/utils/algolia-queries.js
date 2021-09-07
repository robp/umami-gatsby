const { stripTags } = require("./functions")

const indexName = process.env.ALGOLIA_INDEX_NAME

const pageQuery = `{
  nodes: allNodePage(filter: { status: { eq: true } }) {
    edges {
      node {
        id
        created
        changed
        langcode
        path {
          alias
        }
        title
        body {
          excerpt: processed
        }
        relationships {
          uid {
            author: display_name
          }
        }
        internal {
          type
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
        created
        changed
        langcode
        path {
          alias
        }
        title
        body {
          processed
        }
        relationships {
          uid {
            author: display_name
          }
        }
        internal {
          type
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
        created
        changed
        langcode
        path {
          alias
        }
        title
        field_summary {
          processed
        }
        field_ingredients
        field_recipe_instruction {
          field_recipe_instruction: processed
        }
        field_difficulty
        field_cooking_time
        field_preparation_time
        relationships {
          uid {
            author: display_name
          }
        }
        internal {
          type
        }
      }
    }
  }
}`

function pageToAlgoliaRecord({
  node: { id, path, relationships, body, internal, ...rest },
}) {
  const excerpt = stripTags(body.processed)
  return {
    objectID: id,
    ...path,
    ...relationships.uid,
    excerpt: excerpt,
    ...internal,
    ...rest,
  }
}

function recipeToAlgoliaRecord({
  node: {
    id,
    path,
    relationships,
    field_summary,
    field_recipe_instruction,
    internal,
    ...rest
  },
}) {
  const excerpt = stripTags(field_summary.processed)
  return {
    objectID: id,
    ...path,
    ...relationships.uid,
    excerpt: excerpt,
    ...field_recipe_instruction,
    ...internal,
    ...rest,
  }
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.nodes.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:30`] },
  },
  {
    query: articleQuery,
    transformer: ({ data }) => data.nodes.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:30`] },
  },
  {
    query: recipeQuery,
    transformer: ({ data }) => data.nodes.edges.map(recipeToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:30`] },
  },
]

module.exports = queries
