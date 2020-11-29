import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import Page from "../components/Page";
import { NavigationWrapper } from "../components/Sidebar";
import { useSiteMetadata } from "../hooks";

const PageTemplate = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { html: pageBody } = data.markdownRemark;
  const { frontmatter } = data.markdownRemark;
  const {
    title: pageTitle,
    description: pageDescription,
    socialImage,
  } = frontmatter;
  const metaDescription =
    pageDescription !== null ? pageDescription : siteSubtitle;

  return (
    <Layout
      title={`${pageTitle} - ${siteTitle}`}
      description={metaDescription}
      socialImage={socialImage}
    >
      <NavigationWrapper />
      <Page title={pageTitle}>
        <div dangerouslySetInnerHTML={{ __html: pageBody }} />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
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
