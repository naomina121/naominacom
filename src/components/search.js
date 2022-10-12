import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const SearchResult = () => {
   const data = useStaticQuery(graphql`
   query {
     allMarkdownRemark(
			sort: { order: DESC, fields: frontmatter___date }
			filter: { frontmatter: { pagetype: { eq: "blog" } } }
			) {
   	edges {
   	  node {
   		excerpt(pruneLength: 200)
   		id
   		frontmatter {
   		  title
   		  description
   		  date(formatString: "YYYY.MM.DD")
   		  tags
   		}
   		fields {
   		  slug
   		}
   	  }
   	}
     }
   }
 `)

 const allPosts = data.allMarkdownRemark.edges
 const emptyQuery = ""

 const [state, setState] = useState({
   filteredData: [],
   query: emptyQuery,
 })

 const handleInputChange = event => {
   console.log(event.target.value)
   const query = event.target.value
   const posts = data.allMarkdownRemark.edges || []

   const filteredData = posts.filter(post => {
     const { description, title } = post.node.frontmatter
     return (
       description.toLowerCase().includes(query.toLowerCase()) ||
       title.toLowerCase().includes(query.toLowerCase())
     )
   })

  setState({
     query,
     filteredData,
   })
 }

 const { filteredData, query } = state
 const hasSearchResults = filteredData && query !== emptyQuery
 const posts = hasSearchResults ? filteredData : allPosts

   return (
   	<div>
   		<div className="result-inner">
   			<input
   				type="text"
   				aria-label="Search"
   				placeholder="検索ワードを入力..."
   				onChange={handleInputChange}
   			/>
   			<div className="result-inner__res">
   				{query !== "" ?
   					query + " の検索結果: " + posts.length + "件、ヒットしました"
   					: posts.length + "件の記事があります"
   				}
   			</div>
   			<ul className="result-inner__search">
   			  {query !== "" ?
   			     posts.map(({ node }) => {
             const { slug } = node.fields
   				   const { title } = node.frontmatter
						 const { date } = node.frontmatter
   				   return (
   						<li key={slug}>
               <time dateTime={date}>{date}</time><Link to={slug}>{title}</Link>
   						</li>
   					)})
   				  : ""
   			  }
   			</ul>
   		</div>
   	</div>
   )
}

export default SearchResult
