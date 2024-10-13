import { jest } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";

import { CEPInput } from "../components/CEPInput";

interface TestFormSchema {
  cep: string;
}

const setup = (
  errors: FieldErrors<TestFormSchema> = {},
  handleCepChange = jest.fn()
) => {
  const TestComponent = () => {
    const methods = useForm<TestFormSchema>({
      defaultValues: { cep: "" },
    });

    return (
      <FormProvider {...methods}>
        <CEPInput
          errors={errors}
          handleCEPChange={handleCepChange}
          label="CEP"
          name="cep"
          placeholder="00000-000"
          register={methods.register}
          type="text"
        />
      </FormProvider>
    );
  };

  render(<TestComponent />);
};

describe("CepInput", () => {
  it("should render input field with correct label", () => {
    setup();
    expect(screen.getByLabelText(/CEP/i)).toBeInTheDocument();
  });

  it("should display error message when there is an error", () => {
    const errors: FieldErrors<TestFormSchema> = {
      cep: { message: "CEP inválido", type: "validate" },
    };

    setup(errors);

    expect(screen.getByText(/CEP inválido/i)).toBeInTheDocument();
  });

  it("should apply error styles to input field when there is an error", () => {
    const errors: FieldErrors<TestFormSchema> = {
      cep: { message: "CEP inválido", type: "validate" },
    };

    setup(errors);

    const cepInput = screen.getByLabelText(/CEP/i);
    expect(cepInput).toHaveClass("border-destructive");
  });

  it("should call handleCepChange when input value changes", () => {
    const handleCepChange = jest.fn();
    setup({}, handleCepChange);

    const cepInput = screen.getByLabelText(/CEP/i);
    fireEvent.change(cepInput, { target: { value: "12345-678" } });

    expect(handleCepChange).toHaveBeenCalled();
  });

  it("should render input with correct placeholder", () => {
    setup();
    const cepInput = screen.getByPlaceholderText("00000-000");
    expect(cepInput).toBeInTheDocument();
  });

  it("should not display error message when there is no error", () => {
    setup();
    expect(screen.queryByText(/CEP inválido/i)).not.toBeInTheDocument();
  });

  it("should not apply error styles when there is no error", () => {
    setup();
    const cepInput = screen.getByLabelText(/CEP/i);
    expect(cepInput).not.toHaveClass("border-destructive");
  });
});
