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
      return { timeRemaining, hours, minutes, seconds };
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
        menu.classList.remove('active-menu');
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
      count += 15;
      if (count <= (((document.documentElement.clientWidth - popupBlock.scrollWidth) / 2) + 15)) {
        popupBlock.style.left = count + 'px';
        popupBlock.style.transform = 'translateX(0px)';
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

    popup.addEventListener('click', (event) => {
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
      for (let i = 0; i < tabContent.length; i++) {
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

  // Слайдер
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      slider = document.querySelector('.portfolio-content'),
      dotsList = document.querySelector('.portfolio-dots');

    let dot;

    const createDots = () => {
      for (let i = 0; i < slide.length; i++) {
        dot = document.createElement('li');
        dot.classList.add('dot');
        dotsList.appendChild(dot);
      }
    };
    createDots();

    let currentSlide = 0,
      interval;

    dot = document.querySelectorAll('.dot');
    dot[0].classList.add('dot-active');

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') ||
        event.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') ||
        event.target.matches('.dot')) {
        startSlide();
      }
    });

    startSlide(1500);
  };
  slider();

  // Заменяем картинки в блоке "наша команда" с помощью data атрибутов
  const changeImg = () => {
    const commandWrap = document.querySelector('div#command>div.container>div.row');

    let stockSrc;

    commandWrap.addEventListener('mouseover', (event) => {
      let target = event.target;
      if (target.matches('img')) {
        stockSrc = target.src;
        target.src = target.dataset.img;
      }
    });

    commandWrap.addEventListener('mouseout', (event) => {
      let target = event.target;
      if (target.matches('img')) {
        target.src = stockSrc;
      }
    });
  };
  changeImg();

  //Валидация калькулятора
  const calcValidation = () => {
    const calcBlock = document.querySelector('.calc-block');
    calcBlock.addEventListener('input', (event) => {
      let target = event.target;
      if (target.matches('input')) {
        target.value = target.value.replace(/[^0-9]/, '');
      }
    });
  };
  calcValidation();

  // Калькулятор
  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
          calcType = document.querySelector('.calc-type'),
          calcSquare = document.querySelector('.calc-square'),
          calcDay = document.querySelector('.calc-day'),
          calcCount = document.querySelector('.calc-count'),
          totalValue = document.getElementById('total');

    calcBlock.addEventListener('change', (event) => {
      const target = event.target;

      const countSum = () => {
        let total = 0,
            countValue = 1,
            dayValue = 1,
            count = 0,
            totalId,
            totalInterval;
        const typeValue = calcType.options[calcType.selectedIndex].value,
              squareValue = +calcSquare.value;

        if (calcCount.value > 1) {
          countValue += (calcCount.value - 1) / 10;
        }

        if (calcDay.value && calcDay.value < 5) {
          dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10) {
          dayValue *= 1.5;
        }

        if (typeValue && squareValue) {
          total = price * typeValue * squareValue * countValue * dayValue;
        }

        function animate(draw, duration = 1000) {
          let start = performance.now();

          function step(time) {
            let progress = (time - start) / duration;
            if (progress > 1) {
              progress = 1;
            }
            draw(progress);

            if (progress < 1) {
              requestAnimationFrame(step);
            }

          }
          requestAnimationFrame(step);
        }

        function animateRes(start, total) {
          let to = total,
            from = start;
          animate(
            (progress) => { totalValue.textContent = Math.ceil((to - from) * progress + from); }
          );
        }
        animateRes(+totalValue.textContent, Math.ceil(total));
      };
      if (target.matches('select') || target.matches('input')) {
        countSum();
      }
    });
  };
  calc(100);

  // send-ajax-form
  const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
          loadMessage = 'Загрузка...',
          successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem; color: white;';

    const postData = (body) => {
      return fetch('./server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
    };


    let body = document.querySelector('body');

    body.addEventListener('submit', (event) => {
      event.preventDefault();
      let target = event.target;
      if (target.matches('form')) {
        let allInputs = target.querySelectorAll('input');
        for (let i = 0; i < allInputs.length; i++) {
          if (allInputs[i].value === '') {
            return;
          }
        }
        target.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;

        const formData = new FormData(target);
        let body = {};

        formData.forEach((value, key) => {
          body[key] = value;
        });

        postData(body)
          .then((response) => {
            console.log('response: ', response);
            if (response.status !== 200) {
              throw new Error('status network not 200');
            }
            target.reset();
            statusMessage.textContent = successMessage;
          })
          .catch((error) => {
            statusMessage.textContent = errorMessage;
            console.error(error);
          });
      }
    });
  };
  sendForm();

  // Валидация инпутов
  const inputValidation = () => {
    const body = document.querySelector('body');
    body.addEventListener('input', (event) => {
      let target = event.target;
      if (target.matches('input[name="user_phone"]')) {
        target.value = target.value.replace(/[^\+\d]/g, '');
      }
      if (target.matches('input[name="user_name"]') || target.matches('input[name="user_message"]')) {
        target.value = target.value.replace(/[^а-яА-Я,.!?"';: ]/, '');
      }
    });
  };
  inputValidation();
});