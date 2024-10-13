import { render, screen } from "@testing-library/react";

import { Alert, AlertDescription, AlertTitle } from "../components/Alert";

describe("Alert Component", () => {
  it("should render the Alert component with default variant", () => {
    render(<Alert>Default Alert</Alert>);
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass("bg-background text-foreground");
  });

  it("should render the Alert component with destructive variant", () => {
    render(<Alert variant="destructive">Destructive Alert</Alert>);
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass(
      "border-destructive/50 text-destructive dark:border-destructive"
    );
  });

  it("should render the Alert component with custom className", () => {
    render(<Alert className="custom-class">Custom Class Alert</Alert>);
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass("custom-class");
  });
});

describe("AlertTitle Component", () => {
  it("should render the AlertTitle component", () => {
    render(<AlertTitle>Alert Title</AlertTitle>);
    const alertTitle = screen.getByText("Alert Title");
    expect(alertTitle).toBeInTheDocument();
    expect(alertTitle).toHaveClass(
      "mb-1 font-medium leading-none tracking-tight"
    );
  });

  it("should render the AlertTitle component with custom className", () => {
    render(<AlertTitle className="custom-class">Alert Title</AlertTitle>);
    const alertTitle = screen.getByText("Alert Title");
    expect(alertTitle).toBeInTheDocument();
    expect(alertTitle).toHaveClass("custom-class");
  });
});

describe("AlertDescription Component", () => {
  it("should render the AlertDescription component", () => {
    render(<AlertDescription>Alert Description</AlertDescription>);
    const alertDescription = screen.getByText("Alert Description");
    expect(alertDescription).toBeInTheDocument();
    expect(alertDescription).toHaveClass("text-sm [&_p]:leading-relaxed");
  });

  it("should render the AlertDescription component with custom className", () => {
    render(
      <AlertDescription className="custom-class">
        Alert Description
      </AlertDescription>
    );
    const alertDescription = screen.getByText("Alert Description");
    expect(alertDescription).toBeInTheDocument();
    expect(alertDescription).toHaveClass("custom-class");
  });
});
