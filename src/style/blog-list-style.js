import styled from "styled-components"

export const BlogListHeader = styled.header`
  text-align:center;
  .search{
   display:flex;
    justify-content: flex-end;
    font-size:15px;
    margin-top:10px;
    @media screen and (max-width:1024px){
    justify-content: center;
    }
    input{
      padding:5px;
      border:1px solid #ccc;
      border-radius:4px;
    }
  }
  .ganre{
    display:flex;
    justify-content: flex-end;
    font-size:14px;
    @media screen and (max-width:1024px){
    justify-content: center;
    }
  }
  .radio {
  margin: 0.5rem;
  input[type="radio"] {
    position: absolute;
    opacity: 0;
    + .radio-label {
      &:before {
        content: '';
        background: #f4f4f4;
        border-radius: 100%;
        border:1px solid #ccc;
        display: inline-block;
        width: 1.4em;
        height: 1.4em;
        position: relative;
        top: 0;
        margin-right: 5px;
        vertical-align: top;
        cursor: pointer;
        text-align: center;
        transition: all 250ms ease;
      }
    }
    &:checked {
      + .radio-label {
        &:before {
          background-color: #3197EE;
          box-shadow: inset 0 0 0 4px #f4f4f4;
        }
      }
    }
    &:focus {
      + .radio-label {
        &:before {
          outline: none;
          border-color: #3197EE;
        }
      }
    }
    &:disabled {
      + .radio-label {
        &:before {
          box-shadow: inset 0 0 0 4px #f4f4f4;
          border-color: darken(#f4f4f4, 25%);
          background: darken(#f4f4f4, 25%);
        }
      }
    }
    + .radio-label {
      &:empty {
        &:before {
          margin-right: 0;
        }
      }
    }
  }
}
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
        padding-top:0;
        margin-top:0;
    }
    h3{
        margin-top:0;
        padding-top:0;
    }
    time {
      font-weight: 700;
      // position: absolute;
      // left: 0;
      // top: 10px;
      // background: rgba(255,255,255,.7);
      padding: 0 10px;
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
