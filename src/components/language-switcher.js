import React from 'react'
import Link from "./link"

import { styles } from "../styles/language-switcher.module.scss"

const LanguageSwitcher = () => {
  return (
    <div className={styles}>
      <ul>
        <li>
          <Link to="/en">English</Link>
        </li>
        <li>
          <Link to="/es">Spanish</Link>
        </li>
      </ul>
    </div>
  )
}

export default LanguageSwitcher
