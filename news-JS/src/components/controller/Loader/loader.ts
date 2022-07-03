import ApiKey from './types/ApiKey';
import Options from './types/Options';
import Endpoints from './types/Endpoints';
import Responce from './types/Responce';
import Status from './enums/Status';
import ApiMethods from './enums/ApiMethods';

class Loader {
  constructor(
    public readonly baseLink: string,
    public readonly options: Readonly<ApiKey>
  ) {
    this.baseLink = baseLink;
    this.options = options;
  }

  protected getResp<T>(
    { endpoint, options }: Readonly<Responce>,
    callback: (data: T) => void = (_data: T): void => {
      console.error('No callback for GET response');
    }
  ) {
    this.load(ApiMethods.GET, endpoint, callback, options);
  }

  private errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === Status.Unauthorized || res.status === Status.NotFound)
        console.log(
          `Sorry, but there is ${res.status} error: ${res.statusText}`
        );
      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: Partial<Options> = {}, endpoint: Endpoints): string {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key: string): void => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  protected load<U>(
    method: ApiMethods.GET | ApiMethods.POST,
    endpoint: Endpoints,
    callback: (data: U) => void,
    options: Partial<Options> = {}
  ) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res: Response): Promise<U> => res.json())
      .then((data: U): void => callback(data))
      .catch((err: Error): void => console.error(err));
  }
}

export default Loader;
