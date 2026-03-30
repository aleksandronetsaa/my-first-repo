const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutStepOnePage } = require('../pages/CheckoutStepOnePage');
const { CheckoutStepTwoPage } = require('../pages/CheckoutStepTwoPage');
const { CheckoutCompletePage } = require('../pages/CheckoutCompletePage');

test('E2E покупка товара', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutStepOne = new CheckoutStepOnePage(page);
  const checkoutStepTwo = new CheckoutStepTwoPage(page);
  const checkoutComplete = new CheckoutCompletePage(page);

  // 1. Открыть страницу логина
  await loginPage.open();

  // 2. Логин
  await loginPage.login('standard_user', 'secret_sauce');

  // 3. Ожидание страницы после логина
  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator('.title')).toHaveText('Products');

  // 4. Сортировка и добавление товара
  await inventoryPage.sortByPriceHighToLow();
  const addedItem = await inventoryPage.addFirstItemToCart();

  // 5. Переход в корзину
  await inventoryPage.openCart();

  // 6. Проверка товара
  const cartItem = await cartPage.getItemName();
  expect(cartItem).toBe(addedItem);

  // 7. Checkout
  await cartPage.goToCheckout();

  // 8. Ввод данных
  await checkoutStepOne.fillUserInfo('Test', 'User', '12345');

  // 9. Завершение покупки
  await checkoutStepTwo.finishCheckout();

  // 10. Проверка успешного заказ
  const message = await checkoutComplete.getCompletionMessage();
  await expect(message).toContain('Thank you for your order!');
});