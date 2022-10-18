module.exports = {
  siteMetadata: {
  title: `ナオのメンタルヘルス`,
  author: {
    name: `ナオ`,
    summary: `統合失調症。再発防止と病気の理解のためメンタルヘルスについて学んでいます`,
  },
  description: `当サイトは、私、ナオが心の病や心の病気について、知識を蓄えつつ勉強になったことや私自身が思ったことなど突っ込んで記事を発信していくサイトです。`,
  siteUrl: `https://naomina.com/`,
  social: {
    twitter: `naominamecom`,
    podcast: `https://podcasts.apple.com/jp/podcast/%E3%83%8A%E3%82%AA%E3%81%AE%E3%83%A1%E3%83%B3%E3%82%BF%E3%83%AB%E3%83%98%E3%83%AB%E3%82%B9%E3%83%A9%E3%82%B8%E3%82%AA/id1649348148`,
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
          process.env.GATSBY_TRACKING_ID,//トラッキングID
        ],
        pluginConfig: {
          head: true,
        },
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-twitter`,
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
        resolve: `gatsby-transformer-remark`,
          options: {
            plugins: [
              {
                resolve: `gatsby-remark-autolink-headers`,
                options: {
                  icon: false,
                  maintainCase: false,
                },
              },
              {
                resolve: "gatsby-remark-component",
                options: { components: ["my-component", "other-component"] }
              },
              {
                resolve: `gatsby-remark-images`,
                options: { maxWidth: 630},
              },
              `gatsby-remark-responsive-iframe`,
              `gatsby-remark-reading-time`,
            ],
          }
      },
      {
        resolve: `gatsby-remark-responsive-iframe`,
        options: {
          wrapperStyle: `margin-bottom: 1.0725rem`,
        },
      },
      `gatsby-remark-prismjs`,
      `gatsby-remark-copy-linked-files`,
      `gatsby-remark-smartypants`,

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
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.frontmatter.description,
                  date: node.frontmatter.date,
                  title: node.frontmatter.title,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                      description
                      hero
                      cate
                      tags
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "ナオのメンタルヘルス",
            feed_url: "https://naomina.com/feed/rss.xml",
            site_url: "https://naomina.com/",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          "/*.html": ["Cache-Control: public, max-age=0, must-revalidate"],
          "/page-data/*": ["Cache-Control: public, max-age=0, must-revalidate"],
          "/page-data/app-data.json": [
            "Cache-Control: public, max-age=0, must-revalidate",
          ],
          "/static/*": ["Cache-Control: public, max-age=31536000, immutable"],
          "/sw.js": ["Cache-Control: no-cache"],
          "/**/*.js": ["Cache-Control: public, max-age=31536000, immutable"],
          "/**/*.css": ["Cache-Control: public, max-age=31536000, immutable"],
        },
      },
    },

  {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'ナオのメンタルヘルス',
        short_name: 'ナオのメンタルヘルス',
        start_url: '/',
        description: '心の健康や心の病の正しい知識を普及するための目的としたサイト',
        background_color: '#BC9D26', // アプリ起動時の背景色
        theme_color: '#BC9D26', // ブラウザツールバーの色
        display: 'minimal-ui',// アプリのスタイル
        icon: `src/images/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
  ],
}

