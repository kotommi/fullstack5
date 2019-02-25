import React from "react";
import { render, fireEvent } from "react-testing-library";
import { prettyDOM } from "dom-testing-library";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "JS on [redacted]",
    author: "autoori",
    url: "urli.li"
  };

  const component = render(<Blog blog={blog} />);

  const a = component.container.querySelector("a");

  console.log(prettyDOM(a));
});
