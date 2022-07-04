class menuSwitch {
  static toggleMenu() {
    const burger: HTMLElement | null = document.getElementById('burger');
    const menu = document.querySelector('.menu') as HTMLElement;
    const menuSide = document.querySelector('.menu__side') as HTMLElement;
    if (burger) {
      document.body.classList.toggle('locked');
      menuSide.classList.toggle('menu__side-open');
      burger.classList.toggle('burger-open');
      menu.classList.toggle('menu-open');
    }
  }

  addSwitch() {
    const menuSide = document.querySelector('.menu__side') as HTMLElement;
    const burger = document.getElementById('burger') as HTMLElement;
    menuSide.addEventListener('click', menuSwitch.toggleMenu);
    burger.addEventListener('click', menuSwitch.toggleMenu);
  }
}

export default menuSwitch;
