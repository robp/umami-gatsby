import { graphql } from "gatsby"

export const CardImageFragment = graphql`
  fragment RecipeCardImage on node__recipe {
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
    }
  }

  fragment RecipeCardImageSquare on node__recipe {
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

  fragment ArticleCardImage on node__article {
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
    }
  }
`
