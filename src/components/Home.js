import React from "react";

import Togglable from "./Togglable";
import BlogList from "./BlogList";
import BlogForm from "./BlogForm";

const Home = props => {
  const blogFormRef = React.createRef();
  return (
    <div>
      <h2>blogs</h2>
      <Togglable buttonLabel={"create new"} ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <BlogList />
    </div>
  );
};

export default Home;
