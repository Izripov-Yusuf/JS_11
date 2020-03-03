// Плавное перемещение по якорям
const smoothScrollToBlock = () => {

  const menu = document.querySelector('menu'),
    menuList = menu.querySelector('ul'),
    menuAnchors = menuList.querySelectorAll('a[href^="#"]');

  for (let anchor of menuAnchors) {
    anchor.addEventListener('click', (event) => {
      event.preventDefault();
      const blockId = anchor.getAttribute('href');
      document.querySelector(blockId).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }
};
export default smoothScrollToBlock;