import React, { useContext } from "react"
import { useI18next } from "gatsby-plugin-react-i18next"
import classNames from "classnames"

import { PageContext } from "../context/page-context"
import Block from "../block"
import Menu from "../menu"

import * as tabsStyles from "../../styles/tabs.module.scss"
import * as styles from "../../styles/blocks/local-tasks.module.scss"

const LocalTasksBlock = () => {
  const { t, language } = useI18next()
  const { localTasks } = useContext(PageContext)

  return (
    <Block
      element="nav"
      title={t("Primary Tabs")}
      titleHidden
      className={styles.block}
      locations={[/.*/]}
      aria-label={t("Tabs")}
      role="navigation"
    >
      <Menu
        className={classNames(tabsStyles.tabs, tabsStyles.primary)}
        menuItemClassName={tabsStyles.tab}
        activeClassName={tabsStyles.active}
        name="local-tasks"
        lang={language}
        depth={1}
        items={localTasks}
      />
    </Block>
  )
}

export default LocalTasksBlock
