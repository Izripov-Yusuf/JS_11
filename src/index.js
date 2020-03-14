'use strict';
import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();
import burgerMenu from './modules/burgerMenu';
import dropdownClub from './modules/dropdownClub';
import freeVisitModal from './modules/freeVisitModal';
import callbackModal from './modules/callbackModal';
import sendForm from './modules/sendForm';
import giftModal from './modules/giftModal';
import mainSlider from './modules/mainSlider';
import photoGallery from './modules/photoGallery';
import arrowUp from './modules/arrowUp';
import calc from './modules/calc';
import maskPhone from './modules/maskPhone';

// Бургер меню
burgerMenu();
// Выпадающее меню
dropdownClub();
// Модальное окно бесплатный визит
freeVisitModal();
// Модальное окно перезвона
callbackModal();
// Отправка данных из модальных форм
sendForm();
// Модальное окно подарка
giftModal();
// Главный слайдер
mainSlider();
// Фотогалерея
photoGallery();
// Появление стрелки вверх
arrowUp();
// Калькулятор
calc();
// Маска телефона
maskPhone();

import SliderCarousel from './modules/SliderCarousel';
const carousel = new SliderCarousel({
  main: '#wrapper',
  wrap: '.services-slider',
  prev: '.prev',
  next: '.next',
  slidesToShow: 5,
  infinity: true,
  responsive: [{
      breackpoint: 1024,
      slideToShow: 3,
    },
    {
      breackpoint: 768,
      slideToShow: 2,
    },
    {
      breackpoint: 576,
      slideToShow: 1,
    },
  ]
});

carousel.init();