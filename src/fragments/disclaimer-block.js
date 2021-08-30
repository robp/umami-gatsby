import { graphql } from "gatsby"

export const DisclaimerBlockFragment = graphql`
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
