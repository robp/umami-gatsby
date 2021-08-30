import { graphql } from "gatsby"

export const BannerBlockFragment = graphql`
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
