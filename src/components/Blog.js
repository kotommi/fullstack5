import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, removeBlog, currentUser }) => {
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

  const addLike = async () => {
    blog.likes = Number(blog.likes) + 1;
    try {
      await blogService.update(blog.id, blog);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  const removeButton = () => {
    if (
      !blog.user ||
      !currentUser ||
      blog.user.username !== currentUser.username
    ) {
      return <span />;
    } else return <button onClick={() => removeBlog(blog)}>remove</button>;
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
          <button onClick={() => addLike()}>like</button>
        </p>
        <p>added by {!blog.user ? "anonymous" : blog.user.username}</p>
        {removeButton()}
      </div>
    </div>
  );
};

export default Blog;
