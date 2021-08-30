import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import * as styles from "../styles/field.module.scss"

const Field = ({
  html,
  children,
  items,
  element,
  labelItems,
  label,
  labelHidden,
  labelAbove,
  labelInline,
  className,
  labelClassName,
  itemsClassName,
  itemClassName,
  ...rest
}) => {
  const Element = `${element}`

  const props = {
    className: classNames(
      styles.field,
      { [styles.labelItems]: labelItems },
      { [styles.labelAbove]: labelAbove },
      { [styles.labelInline]: labelInline },
      className
    ),
  }

  return html ? (
    <Element {...props} {...rest} dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <Element {...props} {...rest}>
      {label ? (
        <Element
          className={classNames(styles.label, labelClassName, {
            "visually-hidden": labelHidden,
          })}
        >
          {label}
        </Element>
      ) : null}
      {items ? (
        <Element className={classNames(styles.items, itemsClassName)}>
          {items.map((item, index) => {
            return (
              <Element key={`item-${index}`} className={classNames(styles.item, itemClassName)}>
                {item}
              </Element>
            )
          })}
        </Element>
      ) : (
        <Element className={classNames(styles.item, itemClassName)}>
          {children}
        </Element>
      )}
    </Element>
  )
}

Field.propTypes = {
  html: PropTypes.node,
  element: PropTypes.string,
  items: PropTypes.array,
  labelItems: PropTypes.bool,
  label: PropTypes.string,
  item: PropTypes.node,
  labelHidden: PropTypes.bool,
  labelAbove: PropTypes.bool,
  labelInline: PropTypes.bool,
  fieldClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  itemsClassName: PropTypes.string,
  itemClassName: PropTypes.string,
}

Field.defaultProps = {
  element: "div",
  labelItems: false,
  labelHidden: false,
  labelAbove: false,
  labelInline: false,
}

export default Field
