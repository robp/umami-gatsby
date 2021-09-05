import React from "react"
import { Link } from "gatsby-plugin-react-i18next"
import { StaticImage } from "gatsby-plugin-image"
import { useSiteMetadata } from "../hooks/use-site-metadata"

import { styles } from "../styles/site-branding.module.scss"

const SiteBranding = () => {
  const { title } = useSiteMetadata()

  return (
    <div className={styles}>
      <Link to="/">
        <StaticImage src="../images/logo.svg" alt={title} loading="eager" />
        <span className="visually-hidden">{title}</span>
      </Link>
    </div>
  )
}

export default SiteBranding
