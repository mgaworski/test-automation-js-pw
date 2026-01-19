import { test, expect } from '@playwright/test';
import { RadioButtonsPage } from '../../pages/expandtesting/radio-buttons.page.js';

const cfg = require('../../utilities/loadEnvHelper.js');

test.describe('Expand testing #10 - radio buttons', () => {

    test.beforeEach(async ({ page }) => {
        const radioButtonsPage = new RadioButtonsPage(page, cfg);
        await radioButtonsPage.open();
    });

    const activeColors = [
        { color: "blue" },
        { color: "red" },
        { color: "yellow" },
        { color: "black" }
    ];

    activeColors.forEach(({ color }) => {
        test(`Select your favorite color, active buttons change color - ${color}`, async ({ page }) => {
            const radioButtonsPage = new RadioButtonsPage(page, cfg);
            await radioButtonsPage.pickColor(color);
            await expect(radioButtonsPage.colorRadioButton(color)).toBeChecked();
        });
    });

    const inactiveColors = [
        { color: "green" }
    ];

    inactiveColors.forEach(({ color }) => {
        test(`Select your favorite color, inactive buttons does not change color - ${color}`, async ({ page }) => {
            const radioButtonsPage = new RadioButtonsPage(page, cfg);
            await radioButtonsPage.pickColor(color);
            await expect(radioButtonsPage.colorRadioButton(color)).not.toBeChecked();
        });
    });

    const sports = [
        { sport: "Basketball" },
        { sport: "Football" },
        { sport: "Tennis" }
    ];

    sports.forEach(({ sport }) => {
        test(`Select your favorite sport, active buttons change sport - ${sport}`, async ({ page }) => {
            const radioButtonsPage = new RadioButtonsPage(page, cfg);
            await radioButtonsPage.pickSport(sport);
            await expect(radioButtonsPage.sportRadioButton(sport)).toBeChecked();
        });
    });

    test("Changing buttons in color group does not change selection in sports group", async ({ page }) => {
        const radioButtonsPage = new RadioButtonsPage(page, cfg);
        await radioButtonsPage.pickColor("yellow");
        await expect(radioButtonsPage.sportRadioButton("Tennis")).toBeChecked();
    });

    test("Changing buttons in sports group does not change selection in colors group", async ({ page }) => {
        const radioButtonsPage = new RadioButtonsPage(page, cfg);
        await radioButtonsPage.pickSport("Football");
        await expect(radioButtonsPage.colorRadioButton("blue")).toBeChecked();
    });

});