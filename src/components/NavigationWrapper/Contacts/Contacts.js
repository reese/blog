import React from "react";
import styled from "styled-components";
import {
  BUTTON_HEIGHT,
  COLOR_BASE,
  COLOR_PRIMARY,
} from "../../../constants/colors";
import { getContactHref, getIcon } from "../../../utils";
import Icon from "../../Icon";

const ContactsContainer = styled.div`
  ul {
    display: flex;
    flex-flow: row;
    flex-grow: 0;
    flex-shrink: 0;
    list-style: none;
    padding: 0;
    margin: 10px -3px;
    width: 220px;

    li {
      padding: 0;
      margin: 4px;
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: center;
      height: ${BUTTON_HEIGHT};
      width: ${BUTTON_HEIGHT};
      line-height: ${BUTTON_HEIGHT};
      text-align: center;

      a {
        border: 0;
        display: flex;
        color: ${COLOR_BASE};

        :hover,
        :focus {
          color: ${COLOR_PRIMARY};
        }
      }
    }
  }
`;

const Contacts = ({ contacts }) => (
  <ContactsContainer>
    <ul>
      {Object.keys(contacts).map((name) => (
        <li key={name}>
          <a
            href={getContactHref(name, contacts[name])}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon name={name} icon={getIcon(name)} />
          </a>
        </li>
      ))}
    </ul>
  </ContactsContainer>
);

export default Contacts;
