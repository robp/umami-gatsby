// Normalize characters in URLs or else Gatsby will complain on prod build.
const normalizeString = str => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

const capitalizeFirstLetter = str => {
  return str[0].toUpperCase() + str.slice(1)
}

module.exports = { normalizeString, capitalizeFirstLetter }
