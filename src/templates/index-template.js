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
    notes: allBrainNote(
      limit: 5
      sort: { order: DESC, fields: [childMdx___frontmatter___date] }
    ) {
      edges {
        node {
          slug
          title
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

const Notes = ({ notes: { edges } }) => {
  return (
    <div style={{ flex: "1", minWidth: "300px" }}>
      <h3>Digital Garden</h3>
      {edges.map(({ node: { slug, title } }) => (
        <Link to={`/notes/${slug}`} key={slug}>
          <HoverContainer key={slug}>
            <h5 style={{ margin: 0 }}>{title}</h5>
          </HoverContainer>
        </Link>
      ))}
    </div>
  );
};

const Posts = ({ posts: { edges } }) => (
  <div style={{ flex: "2", minWidth: "300px" }}>
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
              <h5 style={{ margin: 0 }}>{title}</h5>
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
  const { posts, notes } = useStaticQuery(query);

  return (
    <NavigationWrapper
      title="Reese Williams - Software Engineer"
      description={siteSubtitle}
    >
      <IndexHeader />
      <DualColumnContainer>
        <Notes notes={notes} />
        <Posts posts={posts} />
      </DualColumnContainer>
    </NavigationWrapper>
  );
};

export default IndexTemplate;
