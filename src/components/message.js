import React from "react"
import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"
import classNames from "classnames"

import { VisuallyHidden } from "@reach/visually-hidden"
import { capitalizeFirstLetter } from "../utils/functions"

import * as layoutStyles from "../styles/layout.module.scss"
import * as styles from "../styles/message.module.scss"

export const MESSAGE_SEVERITY_NOTICE = "notice"
export const MESSAGE_SEVERITY_SUCCESS = "success"
export const MESSAGE_SEVERITY_WARNING = "warning"
export const MESSAGE_SEVERITY_ERROR = "error"

const Message = ({ severity, content }) => {
  const { t } = useTranslation()

  return (
    <div
      role="contentinfo"
      aria-label="Status message"
      className={classNames(styles.message, styles[severity])}
    >
      <div className={classNames(styles.content, layoutStyles.container)}>
        <VisuallyHidden>
          <h2>
            {capitalizeFirstLetter(severity)} {t("message")}
          </h2>
        </VisuallyHidden>
        <span
          className={styles.item}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  )
}

Message.propTypes = {
  severity: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}

export default Message
