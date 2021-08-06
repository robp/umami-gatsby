import * as React from "react"

import { styles } from "../styles/footer.module.scss"

const Footer = () => {
  return (
    <footer className={styles}>
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.com">Gatsby</a>
    </footer>
  )
}

export default Footer
