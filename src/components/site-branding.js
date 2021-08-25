import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby-plugin-react-i18next"
import { StaticImage } from "gatsby-plugin-image"

import { styles } from "../styles/site-branding.module.scss"

const SiteBranding = ({ siteTitle }) => {
  return (
    <div className={styles}>
      <Link to="/">
        <StaticImage src="../images/logo.svg" alt={siteTitle} loading="eager" />
        <span className="visually-hidden">{siteTitle}</span>
      </Link>
    </div>
  )
}

SiteBranding.propTypes = {
  siteTitle: PropTypes.string.isRequired,
}

export default SiteBranding
