import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { Input } from "./input";

describe("Input Component", () => {
  it("should render the Input component correctly", () => {
    render(<Input placeholder="Type here" />);
    const input = screen.getByPlaceholderText("Type here");
    expect(input).toBeInTheDocument();
  });

  it("should apply custom classes to the Input component", () => {
    render(<Input className="custom-class" placeholder="Type here" />);
    const input = screen.getByPlaceholderText("Type here");
    expect(input).toHaveClass("custom-class");
  });

  it("should be disabled when the 'disabled' prop is set", () => {
    render(<Input disabled placeholder="Type here" />);
    const input = screen.getByPlaceholderText("Type here");
    expect(input).toBeDisabled();
  });

  it("should forward ref to the input element", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input placeholder="Type here" ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("INPUT");
  });

  it("should trigger onChange event when typing", () => {
    const handleChange = jest.fn();
    render(<Input placeholder="Type here" onChange={handleChange} />);
    const input = screen.getByPlaceholderText("Type here");
    fireEvent.change(input, { target: { value: "new value" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("should render with correct aria-label", () => {
    render(<Input aria-label="input-label" />);
    const input = screen.getByLabelText("input-label");
    expect(input).toBeInTheDocument();
  });
});
