import { expect, test } from "@playwright/test";

test.describe("hero", () => {
  test("visitor sees Jan's name and role", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: /jan cyngynn kristoffer frigillana/i }),
    ).toBeVisible();
    await expect(
      page.getByText(/senior software engineer/i).first(),
    ).toBeVisible();
  });

  test("visitor sees the View work and Download CV CTAs", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("link", { name: /view work/i })).toBeVisible();
    await expect(
      page.getByRole("link", { name: /download cv/i }),
    ).toBeVisible();
  });

  test("the Download CV link serves the CV as a PDF", async ({
    page,
    request,
  }) => {
    await page.goto("/");

    const href = await page
      .getByRole("link", { name: /download cv/i })
      .getAttribute("href");
    expect(href).toBeTruthy();

    const response = await request.get(href!);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/pdf");
  });
});

test.describe("sticky nav", () => {
  test("nav stays visible when the visitor scrolls down the Scroll Story", async ({
    page,
  }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation");
    await expect(nav).toBeInViewport();

    await page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight),
    );

    await expect(nav).toBeInViewport();
  });

  test("nav anchors navigate to their Sections", async ({ page }) => {
    await page.goto("/");

    await page
      .getByRole("navigation")
      .getByRole("link", { name: /contact/i })
      .click();

    await expect(
      page.getByRole("heading", { name: /contact/i }),
    ).toBeInViewport();
  });
});

test.describe("contact links", () => {
  test("visitor can reach Jan on GitHub, LinkedIn, and email", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      "https://github.com/JancKode",
    );
    await expect(
      page.getByRole("link", { name: /linkedin/i }),
    ).toHaveAttribute("href", /^https:\/\/www\.linkedin\.com\/in\//);
    await expect(page.getByRole("link", { name: /email/i })).toHaveAttribute(
      "href",
      "mailto:rso.janc@gmail.com",
    );
  });
});
