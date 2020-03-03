// Меню
const toggleMenu = () => {

  const btnMenu = document.querySelector('.menu'),
    btnMenuImg = btnMenu.querySelector('img'),
    menu = document.querySelector('menu'),
    closeBtn = document.querySelector('.close-btn'),
    menuItems = menu.querySelectorAll('ul>li'),
    menuList = menu.querySelector('ul'),
    menuListLinks = menuList.querySelectorAll('a'),
    menuAnchors = menuList.querySelectorAll('a[href^="#"]'),
    body = document.querySelector('body');

  const handlerMenu = () => {
    menu.classList.toggle('active-menu');
  };

  const scrollToBlock = (index) => {
    for (let i = 0; i < menuListLinks.length; i++) {
      if (index === i) {
        handlerMenu();
      }
    }
  };

  body.addEventListener('click', (event) => {
    let target = event.target,
      parent = target.parentNode;

    if (target === btnMenuImg) {
      handlerMenu();
    } else if (target === closeBtn) {
      handlerMenu();
    } else if (parent.tagName === 'LI') {
      menuListLinks.forEach((item, i) => {
        if (item === target) {
          scrollToBlock(i);
        }
      });
    } else if (target !== menu) {
      menu.classList.remove('active-menu');
    }
  });
};
export default toggleMenu;