import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import * as defaultStyles from "../styles/card.module.scss"
import * as nodeStyles from "../styles/node.module.scss"

const Card = ({ title, link, content, styles, ...rest }) => {
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

Card.defaultProps = {
  styles: defaultStyles,
}

export default Card
