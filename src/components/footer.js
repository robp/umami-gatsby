import * as React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"

import DisclaimerBlock from "./blocks/disclaimer"

import { container } from "../styles/layout.module.scss"
import { styles } from "../styles/footer.module.scss"

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className={styles}>
      <div className={container}>
        <DisclaimerBlock />© {new Date().getFullYear()}, {t("Built with")}{" "}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </div>
    </footer>
  )
}

export default Footer
