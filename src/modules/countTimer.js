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
export default countTimer;