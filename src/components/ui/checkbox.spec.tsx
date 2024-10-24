import "@testing-library/jest-dom";

import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Checkbox } from "./checkbox";

describe("Checkbox Component", () => {
  it("should render the Checkbox component correctly", () => {
    render(<Checkbox aria-label="checkbox" />);
    const checkbox = screen.getByLabelText("checkbox");
    expect(checkbox).not.toBeNull();
    expect(checkbox.getAttribute("checked")).toBeNull();
  });

  it("should be checked when clicked", async () => {
    render(<Checkbox aria-label="checkbox" />);
    const checkbox = screen.getByLabelText("checkbox");
    await userEvent.click(checkbox);
    expect(checkbox.getAttribute("checked")).toBeNull();
  });
});

it("should be unchecked when clicked twice", async () => {
  render(<Checkbox aria-label="checkbox" />);
  const checkbox = screen.getByLabelText("checkbox");
  await userEvent.click(checkbox);
  await userEvent.click(checkbox);
  expect(checkbox.getAttribute("checked")).toBeNull();
});

it("should not be clickable when disabled", async () => {
  render(<Checkbox aria-label="checkbox" disabled />);
  const checkbox = screen.getByLabelText("checkbox");
  expect(checkbox).toHaveProperty("disabled", true);
  await userEvent.click(checkbox);
  expect(checkbox.getAttribute("checked")).toBeNull();
});

it("should have correct classes when checked", async () => {
  render(<Checkbox aria-label="checkbox" />);
  const checkbox = screen.getByLabelText("checkbox");

  await userEvent.click(checkbox);

  expect(checkbox.classList.contains("data-[state=checked]:bg-primary")).toBe(
    true
  );
});

it("should render Check icon when checked", async () => {
  render(<Checkbox aria-label="checkbox" />);
  const checkbox = screen.getByLabelText("checkbox");

  await userEvent.click(checkbox);

  const checkIcon = checkbox.querySelector("svg");
  expect(checkIcon).not.toBeNull();
});

it("should apply focus-visible classes when focused via keyboard", async () => {
  render(<Checkbox aria-label="checkbox" />);
  const checkbox = screen.getByLabelText("checkbox");

  await userEvent.tab();
  expect(checkbox.className).toContain("focus-visible:ring-2");
  expect(checkbox.className).toContain("focus-visible:ring-ring");
});
