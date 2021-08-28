import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import * as styles from "../styles/card.module.scss"
import * as nodeStyles from "../styles/node.module.scss"

const Card = ({ title, titleClassName, link, linkClassName, image, imageClassName }) => {
  return (
    <div className={classNames(nodeStyles.node, styles.card)}>
      <h2 className={classNames(styles.title, titleClassName)}>{title}</h2>
      <div className={classNames(styles.link, linkClassName)}>{link}</div>
      <div className={classNames(styles.image, imageClassName)}>{image}</div>
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  titleClassName: PropTypes.string,
  link: PropTypes.node.isRequired,
  linkClassName: PropTypes.string,
  image: PropTypes.node.isRequired,
  imageClassName: PropTypes.string,
  layout: PropTypes.string,
}

export default Card
