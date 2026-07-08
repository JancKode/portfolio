import { expect, test } from "@playwright/test";

// Slice 9: SEO and analytics, asserted through what crawlers and social
// scrapers actually fetch.

const pages = [
  "/",
  "/work/storyline",
  "/work/akeno-ai",
  "/blog",
  "/blog/human-led-ai-assisted-development",
];

test.describe("social cards", () => {
  test("the home page serves Open Graph tags and a fetchable OG image", async ({
    page,
    request,
  }) => {
    await page.goto("/");

    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      /frigillana/i,
    );

    const imageUrl = await page
      .locator('meta[property="og:image"]')
      .first()
      .getAttribute("content");
    expect(imageUrl).toBeTruthy();

    // Social scrapers resolve the URL themselves — it must be absolute and
    // actually serve an image. Fetch it through the app under test.
    expect(imageUrl).toMatch(/^https?:\/\//);
    const response = await request.get(
      new URL(imageUrl!).pathname,
    );
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/");
  });
});

test.describe("crawler files", () => {
  test("the sitemap lists every page and robots.txt points at it", async ({
    request,
  }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const xml = await sitemap.text();
    for (const path of [
      "/work/storyline",
      "/work/akeno-ai",
      "/work/emirates-group",
      "/work/aicpa",
      "/blog",
      "/blog/human-led-ai-assisted-development",
    ]) {
      expect(xml).toContain(`https://jckfrigillana.dev${path}`);
    }
    expect(xml).toContain("https://jckfrigillana.dev");

    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    const txt = await robots.text();
    expect(txt).toMatch(/allow: \//i);
    expect(txt).toContain("https://jckfrigillana.dev/sitemap.xml");
  });
});

test.describe("structured data", () => {
  test("the home page carries a JSON-LD Person that identifies Jan", async ({
    page,
  }) => {
    await page.goto("/");

    const raw = await page
      .locator('script[type="application/ld+json"]')
      .first()
      .textContent();
    expect(raw).toBeTruthy();

    const person = JSON.parse(raw!);
    expect(person["@context"]).toBe("https://schema.org");
    expect(person["@type"]).toBe("Person");
    expect(person.name).toBe("Jan Cyngynn Kristoffer Frigillana");
    expect(person.jobTitle).toContain("Senior Software Engineer");
    expect(person.url).toBe("https://jckfrigillana.dev");
    expect(person.sameAs).toContain("https://github.com/JancKode");
    expect(
      person.sameAs.some((u: string) => u.includes("linkedin.com")),
    ).toBe(true);
  });
});

test.describe("analytics", () => {
  test("page views are reported to the analytics beacon", async ({
    page,
  }) => {
    await page.goto("/");

    // Vercel Analytics queues events on window.va before its script loads;
    // that queue existing means page views are being recorded.
    await page.waitForFunction(
      () => typeof (window as { va?: unknown }).va === "function",
    );
    expect(
      await page.locator("script[data-sdkn], script[src*='insights']").count(),
    ).toBeGreaterThan(0);
  });
});

test.describe("page metadata", () => {
  test("every page has its own title and description", async ({ page }) => {
    const titles: string[] = [];
    const descriptions: string[] = [];

    for (const path of pages) {
      await page.goto(path);
      titles.push(await page.title());
      descriptions.push(
        (await page
          .locator('meta[name="description"]')
          .getAttribute("content")) ?? "",
      );
    }

    for (const title of titles) expect(title).not.toBe("");
    for (const description of descriptions) expect(description).not.toBe("");
    expect(new Set(titles).size).toBe(pages.length);
    expect(new Set(descriptions).size).toBe(pages.length);
  });
});
