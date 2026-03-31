import { expect, type Locator, type Page } from '@playwright/test';

import { BasePage } from './base.page';

export class ContactUsPage extends BasePage {
  readonly getInTouchHeader: Locator;
  readonly contactForm: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly uploadFileInput: Locator;
  readonly submitButton: Locator;
  readonly successAlert: Locator;
  readonly contactPageSection: Locator;
  readonly homeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.getInTouchHeader = page.getByRole('heading', { name: 'Get In Touch' });
    this.contactForm = page.locator('form[action="/contact_us"]');
    this.nameInput = page.locator('input[name="name"]');
    this.emailInput = page.locator('input[name="email"]');
    this.subjectInput = page.locator('input[name="subject"]');
    this.messageInput = page.locator('textarea[name="message"]');
    this.uploadFileInput = page.locator('input[name="upload_file"]');
    this.submitButton = page.locator('input[data-qa="submit-button"]');
    this.successAlert = page.locator('#contact-page .status.alert.alert-success');
    this.contactPageSection = page.locator('#contact-page');
    this.homeButton = page.locator('#form-section .btn.btn-success');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.getInTouchHeader).toBeVisible();
  }

  async submitForm(details: {
    name: string;
    email: string;
    subject: string;
    message: string;
    attachmentPath: string;
  }): Promise<void> {
    await this.fill(this.nameInput, details.name);
    await this.fill(this.emailInput, details.email);
    await this.fill(this.subjectInput, details.subject);
    await this.fill(this.messageInput, details.message);
    await this.uploadFileInput.setInputFiles(details.attachmentPath);
    await this.dismissConsentBannerIfPresent();
    await this.page.evaluate(() => {
      window.confirm = () => true;
    });
    await this.click(this.submitButton);
  }

  async expectSuccess(): Promise<void> {
    await expect(this.successAlert).toContainText('Success! Your details have been submitted successfully.');
  }

  async goHome(): Promise<void> {
    await this.click(this.homeButton);

    if (this.page.url().includes('google_vignette')) {
      await this.page.goto('/');
    }
  }
}
