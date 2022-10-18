import styled from "styled-components"

export const BlogListHeader = styled.header`
  text-align:center;
  h1 {
    &:after {
      margin: 0 auto;
      content: '';
      display: block;
      width: 50px;
      height: 3px;
      background: rgb(29, 104, 88);
    }
  }
`
export const BlogListWrapper = styled.ol`
  list-style: none;
  padding: 0;
  margin-top:20px;
  li {
    margin-bottom: 20px;

    a {
        color: var(--black);
        text-decoration: none ;
    }
    h2 {
        font-size: 18px;
    }
  }
  .thumbnail {
    position: relative;
    margin:0px auto;
    width:100%;
    div{
      width:100%;
    img{
      width:100%;
      object-fit:cover;
    }
    }

    time {
      font-weight: 700;
      position: absolute;
      left: 0;
      top: 10px;
      background: rgba(255,255,255,.7);
      padding: 0 10px;
    }
  }
  @media screen and (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
    .topWrapper &{
      flex-direction:column;
      margin-bottom:10px;
      > li{
        max-width:300px;
        margin:0 auto;
        width:100%;
        border-bottom:1px dotted #ccc;
        padding:0;
        &:last-child{
          border-bottom:none;
        }
      }
    }

    li {
        box-sizing: border-box;
        padding: 15px;
        width: 33.33%;

        h2 {
          font-size: 22px;

          a {
              &:hover {
              text-decoration: underline;
            }
          }
        }

      .thumbnail {
        transition: .3s;

        &:hover {
            opacity: 0.5;
        }
      }
    }
  }
`
