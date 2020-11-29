import { graphql } from "gatsby";
import React from "react";
import Feed from "../components/Feed";
import Layout from "../components/Layout";
import Page from "../components/Page";
import Pagination from "../components/Pagination";
import { NavigationWrapper } from "../components/Sidebar";
import { useSiteMetadata } from "../hooks";

const IndexTemplate = ({ data, pageContext }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();

  const {
    currentPage,
    hasNextPage,
    hasPrevPage,
    prevPagePath,
    nextPagePath,
  } = pageContext;

  const { edges } = data.allMarkdownRemark;
  const pageTitle =
    currentPage > 0 ? `Posts - Page ${currentPage} - ${siteTitle}` : siteTitle;

  return (
    <Layout title={pageTitle} description={siteSubtitle}>
      <NavigationWrapper />
      <Page>
        <Feed edges={edges} />
        <Pagination
          prevPagePath={prevPagePath}
          nextPagePath={nextPagePath}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
        />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query IndexTemplate($postsLimit: Int!, $postsOffset: Int!) {
    allMarkdownRemark(
      limit: $postsLimit
      skip: $postsOffset
      filter: {
        frontmatter: { template: { eq: "post" }, draft: { eq: false } }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
            categorySlug
            readingTime {
              text
            }
          }
          frontmatter {
            title
            date
            category
            description
          }
        }
      }
    }
  }
`;

export default IndexTemplate;
