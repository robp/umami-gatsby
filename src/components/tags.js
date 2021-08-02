import React from "react"
import PropTypes from "prop-types"

import Tag from "./tag"

function Tags({ data }) {
  console.log(data);
  const tags = data
    .map(tag => {
      return <Tag key={tag.id} {...tag} />
    })
    .reduce((prev, curr) => [prev, ", ", curr])

  return tags.length ? (
    <div className="tags">
      Tags: {tags}
    </div>
  ) : null
}

Tags.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Tags
