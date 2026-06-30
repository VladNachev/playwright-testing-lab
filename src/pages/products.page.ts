import { expect, type Locator, type Page } from '@playwright/test';

import { BasePage } from './base.page';

export interface ProductSummary {
  name: string;
  price: string;
}

export interface ProductLink {
  name: string;
  href: string;
}

export class ProductsPage extends BasePage {
  readonly allProductsHeader: Locator;
  readonly searchedProductsHeader: Locator;
  readonly productCards: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly brandsSidebar: Locator;
  readonly categoriesSidebar: Locator;

  constructor(page: Page) {
    super(page);
    this.allProductsHeader = page.getByRole('heading', { name: 'All Products' });
    this.searchedProductsHeader = page.getByRole('heading', { name: 'Searched Products' });
    this.productCards = page.locator('.features_items .product-image-wrapper');
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.brandsSidebar = page.locator('.brands_products');
    this.categoriesSidebar = page.locator('.left-sidebar');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/products$/);
    await expect(this.allProductsHeader).toBeVisible();
  }

  async expectProductListVisible(): Promise<void> {
    await expect(this.productCards.first()).toBeVisible();
  }

  async getProductSummary(index: number): Promise<ProductSummary> {
    const card = this.productCards.nth(index);

    return {
      name: (await card.locator('.productinfo p').innerText()).trim(),
      price: (await card.locator('.productinfo h2').innerText()).trim()
    };
  }

  async openProductDetails(index: number): Promise<void> {
    const card = this.productCards.nth(index);
    await this.click(card.getByRole('link', { name: 'View Product' }));
  }

  async searchFor(term: string): Promise<void> {
    await this.fill(this.searchInput, term);
    await this.click(this.searchButton);
  }

  async expectSearchResultsVisible(): Promise<void> {
    await expect(this.searchedProductsHeader).toBeVisible();
    await expect(this.productCards.first()).toBeVisible();
  }

  async getVisibleProductNames(): Promise<string[]> {
    return this.productCards.locator('.productinfo p').allInnerTexts();
  }

  async getVisibleProductLinks(limit?: number): Promise<ProductLink[]> {
    const count = limit === undefined ? await this.productCards.count() : limit;
    const products: ProductLink[] = [];

    for (let index = 0; index < count; index += 1) {
      const card = this.productCards.nth(index);
      products.push({
        name: (await card.locator('.productinfo p').innerText()).trim(),
        href: (await card.getByRole('link', { name: 'View Product' }).getAttribute('href')) ?? ''
      });
    }

    return products;
  }
  async expectBrandsVisible(): Promise<void> {
    await expect(this.brandsSidebar).toBeVisible();
  }

  async openBrand(brandName: string): Promise<void> {
    await this.click(this.page.locator('.brands-name a').filter({ hasText: brandName }).first());
  }

  async expectBrandPageVisible(brandName: string): Promise<void> {
    await expect(this.page.getByRole('heading', { name: new RegExp(`Brand - ${brandName} Products`, 'i') }))
      .toBeVisible();
  }

  async expectCategoriesVisible(): Promise<void> {
    await expect(this.categoriesSidebar).toContainText('Category');
  }

  async openCategory(group: 'Women' | 'Men' | 'Kids', subcategory: string): Promise<void> {
    await this.click(this.page.locator(`a[href="#${group}"]`));
    await this.click(this.page.locator(`#${group} a`).filter({ hasText: subcategory }).first());
  }

  async expectCategoryPageVisible(expectedHeading: RegExp): Promise<void> {
    await expect(this.page.locator('.features_items .title.text-center')).toContainText(expectedHeading);
  }

  async expectNoSearchResults(): Promise<void> {
    await expect(this.searchedProductsHeader).toBeVisible();
    await expect(this.productCards).toHaveCount(0);
  }

  async getProductCount(): Promise<number> {
    return this.productCards.count();
  }
}
