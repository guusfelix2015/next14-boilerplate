import { render, screen } from "@testing-library/react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  useForm,
} from "react-hook-form";

import { ComboboxBank } from "../components/Combobox";

const items = [
  { id: "1", name: "Item 1" },
  { id: "2", name: "Item 2" },
];

interface FormData {
  item: string;
}

interface ComboboxBankProps<T extends FieldValues> {
  control: Control<T>;
  name: keyof T;
  items: Array<{ id: string; name: string }>;
  selectedItem?: { id: string; name: string } | undefined;
  placeholder: string;
  errors?: FieldErrors<T>;
  onChange: (value: { id: string; name: string }) => void;
  className?: string;
}

const Wrapper = ({
  children,
}: {
  children: (props: ComboboxBankProps<FormData>) => JSX.Element;
}) => {
  const { control } = useForm<FormData>({
    defaultValues: {
      item: "",
    },
  });

  return (
    <Controller
      control={control}
      name="item"
      render={({ field, fieldState }) => (
        <>
          {typeof children === "function" &&
            children({
              control,
              name: "item",
              items,
              selectedItem: items.find(item => item.id === field.value),
              placeholder: "Select an item",
              errors: fieldState.error,
              onChange: field.onChange,
              className: "",
            })}
        </>
      )}
    />
  );
};

describe("ComboboxBank", () => {
  it("should render correctly with placeholder", () => {
    render(
      <Wrapper>{props => <ComboboxBank {...props} errors={{}} />}</Wrapper>
    );

    expect(screen.getByRole("combobox")).toHaveTextContent("Select an item");
  });

  it("should display error message", () => {
    render(
      <Wrapper>
        {props => (
          <ComboboxBank
            {...props}
            errors={
              {
                item: { message: "Error message" },
              } as FieldErrors<FormData>
            }
          />
        )}
      </Wrapper>
    );

    expect(screen.getByText("Error message")).toBeInTheDocument();
  });
});
