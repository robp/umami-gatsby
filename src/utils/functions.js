// Normalize characters in URLs or else Gatsby will complain on prod build.
var normalizeString = function (str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

module.exports = { normalizeString }
