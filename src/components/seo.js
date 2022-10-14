import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

const Seo = props => {
  const {
  img,
  location,
  type,
  date,
  modified,
  description,
  meta,
  title,
  ogpImgPath,
  children
} = props
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            author {
              name
            }
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const imgPath = `${site.siteMetadata.siteUrl.replace(/\/$/, "")}${
    ogpImgPath ? `${ogpImgPath}` : "/images/ogp.png"
  }`
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  let blogUrl = location ? location.href : site.siteMetadata.siteUrl
  // ページネーション削除
  blogUrl = String(blogUrl).replace(/page\/([0-9])+\//, "")

    return (
      <>
        <title>{title}</title>
        <meta name="google-site-verification" content="fXFsNigYLZtuUktAMNlINqOOcUs6qjp8Lsu2fyh_xkA" />
        <meta name="description" content={metaDescription} />
        <meta name="thumbnail" content={imgPath} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content={ `${isRootPath ? "website" : "webpage"}`} />
        <meta property="og:site_name" content={defaultTitle} />
        <meta property="og:url" content={imgPath} />
        <meta property="og:image" content={imgPath}/>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={site.siteMetadata?.social?.twitter || ``} />
        <meta name="twitter:image" content={imgPath} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={metaDescription} />
+       {children}
      </>
    )
  }

    Seo.defaultProps = {
    meta: [],
    description: ``,
    ogpImgPath: null,
  }

  Seo.propTypes = {
    description: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string.isRequired,
    ogpImgPath: PropTypes.string,
  }

  export default Seo
