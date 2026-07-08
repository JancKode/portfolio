import { expect, test } from "@playwright/test";

// Slice 8: site-wide accessibility and motion hardening. All tests assert
// visitor-visible behavior at the agreed Playwright seam.

test.describe("keyboard navigation", () => {
  test("the first Tab reveals a skip link that jumps past the nav", async ({
    page,
  }) => {
    await page.goto("/");

    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: /skip to content/i });
    await expect(skipLink).toBeFocused();

    await page.keyboard.press("Enter");
    // Focus must land inside the page content, past the nav's link list.
    const inMain = await page.evaluate(() =>
      document.querySelector("main")!.contains(document.activeElement),
    );
    expect(inMain).toBe(true);
  });

  test("the theme toggle is operable with the keyboard alone", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");

    await page
      .getByRole("navigation")
      .getByRole("button", { name: /theme/i })
      .focus();
    await page.keyboard.press("Enter");

    await expect
      .poll(async () =>
        page.evaluate(() => {
          const [r, g, b] = getComputedStyle(document.body)
            .backgroundColor.match(/\d+/g)!
            .map(Number);
          return (r + g + b) / 3 < 128;
        }),
      )
      .toBe(false);
  });

  test("every nav destination and hero CTA is reachable by Tab", async ({
    page,
  }) => {
    await page.goto("/");

    // Walk the tab order from the top of the page and collect accessible
    // names of everything focusable.
    const reached: string[] = [];
    for (let i = 0; i < 25; i++) {
      await page.keyboard.press("Tab");
      const name = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        return el?.getAttribute("aria-label") ?? el?.textContent?.trim() ?? "";
      });
      if (!name || reached.includes(name)) continue;
      reached.push(name);
    }

    for (const expected of [
      "About",
      "Projects",
      "Skills",
      "Career",
      "Contact",
      "Blog",
      "View work",
      "Download CV",
    ]) {
      expect(reached).toContain(expected);
    }
    expect(
      reached.some((name) => /switch to (light|dark) theme/i.test(name)),
    ).toBe(true);
  });
});

test.describe("semantic structure", () => {
  const pages = [
    { name: "home", path: "/" },
    { name: "case study", path: "/work/storyline" },
    { name: "blog index", path: "/blog" },
    { name: "blog post", path: "/blog/human-led-ai-assisted-development" },
  ];

  for (const { name, path } of pages) {
    test(`the ${name} page exposes landmarks, one h1, ordered headings, and alt text`, async ({
      page,
    }) => {
      await page.goto(path);

      // Landmarks assistive tech navigates by.
      await expect(page.getByRole("banner")).toHaveCount(1);
      await expect(page.getByRole("navigation")).toHaveCount(1);
      await expect(page.locator("main")).toHaveCount(1);

      // Exactly one h1, and no heading level is ever skipped.
      await expect(page.locator("h1")).toHaveCount(1);
      const levels = await page
        .locator("h1, h2, h3, h4, h5, h6")
        .evaluateAll((els) => els.map((el) => Number(el.tagName[1])));
      for (let i = 1; i < levels.length; i++) {
        expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
      }

      // Every image must carry alt text (decorative visuals are aria-hidden
      // divs/svgs, not imgs).
      const missingAlt = await page
        .locator("img:not([alt])")
        .count();
      expect(missingAlt).toBe(0);
    });
  }
});

test.describe("layout", () => {
  for (const path of [
    "/",
    "/work/storyline",
    "/blog",
    "/blog/human-led-ai-assisted-development",
  ]) {
    test(`${path} never overflows the viewport horizontally`, async ({
      page,
    }) => {
      await page.goto(path);
      // Let entrance animations settle before measuring.
      await page.waitForTimeout(300);

      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return doc.scrollWidth - doc.clientWidth;
      });
      expect(overflow).toBe(0);
    });
  }
});

test.describe("reduced motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("the hero never sits displaced waiting for an entrance animation", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // Even at first paint — before hydration — reduced-motion visitors must
    // not see content offset by a pending slide-in.
    const transform = await page
      .getByRole("heading", { name: /jan cyngynn kristoffer frigillana/i })
      .evaluate((el) => getComputedStyle(el).transform);
    expect(transform).toBe("none");
  });

  test("every Section's content settles fully visible with no displacement", async ({
    page,
  }) => {
    await page.goto("/");

    for (const id of ["about", "projects", "skills", "career", "contact"]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();

      // Reveal animations may simplify to fades, but must complete…
      for (const el of await page.locator(`#${id} h2, #${id} h3`).all()) {
        await expect
          .poll(async () => el.evaluate((n) => getComputedStyle(n).opacity))
          .toBe("1");
      }
      // …and nothing may remain translated or scaled.
      const transforms = await page
        .locator(`#${id} *:not([aria-hidden])`)
        .evaluateAll((els) =>
          els
            .map((el) => getComputedStyle(el).transform)
            .filter((t) => t !== "none"),
        );
      expect(transforms).toEqual([]);
    }
  });
});
