import { render, screen } from "@testing-library/react";
import { CtaButton } from "@/components/cta-button";
import { describe, expect, it } from "vitest";

describe("CtaButton", () => {
  it("renders a link with label", () => {
    render(
      <CtaButton href="/catchy-verifs">Apply for a Free Catchy Verif</CtaButton>
    );

    expect(
      screen.getByRole("link", { name: "Apply for a Free Catchy Verif" })
    ).toBeInTheDocument();
  });

  it("supports secondary variant styles", () => {
    render(
      <CtaButton href="/services" variant="secondary">
        View Services
      </CtaButton>
    );

    expect(screen.getByRole("link", { name: "View Services" })).toHaveClass("bg-white");
  });

  it("renders consultation as external link", () => {
    render(
      <CtaButton href="/contact" variant="consultation">
        Book a Consultation
      </CtaButton>
    );

    const link = screen.getByRole("link", { name: "Book a Consultation" });
    expect(link).toHaveAttribute(
      "href",
      "https://docs.google.com/forms/d/e/1FAIpQLSdtpBZZwqVZaVVfXAB8q7rQyS_REfPDDbEsTO_Qy2_Ue2xJnQ/viewform"
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
