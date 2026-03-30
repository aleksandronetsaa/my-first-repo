class InventoryPage {
    constructor(page) {
        this.page = page;
        this.title = page.locator('.title');
        this.cartButton = page.locator('.shopping_cart_link');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.items = page.locator('.inventory_item');
    }

    async getPageTitle() {
        return await this.title.textContent();
    }

    async sortByPriceHighToLow() {
        // Явное ожидание, что dropdown виден
        await this.sortDropdown.waitFor({ state: 'visible' });
        await this.sortDropdown.selectOption('hilo');
    }

    async addFirstItemToCart() {
        const firstItem = this.items.first();
        const itemName = await firstItem.locator('.inventory_item_name').textContent();
        await firstItem.locator('button').click();
        return itemName;
    }

    async openCart() {
        await this.cartButton.click();
    }
}

module.exports = { InventoryPage };