import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby-plugin-react-i18next"

import { styles, siteTitleStyles } from "../styles/site-branding.module.scss"

const SiteBranding = ({ siteTitle }) => {
  return (
    <div className={styles}>
      <div className={siteTitleStyles}>
        <Link to="/">{siteTitle}</Link>
      </div>
    </div>
  )
}

SiteBranding.propTypes = {
  siteTitle: PropTypes.string.isRequired,
}

export default SiteBranding
