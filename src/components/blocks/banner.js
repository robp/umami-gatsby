import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Block from "../block"
import Link from "../link"

import * as styles from "../../styles/blocks/banner.module.scss"

const BannerBlock = ({ data }) => {
  const { language } = useI18next()

  const query = useStaticQuery(graphql`
    query {
      allBlockContentBannerBlock {
        edges {
          node {
            ...BannerBlock
          }
        }
      }
    }
  `)

  // Array of URLs this block is to be displayed on.
  const locations = {
    3: [/^\/$/],
    4: [/^\/recipes\/$/],
  }

  const renderData = data => {
    if (data.langcode === language) {
      const uri = data.field_content_link.uri.replace(/^internal:/, "")
      const media = data.relationships.field_media_image
      const image = getImage(media.relationships?.field_media_image?.localFile)

      return (
        <Block
          key={data.id}
          className={styles.block}
          locations={locations[data.drupal_internal__id]}
        >
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
    return null
  }

  // If block data was passed into the component, render it.
  if (data) {
    return renderData(data)
  }

  // Otherwise, render the results of the query.
  return query.allBlockContentBannerBlock.edges?.map(edge => {
    return renderData(edge.node)
  })
}

export default BannerBlock

export const BannerBlockFragments = graphql`
  fragment BannerBlock on block_content__banner_block {
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
`
