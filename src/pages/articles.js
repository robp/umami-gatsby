import React from "react"
import { graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { normalizeString } from "../utils/functions"

import LanguageSwitcherContextProvider from "../components/context/language-switcher-context"

import Layout from "../components/layout/layout-default"
import Seo from "../components/seo"
import Card from "../components/card"
import Link from "../components/link"
import Field from "../components/field"

import * as styles from "../styles/pages/articles.module.scss"
import * as readMoreStyles from "../styles/read-more.module.scss"
import * as cardStyles from "../styles/card-view.module.scss"

const ArticlesPage = ({ data }) => {
  const { t, languages, originalPath } = useI18next()

  const edges = data.allNodeArticle.edges

  /**
   * @todo Use i18next to handle this, somehow.
   */
  const translations = []

  languages.forEach(langcode => {
    translations.push({
      node: {
        langcode,
        path: {
          alias: originalPath,
        },
      },
    })
  })

  return (
    <LanguageSwitcherContextProvider translations={translations}>
      <Layout title={t("Articles")}>
        <Seo title={t("Articles")} />
        <div>
          <div className={styles.view}>
            {edges ? (
              <ul className={styles.list}>
                {edges.map(edge => {
                  const node = edge.node

                  const renderedTitle = (
                    <Field labelHidden className={cardStyles.fieldTitle}>
                      {node.title}
                    </Field>
                  )
                  const renderedLink = (
                    <Link
                      to={`/${node.langcode}${normalizeString(
                        node.path.alias
                      )}`}
                      className={readMoreStyles.link}
                    >
                      {t("View article")}
                    </Link>
                  )
                  const media = node.relationships.field_media_image
                  const image = getImage(
                    media.relationships?.field_media_image?.localFile
                  )
                  const renderedImage = (
                    <GatsbyImage
                      image={image}
                      alt={media.field_media_image.alt}
                    />
                  )

                  return (
                    <li key={node.id}>
                      <Card
                        title={renderedTitle}
                        link={renderedLink}
                        content={renderedImage}
                        styles={cardStyles}
                      />
                    </li>
                  )
                })}{" "}
              </ul>
            ) : (
              `<p>${t("No articles.")}</p>`
            )}
          </div>
        </div>
      </Layout>
    </LanguageSwitcherContextProvider>
  )
}

export default ArticlesPage

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    nodeTypeNodeType(drupal_internal__type: { eq: "article" }) {
      id
      name
      description
      drupal_internal__type
    }
    allNodeArticle(
      filter: { langcode: { eq: $language }, promote: { eq: true } }
      sort: { order: [DESC, ASC], fields: [created, drupal_internal__nid] }
    ) {
      edges {
        node {
          ...ArticleCardQuery
        }
      }
    }
  }
`

export const ArticleCardQuery = graphql`
  fragment ArticleCardQuery on node__article {
    langcode
    id
    path {
      alias
    }
    title
    relationships {
      field_media_image {
        relationships {
          field_media_image {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  width: 1536
                  aspectRatio: 1.5
                  transformOptions: { cropFocus: CENTER }
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
    }
  }
`
