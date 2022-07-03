import AppController from '../controller/controller';
import { AppView } from '../view/appView';

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
    this.controller.getSources((data: ISources): void =>
      this.view.drawSources(data)
    );
  }
}

export default App;
