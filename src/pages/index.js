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
            <p>改めまして、こんにちは、ナオです。</p>
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
          記事によっては、私個人で苦しみ考察したものも含んでいるので、かなり多くの偏見もあるかもしれません。</p>
          <p>
            <b>同じ病気や悩みを抱えたとしても解決の仕方は人それぞれ</b>なのです。
          </p>
          <p>ですので、あくまで一人の当事者がこんなことを思っているのだなという感じで参考程度に受け入れていただけると幸いです。</p>
          <br/>
          <p>
あ、ただ誤解のなきように、記事として一般公開する以上、なるべく<b>正しい情報を公開することを前提</b>として書かせていただいています。
</p>
<p>
ですので、過去の記事に<span className='red tyuui'>誤字、脱字、訂正箇所</span>があるかを、こちらで何度か確認しその都度変更し最善をつくすようにしてます。
</p>

          <p>それでも、もし誤りなどを見つけていただきましたら、<Link to="/contact/" className="link_name">お問合わせ</Link>などで報告していただけると幸いです。</p>
          <p>
            私自身、情報に誤りがないようにしたいので、できるだけ参考にした文献などは記事にリンクとして貼り付けていきます！
          </p>
          <h3>当サイトのコンセプト・理念に関して</h3>
          <p>コンセプトって言い方も大袈裟な気がしますが・・・</p>
          <p>ぶっちゃけって言いますとですね、、、</p>
          <br/>
          <p className="big">「<span className='orange'>読んで下さった方が幸せになる記事を書き続けたい</span>」</p>
          <br/>
          <p>というですね、結構大きい目標があります。</p>
          <p>え？こんなの実現できるのかって思われますよね・・・？</p>
          <p>それでも・・・</p>
          <p>たとえ一記事でも・・・</p>
          <p className="big orange">私が作ったブログサイトが誰かに読んでもらってお役に立てていただいたら、こんな嬉しいことはありません。</p>
          <p>やはり、ブログを作った以上、読んでくださる方もですね、ブログを通して知識を役立てていただいたり、私自身もそれを糧にブログを書き続けて日々成長していきたいと思ってしまうんです。</p>

          <p><span className='red'>↑目標大きすぎる｜д・´）　!!</span></p>

          <p>というかですね、そういう記事を<span className='red'>大量に作成</span>していきます！</p>

          <p>ですので、このブログを通して、読んでくださった方が幸せになれるようなブログ記事を書けるように日々知識向上努めていきます！</p>
          <p><span className='red'>↑目標大きすぎる｜д・´）　!!</span></p>
          <p>どうか、暖かい目で見守ってやってくださいね・・・w</p>

          <h3>当サイトの特徴</h3>
          <p>それでは、私が記事を作成する際に気を付けていることなどをお話ししていきますね。</p>
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
            それぞれ解説すると、<b className="green">知識系は、その名の通り知識を広げるために作られた記事です。真面目な記事が多いのが特徴</b>です。
          </p>
          <p>
            一方、<b className="green">ネタ系の記事は、ナオが思ったことを突っ込んでいくというスタイルで書くので結構自由な記事が多いです。結構ふざけていることが特徴</b>です笑
          </p>
          <h4>更新頻度は不定期更新</h4>
          <p>これに関してはですね、私自身、病気を抱えているためあまり無理がないように更新していくにしていきたいのです。</p>
          <p>ですが、なるべく記事を更新していきたいと思っていますのでよろしくお願いします♪</p>
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
                  <small>
                    <time dateTime={post.frontmatter.date}>
                      {post.frontmatter.date}
                    </time>
                  </small>
                </Link>
                <section>
                <h3>
                  <Link to={post.fields.slug}>
                    <span>{title}</span>
                  </Link>
                </h3>
                </section>
              </article>
            </li>
          )
        })}
      </BlogListWrapper>
                <Link to="/blogs/" className="morePosts">もっと記事を見る</Link>

          <h2 className="aside_title">サイト内検索</h2>
          <ModalSeach></ModalSeach>
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
