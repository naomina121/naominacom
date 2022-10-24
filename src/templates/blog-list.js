import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import { siteMetadata } from "../../gatsby-config"
import Layout from "../components/layout"
import Seo from "../components/seo"
//import TagCloud from "../components/tag-cloud"
import ModalSeach from "../components/modal-search"
import BreadCrumbList from "../components/breadcrumb-list"

import { BlogListWrapper, BlogListHeader } from "../style/blog-list-style"

//画像読み込み
import Img from "../components/img"
//import Pagination from "../components/pagination"

const BlogList = ({ pageContext, data, location }) => {

  const { page, current } = pageContext
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
    if(query !== '' && event.target.name != 'search_text'){
    const tags = post.frontmatter.tags
    return(
      tags.includes(query)
    )
    }else if(query !== '' && event.target.name == 'search_text'){
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
    <Layout location={location} title={title}>
    <BreadCrumbList parent="root" location={location} title={title} />
      <BlogListHeader>
        <h1>{title}</h1>
        <p>現在 {posts.length} 記事あります</p>
        <div className="ganre">
        <div className="radio"><input type="radio" id="all" name="tags" className="tags" value="" onChange={handleInputChange} /><label className="radio-label" for="all">全記事取得</label></div>

        <div className="radio"><input type="radio" id="knowledge" name="tags" className="tags" value="知識" onChange={handleInputChange} /><label className="radio-label" for="knowledge">知識系のみ</label></div>

        <div class="radio"><input type="radio" id="newssource" name="tags" className="tags" value="ネタ" onChange={handleInputChange} /><label for="newssource" className="radio-label"
        >ネタ系のみ</label></div>
        </div>
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
                </section>

                <Link className="cate" to={`/blogs/${post.frontmatter.cate}/`}>{cateName}</Link>

                <ul className='tags'>
                  {tags.map((tag, index) => {
                    return (
                      <li key={`tag${index}`}>
                          <Link className="tag" to={`/blogs/tags/${tag}/`}>{tag}</Link>
                      </li>
                    )
                })}
                </ul>
                  {/* <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                  /> */}
              </article>
            </li>
          )
        })}
      </BlogListWrapper>
     {/* <Pagination num={page} current={current} type=""></Pagination> */}
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

export default BlogList

  export const Head = ({ data,location }) => (
   <Seo
     location={location}
     title="記事一覧 | ナオのメンタルヘルス"
     description="記事一覧です"
     type="blog-list"
   />
)

export const pageQuery = graphql`
  query{
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
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
