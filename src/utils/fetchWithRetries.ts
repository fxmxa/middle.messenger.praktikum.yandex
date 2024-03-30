const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

type Data = Record<string, string>

type Options = {
  timeout?: number
  method?: keyof typeof METHODS
  retries: number
  headers?: Record<string, string>
  data?: Data
}

function queryStringify(data: Data) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '');
}

export class HTTPTransport {
  get = (url: string, options: Options) => {
    const { data } = options;
    const query = data ? queryStringify(data) : '';
    const fullUrl = url + (query ? `?${query}` : '');
    return this.request(
      fullUrl,
      { ...options, method: METHODS.GET, data: undefined },
      options.timeout,
    );
  };

  post = (url: string, options: Options) => this.request(
    url,
    { ...options, method: METHODS.POST },
    options.timeout,
  );

  put = (url: string, options: Options) => this.request(
    url,
    { ...options, method: METHODS.PUT },
    options.timeout,
  );

  delete = (url: string, options: Options) => this.request(
    url,
    { ...options, method: METHODS.DELETE },
    options.timeout,
  );

  request = (url: string, options: Options, timeout = 5000) => {
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
      } else {
        const query = data ? queryStringify(data) : null;
        xhr.send(query);
      }
    });
  };
}

export function fetchWithRetry(url: string, options: Options) {
  return new Promise((resolve, reject) => {
    const transport = new HTTPTransport();
    transport.get(url, options)
      .then(resolve)
      .catch((error) => {
        if (options.retries === 0) {
          reject(error);
          return;
        }
        fetchWithRetry(url, { ...options, retries: options.retries - 1 }).then(resolve, reject);
      });
  });
}
