import { test, expect } from '../fixtures/api.fixture';
import { expectJsonResponse } from '../utils/api-assertions';

test.describe('Auth API - Positive @positive', () => {
  test('@smoke POST /login with valid credentials returns 200 and token', async ({ apiClient }) => {
    const response = await apiClient.post('login', {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    });
    const body = await expectJsonResponse(response, 200);

    expect(body.token).toBeDefined();
    expect(typeof body.token).toBe('string');
  });

  test('POST /register with valid credentials returns 200 and token', async ({ apiClient }) => {
    const response = await apiClient.post('register', {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    });
    const body = await expectJsonResponse(response, 200);

    expect(body.id).toBeDefined();
    expect(body.token).toBeDefined();
  });
});

test.describe('Auth API - Negative @negative', () => {
  test('POST /login without password returns 400 and error message', async ({ apiClient }) => {
    const response = await apiClient.post('login', {
      email: 'eve.holt@reqres.in',
    });
    const body = await expectJsonResponse(response, 400);

    expect(body.error).toBeDefined();
    expect(typeof body.error).toBe('string');
  });

  test('POST /login with empty payload returns 400 and error message', async ({ apiClient }) => {
    const response = await apiClient.post('login', {});
    const body = await expectJsonResponse(response, 400);

    expect(body.error).toBeDefined();
    expect(typeof body.error).toBe('string');
  });

  test('POST /register without password returns 400 and error message', async ({ apiClient }) => {
    const response = await apiClient.post('register', {
      email: 'eve.holt@reqres.in',
    });
    const body = await expectJsonResponse(response, 400);

    expect(body.error).toBeDefined();
    expect(typeof body.error).toBe('string');
  });

  test('POST /register with empty payload returns 400 and error message', async ({ apiClient }) => {
    const response = await apiClient.post('register', {});
    const body = await expectJsonResponse(response, 400);

    expect(body.error).toBeDefined();
    expect(typeof body.error).toBe('string');
  });

  test('GET /app-users/login returns 405 method not allowed', async ({ apiClient }) => {
    const response = await apiClient.get('app-users/login');
    const body = await expectJsonResponse(response, 405);

    expect(body.error).toBeDefined();
    expect(typeof body.error).toBe('string');
  });
});