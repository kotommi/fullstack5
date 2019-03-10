import React, { useState } from "react";
import blogService from "../services/blogs";
import { changeNotification } from "../reducers/notificationReducer";
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
      const createdBlog = await blogService.create(newBlog);
      props.blogFormRef.current.toggleVisibility();
      props.setBlogs(props.blogs.concat(createdBlog));
      //props.handleErrorMessage(
      //  `a new blog ${createdBlog.title} by ${createdBlog.author} added`
      //);
      props.changeNotification(
        `a new blog ${createdBlog.title} by ${createdBlog.author} added`
      );
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (exception) {
      const message = exception.response.data.error;
      //props.handleErrorMessage(message);
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
  changeNotification
};

export default connect(
  null,
  mapDispatchToProps
)(BlogForm);
