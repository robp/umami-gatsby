import React, { useContext } from "react"
import classNames from "classnames"
import { useI18next } from "gatsby-plugin-react-i18next"
import { navigate } from "gatsby"

import { MessagesContext } from "../context/messages-context"
import { MESSAGE_SEVERITY_SUCCESS, MESSAGE_SEVERITY_ERROR } from "../message"
import { UserContext } from "../context/user-context"

import * as formStyles from "../../styles/form.module.scss"
import * as buttonStyles from "../../styles/buttons.module.scss"
import * as styles from "../../styles/forms/contact.module.scss"

const LoginForm = () => {
  const { t, language } = useI18next()
  const { addMessage } = useContext(MessagesContext)

  const handleSubmit = e => {
    e.preventDefault()
    let myForm = document.getElementById("user-login-form")
    let formData = new FormData(myForm)
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        addMessage({
          severity: MESSAGE_SEVERITY_SUCCESS,
          content: t("Logged in."),
        })
        // navigate(`/${language}`)
      })
      .catch(error => {
        addMessage({
          severity: MESSAGE_SEVERITY_ERROR,
          content: error,
        })
        // navigate(`/${language}`)
      })
  }

  return (
    <form
      method="POST"
      id="user-login-form"
      accept-charset="UTF-8"
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <div className={formStyles.formItem}>
        <label for="edit-name" className={formStyles.formRequired}>
          {t("Username")}
        </label>
        <input
          autocorrect="none"
          autocapitalize="none"
          spellcheck="false"
          autofocus="autofocus"
          aria-describedby="edit-name--description"
          type="text"
          id="edit-name"
          name="name"
          size="60"
          maxlength="60"
          required="required"
          aria-required="true"
        />
        <div id="edit-name--description">Enter your Site-Install username.</div>
      </div>
      <div className={formStyles.formItem}>
        <label for="edit-pass" className={formStyles.formRequired}>
          {t("Password")}
        </label>
        <input
          aria-describedby="edit-pass--description"
          type="password"
          id="edit-pass"
          name="pass"
          size="60"
          maxlength="128"
          required="required"
          aria-required="true"
        />

        <div id="edit-pass--description">
          Enter the password that accompanies your username.
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
          value={t("Log in")}
          className={formStyles.button}
        />
      </div>
    </form>
  )
}

export default LoginForm
