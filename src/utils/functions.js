/**
 * Normalize characters in URLs or else Gatsby will complain on prod build.
 * @param {string} str
 * @return {string}
 */
const normalizeString = str => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

/**
 * Capitalize the first letter of a string.
 * @param {string} str
 * @returns {string}
 */
const capitalizeFirstLetter = str => {
  return str[0].toUpperCase() + str.slice(1)
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

/**
 * Remove a trailing slash from the supplied string.
 * @param {string} str
 * @returns {string}
 */
const removeTrailingSlash = str => {
  return str.replace(/\/$/, "")
}

/**
 *
 * @param {array} languages
 * @param {string} originalPath
 */
const getDefaultTranslations = (languages, originalPath) => {
  const translations = []

  languages?.forEach(langcode => {
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

module.exports = {
  normalizeString,
  capitalizeFirstLetter,
  stripTags,
  removeTrailingSlash,
  getDefaultTranslations,
}
