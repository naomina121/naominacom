import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Img from "../components/img"
import { BlogListWrapper, BlogListHeader } from "../style/blog-list-style"
//import TagCloud from "../components/tag-cloud"
import ModalSeach from "../components/modal-search"
import { siteMetadata } from "../../gatsby-config"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <div className="topWrapper">
        <main>
          <h2>初めてお越しいただいた方へ</h2>
          <p>
            ようこそ、いらっしゃいました＾＾</p>
            <p>改めまして、ナオでございます。</p>
            <p>初めてお越しいただき、ありがとうございます♪</p>
            <br/>
          <p>
            早速ですが、当サイトについて解説していきたいと思うのですが、、、
          </p>

          <p>
            その前に、<b>ナオって誰</b>だと思われる方もいらっしゃると思いますので、<br/>私のことを詳しく知りたい方は<Link to="/about/" className="link_name">ナオについて</Link>をご覧くださいね。
          </p>

          <h2>当サイトについて</h2>
                                        <StaticImage src="../images/about.png" className="about" alt="ロゴ" />
                                        <br/>
                                        <h3>当サイトの注意点</h3>
          <p>
            当サイトは、冒頭にも書いたように、<span className='green'>心の病や心の病気をテーマ</span>として、知識を蓄えつつアウトプットしつつ私ナオが思ったことを突っ込んだりして記事にしていくという趣旨のブログサイトになります。
          </p>
          <p>
            そのため、<span className='tyuui'>専門家が書いた記事ではないことに注意をしていただきたい</span>ということです。
          </p>
          <br/>
          <p>
ただ、記事として一般公開する以上、なるべく<b>正しい情報を公開することを前提</b>として書かせていただいています。
</p>
<p>
ですので、過去の記事に<span className='red tyuui'>誤字、脱字、訂正箇所</span>があるかを、こちらで何度か確認しその都度変更し最善をつくすようにしてます。
</p>

          <p>それでも、もし誤りなどを見つけていただきましたら、<Link to="/contact/" className="link_name">お問合わせ</Link>などで報告していただけると幸いです。</p>
          <h3>当サイトの特徴</h3>
          <h4>１記事５分以内に読了できる</h4>
          <p>
            難しいことを考えずに簡単に分かりやすく情報を提供できればという思いと、読者が負担にならないように、各記事の内容は<strong>５分以内</strong>に読めるようにしています。ちなみに、短い記事でもシリーズ化するときはタグをつけてまとめていたりします！
          </p>
          <h4>知識系の記事とネタ系の記事</h4>
          <p>当サイトはですね、</p>
          <p>
            主に、
            <Link className="link_name" to="/blogs/tags/知識/">知識系の記事</Link>と
            <Link className="link_name" to="/blogs/tags/ネタ/">ネタ系の記事</Link>
            の記事に分かれています。
          </p>
          <p>
            それぞれ解説すると、<b>知識系は、その名の通り知識を広げるために作られた記事です。真面目な記事が多いのが特徴</b>です。
          </p>
          <p>
            一方、<b>ネタ系の記事は、私が思ったことを突っ込んでいくというスタイルで書くので結構自由な記事が多いです。結構ふざけていること記事が多いのが特徴</b>です笑
          </p>
          <h2>最後に</h2>
          <p>
            ここまで読んでくださってありがとうございます!
          </p>
          <p>
            もし何かありましたら、<b>誤字脱字、記事の訂正以外でもご意見ご要望など承ります</b>ので、ぜひ<Link to="/contact/" className="link_name">お問合わせ</Link>もご活用くださいませ。
          </p>
          <p>なるべく、お問合せの方は確認させていただいていますが、ただ、<span className="tyuui">内容によっては、必ずしも返信を保証するものではないということをご了承くださいませ。</span>
          </p>
        </main>
        <aside className="sideBar">
          <h2 className="aside_title">新着記事</h2>
<BlogListWrapper>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          const cate = post.frontmatter.cate
          const cateName = siteMetadata.category.find(item => item.slug === cate).name
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
                <h3>
                  <Link to={post.fields.slug}>
                    <span>{title}</span>
                  </Link>
                </h3>
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
                </section>
              </article>
            </li>
          )
        })}
      </BlogListWrapper>
                <Link to="/blogs/" className="morePosts">もっと記事を見る</Link>
          <div className="search">
          <h2 className="aside_title">サイト内検索</h2>
          <ModalSeach></ModalSeach>
          </div>
        </aside>
      </div>
    </Layout>






  )
}

export default BlogIndex

export const Head = ({ data,location }) => (
   <Seo
     title={data.site.siteMetadata.title}
     location={location}
   />
)

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 3
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { pagetype: { eq: "blog" } } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY-MM-DD")
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
