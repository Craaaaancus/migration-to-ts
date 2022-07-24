import AppLoader from './appLoader';
import { Endpoints } from './index';

class AppController extends AppLoader {
  getSources<T>(callback: (data: T) => void) {
    super.getResp(
      {
        endpoint: Endpoints.sources,
      },
      callback
    );
  }

  getNews<U>(e: Event, callback: (data: U) => void) {
    let target: HTMLElement | null = e.target as HTMLElement;
    if (!target) return null;
    const newsContainer = e.currentTarget as HTMLElement;

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id') as string;
        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp(
            {
              endpoint: Endpoints.everything,
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }
}

export default AppController;
