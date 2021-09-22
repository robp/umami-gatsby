/**
 * Capitalize the first letter of a string.
 * @param {string} str
 * @returns {string}
 */
const capitalizeFirstLetter = str => {
  return str[0].toUpperCase() + str.slice(1)
}

/**
 * Drupal's function for evaluating password strengh, made to work in React.
 * @param {string} password
 * @param {object} passwordSettings
 * @param {object} usernameRef
 * @returns {boolean}
 */
const evaluatePasswordStrength = (password, passwordSettings, usernameRef) => {
  password = password.trim()
  var indicatorText
  var indicatorClass
  var weaknesses = 0
  var strength = 100
  var msg = []
  var hasLowercase = /[a-z]/.test(password)
  var hasUppercase = /[A-Z]/.test(password)
  var hasNumbers = /[0-9]/.test(password)
  var hasPunctuation = /[^a-zA-Z0-9]/.test(password)
  var username =
    usernameRef?.current.value.length > 0 ? usernameRef.current.value : passwordSettings.username

  if (password.length < 12) {
    msg.push(passwordSettings.tooShort)
    strength -= (12 - password.length) * 5 + 30
  }

  if (!hasLowercase) {
    msg.push(passwordSettings.addLowerCase)
    weaknesses += 1
  }

  if (!hasUppercase) {
    msg.push(passwordSettings.addUpperCase)
    weaknesses += 1
  }

  if (!hasNumbers) {
    msg.push(passwordSettings.addNumbers)
    weaknesses += 1
  }

  if (!hasPunctuation) {
    msg.push(passwordSettings.addPunctuation)
    weaknesses += 1
  }

  switch (weaknesses) {
    case 1:
      strength -= 12.5
      break

    case 2:
      strength -= 25
      break

    case 3:
      strength -= 40
      break

    case 4:
      strength -= 40
      break
  }

  if (password !== "" && password.toLowerCase() === username?.toLowerCase()) {
    msg.push(passwordSettings.sameAsUsername)
    strength = 5
  }

  var cssClasses = passwordSettings.cssClasses

  if (strength < 60) {
    indicatorText = passwordSettings.weak
    indicatorClass = cssClasses.passwordWeak
  } else if (strength < 70) {
    indicatorText = passwordSettings.fair
    indicatorClass = cssClasses.passwordFair
  } else if (strength < 80) {
    indicatorText = passwordSettings.good
    indicatorClass = cssClasses.passwordGood
  } else if (strength <= 100) {
    indicatorText = passwordSettings.strong
    indicatorClass = cssClasses.passwordStrong
  }

  var messageTips = msg
  msg = ""
    .concat(passwordSettings.hasWeaknesses, "<ul><li>")
    .concat(msg.join("</li><li>"), "</li></ul>")

  return {
    strength: strength,
    message: msg,
    indicatorText: indicatorText,
    indicatorClass: indicatorClass,
    messageTips: messageTips,
  }
}

/**
 * Returns a translations object containing links to the originalPath param for
 * each of the languages provided as a parameter.
 * @param {array} languages
 * @param {string} originalPath
 */
const getDefaultTranslations = (languages, originalPath) => {
  const translations = []

  languages.forEach(langcode => {
    translations.push({
      node: {
        langcode,
        path: {
          alias: originalPath,
        },
      },
    })
  })

  return translations
}

/**
 * Return the boolean value of whether a browser window object is present.
 * @returns {boolean}
 */
const isBrowser = () => {
  return typeof window !== "undefined"
}

/**
 * Normalize characters in URLs or else Gatsby will complain on prod build.
 * @param {string} str
 * @return {string}
 */
const normalizeString = str => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

/**
 * Remove a trailing slash from the supplied string.
 * @param {string} str
 * @returns {string}
 */
const removeTrailingSlash = str => {
  return str.replace(/\/$/, "")
}

/**
 * Strip HTML tags from the supplied string.
 * @param {string} str
 * @returns {string}
 */
const stripTags = str => {
  if (str === null || str === undefined) return ""
  str = str.toString()
  return str.replace(/(<([^>]+)>)/gi, "")
}

module.exports = {
  capitalizeFirstLetter,
  evaluatePasswordStrength,
  getDefaultTranslations,
  isBrowser,
  normalizeString,
  removeTrailingSlash,
  stripTags,
}
