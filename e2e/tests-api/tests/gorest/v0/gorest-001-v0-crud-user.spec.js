import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { GorestClient } from '../../../clients/gorest/gorestClient.js';
import { compare_users, copy_user } from '../../../../utilities/gorestClientHelper.js';

const cfg = require('../../../../utilities/loadEnvHelper.js');

test.describe.serial('GoRest API V0 CRUD: User', () => {

    const version = "V0";

    let userId = 0;
    let user = {}
    user.gender = faker.helpers.arrayElement(['male', 'female']);
    user.name = faker.person.fullName({ sex: user.gender });
    user.email = faker.internet.email();

    user.status = "active";

    test('CRUD User - #1 - CREATE new User (v0)', async ({ request }) => {
        const gorestClient = new GorestClient(request, cfg, version, process.env.GOREST_TOKEN);
        const response = await gorestClient.create_user(user);
        const body = await response.json();
        expect(body.code).toBe(201);
        expect(compare_users(body.data, user)).toBeTruthy();
        userId = body.data.id;
    });

    test('CRUD User - #2 - READ previously created User (v0)', async ({ request }) => {
        const gorestClient = new GorestClient(request, cfg, version, process.env.GOREST_TOKEN);
        const response = await gorestClient.get_user(userId);
        const body = await response.json();
        expect(body.code).toBe(200);
        expect(compare_users(body.data, user)).toBeTruthy();
        userId = body.data.id;
    });

    test('CRUD User - #3 - UPDATE previously created User (v0)', async ({ request }) => {
        const newName = faker.person.fullName({ sex: user.gender });
        expect (newName).not.toBe(user.name);
        let modified = {...user};
        modified.name = newName;
        const gorestClient = new GorestClient(request, cfg, version, process.env.GOREST_TOKEN);
        const responseUpdate = await gorestClient.update_user(userId, modified);
        const bodyUpdate = await responseUpdate.json();
        expect(bodyUpdate.code).toBe(200);
        const responseGet = await gorestClient.get_user(userId);
        expect(responseGet.ok()).toBeTruthy();
        const bodyGet = await responseGet.json();
        expect(bodyGet.code).toBe(200);
        expect(compare_users(bodyGet.data, modified)).toBeTruthy();
    });

    test('CRUD User - #4 - DELETE previously created User (v0)', async ({ request }) => {
        const gorestClient = new GorestClient(request, cfg, version, process.env.GOREST_TOKEN);
        const responseDelete = await gorestClient.delete_user(userId);
        const bodyDelete = await responseDelete.json();
        expect (bodyDelete.code).toBe(204);
        const responseGet = await gorestClient.get_user(userId);
        const bodyGet = await responseGet.json();
        expect (bodyGet.code).toBe(404);
    });

});