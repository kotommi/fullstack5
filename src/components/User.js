import React from "react";
import { connect } from "react-redux";

const User = props => {
  if (!props.shownUser) {
    return null;
  }

  return (
    <div>
      <h1>{props.shownUser.username}</h1>
      <h2>added blogs</h2>
      <ul>
        {props.shownUser.blogs.map(blog => {
          return <li key={blog.id}>{blog.title}</li>;
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    shownUser: state.users.find(user => user.id === ownProps.id)
  };
};

export default connect(mapStateToProps)(User);
