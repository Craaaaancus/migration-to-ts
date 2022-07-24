import * as loader from './index';
import { IResponce } from '../interfaces';

class Loader {
  constructor(
    public readonly baseLink: string,
    public readonly options: Readonly<loader.ApiKey>
  ) {
    this.baseLink = baseLink;
    this.options = options;
  }

  protected getResp<T>(
    { endpoint, options }: Readonly<IResponce>,
    callback: (data: T) => void = (_data: T): void => {
      console.error('No callback for GET response');
    }
  ) {
    this.load(loader.ApiMethods.GET, endpoint, callback, options);
  }

  private errorHandler(res: Response): Response {
    if (!res.ok) {
      if (
        res.status === loader.ApiStatus.unauthorized ||
        res.status === loader.ApiStatus.notFound
      )
        console.log(
          `Sorry, but there is ${res.status} error: ${res.statusText}`
        );
      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(
    options: Partial<loader.Options> = {},
    endpoint: loader.Endpoints
  ): string {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key: string): void => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  protected load<U>(
    method: loader.ApiMethods,
    endpoint: loader.Endpoints,
    callback: (data: U) => void,
    options: Partial<loader.Options> = {}
  ) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res: Response): Promise<U> => res.json())
      .then((data: U): void => callback(data))
      .catch((err: Error): void => console.error(err));
  }
}

export default Loader;
