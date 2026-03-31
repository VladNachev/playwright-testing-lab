import { test, expect } from '../../src/fixtures/test-fixtures';

test.describe('Products, categories, brands, and reviews', () => {
  test('Test Case 8: Verify All Products and product detail page', async ({
    homePage,
    productDetailsPage,
    productsPage
  }) => {
    await homePage.open();
    await homePage.expectLoaded();
    await homePage.goToProducts();
    await productsPage.expectLoaded();
    await productsPage.expectProductListVisible();
    await productsPage.openProductDetails(0);
    await productDetailsPage.expectLoaded();
    await productDetailsPage.expectProductDetailsVisible();
  });

  test('Test Case 9: Search Product', async ({ homePage, productsPage }) => {
    await homePage.open();
    await homePage.expectLoaded();
    await homePage.goToProducts();
    await productsPage.expectLoaded();
    await productsPage.searchFor('jean');
    await productsPage.expectSearchResultsVisible();
    const productNames = await productsPage.getVisibleProductNames();

    expect(productNames.length).toBeGreaterThan(0);
    for (const name of productNames) {
      expect(name.toLowerCase()).toContain('jean');
    }
  });

  test('Test Case 18: View Category Products', async ({ homePage, productsPage }) => {
    await homePage.open();
    await homePage.expectLoaded();
    await homePage.goToProducts();
    await productsPage.expectLoaded();
    await productsPage.expectCategoriesVisible();
    await productsPage.openCategory('Women', 'Tops');
    await productsPage.expectCategoryPageVisible(/Women - Tops Products/i);
    await productsPage.openCategory('Men', 'Tshirts');
    await productsPage.expectCategoryPageVisible(/Men - Tshirts Products/i);
  });

  test('Test Case 19: View Brand Products', async ({ homePage, productsPage }) => {
    await homePage.open();
    await homePage.expectLoaded();
    await homePage.goToProducts();
    await productsPage.expectLoaded();
    await productsPage.expectBrandsVisible();
    await productsPage.openBrand('Polo');
    await productsPage.expectBrandPageVisible('Polo');
    await productsPage.openBrand('H&M');
    await productsPage.expectBrandPageVisible('H&M');
  });

  test('Test Case 21: Add review on product', async ({
    homePage,
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
    await productDetailsPage.submitReview(
      registrationUser.name,
      registrationUser.email,
      'This product detail page was validated with Playwright and TypeScript.'
    );
    await productDetailsPage.expectReviewSuccess();
  });
});
