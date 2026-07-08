import { expect, test } from "@playwright/test";

// Source of truth: the CV's four flagship projects.
const studies = [
  { slug: "storyline", title: "Storyline" },
  { slug: "akeno-ai", title: "akeno.ai" },
  { slug: "emirates-group", title: "Emirates Group" },
  { slug: "aicpa", title: "AICPA Spanish Hub" },
];

test.describe("featured projects", () => {
  test("four featured cards render in the Projects Section", async ({
    page,
  }) => {
    await page.goto("/#projects");
    const cards = page.locator("#projects a[href^='/work/']");

    await expect(cards).toHaveCount(studies.length);
    for (const study of studies) {
      await expect(
        page.locator(`#projects a[href='/work/${study.slug}']`),
      ).toContainText(study.title);
    }
  });

  test("clicking a card transitions to its Case Study page", async ({
    page,
  }) => {
    await page.goto("/#projects");

    await page.locator("#projects a[href='/work/storyline']").click();

    await expect(page).toHaveURL(/\/work\/storyline$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /storyline/i }),
    ).toBeVisible();
  });

  test("a case study opens at the top of the page, not mid-glide", async ({
    page,
  }) => {
    await page.goto("/#projects");

    await page.locator("#projects a[href='/work/storyline']").click();
    await page
      .getByRole("heading", { level: 1, name: /storyline/i })
      .waitFor();

    // The home page's smooth anchor scrolling must not leak into route
    // transitions: the Case Study page has to appear already at its top
    // rather than visibly gliding up from the Projects Section's offset.
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  });
});

test.describe("case study pages", () => {
  for (const study of studies) {
    test(`${study.title} loads directly at /work/${study.slug} with full content`, async ({
      page,
    }) => {
      await page.goto(`/work/${study.slug}`);

      await expect(
        page.getByRole("heading", { level: 1, name: study.title }),
      ).toBeVisible();
      // The agreed Case Study structure: problem, what he built, impact.
      await expect(
        page.getByRole("heading", { name: /problem/i }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: /what i built/i }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: /impact/i }),
      ).toBeVisible();
    });

    test(`${study.title} page shows no product screenshots`, async ({
      page,
    }) => {
      await page.goto(`/work/${study.slug}`);
      await expect(
        page.getByRole("heading", { level: 1, name: study.title }),
      ).toBeVisible();

      expect(await page.locator("img").count()).toBe(0);
    });
  }
});
