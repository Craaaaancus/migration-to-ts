import './news.css';
import { IDataArticle } from '../index';

class News {
  private readonly articlesAmount = 10;
  private readonly newsPlaceholder = 'img/news_placeholder.jpg';
  private readonly altDelimiter = 2;

  draw(data: Array<IDataArticle>) {
    const news: Array<IDataArticle> =
      data.length >= this.articlesAmount
        ? data.filter(
            (_item: IDataArticle, index: number): boolean =>
              index < this.articlesAmount
          )
        : data;

    const fragment: DocumentFragment = document.createDocumentFragment();
    const newsItemTemp: HTMLTemplateElement = document.querySelector(
      '#newsItemTemp'
    ) as HTMLTemplateElement;

    news.forEach((item: IDataArticle, index: number): void => {
      const newsClone: HTMLElement = newsItemTemp.content.cloneNode(
        true
      ) as HTMLElement;

      if (index % this.altDelimiter)
        newsClone.querySelector('.news__item')?.classList.add('alt');

      const newsMetaPhoto: HTMLElement = newsClone.querySelector(
        '.news__meta-photo'
      ) as HTMLElement;

      newsMetaPhoto.style.backgroundImage = `url(${
        item.urlToImage || this.newsPlaceholder
      })`;
      newsClone.querySelector('.news__meta-author')!.textContent =
        item.author || item.source.name;
      newsClone.querySelector(
        '.news__meta-date'
      )!.textContent = item.publishedAt
        .slice(0, 10)
        .split('-')
        .reverse()
        .join('-');

      newsClone.querySelector('.news__description-title')!.textContent =
        item.title;
      newsClone.querySelector('.news__description-source')!.textContent =
        item.source.name;
      newsClone.querySelector('.news__description-content')!.textContent =
        item.description;
      newsClone
        .querySelector('.news__read-more a')
        ?.setAttribute('href', item.url);

      fragment.append(newsClone);
    });

    document.querySelector('.news')!.innerHTML = '';
    document.querySelector('.news')?.appendChild(fragment);
  }
}

export default News;
