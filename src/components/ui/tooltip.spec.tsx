"use client";

import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

describe("Tooltip Component", () => {
  it("should render the tooltip trigger and content", () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    const triggerElement = screen.getByText("Hover me");
    expect(triggerElement).toBeInTheDocument();

    const tooltipElement = screen.queryByText("Tooltip content");
    expect(tooltipElement).not.toBeInTheDocument();
  });

  it("should hide the tooltip content when not hovering", () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    const triggerElement = screen.getByText("Hover me");

    fireEvent.mouseOver(triggerElement);
    fireEvent.mouseOut(triggerElement);
    const tooltipElement = screen.queryByText("Tooltip content");
    expect(tooltipElement).not.toBeInTheDocument();
  });

  it("should hide the tooltip content on blur", () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    const triggerElement = screen.getByText("Hover me");

    fireEvent.focus(triggerElement);
    fireEvent.blur(triggerElement);
    const tooltipElement = screen.queryByText("Tooltip content");
    expect(tooltipElement).not.toBeInTheDocument();
  });

  it("should show the tooltip content on focus", () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    const triggerElement = screen.getByText("Hover me");

    fireEvent.focus(triggerElement);

    const tooltipElement = screen.getByRole("tooltip");
    expect(tooltipElement).toBeInTheDocument();
  });

  it("should show the tooltip content on hover", async () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    const triggerElement = screen.getByText("Hover me");

    await userEvent.hover(triggerElement);

    const tooltipElement = await screen.findByRole("tooltip");
    expect(tooltipElement).toBeInTheDocument();
  });
});
