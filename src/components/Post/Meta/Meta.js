import moment from "moment";
import React from "react";

const Meta = ({ date }) => (
  <div>
    <p style={{ fontStyle: "italic" }}>
      Published {moment(date).format("D MMM YYYY")}
    </p>
  </div>
);

export default Meta;
