import { graphql } from "gatsby"

export const ArticleFragments = graphql`
  fragment ArticleCard on node__article {
    langcode
    id
    path {
      alias
    }
    title
    ...ArticleCardImage
  }

  fragment ArticleNode on node__article {
    langcode
    id
    drupal_internal__nid
    created
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
                  width: 960
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
      uid {
        display_name
      }
    }
  }
`
