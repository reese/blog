import React from "react";
import { useSiteMetadata } from "../../hooks";
import Layout from "../Layout";
import Contacts from "./Contacts";
import Copyright from "./Copyright";
import Menu from "./Menu";
import styles from "./NavigationWrapper.module.scss";

export const NavigationWrapper = ({
  title,
  description,
  socialImage,
  children,
}) => {
  const { author, copyright, menu } = useSiteMetadata();

  return (
    <Layout title={title} description={description} socialImage={socialImage}>
      <div className={styles["navigation"]}>
        <div className={styles["navigation__inner"]}>
          <Menu menu={menu} />
          {children}
          <footer
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Copyright copyright={copyright} />
            <Contacts contacts={author.contacts} />
          </footer>
        </div>
      </div>
    </Layout>
  );
};
