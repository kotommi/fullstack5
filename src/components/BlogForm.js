import React, { useState } from "react";
import { changeNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";
import { connect } from "react-redux";

const BlogForm = props => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleAdd = async event => {
    event.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url
    };
    try {
      props.blogFormRef.current.toggleVisibility();
      props.createBlog(newBlog);
      props.changeNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`
      );
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (exception) {
      const message = exception.response.data.error;
      props.changeNotification(message);
    }
  };

  return (
    <form className="blogform" onSubmit={handleAdd}>
      <div>
        <h2>Create new</h2>
        Title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  );
};

const mapDispatchToProps = {
  changeNotification,
  createBlog
};

export default connect(
  null,
  mapDispatchToProps
)(BlogForm);
