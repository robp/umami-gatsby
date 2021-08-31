import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"

import Block from "../block"
import RecipeCard from "../node/recipe-card"

import * as styles from "../../styles/blocks/frontpage.module.scss"
import * as layoutStyles from "../../styles/layout.module.scss"
import * as cardStyles from "../../styles/card.module.scss"

const FrontpageBlock = () => {
  const { t, language } = useI18next()

  const query = useStaticQuery(graphql`
    query {
      allNodeRecipe(
        filter: { promote: { eq: true } }
        sort: { fields: [sticky, created], order: [DESC, DESC] }
      ) {
        edges {
          node {
            ...RecipeCardHomepage
          }
        }
      }
    }
  `)

  let nodes = []

  for (const [, edge] of query.allNodeRecipe.edges.entries()) {
    if (edge.node.langcode === language) {
      nodes.push(edge.node)
      // Only save four nodes.
      if (nodes.length === 4) {
        break
      }
    }
  }

  return (
    <div>
      <Block
        title={t(
          "Explore recipes across every type of occasion, ingredient, and skill level"
        )}
        titleClassName={styles.blockTitle}
        className={layoutStyles.grid2}
        locations={[/^\/$/]}
      >
        <ul className={layoutStyles.list}>
          {nodes.map(node => {
            return (
              <li key={node.id} className={layoutStyles.item}>
                <RecipeCard node={node} styles={cardStyles} />
              </li>
            )
          })}
        </ul>
      </Block>
    </div>
  )
}

export default FrontpageBlock
