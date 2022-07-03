interface IDataNews {
  status: 'ok' | 'error';
  totalResults: number;
  articles: Array<IDataArticle>;
}
