interface IDataArticle {
  author: string;
  title: string;
  source: Pick<IDataSource, 'id' | 'name'>;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
