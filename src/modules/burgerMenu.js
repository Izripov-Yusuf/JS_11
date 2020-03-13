const burgerMenu = () => {
  const burger = document.getElementById('burger'),
        burgerMenu = document.querySelector('.popup-menu'),
        menuLinks = burgerMenu.querySelectorAll('a'),
        closeMenu = document.getElementById('close-menu'),
        body = document.querySelector('body');

  const handlerMenu = () => {
    burgerMenu.classList.toggle('popup-menu-active');
  };

  const scrollToBlock = (index) => {
    for (let i = 0; i < menuLinks.length; i++) {
      if (index === i) {
        handlerMenu();
      }
    }
  };

  body.addEventListener('click', (event) => {
    let target = event.target,
      parent = target.parentNode;

    if (target === burger) {
      handlerMenu();
    }
    if (target === closeMenu) {
      handlerMenu();
    } else if (parent.tagName === 'LI') {
      menuLinks.forEach((item, i) => {
        if (item === target) {
          scrollToBlock(i);
        }
      });
    }
  });

  
};

export default burgerMenu;