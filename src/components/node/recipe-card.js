import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useTranslation } from "react-i18next"

import { normalizeString, capitalizeFirstLetter } from "../../utils/functions"

import Card from "../card"
import Link from "../link"
import Field from "../field"

import * as readMoreStyles from "../../styles/read-more.module.scss"
import * as cardStyles from "../../styles/card-view.module.scss"

const RecipeCard = ({ node }) => {
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
      {t("View recipe")}
    </Link>
  )
  const media = node.relationships.field_media_image
  const image = getImage(media.relationships?.field_media_image?.localFile)
  const renderedImage = (
    <Field key={`${node.id}-image`} label={t("Image")} labelHidden>
      <GatsbyImage image={image} alt={media.field_media_image.alt} />
    </Field>
  )
  const difficulty = (
    <Field
      key={`${node.id}-difficulty`}
      labelItems
      labelInline
      label={t("Difficulty")}
      className={cardStyles.labelItems}
    >
      {capitalizeFirstLetter(t(node.field_difficulty))}
    </Field>
  )

  return (
    <Card
      title={renderedTitle}
      link={renderedLink}
      content={[difficulty, renderedImage]}
      styles={cardStyles}
    />
  )
}

RecipeCard.propTypes = {
  node: PropTypes.object.isRequired,
}

export default RecipeCard

export const RecipeCardFragments = graphql`
  fragment RecipeCard on node__recipe {
    langcode
    id
    created
    path {
      alias
    }
    title
    field_difficulty
    internal {
      type
    }
    ...RecipeCardImage
  }

  fragment RecipeCardSquare on node__recipe {
    langcode
    id
    path {
      alias
    }
    title
    field_difficulty
    ...RecipeCardImageSquare
  }

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
`
