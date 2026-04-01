import { test, expect } from '../fixtures/api.fixture';

test.describe('Users API - Positive', () => {
  test('GET /users returns paginated list with status 200', async ({ apiClient }) => {
    const response = await apiClient.get('users');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.page).toBeDefined();
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('GET /users?page=2 returns page 2 with correct pagination', async ({ apiClient }) => {
    const response = await apiClient.get('users?page=2');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.page).toBe(2);
    expect(Array.isArray(body.data)).toBe(true);
  });

  test('GET /users/:id (id=1) returns single user with status 200', async ({ apiClient }) => {
    const response = await apiClient.get('users/1');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.data.id).toBe(1);
    expect(body.data.email).toBeDefined();
    expect(body.data.first_name).toBeDefined();
  });

});

test.describe('Users API - Negative', () => {
  test('GET /users/:id (id=999) returns 404', async ({ apiClient }) => {
    const response = await apiClient.get('users/999');

    expect(response.status()).toBe(404);

    const body = await response.json();

    expect(body).toBeDefined();
  });

  test('GET /users with malformed per_page query returns 200 (runtime behavior)', async ({ apiClient }) => {
    const response = await apiClient.get('users?per_page=101');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.per_page).toBe(101);
    expect(Array.isArray(body.data)).toBe(true);
  });
});