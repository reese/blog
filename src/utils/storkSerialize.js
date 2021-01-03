const path = require("path");

const query = `
  {
    site {
      siteMetadata {
        siteUrl
      }
    }
    allMdx(
      limit: 1000
      sort: { order: DESC, fields: frontmatter___date }
      filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
    ) {
      edges {
        node {
          rawBody
          fields { slug }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;

const serialize = ({ site, allMdx }) => {
  const {
    siteMetadata: { siteUrl: url },
  } = site;
  return allMdx.edges.map(
    ({
      node: {
        rawBody,
        fields: { slug },
        frontmatter: { title },
      },
    }) => ({
      url: path.join(url, slug),
      contents: rawBody,
      filetype: "Markdown",
      title,
    })
  );
};

module.exports = { query, serialize };
