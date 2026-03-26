const { test, expect } = require('@playwright/test');
// ===== LOCATORS =====
const USERNAME_INPUT = '//input[@data-test="username"]';
const PASSWORD_INPUT = '//input[@data-test="password"]';
const LOGIN_BUTTON = '//input[@data-test="login-button"]';
const ERROR_MESSAGE = '//h3[@data-test="error"]';
const BASE_URL = 'https://www.saucedemo.com/';
// ===== ACTIONS =====
async function login(page, username, password) {
  await page.goto(BASE_URL);
  await page.locator(USERNAME_INPUT).fill(username);
  await page.locator(PASSWORD_INPUT).fill(password);
  await page.locator(LOGIN_BUTTON).click();
}
// ===== TESTS =====
test.describe('Авторизация на Sauce Demo', () => {
  test('Авторизация Позитивный кейс', async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Авторизация Негативный кейс', async ({ page }) => {
    await login(page, 'standard_user', 'wrong_password');
    await expect(page.locator(ERROR_MESSAGE)).toBeVisible();
    await expect(page.locator(ERROR_MESSAGE))
      .toHaveText('Epic sadface: Username and password do not match any user in this service');
  });

});