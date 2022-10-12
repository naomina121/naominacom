module.exports = {
  siteMetadata: {
  title: `ナオのメンタルヘルス`,
  author: {
    name: `ナオ`,
    summary: `統合失調症。再発防止と病気の理解のためメンタルヘルスについて学んでいます`,
  },
  description: `心の健康や心の病の正しい知識を普及するための目的としたブログ記事`,
  siteUrl: `https://naomina.com/`,
  social: {
    twitter: `naominamecom`,
  },
  category: [
      {
        slug: `depression`,
        name: `うつ病`,
        description: `うつ病に対して情報をまとめたTips`,
      },
      {
        slug: `schizophrenia`,
        name: `統合失調症`,
        description: `統合失調症について情報をまとめたTips`,
      },
      {
        slug:`mentalillness`,
        name:`その他の精神疾患`,
        description:`その他の精神疾患について情報をまとめたTips`,
      },
      {
        slug: `mentalhealth`,
        name: `メンタルヘルス`,
        description: `心の健康を維持できるような情報をまとめたTips`,
      },
    ],
},
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          process.env.GOOGLE_ANALYTICS_TRACKING_ID,//トラッキングID
          process.env.GOOGLE_ADSENSE_ID,//アドセンスID
        ],
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/`,
        excludes: [
          `/blogs/page/*`,
          `/404?(.*)`,
          `/blogs/*/page/*`,
          `/blogs/tags/*/page/*`,
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `images`,
          path: `${__dirname}/src/images`,
        },
      },
      {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: (post) => {
              const rssMetadata = post.query.site.siteMetadata
              return post.query.allAirtable.edges.map(edge => ({
                date: edge.node.data.date,
                title: edge.node.data.title,
                description: edge.node.data.body.childMarkdownRemark.excerpt,
                url: rssMetadata.siteUrl + '/' + edge.node.data.slug,
                guid: rssMetadata.siteUrl + '/' + edge.node.data.slug,
                custom_elements: [
                  {
                    'content:encoded': edge.node.data.body.childMarkdownRemark.html,
                  },
                ],
              }))
            },
            query: `
            {
              allAirtable(limit:1000, sort: {fields: [data___date], order: DESC}) {
                edges {
                  node {
                    data {
                      title
                      date(formatString: "ddd, DD MMM YYYY, h:mm:ss +0900")
                      slug
                      body {
                        childMarkdownRemark {
                          excerpt
                          html
                        }
                      }
                    }
                  }
                }
              }
            }
            `,
            output: "/rss.xml",
            title: "ナオのメンタルヘルス RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}

