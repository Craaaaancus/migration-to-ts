interface IApiKey {
  [apiKey: string]: string;
}

class Loader {
  constructor(
    public readonly baseLink: string,
    public options: Readonly<IApiKey>
  ) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
    { endpoint, options = {} }: { endpoint: string, options?:{sources?: string}},
    callback = (): void => {
      console.error('No callback for GET response');
    }
  ) {
    this.load('GET', endpoint, callback, options);
  }

  errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(
          `Sorry, but there is ${res.status} error: ${res.statusText}`
        );
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: {[sources: string]: string}|{}, endpoint: string): string {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key: string): void => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load(
    method: string,
    endpoint: string,
    callback: (n?: any) => void,
    options = {}
  ) {
    //console.log(endpoint);
    //console.log(callback);
    //console.log(JSON.stringify(options));
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res: Response): Promise<string> => res.json())
      .then((data: any) => callback(data))
      .catch((err: Error): void => console.error(err));
  }
}

export default Loader;
