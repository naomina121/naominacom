import * as React from "react"
import { Link, graphql } from "gatsby"
import TagCloud from "../components/tag-cloud"
import ModalSeach from "../components/modal-search"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { siteMetadata } from "../../gatsby-config"
import BreadCrumbList from "../components/breadcrumb-list"
import { BlogListWrapper, BlogListHeader } from "../style/blog-list-style"

//画像読み込み
import Img from "../components/img"

import Pagination from "../components/pagination"

const TagList = ({ pageContext, data, location }) => {
  const { page, current, tag } = pageContext
  const { totalCount, nodes } = data.allMarkdownRemark
  const posts = nodes
  const title = "記事一覧"

  if (posts.length === 0) {
    return (
      <Layout location={location} title={title}>
        <Seo title="All posts" location={location} />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={tag}>
      <Seo
        title={tag}
        location={location}
        type="tag-list"
        discription={`${tag}一覧記事です。`}
      />
      <BreadCrumbList parent="tags" location={location} title={tag} />

      <BlogListHeader>
        <h1>{tag}</h1>
        <p>現在 {totalCount} 記事あります</p>
      </BlogListHeader>
      <BlogListWrapper>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          const cate = post.frontmatter.cate
          const cateName = siteMetadata.category.find(item => item.slug === cate).name
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
                <Link className="cate" to={`/blogs/${cate}/`}>{cateName}</Link>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </BlogListWrapper>
      <Pagination num={page} current={current} type={`tags/${tag}`} ></Pagination>
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

export default TagList

export const pageQuery = graphql`
  query ($tag: String, $limit: Int!, $skip: Int!) {
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
      filter: {
        frontmatter: { pagetype: { eq: "blog" }, tags: { in: [$tag] } }
      }
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
          # 画像を引っ張り出すのに使います
          hero
          # カテゴリーやタグを出力したいなら
          cate
          tags
        }
      }
    }
  }
`
