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
import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import smoothScrollToBlock from './modules/smoothScrollToBlock';
import getNextScreen from './modules/getNextScreen';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changeImg from './modules/changeImg';
import calcValidation from './modules/calcValidation';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import inputValidation from './modules/inputValidation';

// Таймер
setInterval(countTimer, 1000, '19 february 2020');
countTimer('19 february 2020');
// Меню
toggleMenu();
// Плавное перемещение по якорям
smoothScrollToBlock();
// Кнопка перехода к следующему слайду
getNextScreen();
// Popup
togglePopup();
// Табы
tabs();
// Слайдер
slider();
// Заменяем картинки в блоке "наша команда" с помощью data атрибутов
changeImg();
//Валидация калькулятора
calcValidation();
// Калькулятор
calc();
// send-ajax-form
sendForm();
// Валидация инпутов
inputValidation();