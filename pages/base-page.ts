import { Locator, Page} from "@playwright/test";
import {Header} from "./components/header";

export class BasePage {
  readonly page: Page;
  readonly header: Header;
  readonly learnAndGetCertificatesTab: Locator;
  readonly buildYourCareerTab: Locator;
  readonly earnMoneyTab: Locator;
  readonly homeHeaderSearchField: Locator;
  private readonly path;

  constructor(page: Page, path: string) {
    this.path = path;
    this.page = page;
    this.header = new Header(page);
  }

  async open() {
    if (!this.path) {
      throw new Error("Initializing a page object with a root path");
    }
    await this.page.goto(this.path, {
      waitUntil: 'domcontentloaded',
    });
  }
}
