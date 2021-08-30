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
  labelInline,
  className,
  labelClassName,
  itemClassName,
  ...rest
}) => {
  const Element = `${element}`

  return html ? (
    <Element
      className={classNames(
        styles.field,
        { [styles.labelItems]: labelItems },
        { [styles.labelInline]: labelInline },
        className
      )}
      {...rest}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  ) : (
    <Element
      className={classNames(
        styles.field,
        { [styles.labelItems]: labelItems },
        { [styles.labelInline]: labelInline },
        className
      )}
      {...rest}
    >
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
        <Element className={classNames(styles.items, itemClassName)}>
          {items.map((item, index) => {
            return (
              <Element key={`item-${index}`} className={styles.item}>
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
  labelInline: PropTypes.bool,
  fieldClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  itemClassName: PropTypes.string,
}

Field.defaultProps = {
  element: "div",
  labelItems: false,
  labelHidden: false,
  labelInline: false,
}

export default Field
