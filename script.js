window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Таймер
  function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
      // day = Math.floor(timeRemaining / 60 / 60 / 24)
      return {timeRemaining, hours, minutes, seconds};
    }

    function checkTime(i) {
      if (i < 10 && i >= 0) {
        i = "0" + i;
      }
      return i;
    }

    function updateClock() {
      let timer = getTimeRemaining();

      if (timer.timeRemaining > 0) {
        timerHours.textContent = `${checkTime(timer.hours)}`;
        timerMinutes.textContent = `${checkTime(timer.minutes)}`;
        timerSeconds.textContent = `${checkTime(timer.seconds)}`;
      } else {
        return countTimer(new Date(deadline).getTime() + 86400000);
      }

    }
    updateClock();
  }
  setInterval(countTimer, 1000, '19 february 2020');
  countTimer('19 february 2020');

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
        handlerMenu();
      }
    });
  };
  toggleMenu();

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
  smoothScrollToBlock();

  // Popup
  const togglePopup = () => {
    let popupInterval,
        count = 0,
        userWidth = window.innerWidth;
    const popup = document.querySelector('.popup'),
          popupBtn = document.querySelectorAll('.popup-btn'),
          popupBlock = document.querySelector('.popup-content');

    const popupAnimation = () => {
      popupInterval = requestAnimationFrame(popupAnimation);
      count++;
      if (count <= 41) {
        popupBlock.style.left = count + '%';
      } else {
        cancelAnimationFrame(popupInterval);
        count = 0;
      }
    };
    
    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        popup.style.display = 'block';
        popupBlock.style.left = '-20%';
        if (!popup.style.display || popup.style.display === `block` && userWidth >= 768) {
          popupInterval = requestAnimationFrame(popupAnimation);
        } else if (userWidth < 768) {
          cancelAnimationFrame(popupInterval);
          popupBlock.style.left = '30%';
        }
      });
    });

    popup.addEventListener('click', (event) =>{
      let target = event.target;
      if (target.classList.contains('popup-close')) {
        popup.style.display = 'none';
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          popup.style.display = 'none';
        }
      }
    });

  };
  togglePopup();

  // Кнопка перехода к следующему слайду
  let buttonDown = document.querySelector('a[href="#service-block"]');
  buttonDown.addEventListener('click', (event) => {
    event.preventDefault();
    const buttonDownId = buttonDown.getAttribute('href');
    document.querySelector(buttonDownId).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });

  // Табы
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
          tab = tabHeader.querySelectorAll('.service-header-tab'),
          tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for(let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;

      target = target.closest('.service-header-tab');

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };
  tabs();
});