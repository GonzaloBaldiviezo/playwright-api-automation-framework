import { APIResponse, expect } from '@playwright/test';

type JsonBody = Record<string, any>;

export async function expectJsonResponse(response: APIResponse, expectedStatus: number): Promise<JsonBody> {
  expect(response.status()).toBe(expectedStatus);
  return await response.json();
}