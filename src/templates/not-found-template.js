import React from "react";
import Page from "../components/Page";
import { NavigationWrapper } from "../components/NavigationWrapper";
import { useSiteMetadata } from "../hooks";

const NotFoundTemplate = () => {
  const { title, subtitle } = useSiteMetadata();

  return (
    <NavigationWrapper title={`Not Found - ${title}`} description={subtitle}>
      <Page title="NOT FOUND">
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Page>
    </NavigationWrapper>
  );
};

export default NotFoundTemplate;
