import {expect, type Locator, type Page} from "@playwright/test";

export class Header {
  readonly page: Page;
  readonly mainLogo: Locator;
  readonly searchField: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainLogo = this.page.locator('#alison_logo');
    this.searchField = this.page.locator('.search-container input');
    this.searchButton = this.page.locator('.search-container #search_icon');
  }

  async toBeDisplayed() {
    await expect(this.mainLogo, 'The main logo should be displayed').toBeVisible();
    await expect(this.searchField, 'The search field should be displayed').toBeVisible();
    await expect(this.searchButton, 'The search button should be displayed').toBeVisible();
  }
}
