import React, { useState } from "react";
import styled from "styled-components";
import RefreshSymbol from "../../assets/svg/refresh.svg";

const Header = styled.div`
  & > h1 {
    font-size: 4rem;
  }

  & > * {
    margin: 5px;
  }

  margin: 5rem 0;
`;

const RefreshIcon = styled.img`
  display: inline-block;
`;

const ACTIONS = [
  "breaks computers in increasingly terrifying ways",
  "really needs an adult",
  "could really use a nap right now",
  "is deleting as much code as humanly possible without getting fired",
  "is probably thinking about where he can get a cinnamon roll right now",
];

export const IndexHeader = () => {
  const [action, setAction] = useState(ACTIONS[0]);
  const onClick = () => {
    const index = Math.floor(Math.random() * Math.floor(ACTIONS.length));
    // Prevent randomly picking the current action
    if (ACTIONS[index] === action) return onClick();

    setAction(ACTIONS[index]);
  };

  return (
    <Header>
      <h1>Reese Williams</h1>
      <h2>
        {action} <RefreshIcon src={RefreshSymbol} onClick={onClick} />
      </h2>
      <h4>
        Senior Software Engineer, professional question-asker, usually up to no
        good at <a href="https://hubspot.com">HubSpot</a>
      </h4>
    </Header>
  );
};
