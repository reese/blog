import { Link } from "gatsby";
import React from "react";
import { NavigationWrapper } from "../components/NavigationWrapper";
import { Page } from "../components/Page";
import { useCategoriesList, useSiteMetadata } from "../hooks";
import { kebabCase } from "../utils/kebabCase";

const CategoriesListTemplate = () => {
  const { title, subtitle } = useSiteMetadata();
  const categories = useCategoriesList();

  return (
    <NavigationWrapper title={`Categories - ${title}`} description={subtitle}>
      <Page title="Categories">
        <ul>
          {categories.map((category) => (
            <li key={category.fieldValue}>
              <Link to={`/category/${kebabCase(category.fieldValue)}/`}>
                {category.fieldValue} ({category.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Page>
    </NavigationWrapper>
  );
};

export default CategoriesListTemplate;
