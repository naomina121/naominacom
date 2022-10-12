import * as React from "react"
import TagCloud from "../components/tag-cloud"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import BreadCrumbList from "../components/breadcrumb-list"

const TagsList = ({ location }) => {

  return (
    <Layout location={location} title="ナオのメンタルヘルス">
      <Seo
        title="タグ一覧"
        description="全タグ一覧ページです"
        location={location}
      />
      <article
        className="tags-list"
        itemScope
        itemType="http://schema.org/Article"
      >
        <BreadCrumbList
          location={location}
          title="タグ一覧"
        />
        <header>
          <h1 itemProp="headline">タグ一覧</h1>
        </header>
        <TagCloud></TagCloud>
      </article>
    </Layout>
  )
}

export default TagsList

// export const pageQuery = graphql`
//   query PagePostBySlug($id: String!) {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//     markdownRemark(id: { eq: $id }) {
//       id
//       excerpt(pruneLength: 160)
//       html
//       tableOfContents(maxDepth: 3)
//       frontmatter {
//         title
//         date(formatString: "YYYY-MM-DD")
//         description
//         cate
//         tags
//       }
//     }
//   }
// `
