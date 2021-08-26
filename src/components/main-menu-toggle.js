import React from "react"

import {
  menuMainToggle,
  menuMainActive,
} from "../styles/main-menu-toggle.module.scss"

export const MainMenuToggle = () => {
  const toggleMenu = () => {
    const menu = document.querySelector(
      '[data-gatsby-selector="menu-main"] > ul'
    )
    menu.classList.toggle(menuMainActive)
    return false
  }

  return (
    <div>
      <button
        type="button"
        name="menu_toggle"
        className={menuMainToggle}
        data-gatsby-selector="menu-main-toggle"
        aria-label="Toggle the menu"
        onClick={toggleMenu}
      >
        <svg
          width="23"
          height="23"
          viewBox="0 0 23 23"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <use xlinkHref="#a" fill="#5F635D"></use>
          <use xlinkHref="#a" transform="translate(0 18)" fill="#5F635D"></use>
          <use xlinkHref="#a" transform="translate(0 9)" fill="#5F635D"></use>
          <defs>
            <path id="a" fillRule="evenodd" d="M0 0h23v5H0V0z"></path>
          </defs>
        </svg>
      </button>
    </div>
  )
}

export default MainMenuToggle
