class CheckoutCompletePage {
    constructor(page) {
        this.page = page;
        this.message = page.locator('.complete-header');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }

    async getCompletionMessage() {
        return await this.message.textContent();
    }
}

module.exports = { CheckoutCompletePage };