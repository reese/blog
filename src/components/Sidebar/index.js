import React from "react";
import { useSiteMetadata } from "../../hooks";
import Layout from "../Layout";
import Contacts from "./Contacts";
import Copyright from "./Copyright";
import Menu from "./Menu";
import styles from "./Sidebar.module.scss";

export const NavigationWrapper = ({
  title,
  description,
  socialImage,
  children,
}) => {
  const { author, copyright, menu } = useSiteMetadata();

  return (
    <Layout title={title} description={description} socialImage={socialImage}>
      <div className={styles["sidebar"]}>
        <div className={styles["sidebar__inner"]}>
          <Menu menu={menu} />
          {children}
          <div>
            <Contacts contacts={author.contacts} />
            <Copyright copyright={copyright} />
          </div>
        </div>
      </div>
    </Layout>
  );
};
