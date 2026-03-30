class CartPage {
    constructor(page) {
        this.page = page;
        this.items = page.locator('.inventory_item_name');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    }

    async getItemName() {
        return await this.items.first().textContent();
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }
}

module.exports = { CartPage };