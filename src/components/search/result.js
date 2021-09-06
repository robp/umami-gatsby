import React from 'react'
import PropTypes from 'prop-types'

import Link from '../link'

const SearchResult = ({ data }) => {
  return (
    <div>
      <div>
        <Link to={`/${data.langcode}${data.alias}`}>{data.title}</Link>
      </div>
      <div>{data.excerpt}</div>
    </div>
  )
}

SearchResult.propTypes = {
  data: PropTypes.object.isRequired,
}

export default SearchResult
