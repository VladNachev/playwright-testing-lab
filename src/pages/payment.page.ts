import { expect, type Download, type Locator, type Page } from '@playwright/test';

import { BasePage } from './base.page';

export interface PaymentDetails {
  nameOnCard: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
}

export class PaymentPage extends BasePage {
  readonly nameOnCardInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cvcInput: Locator;
  readonly expiryMonthInput: Locator;
  readonly expiryYearInput: Locator;
  readonly payButton: Locator;
  readonly orderPlacedMessage: Locator;
  readonly downloadInvoiceLink: Locator;
  readonly continueLink: Locator;

  constructor(page: Page) {
    super(page);
    this.nameOnCardInput = page.locator('[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('[data-qa="card-number"]');
    this.cvcInput = page.locator('[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('[data-qa="expiry-year"]');
    this.payButton = page.locator('[data-qa="pay-button"]');
    this.orderPlacedMessage = page.locator('[data-qa="order-placed"]');
    this.downloadInvoiceLink = page.getByRole('link', { name: 'Download Invoice' });
    this.continueLink = this.page.getByRole('link', { name: 'Continue' });
  }

  async fillPaymentDetails(details: PaymentDetails): Promise<void> {
    await this.fill(this.nameOnCardInput, details.nameOnCard);
    await this.fill(this.cardNumberInput, details.cardNumber);
    await this.fill(this.cvcInput, details.cvc);
    await this.fill(this.expiryMonthInput, details.expiryMonth);
    await this.fill(this.expiryYearInput, details.expiryYear);
  }

  async submitPayment(): Promise<void> {
    await this.click(this.payButton);
  }

  async expectOrderPlaced(): Promise<void> {
    await expect(this.orderPlacedMessage).toContainText('Order Placed!');
  }

  async downloadInvoice(): Promise<Download> {
    const downloadPromise = this.page.waitForEvent('download');
    await this.click(this.downloadInvoiceLink);
    return downloadPromise;
  }

  async continue(): Promise<void> {
    await this.click(this.continueLink);
  }
}
