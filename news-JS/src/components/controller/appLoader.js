import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: 'caa85f7c9dae4dd8ab7a91d09783bdfa', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
