import { graphql } from "gatsby";
import React from "react";
import { NavigationWrapper } from "../../../components/NavigationWrapper";
import { Note } from "../../../components/Note";
import { useSiteMetadata } from "../../../hooks";

const NoteTemplate = ({ data }) => {
  const { title: siteTitle } = useSiteMetadata();
  const { title: postTitle, childMdx, ...otherProps } = data.brainNote;

  return (
    <NavigationWrapper title={`${postTitle} - ${siteTitle}`}>
      <Note note={childMdx} title={postTitle} {...otherProps} />
    </NavigationWrapper>
  );
};

export const query = graphql`
  query NoteBySlug($slug: String!) {
    brainNote(slug: { eq: $slug }) {
      slug
      title
      externalInboundReferences {
        siteName
        sourcePage
        sourceUrl
        previewHtml
      }
      inboundReferences
      inboundReferencePreview {
        source
        previewHtml
      }
      childMdx {
        body
      }
    }
  }
`;

export default NoteTemplate;
