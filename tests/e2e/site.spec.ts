import { test, expect } from "@playwright/test";

const CONSULTATION_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdtpBZZwqVZaVVfXAB8q7rQyS_REfPDDbEsTO_Qy2_Ue2xJnQ/viewform";

test("Home loads with header and navigation", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("link", { name: "Services" })).toBeVisible();
});

test("Mobile header shows primary CTA + hamburger and menu content", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();

  await page.goto("/");

  const header = page.getByRole("banner");
  const hamburger = header.getByRole("button", { name: "Open menu" });
  await expect(hamburger).toBeVisible();
  await expect(header.getByRole("link", { name: "Services" })).toHaveCount(0);

  const applyCta = header.getByRole("link", {
    name: "Apply for a Free Catchy Verif",
  });
  await expect(applyCta).toHaveCount(1);
  await expect(applyCta).toBeVisible();

  await hamburger.click();
  const mobileMenu = page.locator("#mobile-nav-menu");
  await expect(mobileMenu.getByRole("link", { name: "Services" })).toBeVisible();
  await expect(
    mobileMenu.getByRole("link", { name: "Book a Consultation" })
  ).toBeVisible();

  await context.close();
});

test("Apply for a Free Catchy Verif CTA reaches catchy-verifs page", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: "Apply for a Free Catchy Verif" })
    .first()
    .click();
  await expect(page).toHaveURL(/\/catchy-verifs/);
});

test("Catchy Verifs page has form link or embed", async ({ page }) => {
  await page.goto("/catchy-verifs");
  const formTarget = page.locator(
    '[data-testid="google-form-link"], iframe[title="Catchy Verifs application form"]'
  );
  await expect(formTarget.first()).toBeVisible();
});

test("Book a Consultation points to Google Form", async ({ page }) => {
  await page.goto("/");
  const consultationLink = page
    .getByRole("link", { name: "Book a Consultation" })
    .first();
  await expect(consultationLink).toHaveAttribute("href", CONSULTATION_FORM_URL);
  await expect(consultationLink).toHaveAttribute("target", "_blank");
  await expect(consultationLink).toHaveAttribute("rel", "noopener noreferrer");
});

test("Footer social links point to Instagram, X, and TikTok", async ({
  page,
}) => {
  await page.goto("/");
  const instaLink = page.getByTestId("footer-instagram-link");
  const xLink = page.getByTestId("footer-x-link");
  const tiktokLink = page.getByTestId("footer-tiktok-link");

  await expect(instaLink).toHaveAttribute(
    "href",
    "https://instagram.com/catchy_is_growth"
  );
  await expect(xLink).toHaveAttribute("href", "https://x.com/catchy_is_growth");
  await expect(tiktokLink).toHaveAttribute(
    "href",
    "https://www.tiktok.com/@catchy_is_growth"
  );
  await expect(instaLink).toHaveAttribute("target", "_blank");
  await expect(xLink).toHaveAttribute("target", "_blank");
  await expect(tiktokLink).toHaveAttribute("target", "_blank");
  await expect(instaLink).toHaveAttribute("rel", "noopener noreferrer");
  await expect(xLink).toHaveAttribute("rel", "noopener noreferrer");
  await expect(tiktokLink).toHaveAttribute("rel", "noopener noreferrer");
});

test("Contact form shows validation errors on empty submit", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByText("Name is required.")).toBeVisible();
  await expect(page.getByText("Email is required.")).toBeVisible();
  await expect(page.getByText("Message is required.")).toBeVisible();
});
