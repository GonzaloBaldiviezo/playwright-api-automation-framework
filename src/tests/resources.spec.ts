import { test, expect } from '../fixtures/api.fixture';
import { expectJsonResponse } from '../utils/api-assertions';

test.describe('Resources API - Positive @positive', () => {
  test('@smoke GET /resources returns list with status 200', async ({ apiClient }) => {
    const response = await apiClient.get('resources');
    const body = await expectJsonResponse(response, 200);

    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('GET /resources/:id (id=1) returns single resource with status 200', async ({ apiClient }) => {
    const response = await apiClient.get('resources/1');
    const body = await expectJsonResponse(response, 200);

    expect(body.data.id).toBe(1);
    expect(body.data.name).toBeDefined();
    expect(body.data.year).toBeDefined();
  });

});

test.describe('Resources API - Negative @negative', () => {
  test('GET /resources/:id (id=999) returns 404', async ({ apiClient }) => {
    const response = await apiClient.get('resources/999');

    expect(response.status()).toBe(404);
  });

  test('GET /resources with malformed per_page query returns 200 (runtime behavior)', async ({ apiClient }) => {
    const response = await apiClient.get('resources?per_page=-1');
    const body = await expectJsonResponse(response, 200);

    expect(body.per_page).toBe(-1);
    expect(Array.isArray(body.data)).toBe(true);
  });
});