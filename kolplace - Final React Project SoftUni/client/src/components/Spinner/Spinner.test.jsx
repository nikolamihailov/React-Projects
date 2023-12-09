import { render, screen } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import Spinner from "./Spinner";

describe("Spinner Component", async () => {
  it("renders the spinner component", async () => {
    render(<Spinner />);

    const spinnerElement = screen.getByTestId("spinner"); // Make sure to add data-testid="spinner" in your component

    expect(spinnerElement).toBeInTheDocument();
  });
});
