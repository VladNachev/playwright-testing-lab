import { test as base } from '@playwright/test';

import { createRegistrationUser } from '../data/user.factory';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { SignupPage } from '../pages/signup.page';
import { AuthWorkflow } from '../workflows/auth.workflow';

type AppFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  signupPage: SignupPage;
  authWorkflow: AuthWorkflow;
};

type DataFixtures = {
  registrationUser: ReturnType<typeof createRegistrationUser>;
};

export const test = base.extend<AppFixtures & DataFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  authWorkflow: async ({ homePage, loginPage, signupPage }, use) => {
    await use(new AuthWorkflow(homePage, loginPage, signupPage));
  },
  registrationUser: async ({}, use) => {
    await use(createRegistrationUser());
  }
});

export { expect } from '@playwright/test';
