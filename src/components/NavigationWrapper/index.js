import React from "react";
import styled from "styled-components";
import {
  LAYOUT_BREAKPOINT_MD,
  LAYOUT_BREAKPOINT_SM,
} from "../../constants/colors";
import { useSiteMetadata } from "../../hooks";
import { media } from "../../utils/mediaQuery";
import { Layout } from "../Layout";
import Contacts from "./Contacts";
import Copyright from "./Copyright";
import Menu from "./Menu";

const Navigation = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 25px 20px 0;

  ${media(LAYOUT_BREAKPOINT_SM)} {
    padding: 30px 20px 0;
  }

  ${media(LAYOUT_BREAKPOINT_MD)} {
    padding: 40px;
  }
`;

export const NavigationWrapper = ({
  title,
  description,
  socialImage,
  children,
}) => {
  const { author, copyright, menu } = useSiteMetadata();

  return (
    <Layout title={title} description={description} socialImage={socialImage}>
      <Navigation>
        <Menu menu={menu} />
        {children}
        <footer
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Copyright copyright={copyright} />
          <Contacts contacts={author.contacts} />
        </footer>
      </Navigation>
    </Layout>
  );
};
