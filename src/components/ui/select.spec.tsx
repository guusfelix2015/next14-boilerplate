import { fireEvent, render, screen } from "@testing-library/react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";

describe("Select", () => {
  it("should render the SelectLabel", () => {
    render(
      <Select>
        <SelectGroup>
          <SelectLabel data-testid="select-label">Label</SelectLabel>
          <SelectTrigger data-testid="select-trigger">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
        </SelectGroup>
      </Select>
    );

    const label = screen.getByTestId("select-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("Label");
  });

  it("should render the scroll buttons when the content overflows", () => {
    render(
      <Select>
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent data-testid="select-content">
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
          <SelectItem value="option4">Option 4</SelectItem>
          <SelectItem value="option5">Option 5</SelectItem>
          <SelectItem value="option6">Option 6</SelectItem>
          <SelectItem value="option7">Option 7</SelectItem>
          <SelectItem value="option8">Option 8</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByTestId("select-trigger");
    fireEvent.click(trigger);

    const content = screen.findByTestId("select-content");

    content.then(contentElement => {
      const scrollUpButton = contentElement.querySelector(
        "[data-testid='scroll-up-button']"
      );
      const scrollDownButton = contentElement.querySelector(
        "[data-testid='scroll-down-button']"
      );

      expect(scrollUpButton).toBeInTheDocument();
      expect(scrollDownButton).toBeInTheDocument();
    });
  });

  it("should apply custom classes to SelectTrigger", () => {
    render(
      <Select>
        <SelectTrigger className="custom-class" data-testid="select-trigger">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
      </Select>
    );

    const trigger = screen.getByTestId("select-trigger");
    expect(trigger).toHaveClass("custom-class");
  });

  it("should display the placeholder text in SelectValue", () => {
    render(
      <Select>
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
      </Select>
    );

    const trigger = screen.getByTestId("select-trigger");
    expect(trigger).toHaveTextContent("Select an option");
  });

  it("should render ChevronDown icon in SelectTrigger", () => {
    render(
      <Select>
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
      </Select>
    );

    const chevronIcon = screen
      .getByTestId("select-trigger")
      .querySelector("svg");
    expect(chevronIcon).toBeInTheDocument();
  });

  it("should render ChevronDown icon in SelectTrigger", () => {
    render(
      <Select>
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
      </Select>
    );

    const chevronIcon = screen
      .getByTestId("select-trigger")
      .querySelector("svg");
    expect(chevronIcon).toBeInTheDocument();
  });

  it("should disable the SelectTrigger when disabled prop is passed", () => {
    render(
      <Select>
        <SelectTrigger data-testid="select-trigger" disabled>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
      </Select>
    );

    const trigger = screen.getByTestId("select-trigger");
    expect(trigger).toBeDisabled();
  });

  it("should disable the SelectTrigger when disabled prop is passed", () => {
    render(
      <Select>
        <SelectTrigger data-testid="select-trigger" disabled>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
      </Select>
    );

    const trigger = screen.getByTestId("select-trigger");
    expect(trigger).toBeDisabled();
  });
});
