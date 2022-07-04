import AppController from '../controller/controller';
import AppView from '../view/appView';
import menuSwitch from '../Switch/menuSwitch';
import IDataNews from '../interfaces/IDataNews';
import IDataSources from '../interfaces/IDataSources';

class App {
  private controller: AppController;
  private view: AppView;
  private switch: menuSwitch;
  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
    this.switch = new menuSwitch();
  }

  start() {
    document
      .querySelector('.sources .source__list')!
      .addEventListener('click', (e: Event) =>
        this.controller.getNews(e, (data: IDataNews): void =>
          this.view.drawNews(data)
        )
      );
    this.switch.addSwitch();

    this.controller.getSources((data: IDataSources): void =>
      this.view.drawSources(data)
    );
  }
}

export default App;
