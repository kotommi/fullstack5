import React from "react";
import Blog from "./Blog";
import { connect } from "react-redux";

const BlogList = props => {
  if (!props.blogs || !props.user) {
    return null;
  }
  return (
    <div className="blog">
      {props.blogs.map(blog => (
        <Blog key={blog.id} blog={blog} currentUser={props.user} />
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  };
};

export default connect(mapStateToProps)(BlogList);
