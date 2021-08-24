import * as React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Disclaimer from "./blocks/disclaimer"

import { styles } from "../styles/footer.module.scss"

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className={styles}>
      <Disclaimer />
      © {new Date().getFullYear()}, {t("Built with")}{" "}
      <a href="https://www.gatsbyjs.com">Gatsby</a>
    </footer>
  )
}

export default Footer
