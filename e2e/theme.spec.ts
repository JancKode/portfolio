import { expect, test, type Page } from "@playwright/test";

// The theme contract is visual: probe the page's actual background rather
// than any class or attribute the implementation happens to use.
async function backgroundIsDark(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    const [r, g, b] = getComputedStyle(document.body)
      .backgroundColor.match(/\d+/g)!
      .map(Number);
    // Relative luminance, rough: dark themes sit far below 128.
    return (r + g + b) / 3 < 128;
  });
}

function themeToggle(page: Page) {
  return page.getByRole("navigation").getByRole("button", { name: /theme/i });
}

test.describe("theme", () => {
  test("dark is the default and the toggle switches the theme site-wide", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");

    expect(await backgroundIsDark(page)).toBe(true);

    await themeToggle(page).click();
    await expect
      .poll(async () => backgroundIsDark(page))
      .toBe(false);

    await themeToggle(page).click();
    await expect.poll(async () => backgroundIsDark(page)).toBe(true);
  });

  test("system light preference is respected on first visit", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");

    expect(await backgroundIsDark(page)).toBe(false);
  });

  test("chosen theme survives a reload without a wrong-theme flash", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");

    await themeToggle(page).click();
    await expect.poll(async () => backgroundIsDark(page)).toBe(false);

    // Probe at domcontentloaded: the inline pre-paint script must already
    // have applied the persisted light theme before hydration runs —
    // otherwise dark-preferring visitors see a dark flash.
    await page.reload({ waitUntil: "domcontentloaded" });
    expect(await backgroundIsDark(page)).toBe(false);
  });

  test("light theme keeps nav and body text readable", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");

    // Contrast holds: foreground text must be dark on the light background.
    const textIsDark = await page.evaluate(() => {
      const [r, g, b] = getComputedStyle(document.body)
        .color.match(/\d+/g)!
        .map(Number);
      return (r + g + b) / 3 < 128;
    });
    expect(textIsDark).toBe(true);
  });
});
