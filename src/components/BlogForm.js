import React, { useState } from "react";
import blogService from "../services/blogs";

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
      props.setBlogs(props.blogs.concat(createdBlog));
      props.handleErrorMessage(
        `a new blog ${createdBlog.title} by ${createdBlog.author} added`
      );
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (exception) {
      const message = exception.response.data.error;
      props.handleErrorMessage(message);
    }
  };

  return (
    <form onSubmit={handleAdd}>
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

export default BlogForm;
