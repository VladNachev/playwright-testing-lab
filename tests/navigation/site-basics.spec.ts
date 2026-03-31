import { test } from '../../src/fixtures/test-fixtures';

test.describe('Navigation, contact, subscription, and scroll', () => {
  test('Test Case 6: Contact Us Form', async ({
    contactUsPage,
    homePage,
    registrationUser,
    uploadFilePath
  }) => {
    await homePage.open();
    await homePage.expectLoaded();
    await homePage.goToContactUs();
    await contactUsPage.expectLoaded();
    await contactUsPage.submitForm({
      name: registrationUser.name,
      email: registrationUser.email,
      subject: 'Playwright portfolio contact test',
      message: 'This is a contact form submission executed by Playwright.',
      attachmentPath: uploadFilePath
    });
    await contactUsPage.expectSuccess();
    await contactUsPage.goHome();
    await homePage.expectLoaded();
  });

  test('Test Case 7: Verify Test Cases Page', async ({ homePage }) => {
    await homePage.open();
    await homePage.expectLoaded();
    await homePage.goToTestCases();
    await homePage.expectNavigatedToTestCasesPage();
  });

  test('Test Case 10: Verify Subscription in home page', async ({
    homePage,
    registrationUser
  }) => {
    await homePage.open();
    await homePage.expectLoaded();
    await homePage.scrollToFooter();
    await homePage.expectSubscriptionVisible();
    await homePage.subscribe(registrationUser.email);
    await homePage.expectSubscriptionSuccess();
  });

  test('Test Case 11: Verify Subscription in Cart page', async ({
    cartPage,
    homePage,
    registrationUser
  }) => {
    await homePage.open();
    await homePage.expectLoaded();
    await homePage.goToCart();
    await cartPage.expectLoaded();
    await homePage.scrollToFooter();
    await cartPage.expectSubscriptionVisible();
    await cartPage.subscribe(registrationUser.email);
    await cartPage.expectSubscriptionSuccess();
  });

  test('Test Case 25: Verify Scroll Up using Arrow button and Scroll Down functionality', async ({
    homePage
  }) => {
    await homePage.open();
    await homePage.expectLoaded();
    await homePage.scrollToFooter();
    await homePage.expectSubscriptionVisible();
    await homePage.clickScrollUpArrow();
    await homePage.expectHeroBannerVisible();
  });

  test('Test Case 26: Verify Scroll Up without Arrow button and Scroll Down functionality', async ({
    homePage
  }) => {
    await homePage.open();
    await homePage.expectLoaded();
    await homePage.scrollToFooter();
    await homePage.expectSubscriptionVisible();
    await homePage.scrollToTop();
    await homePage.expectHeroBannerVisible();
  });
});
