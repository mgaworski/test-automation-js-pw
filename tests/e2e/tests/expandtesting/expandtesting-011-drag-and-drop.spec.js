import { test, expect } from '@playwright/test';
import { DragAndDropPage } from '../../pages/expandtesting/drag-and-drop.page';

const cfg = require('../../../utilities/loadEnvHelper');

test.describe("Expand testing #11 - drag and drop", () => {

    test("Verify Box A can be dragged after Box B.", async ({ page }) => {
        const dragAndDropPage = new DragAndDropPage(page, cfg);
        await dragAndDropPage.open();
        await expect(dragAndDropPage.leftBox).toHaveText("A");
        await expect(dragAndDropPage.rightBox).toHaveText("B");
        await dragAndDropPage.dragLeftToRight();
        await expect(dragAndDropPage.leftBox).toHaveText("B");
        await expect(dragAndDropPage.rightBox).toHaveText("A");
    });

});