import * as React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import { siteMetadata } from "../../gatsby-config"


const BreadCrumbList = ({ parent, title,location,cate}) => {
  let List = [{ lo: "/", title: "ホーム" }]
  if (parent === "blogs") {
    List = [...List, { lo: "/blogs/", title: "記事一覧" }]
  } else if(cate){
    const cateName = siteMetadata.category.find(item => item.slug === cate).name
    const cateSlug = "/" + siteMetadata.category.find(item => item.slug === cate).slug + "/"
    List = [...List,{lo:"/blogs/",title:"記事一覧"},{lo:cateSlug,title:cateName}]
  } else if(parent === "tags"){
    List = [...List,{lo:"/blogs/",title:"記事一覧"},{lo:"/tags/",title:"タグ一覧"}]

  }
  return (
    <BreadCrumbNav>
      <ol itemscope itemtype="https://schema.org/BreadcrumbList">
        {List.map((item, index) => {
          let link
          if(cate && index == 2){
              link = <Link href={"/blogs" + item.lo}>
                <span>{item.title}</span>
              </Link>
          }else if(parent === "tags" && index == 2){
              link = <Link href={"/blogs" + item.lo}>
                <span>{item.title}</span>
              </Link>
          }
          else{
                link = <Link to={item.lo}>
                <span>{item.title}</span>
              </Link>
          }
          return (
            <li
              key={item.lo}            >
              {link}
              <meta content={index + 1} />

            </li>
          )
        })}
        <li
          key={location.pathname}
        >
          <span>{title}</span>
          <meta content={List.length + 1} />
        </li>
      </ol>
    </BreadCrumbNav>
  )
}

export default BreadCrumbList

const BreadCrumbNav = styled.nav`
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      display: inline-flex;
      align-items: center;
      font-size: 1.4rem;
      font-weight: 700;
      margin-right: 10px;
      &::after {
        margin-left: 10px;
        content: "";
        width: 4px;
        height: 4px;
        display: inline-block;
        transform: rotate(45deg);
        border-top: 2px solid var(--black);
        border-right: 2px solid var(--black);
      }
      &:last-child::after {
        content: none;
      }
    }
    a {
      color: var(--black);
      &:hover {
        opacity: 0.5;
      }
    }
  }
  `

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
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      htmlAst
      tableOfContents(maxDepth: 3)
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        description
        cate
        tags
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
