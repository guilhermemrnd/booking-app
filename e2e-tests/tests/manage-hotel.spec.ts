import { expect, test } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:3000";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in successful!")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`);

  await page.locator("[name=name]").fill("Test Name");
  await page.locator("[name=city]").fill("Test City");
  await page.locator("[name=country]").fill("Test country");
  await page.locator("[name=description]").fill("This is a test description");
  await page.locator("[name=pricePerNight]").fill("100");
  await page.selectOption("select[name=starRating]", "3");

  await page.getByText("All Inclusive").click();
  await page.getByLabel("Free WiFi").check();
  await page.getByLabel("Parking").check();

  await page.locator("[name=adultCount]").fill("2");
  await page.locator("[name=childCount]").fill("3");

  await page.setInputFiles("[name=imageFiles]", [
    path.join(__dirname, "files", "1.jpg"),
    path.join(__dirname, "files", "2.jpg"),
    path.join(__dirname, "files", "3.jpg"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel saved!")).toBeVisible({ timeout: 15000 });
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`);

  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();

  await expect(page.getByText("Dublin Getaways")).toBeVisible();
  await expect(page.getByText("Lorem ipsum dolor sit amet")).toBeVisible();
  await expect(page.getByText("Dublin, Ireland")).toBeVisible();
  await expect(page.getByText("All Inclusive")).toBeVisible();
  await expect(page.getByText("$119 per night")).toBeVisible();
  await expect(page.getByText("2 adults, 3 children")).toBeVisible();
  await expect(page.getByText("2 Star Rating")).toBeVisible();

  await expect(page.getByRole("link", { name: "View Details" })).toBeVisible();
});
