import * as React from "react"
import { Link } from "gatsby"
import { siteMetadata } from "../../gatsby-config"
import styled from "styled-components"

const Footer = () => {
  return (
    <FooterWrapper>
      <p>
        <Link to ="/privacy-policy" className="footer_link">プライバシーポリシー</Link>
      </p>
      <p>
        <small>(c) 2021 {siteMetadata.title}</small>
      </p>
    </FooterWrapper>
  )
}
export default Footer

const FooterWrapper = styled.footer`
text-align:center;
background:#bc9d27;
color:#fff;
margin:20px 0 0;
padding:0;
p {
  margin:0;
  }
.footer_link{
  font-size:14px;
  text-decoration:none;
  color:#fff;
  margin-top:5px;
  display:inline-block;
  &:hover{
    text-decoration:underline;
  }
}
  `
