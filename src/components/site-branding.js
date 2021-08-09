import React from "react"
import PropTypes from "prop-types"
import { UserStateContext } from "./user-context"

import Link from "./link"

import { styles, siteTitleStyles } from "../styles/site-branding.module.scss"

const SiteBranding = ({ siteTitle }) => {
  return (
    <div className={styles}>
      <div className={siteTitleStyles}>
        <UserStateContext.Consumer>
          {user => {
            return <Link to={`/${user.locale}`}>{siteTitle}</Link>
          }}
        </UserStateContext.Consumer>
      </div>
    </div>
  )
}

SiteBranding.propTypes = {
  siteTitle: PropTypes.string.isRequired,
}

export default SiteBranding
