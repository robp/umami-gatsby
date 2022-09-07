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
import * as defaultStyles from "../../styles/card-view.module.scss"

const ArticleCard = ({ node, styles = defaultStyles }) => {
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
      {t("View article")}
    </Link>
  )
  const media = node.relationships.field_media_image
  const image = getImage(media.relationships?.field_media_image?.localFile)
  const renderedImage = image ? (
    <GatsbyImage image={image} alt={media.field_media_image.alt} />
  ) : null

  return (
    <Card
      title={renderedTitle}
      link={renderedLink}
      content={renderedImage}
      styles={styles}
    />
  )
}

ArticleCard.propTypes = {
  node: PropTypes.object.isRequired,
  styles: PropTypes.object,
}

export default ArticleCard

export const ArticleCardFragments = graphql`
  fragment ArticleCard on node__article {
    ...CardFragment
    relationships {
      field_media_image {
        ...CardImageFragment
      }
    }
  }
`
