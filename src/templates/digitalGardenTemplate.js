import { graphql, Link, useStaticQuery } from "gatsby";
import React, { useMemo } from "react";
import styled from "styled-components";
import { HoverContainer } from "../components/HoverContainer";
import { NavigationWrapper } from "../components/NavigationWrapper";
import { useSiteMetadata } from "../hooks";

const query = graphql`
  query DigitalGardenTemplate {
    notes: allMdx(
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
            date
          }
        }
      }
    }
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    ". . ."
    ". . ."
    ". . .";
`;

// TODO: Allow users to sort by title
const Notes = ({ notes: { edges } }) => {
  const sortedEdges = useMemo(
    // Sort fields by title
    () =>
      edges
        .slice(0)
        .sort((a, b) => a.node.frontmatter.date > b.node.frontmatter.date),
    [edges]
  );

  return (
    <div style={{ flex: 1 }}>
      <h3>Digital Garden</h3>
      <GridContainer>
        {sortedEdges.map(
          ({
            node: {
              fields: { slug },
              frontmatter: { title },
            },
          }) => (
            <Link to={slug}>
              <HoverContainer key={slug}>
                <h5 style={{ margin: 0 }}>{title}</h5>
              </HoverContainer>
            </Link>
          )
        )}
      </GridContainer>
    </div>
  );
};

const IndexTemplate = () => {
  const { subtitle: siteSubtitle } = useSiteMetadata();
  const { notes } = useStaticQuery(query);

  return (
    <NavigationWrapper
      title="Reese Williams - Software Engineer"
      description={siteSubtitle}
    >
      <Notes notes={notes} />
    </NavigationWrapper>
  );
};

export default IndexTemplate;
