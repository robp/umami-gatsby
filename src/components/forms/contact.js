import React, { useContext } from "react"
import classNames from "classnames"
import { useI18next } from "gatsby-plugin-react-i18next"
import { navigate } from "gatsby"
import VisuallyHidden from "@reach/visually-hidden"

import { MessagesContext } from "../context/messages-context"
import { MESSAGE_SEVERITY_SUCCESS, MESSAGE_SEVERITY_ERROR } from "../message"

import * as formStyles from "../../styles/form.module.scss"
import * as buttonStyles from "../../styles/buttons.module.scss"
import * as resizeStyles from "../../styles/resize.module.scss"
import * as styles from "../../styles/forms/contact.module.scss"

const ContactForm = () => {
  const { t, language } = useI18next()
  const { addMessage } = useContext(MessagesContext)

  const handleSubmit = e => {
    e.preventDefault()
    let myForm = document.getElementById("contact-message-feedback-form")
    let formData = new FormData(myForm)
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        addMessage({
          severity: MESSAGE_SEVERITY_SUCCESS,
          content: t("Your message has been sent."),
        })
        navigate(`/${language}`)
      })
      .catch(error => {
        addMessage({
          severity: MESSAGE_SEVERITY_ERROR,
          content: error,
        })
        navigate(`/${language}`)
      })
  }

  return (
    <form
      name="contact"
      method="POST"
      id="contact-message-feedback-form"
      acceptCharset="UTF-8"
      className={styles.form}
      onSubmit={handleSubmit}
      data-netlify="true"
      netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" name="netlify-honeypot" value="bot-field" />
      <VisuallyHidden>
        <div className={formStyles.formItem} aria-hidden="true">
          <input
            type="text"
            id="edit-bot-field"
            name="bot-field"
            size="60"
            maxLength="255"
          />
        </div>
      </VisuallyHidden>
      <div className={formStyles.formItem}>
        <label htmlFor="edit-name" className={formStyles.formRequired}>
          {t("Your name")}
        </label>
        <input
          type="text"
          id="edit-name"
          name="name"
          size="60"
          maxLength="255"
          required="required"
          aria-required="true"
        />
      </div>
      <div className={formStyles.formItem}>
        <label htmlFor="edit-mail" className={formStyles.formRequired}>
          {t("Your email address")}
        </label>
        <input
          type="email"
          id="edit-mail"
          name="mail"
          size="60"
          maxLength="254"
          // required="required"
          aria-required="true"
        />
      </div>
      <div id="edit-subject-wrapper">
        {" "}
        <div className={formStyles.formItem}>
          <label
            htmlFor="edit-subject-0-value"
            className={formStyles.formRequired}
          >
            {t("Subject")}
          </label>
          <input
            type="text"
            id="edit-subject-0-value"
            name="subject"
            size="60"
            maxLength="100"
            placeholder=""
            // required="required"
            aria-required="true"
          />
        </div>
      </div>
      <div id="edit-message-wrapper">
        {" "}
        <div className={formStyles.formItem}>
          <label
            htmlFor="edit-message-0-value"
            className={formStyles.formRequired}
          >
            {t("Message")}
          </label>
          <div className={formStyles.formTextareaWrapper}>
            <textarea
              id="edit-message-0-value"
              name="message"
              rows="12"
              cols="60"
              placeholder=""
              // required="required"
              aria-required="true"
              className={resizeStyles.resizeVertical}
            ></textarea>
          </div>
        </div>
      </div>
      <div
        id="edit-actions"
        className={classNames(formStyles.formActions, buttonStyles.formActions)}
      >
        <input
          type="submit"
          name="op"
          value={t("Send message")}
          className={formStyles.button}
        />
      </div>
    </form>
  )
}

export default ContactForm
