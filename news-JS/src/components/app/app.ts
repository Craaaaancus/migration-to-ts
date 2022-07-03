import AppController from '../controller/controller';
import AppView from '../view/appView';
import IDataNews from '../interfaces/IDataNews';
import IDataSources from '../interfaces/IDataSources';

class App {
  private controller: AppController;
  private view: AppView;
  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    document
      .querySelector('.sources')!
      .addEventListener('click', (e: Event) =>
        this.controller.getNews(e, (data: IDataNews): void =>
          this.view.drawNews(data)
        )
      );
    this.controller.getSources((data: IDataSources): void =>
      this.view.drawSources(data)
    );
  }
}

export default App;
