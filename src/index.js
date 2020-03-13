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