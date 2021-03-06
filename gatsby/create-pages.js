"use strict";

const path = require("path");
const createCategoriesPages = require("./pagination/create-categories-pages.js");
const createTagsPages = require("./pagination/create-tags-pages.js");
const createPostsPages = require("./pagination/create-posts-pages.js");

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // 404
  createPage({
    path: "/404",
    component: path.resolve("./src/templates/not-found-template.js"),
  });

  // Tags list
  createPage({
    path: "/tags",
    component: path.resolve("./src/templates/tags-list-template.js"),
  });

  // Categories list
  createPage({
    path: "/categories",
    component: path.resolve("./src/templates/categories-list-template.js"),
  });

  // Posts and pages from markdown
  const result = await graphql(`
    {
      allMdx(filter: { frontmatter: { draft: { ne: true } } }) {
        edges {
          node {
            frontmatter {
              template
            }
            fields {
              slug
              readingTime {
                text
              }
            }
          }
        }
      }
    }
  `);

  const { edges } = result.data.allMdx;

  edges.forEach((edge) => {
    const {
      frontmatter: { template },
      fields: { slug },
    } = edge.node;
    if (template === "page") {
      createPage({
        path: slug,
        component: path.resolve("./src/templates/page-template.js"),
        context: { slug },
      });
    } else if (template === "post") {
      createPage({
        path: slug,
        component: path.resolve("./src/templates/post-template.js"),
        context: { slug },
      });
    }
  });

  // Feeds
  await createTagsPages(graphql, actions);
  await createCategoriesPages(graphql, actions);
  await createPostsPages(graphql, actions);
  createPage({
    path: "/",
    component: path.resolve("./src/templates/index-template.js"),
  });
};

module.exports = createPages;
