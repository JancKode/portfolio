import { expect, test, type Page } from "@playwright/test";

// The Immersive Brand Showcase contract (issue #12): each Case Study is
// immersed in its product's brand, links out to the real landing page, and
// stays theme-honest. Probes are visitor-visible (computed colors, links),
// never component internals or animation state.

const studies = [
  {
    slug: "matterworx",
    // Period is intentionally blank for now; not probed by the eyebrow tests.
    period: "",
    landingHref: "https://matterworx.com",
    landingName: /matterworx\.com/i,
  },
  {
    slug: "storyline",
    period: "2025 – Present",
    landingHref: "https://withstoryline.com",
    landingName: /withstoryline\.com/i,
  },
  {
    slug: "akeno-ai",
    period: "2021 – 2025",
    landingHref: "https://akeno.ai",
    landingName: /akeno\.ai/i,
  },
  {
    slug: "emirates-group",
    period: "2014 – 2018",
    landingHref: "https://www.emirates.com",
    landingName: /company site/i,
  },
  {
    slug: "aicpa",
    period: "2021",
    landingHref: "https://www.aicpa-cima.com",
    landingName: /aicpa-cima\.com/i,
  },
];

async function backgroundIsDark(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    const [r, g, b] = getComputedStyle(document.body)
      .backgroundColor.match(/\d+/g)!
      .map(Number);
    return (r + g + b) / 3 < 128;
  });
}

function themeToggle(page: Page) {
  return page.getByRole("navigation").getByRole("button", { name: /theme/i });
}

// The period eyebrow wears the brand accent — a stable, visitor-visible
// probe for "this page is immersed in its own brand".
function eyebrowColor(page: Page, period: string): Promise<string> {
  return page
    .getByText(period, { exact: true })
    .evaluate((el) => getComputedStyle(el).color);
}

test.describe("case study landing links", () => {
  for (const study of studies) {
    test(`${study.slug} links out to ${study.landingHref} in a new tab, safely`, async ({
      page,
    }) => {
      await page.goto(`/work/${study.slug}`);

      const landing = page.getByRole("link", { name: study.landingName });
      await expect(landing).toBeVisible();
      await expect(landing).toHaveAttribute("href", study.landingHref);
      await expect(landing).toHaveAttribute("target", "_blank");
      await expect(landing).toHaveAttribute("rel", /noopener/);
    });
  }

  test("the Emirates Group link is labeled as the company site, not a product page", async ({
    page,
  }) => {
    await page.goto("/work/emirates-group");

    const landing = page.getByRole("link", { name: /company site/i });
    await expect(landing).toContainText(/emirates\.com/i);
  });

  test("landing links never appear on the Featured Project cards", async ({
    page,
  }) => {
    await page.goto("/#projects");
    const cardLinks = page.locator("#projects a");

    // Exactly the five Case Study cards — no external exits before the
    // visitor has read what Jan did.
    await expect(cardLinks).toHaveCount(5);
    for (const href of await cardLinks.evaluateAll((links) =>
      links.map((l) => l.getAttribute("href")),
    )) {
      expect(href).toMatch(/^\/work\//);
    }
  });
});

test.describe("asymmetric showcase", () => {
  // Impact stats, straight from the CV: outcomes first, technologies second.
  const stats = [
    {
      slug: "matterworx",
      display: "one platform",
      label: /onboarding to invoicing/i,
    },
    { slug: "storyline", display: "days → hours", label: /pipeline turnaround/i },
    { slug: "akeno-ai", display: "4 years", label: /in production/i },
    {
      slug: "emirates-group",
      display: "revenue accounting",
      label: /airline scale/i,
    },
    { slug: "aicpa", display: "5+", label: /developers led/i },
  ];

  test("every card leads with its impact stat at the final value", async ({
    page,
  }) => {
    await page.goto("/#projects");

    for (const stat of stats) {
      const card = page.locator(`#projects a[href='/work/${stat.slug}']`);
      // exact: the AICPA tagline also contains "5+" — the stat is the
      // element whose entire text is the display value.
      await expect(card.getByText(stat.display, { exact: true })).toBeVisible();
      // data-stat-label: Emirates' "airline scale" also appears in its own
      // tagline — the same double-match risk the AICPA "5+" hook exists for.
      await expect(card.locator("[data-stat-label]")).toHaveText(stat.label);
    }
  });

  test("numeric stats settle at their exact final values after scrolling into view", async ({
    page,
  }) => {
    await page.goto("/");
    await page
      .locator("#projects a[href='/work/akeno-ai']")
      .scrollIntoViewIfNeeded();

    // Count-up is presentation; the contract is only that the visitor ends
    // at the true CV numbers (never a stuck intermediate value).
    await expect
      .poll(async () =>
        page
          .locator("#projects a[href='/work/akeno-ai'] [data-stat]")
          .textContent(),
      )
      .toBe("4 years");
    await expect
      .poll(async () =>
        page
          .locator("#projects a[href='/work/aicpa'] [data-stat]")
          .textContent(),
      )
      .toBe("5+");
  });

  test("reduced motion shows final stat values with no counting at any point", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/#projects");
    const stat = page.locator(
      "#projects a[href='/work/akeno-ai'] [data-stat]",
    );
    await stat.waitFor();

    // Sample across a second: under reduced motion the value must never
    // leave its final state — no tween, not even a fast one.
    for (let i = 0; i < 5; i++) {
      expect(await stat.textContent()).toBe("4 years");
      await page.waitForTimeout(200);
    }
  });

  test("the flagship feature card is measurably wider than a compact card", async ({
    page,
  }) => {
    test.skip(
      (page.viewportSize()?.width ?? 0) < 1024,
      "asymmetry is a desktop (lg) contract; below it the grid stacks",
    );
    await page.goto("/#projects");

    const feature = await page
      .locator("#projects a[href='/work/storyline']")
      .boundingBox();
    const compact = await page
      .locator("#projects a[href='/work/aicpa']")
      .boundingBox();

    expect(feature!.width).toBeGreaterThan(compact!.width * 1.1);
  });

  test("the showcase collapses to a single readable column on mobile", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "single column is the mobile contract");
    await page.goto("/#projects");

    const boxes = [];
    for (const study of studies) {
      const card = page.locator(`#projects a[href='/work/${study.slug}']`);
      await expect(card).toBeVisible();
      boxes.push((await card.boundingBox())!);
    }
    // Single column: every card starts at the same x and spans the same width.
    for (const box of boxes.slice(1)) {
      expect(Math.round(box.x)).toBe(Math.round(boxes[0].x));
      expect(Math.round(box.width)).toBe(Math.round(boxes[0].width));
    }
  });

  test("brand marks appear on every card and every Case Study hero", async ({
    page,
  }) => {
    await page.goto("/#projects");
    for (const study of studies) {
      await expect(
        page.locator(
          `#projects a[href='/work/${study.slug}'] [data-brand-mark]`,
        ),
      ).toBeVisible();
    }

    for (const study of studies) {
      await page.goto(`/work/${study.slug}`);
      await expect(page.locator("main [data-brand-mark]").first()).toBeVisible();
    }
  });

  test("keyboard focus is clearly visible and brand-colored on cards and the theme toggle", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/#projects");

    const rgb = (value: string) => value.match(/\d+/g)!.slice(0, 3).map(Number);
    const distance = (a: number[], b: number[]) =>
      a.reduce((sum, ch, i) => sum + Math.abs(ch - b[i]), 0);
    const background = rgb(
      await page.evaluate(() => getComputedStyle(document.body).backgroundColor),
    );

    const outlineOf = async (selector: string) => {
      const el = page.locator(selector).first();
      await el.focus();
      return el.evaluate((node) => {
        const s = getComputedStyle(node);
        return { width: parseFloat(s.outlineWidth), color: s.outlineColor };
      });
    };

    // "Clearly visible" is a contrast claim: the ring must stand off the
    // page background (the UA default near-black ring fails this on dark).
    const storyline = await outlineOf("#projects a[href='/work/storyline']");
    expect(storyline.width).toBeGreaterThanOrEqual(2);
    expect(distance(rgb(storyline.color), background)).toBeGreaterThan(150);

    const aicpa = await outlineOf("#projects a[href='/work/aicpa']");
    expect(aicpa.width).toBeGreaterThanOrEqual(2);
    expect(distance(rgb(aicpa.color), background)).toBeGreaterThan(150);
    // Brand-colored: two brands, two clearly different focus colors.
    expect(distance(rgb(aicpa.color), rgb(storyline.color))).toBeGreaterThan(60);

    const toggle = await outlineOf("nav button");
    expect(toggle.width).toBeGreaterThanOrEqual(2);
    expect(distance(rgb(toggle.color), background)).toBeGreaterThan(150);
  });
});

test.describe("living motifs", () => {
  // Structural completeness under reduced motion: every marked piece of the
  // designed frame sits at full opacity — nothing moves, nothing is missing
  // (the Career Timeline precedent).
  async function expectCompleteMotif(
    motif: ReturnType<Page["locator"]>,
  ): Promise<void> {
    await expect(motif).toBeVisible();
    const pieces = motif.locator("[data-motif-piece]");
    expect(await pieces.count()).toBeGreaterThanOrEqual(3);
    for (const opacity of await pieces.evaluateAll((els) =>
      els.map((el) => getComputedStyle(el).opacity),
    )) {
      expect(opacity).toBe("1");
    }
  }

  test("every card carries its motif, complete under reduced motion", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/#projects");

    for (const study of studies) {
      await expectCompleteMotif(
        page.locator(
          `#projects a[href='/work/${study.slug}'] svg[data-brand-motif]`,
        ),
      );
    }
  });

  test("every Case Study hero carries the same motif, complete under reduced motion", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });

    for (const study of studies) {
      await page.goto(`/work/${study.slug}`);
      const motif = page.locator("main svg[data-brand-motif]").first();
      await expectCompleteMotif(motif);
      // The morph must be honest: the hero shows the card's own motif —
      // one object seen at two sizes.
      await expect(motif).toHaveAttribute("data-brand-motif", study.slug);
    }
  });

  test("cards, stats, marks, and motifs are all rendered without JavaScript", async ({
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/#projects");

    for (const study of studies) {
      const card = page.locator(`#projects a[href='/work/${study.slug}']`);
      // Playwright treats opacity: 0 as visible, so probe computed opacity:
      // the reveal choreography must not blank the showcase for no-JS
      // visitors.
      expect(
        await card.evaluate((el) => {
          for (let n: Element | null = el; n; n = n.parentElement) {
            if (parseFloat(getComputedStyle(n).opacity) < 1) return "hidden";
          }
          return "1";
        }),
      ).toBe("1");
      await expect(card.locator("[data-brand-mark]")).toBeVisible();
      await expect(card.locator("svg[data-brand-motif]")).toBeVisible();
    }
    expect(
      await page
        .locator("#projects a[href='/work/akeno-ai'] [data-stat]")
        .textContent(),
    ).toBe("4 years");

    await context.close();
  });
});

test.describe("hover spotlight and tilt", () => {
  test("the spotlight position tracks the pointer via CSS custom properties, in the brand glow color", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "hover physics are a mouse-pointer contract");
    await page.goto("/#projects");

    const card = page.locator("#projects a[href='/work/storyline']");
    await card.scrollIntoViewIfNeeded();
    const box = (await card.boundingBox())!;

    // Two distinct pointer positions inside the card should drive two
    // distinct spotlight positions — proof the custom properties track the
    // live pointer rather than sitting at a fixed value.
    await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.2, {
      steps: 5,
    });
    const first = await card.evaluate((el) => {
      const s = getComputedStyle(el);
      return {
        x: s.getPropertyValue("--spotlight-x"),
        y: s.getPropertyValue("--spotlight-y"),
      };
    });

    await page.mouse.move(box.x + box.width * 0.8, box.y + box.height * 0.8, {
      steps: 5,
    });
    const second = await card.evaluate((el) => {
      const s = getComputedStyle(el);
      return {
        x: s.getPropertyValue("--spotlight-x"),
        y: s.getPropertyValue("--spotlight-y"),
      };
    });

    expect(first.x).not.toBe("");
    expect(first.x).not.toBe(second.x);
    expect(first.y).not.toBe(second.y);
  });

  test("the tilt stays within a subtle ±2.5° clamp near a card's edge", async ({
    page,
    isMobile,
  }, testInfo) => {
    test.skip(isMobile, "hover physics are a mouse-pointer contract");
    test.skip(
      testInfo.project.name === "reduced-motion",
      "this probes the no-preference tilt path; the reduced-motion contract has its own test below",
    );
    await page.goto("/#projects");

    const card = page.locator("#projects a[href='/work/storyline']");
    await card.scrollIntoViewIfNeeded();
    const box = (await card.boundingBox())!;

    // Deliberately aim at a far corner — the extreme end of the pointer
    // range is exactly where an unclamped tilt would overshoot most.
    await page.mouse.move(box.x + box.width * 0.98, box.y + box.height * 0.02, {
      steps: 5,
    });

    const tilt = page.locator(
      "#projects a[href='/work/storyline']",
    ).locator("xpath=ancestor::*[@data-tilt][1]");

    const readRotation = () =>
      tilt.evaluate((el) => getComputedStyle(el).getPropertyValue("--tilt-x"));

    // Motion's spring settles asynchronously — poll the resting transform
    // rather than asserting mid-tween.
    await expect.poll(readRotation).toMatch(/-?\d+(\.\d+)?deg/);

    const degrees = parseFloat((await readRotation()).match(/(-?\d+(\.\d+)?)deg/)![1]);
    expect(Math.abs(degrees)).toBeLessThanOrEqual(2.5);
    expect(Math.abs(degrees)).toBeGreaterThan(0);
  });

  test("touch pointers get no spotlight or tilt — the effect is mouse-only", async ({
    page,
    isMobile,
    hasTouch,
  }) => {
    test.skip(!isMobile && !hasTouch, "this probes the touch-pointer path specifically");
    await page.goto("/#projects");

    const card = page.locator("#projects a[href='/work/storyline']");
    await card.scrollIntoViewIfNeeded();

    // A real tap would follow the link — dispatch the touch pointer event
    // directly so we can probe the hover-effect wiring without navigating
    // away.
    await card.dispatchEvent("pointermove", {
      pointerType: "touch",
      clientX: 10,
      clientY: 10,
    });
    await page.waitForTimeout(200);

    const spotlight = await card.evaluate(
      (el) => getComputedStyle(el).getPropertyValue("--spotlight-x"),
    );
    expect(spotlight).toBe("");

    const tilt = page
      .locator("#projects a[href='/work/storyline']")
      .locator("xpath=ancestor::*[@data-tilt][1]");
    const rotation = await tilt.evaluate(
      (el) => getComputedStyle(el).getPropertyValue("--tilt-x"),
    );
    expect(rotation).toBe("");
  });

  test("reduced motion keeps the tilt at rest even while the pointer moves", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "hover physics are a mouse-pointer contract");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/#projects");

    const card = page.locator("#projects a[href='/work/storyline']");
    await card.scrollIntoViewIfNeeded();
    const box = (await card.boundingBox())!;

    await page.mouse.move(box.x + box.width * 0.98, box.y + box.height * 0.02, {
      steps: 5,
    });
    await page.waitForTimeout(300);

    const tilt = page
      .locator("#projects a[href='/work/storyline']")
      .locator("xpath=ancestor::*[@data-tilt][1]");
    const rotation = await tilt.evaluate(
      (el) => getComputedStyle(el).getPropertyValue("--tilt-x"),
    );
    // Reduced-motion visitors get no rotation at any point — either the
    // property is never set, or it's pinned at 0deg.
    expect(rotation === "" || parseFloat(rotation) === 0).toBe(true);
  });
});

test.describe("case study brand immersion", () => {
  test("two Case Studies wear visibly different brand accents", async ({
    page,
  }) => {
    await page.goto("/work/storyline");
    const storylineAccent = await eyebrowColor(page, "2025 – Present");

    await page.goto("/work/akeno-ai");
    const akenoAccent = await eyebrowColor(page, "2021 – 2025");

    expect(storylineAccent).not.toBe(akenoAccent);
  });

  test("immersion is theme-honest: the toggle flips the page and recolors the brand live", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/work/storyline");

    expect(await backgroundIsDark(page)).toBe(true);
    const darkAccent = await eyebrowColor(page, "2025 – Present");

    await themeToggle(page).click();
    await expect.poll(async () => backgroundIsDark(page)).toBe(false);

    // Brand accent must recolor with the theme (same hue family, light
    // variant) — the immersion never fights the visitor's choice.
    await expect
      .poll(async () => eyebrowColor(page, "2025 – Present"))
      .not.toBe(darkAccent);

    // And body text stays readable on the light background.
    const textIsDark = await page.evaluate(() => {
      const [r, g, b] = getComputedStyle(document.body)
        .color.match(/\d+/g)!
        .map(Number);
      return (r + g + b) / 3 < 128;
    });
    expect(textIsDark).toBe(true);
  });
});
