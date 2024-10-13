import Home from "@/app/[locale]/page";

describe("Home", () => {
    test("Home page should be exist", () => {
        expect(Home).toBeTruthy();
    });
});
