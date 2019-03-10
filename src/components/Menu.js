import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../reducers/userReducer";

const Menu = props => {
  const user = props.user;

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    props.setUser(null);
  };

  const buttonStyle = {
    marginLeft: "10px"
  };

  const divStyle = {
    background: "darkgrey",
    padding: "10px",
    marginBottom: "10px"
  };

  return (
    <div style={divStyle}>
      <p>
        <Link to="/">blogs</Link> <Link to="/users">users</Link> {user.username}{" "}
        is logged in
        <button style={buttonStyle} onClick={handleLogout}>
          logout
        </button>
      </p>
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
)(Menu);
