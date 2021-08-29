import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { normalizeString } from "../../utils/functions"

import Card from "../card"
import Link from "../link"

import * as styles from "../../styles/blocks/promoted-items-attachment.module.scss"
import * as readMoreStyles from "../../styles/read-more.module.scss"
import * as cardStyles from "../../styles/card-alt.module.scss"

const PromotedItemsAttachment = () => {
  const { t, language } = useI18next()
  const query = useStaticQuery(graphql`
    query {
      allNodeRecipe(
        filter: { promote: { eq: true } }
        sort: { fields: created, order: ASC }
      ) {
        edges {
          node {
            langcode
            id
            path {
              alias
            }
            title
            relationships {
              field_media_image {
                relationships {
                  field_media_image {
                    localFile {
                      childImageSharp {
                        gatsbyImageData(
                          width: 900
                          aspectRatio: 1
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
            }
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
          const renderedLink = (
            <Link
              to={`/${node.langcode}${normalizeString(node.path.alias)}`}
              className={readMoreStyles.link}
            >
              {t("View recipe")}
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
                content={renderedImage}
                styles={cardStyles}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default PromotedItemsAttachment
