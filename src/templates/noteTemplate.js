import { graphql } from "gatsby";
import React from "react";
import { NavigationWrapper } from "../components/NavigationWrapper";
import { Note } from "../components/Note";
import { useSiteMetadata } from "../hooks";

const NoteTemplate = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { frontmatter } = data.mdx;
  const {
    title: postTitle,
    description: postDescription,
    socialImage,
  } = frontmatter;
  const metaDescription =
    postDescription !== null ? postDescription : siteSubtitle;

  return (
    <NavigationWrapper
      title={`${postTitle} - ${siteTitle}`}
      description={metaDescription}
      socialImage={socialImage}
    >
      <Note note={data.mdx} />
    </NavigationWrapper>
  );
};

export const query = graphql`
  query NoteBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      fields {
        slug
        tagSlugs
      }
      frontmatter {
        date
        description
        tags
        title
        socialImage
      }
    }
  }
`;

export default NoteTemplate;
