import { test, expect } from '@playwright/test';
import { Faker, faker } from '@faker-js/faker';
import { GorestClient } from '../../../clients/gorest/gorestClient.js';
import { compare_comments } from '../../../../utilities/gorestClientHelper.js';

const cfg = require('../../../../utilities/loadEnvHelper.js');

test.describe.serial('GoRest API V2 CRUD: Posts', () => {

    const version = "V2";

    let articleId = 0;
    let commentId = 0;
    let comment = {}
    comment.name = faker.person.fullName();
    comment.email = faker.internet.email();
    comment.body = faker.lorem.paragraph();


    test('CRUD Comment - #0 - Preparation (v2) - getting existing post ID as parent', async ({ request }) => {
        const gorestClient = new GorestClient(request, cfg, version, process.env.GOREST_TOKEN);
        const response = await gorestClient.list_posts();
        expect(response.ok()).toBeTruthy();
        const posts = await response.json();
        await expect(posts.length).toBeGreaterThan(0);
        const first_post = posts[0];
        articleId = first_post.id;
    });

    test('CRUD Comment - #1 - CREATE new Comment (v2)', async ({ request }) => {
        const gorestClient = new GorestClient(request, cfg, version, process.env.GOREST_TOKEN);
        comment.post_id = articleId;
        const response = await gorestClient.create_comment(comment);
        expect(response.ok()).toBeTruthy();
        const newComment = await response.json();
        expect(compare_comments(newComment, comment)).toBeTruthy();
        commentId = newComment.id;
    });

    test('CRUD Comment - #2 - READ previously created Comment (v2)', async ({ request }) => {
        const gorestClient = new GorestClient(request, cfg, version, process.env.GOREST_TOKEN);
        const response = await gorestClient.get_comment(commentId);
        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        expect(compare_comments(body, comment)).toBeTruthy();
    });

    test('CRUD Comment - #3 - UPDATE previously created Comment (v2)', async ({ request }) => {
        const newText = faker.lorem.paragraphs(2);
        let modified = { ...comment };
        modified.body = newText;
        const gorestClient = new GorestClient(request, cfg, version, process.env.GOREST_TOKEN);
        const responseUpdate = await gorestClient.update_comment(commentId, modified);
        expect(responseUpdate.ok()).toBeTruthy();
        const responseGet = await gorestClient.get_comment(commentId);
        expect(responseGet.ok()).toBeTruthy();
        const body = await responseGet.json();
        expect(compare_comments(body, modified)).toBeTruthy();
    });

    test('CRUD Comment - #4 - DELETE previously created Comment (v2)', async ({ request }) => {
        const gorestClient = new GorestClient(request, cfg, version, process.env.GOREST_TOKEN);
        const responseDelete = await gorestClient.delete_comment(commentId);
        expect(responseDelete.ok()).toBeTruthy();
        const responseGet = await gorestClient.get_comment(commentId);
        expect(responseGet.ok()).not.toBeTruthy();
    });

});