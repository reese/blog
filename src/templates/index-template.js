import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";
import { IndexHeader } from "../components/IndexHeader";
import { NavigationWrapper } from "../components/Sidebar";
import {
  BACKGROUND_COLOR,
  COLOR_BASE,
  COLOR_PRIMARY,
} from "../constants/colors";
import { useSiteMetadata } from "../hooks";

const query = graphql`
  query IndexTemplate {
    posts: allMarkdownRemark(
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
    notes: allMarkdownRemark(
      limit: 5
      filter: { frontmatter: { template: { eq: "note" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;

const DualColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const HoverContainer = styled.div`
  background-color: ${BACKGROUND_COLOR};
  border-radius: 10px;
  border: 1px lightgray solid;
  margin: 30px 10px 30px 0;
  padding: 15px 0 15px 10px;
  transition: all 0.1s ease-in-out;
  width: 90%;
  z-index: 1;

  & * {
    color: ${COLOR_BASE};
  }

  & h5 {
    color: ${COLOR_PRIMARY};
  }

  & h5:hover,
  & a:hover {
    color: ${COLOR_PRIMARY};
  }

  &:hover {
    border-left: 3px ${COLOR_PRIMARY} solid;
    transform: scale(1.05);
  }
`;

const Notes = ({ notes: { edges } }) => {
  return (
    <div style={{ flex: "1" }}>
      <h3>Digital Garden</h3>
      {edges.map(({ node: { fields: { slug }, frontmatter: { title } } }) => (
        <Link to={slug}>
          <HoverContainer key={slug}>
            <h5 style={{ margin: 0 }}>{title}</h5>
          </HoverContainer>
        </Link>
      ))}
    </div>
  );
};

const Posts = ({ posts: { edges } }) => (
  <div style={{ flex: "2" }}>
    <h3>Posts</h3>
    {edges.map(
      ({
        node: {
          fields: { slug, readingTime },
          frontmatter: { description, date, category, title },
        },
      }) => (
        <Link to={slug}>
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
  console.log(posts);

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
