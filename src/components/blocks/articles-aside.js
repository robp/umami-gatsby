import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"
import classNames from "classnames"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { normalizeString } from "../../utils/functions"

import Field from "../field"
import Block from "../block"
import Card from "../card"
import Link from "../link"

import { container } from "../../styles/layout.module.scss"
import * as styles from "../../styles/blocks/articles-aside.module.scss"
import * as readMoreStyles from "../../styles/read-more.module.scss"
import * as cardStyles from "../../styles/card-view.module.scss"

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
    if (edge.node.langcode === language && edge.node.path.alias !== originalPath) {
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
            const renderedTitle = (
              <Field labelHidden className={cardStyles.fieldTitle}>
                {node.title}
              </Field>
            )

            const renderedLink = (
              <Link
                to={`/${node.langcode}${normalizeString(node.path.alias)}`}
                className={readMoreStyles.link}
              >
                {t("View article")}
              </Link>
            )
            const media = node.relationships.field_media_image
            const image = getImage(
              media.relationships?.field_media_image?.localFile
            )
            const renderedImage = (
              <GatsbyImage image={image} alt={media.field_media_image.alt} />
            )

            return (
              <li key={node.id}>
                <Card
                  title={renderedTitle}
                  link={renderedLink}
                  content={renderedImage}
                  styles={cardStyles}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </Block>
  )
}

export default ArticlesAsideBlock
