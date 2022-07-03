import News from './news/news';
import Sources from './sources/sources';

export class AppView {
  private news: News;
  private sources: Sources;
  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: IDataNews) {
    const values: Array<IDataArticle> = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  drawSources(data: IDataSources) {
    const values: Array<IDataSource> = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
