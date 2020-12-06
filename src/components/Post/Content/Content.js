import React from "react";
import styled from "styled-components";
import {
  BASE_FONT_SIZE,
  LAYOUT_BREAKPOINT_MD,
  LAYOUT_POST_SINGLE_WIDTH,
  LAYOUT_POST_WIDTH,
} from "../../../constants/colors";
import { media } from "../../../utils/mediaQuery";

const ContentWrapper = styled.div`
  max-width: ${LAYOUT_POST_SINGLE_WIDTH};
  padding: 0 15px;
  margin: 0 auto;

  h1 {
    font-size: ${BASE_FONT_SIZE} * 2;
    max-width: ${LAYOUT_POST_WIDTH};
    margin: 24px auto 0 auto;
    font-weight: 600;
    text-align: center;
    line-height: 34px;
  }

  div {
    figure {
      margin-bottom: 24px;

      blockquote {
        font-style: italic;
        text-align: center;
        margin-top: 0;
        padding: 24px 0;

        p {
          max-width: ${LAYOUT_POST_WIDTH};
          font-size: ${BASE_FONT_SIZE} * 1.6817;
          margin-top: 0;
          margin-bottom: 24px;
          line-height: 36px;
        }
      }
    }

    a {
      text-decoration: underline;
    }

    * {
      max-width: ${LAYOUT_POST_WIDTH};
      margin: inherit auto;
    }

    img {
      max-width: 100%;
    }
  }

  ${media(LAYOUT_BREAKPOINT_MD)} {
    padding: 0;

    h1 {
      font-size: ${BASE_FONT_SIZE} * 3;
      line-height: 60px;
      margin-top: 60px;
      margin-bottom: 36px;
    }

    div {
      font-size: ${BASE_FONT_SIZE} * 1.125;
      line-height: 28px;
      margin-bottom: 28px;

      p {
        font-size: ${BASE_FONT_SIZE} * 1.125;
        line-height: 28px;
        margin-bottom: 28px;
      }
    }
  }
`;

const Content = ({ body, title }) => (
  <ContentWrapper>
    <h1>{title}</h1>
    <div dangerouslySetInnerHTML={{ __html: body }} />
  </ContentWrapper>
);

export default Content;
