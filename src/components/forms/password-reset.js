import React, { useContext, useRef } from "react"
import classNames from "classnames"
import { useI18next, Trans } from "gatsby-plugin-react-i18next"
import { useSiteMetadata } from "../../hooks/use-site-metadata"

import { MessagesContext } from "../context/messages-context"
import { MESSAGE_SEVERITY_SUCCESS, MESSAGE_SEVERITY_ERROR } from "../message"
import { UserContext } from "../context/user-context"

import * as formStyles from "../../styles/form.module.scss"
import * as buttonStyles from "../../styles/buttons.module.scss"
import * as styles from "../../styles/forms/login.module.scss"

const PasswordResetForm = () => {
  const { t, language, navigate } = useI18next()
  const { addMessage } = useContext(MessagesContext)
  const { getCurrentUser, authResetPassword } = useContext(UserContext)
  const usernameRef = useRef()

  const user = getCurrentUser()
  const emailAddress = user?.email

  const handleSubmit = e => {
    e.preventDefault()
    const username = user ? user.email : usernameRef.current.value
    const successMessage = {
      severity: MESSAGE_SEVERITY_SUCCESS,
      content: (
        <Trans i18nKey="user-pass--success">
          If <em>{{ username }}</em> is a valid account, an email will be sent
          with instructions to reset your password.
        </Trans>
      ),
    }

    authResetPassword(username)
      .then(() => {
        addMessage(successMessage)
      })
      .catch(error => {
        let errorMessage = ""
        switch (error.cause) {
          case "auth/invalid-email":
            addMessage(successMessage)
            break
          default:
            errorMessage = error.message
        }
        if (errorMessage.length) {
          addMessage({
            severity: MESSAGE_SEVERITY_ERROR,
            content: errorMessage,
          })
        }
      })

    navigate("/")
  }

  return (
    <form
      method="POST"
      id="user-pass"
      acceptCharset="UTF-8"
      className={styles.form}
      onSubmit={handleSubmit}
    >
      {user ? (
        <p>
          <Trans i18nKey="edit-name--logged-in">
            Password reset instructions will be mailed to{" "}
            <em>{{ emailAddress }}</em>. You must log out to use the password
            reset link in the email.
          </Trans>
        </p>
      ) : (
        <>
          <div className={formStyles.formItem}>
            <label htmlFor="edit-name" className={formStyles.formRequired}>
              {t("Username or email address")}
            </label>
            <input
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              type="text"
              id="edit-name"
              name="name"
              size="60"
              maxLength="254"
              required="required"
              aria-required="true"
              ref={usernameRef}
            />
          </div>
          <p>
            {t(
              "Password reset instructions will be sent to your registered email address."
            )}
          </p>
        </>
      )}
      <div
        id="edit-actions"
        className={classNames(formStyles.formActions, buttonStyles.formActions)}
      >
        <input
          type="submit"
          name="op"
          value={t("Submit")}
          className={formStyles.button}
        />
      </div>
    </form>
  )
}

export default PasswordResetForm
