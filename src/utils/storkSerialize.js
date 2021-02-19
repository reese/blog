const path = require("path");

const serialize = ({ allMdx }) => {
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

module.exports = { serialize };
