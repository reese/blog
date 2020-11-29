import React from "react";
import Layout from "../components/Layout";
import Page from "../components/Page";
import { NavigationWrapper } from "../components/Sidebar";
import { useSiteMetadata } from "../hooks";

const NotFoundTemplate = () => {
  const { title, subtitle } = useSiteMetadata();

  return (
    <Layout title={`Not Found - ${title}`} description={subtitle}>
      <NavigationWrapper />
      <Page title="NOT FOUND">
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Page>
    </Layout>
  );
};

export default NotFoundTemplate;
