import { graphql } from "gatsby"

export const FooterPromoBlockFragments = graphql`
  fragment FooterPromoBlock on block_content__footer_promo_block {
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
                  width: 266
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
