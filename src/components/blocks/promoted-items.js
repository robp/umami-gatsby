import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"
import classNames from "classnames"

import Block from "../block"
import Card from "../card"

import { container } from "../../styles/layout.module.scss"
import * as styles from "../../styles/blocks/promoted-items.module.scss"

const PromotedItemsBlock = () => {
  const { t, language } = useI18next()

  const query = useStaticQuery(graphql`
    query {
      allNodeArticle(
        filter: { promote: { eq: true } }
        sort: { fields: created, order: DESC }
      ) {
        edges {
          node {
            langcode
            id
            drupal_internal__nid
            path {
              alias
            }
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
                          width: 850
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
              field_tags {
                id
                name
                path {
                  alias
                }
              }
            }
          }
        }
      }
    }
  `)

  let nodes = []

  for (const [index, edge] of query.allNodeArticle.edges.entries()) {
    if (edge.node.langcode === language) {
      console.log(edge.node.title)
      nodes.push(edge.node)
      // Only save the first node.
      break
    }
  }

  return (
    <Block className={styles.block} locations={["/"]}>
      <div className={classNames(container, styles.container)}>
        <ul className={styles.list}>
          {nodes.map(node => {
            return (
              <li key={node.id}>
                <Card data={node} />
              </li>
            )
          })}
        </ul>
      </div>
    </Block>
  )
}

export default PromotedItemsBlock
