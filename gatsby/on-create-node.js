"use strict";

const kebabCase = require("./utils/kebabCase");
const { createFilePath } = require("gatsby-source-filesystem");

const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "Mdx") {
    if (typeof node.frontmatter.slug !== "undefined") {
      const dirname = getNode(node.parent).relativeDirectory;
      createNodeField({
        node,
        name: "slug",
        value: `/${dirname}/${node.frontmatter.slug}`,
      });
    } else {
      const value = createFilePath({ node, getNode });
      createNodeField({
        node,
        name: "slug",
        value,
      });
    }

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(
        (tag) => `/tag/${kebabCase(tag)}/`
      );
      createNodeField({ node, name: "tagSlugs", value: tagSlugs });
    }

    if (node.frontmatter.category) {
      const categorySlug = `/category/${kebabCase(node.frontmatter.category)}/`;
      createNodeField({ node, name: "categorySlug", value: categorySlug });
    }
  }
};

module.exports = onCreateNode;
