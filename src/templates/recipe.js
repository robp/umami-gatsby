import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import classNames from "classnames"
import { useI18next } from "gatsby-plugin-react-i18next"

import { capitalizeFirstLetter } from "../utils/functions"

import LanguageSwitcherContextProvider from "../components/context/language-switcher-context"
import Layout from "../components/layout/layout-node"
import Seo from "../components/seo"
import Field from "../components/field"
import RecipeCategories from "../components/recipe/categories"
import Tags from "../components/tags"
import MediaImage from "../components/media-image"
import Ingredients from "../components/recipe/ingredients"
import Instructions from "../components/recipe/instructions"

import * as nodeStyles from "../styles/node.module.scss"
import * as recipeStyles from "../styles/templates/recipe.module.scss"
import * as fieldStyles from "../styles/field.module.scss"
import * as layoutStyles from "../styles/layout.module.scss"

const Recipe = ({ location, data }) => {
  const { t } = useI18next()
  const node = data.nodeRecipe
  const translations = data.allNodeRecipe.edges

  return (
    <LanguageSwitcherContextProvider translations={translations}>
      <Layout title={node.title}>
        <Seo
          lang={node.langcode}
          title={node.title}
          description={node.field_summary.value}
        />
        <article
          about={location.pathname}
          typeof="schema:Recipe"
          className={classNames(nodeStyles.node, nodeStyles.viewModeFull)}
        >
          <header className={nodeStyles.header}>
            <h1>
              <Field labelHidden property="schema:name">
                {node.title}
              </Field>
            </h1>
          </header>
          <div className={nodeStyles.content}>
            <div className={layoutStyles.oneColumn}>
              <div className={layoutStyles.region}>
                <RecipeCategories
                  lang={node.langcode}
                  data={node.relationships.field_recipe_category}
                />
                <Tags
                  lang={node.langcode}
                  data={node.relationships.field_tags}
                />
                <Field
                  labelHidden
                  className={classNames("clearfix", fieldStyles.summary)}
                  html={node.field_summary?.processed}
                />
              </div>
            </div>
            <div
              className={classNames(
                layoutStyles.onePlusFourGridSection,
                nodeStyles.onePlusFourGridSection
              )}
            >
              <div
                className={classNames(
                  layoutStyles.region,
                  layoutStyles.regionFirst
                )}
              >
                <Field labelHidden className={nodeStyles.mediaImage}>
                  <MediaImage media={node.relationships.field_media_image} />
                </Field>
              </div>
              <div className={layoutStyles.fourGridGroup}>
                <div
                  className={classNames(
                    layoutStyles.region,
                    layoutStyles.regionSecond
                  )}
                >
                  <Field
                    labelInline
                    label={t("Preparation time")}
                    className={classNames(
                      "clearfix",
                      recipeStyles.fieldPreperationTime,
                      nodeStyles.fieldPreperationTime
                    )}
                    labelClassName={nodeStyles.label}
                    itemClassName={nodeStyles.item}
                  >
                    {node.field_preparation_time} {t("minutes")}
                  </Field>
                </div>
                <div
                  className={classNames(
                    layoutStyles.region,
                    layoutStyles.regionThird
                  )}
                >
                  <Field
                    labelInline
                    label={t("Cooking time")}
                    className={classNames(
                      "clearfix",
                      recipeStyles.fieldCookingTime,
                      nodeStyles.fieldCookingTime
                    )}
                    labelClassName={nodeStyles.label}
                    itemClassName={nodeStyles.item}
                  >
                    {node.field_cooking_time} {t("minutes")}
                  </Field>
                </div>
                <div
                  className={classNames(
                    layoutStyles.region,
                    layoutStyles.regionFourth
                  )}
                >
                  <Field
                    labelInline
                    label={t("Number of servings")}
                    className={classNames(
                      "clearfix",
                      recipeStyles.fieldNumberOfServings,
                      nodeStyles.fieldNumberOfServings
                    )}
                    labelClassName={nodeStyles.label}
                    itemClassName={nodeStyles.item}
                  >
                    {node.field_number_of_servings}
                  </Field>
                </div>
                <div
                  className={classNames(
                    layoutStyles.region,
                    layoutStyles.regionFifth
                  )}
                >
                  <Field
                    labelInline
                    label={t("Difficulty")}
                    className={classNames(
                      "clearfix",
                      recipeStyles.fieldDifficulty,
                      nodeStyles.fieldDifficulty
                    )}
                    labelClassName={nodeStyles.label}
                    itemClassName={nodeStyles.item}
                  >
                    {capitalizeFirstLetter(node.field_difficulty)}
                  </Field>
                </div>
              </div>
            </div>

            <div
              className={classNames(
                layoutStyles.twoColSection,
                layoutStyles.twoColSection3367
              )}
            >
              <div
                className={classNames(
                  layoutStyles.region,
                  layoutStyles.regionFirst
                )}
              >
                <Ingredients data={node.field_ingredients} />
              </div>
              <div
                className={classNames(
                  layoutStyles.region,
                  layoutStyles.regionSecond
                )}
              >
                <Instructions data={node.field_recipe_instruction} />
              </div>
            </div>
          </div>
        </article>
      </Layout>
    </LanguageSwitcherContextProvider>
  )
}

Recipe.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Recipe

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
    nodeRecipe(id: { eq: $nodeId }) {
      ...RecipeNode
    }
    allNodeRecipe(filter: { drupal_internal__nid: { eq: $internalNid } }) {
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
