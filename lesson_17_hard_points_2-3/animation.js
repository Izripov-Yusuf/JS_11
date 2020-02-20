window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  let startAnimation = document.querySelector('#start'),
      stopAnimation = document.querySelector('#stop'),
      circle = document.querySelector('#circle'),
      count = 50;

  let bigInterval;

  let bigAnimation = function () {
    bigInterval = requestAnimationFrame(bigAnimation);
    count++;
    if (count < 500) {
      circle.style.width = count + 'px';
      circle.style.height = count + 'px';
    } else{
      cancelAnimationFrame(bigInterval);
    }
  };
  let animation = false;
  startAnimation.addEventListener('click', function () {
    if (animation) {
      startAnimation.value = 'Остановить';
      bigInterval = requestAnimationFrame(bigAnimation);
      animation = false;
    } else {
      startAnimation.value = 'Начать';
      animation = true;
      cancelAnimationFrame(bigInterval);
    }
  });

  stopAnimation.addEventListener('click', function () {
    cancelAnimationFrame(bigInterval);
    count = 50;
    circle.style.width = count + 'px';
    circle.style.height = count + 'px';
  });
});












// Разные вариации прокрутки
/* window.addEventListener('DOMContentLoaded', function () {
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
      return {
        timeRemaining,
        hours,
        minutes,
        seconds
      };
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
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul>li'),
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

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);

    closeBtn.addEventListener('click', handlerMenu);

    menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
  };
  toggleMenu();
  // Popup
  const togglePopup = () => {
    let popupInterval,
      count = 0,
      userWidth = window.innerWidth;
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popupClose = document.querySelector('.popup-close'),
      popupBlock = document.querySelector('.popup-content');

    const popupAnimation = () => {
      popupInterval = requestAnimationFrame(popupAnimation);
      count++;
      if (count <= 38) {
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

    popupClose.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  };
  togglePopup();
  // Кнопка перехода к следующему слайду
  let blockService = document.querySelector('#service-block'),
    buttonDown = document.querySelector('a[href="#service-block"]'),
    blockServiceOffsetTop = blockService.offsetTop;
  console.log('blockServiceOffsetTop: ', blockServiceOffsetTop);

  let count = 0,
    buttonDownInterval;
  let buttonDownAnimation = function () {
    buttonDownInterval = requestAnimationFrame(buttonDownAnimation);
    count = count + 15;
    if (count <= blockServiceOffsetTop + 15) {
      document.documentElement.scrollTop = count;
    } else {
      cancelAnimationFrame(buttonDownInterval);
      count = 0;
    }
  };
  buttonDown.addEventListener('click', function () {
      buttonDownInterval = requestAnimationFrame(buttonDownAnimation);
    });


  const buttonDownAnimation = () => {
    count++;
    if (count <= blockServiceOffsetTop) {
      document.documentElement.scrollTop = count;
    } else {
      clearInterval(buttonDownInterval);
      count = 0;
    }
  };
  buttonDown.addEventListener('click', () =>{
    buttonDownInterval = setInterval(buttonDownAnimation, 2000);
  });

  buttonDown.addEventListener('click', (event) => {
    event.preventDefault();
    const buttonDownId = buttonDown.getAttribute('href');
    document.querySelector(buttonDownId).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
}); */