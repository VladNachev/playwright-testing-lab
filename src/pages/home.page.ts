import { expect, type Locator, type Page } from '@playwright/test';

import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly signupLoginLink: Locator;
  readonly testCasesLink: Locator;
  readonly contactUsLink: Locator;
  readonly loggedInUserLabel: Locator;
  readonly deleteAccountLink: Locator;
  readonly subscriptionHeader: Locator;
  readonly subscriptionEmailInput: Locator;
  readonly subscribeButton: Locator;
  readonly subscriptionSuccessAlert: Locator;
  readonly recommendedItemsHeader: Locator;
  readonly scrollUpButton: Locator;
  readonly heroBannerText: Locator;

  constructor(page: Page) {
    super(page);
    this.productsLink = page.locator('header a[href="/products"]').first();
    this.cartLink = page.locator('header a[href="/view_cart"]').first();
    this.signupLoginLink = page.locator('header a[href="/login"]').first();
    this.testCasesLink = page.locator('header a[href="/test_cases"]').first();
    this.contactUsLink = page.locator('header a[href="/contact_us"]').first();
    this.loggedInUserLabel = page.locator('a').filter({ hasText: 'Logged in as' });
    this.deleteAccountLink = page.getByRole('link', { name: 'Delete Account' });
    this.subscriptionHeader = page.getByRole('heading', { name: 'Subscription' });
    this.subscriptionEmailInput = page.locator('#susbscribe_email');
    this.subscribeButton = page.locator('#subscribe');
    this.subscriptionSuccessAlert = page.locator('.alert-success').filter({
      hasText: 'You have been successfully subscribed!'
    });
    this.recommendedItemsHeader = page.getByRole('heading', { name: /recommended items/i });
    this.scrollUpButton = page.locator('#scrollUp');
    this.heroBannerText = page.locator('#slider-carousel .active h2').filter({
      hasText: 'Full-Fledged practice website for Automation Engineers'
    });
  }

  async open(): Promise<void> {
    await this.page.goto('/');
    await this.dismissConsentBannerIfPresent();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/automationexercise\.com\/?$/);
    await expect(this.page.locator('body')).toContainText('AutomationExercise');
  }

  async goToProducts(): Promise<void> {
    await this.click(this.productsLink);
  }

  async goToCart(): Promise<void> {
    await this.click(this.cartLink);
  }

  async goToSignupLogin(): Promise<void> {
    await this.click(this.signupLoginLink);
  }

  async goToTestCases(): Promise<void> {
    await this.click(this.testCasesLink);
  }

  async goToContactUs(): Promise<void> {
    await this.click(this.contactUsLink);
  }

  async expectLoggedInAs(userName: string): Promise<void> {
    await expect(this.loggedInUserLabel).toContainText(userName);
  }

  async deleteAccount(): Promise<void> {
    await this.click(this.deleteAccountLink);
  }

  async expectNavigatedToTestCasesPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/test_cases$/);
  }

  async scrollToFooter(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async scrollToTop(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, 0));
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

  async expectRecommendedItemsVisible(): Promise<void> {
    await expect(this.recommendedItemsHeader).toBeVisible();
  }

  async addRecommendedItemToCart(index: number): Promise<void> {
    const addToCartButton = this.page.locator('.recommended_items .add-to-cart').nth(index);
    await this.click(addToCartButton);
  }

  async getRecommendedItemName(index: number): Promise<string> {
    return (await this.page.locator('.recommended_items .productinfo p').nth(index).innerText()).trim();
  }

  async clickViewCartFromModal(): Promise<void> {
    await this.click(this.page.getByRole('link', { name: 'View Cart' }));
  }

  async clickContinueShoppingFromModal(): Promise<void> {
    await this.click(this.page.getByRole('button', { name: 'Continue Shopping' }));
  }

  async clickScrollUpArrow(): Promise<void> {
    await this.click(this.scrollUpButton);
  }

  async expectHeroBannerVisible(): Promise<void> {
    await expect(this.heroBannerText).toBeVisible();
  }
}
