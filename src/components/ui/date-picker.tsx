import { CalendarIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import { cn, parseDate } from "@/utils";

import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ScrollArea } from "./scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export function DatePickerDemo({
  date,
  setDate,
  hasError,
}: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  hasError?: boolean;
}) {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );

  const handleYearChange = (year: string) => {
    const newYear = parseInt(year, 10);
    setSelectedYear(newYear);
    if (date) {
      const updatedDate = new Date(date);
      updatedDate.setFullYear(newYear);
      setDate(updatedDate);
    }
  };

  const handleMonthChange = (month: string) => {
    const newMonth = parseInt(month, 10);
    setSelectedMonth(newMonth);
    if (date) {
      const updatedDate = new Date(date);
      updatedDate.setMonth(newMonth);
      setDate(updatedDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "w-full justify-between text-left font-normal",
            hasError ? "border-destructive" : ""
          )}
          variant={"outline"}
        >
          {date ? (
            parseDate(date).format("L")
          ) : (
            <span className="text-placeholder text-sm leading-5">
              DD/MM/AAAA
            </span>
          )}
          <CalendarIcon className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-4">
        <div className="mb-2 flex gap-2">
          <Select
            value={selectedYear.toString()}
            onValueChange={handleYearChange}
          >
            <SelectTrigger className="flex-1 rounded-md">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-[15rem]">
                {Array.from({ length: 100 }, (_, i) => (
                  <SelectItem
                    key={i}
                    value={(new Date().getFullYear() - i).toString()}
                  >
                    {new Date().getFullYear() - i}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
          <Select
            value={selectedMonth.toString()}
            onValueChange={handleMonthChange}
          >
            <SelectTrigger className="flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-[15rem]">
                {Array.from({ length: 12 }, (_, i) => (
                  <SelectItem key={i} value={i.toString()}>
                    {new Date(0, i).toLocaleString("pt-BR", {
                      month: "long",
                    })}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
        <Calendar
          captionLayout={undefined}
          fromYear={2000}
          mode="single"
          month={new Date(selectedYear, selectedMonth)}
          selected={date}
          toYear={new Date().getFullYear()}
          onSelect={setDate}
        />
      </PopoverContent>
    </Popover>
  );
}
