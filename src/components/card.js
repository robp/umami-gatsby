import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import classNames from "classnames"

import * as defaultStyles from "../styles/card.module.scss"
import * as nodeStyles from "../styles/node.module.scss"

const Card = ({ title, link, content, styles = defaultStyles, ...rest }) => {
  return (
    <div className={classNames(nodeStyles.node, styles.card)} {...rest}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.link}>{link}</div>
      <div className={styles.content}>{content}</div>
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.node.isRequired,
  link: PropTypes.node.isRequired,
  content: PropTypes.node,
  styles: PropTypes.object,
}

export default Card

export const CardFragments = graphql`
  fragment CardFragment on CardInterface {
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
  }

  fragment CardImageFragment on media__image {
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

  fragment CardImageSquareFragment on media__image {
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
`
