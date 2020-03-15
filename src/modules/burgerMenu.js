const burgerMenu = () => {
  const burger = document.getElementById('burger'),
        burgerMenu = document.querySelector('.popup-menu'),
        menuLinks = burgerMenu.querySelectorAll('a'),
        closeMenu = document.getElementById('close-menu'),
        body = document.querySelector('body'),
        head = document.getElementById('head'),
        stickyMenu = document.getElementById('sticky-menu');

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

  if (burger) {
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


    const scrollMenu = () => {

      if (window.innerWidth < 768) {
        let headBottom = Math.ceil(head.getBoundingClientRect().bottom);

        if (headBottom <= 0) {
          stickyMenu.style.position = 'fixed';
        } else if (headBottom > 0) {
          stickyMenu.style.position = 'relative';
        }
      } else if (window.innerWidth > 768) {
        stickyMenu.style.position = 'relative';
      }

    };
    window.addEventListener('scroll', scrollMenu);
    window.addEventListener('resize', scrollMenu);
  }
};

export default burgerMenu;