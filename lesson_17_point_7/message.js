let dayMas = ['Понедельник,', 'Вторник,', 'Среда,', 'Четверг,', 'Пятница,', 'Суббота,'.italics(), 'Воскресенье,'.italics()];

let day, year, hour, minutes, seconds, greeting;

function getDayRamaining() {
    day = new Date().getDay(),

    year = new Date().getFullYear(),
    hour = new Date().getHours(),
    minutes = new Date().getMinutes(),
    seconds = new Date().getSeconds();
    dateNow = new Date().getTime();

    let dateStop = new Date('1 january 2021').getTime();

    console.log(year, dateNow)
    let diff = +dateStop - +dateNow;
    let days = Math.floor(diff / 60 / 60 / 24 /1000 + 1);
    console.log(days);
    if(hour <= 11 && hour > 6){ 
      greeting = 'Доброе утро';
    } else if (hour >=12 && hour < 17) {
      greeting = 'Добрый день';
    } else if(hour >= 17 && hour < 22) {
      greeting = 'Добрый вечер';
    } else if(hour >= 22 && hour < 6) {
      greeting = 'Доброй ночи';
    }
    if(day === 0) {
      day = 6;
    }
    else if(day > 0) {
      day = day - 1;
    }
    return {day, year, hour, minutes, seconds, dateNow, greeting, days}
}
timer = getDayRamaining();
document.querySelector('.greetings').textContent = timer.greeting;
document.querySelector('.today').textContent = dayMas[timer.day];
document.querySelector('.time').textContent = addZero(timer.hour) + ':' + addZero(timer.minutes) + ':' + addZero(timer.seconds) + ' PM';
document.querySelector('.year').textContent = timer.days;

function updateClock() {
  timer = getDayRamaining();
  document.querySelector('.greetings').textContent = timer.greeting;
  document.querySelector('.today').textContent = dayMas[timer.day];
  document.querySelector('.time').textContent = addZero(timer.hour) + ':' + addZero(timer.minutes) + ':' + addZero(timer.seconds) + ' PM';
  document.querySelector('.year').textContent = timer.days;

}

setInterval(updateClock, 1000);

function addZero (num) {
  if(num >= 0 && num < 10) {
    String(num);
    let zero = '0';
    zero += num;
    num = zero;
    return num;
  }
  return num;
}


