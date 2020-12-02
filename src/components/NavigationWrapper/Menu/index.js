import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";
import { COLOR_BASE, COLOR_PRIMARY } from "../../../constants/colors";
import { useSiteMetadata } from "../../../hooks";
import { Author } from "../Author";

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 0;
  margin: 0;

  .active-link {
    color: ${COLOR_BASE};
    border-bottom: 1px solid ${COLOR_BASE};
    border-bottom-width: 100%;
  }

  a {
    transition: color 0.3s ease-in;
    font-size: $typographic-base-font-size;
    color: ${COLOR_BASE};
    font-weight: normal;
    border: 0;
    padding: 0;
    margin: 0 20px;

    :hover,
    :focus {
      color: ${COLOR_PRIMARY};
      border-bottom: 1px solid ${COLOR_PRIMARY};
    }
  }

  #logo {
    margin: 0;
  }

  #logo:hover,
  #logo:focus {
    border: 0;
  }
`;

const Menu = ({ menu }) => {
  const { author } = useSiteMetadata();

  return (
    <header>
      <Nav>
        <Author author={author} />
        <div>
          {menu.map((item) => (
            <Link
              to={item.path}
              activeClassName={"active-link"}
              key={item.path}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </Nav>
    </header>
  );
};

export default Menu;
