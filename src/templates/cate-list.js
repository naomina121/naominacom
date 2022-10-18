import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import BreadCrumbList from "../components/breadcrumb-list"
import { BlogListWrapper, BlogListHeader } from "../style/blog-list-style"
//import TagCloud from "../components/tag-cloud"
import ModalSeach from "../components/modal-search"
//画像読み込み
import Img from "../components/img"
// 追加
import { siteMetadata } from "../../gatsby-config"

import Pagination from "../components/pagination"

const CateList = ({ pageContext, data, location }) => {
  const { page, current, cateSlug } = pageContext
  const { nodes } = data.allMarkdownRemark
  const posts = nodes

  const cate = siteMetadata.category.find(item => item.slug === cateSlug)

  if (posts.length === 0) {
    return (
      <Layout location={location} title="記事一覧">
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={cate.name}>
      <BreadCrumbList parent="blogs" location={location} title={cate.name} />
      <BlogListHeader>
        <h1>{cate.name}</h1>
        <p>{cate.description}</p>
      </BlogListHeader>
      <BlogListWrapper>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
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
                <h2>
                  <Link to={post.fields.slug}>
                    <span>{title}</span>
                  </Link>
                </h2>

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
      <Pagination num={page} current={current} type={cateSlug} ></Pagination>
      <h2>サイト内検索</h2>
      <ModalSeach></ModalSeach>
            {/* <BlogListHeader>
        <h2>タグクラウド</h2>
        <p>現在投稿中のジャンルの記事たちです</p>
      </BlogListHeader>
      <TagCloud></TagCloud> */}
    </Layout>
  )
}

export default CateList

export const Head = ({ data,location,pageContext }) => (

   <Seo
     location={location}
     title={`${siteMetadata.category.find(item => item.slug === pageContext.cateSlug).name + " | ナオのメンタルヘルス"}`}
     description={`${siteMetadata.category.find(item => item.slug === pageContext.cateSlug).name}の一覧記事です。${siteMetadata.category.find(item => item.slug === pageContext.cateSlug).description}`}
     type="list-child"
   />
)

export const pageQuery = graphql`
  query ($cateSlug: String, $limit: Int!, $skip: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
      # pagetype=blogかつ cateが $cateSlugと一致するものだけ絞り込む
      filter: {
        frontmatter: { pagetype: { eq: "blog" }, cate: { eq: $cateSlug } }
      }
    ) {
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
