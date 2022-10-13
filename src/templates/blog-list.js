import * as React from "react"
import { Link, graphql } from "gatsby"
import { siteMetadata } from "../../gatsby-config"
import Layout from "../components/layout"
import Seo from "../components/seo"
import TagCloud from "../components/tag-cloud"
import ModalSeach from "../components/modal-search"

import { BlogListWrapper, BlogListHeader } from "../style/blog-list-style"

//画像読み込み
import Img from "../components/img"
import Pagination from "../components/pagination"

const BlogList = ({ pageContext, data, location }) => {

  const { page, current } = pageContext
  const { totalCount, nodes } = data.allMarkdownRemark
  const posts = nodes
  const title = "記事一覧"

  if (posts.length === 0) {
    return (
      <Layout location={location} title={title}>
        <Seo title="All posts" location={location} type="list" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={title}>
      <Seo
        title={title}
        location={location}
        description="記事一覧です。"
        type="blog-list"
      />
      <BlogListHeader>
        <h1>{title}</h1>
        <p>現在 {totalCount} 記事あります</p>
      </BlogListHeader>
      <BlogListWrapper>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          const cateName = siteMetadata.category.find(item => item.slug === post.frontmatter.cate).name
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
                  itemProp="url"
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
                <h2>
                  <Link to={post.fields.slug} itemProp="url">
                    <span itemProp="headline">{title}</span>
                  </Link>
                </h2>
                </section>

                <Link className="cate" to={`/blogs/${post.frontmatter.cate}/`}>{cateName}</Link>

                <ul class="tags">
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
                    itemProp="description"
                  />
              </article>
            </li>
          )
        })}
      </BlogListWrapper>
     <Pagination num={page} current={current} type=""></Pagination>
          <h2>サイト内検索</h2>
      <ModalSeach></ModalSeach>
            <BlogListHeader>
        <h2>タグクラウド</h2>
        <p>現在投稿中のジャンルの記事たちです</p>
      </BlogListHeader>
      <TagCloud></TagCloud>
      <h2>音声配信</h2>
<iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameborder="0" width="100%" height="450" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.podcasts.apple.com/us/podcast/%E3%83%8A%E3%82%AA%E3%81%AE%E3%83%A1%E3%83%B3%E3%82%BF%E3%83%AB%E3%83%98%E3%83%AB%E3%82%B9%E3%83%A9%E3%82%B8%E3%82%AA/id1649348148"></iframe>
    </Layout>
  )
}

export default BlogList

export const pageQuery = graphql`
  query ($limit: Int!, $skip: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
      # pagetype=blogで絞り込む
      filter: { frontmatter: { pagetype: { eq: "blog" } } }
      ) {
      # 記事総数取得
      totalCount
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY.MM.DD")
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
