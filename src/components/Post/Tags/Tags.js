// @flow strict
import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";
import {
  BUTTON_BORDER_RADIUS,
  BUTTON_HEIGHT,
  COLOR_BASE,
  COLOR_PRIMARY,
} from "../../../constants/colors";

const TagsWrapper = styled.div`
  margin-bottom: 12px;

  ul {
    display: inline-block;
    margin: 0 -10px;
    padding: 0;

    li {
      display: inline-block;
      margin: 10px 5px;

      a {
        display: inline-block;
        height: ${BUTTON_HEIGHT};
        padding: 0 24px;
        line-height: ${BUTTON_HEIGHT};
        border: 1px solid ${COLOR_BASE};
        text-decoration: none;
        border-radius: ${BUTTON_BORDER_RADIUS};
        color: ${COLOR_BASE} !important;

        :hover,
        :focus {
          color: ${COLOR_PRIMARY};
        }
      }
    }
  }
`;

const Tags = ({ tags, tagSlugs }) => (
  <TagsWrapper>
    <ul>
      {tagSlugs &&
        tagSlugs.map((slug, i) => (
          <li key={tags[i]}>
            <Link to={slug}>{tags[i]}</Link>
          </li>
        ))}
    </ul>
  </TagsWrapper>
);

export default Tags;
