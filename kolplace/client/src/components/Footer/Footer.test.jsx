import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";
import { describe, expect, it } from "vitest";

describe("Footer Component", () => {
  it("renders the footer", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const footerElement = screen.getByTestId("footer");

    expect(footerElement).toBeInTheDocument();
  });
});
