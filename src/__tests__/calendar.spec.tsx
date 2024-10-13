import "dayjs/locale/pt-br";

import { render, screen } from "@testing-library/react";
import dayjs from "dayjs";

import { Calendar } from "../components/Calendar";

dayjs.locale("pt-br");

describe("Calendar Component", () => {
  it("should render correctly with default props", () => {
    const currentMonth = dayjs(new Date(2024, 8));
    render(<Calendar month={currentMonth.toDate()} />);

    const calendarElement = screen.getByRole("grid");
    expect(calendarElement).toBeInTheDocument();

    const formattedMonthYear = currentMonth.format("MMMM YYYY");
    expect(screen.getByText(formattedMonthYear)).toBeInTheDocument();
  });
});
