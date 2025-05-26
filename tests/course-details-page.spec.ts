import { test, expect } from '@playwright/test';
import { CourseDetailsPage } from "../pages/course-details-page/course-details-page"

test.describe("Course Details page", () => {
  let courseDetailsPage: CourseDetailsPage;
  const courseId: string = 'quality-assurance-qa-techniques-and-methodologies';

  test.beforeEach(async ({page}) => {
    courseDetailsPage = new CourseDetailsPage(page, courseId);
    await courseDetailsPage.open();
  });

  test.afterEach(async ({page}) => {
    await page.close();
  });

  test.setTimeout(60000);
  test('has title and rating', {tag: '@smoke'}, async ({ page }) => {
    await courseDetailsPage.toBeDisplayed();

    await expect(page).toHaveTitle('Quality Assurance (QA) Techniques | Free Online Course | Alison'); // TODO Replace text with variable
  });

  test.setTimeout(60000);
  test('search for courses on a specific topic', {tag: '@smoke'}, async ({ page }) => {
    expect(page.url(), "URL should end with search query").toContain(`/course/${courseId}`);
  });
});
