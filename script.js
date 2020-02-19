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
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul>li');

      const handlerMenu = () => {
        menu.classList.toggle('active-menu');
      };

    btnMenu.addEventListener('click', handlerMenu);

    closeBtn.addEventListener('click', handlerMenu);
    
    menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
  };
  toggleMenu();

  //popup
  /* const handlerMenu = () => {
      if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
        menu.style.transform = `translate(0)`;
      } else {
        menu.style.transform = `translate(-100%)`;
      }
    }; */
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
});