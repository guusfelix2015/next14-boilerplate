import { render, screen } from "@testing-library/react";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";

import { DocumentInput } from "./document-input";

describe("DocumentInput", () => {
  interface TestFormSchema {
    document: string;
  }

  const setup = (
    errors: FieldErrors<TestFormSchema> = {},
    handleDocumentChange = jest.fn()
  ) => {
    const TestComponent = () => {
      const methods = useForm<TestFormSchema>({
        defaultValues: { document: "" },
      });

      return (
        <FormProvider {...methods}>
          <DocumentInput
            errors={errors}
            handleDocumentChange={handleDocumentChange}
            label="CPF ou CNPJ"
            name="document"
            placeholder="000.000.000-00 ou 00.000.000/0000-00"
            register={methods.register}
            type="text"
          />
        </FormProvider>
      );
    };

    render(<TestComponent />);
  };

  it("should render input field with correct label", () => {
    setup();
    expect(screen.getByLabelText(/CPF ou CNPJ/i)).toBeInTheDocument();
  });

  it("should display error message when there is an error", () => {
    const errors: FieldErrors<TestFormSchema> = {
      document: { message: "Documento inválido", type: "validate" },
    };

    setup(errors);

    expect(screen.getByText(/Documento inválido/i)).toBeInTheDocument();
  });

  it("should apply error styles to input field when there is an error", () => {
    const errors: FieldErrors<TestFormSchema> = {
      document: { message: "Documento inválido", type: "validate" },
    };

    setup(errors);

    const documentInput = screen.getByLabelText(/CPF ou CNPJ/i);
    expect(documentInput).toHaveClass("border-destructive");
  });
});
