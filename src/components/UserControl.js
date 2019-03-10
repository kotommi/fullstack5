import React from "react";
import { connect } from "react-redux";
import { setUser } from "../reducers/userReducer";

const UserControl = props => {
  const user = props.user;

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    props.setUser(null);
  };

  return (
    <div>
      <p>{user.username} is logged in</p>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { setUser }
)(UserControl);
