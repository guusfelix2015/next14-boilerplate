import { Button } from "../components/Button";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Button Component", () => {
    test("renders default button", () => {
        render(<Button>Click me</Button>);

        const button = screen.getByRole("button", { name: /click me/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("bg-primary");
    });

    test("renders different variants", () => {
        const { rerender } = render(
            <Button variant="destructive">Delete</Button>
        );
        let button = screen.getByRole("button", { name: /delete/i });
        expect(button).toHaveClass("bg-destructive");

        rerender(<Button variant="outline">Outline</Button>);
        button = screen.getByRole("button", { name: /outline/i });
        expect(button).toHaveClass("border-input");

        rerender(<Button variant="link">Link</Button>);
        button = screen.getByRole("button", { name: /link/i });
        expect(button).toHaveClass("text-primary underline-offset-4");
    });

    test("renders different sizes", () => {
        const { rerender } = render(<Button size="sm">Small</Button>);
        let button = screen.getByRole("button", { name: /small/i });
        expect(button).toHaveClass("h-9");

        rerender(<Button size="lg">Large</Button>);
        button = screen.getByRole("button", { name: /large/i });
        expect(button).toHaveClass("h-11");

        rerender(<Button size="icon">Icon</Button>);
        button = screen.getByRole("button", { name: /icon/i });
        expect(button).toHaveClass("w-10 h-10");
    });

    test("renders as a child element with Slot", () => {
        const { container } = render(
            <Button asChild>
                <a href="/link">Click Link</a>
            </Button>
        );

        const link = screen.getByRole("link", { name: /click link/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/link");
        expect(container.querySelector("button")).not.toBeInTheDocument();
    });

    test("calls onClick handler when clicked", async () => {
        const onClickMock = jest.fn();
        render(<Button onClick={onClickMock}>Click me</Button>);

        const button = screen.getByRole("button", { name: /click me/i });
        await userEvent.click(button);

        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    test("renders disabled button", () => {
        render(<Button disabled>Disabled</Button>);

        const button = screen.getByRole("button", { name: /disabled/i });
        expect(button).toBeDisabled();
        expect(button).toHaveClass("disabled:opacity-50");
    });
});
