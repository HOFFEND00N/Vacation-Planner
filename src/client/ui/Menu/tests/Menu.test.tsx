import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { Menu } from "../Menu";

test("Menu rendered", () => {
  render(
    <BrowserRouter>
      <Menu />
    </BrowserRouter>
  );

  expect(screen.getByRole("list")).toBeInTheDocument();
  expect(screen.getAllByRole("listitem").length).toEqual(2);
});
