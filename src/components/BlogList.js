import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const BlogList = props => {
  if (!props.blogs || !props.user) {
    return null;
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const makeRow = blog => {
    return (
      <div key={blog.id} style={blogStyle}>
        <Link to={`/blogs/${blog.id}`}>{`${blog.title} by ${
          blog.author
        }`}</Link>
      </div>
    );
  };

  return <div className="blog">{props.blogs.map(blog => makeRow(blog))}</div>;
};

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.user
  };
};

export default connect(mapStateToProps)(BlogList);
