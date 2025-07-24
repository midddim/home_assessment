import { test, expect } from './fixtures';

test.describe("Home page", () => {
  test('has title @8ed45828', {tag: '@smoke'}, async ({ homePage, page }) => {
    await homePage.toBeDisplayed();

    await expect(page).toHaveTitle('Alison | Free Online Courses & Online Learning'); // TODO Replace text with variable
  });

  test('search for courses on a specific topic @2a2c9afc', {tag: '@smoke'}, async ({ homePage, page }) => {
    const searchQuery: string = 'javascript';

    await homePage.searchCoursesBy(searchQuery);

    await expect(homePage.searchTitleQuery, 'Search query should be displayed in a title').toHaveText(searchQuery);
    expect(page.url(), "URL should end with search query").toContain(`/courses?query=${searchQuery}`);
  });

  test('search for courses on a specific topic with additional params @5df7b779', {tag: '@smoke'}, async ({ homePage, page }) => {
    const searchQuery: string = 'javascript';
    const type: string = 'certificate';

    await homePage.searchCoursesBy(searchQuery);
    await homePage.filterCourseTypeBy(type);

    expect(page.url(), "URL should end with search query").toContain(`/courses?type=${type}&query=${searchQuery}`);
  });

  test('search for courses with "No Results Found" result @a0e65b8d', {tag: '@smoke'}, async ({ homePage, page }) => {
    const searchQuery: string = '12333221122311';

    await homePage.searchCoursesBy(searchQuery);

    await expect(page.getByText('No Results Found')).toBeVisible();
  });
});
