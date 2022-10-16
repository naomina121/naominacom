import React, { useState } from "react";
import { graphql } from "gatsby";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Layout from "../components/layout";
import Seo from "../components/seo"
import BreadCrumbList from "../components/breadcrumb-list"

import styled from "styled-components"
const Contact = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const author = data.site.siteMetadata.author.name;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = event => {
    switch (event.target.name) {
      case "name":
        setName(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "subject":
        setSubject(event.target.value);
        break;
      case "message":
        setMessage(event.target.value);
        break;
      default:
        console.log("key not found");
    }
  };

  const canSubmit = () => {
    if (name === "") return true;
    if (email === "") return true;
    if (subject === "") return true;
    if (message === "") return true;

    return false;
  };

  return (
      <Layout location={location} title={siteTitle} author={author}>
      <Article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <BreadCrumbList parent="root" location={location} title="お問合わせ" />
        <div className="contact">
          <h1>お問い合わせ</h1>
          <p>
            各種お問い合わせはこちらのフォームよりお願いいたします。
            <br></br>
            お名前・メールアドレス・件名・お問い合わせ内容を記載して送信ボタンをクリックしてください。
            <br></br>
            <br></br>
            できる限り対応させていただきますが、内容によっては返信を控えさせて頂きますのでご了承ください。
          </p>

          <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="bot-field" />
            <div className='contact_area'>
              <TextField
                id="name"
                className='contact_name'
                name="name"
                label="お名前"
                type="text"
                variant="outlined"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className='contact_area'>
              <TextField
                id="email"
                className='contact_email'
                name="email"
                label="メールアドレス"
                type="email"
                variant="outlined"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className='contact_area'>
              <TextField
                id="subject"
                className='contact_subject'
                name="subject"
                label="件名"
                type="text"
                variant="outlined"
                value={subject}
                onChange={handleChange}
              />
            </div>
            <div className='contact_area'>
              <TextField
                id="message"
                className='contact_msg'
                name="message"
                label="お問い合わせ内容"
                multiline
                rows={6}
                variant="outlined"
                value={message}
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={canSubmit()}
            >
              送信
            </Button>
          </form>
        </div>
        </Article>
      </Layout>
  );
};

export default Contact;

export const Head = ({ data,location }) => (
   <Seo
     title="お問合わせ | ナオのメンタルヘルス"
     location={location}
   />
)

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
  }
`;

const Article = styled.article`
  max-width: 750px;
  margin: 0 auto;
`
const BlogEntry = styled.section`
  margin: 15px 0 30px;
`
