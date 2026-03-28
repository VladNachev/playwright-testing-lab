import { expect, type Locator, type Page } from '@playwright/test';

import { BasePage } from './base.page';
import { Logger } from '../utils/logger';

export class HomePage extends BasePage {
  readonly signupLoginLink: Locator;
  readonly loggedInUserLabel: Locator;
  readonly deleteAccountLink: Locator;
  readonly consentButton: Locator;

  constructor(page: Page) {
    super(page);
    this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.loggedInUserLabel = page.locator('a').filter({ hasText: 'Logged in as' });
    this.deleteAccountLink = page.getByRole('link', { name: 'Delete Account' });
    this.consentButton = page.locator('div.fc-consent-root button[aria-label="Consent"]');
  }

  async open(): Promise<void> {
    await this.page.goto('/');
    await this.dismissConsentIfPresent();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/automationexercise\.com\/?$/);
    await expect(this.page.locator('body')).toContainText('AutomationExercise');
  }

  async goToSignupLogin(): Promise<void> {
    await this.click(this.signupLoginLink);
  }

  async expectLoggedInAs(userName: string): Promise<void> {
    await expect(this.loggedInUserLabel).toContainText(userName);
  }

  async deleteAccount(): Promise<void> {
    await this.click(this.deleteAccountLink);
  }

  private async dismissConsentIfPresent(): Promise<void> {
    try {
      if (await this.consentButton.isVisible({ timeout: 3_000 })) {
        Logger.info('Dismissing consent banner');
        await this.consentButton.click();
      }
    } catch {
      Logger.info('Consent banner not shown');
    }
  }
}
