import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"
import classNames from "classnames"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { normalizeString } from "../../utils/functions"

import Block from "../block"
import Card from "../card"
import Link from "../link"
import PromotedItemsAttachment from "./promoted-items-attachment"

import { container } from "../../styles/layout.module.scss"
import * as styles from "../../styles/blocks/promoted-items.module.scss"
import * as readMoreStyles from "../../styles/read-more.module.scss"
import * as cardStyles from "../../styles/card-common.module.scss"

const PromotedItemsBlock = () => {
  const { t, language } = useI18next()

  const query = useStaticQuery(graphql`
    query {
      allNodeArticle(
        filter: { promote: { eq: true } }
        sort: { fields: created, order: DESC }
      ) {
        edges {
          node {
            langcode
            id
            drupal_internal__nid
            path {
              alias
            }
            title
            body {
              processed
            }
            relationships {
              field_media_image {
                relationships {
                  field_media_image {
                    localFile {
                      childImageSharp {
                        gatsbyImageData(
                          width: 1536
                          aspectRatio: 1.5
                          transformOptions: { cropFocus: CENTER }
                          placeholder: BLURRED
                          formats: [AUTO, WEBP, AVIF]
                        )
                      }
                    }
                  }
                }
                field_media_image {
                  alt
                }
              }
              field_tags {
                id
                name
                path {
                  alias
                }
              }
            }
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
    <Block className={classNames(container, styles.block)} locations={["/"]}>
      <div className={classNames(container, styles.container)}>
        <ul className={styles.list}>
          {nodes.map(node => {
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
                  title={node.title}
                  link={renderedLink}
                  linkClassName={cardStyles.link}
                  image={renderedImage}
                />
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
