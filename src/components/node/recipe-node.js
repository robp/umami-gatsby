import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import classNames from "classnames"
import { useTranslation } from "gatsby-plugin-react-i18next"

import { capitalizeFirstLetter } from "../../utils/functions"

import Field from "../field"
import RecipeCategories from "../recipe/categories"
import Tags from "../tags"
import MediaImage from "../media-image"
import Ingredients from "../recipe/ingredients"
import Instructions from "../recipe/instructions"

import * as nodeStyles from "../../styles/node.module.scss"
import * as recipeStyles from "../../styles/templates/recipe.module.scss"
import * as fieldStyles from "../../styles/field.module.scss"
import * as layoutStyles from "../../styles/layout.module.scss"

const RecipeNode = ({ node, canonicalUrl }) => {
  const { t } = useTranslation()
  return (
    <article
      about={canonicalUrl}
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
            <Tags lang={node.langcode} data={node.relationships.field_tags} />
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
  )
}

RecipeNode.propTypes = {
  node: PropTypes.object.isRequired,
  canonicalUrl: PropTypes.string.isRequired,
}

export default RecipeNode

export const RecipeFragments = graphql`
  fragment RecipeNode on node__recipe {
    langcode
    id
    title
    field_cooking_time
    field_difficulty
    field_ingredients
    field_number_of_servings
    field_preparation_time
    field_recipe_instruction {
      processed
    }
    field_summary {
      processed
      value
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
      field_recipe_category {
        id
        name
        path {
          alias
        }
      }
      field_tags {
        id
        name
        path {
          alias
        }
      }
    }
  }
`
