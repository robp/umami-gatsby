import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"

import { normalizeString } from "../../utils/functions"

import Link from "../link"
import Block from "../block"

import { container } from "../../styles/layout.module.scss"
import * as styles from "../../styles/blocks/recipe-collections.module.scss"

const RecipeCollectionsBlock = () => {
  const { t, language } = useI18next()

  const query = useStaticQuery(graphql`
    query {
      allTaxonomyTermTags(sort: { fields: weight }) {
        edges {
          node {
            id
            name
            path {
              alias
            }
            langcode
          }
        }
      }
    }
  `)

  let terms = []

  query.allTaxonomyTermTags.edges.forEach(edge => {
    if (edge.node.langcode === language) {
      terms.push(edge.node)
    }
  })

  return (
    <Block title={t("Recipe collections")} className={styles.block}>
      <div className={container}>
        <ul className={styles.list}>
          {terms.map(node => {
            return (
              <li key={node.id}>
                <Link to={`/${node.langcode}${normalizeString(node.path.alias)}`} className={styles.link}>
                  {node.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </Block>
  )
}

export default RecipeCollectionsBlock
