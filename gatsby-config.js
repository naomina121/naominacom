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
          process.env.GATSBY_TRACKING_ID,//トラッキングID
        ],
        pluginConfig: {
          head: true,
        },
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-robots-txt`,
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
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ナオのメンタルヘルス`,
        short_name: `ナオのメンタルヘルス`,
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

