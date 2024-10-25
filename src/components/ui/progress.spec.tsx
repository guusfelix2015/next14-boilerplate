import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";

import { Progress } from "./progress";

describe("Progress Component", () => {
  it("should render the Progress component with default value", () => {
    render(<Progress value={0} />);
    const progressIndicator = screen.getByRole("progressbar");
    const innerDiv = progressIndicator.querySelector("div");
    expect(progressIndicator).not.toBeNull();
    expect(innerDiv).not.toBeNull();
  });

  it("should render the Progress component with a specific value", () => {
    render(<Progress value={50} />);
    const progressIndicator = screen.getByRole("progressbar");
    const innerDiv = progressIndicator.querySelector("div");
    expect(progressIndicator).not.toBeNull();
    expect(innerDiv).not.toBeNull();
  });

  it("should render the Progress component with full value", () => {
    render(<Progress value={100} />);
    const progressIndicator = screen.getByRole("progressbar");
    const innerDiv = progressIndicator.querySelector("div");
    expect(progressIndicator).not.toBeNull();
    expect(innerDiv).not.toBeNull();
  });
});
