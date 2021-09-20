import React, { useContext, useRef } from "react"
import classNames from "classnames"
import { useI18next } from "gatsby-plugin-react-i18next"
import { navigate } from "gatsby"
import { useSiteMetadata } from "../../hooks/use-site-metadata"

import { MessagesContext } from "../context/messages-context"
import { MESSAGE_SEVERITY_SUCCESS, MESSAGE_SEVERITY_ERROR } from "../message"
import { UserContext } from "../context/user-context"
import Link from "../link"

import * as formStyles from "../../styles/form.module.scss"
import * as buttonStyles from "../../styles/buttons.module.scss"
import * as styles from "../../styles/forms/login.module.scss"

const LoginForm = () => {
  const { t, language } = useI18next()
  const { addMessage } = useContext(MessagesContext)
  const { title } = useSiteMetadata()
  const { authLogin } = useContext(UserContext)
  const usernameRef = useRef()
  const passwordRef = useRef()

  const handleSubmit = e => {
    e.preventDefault()
    authLogin(usernameRef.current.value, passwordRef.current.value)
      .then(() => {
        addMessage({
          severity: MESSAGE_SEVERITY_SUCCESS,
          content: t("Logged in."),
        })
        navigate(`/${language}/user`)
      })
      .catch(error => {
        let errorMessage = t("Unknown error")
        switch (error.cause) {
          case "auth/invalid-email":
            errorMessage = (
              <>
                {t("Unrecognized username or password.")}{" "}
                <Link to={`/${language}/user/password`}>{t("Forgot your password?")}</Link>
              </>
            )
            break
          default:
            errorMessage = error.message
        }
        addMessage({
          severity: MESSAGE_SEVERITY_ERROR,
          content: errorMessage,
        })
      })
  }

  return (
    <form
      method="POST"
      id="user-login-form"
      acceptCharset="UTF-8"
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <div className={formStyles.formItem}>
        <label htmlFor="edit-name" className={formStyles.formRequired}>
          {t("Username")}
        </label>
        <input
          autoCorrect="none"
          autoCapitalize="none"
          spellCheck="false"
          aria-describedby="edit-name--description"
          type="text"
          id="edit-name"
          name="name"
          size="60"
          maxLength="60"
          required="required"
          aria-required="true"
          ref={usernameRef}
        />
        <div id="edit-name--description" className={formStyles.description}>
          {t("Enter your {{siteName}} username.", { siteName: title })}
        </div>
      </div>
      <div className={formStyles.formItem}>
        <label htmlFor="edit-pass" className={formStyles.formRequired}>
          {t("Password")}
        </label>
        <input
          aria-describedby="edit-pass--description"
          type="password"
          id="edit-pass"
          name="pass"
          size="60"
          maxLength="128"
          required="required"
          aria-required="true"
          ref={passwordRef}
        />

        <div id="edit-pass--description" className={formStyles.description}>
          {t("Enter the password that accompanies your username.")}
        </div>
      </div>
      <div
        id="edit-actions"
        className={classNames(formStyles.formActions, buttonStyles.formActions)}
      >
        <input
          type="submit"
          name="op"
          value={t("Log in")}
          className={formStyles.button}
        />
      </div>
    </form>
  )
}

export default LoginForm
