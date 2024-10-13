import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Popover, PopoverContent, PopoverTrigger } from "../components/Popover";

describe("Popover Component", () => {
  it("should render the PopoverTrigger component correctly", () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
      </Popover>
    );
    const trigger = screen.getByText("Open Popover");
    expect(trigger).toBeInTheDocument();
  });

  it("should display PopoverContent when PopoverTrigger is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>
    );

    const trigger = screen.getByText("Open Popover");
    expect(screen.queryByText("Popover Content")).not.toBeInTheDocument();

    await user.click(trigger);

    expect(screen.getByText("Popover Content")).toBeInTheDocument();
  });

  it("should apply correct alignment to PopoverContent", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent align="end">Popover Content</PopoverContent>
      </Popover>
    );

    const trigger = screen.getByText("Open Popover");

    await user.click(trigger);

    const popoverContent = screen.getByText("Popover Content");
    expect(popoverContent).toBeInTheDocument();
    expect(popoverContent).toHaveAttribute("data-align", "end");
  });

  it("should close PopoverContent when clicking outside", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Popover>
          <PopoverTrigger>Open Popover</PopoverTrigger>
          <PopoverContent>Popover Content</PopoverContent>
        </Popover>
        <button>Outside Button</button>
      </>
    );

    const trigger = screen.getByText("Open Popover");
    const outsideButton = screen.getByText("Outside Button");

    await user.click(trigger);
    expect(screen.getByText("Popover Content")).toBeInTheDocument();

    await user.click(outsideButton);

    await waitFor(() =>
      expect(screen.queryByText("Popover Content")).not.toBeInTheDocument()
    );
  });
});
