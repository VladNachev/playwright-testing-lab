import { test as base } from '@playwright/test';

import { createPaymentDetails } from '../data/payment.factory';
import { createRegistrationUser } from '../data/user.factory';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { ContactUsPage } from '../pages/contact-us.page';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { ProductDetailsPage } from '../pages/product-details.page';
import { ProductsPage } from '../pages/products.page';
import { SignupPage } from '../pages/signup.page';
import { AuthWorkflow } from '../workflows/auth.workflow';

type AppFixtures = {
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  contactUsPage: ContactUsPage;
  homePage: HomePage;
  loginPage: LoginPage;
  paymentPage: PaymentPage;
  productDetailsPage: ProductDetailsPage;
  productsPage: ProductsPage;
  signupPage: SignupPage;
  authWorkflow: AuthWorkflow;
};

type DataFixtures = {
  paymentDetails: ReturnType<typeof createPaymentDetails>;
  registrationUser: ReturnType<typeof createRegistrationUser>;
  uploadFilePath: string;
};

export const test = base.extend<AppFixtures & DataFixtures>({
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  contactUsPage: async ({ page }, use) => {
    await use(new ContactUsPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },
  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  authWorkflow: async ({ homePage, loginPage, signupPage }, use) => {
    await use(new AuthWorkflow(homePage, loginPage, signupPage));
  },
  registrationUser: async ({}, use) => {
    await use(createRegistrationUser());
  },
  paymentDetails: async ({}, use) => {
    await use(createPaymentDetails());
  },
  uploadFilePath: async ({}, use) => {
    await use('C:\\Users\\nache\\Documents\\VSCode_projects\\pw_automation_framework\\test-data\\files\\contact-message.txt');
  }
});

export { expect } from '@playwright/test';
