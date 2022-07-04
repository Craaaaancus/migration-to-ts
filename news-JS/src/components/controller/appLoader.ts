import Loader from './Loader/loader';

class AppLoader extends Loader {
  constructor() {
    super('https://nodenews.herokuapp.com/', {
      apiKey: 'caa85f7c9dae4dd8ab7a91d09783bdfa', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
