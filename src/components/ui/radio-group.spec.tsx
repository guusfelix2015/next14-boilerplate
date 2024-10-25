import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RadioGroup, RadioGroupItem } from "./radio-group";

describe("RadioGroup", () => {
  it("should render the RadioGroup with RadioGroupItem components", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="option-1" />
        <RadioGroupItem value="option-2" />
      </RadioGroup>
    );

    const radioGroup = screen.getByRole("radiogroup");
    const radioItems = screen.getAllByRole("radio");

    expect(radioGroup).toBeInTheDocument();
    expect(radioItems).toHaveLength(2);
  });

  it("should apply custom classes to RadioGroup and RadioGroupItem", () => {
    render(
      <RadioGroup className="custom-group-class">
        <RadioGroupItem className="custom-item-class" value="option-1" />
      </RadioGroup>
    );

    const radioGroup = screen.getByRole("radiogroup");
    const radioItem = screen.getByRole("radio");

    expect(radioGroup).toHaveClass("custom-group-class");
    expect(radioItem).toHaveClass("custom-item-class");
  });

  it("should allow selecting RadioGroupItem", async () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="option-1" />
        <RadioGroupItem value="option-2" />
      </RadioGroup>
    );

    const radioItems = screen.getAllByRole("radio");
    expect(radioItems[0]).not.toBeChecked();
    expect(radioItems[1]).not.toBeChecked();

    await userEvent.click(radioItems[1]);

    expect(radioItems[0]).not.toBeChecked();
    expect(radioItems[1]).toBeChecked();
  });
});
