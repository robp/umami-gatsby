import * as React from "react"

import FooterRegion from "../regions/footer"

import { container } from "../../styles/layout.module.scss"
import * as styles from "../../styles/layout/footer.module.scss"

const FooterLayout = () => {
  return (
    <div className={styles.styles}>
      <footer className={styles.footer}>
        <div className={container}>
          <FooterRegion />
        </div>
      </footer>
    </div>
  )
}

export default FooterLayout
