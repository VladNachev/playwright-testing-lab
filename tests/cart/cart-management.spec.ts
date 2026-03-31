import { test, expect } from '../../src/fixtures/test-fixtures';
import type { Page } from '@playwright/test';

import type { HomePage } from '../../src/pages/home.page';
import type { ProductDetailsPage } from '../../src/pages/product-details.page';
import type { ProductLink } from '../../src/pages/products.page';

const addProductsToCartFromDetailPages = async ({
  homePage,
  page,
  productDetailsPage,
  products
}: {
  homePage: HomePage;
  page: Page;
  productDetailsPage: ProductDetailsPage;
  products: ProductLink[];
}): Promise<string[]> => {
  for (const [index, product] of products.entries()) {
    await page.goto(product.href);
    await productDetailsPage.expectLoaded();
    await productDetailsPage.addToCart();

    if (index === products.length - 1) {
      await homePage.clickViewCartFromModal();
    } else {
      await homePage.clickContinueShoppingFromModal();
    }
  }

  return products.map((product) => product.name);
};

test.describe('Cart and quantity management', () => {
  test('Test Case 12: Add Products in Cart', async ({
    cartPage,
    homePage,
    page,
    productDetailsPage,
    productsPage
  }) => {
    await homePage.open();
    await homePage.expectLoaded();
    await homePage.goToProducts();
    await productsPage.expectLoaded();

    const firstProduct = await productsPage.getProductSummary(0);
    const secondProduct = await productsPage.getProductSummary(1);
    const [, secondProductLink] = await productsPage.getVisibleProductLinks(2);

    await productsPage.openProductDetails(0);
    await productDetailsPage.expectLoaded();
    await productDetailsPage.addToCart();
    await homePage.clickContinueShoppingFromModal();
    await page.goto(secondProductLink.href);
    await productDetailsPage.expectLoaded();
    await productDetailsPage.addToCart();
    await homePage.clickViewCartFromModal();

    const cartItems = await cartPage.getItems();
    expect(cartItems).toEqual(
      expect.arrayContaining([
        {
          name: firstProduct.name,
          price: firstProduct.price,
          quantity: '1',
          total: firstProduct.price
        },
        {
          name: secondProduct.name,
          price: secondProduct.price,
          quantity: '1',
          total: secondProduct.price
        }
      ])
    );
  });

  test('Test Case 13: Verify Product quantity in Cart', async ({
    cartPage,
    homePage,
    productDetailsPage,
    productsPage
  }) => {
    await homePage.open();
    await homePage.expectLoaded();
    await homePage.goToProducts();
    await productsPage.expectLoaded();
    await productsPage.openProductDetails(0);
    await productDetailsPage.expectLoaded();
    await productDetailsPage.setQuantity(4);
    await productDetailsPage.addToCart();
    await homePage.clickViewCartFromModal();

    const [cartItem] = await cartPage.getItems();
    expect(cartItem.quantity).toBe('4');
  });

  test('Test Case 17: Remove Products From Cart', async ({
    cartPage,
    homePage,
    productDetailsPage,
    productsPage
  }) => {
    await homePage.open();
    await homePage.expectLoaded();
    await homePage.goToProducts();
    await productsPage.expectLoaded();
    await productsPage.openProductDetails(0);
    await productDetailsPage.expectLoaded();
    await productDetailsPage.addToCart();
    await homePage.clickViewCartFromModal();
    await cartPage.removeItem(0);
    await cartPage.expectCartEmpty();
  });

  test('Test Case 20: Search Products and Verify Cart After Login', async ({
    authWorkflow,
    cartPage,
    homePage,
    page,
    productDetailsPage,
    productsPage,
    registrationUser
  }) => {
    await authWorkflow.registerUser(registrationUser);
    await authWorkflow.logoutUser();
    await homePage.goToProducts();
    await productsPage.expectLoaded();
    await productsPage.searchFor('jean');
    await productsPage.expectSearchResultsVisible();

    const searchedProducts = await productsPage.getVisibleProductLinks();
    const searchedProductNames = await addProductsToCartFromDetailPages({
      homePage,
      page,
      productDetailsPage,
      products: searchedProducts
    });
    const cartItemsBeforeLogin = await cartPage.getItems();
    expect(cartItemsBeforeLogin.map((item) => item.name)).toEqual(searchedProductNames);

    await homePage.goToSignupLogin();
    await authWorkflow.loginFromCurrentPage(registrationUser.email, registrationUser.password);
    await homePage.goToCart();

    const cartItemsAfterLogin = await cartPage.getItems();
    expect(cartItemsAfterLogin.map((item) => item.name)).toEqual(searchedProductNames);

    await authWorkflow.deleteCurrentUser();
  });

  test('Test Case 22: Add to cart from Recommended items', async ({
    cartPage,
    homePage
  }) => {
    await homePage.open();
    await homePage.expectLoaded();
    await homePage.scrollToFooter();
    await homePage.expectRecommendedItemsVisible();
    const recommendedItemName = await homePage.getRecommendedItemName(0);
    await homePage.addRecommendedItemToCart(0);
    await homePage.clickViewCartFromModal();

    const cartItems = await cartPage.getItems();
    expect(cartItems.map((item) => item.name)).toContain(recommendedItemName);
  });
});
