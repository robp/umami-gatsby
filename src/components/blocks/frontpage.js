import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { normalizeString } from "../../utils/functions"

import Field from "../field"
import Block from "../block"
import Card from "../card"
import Link from "../link"

import * as styles from "../../styles/blocks/frontpage.module.scss"
import * as readMoreStyles from "../../styles/read-more.module.scss"
import * as cardStyles from "../../styles/card.module.scss"

const FrontpageBlock = () => {
  const { t, language } = useI18next()

  const query = useStaticQuery(graphql`
    query {
      allNodeRecipe(
        filter: { promote: { eq: true } }
        sort: { fields: [sticky, created], order: [DESC, DESC] }
      ) {
        edges {
          node {
            ...RecipeCard
          }
        }
      }
    }
  `)

  let nodes = []

  for (const [, edge] of query.allNodeRecipe.edges.entries()) {
    if (edge.node.langcode === language) {
      nodes.push(edge.node)
      // Only save four nodes.
      if (nodes.length === 4) {
        break
      }
    }
  }

  return (
    <div>
      <Block
        title={t(
          "Explore recipes across every type of occasion, ingredient, and skill level"
        )}
        titleClassName={styles.blockTitle}
        className={styles.block}
        locations={[/^\/$/]}
      >
        <ul className={styles.list}>
          {nodes.map(node => {
            const renderedTitle = (
              <Field labelHidden className={cardStyles.fieldTitle}>
                {node.title}
              </Field>
            )

            const renderedLink = (
              <Link
                to={`/${node.langcode}${normalizeString(node.path.alias)}`}
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
              <GatsbyImage image={image} alt={media.field_media_image.alt} />
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
          })}
        </ul>
      </Block>
    </div>
  )
}

export default FrontpageBlock
