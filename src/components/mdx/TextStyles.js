import Tippy from "@tippyjs/react";
import kebabCase from "lodash.kebabcase";
import React from "react";
import styled from "styled-components";
import "tippy.js/animations/scale.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/material.css";
import LinkSvg from "../../assets/svg/link.svg";
import { COLOR_BASE } from "../../constants/colors";

const LinkImg = styled.img`
  width: 15px;
  height: 15px;
  display: inline;
  margin-left: -27px;
  padding-right: 12px;
`;

const HoverAnchor = styled.a`
  color: ${COLOR_BASE};

  img {
    display: none;
  }

  :hover,
  :focus {
    color: ${COLOR_BASE};

    img {
      display: inline;
    }
  }
`;

const LinkableHeader = ({ children, id }) => {
  return (
    <>
      <HoverAnchor href={`#${id}`}>
        <LinkImg src={LinkSvg} />
        {children}
      </HoverAnchor>
    </>
  );
};

export const H2 = (props) => {
  const { children, ...otherProps } = props;
  return (
    <h2 {...otherProps} id={kebabCase(children)}>
      <LinkableHeader id={kebabCase(children)}>{children}</LinkableHeader>
    </h2>
  );
};

export const H3 = (props) => {
  const { children, ...otherProps } = props;
  return (
    <h3 {...otherProps} id={kebabCase(children)}>
      <LinkableHeader id={kebabCase(children)}>{children}</LinkableHeader>
    </h3>
  );
};

export const H4 = (props) => {
  const { children, ...otherProps } = props;
  return (
    <h4 {...otherProps} id={kebabCase(children)}>
      <LinkableHeader id={kebabCase(children)}>{children}</LinkableHeader>
    </h4>
  );
};

export const H5 = (props) => {
  const { children, ...otherProps } = props;
  return (
    <h5 {...otherProps} id={kebabCase(children)}>
      <LinkableHeader id={kebabCase(children)}>{children}</LinkableHeader>
    </h5>
  );
};

export const H6 = (props) => {
  const { children, ...otherProps } = props;
  return (
    <h6 {...otherProps} id={kebabCase(children)}>
      <LinkableHeader id={kebabCase(children)}>{children}</LinkableHeader>
    </h6>
  );
};

export const Anchor = (props) => {
  if (props.href[0] === "#") return <a {...props} />;

  return (
    <Tippy content={props.href} theme="material" animation="scale">
      <a {...props} />
    </Tippy>
  );
};
