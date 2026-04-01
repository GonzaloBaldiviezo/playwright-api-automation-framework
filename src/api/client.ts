import { APIRequestContext } from '@playwright/test';
import { getRequiredEnv } from '../../env';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type RequestOptions = {
  data?: unknown;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
};

export class ApiClient {
  private requestContext: APIRequestContext;
  private apiKey: string;

  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
    this.apiKey = getRequiredEnv('API_KEY');
  }

  private buildHeaders(headers?: Record<string, string>) {
    return {
      'x-api-key': this.apiKey,
      ...headers,
    };
  }

  private async send(method: RequestMethod, url: string, options: RequestOptions = {}) {
    return await this.requestContext.fetch(url, {
      method,
      data: options.data,
      headers: this.buildHeaders(options.headers),
      params: options.params,
    });
  }

  async get(url: string, options?: Omit<RequestOptions, 'data'>) {
    return await this.send('GET', url, options);
  }

  async post(url: string, data?: unknown, options?: Omit<RequestOptions, 'data'>) {
    return await this.send('POST', url, { ...options, data });
  }

  async put(url: string, data?: unknown, options?: Omit<RequestOptions, 'data'>) {
    return await this.send('PUT', url, { ...options, data });
  }

  async patch(url: string, data?: unknown, options?: Omit<RequestOptions, 'data'>) {
    return await this.send('PATCH', url, { ...options, data });
  }

  async delete(url: string, options?: Omit<RequestOptions, 'data'>) {
    return await this.send('DELETE', url, options);
  }
}