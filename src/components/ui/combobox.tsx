import { CheckIcon, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Controller, Path } from "react-hook-form";
import { TypeOf, ZodSchema } from "zod";

import { ComboboxProps } from "@/types";
import { cn } from "@/utils";

import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { FormError } from "./form-error";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export const ComboboxBank = <T extends ZodSchema>({
  control,
  name,
  items,
  selectedItem,
  placeholder,
  errors,
  onChange,
  className,
}: ComboboxProps<T>) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Popover open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <PopoverTrigger asChild>
          <Button
            className={cn("justify-between", className)}
            id={name}
            role="combobox"
            type="button"
            variant="outline"
          >
            {selectedItem ? selectedItem.name : placeholder}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("w-48 p-0", className)}>
          <Command>
            <CommandInput
              className="h-9"
              placeholder={`Busque ${placeholder.toLowerCase()}`}
            />
            <CommandList>
              <CommandEmpty>Nenhum item encontrado.</CommandEmpty>
              <CommandGroup>
                <Controller
                  control={control}
                  name={name as Path<TypeOf<T>>}
                  render={({ field }) => (
                    <>
                      {items.map(item => (
                        <CommandItem
                          key={item.name}
                          value={item.name}
                          onSelect={() => {
                            const selectedId =
                              typeof item.id === "number"
                                ? String(item.id)
                                : item.id;
                            onChange({
                              ...item,
                              id: selectedId,
                            });
                            field.onChange(selectedId);
                            setIsDrawerOpen(false);
                          }}
                        >
                          {item.name}
                          <CheckIcon
                            className={`ml-auto size-4 text-primary ${
                              selectedItem?.id === item.id
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />
                        </CommandItem>
                      ))}
                    </>
                  )}
                />
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <FormError errors={errors} fieldName={name} />
    </div>
  );
};
