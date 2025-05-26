import { test, expect } from '@playwright/test';
import { HomePage } from "../pages/home-page/home-page";

test.describe("Home page", () => {
  let homePage: HomePage;

  test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    await homePage.open();
  });

  test.afterEach(async ({page}) => {
    await page.close();
  });

  test('has title', {tag: '@smoke'}, async ({ page }) => {
    await homePage.toBeDisplayed();

    await expect(page).toHaveTitle('Alison | Free Online Courses & Online Learning'); // TODO Replace text with variable
  });

  test('search for courses on a specific topic', {tag: '@smoke'}, async ({ page }) => {
    const searchQuery: string = 'javascript';

    await homePage.searchCoursesBy(searchQuery);

    await expect(homePage.searchTitleQuery, 'Search query should be displayed in a title').toHaveText(searchQuery);
    expect(page.url(), "URL should end with search query").toContain(`/courses?query=${searchQuery}`);
  });

  test('search for courses on a specific topic with additional params', {tag: '@smoke'}, async ({ page }) => {
    const searchQuery: string = 'javascript';
    const type: string = 'certificate';

    await homePage.searchCoursesBy(searchQuery);
    await homePage.filterCourseTypeBy(type);

    expect(page.url(), "URL should end with search query").toContain(`/courses?type=${type}&query=${searchQuery}`);
  });

  test('search for courses with "No Results Found" result', {tag: '@smoke'}, async ({ page }) => {
    const searchQuery: string = '12333221122311';

    await homePage.searchCoursesBy(searchQuery);

    await expect(page.getByText('No Results Found')).toBeVisible();
  });
});
