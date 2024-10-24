import { render, screen } from "@testing-library/react";
import React from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { ZodSchema } from "zod";

import { InputField } from "./input-field";

interface MockFormValues {
  name: string;
}

describe("InputField Component", () => {
  const TestComponent = ({
    errors = {},
    onChange = jest.fn(),
    onBlur = jest.fn(),
    type = "text",
    label,
  }: {
    errors?: FieldErrors<MockFormValues>;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    type?: string;
    label?: string;
  }) => {
    const { register } = useForm<MockFormValues>();
    return (
      <InputField<ZodSchema>
        errors={errors}
        label={label}
        name="name"
        placeholder="Enter your name"
        register={register}
        type={type}
        onBlur={onBlur}
        onChange={onChange}
      />
    );
  };

  it("should render input field and label", () => {
    render(<TestComponent label="Name" />);

    const labelElement = screen.getByText("Name");
    const inputElement = screen.getByPlaceholderText("Enter your name");

    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });

  it("should apply error styles when there is an error", () => {
    const errors = {
      name: {
        message: "Nome é obrigatório",
        type: "required",
      },
    };

    render(
      <TestComponent
        errors={errors as FieldErrors<MockFormValues>}
        label="Name"
      />
    );

    const labelElement = screen.getByText("Name");
    const inputElement = screen.getByPlaceholderText("Enter your name");

    expect(labelElement).toHaveClass("text-destructive");
    expect(inputElement).toHaveClass("border-destructive");

    const errorMessage = screen.getByText("Nome é obrigatório");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should use the specified input type when provided", () => {
    render(<TestComponent type="email" />);

    const inputElement = screen.getByPlaceholderText("Enter your name");

    expect(inputElement).toHaveAttribute("type", "email");
  });

  it("should not render label when not provided", () => {
    render(<TestComponent label={undefined} />);

    const labelElement = screen.queryByText("Name");
    expect(labelElement).not.toBeInTheDocument();
  });

  it("should display the default placeholder if no placeholder is provided", () => {
    render(<TestComponent />);

    const inputElement = screen.getByRole("textbox");

    expect(inputElement).toHaveAttribute("placeholder", "Enter your name");
  });

  it("should use the default input type 'text' if no type is provided", () => {
    render(<TestComponent />);

    const inputElement = screen.getByPlaceholderText("Enter your name");

    expect(inputElement).toHaveAttribute("type", "text");
  });

  it("should not apply error styles when there is no error", () => {
    render(<TestComponent errors={{}} label="Name" />);

    const labelElement = screen.getByText("Name");
    const inputElement = screen.getByPlaceholderText("Enter your name");

    expect(labelElement).not.toHaveClass("text-destructive");
    expect(inputElement).not.toHaveClass("border-destructive");

    const errorMessage = screen.queryByText("Nome é obrigatório");
    expect(errorMessage).not.toBeInTheDocument();
  });

  it("should not render FormError component when there is no error", () => {
    render(<TestComponent />);

    const errorMessage = screen.queryByText("Nome é obrigatório");
    expect(errorMessage).not.toBeInTheDocument();
  });

  it("should render input with type password", () => {
    render(<TestComponent type="password" />);

    const inputElement = screen.getByPlaceholderText("Enter your name");
    expect(inputElement).toHaveAttribute("type", "password");
  });

  it("should render input with type number", () => {
    render(<TestComponent type="number" />);

    const inputElement = screen.getByPlaceholderText("Enter your name");
    expect(inputElement).toHaveAttribute("type", "number");
  });

  it("should render custom error message in FormError component", () => {
    const errors = {
      name: {
        message: "Custom error message",
        type: "custom",
      },
    };

    render(
      <TestComponent
        errors={errors as FieldErrors<MockFormValues>}
        label="Name"
      />
    );

    const errorMessage = screen.getByText("Custom error message");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should apply correct styles for required error", () => {
    const errors = {
      name: {
        message: "Field is required",
        type: "required",
      },
    };

    render(
      <TestComponent
        errors={errors as FieldErrors<MockFormValues>}
        label="Name"
      />
    );

    const labelElement = screen.getByText("Name");
    expect(labelElement).toHaveClass("text-destructive");
  });

  it("should apply correct styles for pattern error", () => {
    const errors = {
      name: {
        message: "Invalid pattern",
        type: "pattern",
      },
    };

    render(
      <TestComponent
        errors={errors as FieldErrors<MockFormValues>}
        label="Name"
      />
    );

    const labelElement = screen.getByText("Name");
    expect(labelElement).toHaveClass("text-destructive");
  });

  it("should associate input with label for accessibility", () => {
    render(<TestComponent label="Name" />);

    const labelElement = screen.getByText("Name");
    const inputElement = screen.getByPlaceholderText("Enter your name");

    expect(labelElement).toHaveAttribute(
      "for",
      inputElement.getAttribute("id")
    );
  });
});
