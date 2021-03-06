import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"

import Block from "../block"

import * as styles from "../../styles/blocks/disclaimer.module.scss"

const DisclaimerBlock = () => {
  const { language, defaultLanguage } = useI18next()

  const query = useStaticQuery(graphql`
    query {
      allBlockContentDisclaimerBlock {
        edges {
          node {
            ...DisclaimerBlock
          }
        }
      }
    }
  `)

  let block = {}
  let defaultBlock = {}

  query.allBlockContentDisclaimerBlock.edges.forEach(edge => {
    if (edge.node.langcode === language) {
      block = edge.node
    }
    if (edge.node.langcode === defaultLanguage) {
      defaultBlock = edge.node
    }
  })

  // Use the defaultLanguage version if a native version doesn't exist.
  block = block || defaultBlock

  return (
    <Block className={styles.block} locations={[/.*/]}>
      <div
        className={styles.disclaimer}
        dangerouslySetInnerHTML={{ __html: block.field_disclaimer.processed }}
      />
      <div
        className={styles.copyright}
        dangerouslySetInnerHTML={{ __html: block.field_copyright.processed }}
      />
    </Block>
  )
}

export default DisclaimerBlock

export const DisclaimerBlockFragments = graphql`
  fragment DisclaimerBlock on block_content__disclaimer_block {
    id
    langcode
    status
    field_copyright {
      processed
      value
      format
    }
    field_disclaimer {
      processed
      value
      format
    }
    info
  }
`
