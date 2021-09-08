import React, { useContext } from "react"
import { useTranslation } from "react-i18next"

import { MessagesContext } from "../context/messages-context"
import Block from "../block"
import Message from "../message"

import * as styles from "../../styles/blocks/messages.module.scss"

const MessagesBlock = () => {
  const { t } = useTranslation()
  const { messages } = useContext(MessagesContext)

  return (
    <Block
      className={styles.block}
      locations={[/.*/]}
      title={t("Messages")}
      titleHidden
    >
      {messages?.map(message => (
        <Message severity={message.severity} content={message.content} />
      ))}
    </Block>
  )
}

export default MessagesBlock
