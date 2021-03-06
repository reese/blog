import { Link } from "gatsby";
// import { StorkInput } from "gatsby-plugin-stork";
import React from "react";
import styled from "styled-components";
import {
  BASE_FONT_SIZE,
  COLOR_BASE,
  COLOR_PRIMARY,
  LAYOUT_BREAKPOINT_SM,
} from "../../../constants/colors";
import { useSiteMetadata } from "../../../hooks";
import { media } from "../../../utils/mediaQuery";
import { Author } from "../Author";

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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
    line-break: anywhere;
    transition: color 0.3s ease-in;
    font-size: ${BASE_FONT_SIZE};
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

  ${media(LAYOUT_BREAKPOINT_SM)} {
    div {
      display: flex;
      flex-direction: column;
    }
  }
`;

const Menu = ({ menu }) => {
  const { author } = useSiteMetadata();

  return (
    <header>
      <Nav>
        <Author author={author} />
        {/* <StorkInput placeholder="🔍" /> */}
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
