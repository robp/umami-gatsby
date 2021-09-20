import React, { useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"

import { UserContext } from "../context/user-context"
import Block from "../block"
import Menu from "../menu"
import Link from "../link"

import * as styles from "../../styles/blocks/account-menu.module.scss"

const AccountMenuBlock = menu => {
  const { t, language } = useI18next()
  const { isAuthenticated } = useContext(UserContext)

  const loggedOutMenuItems = [
    {
      node: {
        id: "log-in",
        title: t("Log in"),
        url: `/${language}/user/login`,
        parent: null,
        langcode: language,
      },
    },
  ]

  const loggedInMenuItems = [
    {
      node: {
        id: "my-account",
        title: t("My account"),
        url: `/${language}/user`,
        parent: null,
        langcode: language,
      },
    },
    {
      node: {
        id: "log-out",
        title: t("Log out"),
        url: `/${language}/user/logout`,
        parent: null,
        langcode: language,
      },
    },
  ]

  const menuItems = isAuthenticated() ? loggedInMenuItems : loggedOutMenuItems

  return (
    <Block
      title={t("User account menu")}
      titleHidden
      className={styles.block}
      locations={[/.*/]}
    >
      <Menu
        className={styles.menu}
        menuItemClassName={styles.menuItem}
        menuLinkClassName={styles.menuLink}
        name="account"
        lang={language}
        depth={1}
        items={menuItems}
      />
    </Block>
  )
}

export default AccountMenuBlock
