import News from './news/news';
import Sources from './sources/sources';
import * as interfaces from './index';

class AppView {
  private news: News;
  private sources: Sources;
  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: interfaces.IDataNews) {
    const values: Array<interfaces.IDataArticle> = data?.articles ?? [];
    this.news.draw(values);
  }

  drawSources(data: interfaces.IDataSources) {
    const values: Array<interfaces.IDataSource> = data?.sources ?? [];
    this.sources.draw(values);
  }
}

export default AppView;
