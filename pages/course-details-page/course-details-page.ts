import {expect, type Locator, type Page} from "@playwright/test";
import {BasePage} from "../base-page";

const rootPath = `/course/{id}`;

export class CourseDetailsPage extends BasePage {
  readonly cardTitle: Locator;
  readonly cardRating: Locator;
  readonly infoTitle: Locator;
  readonly reviewsRating: Locator;

  constructor(page: Page, id: string) {
    super(page, rootPath.replace("{id}", id));
    this.cardTitle = this.page.locator('.l-card .course-title');
    this.cardRating = this.page.locator('.l-card .l-rating.enrol-to-rate');
    this.infoTitle = this.page.locator('.l-info .course-title');
    this.reviewsRating = this.page.locator('#reviews-section .l-rating.enrol-to-rate');
  }

  async toBeDisplayed() {
    await this.header.toBeDisplayed();
    await expect(this.cardTitle, 'The Card Title should be displayed').toBeVisible();
    await expect(this.cardRating, 'The Card Rating should be displayed').toBeVisible();
    await expect(this.infoTitle, 'The Info Title should be displayed').toBeVisible();
    await expect(this.reviewsRating, 'The Reviews Rating should be displayed').toBeVisible();
  }
}
