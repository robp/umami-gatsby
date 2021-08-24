import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

import LanguageSwitcherContextProvider from "../components/context/language-switcher-context"

import { normalizeString } from "../utils/functions"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PageTitle from "../components/page-title"
import Link from "../components/link"

import { container } from "../styles/layout.module.scss"

const Tag = ({ data }) => {
  const { t } = useTranslation()

  const node = data.taxonomyTermTags
  const translations = data.allTaxonomyTermTags.edges

  const articles = node.relationships.node__article ? (
    <>
      <h2>
        {t("Articles")} ({node.relationships.node__article.length})
      </h2>
      <ul>
        {node.relationships.node__article.map(article => {
          return (
            <li key={article.id}>
              <Link
                to={`/${node.langcode}${normalizeString(article.path.alias)}`}
              >
                {article.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  ) : null

  const recipes = node.relationships.node__recipe ? (
    <>
      <h2>
        {t("Recipes")} ({node.relationships.node__recipe.length})
      </h2>
      <ul>
        {node.relationships.node__recipe.map(recipe => {
          return (
            <li key={recipe.id}>
              <Link
                to={`/${node.langcode}${normalizeString(recipe.path.alias)}`}
              >
                {recipe.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  ) : null

  return (
    <LanguageSwitcherContextProvider translations={translations}>
      <Layout>
        <Seo title={`${t("Tag")}: ${node.name}`} />
        <div className={container}>
          <PageTitle title={`${t("Tag")}: ${node.name}`} />
          {articles}
          {recipes}
        </div>
      </Layout>
    </LanguageSwitcherContextProvider>
  )
}

Tag.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Tag

export const query = graphql`
  query ($language: String!, $nodeId: String!, $internalTid: Int!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    taxonomyTermTags(id: { eq: $nodeId }) {
      langcode
      id
      name
      path {
        alias
      }
      relationships {
        node__article {
          id
          title
          path {
            alias
          }
        }
        node__recipe {
          id
          title
          path {
            alias
          }
        }
      }
    }
    allTaxonomyTermTags(
      filter: { drupal_internal__tid: { eq: $internalTid } }
    ) {
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
