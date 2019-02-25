import React from "react";
import { render } from "react-testing-library";
import SimpleBlog from "./SimpleBlog";
import { fireEvent } from "react-testing-library/dist";

test("renders content", () => {
  const blog = {
    title: "kova titteli",
    author: "joku dude",
    url: "urli.li",
    likes: 7
  };

  const mockHandler = jest.fn();

  const component = render(<SimpleBlog blog={blog} onClick={mockHandler} />);

  expect(component.container).toHaveTextContent("kova titteli");
  expect(component.container).toHaveTextContent("joku dude");
  expect(component.container).toHaveTextContent(`blog has ${blog.likes} likes`);
});

test("calls onclick", () => {
  const blog = {
    title: "kova titteli",
    author: "joku dude",
    url: "urli.li",
    likes: 7
  };

  const mockHandler = jest.fn();

  const component = render(<SimpleBlog blog={blog} onClick={mockHandler} />);
  const button = component.getByText("like");
  fireEvent.click(button);
  fireEvent.click(button);
  expect(mockHandler.mock.calls.length).toBe(2);
});
