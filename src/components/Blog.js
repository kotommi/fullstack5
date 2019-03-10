import React from "react";
import { connect } from "react-redux";
import { addLike, removeBlog } from "../reducers/blogReducer";
import { changeNotification } from "../reducers/notificationReducer";

const Blog = props => {
  let blog = props.shownBlog;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const handleLike = () => {
    try {
      props.addLike(blog);
    } catch (e) {
      console.log(e.response.data.message);
      props.changeNotification(e.response.data.message);
    }
  };

  const handleRemove = () => {
    props.removeBlog(blog);
    props.changeNotification(`removed ${blog.title}`);
  };

  const removeButton = () => {
    // comparing usernames for a reason
    if (
      !blog.user ||
      !props.user ||
      blog.user.username !== props.user.username
    ) {
      return <span />;
    } else return <button onClick={handleRemove}>remove</button>;
  };

  if (!blog) {
    return null;
  }

  return (
    <div style={blogStyle}>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes<button onClick={handleLike}>like</button>
      </p>
      <p>added by {blog.user ? blog.user.username : "anonymous"}</p>
      <p>{removeButton()}</p>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const shownBlog = state.blogs.find(blog => blog.id === ownProps.id);
  return {
    shownBlog,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { addLike, removeBlog, changeNotification }
)(Blog);
