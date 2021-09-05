import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import classNames from "classnames"

import Field from "../field"
import Tags from "../tags"
import MediaImage from "../media-image"

import * as nodeStyles from "../../styles/node.module.scss"
import * as layoutStyles from "../../styles/layout.module.scss"

const ArticleNode = ({ node, canonicalUrl }) => {
  return (
    <article
      about={canonicalUrl}
      typeof="schema:Article"
      className={classNames(nodeStyles.node, nodeStyles.viewModeFull)}
    >
      <header className={nodeStyles.header}>
        <h1>
          <Field labelHidden property="schema:name">
            {node.title}
          </Field>
        </h1>
      </header>
      <footer className={nodeStyles.meta}>
        <div className={nodeStyles.submitted}>
          <span className={nodeStyles.byAuthor}>
            by{" "}
            <Field labelHidden element="span" rel="schema:author">
              <span typeof="schema:Person" property="schema:name">
                {node.relationships.uid?.display_name}
              </span>
            </Field>{" "}
          </span>{" "}
          {node.createdFormatted}
          <span
            property="schema:dateCreated"
            content={node.created}
            className="rdf-meta hidden"
          ></span>
        </div>
      </footer>
      <div className={nodeStyles.content}>
        <div className={layoutStyles.oneColumn}>
          <div className={layoutStyles.region}>
            <Tags lang={node.langcode} data={node.relationships?.field_tags} />
            <Field labelHidden className={nodeStyles.mediaImage}>
              <MediaImage
                media={node.relationships.field_media_image}
                loading="eager"
              />
            </Field>
            <Field
              labelHidden
              property="schema:text"
              html={node.body?.processed}
            />
          </div>
        </div>
      </div>
    </article>
  )
}

ArticleNode.propTypes = {
  node: PropTypes.object.isRequired,
  canonicalUrl: PropTypes.string.isRequired,
}

export default ArticleNode

export const ArticleNodeFragments = graphql`
  fragment ArticleNode on node__article {
    langcode
    id
    drupal_internal__nid
    created
    title
    body {
      processed
    }
    relationships {
      field_media_image {
        relationships {
          field_media_image {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  width: 960
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
        field_media_image {
          alt
        }
      }
      field_tags {
        id
        name
        path {
          alias
        }
      }
      uid {
        display_name
      }
    }
  }
`
