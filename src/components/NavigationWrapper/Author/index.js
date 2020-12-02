import { Link, withPrefix } from "gatsby";
import React from "react";
import styled from "styled-components";

const Photo = styled.img`
  display: inline-block;
  max-width: 300px;
  background-clip: padding-box;
`;

export const Author = ({ author }) => (
  <Link id="logo" to="/">
    <Photo src={withPrefix(author.photo)} alt={author.name} />
  </Link>
);
