import { test, expect } from '../fixtures/api.fixture';

test('GET users list', async ({ apiClient }) => {
  const response = await apiClient.get('users?page=2');

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.page).toBe(2);
  expect(body.data.length).toBeGreaterThan(0);
});