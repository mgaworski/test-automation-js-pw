import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { GorestClient } from '../../../../clients/gorest/gorestClient.js';
import { compare_articles, compare_users } from '../../../../clients/gorest/gorestClient.js';

const cfg = require('../../../../../utilities/loadEnvHelper.js');

test.describe.serial('GoRest API V1 CRUD: Posts', () => {

    const version = "V1";

    let authorId = 0;
    let articleId = 0;
    let article = {}
    article.title = faker.lorem.sentence();
    article.body = faker.lorem.paragraph();
    article.user_id = 0;

    test('CRUD Post - #0 - Preparation (V1) - getting existing user ID as author', async ({ request }) => {
        const gorestClient = new GorestClient(request, cfg, version, process.env.GOREST_TOKEN);
        const response = await gorestClient.list_users();
        expect(response.ok()).toBeTruthy();
        const users = (await response.json()).data;
        await expect(users.length).toBeGreaterThan(0);
        const first_user = users[0];
        authorId = first_user.id;
    });

    test('CRUD Post - #1 - CREATE new Post (V1)', async ({ request }) => {
        const gorestClient = new GorestClient(request, cfg, version, process.env.GOREST_TOKEN);
        article.user_id = authorId;
        const response = await gorestClient.create_post(article);
        expect(response.ok()).toBeTruthy();
        const newArticle = (await response.json()).data;
        expect(compare_articles(newArticle, article)).toBeTruthy();
        articleId = newArticle.id;
    });

    test('CRUD Post - #2 - READ previously created Post (V1)', async ({ request }) => {
        const gorestClient = new GorestClient(request, cfg, version, process.env.GOREST_TOKEN);
        const response = await gorestClient.get_post(articleId);
        expect(response.ok()).toBeTruthy();
        const body = (await response.json()).data;
        expect(compare_articles(body, article)).toBeTruthy();
    });

    test('CRUD Post - #3 - UPDATE previously created Post (V1)', async ({ request }) => {
        const newText = faker.lorem.paragraphs(2);
        let modified = { ...article };
        modified.body = newText;
        const gorestClient = new GorestClient(request, cfg, version, process.env.GOREST_TOKEN);
        const responseUpdate = await gorestClient.update_post(articleId, modified);
        expect(responseUpdate.ok()).toBeTruthy();
        const responseGet = await gorestClient.get_post(articleId);
        expect(responseGet.ok()).toBeTruthy();
        const body = (await responseGet.json()).data;
        expect(compare_users(body, modified)).toBeTruthy();
    });

    test('CRUD Post - #4 - DELETE previously created Post (V1)', async ({ request }) => {
        const gorestClient = new GorestClient(request, cfg, version, process.env.GOREST_TOKEN);
        const responseDelete = await gorestClient.delete_post(articleId);
        expect(responseDelete.ok()).toBeTruthy();
        const responseGet = await gorestClient.get_post(articleId);
        expect(responseGet.ok()).not.toBeTruthy();
    });

});