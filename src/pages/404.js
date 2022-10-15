import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import BreadCrumbList from "../components/breadcrumb-list"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
    const title = "404"


  return (
    <Layout location={location} title={siteTitle}>
      <BreadCrumbList parent="root" location={location} title={title} />
      <h1>404: Not Found</h1>
      <p>お探しのページは見つかりませんでした</p>
    </Layout>
  )
}

export const Head = ({ data,location }) => (
   <Seo
     title={"404 Not Found | ナオのメンタルヘルス"}
     location={location}
   />
)

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
