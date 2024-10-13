import { cn, parseDate } from "@/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { Button } from "../Button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../Select";
import { ScrollArea } from "../ScrollArea";
import { Calendar } from "../Calendar";

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
                    variant={"outline"}
                    className={cn(
                        "w-full justify-between text-left font-normal",
                        hasError ? "border-destructive" : ""
                    )}
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
            <PopoverContent className="w-auto p-4" align="start">
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
                                        value={(
                                            new Date().getFullYear() - i
                                        ).toString()}
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
                                        {new Date(0, i).toLocaleString(
                                            "pt-BR",
                                            {
                                                month: "long",
                                            }
                                        )}
                                    </SelectItem>
                                ))}
                            </ScrollArea>
                        </SelectContent>
                    </Select>
                </div>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    fromYear={2000}
                    toYear={new Date().getFullYear()}
                    month={new Date(selectedYear, selectedMonth)}
                    captionLayout={undefined}
                />
            </PopoverContent>
        </Popover>
    );
}
