import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";
import { PAGINATION } from "../../constants";
import {
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
} from "../../constants/colors";

const PaginationWrapper = styled.div`
  margin-top: 50px;
  display: flex;

  .prev,
  .next {
    width: 50%;
  }

  .prev {
    text-align: left;
  }

  .next {
    text-align: right;
  }

  .disabled {
    pointer-events: none;
    color: ${COLOR_GRAY};
  }

  ${Link} {
    color: ${COLOR_SECONDARY};
    font-size: 26px;
    font-weight: bold;

    :hover,
    :focus {
      color: ${COLOR_PRIMARY};
    }
  }
`;

const Pagination = ({
  prevPagePath,
  nextPagePath,
  hasNextPage,
  hasPrevPage,
}) => (
  <PaginationWrapper>
    <div className="prev">
      {hasPrevPage && (
        <Link
          rel="prev"
          to={prevPagePath}
          className={!hasPrevPage && ".disabled"}
        >
          {PAGINATION.PREV_PAGE}
        </Link>
      )}
    </div>
    <div className="next">
      {hasNextPage && (
        <Link
          rel="next"
          to={hasNextPage ? nextPagePath : "/"}
          className={!hasPrevPage && ".disabled"}
        >
          {PAGINATION.NEXT_PAGE}
        </Link>
      )}
    </div>
  </PaginationWrapper>
);

export default Pagination;
