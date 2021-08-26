import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Block from "../block"
import Link from "../link"

import * as styles from "../../styles/blocks/banner.module.scss"

const BannerBlock = () => {
  const { language } = useI18next()

  const query = useStaticQuery(graphql`
    query {
      allBlockContentBannerBlock {
        edges {
          node {
            id
            drupal_internal__id
            langcode
            status
            info
            field_summary
            field_title
            field_content_link {
              title
              uri
            }
            relationships {
              field_media_image {
                field_media_image {
                  alt
                }
                relationships {
                  field_media_image {
                    localFile {
                      childImageSharp {
                        gatsbyImageData(
                          layout: FULL_WIDTH
                          aspectRatio: 1.8519
                          transformOptions: { cropFocus: CENTER }
                          placeholder: BLURRED
                          formats: [AUTO, WEBP, AVIF]
                        )
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  // Array of URLs this block is to be displayed on.
  const locations = {
    3: ["/"],
  }

  return query.allBlockContentBannerBlock.edges?.map(edge => {
    if (edge.node.langcode === language) {
      const uri = edge.node.field_content_link.uri.replace(/^internal:/, "")
      const media = edge.node.relationships.field_media_image
      const image = getImage(media.relationships?.field_media_image?.localFile)

      return (
        <Block
          className={styles.block}
          locations={locations[edge.node.drupal_internal__id]}
        >
          {image ? (
            <div className={styles.image}>
              <GatsbyImage image={image} alt={media.field_media_image.alt} />
            </div>
          ) : null}
          <div className={styles.content}>
            <div className={styles.contentInner}>
              <h2 className={styles.title}>{edge.node.field_title}</h2>
              <div className={styles.summary}>{edge.node.field_summary}</div>
              <div>
                <Link to={uri} className={styles.button}>
                  {edge.node.field_content_link.title}
                </Link>
              </div>
            </div>
          </div>
        </Block>
      )
    }
    return null
  })
}

export default BannerBlock

export const BannerBlockQuery = graphql`
  fragment BannerBlockQuery on block_content__banner_block {
    id
    langcode
    status
    info
    field_summary
    field_title
    field_content_link {
      title
      uri
    }
    relationships {
      field_media_image {
        field_media_image {
          alt
        }
        relationships {
          field_media_image {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  layout: FULL_WIDTH
                  aspectRatio: 1.8519
                  transformOptions: { cropFocus: CENTER }
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
      }
    }
  }
`