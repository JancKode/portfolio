import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test("visitor sees Jan's name and role", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: /jan cyngynn kristoffer frigillana/i }),
    ).toBeVisible();
    await expect(page.getByText(/senior software engineer/i)).toBeVisible();
  });
});
