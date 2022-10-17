import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Img from "../components/img"
import { BlogListWrapper, BlogListHeader } from "../style/blog-list-style"
import TagCloud from "../components/tag-cloud"
import ModalSeach from "../components/modal-search"
import { siteMetadata } from "../../gatsby-config"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <BlogListHeader>
        <h2>最新記事</h2>
      </BlogListHeader>
      <BlogListWrapper>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          const cate = post.frontmatter.cate
          const cateName = siteMetadata.category.find(item => item.slug === cate).name
          const tags = post.frontmatter.tags
          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <Link
                  to={post.fields.slug}
                  className="thumbnail"
                >
                  <Img alt={title} image={post.frontmatter.hero}></Img>
                  <small>
                    <time dateTime={post.frontmatter.date}>
                      {post.frontmatter.date}
                    </time>
                  </small>
                </Link>
                <section>
                <h3>
                  <Link to={post.fields.slug}>
                    <span>{title}</span>
                  </Link>
                </h3>
                <Link className="cate" to={`/blogs/${cate}/`}>{cateName}</Link>

                <ul className='tags'>
                  {tags.map((tag, index) => {
                    return (
                      <li key={`tag${index}`}>
                          <Link className="tag" to={`/blogs/tags/${tag}/`}>{tag}</Link>
                      </li>
                    )
                })}
                </ul>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                  />
                </section>
              </article>
            </li>
          )
        })}
      </BlogListWrapper>
      <Link to="/blogs/" className="morePosts">もっと記事を見る</Link>
      <h2>サイト内検索</h2>
      <ModalSeach></ModalSeach>
            <BlogListHeader>
        <h2>タグクラウド</h2>
        <p>現在投稿中のジャンルの記事たちです</p>
      </BlogListHeader>
      <TagCloud></TagCloud>
    </Layout>






  )
}

export default BlogIndex

export const Head = ({ data,location }) => (
   <Seo
     title={data.site.siteMetadata.title}
     location={location}
   />
)

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 3
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { pagetype: { eq: "blog" } } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
          description
          hero
          cate
          tags
        }
      }
    }
  }
`
