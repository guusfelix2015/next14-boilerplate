import { AlertBox } from "../components/AlertBox";
import { render, screen } from "@testing-library/react";
import { Info } from "lucide-react";

describe("AlertBox Component", () => {
    it("should render the AlertBox component correctly", () => {
        render(<AlertBox />);
        const alertBox = screen.getByRole("alert");
        expect(alertBox).toBeInTheDocument();
        expect(alertBox).toHaveClass("bg-violet-50 text-violet-950");
    });

    it("should render with custom className", () => {
        render(<AlertBox className="custom-class" />);
        const alertBox = screen.getByRole("alert");
        expect(alertBox).toHaveClass("custom-class");
    });

    it("should render with title and description", () => {
        render(<AlertBox title="Test Title" description="Test Description" />);
        expect(screen.getByText("Test Title")).toBeInTheDocument();
        expect(screen.getByText("Test Description")).toBeInTheDocument();
    });

    it("should render with icon", () => {
        render(<AlertBox icon={<Info data-testid="icon" />} />);
        expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("should render children", () => {
        render(<AlertBox>Test Children</AlertBox>);
        expect(screen.getByText("Test Children")).toBeInTheDocument();
    });

    it("should apply variant class", () => {
        render(<AlertBox variant="primary" />);
        const alertBox = screen.getByRole("alert");
        expect(alertBox).toHaveClass("bg-violet-50 text-violet-950");
    });
});
