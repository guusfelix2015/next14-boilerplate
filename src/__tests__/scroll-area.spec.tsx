import { ScrollArea } from "../components/ScrollArea";
import { render, screen } from "@testing-library/react";

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
            <ScrollArea
                data-testid="scroll-area"
                className="custom-scroll-area"
            >
                <div>Test Content</div>
            </ScrollArea>
        );

        const scrollArea = screen.getByTestId("scroll-area");
        expect(scrollArea).toHaveClass("custom-scroll-area");
    });

    it("should conditionally apply classes using cn utility", () => {
        render(
            <ScrollArea data-testid="scroll-area" className="additional-class">
                <div>Test Content</div>
            </ScrollArea>
        );

        const scrollArea = screen.getByTestId("scroll-area");
        expect(scrollArea).toHaveClass(
            "relative overflow-hidden additional-class"
        );
    });
});
