import React, { useContext, useEffect, useRef, useState } from "react"
import classNames from "classnames"
import { useI18next, Trans } from "gatsby-plugin-react-i18next"
import { navigate } from "gatsby"

import { MessagesContext } from "../context/messages-context"
import { MESSAGE_SEVERITY_SUCCESS, MESSAGE_SEVERITY_ERROR } from "../message"
import { UserContext } from "../context/user-context"
import Link from "../link"

import * as formStyles from "../../styles/form.module.scss"
import * as buttonStyles from "../../styles/buttons.module.scss"
import * as styles from "../../styles/forms/user-edit.module.scss"

const UserEditForm = () => {
  const { t, language } = useI18next()
  // const { addMessage } = useContext(MessagesContext)
  const { getCurrentUser } = useContext(UserContext)
  const user = getCurrentUser()
  const [emailAddress, setEmailAddress] = useState(user.email)
  const currentPasswordRef = useRef()
  const emailAddressRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const pictureRef = useRef()

  const passwordConfirmMessageRef = useRef()
  const passwordMatchStatusRef = useRef()

  const confirmTextWrapperClassesToRemove = [
    styles.passwordsMatch || "",
    styles.passwordsNotMatch || "",
  ]

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
    if (confirmPasswordRef.current.value) {
      passwordCheckMatch()
      passwordConfirmMessageRef.current.classList.remove(styles.invisible)
    }
    else {
      passwordConfirmMessageRef.current.classList.add(styles.invisible)
    }
  }

  // var passwordCheck = function passwordCheck() {
  //   if (settings.password.showStrengthIndicator) {
  //     var result = Drupal.evaluatePasswordStrength(
  //       $mainInput.val(),
  //       settings.password
  //     )
  //     var $currentPasswordSuggestions = $(
  //       Drupal.theme(
  //         "passwordSuggestions",
  //         settings.password,
  //         result.messageTips
  //       )
  //     )

  //     if (password.$suggestions.html() !== $currentPasswordSuggestions.html()) {
  //       password.$suggestions.replaceWith($currentPasswordSuggestions)
  //       password.$suggestions = $currentPasswordSuggestions.toggle(
  //         result.strength !== 100
  //       )
  //     }

  //     if (passwordStrengthBarClassesToRemove) {
  //       password.$strengthBar.removeClass(passwordStrengthBarClassesToRemove)
  //     }

  //     password.$strengthBar
  //       .css("width", "".concat(result.strength, "%"))
  //       .addClass(result.indicatorClass)
  //     password.$strengthTextWrapper.html(result.indicatorText)
  //   }

  //   if ($confirmInput.val()) {
  //     passwordCheckMatch($confirmInput.val())
  //     $passwordConfirmMessage.css({
  //       visibility: "visible",
  //     })
  //   } else {
  //     $passwordConfirmMessage.css({
  //       visibility: "hidden",
  //     })
  //   }

  //   if (widgetClassesToRemove) {
  //     $passwordWidget.removeClass(widgetClassesToRemove)
  //     addWidgetClasses()
  //   }
  // }

  const handleSubmit = e => {
    e.preventDefault()
    console.log("email", emailAddressRef.current.value)
    console.log("email changed?", emailAddressRef.current.value !== user.email)
    console.log(
      "passwords match?",
      passwordRef.current.value === confirmPasswordRef.current.value
    )
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
          <div className={formStyles.formItem}>
            <label htmlFor="edit-pass-pass1">{t("Password")}</label>
            <input
              autoComplete="new-password"
              type="password"
              id="edit-pass-pass1"
              name="pass[pass1]"
              size="25"
              maxLength="128"
              ref={passwordRef}
              onChange={passwordCheck}
            />

            <div className="password-strength">
              <div className="password-strength__meter">
                <div className="password-strength__indicator"></div>
              </div>
              <div
                aria-live="polite"
                aria-atomic="true"
                className="password-strength__title"
              >
                {t("Password strength")}:{" "}
                <span className="password-strength__text"></span>
              </div>
            </div>
          </div>
          <div className={formStyles.formItem}>
            <label htmlFor="edit-pass-pass2">{t("Confirm password")}</label>
            <input
              className="password-confirm js-password-confirm form-text"
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
              className="password-suggestions"
              style={{ display: "none" }}
            ></div>

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
