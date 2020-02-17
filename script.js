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
      if (i < 10 && i > 0) {
        i = "0" + i;
      }
      if (i < 0) {
        i = "0" + 0;
      }
      return i;
    }

    function updateClock() {
      let timer = getTimeRemaining();

      timerHours.textContent = `${checkTime(timer.hours)}`;
      timerMinutes.textContent = `${checkTime(timer.minutes)}`;
      timerSeconds.textContent = `${checkTime(timer.seconds)}`;

    }
    setInterval(updateClock, 1000);
    updateClock();
  }

  countTimer('18 february 2020');
});