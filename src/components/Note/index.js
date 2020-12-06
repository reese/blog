import React from "react";
import Content from "../Post/Content";

export const Note = ({ note }) => {
  const { body } = note;
  const { tagSlugs } = note.fields;
  const { tags, title, date } = note.frontmatter;

  return <Content body={body} title={title} />;
};
