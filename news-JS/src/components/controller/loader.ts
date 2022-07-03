type ApiKey = {
  [apiKey: string]: string;
};
type Options = {
  [sources: string]: string;
};

interface IResponce {
  endpoint: string;
  options?: Partial<Options>;
}

enum Status {
  Unauthorized = 401,
  NotFound = 404,
}

class Loader {
  constructor(
    public readonly baseLink: string,
    public options: Readonly<ApiKey>
  ) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp<T>(
    { endpoint, options }: Readonly<IResponce>,
    callback: (data: T) => void = (_data: T): void => {
      console.error('No callback for GET response');
    }
  ) {
    this.load('GET', endpoint, callback, options);
  }

  errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === Status.Unauthorized || res.status === Status.NotFound)
        console.log(
          `Sorry, but there is ${res.status} error: ${res.statusText}`
        );
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: Partial<Options> = {}, endpoint: string): string {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key: string): void => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load<U>(
    method: string,
    endpoint: string,
    callback: (data: U) => void,
    options: Partial<Options> = {}
  ) {
    console.log(endpoint);
    console.log(callback);
    console.log(JSON.stringify(options));
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res: Response): Promise<U> => res.json())
      .then((data: U): void => callback(data))
      .catch((err: Error): void => console.error(err));
  }
}

export default Loader;
