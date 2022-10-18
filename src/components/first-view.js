import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { Link } from "gatsby"

const FirstView = () => {
  return (
    <Wrapper>
      <StaticImage
        className="first-view"
        layout="fullWidth"
        formats={["auto", "webp", "avif"]}
        src="../images/common/first-view.jpg"
        width={1500}
        height={500}
        quality={95}
        alt="写真"
      />
      <div className="text">
        <p className="title">
          Welcome To Nao's Site.
        </p>
        <p className="dp">当サイトは、私、ナオが心の病や心の病気について、知識を蓄えつつ勉強になったことや私自身が思ったことなど突っ込んで記事を発信していくサイトです。</p>
        <Link to='/about/' className="btn">ナオについてはこちら</Link>
      </div>
    </Wrapper>
  )
}
export default FirstView

const Wrapper = styled.div`

  height:50vh;
  min-height:400px;
  overflow: hidden;
  position: relative;

}
  @media screen and (max-width: 768px) {
      font-size: 3rem;
        height: 80vh;
  }
  z-index: 500;
  .gatsby-image-wrapper{
    overflow:hidden;
      picture{
        -webkit-filter: blur(8px);
        -moz-filter: blur(8px);
        -o-filter: blur(8px);
        -ms-filter: blur(8px);
        filter: blur(8px);
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        z-index: -1;
        img{
          width:120vw;
          height:120%;
          margin-top:-20px;
          margin-left:-20px;
        }
      }
  }
  .text {
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    z-index: 100;
    position: absolute;
    width: 70%;
    color: #fff;
    font-size: 20px;
    padding: 30px;
    border: 6px double rgb(255 255 255 / 30%);
    .title{
        font-family: 'Playfair Display', serif;
        font-size:40px;
        text-shadow:5px 5px 10px #000;
        margin:0;
          @media screen and (max-width: 768px) {
            font-size:30px;
  }
    }
    .dp{
      font-size:18px;
          @media screen and (max-width: 768px) {
            font-size:16px;
  }
    }
  }
  .first-view {
    height: 100%;
  }
a.btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border: 1px solid rgb(255 255 255 / 41%);
  text-decoration:none;
  margin-left:auto;
  padding: 1em 2em;
  width: 200px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  background-color: rgb(255 255 255 / 8%);
  transition: 0.3s;
            @media screen and (max-width: 768px) {
            font-size:16px;
  }
}

a.btn::before {
  content: '';
  position: absolute;
  top: calc(50% - 2px);
  right: -2em;
  transform: translateY(calc(-50% - 2px)) rotate(30deg);
  width: 12px;
  height: 2px;
  background-color: #fff;
  transition: 0.3s;
}

a.btn::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -2em;
  transform: translateY(-50%);
  width: 70px;
  height: 2px;
  background-color: #fff;
  transition: 0.3s;
}

a.btn:hover {
  text-decoration: none;
  opacity:0.7;
}

a.btn:hover::before,
a.btn:hover::after {
  right: -2.5em;
}


`
