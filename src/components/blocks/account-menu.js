import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Block from "../block"

import * as styles from "../../styles/blocks/account-menu.module.scss"

const AccountMenuBlock = menu => {
  const { t } = useTranslation()

  return (
    <Block
      title={t("User account menu")}
      titleClassName="visually-hidden"
      className={styles.block}
      locations={[/.*/]}
    >
      {t("Log in")}
    </Block>
  )
}

export default AccountMenuBlock
