import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";
import { HoverContainer } from "../components/HoverContainer";
import { IndexHeader } from "../components/IndexHeader";
import { NavigationWrapper } from "../components/NavigationWrapper";
import { useSiteMetadata } from "../hooks";

const query = graphql`
  query IndexTemplate {
    posts: allMdx(
      limit: 5
      filter: {
        frontmatter: { template: { eq: "post" }, draft: { eq: false } }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
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

const DualColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Posts = ({ posts: { edges } }) => (
  <div style={{ minWidth: "300px", margin: "auto" }}>
    <h3>Posts</h3>
    {edges.map(
      ({
        node: {
          fields: { slug, readingTime },
          frontmatter: { description, date, category, title },
        },
      }) => (
        <Link to={slug} key={slug}>
          <HoverContainer key={slug}>
            <span>
              <p style={{ margin: 0 }}>{title}</p>
              <span style={{ fontWeight: "bold" }}>{category}</span> | {date}
              {" | "}
              {readingTime.text}
            </span>
            <section>{description}</section>
          </HoverContainer>
        </Link>
      )
    )}
  </div>
);

const IndexTemplate = () => {
  const { subtitle: siteSubtitle } = useSiteMetadata();
  const { posts } = useStaticQuery(query);

  return (
    <NavigationWrapper
      title="Reese Williams - Software Engineer"
      description={siteSubtitle}
    >
      <IndexHeader />
      <Posts posts={posts} />
    </NavigationWrapper>
  );
};

export default IndexTemplate;
