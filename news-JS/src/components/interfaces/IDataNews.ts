import IDataArticle from './IDataArticle';

interface IDataNews {
  status: 'ok' | 'error';
  totalResults: number;
  articles: Array<IDataArticle>;
}

export default IDataNews;
