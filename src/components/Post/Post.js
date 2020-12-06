import React from "react";
import styled from "styled-components";
import {
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

  ${media(LAYOUT_BREAKPOINT_MD)} {
    .footer {
      padding: 0;
    }
  }
`;

const Post = ({ post }) => {
  const { body } = post;
  const { tagSlugs } = post.fields;
  const { tags, title, date } = post.frontmatter;

  return (
    <PostWrapper>
      <div className="content">
        <Content body={body} title={title} />
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
