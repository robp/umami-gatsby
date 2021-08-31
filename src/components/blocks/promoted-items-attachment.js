import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"

import RecipeCard from "../node/recipe-card"

import * as styles from "../../styles/blocks/promoted-items-attachment.module.scss"
import * as cardStyles from "../../styles/card-alt.module.scss"

const PromotedItemsAttachment = () => {
  const { language } = useI18next()
  const query = useStaticQuery(graphql`
    query {
      allNodeRecipe(
        filter: { promote: { eq: true } }
        sort: { fields: created, order: ASC }
      ) {
        edges {
          node {
            ...RecipeCardSquare
          }
        }
      }
    }
  `)

  let nodes = []

  for (const [, edge] of query.allNodeRecipe.edges.entries()) {
    if (edge.node.langcode === language) {
      nodes.push(edge.node)
      // Only save two nodes.
      if (nodes.length === 2) {
        break
      }
    }
  }

  return (
    <div className={styles.attachment}>
      <ul className={styles.list}>
        {nodes.map(node => {
          return (
            <li key={node.id}>
              <RecipeCard node={node} styles={cardStyles} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default PromotedItemsAttachment
