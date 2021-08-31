import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useTranslation } from "gatsby-plugin-react-i18next"

import { normalizeString } from "../../utils/functions"

import Card from "../card"
import Link from "../link"
import Field from "../field"

import * as readMoreStyles from "../../styles/read-more.module.scss"
import * as cardStyles from "../../styles/card-view.module.scss"

const ArticleCard = ({ node }) => {
  const { t } = useTranslation()

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
  const image = getImage(media.relationships?.field_media_image?.localFile)
  const renderedImage = (
    <GatsbyImage image={image} alt={media.field_media_image.alt} />
  )

  return (
    <Card
      title={renderedTitle}
      link={renderedLink}
      content={renderedImage}
      styles={cardStyles}
    />
  )
}

ArticleCard.propTypes = {
  node: PropTypes.object.isRequired,
}

export default ArticleCard

export const ArticleCardFragments = graphql`
  fragment ArticleCard on node__article {
    langcode
    id
    created
    path {
      alias
    }
    title
    internal {
      type
    }
    ...ArticleCardImage
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
