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
  locationsExcept,
  ...rest
}) => {
  const { originalPath } = useI18next()

  // Display the block if the wildcard is provided, or if the current
  // originalPath matches one of the locations provided.
  let display = false

  locations.forEach(pattern => {
    if (originalPath.match(pattern)) {
      display = true
    }
  })

  // Don't display the block if the path is in the locationsExcept array.
  locationsExcept.forEach(pattern => {
    if (originalPath.match(pattern)) {
      display = false
    }
  })

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
  children: PropTypes.node,
  element: PropTypes.string,
  title: PropTypes.string,
  titleClassName: PropTypes.string,
  className: PropTypes.string,
  locations: PropTypes.array.isRequired,
  locationsExcept: PropTypes.array,
}

Block.defaultProps = {
  element: "div",
  locationsExcept: [],
}

export default Block
