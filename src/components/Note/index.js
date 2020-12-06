import React from "react";
import Content from "../Post/Content";

export const Note = ({ note, title }) => {
  const { body } = note;

  return <Content body={body} title={title} />;
};
