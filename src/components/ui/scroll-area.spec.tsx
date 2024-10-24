import { render, screen } from "@testing-library/react";

import { ScrollArea } from "./scroll-area";

describe("ScrollArea", () => {
  it("should render the ScrollArea with children", () => {
    render(
      <ScrollArea data-testid="scroll-area">
        <div>Test Content</div>
      </ScrollArea>
    );

    const scrollArea = screen.getByTestId("scroll-area");
    expect(scrollArea).toBeInTheDocument();

    const content = screen.getByText("Test Content");
    expect(content).toBeInTheDocument();
  });

  it("should apply custom classes to ScrollArea", () => {
    render(
      <ScrollArea className="custom-scroll-area" data-testid="scroll-area">
        <div>Test Content</div>
      </ScrollArea>
    );

    const scrollArea = screen.getByTestId("scroll-area");
    expect(scrollArea).toHaveClass("custom-scroll-area");
  });

  it("should conditionally apply classes using cn utility", () => {
    render(
      <ScrollArea className="additional-class" data-testid="scroll-area">
        <div>Test Content</div>
      </ScrollArea>
    );

    const scrollArea = screen.getByTestId("scroll-area");
    expect(scrollArea).toHaveClass("relative overflow-hidden additional-class");
  });
});
