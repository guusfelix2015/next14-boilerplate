import { DocumentInput } from "../components/DocumentInput";
import { render, screen } from "@testing-library/react";
import { useForm, FieldErrors, FormProvider } from "react-hook-form";

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
                        type="text"
                        label="CPF ou CNPJ"
                        name="document"
                        register={methods.register}
                        errors={errors}
                        handleDocumentChange={handleDocumentChange}
                        placeholder="000.000.000-00 ou 00.000.000/0000-00"
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
