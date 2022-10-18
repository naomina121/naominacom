import * as React from "react"
import { Link, graphql } from "gatsby"
import ModalSeach from "../components/modal-search"
import { BlogListWrapper, BlogListHeader } from "../style/blog-list-style"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Share from '../components/share';
import TOC from "../components/table-of-content"
//import TagCloud from "../components/tag-cloud"
import BreadCrumbList from "../components/breadcrumb-list"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from "@fortawesome/free-solid-svg-icons"
import { faPen } from "@fortawesome/free-solid-svg-icons"
import { faClock } from "@fortawesome/free-solid-svg-icons"
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons"
import { faTag } from "@fortawesome/free-solid-svg-icons"

import { GatsbyImage, getImage } from "gatsby-plugin-image"
import RetatedList from "../components/related-list"
import styled from "styled-components"

import { siteMetadata } from "../../gatsby-config"

import rehypeReact from "rehype-react"
import LinkCard from "../components/blog-parts/link-card"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    card: LinkCard,
  },
}).Compiler

const BlogPostTemplate = ({ data, location }) => {
    const post = data.markdownRemark
    const readingTime = post.fields.readingTime
    const { minutes, words } = readingTime;
  const siteTitle = data.site.siteMetadata?.title || `ナオのメンタルヘルス`
  const { previous, next } = data
  const keyVisual = data.allFile.edges[0].node.childImageSharp
  const { cate, tags } = data.markdownRemark.frontmatter
  const cateName = siteMetadata.category.find(item => item.slug === cate).name
  const image = post.frontmatter.hero
  const ogpImg = data.allFile.edges[0].node.publicURL

  return (
   <Layout location={location} title={siteTitle}>
      <Article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
      <BreadCrumbList
        parent={post.frontmatter.cate}
        location={location}
        title={post.frontmatter.title}
        cate={post.frontmatter.cate}
      />
      <div
            className="countdown"
            style={{
              padding: 5,
              marginTop:40,
              background: '#e8e7e7',
            }}
          ><p><FontAwesomeIcon icon={faClock} /> この記事は<b>{words}文字</b>で<b>約{Math.round(minutes * 10) / 10}分</b>で読めます</p>

      </div>
        <header>
          <div className="time">
          <p className="date">
            <FontAwesomeIcon icon={faPen} />
            <time dateTime={post.frontmatter.date}>
              {post.frontmatter.date}
            </time>
            &ensp;作成
          </p>
          &emsp;
          <p className="modifieddate">
            <FontAwesomeIcon icon={faRotateRight} />
            <time dateTime={post.frontmatter.modifieddate}>
              {post.frontmatter.modifieddate}
            </time>
            &ensp;更新日
          </p>
          </div>
          <ul className="information">
              <li className="cate">
                <FontAwesomeIcon className={cate} icon={faFolderOpen} />
                <Link to={`/blogs/${cate}/`} className={`category ${cate}`} >{cateName}</Link></li>
              <li className="tags">
                <ul>
                    {tags.map((tag, index) => {
                    return (
                    <li key={`tag${index}`}>
                    <FontAwesomeIcon icon={faTag} />
                    <Link to={`/blogs/tags/${tag}/`} className={`tag`}>{tag}</Link>
                    </li>
                    )
                    })}
                  </ul>
              </li>
          </ul>
          <h1>{post.frontmatter.title}</h1>
          <Share postPath={post.fields.slug} postNode={post} />
          <div className="keyvisual">
            <GatsbyImage
              image={getImage(keyVisual)}
              alt={post.frontmatter.title}
              key={post.frontmatter.title}
            />
          </div>
        </header>

        <TOC data={data.markdownRemark.tableOfContents} />
        <BlogEntry className="articleBody">{renderAst(post.htmlAst)}</BlogEntry>

        <BlogEntry
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <footer>
          <Bio />
        </footer>
      </Article>
      <BlogPostNav>
        <ul>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </BlogPostNav>
      <RetatedList
        category={cate}
        slug={post.fields.slug}
        tags={tags}
      ></RetatedList>
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

export default BlogPostTemplate

  export const Head = ({ data,location }) => (
   <Seo
     location={location}
     title={data.markdownRemark.frontmatter.title + " | ナオのメンタルヘルス"}
     description={data.markdownRemark.frontmatter.description || data.markdownRemark.excerpt}
     ogpImgPath={data.allFile.edges[0].node.publicURL}
     type="blog"
   />
)

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
    $hero: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    allFile(
      filter: {
        relativePath: { eq: $hero }
        sourceInstanceName: { eq: "images" }
      }
    ) {
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
    markdownRemark(id: { eq: $id } ) {
      id
      excerpt(pruneLength: 160)
      htmlAst
      tableOfContents(maxDepth: 3)
      fields {
        slug
        readingTime {
          words
          minutes
        }
      }
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        description
        modifieddate(formatString: "YYYY-MM-DD")
        cate
        tags
        hero
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`

const Article = styled.article`
  max-width: 750px;
  margin: 0 auto;
  .time{
    justify-content: right;
    display:flex;
    margin-bottom:-25px;
    margin-top:30px;
    color:#6e6d6d;
    font-size:14px;
    @media (max-width: 768px) {
    }
    @media (max-width: 360px) {
    }
    p{
      time{
        display:inline-block;
        padding-left:5px;
      }
    }
  }
  .keyvisual {
    text-align: center;
  }
`
const BlogEntry = styled.section`
  margin: 15px 0 30px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`
const BlogPostNav = styled.nav`
  max-width: 750px;
  margin: 0 auto;
  ul {
    display: flex;
    justify-content: space-between;
    list-style: none;
  }
`

