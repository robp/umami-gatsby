import React from "react"
import { Link } from "gatsby-plugin-react-i18next"
import { StaticImage } from "gatsby-plugin-image"
import { useSiteMetadata } from "../../hooks/use-site-metadata"

import Block from "../block"

import * as styles from "../../styles/site-branding.module.scss"

const SiteBrandingBlock = () => {
  const { title } = useSiteMetadata()

  return (
    <Block className={styles.block} locations={[/.*/]}>
      <Link to="/" className={styles.siteLogo}>
        <StaticImage src="../images/logo.svg" alt={title} loading="eager" />
        <span className="visually-hidden">{title}</span>
      </Link>
    </Block>
  )
}

export default SiteBrandingBlock
