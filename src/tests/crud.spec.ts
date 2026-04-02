import { test, expect } from '../fixtures/api.fixture';
import { expectJsonResponse } from '../utils/api-assertions';

test.describe('CRUD API - Positive @positive', () => {
  test('@smoke POST /users with payload returns 201 with id and createdAt', async ({ apiClient }) => {
    const response = await apiClient.post('users', {
      name: 'John Doe',
      job: 'QA Engineer',
    });
    const body = await expectJsonResponse(response, 201);

    expect(body.name).toBe('John Doe');
    expect(body.id).toBeDefined();
    expect(typeof body.createdAt).toBe('string');
    expect(Number.isNaN(Date.parse(String(body.createdAt)))).toBe(false);
  });

  test('PUT /users/:id (id=2) with payload returns 200 with updatedAt', async ({ apiClient }) => {
    const response = await apiClient.put('users/2', {
      name: 'Jane Doe',
      job: 'Test Lead',
    });
    const body = await expectJsonResponse(response, 200);

    expect(body.name).toBe('Jane Doe');
    expect(typeof body.updatedAt).toBe('string');
    expect(Number.isNaN(Date.parse(String(body.updatedAt)))).toBe(false);
  });

  test('PATCH /users/:id (id=2) with partial payload returns 200 with updatedAt', async ({ apiClient }) => {
    const response = await apiClient.patch('users/2', {
      job: 'Senior QA',
    });
    const body = await expectJsonResponse(response, 200);

    expect(typeof body.updatedAt).toBe('string');
    expect(Number.isNaN(Date.parse(String(body.updatedAt)))).toBe(false);
  });

  test('DELETE /users/:id (id=2) returns 204', async ({ apiClient }) => {
    const response = await apiClient.delete('users/2');

    expect(response.status()).toBe(204);
  });
});

test.describe('CRUD API - Negative @negative', () => {
  test('POST /users with null payload returns 400 and error message', async ({ apiClient }) => {
    const response = await apiClient.post('users', null);
    const body = await expectJsonResponse(response, 400);

    expect(body.error).toBeDefined();
    expect(typeof body.error).toBe('string');
  });

  test('PUT /users/:id with null payload returns 400 and error message', async ({ apiClient }) => {
    const response = await apiClient.put('users/2', null);
    const body = await expectJsonResponse(response, 400);

    expect(body.error).toBeDefined();
    expect(typeof body.error).toBe('string');
  });

  test('PATCH /users/:id with null payload returns 400 and error message', async ({ apiClient }) => {
    const response = await apiClient.patch('users/2', null);
    const body = await expectJsonResponse(response, 400);

    expect(body.error).toBeDefined();
    expect(typeof body.error).toBe('string');
  });
});