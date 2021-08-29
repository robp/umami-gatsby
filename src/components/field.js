import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import * as styles from "../styles/field.module.scss"

const Field = ({
  labelItems,
  label,
  item,
  labelHidden,
  labelInline,
  className,
  labelClassName,
  itemClassName,
  ...rest
}) => {
  return (
    <div
      className={classNames(
        styles.field,
        { [styles.labelItems]: labelItems },
        { [styles.labelInline]: labelInline },
        className
      )}
      {...rest}
    >
      {label ? (
        <div
          className={classNames(styles.label, labelClassName, {
            "visually-hidden": labelHidden,
          })}
        >
          {label}
        </div>
      ) : null}
      <div className={classNames(styles.item, itemClassName)}>{item}</div>
    </div>
  )
}

Field.propTypes = {
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
  labelItems: false,
  labelHidden: false,
  labelInline: false,
}

export default Field
