import React from 'react'
import Link from "./link"

const LanguageSwitcher = () => {
  return (
    <div className="language-switcher">
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
