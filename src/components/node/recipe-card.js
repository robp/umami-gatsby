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
import * as defaultStyles from "../../styles/card-view.module.scss"

const RecipeCard = ({ node, styles = defaultStyles }) => {
  const { t } = useTranslation()

  const renderedTitle = (
    <Field labelHidden className={styles.fieldTitle}>
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
  const renderedImage = image ? (
    <Field key={`${node.id}-image`} label={t("Image")} labelHidden>
      <GatsbyImage image={image} alt={media.field_media_image.alt} />
    </Field>
  ) : null
  const difficulty = node.field_difficulty ? (
    <Field
      key={`${node.id}-difficulty`}
      labelItems
      labelInline
      label={t("Difficulty")}
      className={styles.labelItems}
    >
      {capitalizeFirstLetter(t(node.field_difficulty))}
    </Field>
  ) : null

  return (
    <Card
      title={renderedTitle}
      link={renderedLink}
      content={[difficulty, renderedImage]}
      styles={styles}
    />
  )
}

RecipeCard.propTypes = {
  node: PropTypes.object.isRequired,
  styles: PropTypes.object,
}

export default RecipeCard

export const RecipeCardFragments = graphql`
  fragment RecipeCard on node__recipe {
    ...CardFragment
    field_difficulty
    ...RecipeCardImage
  }

  fragment RecipeCardSquare on node__recipe {
    ...CardFragment
    ...RecipeCardImageSquare
  }

  fragment RecipeCardHomepage on node__recipe {
    ...CardFragment
    ...RecipeCardImage
  }

  fragment RecipeCardImage on node__recipe {
    relationships {
      field_media_image {
        ...CardImageFragment
      }
    }
  }

  fragment RecipeCardImageSquare on node__recipe {
    relationships {
      field_media_image {
        ...CardImageSquareFragment
      }
    }
  }
`
