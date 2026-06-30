import { expect, type Locator, type Page } from '@playwright/test';

import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly newUserSignupHeader: Locator;
  readonly loginHeader: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly logoutLink: Locator;
  readonly loginErrorMessage: Locator;
  readonly signupErrorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.newUserSignupHeader = page.getByRole('heading', { name: 'New User Signup!' });
    this.loginHeader = page.getByRole('heading', { name: 'Login to your account' });
    this.signupNameInput = page.locator('[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
    this.loginEmailInput = page.locator('[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.loginErrorMessage = page.getByText('Your email or password is incorrect!');
    this.signupErrorMessage = page.getByText('Email Address already exist!');
  }

  async expectSignupVisible(): Promise<void> {
    await expect(this.newUserSignupHeader).toBeVisible();
  }

  async expectLoginVisible(): Promise<void> {
    await expect(this.loginHeader).toBeVisible();
  }

  async signup(name: string, email: string): Promise<void> {
    await this.fill(this.signupNameInput, name);
    await this.fill(this.signupEmailInput, email);
    await this.click(this.signupButton);
  }

  async login(email: string, password: string): Promise<void> {
    await this.fill(this.loginEmailInput, email);
    await this.fill(this.loginPasswordInput, password);
    await this.click(this.loginButton);
  }

  async logout(): Promise<void> {
    await this.click(this.logoutLink);
    await this.page.waitForURL(/\/login$/);
  }

  async expectIncorrectLoginError(): Promise<void> {
    await expect(this.loginErrorMessage).toBeVisible();
  }

  async expectExistingEmailError(): Promise<void> {
    await expect(this.signupErrorMessage).toBeVisible();
  }
}
