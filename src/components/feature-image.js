import React from "react"
import PropTypes from "prop-types"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { styles } from "../styles/feature-image.module.scss"

function FeatureImage({ media }) {
  if (!media) return null

  const featureImage = getImage(
    media.relationships.field_media_image?.localFile
  )

  if (featureImage) {
    return (
      <div className={styles}>
        <GatsbyImage image={featureImage} alt={media.field_media_image.alt} />
      </div>
    )
  }
  return null
}

FeatureImage.propTypes = {
  media: PropTypes.object.isRequired,
}

export default FeatureImage
