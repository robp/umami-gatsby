var fs = require('fs');
var chalk = require('chalk');

const languages = require('./src/data/languages');

module.exports = {
  input: [
    "src/**/*.{js,jsx}",
    // Use ! to filter out files or directories
    "!src/**/*.spec.{js,jsx}",
    "!src/i18n/**",
    "!**/node_modules/**",
  ],
  output: "./",
  options: {
    debug: true,
    removeUnusedKeys: false,
    sort: false,
    attr: {
      list: ["data-i18n"],
      extensions: [".html", ".htm"],
    },
    func: {
      list: ["i18next.t", "i18n.t", "t"],
      extensions: [".js", ".jsx"],
    },
    trans: {
      component: "Trans",
      i18nKey: "i18nKey",
      defaultsKey: "defaults",
      extensions: [".js", ".jsx"],
      fallbackKey: false,
    },
    lngs: languages.langs,
    ns: ["translation"],
    defaultLng: languages.defaultLangKey,
    defaultNs: "translation",
    defaultValue: "",
    resource: {
      loadPath: "src/locales/{{lng}}/{{ns}}.json",
      savePath: "src/locales/{{lng}}/{{ns}}.json",
      jsonIndent: 2,
      lineEnding: "\n",
    },
    nsSeparator: false,
    keySeparator: false,
    pluralSeparator: "_",
    contextSeparator: "_",
    contextDefaultValues: [],
    interpolation: {
      prefix: "{{",
      suffix: "}}",
    },
  },
}
