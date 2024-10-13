import { render, screen } from "@testing-library/react";
import { useTranslations } from "next-intl";
import Home from "../app/[locale]/page";

jest.mock("next-intl", () => ({
    useTranslations: jest.fn(),
}));

describe("Home Page", () => {
    it("renders the title and description from translations", () => {
        (useTranslations as jest.Mock).mockReturnValue(
            (key: "title" | "description") => {
                const translations: Record<"title" | "description", string> = {
                    title: "Welcome to the Home Page",
                    description: "This is the home page description",
                };
                return translations[key];
            }
        );

        render(<Home />);

        const title = screen.getByRole("heading", {
            name: /Welcome to the Home Page/i,
        });
        const description = screen.getByText(
            /This is the home page description/i
        );

        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
    });
});
