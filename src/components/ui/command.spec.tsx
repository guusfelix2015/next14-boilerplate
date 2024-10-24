import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { render, screen } from "@testing-library/react";

import { CommandDialog } from "./command";

describe("CommandDialog", () => {
  it("should render children correctly", () => {
    render(
      <CommandDialog open={true}>
        <DialogTitle>Command Dialog Title</DialogTitle>
        <DialogDescription>
          This is a description for the dialog.
        </DialogDescription>
        <div>Test Child</div>
      </CommandDialog>
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });
});
