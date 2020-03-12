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
import freeVisit from './modules/freeVisit';


// Бургер меню
burgerMenu();
// Выпадающее меню
dropdownClub();
// Модальное окно бесплатный визит
freeVisit();