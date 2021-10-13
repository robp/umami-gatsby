import React, { useContext, useEffect } from "react"
import { useTranslation } from "react-i18next"

import { MessagesContext } from "../context/messages-context"
import Block from "../block"
import Message from "../message"

import * as styles from "../../styles/blocks/messages.module.scss"

const MessagesBlock = () => {
  const { t } = useTranslation()
  const { messages, updateMessages } = useContext(MessagesContext)

  /**
   * @todo resolve the build warning produced by not including updateMessages()
   * in the useEffect() dependencies.
   */
  useEffect(() => {
    updateMessages()
  }, [])

  return (
    <Block
      className={styles.block}
      locations={[/.*/]}
      title={t("Messages")}
      titleHidden
    >
      {messages?.map((message, index) => (
        <Message
          key={`message-${index}`}
          severity={message.severity}
          content={message.content}
        />
      ))}
    </Block>
  )
}

export default MessagesBlock
