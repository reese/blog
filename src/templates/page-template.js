import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import { NavigationWrapper } from "../components/NavigationWrapper";
import { Page } from "../components/Page";
import { useSiteMetadata } from "../hooks";

const PageTemplate = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { body: pageBody } = data.mdx;
  const { frontmatter } = data.mdx;
  const {
    title: pageTitle,
    description: pageDescription,
    socialImage,
  } = frontmatter;
  const metaDescription =
    pageDescription !== null ? pageDescription : siteSubtitle;

  return (
    <NavigationWrapper
      title={`${pageTitle} - ${siteTitle}`}
      description={metaDescription}
      socialImage={socialImage}
    >
      <Page title={pageTitle}>
        <MDXRenderer title={pageTitle}>{pageBody}</MDXRenderer>
      </Page>
    </NavigationWrapper>
  );
};

export const query = graphql`
  query PageBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      frontmatter {
        title
        date
        description
        socialImage
      }
    }
  }
`;

export default PageTemplate;
