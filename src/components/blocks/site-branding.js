import React from "react"
import { useI18next } from "gatsby-plugin-react-i18next"
import Link from "../link"
import { StaticImage } from "gatsby-plugin-image"
import { useSiteMetadata } from "../../hooks/use-site-metadata"

import Block from "../block"

import * as styles from "../../styles/blocks/site-branding.module.scss"

const SiteBrandingBlock = () => {
  const { language } = useI18next()
  const { title } = useSiteMetadata()

  return (
    <Block className={styles.block} locations={[/.*/]}>
      <Link to="/" language={language} className={styles.siteLogo}>
        <StaticImage src="../../images/logo.svg" alt={title} loading="eager" />
        <span className="visually-hidden">{title}</span>
      </Link>
    </Block>
  )
}

export default SiteBrandingBlock
