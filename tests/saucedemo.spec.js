const { test, expect } = require('@playwright/test');

test.describe('Авторизация на Sauce Demo', () => {

  test('Авторизация Позитивный кейс', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('//input[@data-test ="username"]').fill('standard_user');
    await page.locator('//input[@data-test ="password"]').fill('secret_sauce');
    await page.locator('//input[@data-test ="login-button"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Авторизация Негативный кейс', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('//input[@data-test ="username"]').fill('standard_user');
    await page.locator('//input[@data-test ="password"]').fill('wrong_password');
    await page.locator('//input[@data-test ="login-button"]').click();
    await expect(page.locator('//h3[@data-test ="error"]')).toBeEnabled();
    await expect(page.locator('//h3[@data-test ="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });
  
});