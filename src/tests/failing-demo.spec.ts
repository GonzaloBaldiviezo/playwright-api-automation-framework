import { test, expect } from '../fixtures/api.fixture';
import { expectJsonResponse } from '../utils/api-assertions';

test.describe('Intentional failing demo @failing-demo', () => {
  test('GET /users intentionally expects the wrong status for HTML report demo', async ({ apiClient }) => {
    const response = await apiClient.get('users');

    expect(response.status()).toBe(201);
  });

  test('GET /users/1 intentionally expects the wrong user id for HTML report demo', async ({ apiClient }) => {
    const response = await apiClient.get('users/1');
    const body = await expectJsonResponse(response, 200);

    expect(body.data.id).toBe(999);
  });
});