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

module.exports = { normalizeString, capitalizeFirstLetter }
