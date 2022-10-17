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
              podcast
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

  const siteUrl = "https://naomina.com" + location.pathname

  let blogUrl = location.pathname === rootPath ? site.siteMetadata.siteUrl : siteUrl
  // ページネーション削除
  blogUrl = String(blogUrl).replace(/page\/([0-9])+\//, "")

// 構造化データの追加
// 執筆者情報
  const author = [
    {
      "@type": "Person",
      name: site.siteMetadata.author.name,
      description: site.siteMetadata.author.summary,
      url: site.siteMetadata.siteUrl,
      sameAs: [
        "https://twitter.com/" + site.siteMetadata.social.twitter,
        site.siteMetadata.social.podcast,
      ],
    },
  ]

  // 公開する組織など
  const publisher = {
    "@type": "Organization",
    name: site.siteMetadata.title,
    description: site.siteMetadata.description,
    logo: {
      "@type": "ImageObject",
      url: `${site.siteMetadata.siteUrl}images/logo.png`,
      width: 72,
      height: 72,
    },
  }

  // JSON+LDの設定
  let jsonLd = [
    {
      "@context": "http://schema.org",
      "@type": isRootPath ? "webSite" : "webPage",
      inLanguage: "ja",
      url: blogUrl,
      name: title,
      author,
      publisher,
      image: imgPath,
      description: metaDescription,
    },
  ]
  if (type === "blog") {
    const article = {
      "@context": "http://schema.org",
      "@type": "BlogPosting",
      url: blogUrl,
      name: title,
      headline: title,
      image: {
        "@type": "ImageObject",
        url: imgPath,
      },
      description: description,
      datePublished: date,
      dateModified: modified,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": blogUrl,
      },
      author,
      publisher,
    }
    jsonLd = [...jsonLd, article]
  }

  if (!isRootPath) {
    let breadCrumbList
    const home = {
      "@type": "ListItem",
      position: 1,
      name: "ホーム",
      item: `${site.siteMetadata.siteUrl}`,
    }
    const blogList = {
      "@type": "ListItem",
      position: 2,
      name: `記事一覧`,
      item: `${site.siteMetadata.siteUrl}blogs/`,
    }
    if (type === "blog" || type === "cate-list" || type === "tag-list") {
      breadCrumbList = [
        home,
        blogList,
        {
          "@type": "ListItem",
          position: 3,
          name: title,
          item: blogUrl,
        },
      ]
    } else if (type === "blog-list") {
      breadCrumbList = [home, blogList]
    } else {
      breadCrumbList = [
        home,
        {
          "@type": "ListItem",
          position: 2,
          name: title,
          item: blogUrl,
        },
      ]
    }
    jsonLd = [
      ...jsonLd,
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadCrumbList,
      },
    ]
  }

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
       {children}
       <link rel="canonical" href={blogUrl} />
       <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
       </script>
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
