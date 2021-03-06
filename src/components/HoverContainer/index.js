import styled from "styled-components";
import {
  BACKGROUND_COLOR,
  BASE_FONT_SIZE,
  COLOR_BASE,
  COLOR_PRIMARY,
} from "../../constants/colors";

export const HoverContainer = styled.div`
  background-color: ${BACKGROUND_COLOR};
  border-radius: 10px;
  border: 1px lightgray solid;
  margin: 20px 10px 0 0;
  padding: 15px 10px;
  transition: all 0.1s ease-in-out;
  width: 90%;
  z-index: 1;

  & * {
    color: ${COLOR_BASE};
  }

  & p {
    color: ${COLOR_PRIMARY};
    font-size: ${BASE_FONT_SIZE};
    font-weight: bold;
  }

  & p:hover,
  & a:hover {
    color: ${COLOR_PRIMARY};
  }

  &:hover {
    border-left: 3px ${COLOR_PRIMARY} solid;
    transform: scale(1.05);
  }
`;
