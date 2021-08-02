import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => {
  const pages = useStaticQuery(graphql`
    query {
      allSitePage {
        edges {
          node {
            path
            id
          }
        }
        totalCount
      }
    }
  `)

  return (
    <Layout>
      <Seo title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <StaticImage
        src="../images/gatsby-astronaut.png"
        width={300}
        quality={95}
        formats={["AUTO", "WEBP", "AVIF"]}
        alt="A Gatsby astronaut"
        style={{ marginBottom: `1.45rem` }}
      />
      <p>
        <Link to="/page-2/">Go to page 2</Link> <br />
        <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
      </p>

      <h2>{pages.allSitePage.totalCount} Pages</h2>
      <ul>
        {pages.allSitePage.edges.map(edge => {
          return (
            <li key={edge.node.id}>
              <a href={edge.node.path}>{edge.node.path}</a>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default IndexPage
