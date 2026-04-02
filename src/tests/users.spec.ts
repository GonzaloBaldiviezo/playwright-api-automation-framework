import { test, expect } from '../fixtures/api.fixture';
import { expectJsonResponse } from '../utils/api-assertions';

test.describe('Users API - Positive @positive', () => {
  test('@smoke GET /users returns paginated list with status 200', async ({ apiClient }) => {
    const response = await apiClient.get('users');
    const body = await expectJsonResponse(response, 200);

    expect(body.page).toBeDefined();
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('GET /users?page=2 returns page 2 with correct pagination', async ({ apiClient }) => {
    const response = await apiClient.get('users?page=2');
    const body = await expectJsonResponse(response, 200);

    expect(body.page).toBe(2);
    expect(Array.isArray(body.data)).toBe(true);
  });

  test('GET /users/:id (id=1) returns single user with status 200', async ({ apiClient }) => {
    const response = await apiClient.get('users/1');
    const body = await expectJsonResponse(response, 200);

    expect(body.data.id).toBe(1);
    expect(body.data.email).toBeDefined();
    expect(body.data.first_name).toBeDefined();
  });

});

test.describe('Users API - Negative @negative', () => {
  test('GET /users/:id (id=999) returns 404', async ({ apiClient }) => {
    const response = await apiClient.get('users/999');
    const body = await expectJsonResponse(response, 404);

    expect(body).toBeDefined();
  });

  test('GET /users with malformed per_page query returns 200 (runtime behavior)', async ({ apiClient }) => {
    const response = await apiClient.get('users?per_page=101');
    const body = await expectJsonResponse(response, 200);

    expect(body.per_page).toBe(101);
    expect(Array.isArray(body.data)).toBe(true);
  });
});