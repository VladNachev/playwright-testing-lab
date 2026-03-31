import { expect, type Locator, type Page } from '@playwright/test';

import { BasePage } from './base.page';

export interface CartItem {
  name: string;
  price: string;
  quantity: string;
  total: string;
}

export class CartPage extends BasePage {
  readonly cartTableRows: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly registerLoginLink: Locator;
  readonly subscriptionHeader: Locator;
  readonly subscriptionEmailInput: Locator;
  readonly subscribeButton: Locator;
  readonly subscriptionSuccessAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.cartTableRows = page.locator('#cart_info_table tbody tr');
    this.proceedToCheckoutButton = page.locator('.check_out').filter({ hasText: 'Proceed To Checkout' });
    this.registerLoginLink = page.locator('.modal-body a[href="/login"]');
    this.subscriptionHeader = page.getByRole('heading', { name: 'Subscription' });
    this.subscriptionEmailInput = page.locator('#susbscribe_email');
    this.subscribeButton = page.locator('#subscribe');
    this.subscriptionSuccessAlert = page.locator('.alert-success').filter({
      hasText: 'You have been successfully subscribed!'
    });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/view_cart$/);
  }

  async getItems(): Promise<CartItem[]> {
    const count = await this.cartTableRows.count();
    const items: CartItem[] = [];

    for (let index = 0; index < count; index += 1) {
      const row = this.cartTableRows.nth(index);
      items.push({
        name: (await row.locator('.cart_description a').innerText()).trim(),
        price: (await row.locator('.cart_price p').innerText()).trim(),
        quantity: (await row.locator('.cart_quantity button').innerText()).trim(),
        total: (await row.locator('.cart_total p').innerText()).trim()
      });
    }

    return items;
  }

  async proceedToCheckout(): Promise<void> {
    await this.click(this.proceedToCheckoutButton);
  }

  async clickRegisterLoginFromModal(): Promise<void> {
    await this.click(this.registerLoginLink);
  }

  async removeItem(index: number): Promise<void> {
    await this.click(this.cartTableRows.nth(index).locator('.cart_quantity_delete'));
  }

  async expectCartEmpty(): Promise<void> {
    await expect(this.page.getByText('Cart is empty!')).toBeVisible();
  }

  async expectSubscriptionVisible(): Promise<void> {
    await expect(this.subscriptionHeader).toBeVisible();
  }

  async subscribe(email: string): Promise<void> {
    await this.fill(this.subscriptionEmailInput, email);
    await this.click(this.subscribeButton);
  }

  async expectSubscriptionSuccess(): Promise<void> {
    await expect(this.subscriptionSuccessAlert).toBeVisible();
  }
}
