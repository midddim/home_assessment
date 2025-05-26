import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "../base-page";

const rootPath = "/";

export class HomePage extends BasePage {
  readonly learnAndGetCertificatesTab: Locator;
  readonly buildYourCareerTab: Locator;
  readonly earnMoneyTab: Locator;
  readonly homeHeaderSearchField: Locator;
  readonly searchTitleQuery: Locator;
  readonly courseTypeFilter: Locator;

  constructor(page: Page) {
    super(page, rootPath);
    this.learnAndGetCertificatesTab= this.page.locator('.tab-nav a[href="/"]');
    this.buildYourCareerTab= this.page.locator('a[href$="/build-your-career"]');
    this.earnMoneyTab= this.page.locator('a[href$="/earn-money"]');
    this.homeHeaderSearchField= this.page.locator('#home-header-search input');
    this.searchTitleQuery= this.page.locator('.top-wrapper h2 .query-search');
    this.courseTypeFilter= this.page.locator('.filter.course-type-filter');
  }

  async toBeDisplayed() {
    await this.header.toBeDisplayed();
    await expect(this.learnAndGetCertificatesTab, 'The Learn and Get Certificates tab should be displayed').toBeVisible();
    await expect(this.buildYourCareerTab, 'The Build Your Career tab should be displayed').toBeVisible();
    await expect(this.earnMoneyTab, 'The Earn Money tab should be displayed').toBeVisible();
    await expect(this.homeHeaderSearchField, 'The Home Search field should be displayed').toBeVisible();
  }

  async searchCoursesBy(searchQuery: string) {
    await this.homeHeaderSearchField.click();
    await this.homeHeaderSearchField.fill(searchQuery);
    await this.homeHeaderSearchField.press('Enter');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async filterCourseTypeBy(type: string) {
    await this.courseTypeFilter.click();
    const searchType: Locator =  this.page.locator(`//*[@id="${type}"]/../label`);
    await searchType.waitFor();
    await searchType.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
