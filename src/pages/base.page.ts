import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { Logger } from '../utils/logger';

export abstract class BasePage {
  protected constructor(protected readonly page: Page) {}

  protected async click(locator: Locator): Promise<void> {
    await this.dismissConsentBannerIfPresent();

    try {
      await locator.click();
    } catch (error) {
      if (error instanceof Error && error.message.includes('fc-consent-root')) {
        Logger.warn('Consent banner blocked click. Removing banner and retrying.');
        await this.removeConsentBanner();
        await locator.click();
        return;
      }

      throw error;
    }
  }

  protected async fill(locator: Locator, value: string): Promise<void> {
    await this.dismissConsentBannerIfPresent();
    await locator.fill(value);
  }

  protected async expectVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  protected async hover(locator: Locator): Promise<void> {
    await this.dismissConsentBannerIfPresent();
    await locator.hover();
  }

  protected async dismissConsentBannerIfPresent(): Promise<void> {
    const consentButton = this.page.locator('div.fc-consent-root button[aria-label="Consent"]');

    try {
      if (await consentButton.isVisible({ timeout: 1_500 })) {
        Logger.info('Dismissing consent banner');
        await consentButton.click();
      }
    } catch {
      await this.removeConsentBanner();
    }
  }

  private async removeConsentBanner(): Promise<void> {
    await this.page
      .locator('.fc-consent-root')
      .evaluateAll((nodes) => nodes.forEach((node) => node.remove()))
      .catch(() => {
        Logger.info('Consent banner not present');
      });
  }
}
