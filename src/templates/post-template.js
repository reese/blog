import { graphql } from "gatsby";
import React from "react";
import { NavigationWrapper } from "../components/NavigationWrapper";
import Post from "../components/Post";
import { useSiteMetadata } from "../hooks";

const PostTemplate = ({ data }) => {
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
      <Post post={data.mdx} />
    </NavigationWrapper>
  );
};

export const query = graphql`
  query PostBySlug($slug: String!) {
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

export default PostTemplate;
