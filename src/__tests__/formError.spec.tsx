import { FormError } from "../components/FormError";
import { render, screen } from "@testing-library/react";
import { FieldError, FieldErrorsImpl } from "react-hook-form";

describe("FormError", () => {
    const fieldName = "testField";
    const errorMessage = "This field is required";

    const errors: FieldErrorsImpl = {
        [fieldName]: { message: errorMessage } as FieldError,
    };

    it("should not render when there is no error", () => {
        render(<FormError fieldName={fieldName} errors={{}} />);
        const errorElement = screen.queryByText(errorMessage);
        expect(errorElement).not.toBeInTheDocument();
    });

    it("should render the error message when there is an error", () => {
        render(<FormError fieldName={fieldName} errors={errors} />);
        const errorElement = screen.getByText(errorMessage);
        expect(errorElement).toBeInTheDocument();
    });

    it("should apply the correct classes", () => {
        const customClass = "custom-class";
        render(
            <FormError
                fieldName={fieldName}
                errors={errors}
                className={customClass}
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

        render(<FormError fieldName={nestedFieldName} errors={nestedErrors} />);
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

        render(<FormError fieldName={fieldName} errors={multipleErrors} />);
        const errorElement = screen.getByText(errorMessage);
        expect(errorElement).toBeInTheDocument();
    });

    it("should render 'undefined' if no error message is provided", () => {
        const errorsWithoutMessage: FieldErrorsImpl = {
            [fieldName]: { type: "required" } as FieldError,
        };

        render(
            <FormError fieldName={fieldName} errors={errorsWithoutMessage} />
        );
        const errorElement = screen.getByText("undefined");
        expect(errorElement).toBeInTheDocument();
    });

    it("should pass additional props to the div element", () => {
        const customDataAttr = "data-custom-attr";
        render(
            <FormError
                fieldName={fieldName}
                errors={errors}
                data-custom-attr={customDataAttr}
            />
        );
        const errorElement = screen.getByTestId(`error-${fieldName}`);
        expect(errorElement).toHaveAttribute(
            "data-custom-attr",
            customDataAttr
        );
    });

    it("should pass additional props to the div element", () => {
        const customDataAttr = "data-custom-attr";
        render(
            <FormError
                fieldName={fieldName}
                errors={errors}
                data-custom-attr={customDataAttr}
            />
        );
        const errorElement = screen.getByTestId(`error-${fieldName}`);
        expect(errorElement).toHaveAttribute(
            "data-custom-attr",
            customDataAttr
        );
    });

    it("should pass additional props to the div element", () => {
        const customDataAttr = "data-custom-attr";
        render(
            <FormError
                fieldName={fieldName}
                errors={errors}
                data-custom-attr={customDataAttr}
            />
        );
        const errorElement = screen.getByTestId(`error-${fieldName}`);
        expect(errorElement).toHaveAttribute(
            "data-custom-attr",
            customDataAttr
        );
    });

    it("should not render if fieldName does not match any error", () => {
        const nonMatchingFieldName = "nonMatchingField";
        render(<FormError fieldName={nonMatchingFieldName} errors={errors} />);
        const errorElement = screen.queryByTestId(
            `error-${nonMatchingFieldName}`
        );
        expect(errorElement).not.toBeInTheDocument();
    });
});
