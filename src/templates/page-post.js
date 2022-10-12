import * as React from "react"
import { Link, graphql } from "gatsby"
import TagCloud from "../components/tag-cloud"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import BreadCrumbList from "../components/breadcrumb-list"

import styled from "styled-components"

const PagePostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        location={location}
      />
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
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
        </header>
        <BlogEntry
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
      </Article>
    </Layout>
  )
}

export default PagePostTemplate

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
`
