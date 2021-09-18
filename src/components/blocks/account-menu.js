import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Block from "../block"
import Link from "../link"

import * as styles from "../../styles/blocks/account-menu.module.scss"

const AccountMenuBlock = menu => {
  const { t } = useTranslation()

  return (
    <Block
      title={t("User account menu")}
      titleHidden
      className={styles.block}
      locations={[/.*/]}
    >
      <Link to="/user/login">{t("Log in")}</Link>
    </Block>
  )
}

export default AccountMenuBlock
