import React, { useState, useEffect } from 'react';
import { Link } from "gatsby"
import { siteMetadata } from "../../gatsby-config"
//import styled from "styled-components"

const Header = ({ location }) => {
  const [active, setActive] = useState(false);
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let siteName
  if (isRootPath) {
    siteName = <h1 className="logo">{siteMetadata.title}</h1>
  } else {
    siteName = (
      <p className="logo">
        <Link to={rootPath}>{siteMetadata.title}</Link>
      </p>
    )
  }

  // メニューをクリックした時

  const toggleFunction = () => {
    setActive(!active)
  }
  return (
    <header>
      <div className="container">
        {siteName}
  <div className="hm">
      <button
        className={active ? "open hamburger" : "hamburger"}
        controls="navigation"
        label="メニューを開きます"
        onClick={toggleFunction}
        aria-label="ハンバーガーメニュー">
        <span className="hamburger_bar"></span>
        <span className="hamburger_bar"></span>
        <span className="hamburger_bar"></span>
      </button>
      <nav id="navigation"  className={active ? "open" : ""} >
                <ul className='menu__box'>
                  <li><Link to="/about/">ナオについて</Link></li>
                  <li><Link to="/blogs/depression/">うつ病</Link></li>
                  <li><Link to="/blogs/schizophrenia/">統合失調症</Link></li>
                  <li><Link to="/blogs/mentalillness">その他の精神疾患</Link></li>
                  <li><Link to="/blogs/mentalhealth/">メンタルヘルス</Link></li>
                  <li><Link to="/contact">お問合わせ</Link></li>
                </ul>
              </nav>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/blogs/depression/">うつ病</Link>
            </li>
            <li>
              <Link to="/blogs/schizophrenia/">統合失調症</Link>
            </li>
            <li>
              <Link to="/blogs/mentalillness">その他の精神疾患</Link>
            </li>
            <li>
              <Link to="/blogs/mentalhealth/">メンタルヘルス</Link>
            </li>
            <li>
              <Link to="/about/">ナオについて</Link>
            </li>
            <li>
              <Link to="/contact">お問合わせ</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
export default Header

