import { Link } from "gatsby";
import moment from "moment";
import React from "react";
import styled from "styled-components";
import {
  BASE_FONT_SIZE,
  COLOR_BASE,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  SMALL_FONT_SIZE,
} from "../../constants/colors";

const FeedWrapper = styled.div`
  .item {
    margin-bottom: 35px;

    h2 {
      font-size: ${BASE_FONT_SIZE} * 1.6875;
      line-height: 40px;
      margin-top: 0;
      margin-bottom: 4px;

      a {
        color: ${COLOR_BASE};
      }

      a:hover,
      a:focus {
        color: ${COLOR_BASE};
        border-bottom: 1px solid ${COLOR_BASE};
      }
    }

    a.category {
      font-size: ${SMALL_FONT_SIZE};
      color: ${COLOR_SECONDARY};
      font-weight: 600;
      text-transform: uppercase;

      :hover,
      :focus {
        color: ${COLOR_PRIMARY};
      }
    }

    p {
      font-size: ${BASE_FONT_SIZE};
      line-height: 26px;
      margin: 0px;
    }

    time {
      font-size: ${SMALL_FONT_SIZE};
      color: ${COLOR_BASE};
      font-weight: 600;
      text-transform: uppercase;
    }

    .divider {
      margin: 0 4px;
    }

    .readmore {
      font-size: ${BASE_FONT_SIZE};
      font-weight: 500;
      color: ${COLOR_PRIMARY};

      :hover,
      :focus {
        color: ${COLOR_PRIMARY};
        border-bottom: 1px solid ${COLOR_PRIMARY};
      }
    }
  }

  .item:last-child {
    margin-bottom: 15px;
  }
`;

const Feed = ({ edges }) => (
  <FeedWrapper>
    {edges.map((edge) => (
      <div className="item" key={edge.node.fields.slug}>
        <div style={{ marginBottom: "0" }}>
          <time
            dateTime={moment(edge.node.frontmatter.date).format("MMMM D, YYYY")}
          >
            {moment(edge.node.frontmatter.date).format("MMMM YYYY")}
          </time>
          <span className="divider" />
          <Link className="category" to={edge.node.fields.categorySlug}>
            {edge.node.frontmatter.category}
          </Link>
          <span className="divider" />
          <time>{edge.node.fields.readingTime.text}</time>
        </div>
        <h2>
          <Link to={edge.node.fields.slug}>{edge.node.frontmatter.title}</Link>
        </h2>
        <p className="description">{edge.node.frontmatter.description}</p>
        <Link className="readmore" to={edge.node.fields.slug}>
          Read
        </Link>
      </div>
    ))}
  </FeedWrapper>
);

export default Feed;
