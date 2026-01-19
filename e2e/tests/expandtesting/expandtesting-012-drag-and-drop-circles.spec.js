import { test, expect } from '@playwright/test';
import { DragAndDropCirclesPage } from '../../pages/expandtesting/drag-and-drop-circles.page';

const cfg = require('../../utilities/loadEnvHelper');

test.describe("Expand testing #12 - drag and drop circles", () => {

        test.beforeEach(async ({ page }) => {
            const dragAndDropCirclesPage = new DragAndDropCirclesPage(page, cfg);
            await dragAndDropCirclesPage.open();
        });

    test("Verify Red", async ({ page }) => {
        const dragAndDropCirclesPage = new DragAndDropCirclesPage(page, cfg);
        await dragAndDropCirclesPage.dragRed();
        await expect(dragAndDropCirclesPage.colorStripe(1)).toHaveClass("red");
    });

    test("Verify Green", async ({ page }) => {
        const dragAndDropCirclesPage = new DragAndDropCirclesPage(page, cfg);
        await dragAndDropCirclesPage.dragGreen();
        await expect(dragAndDropCirclesPage.colorStripe(1)).toHaveClass("green");
    });

    test("Verify Blue", async ({ page }) => {
        const dragAndDropCirclesPage = new DragAndDropCirclesPage(page, cfg);
        await dragAndDropCirclesPage.dragBlue();
        await expect(dragAndDropCirclesPage.colorStripe(1)).toHaveClass("blue");
    });

});