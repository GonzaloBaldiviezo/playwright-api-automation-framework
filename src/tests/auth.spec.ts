import { test, expect } from '../fixtures/api.fixture';

test.describe('Auth API - Positive', () => {
  test('POST /login with valid credentials returns 200 and token', async ({ apiClient }) => {
    const response = await apiClient.post('login', {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.token).toBeDefined();
    expect(typeof body.token).toBe('string');
  });

  test('POST /register with valid credentials returns 200 and token', async ({ apiClient }) => {
    const response = await apiClient.post('register', {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBeDefined();
    expect(body.token).toBeDefined();
  });
});

test.describe('Auth API - Negative', () => {
  test('POST /login without password returns 400 and error message', async ({ apiClient }) => {
    const response = await apiClient.post('login', {
      email: 'eve.holt@reqres.in',
    });

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.error).toBeDefined();
  });

  test('POST /login with empty payload returns 400 and error message', async ({ apiClient }) => {
    const response = await apiClient.post('login', {});

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.error).toBeDefined();
  });

  test('POST /register without password returns 400 and error message', async ({ apiClient }) => {
    const response = await apiClient.post('register', {
      email: 'eve.holt@reqres.in',
    });

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.error).toBeDefined();
  });

  test('POST /register with empty payload returns 400 and error message', async ({ apiClient }) => {
    const response = await apiClient.post('register', {});

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.error).toBeDefined();
  });

  test('GET /app-users/login returns 405 method not allowed', async ({ apiClient }) => {
    const response = await apiClient.get('app-users/login');

    expect(response.status()).toBe(405);

    const body = await response.json();

    expect(body.error).toBeDefined();
  });
});