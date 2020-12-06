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
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 24px;
  padding: auto 0;

  ${media(LAYOUT_BREAKPOINT_SM)} {
    padding: 40px;
  }

  ${media(LAYOUT_BREAKPOINT_MD)} {
    padding: 30px 20px 0;
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
            flexWrap: "wrap",
            marginTop: "20px",
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
