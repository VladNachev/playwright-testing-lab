import { test, expect } from '../../src/fixtures/test-fixtures';

const ORDER_COMMENT = 'Order placed by the Playwright portfolio framework.';

test.describe('Checkout, order placement, address verification, and invoice', () => {
  const completeOrder = async ({
    checkoutPage,
    paymentDetails,
    paymentPage
  }: {
    checkoutPage: {
      expectLoaded: () => Promise<void>;
      addComment: (comment: string) => Promise<void>;
      placeOrder: () => Promise<void>;
    };
    paymentDetails: {
      nameOnCard: string;
      cardNumber: string;
      cvc: string;
      expiryMonth: string;
      expiryYear: string;
    };
    paymentPage: {
      fillPaymentDetails: (details: {
        nameOnCard: string;
        cardNumber: string;
        cvc: string;
        expiryMonth: string;
        expiryYear: string;
      }) => Promise<void>;
      submitPayment: () => Promise<void>;
      expectOrderPlaced: () => Promise<void>;
    };
  }): Promise<void> => {
    await checkoutPage.expectLoaded();
    await checkoutPage.addComment(ORDER_COMMENT);
    await checkoutPage.placeOrder();
    await paymentPage.fillPaymentDetails(paymentDetails);
    await paymentPage.submitPayment();
    await paymentPage.expectOrderPlaced();
  };

  test('Test Case 14: Place Order: Register while Checkout', async ({
    authWorkflow,
    cartPage,
    checkoutPage,
    homePage,
    paymentDetails,
    paymentPage,
    productDetailsPage,
    productsPage,
    registrationUser
  }) => {
    await homePage.open();
    await homePage.expectLoaded();
    await homePage.goToProducts();
    await productsPage.expectLoaded();
    await productsPage.openProductDetails(0);
    await productDetailsPage.expectLoaded();
    await productDetailsPage.addToCart();
    await homePage.clickViewCartFromModal();
    await cartPage.proceedToCheckout();
    await cartPage.clickRegisterLoginFromModal();
    await authWorkflow.completeRegistrationFromLoginPage(registrationUser);
    await homePage.expectLoggedInAs(registrationUser.name);
    await homePage.goToCart();
    await cartPage.proceedToCheckout();
    await completeOrder({ checkoutPage, paymentDetails, paymentPage });
    await authWorkflow.deleteCurrentUser();
  });

  test('Test Case 15: Place Order: Register before Checkout', async ({
    authWorkflow,
    cartPage,
    checkoutPage,
    homePage,
    paymentDetails,
    paymentPage,
    productDetailsPage,
    productsPage,
    registrationUser
  }) => {
    await authWorkflow.registerUser(registrationUser);
    await homePage.goToProducts();
    await productsPage.expectLoaded();
    await productsPage.openProductDetails(0);
    await productDetailsPage.expectLoaded();
    await productDetailsPage.addToCart();
    await homePage.clickViewCartFromModal();
    await cartPage.proceedToCheckout();
    await completeOrder({ checkoutPage, paymentDetails, paymentPage });
    await authWorkflow.deleteCurrentUser();
  });

  test('Test Case 16: Place Order: Login before Checkout', async ({
    authWorkflow,
    cartPage,
    checkoutPage,
    homePage,
    paymentDetails,
    paymentPage,
    productDetailsPage,
    productsPage,
    registrationUser
  }) => {
    await authWorkflow.registerUser(registrationUser);
    await authWorkflow.logoutUser();
    await authWorkflow.loginFromCurrentPage(registrationUser.email, registrationUser.password);
    await homePage.expectLoggedInAs(registrationUser.name);
    await homePage.goToProducts();
    await productsPage.expectLoaded();
    await productsPage.openProductDetails(0);
    await productDetailsPage.expectLoaded();
    await productDetailsPage.addToCart();
    await homePage.clickViewCartFromModal();
    await cartPage.proceedToCheckout();
    await completeOrder({ checkoutPage, paymentDetails, paymentPage });
    await authWorkflow.deleteCurrentUser();
  });

  test('Test Case 23: Verify address details in checkout page', async ({
    authWorkflow,
    cartPage,
    checkoutPage,
    homePage,
    productDetailsPage,
    productsPage,
    registrationUser
  }) => {
    await authWorkflow.registerUser(registrationUser);
    await homePage.goToProducts();
    await productsPage.expectLoaded();
    await productsPage.openProductDetails(0);
    await productDetailsPage.expectLoaded();
    await productDetailsPage.addToCart();
    await homePage.clickViewCartFromModal();
    await cartPage.proceedToCheckout();
    await checkoutPage.expectLoaded();
    await checkoutPage.expectAddressMatches(registrationUser);
    await authWorkflow.deleteCurrentUser();
  });

  test('Test Case 24: Download Invoice after purchase order', async ({
    authWorkflow,
    cartPage,
    checkoutPage,
    homePage,
    paymentDetails,
    paymentPage,
    productDetailsPage,
    productsPage,
    registrationUser
  }) => {
    await homePage.open();
    await homePage.expectLoaded();
    await homePage.goToProducts();
    await productsPage.expectLoaded();
    await productsPage.openProductDetails(0);
    await productDetailsPage.expectLoaded();
    await productDetailsPage.addToCart();
    await homePage.clickViewCartFromModal();
    await cartPage.proceedToCheckout();
    await cartPage.clickRegisterLoginFromModal();
    await authWorkflow.completeRegistrationFromLoginPage(registrationUser);
    await homePage.goToCart();
    await cartPage.proceedToCheckout();
    await completeOrder({ checkoutPage, paymentDetails, paymentPage });

    const download = await paymentPage.downloadInvoice();
    expect(download.suggestedFilename().toLowerCase()).toContain('invoice');
    expect(await download.path()).not.toBeNull();

    await paymentPage.continue();
    await homePage.expectLoaded();
    await homePage.expectLoggedInAs(registrationUser.name);
    await authWorkflow.deleteCurrentUser();
  });
});
