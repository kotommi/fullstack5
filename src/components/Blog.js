import React, { useState } from "react";
import { connect } from "react-redux";
import { addLike, removeBlog } from "../reducers/blogReducer";
import { changeNotification } from "../reducers/notificationReducer";

const Blog = props => {
  const blog = props.blog;
  const [visible, setVisible] = useState(false);

  //const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const handleLike = async () => {
    try {
      props.addLike(blog);
    } catch (e) {
      console.log(e.response.data.message);
      props.changeNotification(e.response.data.message);
    }
  };

  const removeButton = () => {
    if (
      !blog.user ||
      !props.currentUser ||
      blog.user.username !== props.currentUser.username
    ) {
      return <span />;
    } else
      return <button onClick={() => props.removeBlog(blog)}>remove</button>;
  };

  return (
    <div className="blog" style={blogStyle} onClick={() => toggleVisibility()}>
      {blog.title} {blog.author}
      <div style={showWhenVisible}>
        <p>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          {`${blog.likes} likes`}
          <button onClick={() => handleLike()}>like</button>
        </p>
        <p>added by {!blog.user ? "anonymous" : blog.user.username}</p>
        {removeButton()}
      </div>
    </div>
  );
};

export default connect(
  null,
  { addLike, removeBlog, changeNotification }
)(Blog);
