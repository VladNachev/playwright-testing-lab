import type { TestInfo } from '@playwright/test';

import { attachJson } from '../utils/evidence.util';
import { Logger } from '../utils/logger';
import type { RegistrationUser } from '../types/user';
import type { HomePage } from '../pages/home.page';
import type { LoginPage } from '../pages/login.page';
import type { SignupPage } from '../pages/signup.page';

export class AuthWorkflow {
  constructor(
    private readonly homePage: HomePage,
    private readonly loginPage: LoginPage,
    private readonly signupPage: SignupPage
  ) {}

  async registerUser(user: RegistrationUser, testInfo?: TestInfo): Promise<void> {
    Logger.info(`Registering user ${user.email}`);

    if (testInfo) {
      await attachJson(testInfo, 'registration-user', user);
    }

    await this.homePage.open();
    await this.homePage.expectLoaded();
    await this.homePage.goToSignupLogin();
    await this.completeRegistrationFromLoginPage(user);
    await this.homePage.expectLoggedInAs(user.name);
  }

  async loginUser(email: string, password: string): Promise<void> {
    Logger.info(`Logging in user ${email}`);
    await this.homePage.open();
    await this.homePage.expectLoaded();
    await this.homePage.goToSignupLogin();
    await this.loginPage.expectLoginVisible();
    await this.loginPage.login(email, password);
  }

  async loginFromCurrentPage(email: string, password: string): Promise<void> {
    Logger.info(`Logging in from current page with ${email}`);
    await this.loginPage.expectLoginVisible();
    await this.loginPage.login(email, password);
  }

  async logoutUser(): Promise<void> {
    await this.loginPage.logout();
    await this.loginPage.expectLoginVisible();
  }

  async deleteCurrentUser(): Promise<void> {
    await this.homePage.deleteAccount();
    await this.signupPage.expectAccountDeletedVisible();
    await this.signupPage.continue();
  }

  async completeRegistrationFromLoginPage(user: RegistrationUser): Promise<void> {
    await this.loginPage.expectSignupVisible();
    await this.loginPage.signup(user.name, user.email);
    await this.signupPage.expectEnterAccountInformationVisible();
    await this.signupPage.fillRegistrationForm(user);
    await this.signupPage.submitCreateAccount();
    await this.signupPage.expectAccountCreatedVisible();
    await this.signupPage.continue();
  }
}
