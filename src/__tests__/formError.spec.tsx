import { render, screen } from "@testing-library/react";
import { FieldError, FieldErrorsImpl } from "react-hook-form";

import { FormError } from "../components/FormError";

describe("FormError", () => {
  const fieldName = "testField";
  const errorMessage = "This field is required";

  const errors: FieldErrorsImpl = {
    [fieldName]: { message: errorMessage } as FieldError,
  };

  it("should not render when there is no error", () => {
    render(<FormError errors={{}} fieldName={fieldName} />);
    const errorElement = screen.queryByText(errorMessage);
    expect(errorElement).not.toBeInTheDocument();
  });

  it("should render the error message when there is an error", () => {
    render(<FormError errors={errors} fieldName={fieldName} />);
    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });

  it("should apply the correct classes", () => {
    const customClass = "custom-class";
    render(
      <FormError
        className={customClass}
        errors={errors}
        fieldName={fieldName}
      />
    );
    const errorElement = screen.getByText(errorMessage);
    expect(errorElement.parentElement).toHaveClass(
      "mt-1 flex items-center text-sm text-destructive"
    );
    expect(errorElement.parentElement).toHaveClass(customClass);
  });

  it("should render when there is a nested error object", () => {
    const nestedFieldName = "nested.field";
    const nestedErrorMessage = "Nested error message";
    const nestedErrors: FieldErrorsImpl = {
      nested: {
        field: { message: nestedErrorMessage } as FieldError,
      },
    };

    render(<FormError errors={nestedErrors} fieldName={nestedFieldName} />);
    const errorElement = screen.getByText(nestedErrorMessage);
    expect(errorElement).toBeInTheDocument();
  });

  it("should handle multiple errors for the same field", () => {
    const multipleErrors: FieldErrorsImpl = {
      [fieldName]: {
        type: "multiple",
        message: errorMessage,
        types: {
          required: "This field is required",
          minLength: "Minimum length is 5",
        },
      } as FieldError,
    };

    render(<FormError errors={multipleErrors} fieldName={fieldName} />);
    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });

  it("should render 'undefined' if no error message is provided", () => {
    const errorsWithoutMessage: FieldErrorsImpl = {
      [fieldName]: { type: "required" } as FieldError,
    };

    render(<FormError errors={errorsWithoutMessage} fieldName={fieldName} />);
    const errorElement = screen.getByText("undefined");
    expect(errorElement).toBeInTheDocument();
  });

  it("should pass additional props to the div element", () => {
    const customDataAttr = "data-custom-attr";
    render(
      <FormError
        data-custom-attr={customDataAttr}
        errors={errors}
        fieldName={fieldName}
      />
    );
    const errorElement = screen.getByTestId(`error-${fieldName}`);
    expect(errorElement).toHaveAttribute("data-custom-attr", customDataAttr);
  });

  it("should pass additional props to the div element", () => {
    const customDataAttr = "data-custom-attr";
    render(
      <FormError
        data-custom-attr={customDataAttr}
        errors={errors}
        fieldName={fieldName}
      />
    );
    const errorElement = screen.getByTestId(`error-${fieldName}`);
    expect(errorElement).toHaveAttribute("data-custom-attr", customDataAttr);
  });

  it("should pass additional props to the div element", () => {
    const customDataAttr = "data-custom-attr";
    render(
      <FormError
        data-custom-attr={customDataAttr}
        errors={errors}
        fieldName={fieldName}
      />
    );
    const errorElement = screen.getByTestId(`error-${fieldName}`);
    expect(errorElement).toHaveAttribute("data-custom-attr", customDataAttr);
  });

  it("should not render if fieldName does not match any error", () => {
    const nonMatchingFieldName = "nonMatchingField";
    render(<FormError errors={errors} fieldName={nonMatchingFieldName} />);
    const errorElement = screen.queryByTestId(`error-${nonMatchingFieldName}`);
    expect(errorElement).not.toBeInTheDocument();
  });
});
