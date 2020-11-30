import { Link } from "gatsby";
import React from "react";
import { useSiteMetadata } from "../../../hooks";
import { Author } from "../Author";
import styles from "./Menu.module.scss";

const Menu = ({ menu }) => {
  const { author } = useSiteMetadata();

  return (
    <nav className={styles["menu"]}>
      <Author author={author} />
      <div>
        {menu.map((item) => (
          <Link
            to={item.path}
            className={styles["menu-item"]}
            activeClassName={styles["menu-item--active"]}
            key={item.path}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Menu;
