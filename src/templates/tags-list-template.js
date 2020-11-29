import { Link } from "gatsby";
import kebabCase from "lodash/kebabCase";
import React from "react";
import Layout from "../components/Layout";
import Page from "../components/Page";
import { NavigationWrapper } from "../components/Sidebar";
import { useSiteMetadata, useTagsList } from "../hooks";

const TagsListTemplate = () => {
  const { title, subtitle } = useSiteMetadata();
  const tags = useTagsList();

  return (
    <Layout title={`Tags - ${title}`} description={subtitle}>
      <NavigationWrapper />
      <Page title="Tags">
        <ul>
          {tags.map((tag) => (
            <li key={tag.fieldValue}>
              <Link to={`/tag/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Page>
    </Layout>
  );
};

export default TagsListTemplate;
