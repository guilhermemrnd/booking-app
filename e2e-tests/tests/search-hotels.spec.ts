import test, { expect } from "@playwright/test";

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

test("should show hotel search results", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Dublin");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.getByText("Hotels found in Dublin")).toBeVisible();
  await expect(page.getByText("Dublin Getaways")).toBeVisible();
});

test("should show hotel details", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Dublin");
  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Dublin Getaways").click();

  await expect(page.getByRole("button", { name: "Book Now" })).toBeVisible();
});

test("should book room", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going").fill("Dublin");

  const checkIn = new Date();
  const checkOut = new Date();
  checkOut.setDate(checkOut.getDate() + 3);

  const formattedCheckIn = checkIn.toISOString().split("T")[0];
  const formattedCheckOut = checkOut.toISOString().split("T")[0];

  const formattedDate = `${formattedCheckIn} ~ ${formattedCheckOut}`;
  await page.getByPlaceholder("Pick dates").fill(formattedDate);

  await page.getByRole("button", { name: "Search" }).click();
  await page.getByText("Dublin Getaways").click();
  await page.getByRole("button", { name: "Book Now" }).click();

  await expect(page.getByText("Total Cost: $357.00")).toBeVisible();

  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame
    .locator("[placeholder='Card number']")
    .fill("4242 4242 4242 4242");
  await stripeFrame.locator("[placeholder='MM / YY']").fill("02/31");
  await stripeFrame.locator("[placeholder='CVC']").fill("789");
  await stripeFrame.locator("[placeholder='ZIP']").fill("55270");

  await page.getByRole("button", { name: "Confirm Booking" }).click();
  await expect(page.getByText("Booking Saved!")).toBeVisible();

  await page.getByRole("link", { name: "My Bookings" }).click();
  await expect(page.getByText("Dublin Getaways")).toBeVisible();
});
