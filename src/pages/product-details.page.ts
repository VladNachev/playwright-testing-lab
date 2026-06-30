import { expect, type Locator, type Page } from '@playwright/test';

import { BasePage } from './base.page';

export class ProductDetailsPage extends BasePage {
  readonly productName: Locator;
  readonly productInformation: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly reviewNameInput: Locator;
  readonly reviewEmailInput: Locator;
  readonly reviewTextArea: Locator;
  readonly reviewSubmitButton: Locator;
  readonly reviewSuccessMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator('.product-information h2');
    this.productInformation = page.locator('.product-information');
    this.quantityInput = page.locator('#quantity');
    this.addToCartButton = page.getByRole('button', { name: /Add to cart/i });
    this.reviewNameInput = page.locator('#name');
    this.reviewEmailInput = page.locator('#email');
    this.reviewTextArea = page.locator('#review');
    this.reviewSubmitButton = page.locator('#button-review');
    this.reviewSuccessMessage = page.locator('.alert-success span');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.productName).toBeVisible();
  }

  async expectProductDetailsVisible(): Promise<void> {
    await expect(this.productInformation).toContainText(/Category:/);
    await expect(this.productInformation).toContainText(/Rs\./);
    await expect(this.productInformation).toContainText(/Availability:/);
    await expect(this.productInformation).toContainText(/Condition:/);
    await expect(this.productInformation).toContainText(/Brand:/);
  }

  async setQuantity(quantity: number): Promise<void> {
    await this.fill(this.quantityInput, quantity.toString());
  }

  async addToCart(): Promise<void> {
    await this.click(this.addToCartButton);
  }

  async submitReview(name: string, email: string, review: string): Promise<void> {
    await this.fill(this.reviewNameInput, name);
    await this.fill(this.reviewEmailInput, email);
    await this.fill(this.reviewTextArea, review);
    await this.click(this.reviewSubmitButton);
  }

  async expectReviewSuccess(): Promise<void> {
    await expect(this.reviewSuccessMessage).toContainText('Thank you for your review.');
  }

  async getProductName(): Promise<string> {
    return (await this.productName.innerText()).trim();
  }

  async getProductPrice(): Promise<string> {
    return (await this.page.locator('.product-information span span').innerText()).trim();
  }
}
