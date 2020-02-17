window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  let date = new Date(),
    weekday = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    day = date.getDate(),
    year = date.getFullYear(),
    hours = date.getHours(),
    //hours = Math.floor(date.getHours() / 2),
    minutes = date.getMinutes(),
    seconds = date.getSeconds(),
    fullTime = date.toLocaleTimeString('en'),
    timerHours = document.querySelector('#timer-hours'),
    timerMinutes = document.querySelector('#timer-minutes'),
    timerSeconds = document.querySelector('#timer-seconds'),
    toDay = Date.now();
    let newYear = (Date.parse('1 january 2021')) - toDay;
    let daysForNewYear = Math.floor(newYear / 60 / 60 / 24 / 1000 + 1);
    console.log(hours);

  function num3str(n, textForms) {
    n = Math.abs(n) % 100;
    let n1 = n % 10;
    if (n > 10 && n < 20) {
      return textForms[2];
    }
    if (n1 > 1 && n1 < 5) {
      return textForms[0];
    }
    if (n1 === 1) {
      return textForms[1];
    }
    return textForms[2];
  }

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  function checkHours() {
    let goodDay = '';
    if (hours > 4 && hours <= 11) {
      goodDay = 'утро';
    } else if (hours >= 12 && hours <= 16) {
      goodDay = 'день';
    } else if (hours >= 17 && hours <= 20) {
      goodDay = 'вечер';
    } else if (hours > 20 || hours <= 3) {
      goodDay = 'ночи';
    }
    return goodDay;
  }
  let goodDay2 = checkHours();
  console.log('goodDay2: ', goodDay2);
  function checkHoursDay() {
    let dayHi = '';
    if (goodDay2 === 'утро') {
      dayHi = 'Доброе';
    } else if (goodDay2 === 'день' || goodDay2 === 'вечер') {
      dayHi = 'Добрый';
    } else if (goodDay2 === 'ночи') {
      dayHi = 'Доброй';
    }
    return dayHi;
  }
  let dayHi2 = checkHoursDay();
  console.log('dayHi2: ', dayHi2);

  //document.write('Сегодня ' + `${weekday[date.getDay()]},<br> ` + `${day} ` + month[date.getMonth()] + ` ${year} года, ` + `${checkTime(hours)} ${num3str(checkTime(hours), ['часа', 'час', 'часов'])} ` + `${checkTime(minutes)} ${num3str(checkTime(minutes), ['минуты', 'минута', 'минут'])} ` + `${checkTime(seconds)} ${num3str(checkTime(seconds), ['секунды', 'секунда', 'секунд'])}`);
  document.write(`${`${dayHi2} ` + goodDay2}<br>` +
  'Сегодня: ' + `${weekday[date.getDay()]}<br>` +
  'Текущее время: ' + `${fullTime}<br>` +
  'До нового года осталось ' + daysForNewYear + ' дней');
  
});