import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import classNames from "classnames"

import LanguageSwitcherContextProvider from "../components/context/language-switcher-context"
import Layout from "../components/layout/layout-node"
import Seo from "../components/seo"
import Field from "../components/field"
import Tags from "../components/tags"
import MediaImage from "../components/media-image"

import * as nodeStyles from "../styles/node.module.scss"
import * as layoutStyles from "../styles/layout.module.scss"

const Article = ({ location, data }) => {
  const node = data.nodeArticle
  const translations = data.allNodeArticle.edges

  return (
    <LanguageSwitcherContextProvider translations={translations}>
      <Layout sidebar>
        <Seo title={node.title} />
        <article
          about={location.pathname}
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
                  <MediaImage media={node.relationships.field_media_image} />
                </Field>
                <Field labelHidden property="schema:text" html={node.body?.processed} />
              </div>
            </div>
          </div>
        </article>
      </Layout>
    </LanguageSwitcherContextProvider>
  )
}

Article.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Article

export const query = graphql`
  query ($language: String!, $nodeId: String!, $internalNid: Int!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    nodeArticle(id: { eq: $nodeId }) {
      createdFormatted: created(formatString: "Do MMMM YYYY", locale: $language)
      ...ArticleNode
    }
    allNodeArticle(filter: { drupal_internal__nid: { eq: $internalNid } }) {
      edges {
        node {
          langcode
          id
          path {
            alias
          }
        }
      }
    }
  }
`
