import React from "react"
import { graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { normalizeString, capitalizeFirstLetter } from "../utils/functions"

import PageContextProvider from "../components/context/page-context"
import LanguageSwitcherContextProvider from "../components/context/language-switcher-context"

import Layout from "../components/layout/layout-default"
import Seo from "../components/seo"
import Card from "../components/card"
import Link from "../components/link"
import Field from "../components/field"

import * as styles from "../styles/pages/recipes.module.scss"
import * as readMoreStyles from "../styles/read-more.module.scss"
import * as cardStyles from "../styles/card-view.module.scss"

const RecipesPage = ({ pageContext, data }) => {
  const { t, languages, originalPath } = useI18next()

  const edges = data.allNodeRecipe.edges

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
    <PageContextProvider pageContext={pageContext}>
      <LanguageSwitcherContextProvider translations={translations}>
        <Layout title={t("Recipes")}>
          <Seo title={t("Recipes")} />
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
                        {t("View recipe")}
                      </Link>
                    )
                    const media = node.relationships.field_media_image
                    const image = getImage(
                      media.relationships?.field_media_image?.localFile
                    )
                    const renderedImage = (
                      <Field label={t("Image")} labelHidden>
                        <GatsbyImage
                          image={image}
                          alt={media.field_media_image.alt}
                        />
                      </Field>
                    )
                    const difficulty = (
                      <Field
                        labelItems
                        labelInline
                        label={`${t("Difficulty")}:`}
                        className={cardStyles.labelItems}
                      >
                        {capitalizeFirstLetter(t(node.field_difficulty))}
                      </Field>
                    )

                    return (
                      <li key={node.id}>
                        <Card
                          title={renderedTitle}
                          link={renderedLink}
                          content={[difficulty, renderedImage]}
                          styles={cardStyles}
                        />
                      </li>
                    )
                  })}{" "}
                </ul>
              ) : (
                `<p>${t("No recipes.")}</p>`
              )}
            </div>
          </div>
        </Layout>
      </LanguageSwitcherContextProvider>
    </PageContextProvider>
  )
}

export default RecipesPage

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
    allNodeRecipe(
      filter: { langcode: { eq: $language }, promote: { eq: true } }
      sort: { fields: [created, drupal_internal__nid], order: [DESC, ASC] }
    ) {
      edges {
        node {
          ...RecipeCard
        }
      }
    }
  }
`
