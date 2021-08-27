import React from "react"
import PropTypes from "prop-types"
import { useI18next } from "gatsby-plugin-react-i18next"
import { normalizeString } from "../utils/functions"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import classNames from "classnames"

import Link from "./link"

import * as styles from "../styles/card.module.scss"
import * as nodeStyles from "../styles/node.module.scss"
import * as readMoreStyles from "../styles/read-more.module.scss"

const Card = ({ data }) => {
  const { t } = useI18next()

  const media = data.relationships.field_media_image
  const image = getImage(media.relationships?.field_media_image?.localFile)

  return (
    <div className={classNames(nodeStyles.node, styles.card)}>
      <h2 className={styles.title}>{data.title}</h2>
      <div className={styles.readMore}>
        <Link
          to={`/${data.langcode}${normalizeString(data.path.alias)}`}
          className={readMoreStyles.link}
        >
          View Article
        </Link>
      </div>
      <div className={styles.image}>
        <GatsbyImage image={image} alt={media.field_media_image.alt} />
      </div>
    </div>
  )
}

Card.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Card
