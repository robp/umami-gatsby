import React from "react"
import PropTypes from "prop-types"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { styles } from "../styles/media-image.module.scss"

function MediaImage({ media, ...rest }) {
  if (!media) return null

  const theImage = getImage(
    media.relationships.field_media_image?.localFile
  )

  if (theImage) {
    return (
      <div className={styles}>
        <GatsbyImage
          image={theImage}
          alt={media.field_media_image.alt}
          {...rest}
        />
      </div>
    )
  }
  return null
}

MediaImage.propTypes = {
  media: PropTypes.object.isRequired,
}

export default MediaImage
