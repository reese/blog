import { Link } from "gatsby";
import React from "react";
import { NavigationWrapper } from "../components/NavigationWrapper";
import { Page } from "../components/Page";
import { useSiteMetadata, useTagsList } from "../hooks";
import { kebabCase } from "../utils/kebabCase";

const TagsListTemplate = () => {
  const { title, subtitle } = useSiteMetadata();
  const tags = useTagsList();

  return (
    <NavigationWrapper title={`Tags - ${title}`} description={subtitle}>
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
    </NavigationWrapper>
  );
};

export default TagsListTemplate;
