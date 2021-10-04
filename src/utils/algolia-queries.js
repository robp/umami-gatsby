const { stripTags } = require("./functions")

const indexName = process.env.GATSBY_ALGOLIA_INDEX_NAME

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
          processed
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
  const instructions = stripTags(field_recipe_instruction.processed)
  return {
    objectID: id,
    ...path,
    ...relationships.uid,
    excerpt: excerpt,
    field_recipe_instruction: instructions,
    ...internal,
    ...rest,
  }
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.nodes.edges.map(pageToAlgoliaRecord),
    indexName,
  },
  {
    query: articleQuery,
    transformer: ({ data }) => data.nodes.edges.map(pageToAlgoliaRecord),
    indexName,
  },
  {
    query: recipeQuery,
    transformer: ({ data }) => data.nodes.edges.map(recipeToAlgoliaRecord),
    indexName,
  },
]

module.exports = queries
