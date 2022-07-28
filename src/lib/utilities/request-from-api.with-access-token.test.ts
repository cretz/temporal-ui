import { describe, expect, it, vi } from 'vitest';
import { requestFromAPI } from './request-from-api';

import listWorkflowResponse from '$fixtures/list-workflows.json';

type MockResponse<T = unknown> = {
  body: Promise<T>;
  ok: boolean;
  status: number;
  statusText: string;
};

const options = {
  credentials: 'include',
  headers: {},
};

const endpoint = '/api/endpoint';
const responseBody = listWorkflowResponse;
const token = 'token';

const fetchMock = <T = unknown>(
  body: T = responseBody,
  response: Partial<MockResponse> = {},
) =>
  vi.fn(async () => {
    return Promise.resolve({
      json: () => Promise.resolve(body),
      status: 200,
      statusText: 'OK',
      ok: true,
      ...response,
    });
  }) as unknown as typeof fetch;

vi.stubGlobal('AccessToken', () => {
  return token;
});

describe('requestFromAPI (with a global access token)', () => {
  it('should add an authorization header if there is an AccessToken', async () => {
    const token = 'token';
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const opts = { ...options, headers };

    const request = fetchMock();
    await requestFromAPI(endpoint, { request });

    expect(request).toHaveBeenCalledWith(endpoint + '?', opts);
  });

  it('should not add an authorization header if it is not running in the browser', async () => {
    const token = 'token';

    const request = fetchMock();
    await requestFromAPI(endpoint, { request, isBrowser: false });

    expect(request).toHaveBeenCalledWith(endpoint + '?', options);
  });
});