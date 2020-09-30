import React from "react";
import spinner from "./spinner.gif";
export default () => {
  return (
    <div style={{width :'400px',margin: "auto",display: "block" }}>
      <img
        src={spinner}
        style={{ width: "200", margin: "auto", display: "block" }}
        alt="Loading..."
      ></img>
    </div>
  );
};
