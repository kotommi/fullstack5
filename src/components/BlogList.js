import React from "react";
import Blog from "./Blog";

const BlogList = ({ blogs, removeBlog, user }) => {
  if (!blogs || !user) {
    return null;
  }
  blogs.sort((a, b) => b.likes - a.likes);
  return (
    <div className="blog">
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          removeBlog={removeBlog}
          currentUser={user}
        />
      ))}
    </div>
  );
};

export default BlogList;
