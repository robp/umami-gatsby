import React, { useContext, useEffect, useRef, useState } from "react"
import classNames from "classnames"
import { useI18next, Trans } from "gatsby-plugin-react-i18next"
import { navigate } from "gatsby"

import { MessagesContext } from "../context/messages-context"
import { MESSAGE_SEVERITY_SUCCESS, MESSAGE_SEVERITY_ERROR } from "../message"
import { UserContext } from "../context/user-context"
import Link from "../link"

import { evaluatePasswordStrength } from "../../utils/functions"

import * as formStyles from "../../styles/form.module.scss"
import * as buttonStyles from "../../styles/buttons.module.scss"
import * as styles from "../../styles/forms/user-edit.module.scss"

const UserEditForm = () => {
  const { t, language } = useI18next()
  // const { addMessage } = useContext(MessagesContext)
  const { getCurrentUser } = useContext(UserContext)
  const user = getCurrentUser()
  console.log(user)
  const [emailAddress, setEmailAddress] = useState(user.email)
  const currentPasswordRef = useRef()
  const emailAddressRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const pictureRef = useRef()

  const passwordConfirmMessageRef = useRef()
  const passwordMatchStatusRef = useRef()
  const passwordSuggestionsRef = useRef()
  const passwordStrengthTextRef = useRef()
  const passwordStrengthIndicatorRef = useRef()

  const passwordSettings = {
    addLowerCase: t("Add lowercase letters"),
    addNumbers: t("Add numbers"),
    addPunctuation: t("Add punctuation"),
    addUpperCase: t("Add uppercase letters"),
    confirmFailure: t("no"),
    confirmSuccess: t("yes"),
    confirmTitle: t("Passwords match:"),
    fair: t("Fair"),
    good: t("Good"),
    hasWeaknesses: t("Recommendations to make your password stronger:"),
    sameAsUsername: t("Make it different from your username"),
    showStrengthIndicator: true,
    strengthTitle: t("Password strength:"),
    strong: t("Strong"),
    tooShort: t("Make it at least 12 characters"),
    username: getCurrentUser().email,
    weak: t("Weak"),
    cssClasses: {
      passwordWeak: styles.passwordWeak,
      passwordFair: styles.passwordFair,
      passwordGood: styles.passwordGood,
      passwordStrong: styles.passwordStrong,
    },
  }

  const passwordStrengthBarClassesToRemove = [
    styles.passwordWeak || "",
    styles.passwordFair || "",
    styles.passwordGood || "",
    styles.passwordStrong || "",
  ]
  const confirmTextWrapperClassesToRemove = [
    styles.passwordsMatch || "",
    styles.passwordsNotMatch || "",
  ]

  useEffect(() => {
    passwordSuggestionsRef.current.setAttribute("hidden", "true")
  }, [passwordSuggestionsRef])

  const passwordCheckMatch = () => {
    const passwordsAreMatching =
      passwordRef.current.value === confirmPasswordRef.current.value
    const confirmClass = passwordsAreMatching
      ? styles.passwordsMatch
      : styles.passwordsNotMatch
    const confirmMessage = passwordsAreMatching ? t("yes") : t("no")

    if (
      !passwordMatchStatusRef.current.classList.contains(confirmClass) ||
      !passwordMatchStatusRef.current.innerHTML === confirmMessage
    ) {
      if (confirmTextWrapperClassesToRemove.length) {
        confirmTextWrapperClassesToRemove.forEach(classToRemove => {
          passwordMatchStatusRef.current.classList.remove(classToRemove)
        })
      }

      passwordMatchStatusRef.current.innerHTML = confirmMessage
      passwordMatchStatusRef.current.classList.add(confirmClass)
    }
  }

  const passwordCheck = () => {
    const result = evaluatePasswordStrength(
      passwordRef.current.value,
      passwordSettings,
      emailAddressRef.current.value
    )
    const currentPasswordSuggestions = result.message

    if (
      passwordSuggestionsRef.current.innerHTML !== currentPasswordSuggestions
    ) {
      passwordSuggestionsRef.current.innerHTML = currentPasswordSuggestions
      passwordSuggestionsRef.current.toggleAttribute(
        "hidden",
        result.strength === 100
      )
    }

    if (passwordStrengthBarClassesToRemove) {
      passwordStrengthBarClassesToRemove.forEach(classToRemove => {
        passwordStrengthIndicatorRef.current.classList.remove(classToRemove)
      })
    }

    passwordStrengthIndicatorRef.current.style.width = `${result.strength}%`
    passwordStrengthIndicatorRef.current.classList.add(result.indicatorClass)
    passwordStrengthTextRef.current.innerHTML = result.indicatorText

    if (confirmPasswordRef.current.value) {
      passwordCheckMatch()
      passwordConfirmMessageRef.current.classList.remove(styles.invisible)
    } else {
      passwordConfirmMessageRef.current.classList.add(styles.invisible)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  useEffect(() => {
    emailAddressRef.current.value = emailAddress
  }, [emailAddress])

  return (
    <form
      method="POST"
      id="user-form"
      acceptCharset="UTF-8"
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <div id="edit-account" className={formStyles.formWrapper}>
        <div className={formStyles.formItem}>
          <label htmlFor="edit-current-pass">{t("Current password")}</label>
          <input
            autoComplete="off"
            aria-describedby="edit-current-pass--description"
            type="password"
            id="edit-current-pass"
            name="current_pass"
            size="25"
            maxLength="128"
            ref={currentPasswordRef}
          />

          <div
            id="edit-current-pass--description"
            className={formStyles.description}
          >
            <Trans i18nKey="edit-current-pass--description">
              Required if you want to change the <em>Email address</em> or{" "}
              <em>Password</em> below.{" "}
              <Link
                to={`/${language}/user/password`}
                title={t("Send password reset instructions via email.")}
              >
                Reset your password
              </Link>
              .
            </Trans>
          </div>
        </div>
        <div className={formStyles.formItem}>
          <label htmlFor="edit-mail" className={formStyles.formRequired}>
            {t("Email address")}
          </label>
          <input
            autoComplete="off"
            aria-describedby="edit-mail--description"
            type="email"
            id="edit-mail"
            name="mail"
            size="60"
            maxLength="254"
            required="required"
            aria-required="true"
            ref={emailAddressRef}
            onChange={e => setEmailAddress(e.target.value)}
          />

          <div id="edit-mail--description" className={formStyles.description}>
            {t("edit-mail--description")}
          </div>
        </div>

        <div id="edit-pass" className={formStyles.formItem}>
          <div className={(formStyles.formItem, styles.passwordParent)}>
            <label htmlFor="edit-pass-pass1">{t("Password")}</label>
            <input
              className={styles.passwordField}
              autoComplete="new-password"
              type="password"
              id="edit-pass-pass1"
              name="pass[pass1]"
              size="25"
              maxLength="128"
              ref={passwordRef}
              onChange={passwordCheck}
            />

            <div className={styles.passwordStrength}>
              <div className={styles.passwordStrengthMeter}>
                <div
                  className={styles.passwordStrengthIndicator}
                  ref={passwordStrengthIndicatorRef}
                ></div>
              </div>
              <div
                aria-live="polite"
                aria-atomic="true"
                className="password-strength__title"
              >
                {t("Password strength")}:{" "}
                <span
                  className="password-strength__text"
                  ref={passwordStrengthTextRef}
                ></span>
              </div>
            </div>
          </div>
          <div
            className={classNames(formStyles.formItem, styles.confirmParent)}
          >
            <label htmlFor="edit-pass-pass2">{t("Confirm password")}</label>
            <input
              className={styles.passwordConfirm}
              autoComplete="new-password"
              type="password"
              id="edit-pass-pass2"
              name="pass[pass2]"
              size="25"
              maxLength="128"
              ref={confirmPasswordRef}
              onChange={passwordCheck}
            />

            <div
              aria-live="polite"
              aria-atomic="true"
              className="password-confirm-message"
              ref={passwordConfirmMessageRef}
            >
              {t("Passwords match")}: <span ref={passwordMatchStatusRef}></span>
            </div>
            <div
              className={styles.passwordSuggestions}
              ref={passwordSuggestionsRef}
            />

            <div id="edit-pass--description" className={formStyles.description}>
              {t("edit-pass--description")}
            </div>
          </div>
        </div>
      </div>
      <div className={formStyles.formItem}>
        <label
          htmlFor="edit-user-picture-0-upload"
          id="edit-user-picture-0--label"
        >
          {t("Picture")}
        </label>
        <div className="image-widget js-form-managed-file form-managed-file clearfix">
          <div className="image-widget-data">
            <input
              accept="image/*"
              type="file"
              id="edit-user-picture-0-upload"
              name="files[user_picture_0]"
              size="22"
              className="js-form-file form-file"
              ref={pictureRef}
            />
            <input
              className="js-hide button js-form-submit form-submit"
              formNoValidate="formnovalidate"
              type="submit"
              id="edit-user-picture-0-upload-button"
              name="user_picture_0_upload_button"
              value={t("Upload")}
            />
          </div>
        </div>

        <div
          id="edit-user-picture-0--description"
          className={formStyles.description}
        >
          <Trans i18nKey="edit-user-picture-0--description">
            Your virtual face or picture.
            <br />
            One file only.
            <br />8 MB limit.
            <br />
            Allowed types: png gif jpg jpeg.
          </Trans>
        </div>
      </div>

      <div
        id="edit-actions"
        className={classNames(formStyles.formActions, buttonStyles.formActions)}
      >
        <input
          type="submit"
          name="op"
          value={t("Save")}
          className={formStyles.button}
        />
      </div>
    </form>
  )
}

export default UserEditForm
