import React, { useContext, useEffect, useRef, useState } from "react"
import { useI18next, Trans } from "gatsby-plugin-react-i18next"
import classNames from "classnames"

import { MessagesContext } from "../context/messages-context"
import { MESSAGE_SEVERITY_SUCCESS, MESSAGE_SEVERITY_ERROR } from "../message"
import { UserContext } from "../context/user-context"
import Link from "../link"

import { basename, evaluatePasswordStrength } from "../../utils/functions"

import * as fileStyles from "../../styles/file.module.scss"
import * as formStyles from "../../styles/form.module.scss"
import * as buttonStyles from "../../styles/buttons.module.scss"
import * as styles from "../../styles/forms/user-edit.module.scss"

const UserEditForm = () => {
  const { t, language } = useI18next()
  const { addMessage, clearMessages } = useContext(MessagesContext)
  const {
    getCurrentUser,
    authUpdateEmail,
    authUpdatePassword,
    authUpdateProfile,
    putFile,
  } = useContext(UserContext)
  const user = getCurrentUser()
  const [emailAddress, setEmailAddress] = useState(user.email)
  const [photoURL, setPhotoURL] = useState(user.photoURL)
  const [isUploading, setIsUploading] = useState(false)
  const currentPasswordRef = useRef()
  const emailAddressRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

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

    return passwordsAreMatching
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

    return result.strength
  }

  const handlePictureUpload = async event => {
    event.preventDefault()
    const file = event.target.files[0]

    try {
      setIsUploading(true)
      const uploadResult = await putFile(`profilePictures/${user.uid}/${file.name}`, file)
      setIsUploading(false)
      setPhotoURL(uploadResult)
      addMessage({
        severity: MESSAGE_SEVERITY_SUCCESS,
        content: t("File uploaded."),
      })
    } catch (error) {
      setIsUploading(false)
      addMessage({
        severity: MESSAGE_SEVERITY_ERROR,
        content: error.message,
      })
    }
  }

  const handlePictureRemove = event => {
    event.preventDefault()
    setPhotoURL(null)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    clearMessages()

    // If changing email address...
    if (emailAddress !== user.email) {
      try {
        await authUpdateEmail(emailAddress, currentPasswordRef.current.value)
        addMessage({
          severity: MESSAGE_SEVERITY_SUCCESS,
          content: t("Email address updated."),
        })
      } catch (error) {
        let errorMessage = t("Unknown error")
        switch (error.cause) {
          case "auth/internal-error":
          case "auth/wrong-password":
            errorMessage = (
              <Trans i18nKey="edit-mail--password-missing">
                Your current password is missing or incorrect; it's required to
                change the <em>Email</em>.
              </Trans>
            )
            break
          default:
            errorMessage = error.message
        }
        addMessage({
          severity: MESSAGE_SEVERITY_ERROR,
          content: errorMessage,
        })
      }
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }

    // If changing password...
    if (passwordRef.current.value) {
      if (!passwordCheckMatch()) {
        addMessage({
          severity: MESSAGE_SEVERITY_ERROR,
          content: t("Passwords do not match."),
        })
      } else if (passwordCheck() < 60) {
        addMessage({
          severity: MESSAGE_SEVERITY_ERROR,
          content: t("Password is too weak."),
        })
      } else {
        try {
          await authUpdatePassword(
            passwordRef.current.value,
            currentPasswordRef.current.value
          )
          addMessage({
            severity: MESSAGE_SEVERITY_SUCCESS,
            content: t("Password updated."),
          })
        } catch (error) {
          let errorMessage = t("Unknown error")
          switch (error.cause) {
            case "auth/internal-error":
            case "auth/wrong-password":
              errorMessage = (
                <Trans i18nKey="edit-pass--password-missing">
                  Your current password is missing or incorrect; it's required
                  to change the <em>Password</em>.
                </Trans>
              )
              break
            default:
              errorMessage = error.message
          }
          addMessage({
            severity: MESSAGE_SEVERITY_ERROR,
            content: errorMessage,
          })
        }
      }
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }

    // Update everything else...
    try {
      await authUpdateProfile({
        displayName: null,
        photoURL: photoURL,
      })
      addMessage({
        severity: MESSAGE_SEVERITY_SUCCESS,
        content: t("Profile updated."),
      })
    } catch (error) {
      addMessage({
        severity: MESSAGE_SEVERITY_ERROR,
        content: error.message,
      })
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    emailAddressRef.current.value = emailAddress
  }, [emailAddress])

  const imagePreview = photoURL ? (
    <div className="image-preview">
      <img
        src={photoURL}
        width="100"
        height="100"
        alt=""
        loading="lazy"
        typeof="foaf:Image"
        className="image-style-thumbnail"
      />
    </div>
  ) : null

  const imageWidget = photoURL ? (
    <>
      <span className={classNames(fileStyles.file, fileStyles.fileImage)}>
        {" "}
        <a href={photoURL}>{basename(photoURL)}</a>
      </span>{" "}
      <input
        formNoValidate="formnovalidate"
        type="submit"
        id="edit-user-picture-0-remove-button--I5IR68_krzI"
        name="user_picture_0_remove_button"
        value={t("Remove")}
        className="button js-form-submit form-submit"
        onClick={handlePictureRemove}
      />
    </>
  ) : (
    <>
      <input
        accept="image/*"
        type="file"
        id="edit-user-picture-0-upload"
        name="files[user_picture_0]"
        size="22"
        className="js-form-file form-file"
        onChange={handlePictureUpload}
      />
      {isUploading ? <span className={formStyles.throbber} /> : null}
    </>
  )

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
          {imagePreview ? imagePreview : null}
          <div className="image-widget-data">{imageWidget}</div>
        </div>

        <div
          id="edit-user-picture-0--description"
          className={formStyles.description}
        >
          {imagePreview ? (
            t("Your virtual face or picture.")
          ) : (
            <Trans i18nKey="edit-user-picture-0--description">
              Your virtual face or picture.
              <br />
              One file only.
              <br />8 MB limit.
              <br />
              Allowed types: png gif jpg jpeg.
            </Trans>
          )}
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
