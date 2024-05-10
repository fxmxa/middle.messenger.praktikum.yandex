import saveJsonParse from '@/utils/saveJsonParse.ts';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

// type Data = Record<string, string | number> | FormData

type Options<T = unknown> = {
  timeout?: number
  method?: keyof typeof METHODS
  retries?: number
  headers?: Record<string, string>
  data?: T
}

function queryStringify(data: Record<string, any>) {
  if (typeof data !== 'object' || data instanceof FormData) {
    throw new Error('Data must be plain object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '');
}

export interface RequestResult {
  ok: boolean;
  status: number;
  response: string
  json: <T>() => T;
}

function parseResult(xhr: XMLHttpRequest): RequestResult {
  return {
    ok: xhr.status >= 200 && xhr.status < 300,
    status: xhr.status,
    response: xhr.responseText,
    json: <T>() => saveJsonParse<T>(xhr.responseText) as T,
  };
}
function errorResponse(xhr: XMLHttpRequest, message: string | null = null): RequestResult {
  return {
    ok: false,
    status: xhr.status,
    response: message || xhr.statusText,
    json: <T>() => saveJsonParse<T>(message || xhr.statusText) as T,
  };
}

type HTTPMethod = (options?: Options, route?: string) => Promise<RequestResult>

export class HTTPTransport {
  baseUrl;

  constructor() {
    this.baseUrl = 'https://ya-praktikum.tech/api/v2';
  }

  get: HTTPMethod = async (options = {}, route = '') => {
    const { data } = options;
    const query = data ? queryStringify(data) : '';
    const fullUrl = this.baseUrl + route + (query ? `?${query}` : '');
    return this.request(
      fullUrl,
      { ...options, method: METHODS.GET, data: undefined },
      options.timeout,
    );
  };

  post: HTTPMethod = (options = {}, route = '') => this.request(
    this.baseUrl + route,
    { ...options, method: METHODS.POST },
    options.timeout,
  );

  put: HTTPMethod = (options = {}, route = '') => this.request(
    this.baseUrl + route,
    {
      ...options,
      method: METHODS.PUT,
    },
    options.timeout,
  );

  delete : HTTPMethod = (options = {}, route = '') => this.request(
    this.baseUrl + route,
    { ...options, method: METHODS.DELETE },
    options.timeout,
  );

  private request = (url: string, options: Options, timeout = 5000) => {
    const {
      headers = {},
      method = METHODS.GET,
      data,
    } = options;

    return new Promise<RequestResult>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.timeout = timeout;
      xhr.withCredentials = true;

      xhr.onload = () => {
        resolve(parseResult(xhr));
      };
      xhr.onabort = () => {
        reject(errorResponse(xhr, 'Request abort'));
      };
      xhr.ontimeout = () => {
        reject(errorResponse(xhr, 'Request timeout'));
      };
      xhr.onerror = () => {
        reject(errorResponse(xhr, 'Request failed'));
      };

      if (!data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
