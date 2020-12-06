import React from "react";
import styled from "styled-components";
import {
  COLOR_GRAY,
  LAYOUT_BREAKPOINT_SM,
  LAYOUT_POST_WIDTH,
} from "../../../constants/colors";
import { useSiteMetadata } from "../../../hooks";
import { getContactHref } from "../../../utils";
import { media } from "../../../utils/mediaQuery";

const AuthorWrapper = styled.div`
  border-top: 1px solid ${COLOR_GRAY};
  max-width: ${LAYOUT_POST_WIDTH};
  padding-top: 20px;
  line-height: 24px;
  margin-top: 24px;
  margin-bottom: 48px;

  a {
    display: block;
    text-decoration: underline;
  }

  ${media(LAYOUT_BREAKPOINT_SM)} {
    margin: inherit auto;
  }
`;

export const Author = () => {
  const { author } = useSiteMetadata();

  return (
    <AuthorWrapper>
      <p>
        {author.bio}
        <a
          href={getContactHref("twitter", author.contacts.twitter)}
          rel="noopener noreferrer"
          target="_blank"
        >
          <strong>{author.name}</strong> on Twitter
        </a>
      </p>
    </AuthorWrapper>
  );
};
