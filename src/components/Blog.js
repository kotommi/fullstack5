import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
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

  return (
    <div style={blogStyle} onClick={() => toggleVisibility()}>
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
      </div>
    </div>
  );
};

export default Blog;
