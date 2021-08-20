import * as React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"

import { styles } from "../styles/footer.module.scss"

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className={styles}>
      © {new Date().getFullYear()}, {t("Built with")}{" "}
      <a href="https://www.gatsbyjs.com">Gatsby</a>
    </footer>
  )
}

export default Footer
