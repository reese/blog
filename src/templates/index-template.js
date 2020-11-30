import { graphql } from "gatsby";
import React from "react";
import styled from "styled-components";
import { IndexHeader } from "../components/IndexHeader";
import { NavigationWrapper } from "../components/Sidebar";
import { useSiteMetadata } from "../hooks";

const PostsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const IndexTemplate = ({ data }) => {
  const { subtitle: siteSubtitle } = useSiteMetadata();
  console.log(data);

  return (
    <NavigationWrapper
      title="Reese Williams - Software Engineer"
      description={siteSubtitle}
    >
      <IndexHeader />
      <PostsContainer>
        <div>"Left"</div>
        <div>"Right"</div>
      </PostsContainer>
    </NavigationWrapper>
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
