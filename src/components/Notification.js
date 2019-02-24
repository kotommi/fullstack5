import React from "react";

const Notification = props => {
  const style = {
    color: "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px"
  };
  return props.message === null ? null : (
    <div style={style}>{props.message}</div>
  );
};

export default Notification;
