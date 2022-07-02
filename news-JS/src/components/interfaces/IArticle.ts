interface IArticle {
  author: string;
  title: string;
  source: Pick<ISource, "id" | "name">;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
