import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import {
  BASE_FONT_SIZE,
  LAYOUT_BREAKPOINT_MD,
  LAYOUT_BREAKPOINT_SM,
  LAYOUT_POST_WIDTH,
} from "../../constants/colors";
import { media } from "../../utils/mediaQuery";

const PageWrapper = styled.div`
  margin-bottom: 50px;
  padding: 25px 20px;
  max-width: ${LAYOUT_POST_WIDTH}

  h1 {
    font-size: ${BASE_FONT_SIZE} * 2.5;
    font-weight: 600;
    margin-top: 0;
    margin: bottom: 30px;
    line-height: 52px;
  }

  div {
    font-size: ${BASE_FONT_SIZE};
    line-height: 26px;
    margin: 0 0 26px;
  }

  ${media(LAYOUT_BREAKPOINT_SM)} {
    padding: 30px 20px;
  }

  ${media(LAYOUT_BREAKPOINT_MD)} {
    padding: 40px 35px;
  }
`;

const Page = ({ title, children }) => {
  const pageRef = useRef();

  useEffect(() => {
    pageRef.current.scrollIntoView();
  });

  return (
    <PageWrapper ref={pageRef}>
      {title && <h1>{title}</h1>}
      <div>{children}</div>
    </PageWrapper>
  );
};

export default Page;
