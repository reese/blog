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

  margin: 5rem auto;
  max-width: 750px;
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
        {action}{" "}
        <button
          aria-label="New Sentence"
          style={{
            backgroundColor: "inherit",
            fontSize: "100%",
            fontFamily: "inherit",
            border: 0,
            padding: 0,
          }}
        >
          <RefreshIcon
            src={RefreshSymbol}
            onClick={onClick}
            alt="Refresh Symbol"
          />
        </button>
      </h2>
      <h3>
        Senior Software Engineer, professional question-asker, usually up to no
        good at <a href="https://hubspot.com">HubSpot</a>
      </h3>
    </Header>
  );
};
