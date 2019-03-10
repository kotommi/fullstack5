import blogService from "../services/blogs";

// return blogs sorted by likes, highest first
const sorted = blogs => {
  return blogs ? blogs.sort((a, b) => b.likes - a.likes) : blogs;
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return sorted(action.data);
    case "ADD_LIKE":
      const likedBlog = action.data;
      return sorted(
        state.map(blog => {
          return blog.id !== likedBlog.id ? blog : likedBlog;
        })
      );
    case "ADD_BLOG":
      const newBlog = action.data;
      return sorted(state.concat(newBlog));
    case "REMOVE_BLOG":
      const removedId = action.data;
      return sorted(state.filter(blog => blog.id !== removedId));
    default:
      return state;
  }
};

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs
    });
  };
};

export const addLike = blog => {
  const newBlog = {
    ...blog,
    likes: blog.likes + 1
  };
  return async dispatch => {
    const likedBlog = await blogService.update(blog.id, newBlog);
    dispatch({
      type: "ADD_LIKE",
      data: likedBlog
    });
  };
};

// TODO/FIXME: Fix in backend, doesn't return user properly, (only id)
export const createBlog = blog => {
  return async dispatch => {
    const createdBlog = await blogService.create(blog);
    dispatch({
      type: "ADD_BLOG",
      data: createdBlog
    });
  };
};

export const removeBlog = blog => {
  const confirmation = window.confirm(
    `remove blog ${blog.title} by ${blog.author}?`
  );
  if (!confirmation) {
    return;
  }
  return async dispatch => {
    try {
      await blogService.remove(blog.id);
      dispatch({
        type: "REMOVE_BLOG",
        data: blog.id
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export default reducer;
