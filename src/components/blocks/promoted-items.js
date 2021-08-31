import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"
import classNames from "classnames"

import Block from "../block"
import ArticleCard from "../node/article-card"
import PromotedItemsAttachment from "./promoted-items-attachment"

import { container } from "../../styles/layout.module.scss"
import * as styles from "../../styles/blocks/promoted-items.module.scss"
import * as cardStyles from "../../styles/card.module.scss"

const PromotedItemsBlock = () => {
  const { language } = useI18next()

  const query = useStaticQuery(graphql`
    query {
      allNodeArticle(
        filter: { promote: { eq: true } }
        sort: { fields: created, order: DESC }
      ) {
        edges {
          node {
            ...ArticleCard
          }
        }
      }
    }
  `)

  let nodes = []

  for (const [, edge] of query.allNodeArticle.edges.entries()) {
    if (edge.node.langcode === language) {
      nodes.push(edge.node)
      // Only save the first node.
      break
    }
  }

  return (
    <Block className={classNames(container, styles.block)} locations={[/^\/$/]}>
      <div className={classNames(container, styles.container)}>
        <ul className={styles.list}>
          {nodes.map(node => {
            return (
              <li key={node.id}>
                <ArticleCard node={node} styles={cardStyles} />
              </li>
            )
          })}
        </ul>
        <PromotedItemsAttachment />
      </div>
    </Block>
  )
}

export default PromotedItemsBlock
