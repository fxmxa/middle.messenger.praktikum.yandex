const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

type Data = Record<string, string | number> | FormData

type Options = {
  timeout?: number
  method?: keyof typeof METHODS
  retries?: number
  headers?: Record<string, string>
  data?: Data
}

function queryStringify(data: Data) {
  if (typeof data !== 'object' || data instanceof FormData) {
    throw new Error('Data must be plain object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '');
}

export class HTTPTransport {
  baseUrl;

  constructor() {
    const baseUrl = 'https://ya-praktikum.tech/api/v2';
    this.baseUrl = baseUrl;
  }

  get = (options: Options, route = '') => {
    const { data } = options;
    const query = data ? queryStringify(data) : '';
    const fullUrl = this.baseUrl + route + (query ? `?${query}` : '');
    return this.request(
      fullUrl,
      { ...options, method: METHODS.GET, data: undefined },
      options.timeout,
    );
  };

  post = (options: Options, route = '') => this.request(
    this.baseUrl + route,
    { ...options, method: METHODS.POST },
    options.timeout,
  );

  put = (options: Options, route = '') => this.request(
    this.baseUrl + route,
    {
      ...options,
      method: METHODS.PUT,
    },
    options.timeout,
  );

  delete = (options: Options, route = '') => this.request(
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

    return new Promise((resolve, reject) => {
      if (!method) {
        reject();
        return;
      }

      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.withCredentials = true;

      xhr.onload = () => {
        resolve(xhr);
      };
      xhr.onabort = reject;
      xhr.ontimeout = reject;
      xhr.onerror = () => {
        reject(new Error('onError'));
      };
      xhr.timeout = timeout;

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

export function fetchWithRetry(url: string, options: Options) {
  return new Promise((resolve, reject) => {
    const transport = new HTTPTransport();
    transport.get(options)
      .then(resolve)
      .catch((error) => {
        if (options.retries === 0) {
          reject(error);
          return;
        }
        fetchWithRetry(url, { ...options, retries: (options?.retries ?? 0) - 1 }).then(resolve, reject);
      });
  });
}
