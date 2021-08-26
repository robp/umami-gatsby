import * as React from "react"

import { container } from "../../styles/layout.module.scss"
import * as styles from "../../styles/footer.module.scss"

const Footer = () => {
  return (
    <div className={styles.styles}>
      <footer className={styles.footer}>
        <div className={container}></div>
      </footer>
    </div>
  )
}

export default Footer
