import { Dialog, DialogTrigger } from "../components/Dialog";
import { render, screen } from "@testing-library/react";
import React from "react";

const Wrapper = (children: React.ReactNode) => {
    render(<Dialog open={true}>{children}</Dialog>);
};

describe("Dialog Components", () => {
    it("renders Dialog", () => {
        Wrapper("dialog");
        expect(screen.getByText("dialog")).toBeInTheDocument();
    });

    it("renders DialogTrigger", () => {
        Wrapper(<DialogTrigger>Open</DialogTrigger>);
        expect(screen.getByText("Open")).toBeInTheDocument();
    });
});
