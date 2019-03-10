import React from "react";
import { connect } from "react-redux";

const Notification = props => {
  const style = {
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px"
  };

  const notification = props.notification;
  if (!notification) {
    return null;
  }

  return <div style={style}>{notification}</div>;
};

const mapStateToProps = state => {
  return {
    notification: state.notification
  };
};

export default connect(mapStateToProps)(Notification);
