import { Link, withPrefix } from "gatsby";
import React from "react";
import styled from "styled-components";

const Photo = styled.img`
  display: inline-block;
  margin-bottom: 0;
  max-width: 300px;
  background-clip: padding-box;
`;

export const Author = ({ author }) => (
  <Link to="/">
    <Photo src={withPrefix(author.photo)} alt={author.name} />
  </Link>
);
