import * as React from "react"

import { siteMetadata } from "../../gatsby-config"
import styled from "styled-components"

const Footer = () => {
  return (
    <FooterWrapper>
      <p>
        <small>(c) 2021 {siteMetadata.title}</small>
      </p>
    </FooterWrapper>
  )
}
export default Footer

const FooterWrapper = styled.footer`
text-align:center;
background:#cd7f6a;
color:#fff;
margin:0;
padding:0;
p {
  margin:0;
  }
  `
