import { withPrefix } from "gatsby";
import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import { LAYOUT_WIDTH } from "../../constants/colors";
import { useSiteMetadata } from "../../hooks";

const LayoutContainer = styled.div`
  max-width: ${LAYOUT_WIDTH};
  margin: auto 0;
`;

export const Layout = ({ children, title, description, socialImage }) => {
  const { author, url } = useSiteMetadata();
  const metaImage = socialImage != null ? socialImage : author.photo;
  const metaImageUrl = url + withPrefix(metaImage);

  return (
    <LayoutContainer>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:site_name" content={title} />
        <meta property="og:image" content={metaImageUrl} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={metaImageUrl} />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400&family=Raleway:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      {children}
    </LayoutContainer>
  );
};
