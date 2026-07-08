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

  test("anchor navigation jumps instantly for reduced-motion visitors", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await page
      .getByRole("navigation")
      .getByRole("link", { name: /contact/i })
      .click();

    // No glide: an instant jump's first scroll movement already lands at the
    // Contact Section, while a smooth scroll's first frames barely move.
    await page.waitForFunction(() => window.scrollY > 0);
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(500);
  });
});

test.describe("about", () => {
  test("visitor reads Jan's senior positioning in the About Section", async ({
    page,
  }) => {
    await page.goto("/#about");

    const about = page.locator("#about");
    await expect(
      about.getByRole("heading", { name: "About" }),
    ).toBeVisible();
    // Positioning facts from the CV: seniority and AI-assisted ways of working.
    await expect(about.getByText(/9\+ years/i)).toBeVisible();
    await expect(about.getByText(/AI-assisted development/i)).toBeVisible();
  });
});

test.describe("skills", () => {
  test("visitor scans the tech stack grouped by category", async ({
    page,
  }) => {
    await page.goto("/#skills");
    const skills = page.locator("#skills");

    for (const category of [
      "Languages",
      "Frontend",
      "Backend",
      "AI & Agentic",
      "Cloud & DevOps",
      "Testing",
    ]) {
      await expect(
        skills.getByRole("heading", { name: category }),
      ).toBeVisible();
    }

    // Spot-check one badge per category, straight from the CV.
    for (const skill of [
      "TypeScript",
      "Next.js",
      "GraphQL",
      "Mastra AI",
      "GitHub Actions",
      "Playwright",
    ]) {
      await expect(skills.getByText(skill, { exact: true })).toBeVisible();
    }
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
