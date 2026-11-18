import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import About from "./About";

describe("About Component", () => {
  it("renders the About component", () => {
    render(<About />);

    const headingElement = screen.getByRole("heading", { name: /about us/i });
    expect(headingElement).toBeInTheDocument();

    const emailLink = screen.getByRole("link", {
      name: /kolplace_km@gmail\.com/i,
    });
    const phoneLink = screen.getByRole("link", { name: /\+44 20 7946 0443/i });

    expect(emailLink).toBeInTheDocument();
    expect(phoneLink).toBeInTheDocument();
  });
});
