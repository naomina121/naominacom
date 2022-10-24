import React, { useState } from "react"
import { Link, graphql } from "gatsby"
//import TagCloud from "../components/tag-cloud"
import ModalSeach from "../components/modal-search"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { siteMetadata } from "../../gatsby-config"
import BreadCrumbList from "../components/breadcrumb-list"
import { BlogListWrapper, BlogListHeader } from "../style/blog-list-style"

//画像読み込み
import Img from "../components/img"

// import Pagination from "../components/pagination"

const TagList = ({ pageContext, data, location }) => {
  const { page, current, tag } = pageContext
  const { totalCount, nodes } = data.allMarkdownRemark
  const title = "記事一覧"
  const emptyQuery = ""


  const [state, setState] = useState({
    filteredData: [],
    query: emptyQuery,
  })

  const handleInputChange = event => {
   let query = ""
   query = event.target.value

   const posts = nodes || []

   const filteredData = posts.filter(post =>{
  if(query !== ''){
      const description = post.frontmatter.description
      const title = post.frontmatter.title
     return (
       description.toLowerCase().includes(query.toLowerCase()) ||
       title.toLowerCase().includes(query.toLowerCase())
       )
    }
  })

  setState({
     query,
     filteredData,
   })
 }

 const { filteredData, query } = state
 const hasSearchResults = filteredData && query !== emptyQuery
 const posts = hasSearchResults ? filteredData : nodes
  return (
    <Layout location={location} title={tag}>
      <BreadCrumbList parent="tags" location={location} title={tag} />

      <BlogListHeader>
        <h1>{tag}</h1>
        <p>現在 {posts.length} 記事あります</p>
<div className="search">
        <input
          name="search_text"
   				type="text"
   				aria-label="Search"
   				placeholder="検索ワードを入力..."
          onChange={handleInputChange}
   			/>
        </div>
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
                  className="thumbnail"
                >
                  <Img alt={title} image={post.frontmatter.hero}></Img>
                </Link>
                <section>
                  <small>
                    <time dateTime={post.frontmatter.date}>
                      {post.frontmatter.date}
                    </time>
                  </small>
                <h2>
                  <Link to={post.fields.slug}>
                    <span>{title}</span>
                  </Link>
                </h2>
                <Link className="cate" to={`/blogs/${cate}/`}>{cateName}</Link>
                  {/* <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                  /> */}
                </section>
              </article>
            </li>
          )
        })}
      </BlogListWrapper>
      {/* <Pagination num={page} current={current} type={`tags/${tag}`} ></Pagination> */}
      {/* <h2>サイト内検索</h2>
      <ModalSeach></ModalSeach> */}
            {/* <BlogListHeader>
        <h2>タグクラウド</h2>
        <p>現在投稿中のジャンルの記事たちです</p>
      </BlogListHeader>
      <TagCloud></TagCloud> */}
    </Layout>
  )
}

export default TagList
export const Head = ({ data,location,pageContext }) => (
      <Seo
        title={pageContext.tag + " | ナオのメンタルヘルス"}
        location={location}
        type="tag-list"
        description={`${pageContext.tag}の一覧記事です。`}
      />
)

export const pageQuery = graphql`
  query ($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
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
