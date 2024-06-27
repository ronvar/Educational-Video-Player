export const API_EXPRESS_BASE_URL =
  "https://take-home-assessment-423502.uc.r.appspot.com/api";

const APP_EXPRESS_DEFAULT_HEADERS = {
  Accept: "application/json",
};

type RequestOptions = {
  headers?: { [key: string]: string };
  body?: string | FormData;
};

const request = async (
  url: string,
  method: "GET" | "POST" | "PUT",
  options?: RequestOptions,
  credentials?: boolean
) => {
  let attempt = 0;
  while (true) {
    try {
      attempt++;

      const response = await fetch(url, {
        mode: "cors",
        headers: options?.headers,
        method: method ?? "GET",
        body: options?.body,
        credentials: credentials ? "include" : "omit",
      } as any);
      if (response.status === 401) {
        console.log("Unauthorized");
        attempt = 4;
        return response;
      }
      const data = await response.json();
      return data;
    } catch (ex) {
      if (attempt > 6) {
        throw ex;
      }
      const size = 1000;
      const backoff = attempt * 2 * size + Math.random() * size * 0.1;
      await new Promise((resolve) => setTimeout(resolve, backoff));
    }
  }
};

export const fetcher = {
  get: async <T>(url: string, options?: RequestOptions): Promise<T> =>
    request(url, "GET", options),
  post: async <T>(url: string, options?: RequestOptions): Promise<T> =>
    request(url, "POST", options),
  put: async <T>(url: string, options?: RequestOptions): Promise<T> =>
    request(url, "PUT", options),
};

const mergeHeaders = (options?: RequestOptions) => ({
  ...APP_EXPRESS_DEFAULT_HEADERS,
  ...options?.headers,
});

const apiUrl = (url: string) => API_EXPRESS_BASE_URL + url;

const apiWrapper = {
  get: async <T>(url: string, options?: RequestOptions): Promise<T> =>
    request(
      apiUrl(url),
      "GET",
      {
        ...options,
        headers: mergeHeaders(options),
      },
      true
    ),
  post: async <T>(
    url: string,
    options?: RequestOptions,
    noDefaultHeaders?: boolean
  ): Promise<T> =>
    request(
      apiUrl(url),
      "POST",
      {
        ...options,
        headers: noDefaultHeaders ? {} : mergeHeaders(options),
      },
      true
    ),

  put: async <T>(
    url: string,
    options?: RequestOptions,
    noDefaultHeaders?: boolean
  ): Promise<T> =>
    request(
      apiUrl(url),
      "PUT",
      {
        ...options,
        headers: noDefaultHeaders ? {} : mergeHeaders(options),
      },
      true
    ),
};

export default apiWrapper;
