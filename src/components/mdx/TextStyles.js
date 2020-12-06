import Tippy from "@tippyjs/react";
import React from "react";
import "tippy.js/animations/scale.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/material.css";

export const Anchor = (props) => {
  if (props.href[0] === "#") return <a {...props} />;

  return (
    <Tippy content={props.href} theme="material" animation="scale">
      <a {...props} />
    </Tippy>
  );
};
