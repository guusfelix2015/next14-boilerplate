import { PhoneInputField } from "../components/PhoneInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { fireEvent, render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    phone: z.string().min(10, "Número de telefone inválido"),
});

function TestForm() {
    const {
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            phone: "",
        },
        resolver: zodResolver(schema),
    });

    return (
        <PhoneInputField
            type="text"
            label="Telefone"
            name="phone"
            control={control}
            errors={errors}
            placeholder="(99) 9999-9999"
        />
    );
}

describe("PhoneInputField", () => {
    it("should render the phone input field", () => {
        render(<TestForm />);
        const input = screen.getByPlaceholderText("(99) 9999-9999");
        expect(input).toBeInTheDocument();
    });

    it("should display the label", () => {
        render(<TestForm />);
        const label = screen.getByLabelText("Telefone");
        expect(label).toBeInTheDocument();
    });

    it("should not call onChange when the input is empty", () => {
        render(<TestForm />);
        const input = screen.getByPlaceholderText("(99) 9999-9999");
        fireEvent.change(input, { target: { value: "" } });
        expect(input).toHaveValue("");
    });

    it("should format the phone number correctly when input is provided", () => {
        render(<TestForm />);
        const input = screen.getByPlaceholderText("(99) 9999-9999");
        fireEvent.change(input, { target: { value: "9999999999" } });
        expect(input).toHaveValue("(99) 9999-9999");
    });
});
