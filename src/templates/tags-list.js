import * as React from "react"
import TagCloud from "../components/tag-cloud"
import Layout from "../components/layout"
import Seo from "../components/seo"
import BreadCrumbList from "../components/breadcrumb-list"

const TagsList = ({ location }) => {

  return (
    <Layout location={location} title="ナオのメンタルヘルス">
      <article
        className="tags-list"
        itemScope
        itemType="http://schema.org/Article"
      >
        <BreadCrumbList
          location={location}
          title="タグ一覧"
        />
        <header>
          <h1>タグ一覧</h1>
        </header>
        <TagCloud></TagCloud>
      </article>
    </Layout>
  )
}
export default TagsList

export const Head = ({ data,location }) => (

      <Seo
        title="タグ一覧 | ナオのメンタルヘルス"
        description="全タグ一覧ページです"
        location={location}
      />
)

