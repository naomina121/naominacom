import * as React from "react"
import { Link, graphql } from "gatsby"
//import TagCloud from "../components/tag-cloud"
//import { GatsbyImage, getImage } from "gatsby-plugin-image"
import TOC from "../components/table-of-content"
import Layout from "../components/layout"
import Seo from "../components/seo"
import BreadCrumbList from "../components/breadcrumb-list"

import styled from "styled-components"

const PagePostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const image = data.site.siteMetadata?.title || `Title`
  return (
    <Layout location={location} title={siteTitle}>
      <Article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <BreadCrumbList
          location={location}
          title={post.frontmatter.title}
        />
        <header>
          <h1>{post.frontmatter.title}</h1>
          <TOC data={data.markdownRemark.tableOfContents} />
        </header>

        <BlogEntry
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </Article>
    </Layout>
  )
}

export default PagePostTemplate

export const Head = ({ data,location }) => (
   <Seo
     title={data.markdownRemark.frontmatter.title + " | ナオのメンタルヘルス"}
     description={data.markdownRemark.frontmatter.description || data.markdownRemark.excerpt}
     location={location}
   />
)

export const pageQuery = graphql`
  query PagePostBySlug($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      tableOfContents(maxDepth: 3)
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        description
        cate
        tags
      }
    }
    allFile {
      edges {
        node {
          publicURL
          relativePath
          childImageSharp {
            gatsbyImageData(
              width: 640
              formats: [AUTO, WEBP, AVIF]
              placeholder: BLURRED
            )
          }
        }
      }
    }
  }
`

const Article = styled.article`
  max-width: 750px;
  margin: 0 auto;
`
const BlogEntry = styled.section`
  margin: 15px 0 30px;
  h3{
      background:#f5f0dd;
  border:none;
  padding:15px;
  border-radius:6px;
  }
  ul{
    background: #fffaeb;
    padding: 30px;
    border: 3px solid #bb9d27;
    li{
      margin:0;
      list-style:none;
      border-bottom:1px dotted #ccc;
      padding:5px;
      color:#816a0f;
      font-weight:600;
      a{
        color:#3f51b5;
      }
    }
  }
`
