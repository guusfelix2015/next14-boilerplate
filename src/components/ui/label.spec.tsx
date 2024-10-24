import { render, screen } from "@testing-library/react";
import React from "react";

import { Label } from "./label";

describe("Label Component", () => {
  it("should render the Label component correctly", () => {
    render(<Label htmlFor="input">Label Text</Label>);
    const label = screen.getByText("Label Text");
    expect(label).toBeInTheDocument();
  });

  it("should apply custom classes to the Label component", () => {
    render(<Label className="custom-class">Label Text</Label>);
    const label = screen.getByText("Label Text");
    expect(label).toHaveClass("custom-class");
  });

  it("should have correct styles when peer is disabled", () => {
    render(
      <div>
        <input className="peer" disabled id="input" type="text" />
        <Label htmlFor="input">Label Text</Label>
      </div>
    );
    const label = screen.getByText("Label Text");
    expect(label).toHaveClass("peer-disabled:cursor-not-allowed");
    expect(label).toHaveClass("peer-disabled:opacity-70");
  });

  it("should forward ref to the LabelPrimitive.Root", () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Label Text</Label>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("LABEL");
  });

  it("should apply variant classes correctly", () => {
    render(<Label className="text-lg">Label Text</Label>);
    const label = screen.getByText("Label Text");
    expect(label).toHaveClass("text-lg");
  });
});
