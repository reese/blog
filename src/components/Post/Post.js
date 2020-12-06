import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";
import {
  BASE_FONT_SIZE,
  BUTTON_HEIGHT,
  COLOR_BASE,
  COLOR_PRIMARY,
  LAYOUT_BREAKPOINT_MD,
  LAYOUT_POST_SINGLE_WIDTH,
} from "../../constants/colors";
import { media } from "../../utils/mediaQuery";
import { Author } from "./Author";
import Content from "./Content";
import Meta from "./Meta";
import Tags from "./Tags";

const PostWrapper = styled.div`
  .footer {
    max-width: ${LAYOUT_POST_SINGLE_WIDTH};
    margin: 0 auto;
    padding: 0 15px;
  }

  .home-button {
    position: fixed;
    max-width: auto;
    margin: 0;
    top: 30px;
    left: 30px;
    max-width: 90px;
    height: ${BUTTON_HEIGHT};
    padding: 0 24px;
    line-height: ${BUTTON_HEIGHT};
    text-align: center;
    color: ${COLOR_BASE};
    font-size: ${BASE_FONT_SIZE};
    font-weight: normal;

    :hover,
    :focus {
      color: ${COLOR_PRIMARY};
    }
  }

  ${media(LAYOUT_BREAKPOINT_MD)} {
    .footer {
      padding: 0;
    }

    .home-button {
      position: relative;
      display: block;
      margin-left: auto;
      margin-right: auto;
      margin-top: 24px;
    }
  }
`;

const Post = ({ post }) => {
  const { html } = post;
  const { tagSlugs } = post.fields;
  const { tags, title, date } = post.frontmatter;

  return (
    <PostWrapper>
      <div className="content">
        <Link className="home-button" to="/">
          All Articles
        </Link>
        <Content body={html} title={title} />
      </div>

      <div className="footer">
        <Meta date={date} />
        {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
        <Author />
      </div>
    </PostWrapper>
  );
};

export default Post;
