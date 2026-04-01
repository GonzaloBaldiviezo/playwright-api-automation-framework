import { test, expect } from '../fixtures/api.fixture';

test.describe('CRUD API - Positive', () => {
  test('POST /users with payload returns 201 with id and createdAt', async ({ apiClient }) => {
    const response = await apiClient.post('users', {
      name: 'John Doe',
      job: 'QA Engineer',
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.name).toBe('John Doe');
    expect(body.id).toBeDefined();
    expect(body.createdAt).toBeDefined();
  });

  test('PUT /users/:id (id=2) with payload returns 200 with updatedAt', async ({ apiClient }) => {
    const response = await apiClient.put('users/2', {
      name: 'Jane Doe',
      job: 'Test Lead',
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.name).toBe('Jane Doe');
    expect(body.updatedAt).toBeDefined();
  });

  test('PATCH /users/:id (id=2) with partial payload returns 200 with updatedAt', async ({ apiClient }) => {
    const response = await apiClient.patch('users/2', {
      job: 'Senior QA',
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.updatedAt).toBeDefined();
  });

  test('DELETE /users/:id (id=2) returns 204', async ({ apiClient }) => {
    const response = await apiClient.delete('users/2');

    expect(response.status()).toBe(204);
  });
});