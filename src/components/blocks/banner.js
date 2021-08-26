import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Block from "../block"
import Link from "../link"

import * as styles from "../../styles/blocks/banner.module.scss"

const BannerBlock = ({ data }) => {
  const uri = data.field_content_link.uri.replace(/^internal:/, "")

  const media = data.relationships.field_media_image
  const image = getImage(media.relationships?.field_media_image?.localFile)

  // Array of URLs this block is to be displayed on.
  const locations = ["/"]

  return (
    <Block className={styles.block} locations={locations}>
      {image ? (
        <div className={styles.image}>
          <GatsbyImage image={image} alt={media.field_media_image.alt} />
        </div>
      ) : null}
      <div className={styles.content}>
        <div className={styles.contentInner}>
          <h2 className={styles.title}>{data.field_title}</h2>
          <div className={styles.summary}>{data.field_summary}</div>
          <div>
            <Link to={uri} className={styles.button}>
              {data.field_content_link.title}
            </Link>
          </div>
        </div>
      </div>
    </Block>
  )
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
