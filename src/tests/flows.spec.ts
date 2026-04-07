import { test, expect } from '../fixtures/api.fixture';
import { expectJsonResponse } from '../utils/api-assertions';

test.describe('Flows API - Positive @integration @flow @positive', () => {
  test('CRUD chained flow for /users returns expected statuses and metadata', async ({ apiClient }) => {
    const createResponse = await apiClient.post('users', {
      name: 'Flow User',
      job: 'QA',
    });
    const createdBody = await expectJsonResponse(createResponse, 201);

    const createdId = String(createdBody.id);
    expect(createdId.length).toBeGreaterThan(0);
    expect(typeof createdBody.createdAt).toBe('string');

    const putResponse = await apiClient.put(`users/${createdId}`, {
      name: 'Flow User Updated',
      job: 'Senior QA',
    });
    const putBody = await expectJsonResponse(putResponse, 200);

    expect(putBody.name).toBe('Flow User Updated');
    expect(typeof putBody.updatedAt).toBe('string');

    const patchResponse = await apiClient.patch(`users/${createdId}`, {
      job: 'Lead QA',
    });
    const patchBody = await expectJsonResponse(patchResponse, 200);

    expect(typeof patchBody.updatedAt).toBe('string');

    const deleteResponse = await apiClient.delete(`users/${createdId}`);
    expect(deleteResponse.status()).toBe(204);
  });

  test('Browse resources flow: list page then read one resource by id', async ({ apiClient }) => {
    const listResponse = await apiClient.get('unknown', {
      params: { page: 1 },
    });
    const listBody = await expectJsonResponse(listResponse, 200);

    expect(Array.isArray(listBody.data)).toBe(true);
    expect(listBody.data.length).toBeGreaterThan(0);

    const resourceId = listBody.data[0].id;
    const detailResponse = await apiClient.get(`unknown/${resourceId}`);
    const detailBody = await expectJsonResponse(detailResponse, 200);

    expect(detailBody.data.id).toBe(resourceId);
  });

  test('Browse users flow: list page then read one user by id', async ({ apiClient }) => {
    const listResponse = await apiClient.get('users', {
      params: { page: 2 },
    });
    const listBody = await expectJsonResponse(listResponse, 200);

    expect(Array.isArray(listBody.data)).toBe(true);
    expect(listBody.data.length).toBeGreaterThan(0);

    const userId = listBody.data[0].id;
    const detailResponse = await apiClient.get(`users/${userId}`);
    const detailBody = await expectJsonResponse(detailResponse, 200);

    expect(detailBody.data.id).toBe(userId);
  });
});

test.describe('Flows API - Negative @integration @flow @negative', () => {
  test('Login flow recovers after invalid credentials payload', async ({ apiClient }) => {
    const invalidLoginResponse = await apiClient.post('login', {
      email: 'eve.holt@reqres.in',
    });
    const invalidLoginBody = await expectJsonResponse(invalidLoginResponse, 400);

    expect(typeof invalidLoginBody.error).toBe('string');

    const validLoginResponse = await apiClient.post('login', {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    });
    const validLoginBody = await expectJsonResponse(validLoginResponse, 200);

    expect(typeof validLoginBody.token).toBe('string');
    expect(validLoginBody.token.length).toBeGreaterThan(0);
  });

  test('Register flow recovers after invalid payload', async ({ apiClient }) => {
    const invalidRegisterResponse = await apiClient.post('register', {
      email: 'sydney@fife',
    });
    const invalidRegisterBody = await expectJsonResponse(invalidRegisterResponse, 400);

    expect(typeof invalidRegisterBody.error).toBe('string');

    const validRegisterResponse = await apiClient.post('register', {
      email: 'eve.holt@reqres.in',
      password: 'pistol',
    });
    const validRegisterBody = await expectJsonResponse(validRegisterResponse, 200);

    expect(validRegisterBody.id).toBeDefined();
    expect(typeof validRegisterBody.token).toBe('string');
  });

  test('Flow continuity after malformed query behavior', async ({ apiClient }) => {
    const queryResponse = await apiClient.get('users', {
      params: { per_page: 101 },
    });
    await expectJsonResponse(queryResponse, 200);

    const followUpResponse = await apiClient.get('users/1');
    const followUpBody = await expectJsonResponse(followUpResponse, 200);

    expect(followUpBody.data.id).toBe(1);
  });
});
