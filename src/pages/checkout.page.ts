import { expect, type Locator, type Page } from '@playwright/test';

import { BasePage } from './base.page';
import type { RegistrationUser } from '../types/user';

export class CheckoutPage extends BasePage {
  readonly addressDetailsHeader: Locator;
  readonly reviewOrderHeader: Locator;
  readonly deliveryAddress: Locator;
  readonly billingAddress: Locator;
  readonly commentTextArea: Locator;
  readonly placeOrderLink: Locator;

  constructor(page: Page) {
    super(page);
    this.addressDetailsHeader = page.getByText('Address Details');
    this.reviewOrderHeader = page.getByText('Review Your Order');
    this.deliveryAddress = page.locator('#address_delivery');
    this.billingAddress = page.locator('#address_invoice');
    this.commentTextArea = page.locator('textarea[name="message"]');
    this.placeOrderLink = page.getByRole('link', { name: 'Place Order' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.addressDetailsHeader).toBeVisible();
    await expect(this.reviewOrderHeader).toBeVisible();
  }

  async addComment(comment: string): Promise<void> {
    await this.fill(this.commentTextArea, comment);
  }

  async placeOrder(): Promise<void> {
    await this.click(this.placeOrderLink);
  }

  async expectAddressMatches(user: RegistrationUser): Promise<void> {
    const expectedFullName = `${user.title}. ${user.firstName} ${user.lastName}`;
    const expectedCityStateZip = `${user.city} ${user.state} ${user.zipcode}`;

    await expect(this.deliveryAddress).toContainText(expectedFullName);
    await expect(this.deliveryAddress).toContainText(user.address1);
    await expect(this.deliveryAddress).toContainText(expectedCityStateZip);
    await expect(this.deliveryAddress).toContainText(user.country);
    await expect(this.deliveryAddress).toContainText(user.mobileNumber);

    await expect(this.billingAddress).toContainText(expectedFullName);
    await expect(this.billingAddress).toContainText(user.address1);
    await expect(this.billingAddress).toContainText(expectedCityStateZip);
    await expect(this.billingAddress).toContainText(user.country);
    await expect(this.billingAddress).toContainText(user.mobileNumber);
  }
}
