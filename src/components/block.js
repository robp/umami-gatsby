import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { useI18next } from "gatsby-plugin-react-i18next"

import { styles } from "../styles/block.module.scss"

const Block = ({
  children,
  element,
  title,
  titleClassName,
  className,
  locations,
  ...rest
}) => {
  const { originalPath } = useI18next()

  // Display the block if no locations are provided, or if the current
  // originalPath matches one of the locations provided.
  const display =
    locations &&
    (locations.indexOf("*") !== -1 || locations.indexOf(originalPath) !== -1)

  const Element = `${element}`

  return display ? (
    <Element className={classNames(styles, className)} {...rest}>
      {title ? (
        <div className={titleClassName}>
          <h2>{title}</h2>
        </div>
      ) : null}
      {children}
    </Element>
  ) : null
}

Block.propTypes = {
  children: PropTypes.node.isRequired,
  element: PropTypes.string,
  title: PropTypes.string,
  titleClassName: PropTypes.string,
  className: PropTypes.string,
  locations: PropTypes.array,
}

Block.defaultProps = {
  element: "div",
}

export default Block
