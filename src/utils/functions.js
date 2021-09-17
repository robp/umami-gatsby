/**
 * Capitalize the first letter of a string.
 * @param {string} str
 * @returns {string}
 */
const capitalizeFirstLetter = str => {
  return str[0].toUpperCase() + str.slice(1)
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
  getDefaultTranslations,
  isBrowser,
  normalizeString,
  removeTrailingSlash,
  stripTags,
}
