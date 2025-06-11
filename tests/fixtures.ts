import { test as base } from '@playwright/test';
import { HomePage } from "../pages/home-page/home-page";
import { CourseDetailsPage } from '../pages/course-details-page/course-details-page';

type UIFixtures = {
    homePage: HomePage;
    courseDetailsPage: CourseDetailsPage;
};

export const test = base.extend<UIFixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.open();
        await use(homePage);
    },
    courseDetailsPage: async ({ page }, use) => {
        const courseId = 'quality-assurance-qa-techniques-and-methodologies';
        const courseDetailsPage = new CourseDetailsPage(page, courseId);
        await courseDetailsPage.open();
        await use(courseDetailsPage);
    }
});

export { expect } from '@playwright/test';
