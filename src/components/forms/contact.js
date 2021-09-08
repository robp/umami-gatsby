import React, { useContext } from "react"
import classNames from "classnames"
import { useTranslation } from "react-i18next"
// import { navigate } from "@reach/router"

import { MessagesContext } from "../context/messages-context"
import { MESSAGE_SEVERITY_STATUS } from "../message"

import * as formStyles from "../../styles/form.module.scss"
import * as buttonStyles from "../../styles/buttons.module.scss"
import * as resizeStyles from "../../styles/resize.module.scss"
import * as styles from "../../styles/forms/contact.module.scss"

const ContactForm = () => {
  const { t } = useTranslation()
  const { messages, updateMessages } = useContext(MessagesContext)

  const handleSubmit = e => {
    e.preventDefault()
    let myForm = document.getElementById("contact-message-feedback-form")
    let formData = new FormData(myForm)
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
      // method: "GET",
    })
      .then(() => {
        console.log("Form successfully submitted")
        updateMessages([
          {
            severity: MESSAGE_SEVERITY_STATUS,
            content: "Form successfully submitted",
          },
        ])
        // navigate("/en/")
      })
      .catch(error => alert(error))
  }

  return (
    <form
      name="contact"
      method="POST"
      id="contact-message-feedback-form"
      acceptCharset="UTF-8"
      className={styles.form}
      data-netlify="true"
      onSubmit={handleSubmit}
    >
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
          required="required"
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
            required="required"
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
              required="required"
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
          id="edit-submit"
          name="op"
          value={t("Send message")}
          className={formStyles.button}
        />
      </div>
    </form>
  )
}

export default ContactForm
