import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { GorestClient } from '../../../../clients/gorest/gorestClient.js';
import { compare_users, copy_user } from '../../../../clients/gorest/gorestClient.js';

const cfg = require('../../../../../utilities/loadEnvHelper.js');

test.describe.serial('GoRest API V2 CRUD: User', () => {

    const version = "V2";

    let userId = 0;
    let user = {}
    user.gender = faker.helpers.arrayElement(['male', 'female']);
    user.name = faker.person.fullName({ sex: user.gender });
    user.email = faker.internet.email();

    user.status = "active";

    test('CRUD User - #1 - CREATE new User (v2)', async ({ request }) => {
        const gorestClient = new GorestClient(request, cfg, version, process.env.GOREST_TOKEN);
        const response = await gorestClient.create_user(user);
        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        expect(compare_users(body, user)).toBeTruthy();
        userId = body.id;
    });

    test('CRUD User - #2 - READ previously created User (v2)', async ({ request }) => {
        const gorestClient = new GorestClient(request, cfg, version, process.env.GOREST_TOKEN);
        const response = await gorestClient.get_user(userId);
        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        expect(compare_users(body, user)).toBeTruthy();
        userId = body.id;
    });

    test('CRUD User - #3 - UPDATE previously created User (v2)', async ({ request }) => {
        const newName = faker.person.fullName({ sex: user.gender });
        expect (newName).not.toBe(user.name);
        let modified = {...user};
        modified.name = newName;
        const gorestClient = new GorestClient(request, cfg, version, process.env.GOREST_TOKEN);
        const responseUpdate = await gorestClient.update_user(userId, modified);
        expect(responseUpdate.ok()).toBeTruthy();
        const responseGet = await gorestClient.get_user(userId);
        expect(responseGet.ok()).toBeTruthy();
        const body = await responseGet.json();
        expect(compare_users(body, modified)).toBeTruthy();
    });

    test('CRUD User - #4 - DELETE previously created User (v2)', async ({ request }) => {
        const gorestClient = new GorestClient(request, cfg, version, process.env.GOREST_TOKEN);
        const responseDelete = await gorestClient.delete_user(userId);
        expect(responseDelete.ok()).toBeTruthy();
        const responseGet = await gorestClient.get_user(userId);
        expect(responseGet.ok()).not.toBeTruthy();
    });

});