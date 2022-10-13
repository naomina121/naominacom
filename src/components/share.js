import * as React from "react"
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LineShareButton,
  LineIcon
} from "react-share";

const Share = ({postPath,postNode }) => {{
    const post = postNode.frontmatter;
    const url = "https://naomina.com" + postPath;
    const iconSize = 48;

    return (
      <div className="social-links">
        <TwitterShareButton url={url} title={post.title}>
          <TwitterIcon round size={iconSize} />
        </TwitterShareButton>
        <FacebookShareButton url={url} quote={postNode.excerpt}>
          <FacebookIcon round size={iconSize} />
        </FacebookShareButton>
        <LineShareButton url={url} quote={postNode.excerpt}>
          <LineIcon round size={iconSize} />
        </LineShareButton>

      </div>
    );
  }
}
export default Share
