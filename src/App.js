import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";

const makeRows = blogs => {
  return (
    <div>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      handleErrorMessage(exception.response.data.error);
    }
  };

  const handleErrorMessage = message => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const blogHook = () => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  };

  useEffect(blogHook, []);

  // load user from localstorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    window.location.reload();
  };

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={errorMessage} />
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    );
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={errorMessage} />
        <p>{user.username} is logged in</p>
        <button onClick={handleLogout}>logout</button>
        <BlogForm
          setBlogs={setBlogs}
          blogs={blogs}
          handleErrorMessage={handleErrorMessage}
        />
        {makeRows(blogs)}
      </div>
    );
  }
};

export default App;
