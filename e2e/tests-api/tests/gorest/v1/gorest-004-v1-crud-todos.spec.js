import { test, expect } from '@playwright/test';
import { Faker, faker } from '@faker-js/faker';
import { GorestClient } from '../../../clients/gorest/gorestClient.js';
import { compare_todos }  from '../../../clients/gorest/gorestClient.js';

const cfg = require('../../../../utilities/loadEnvHelper.js');

test.describe.serial('GoRest API V1 CRUD: ToDos', () => {

    const version = "V1";

    let ownerId = 0;
    let todoId = 0;
    let toDo = {}
    toDo.title = faker.lorem.sentence();
    toDo.due_on = faker.date.soon();
    toDo.status = "pending";

    test('CRUD ToDOs - #0 - Preparation (V1) - getting existing user ID as owner', async ({ request }) => {
        const gorestClient = new GorestClient(request, cfg, version, process.env.GOREST_TOKEN);
        const response = await gorestClient.list_users();
        expect(response.ok()).toBeTruthy();
        const users = (await response.json()).data;
        await expect(users.length).toBeGreaterThan(0);
        const first_user = users[0];
        ownerId = first_user.id;
    });

    test('CRUD ToDos - #1 - CREATE new ToDo (V1)', async ({ request }) => {
        const gorestClient = new GorestClient(request, cfg, version, process.env.GOREST_TOKEN);
        toDo.user_id = ownerId;
        const response = await gorestClient.create_todo(toDo);
        expect(response.ok()).toBeTruthy();
        const newToDo = (await response.json()).data;
        expect(compare_todos(newToDo, toDo)).toBeTruthy();
        todoId = newToDo.id;
    });

    test('CRUD ToDos - #2 - READ previously created ToDo (V1)', async ({ request }) => {
        const gorestClient = new GorestClient(request, cfg, version, process.env.GOREST_TOKEN);
        const response = await gorestClient.get_todo(todoId);
        expect(response.ok()).toBeTruthy();
        const body = (await response.json()).data;
        expect(compare_todos(body, toDo)).toBeTruthy();
    });

    test('CRUD ToDos - #3 - UPDATE previously created ToDo (V1)', async ({ request }) => {
        let modified = { ...toDo };
        modified.status = "completed";
        const gorestClient = new GorestClient(request, cfg, version, process.env.GOREST_TOKEN);
        const responseUpdate = await gorestClient.update_todo(todoId, modified);
        expect(responseUpdate.ok()).toBeTruthy();
        const responseGet = await gorestClient.get_todo(todoId);
        expect(responseGet.ok()).toBeTruthy();
        const body = (await responseGet.json()).data;
        expect(compare_todos(body, modified)).toBeTruthy();
    });

    test('CRUD ToDos - #4 - DELETE previously created ToDo (V1)', async ({ request }) => {
        const gorestClient = new GorestClient(request, cfg, version, process.env.GOREST_TOKEN);
        const responseDelete = await gorestClient.delete_todo(todoId);
        expect(responseDelete.ok()).toBeTruthy();
        const responseGet = await gorestClient.get_todo(todoId);
        expect(responseGet.ok()).not.toBeTruthy();
    });

});