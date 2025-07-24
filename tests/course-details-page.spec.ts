import { test, expect } from './fixtures';

test.describe('Course Details page', () => {
  test('has title and rating', {tag: ['@smoke', '@T5c76bbf0']}, async ({ courseDetailsPage }) => {
    await courseDetailsPage.toBeDisplayed();
    await expect(courseDetailsPage.page).toHaveTitle(
      'Quality Assurance (QA) Techniques | Free Online Course | Alison'
    );
  });

  test('search for courses on a specific topic', {tag: ['@smoke', '@T591cec37']}, async ({ courseDetailsPage }) => {
    await expect(courseDetailsPage.page.url()).toContain(`/course/quality-assurance-qa-techniques-and-methodologies`);
  });
});
