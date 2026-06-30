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
    const SEARCH_TERM = 'top';

    await homePage.open();
    await homePage.expectLoaded();
    await homePage.goToProducts();
    await productsPage.expectLoaded();
    await productsPage.searchFor(SEARCH_TERM);
    await productsPage.expectSearchResultsVisible();

    // The site does full-text search (descriptions, categories), so not every result
    // name will literally contain the search term — just verify results are returned.
    const resultNames = await productsPage.getVisibleProductNames();
    expect(resultNames.length).toBeGreaterThan(0);
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

  test('Search with no results shows empty state', async ({ homePage, productsPage }) => {
    await homePage.open();
    await homePage.expectLoaded();
    await homePage.goToProducts();
    await productsPage.expectLoaded();
    await productsPage.searchFor('xyzzy_no_match_12345');
    await productsPage.expectNoSearchResults();
  });

  test('Product listing price matches product detail page price', async ({
    homePage,
    productDetailsPage,
    productsPage
  }) => {
    await homePage.open();
    await homePage.expectLoaded();
    await homePage.goToProducts();
    await productsPage.expectLoaded();

    const listing = await productsPage.getProductSummary(0);
    await productsPage.openProductDetails(0);
    await productDetailsPage.expectLoaded();

    const detailPrice = await productDetailsPage.getProductPrice();
    expect(detailPrice).toContain(listing.price.replace('Rs. ', ''));
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
