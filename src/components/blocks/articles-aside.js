import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"
import classNames from "classnames"

import Block from "../block"
import ArticleCard from "../node/article-card"

import { container } from "../../styles/layout.module.scss"
import * as styles from "../../styles/blocks/articles-aside.module.scss"

const ArticlesAsideBlock = () => {
  const { t, language, originalPath } = useI18next()

  const query = useStaticQuery(graphql`
    query {
      allNodeArticle(
        sort: { fields: [created, drupal_internal__nid], order: [DESC, ASC] }
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
    if (
      edge.node.langcode === language &&
      edge.node.path.alias !== originalPath
    ) {
      nodes.push(edge.node)
      // Only save three nodes.
      if (nodes.length === 3) {
        break
      }
    }
  }

  return (
    <Block
      title={t("More featured articles")}
      titleClassName={styles.blockTitle}
      className={classNames(container, styles.block)}
      locations={[/^\/articles\/.+/]}
    >
      <div className={classNames(container, styles.container)}>
        <ul className={styles.list}>
          {nodes.map(node => {
            return (
              <li key={node.id}>
                <ArticleCard node={node} />
              </li>
            )
          })}
        </ul>
      </div>
    </Block>
  )
}

export default ArticlesAsideBlock
