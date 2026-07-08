import { expect, test } from "@playwright/test";

// Source of truth: the starter post shipped with the blog.
const starterPost = {
  slug: "human-led-ai-assisted-development",
  title: "Human-Led, AI-Assisted: How I Ship Production Code with Agents",
};

test.describe("blog index", () => {
  test("visitor sees the published posts listed at /blog", async ({
    page,
  }) => {
    await page.goto("/blog");

    await expect(
      page.getByRole("heading", { level: 1, name: /blog/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: starterPost.title }),
    ).toBeVisible();
  });
});

test.describe("blog navigation", () => {
  test("visitor reaches the blog from the sticky nav and opens a post", async ({
    page,
  }) => {
    await page.goto("/");

    await page
      .getByRole("navigation")
      .getByRole("link", { name: /blog/i })
      .click();
    await expect(page).toHaveURL(/\/blog$/);

    await page.getByRole("link", { name: starterPost.title }).click();
    await expect(page).toHaveURL(new RegExp(`/blog/${starterPost.slug}$`));
    await expect(
      page.getByRole("heading", { level: 1, name: starterPost.title }),
    ).toBeVisible();
  });

  test("the blog opens at the top of the page, not mid-glide", async ({
    page,
  }) => {
    await page.goto("/#contact");

    await page
      .getByRole("navigation")
      .getByRole("link", { name: /blog/i })
      .click();
    await page.getByRole("heading", { level: 1, name: /blog/i }).waitFor();

    // Same contract as Case Studies: the home page's smooth anchor scrolling
    // must not leak into route transitions.
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  });
});

test.describe("blog post", () => {
  test(`the starter post renders in full at /blog/${starterPost.slug}`, async ({
    page,
  }) => {
    await page.goto(`/blog/${starterPost.slug}`);

    await expect(
      page.getByRole("heading", { level: 1, name: starterPost.title }),
    ).toBeVisible();
    // Long-form body, not just the header: at least one section heading
    // and several paragraphs of prose.
    expect(
      await page.locator("article h2").count(),
    ).toBeGreaterThanOrEqual(1);
    expect(await page.locator("article p").count()).toBeGreaterThan(3);
  });
});
