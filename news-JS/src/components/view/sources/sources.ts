import './sources.css';

class Sources {
  draw(data: Array<ISource>) {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp: HTMLTemplateElement = document.querySelector(
      '#sourceItemTemp'
    ) as HTMLTemplateElement;

    data.forEach((item: ISource): void => {
      const sourceClone: HTMLElement = sourceItemTemp.content.cloneNode(
        true
      ) as HTMLElement;

      sourceClone.querySelector('.source__item-name')!.textContent = item.name;
      sourceClone
        .querySelector('.source__item')!
        .setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    document.querySelector('.sources')!.append(fragment);
  }
}

export default Sources;
