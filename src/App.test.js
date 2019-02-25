import React from "react";
import { render, waitForElement } from "react-testing-library";
jest.mock("./services/blogs");
import App from "./App";

describe("<App />", () => {
  it("if no user logged, blogs are not rendered", async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText("kirjaudu"));
    // expectations here
    expect(component.container).not.toHaveTextContent("blog");
    expect(component.container).not.toHaveTextContent("Robert");
    expect(component.container.querySelector(".blog")).toBeNull();
  });
  it("if user logged, blogs are rendered", async () => {
    const user = {
      username: "tester",
      token: "1231231214",
      name: "Teuvo Testaaja"
    };
    window.localStorage.setItem("loggedUser", JSON.stringify(user));

    const component = render(<App />);

    component.rerender(<App />);

    await waitForElement(() => component.container.querySelector(".blog"));

    expect(component.container.querySelector(".blog")).toBeDefined();
    expect(component.container).toHaveTextContent("Robert");
    expect(component.container).toHaveTextContent("Dijkstra");
  });
});
