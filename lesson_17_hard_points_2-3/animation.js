window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  let startAnimation = document.querySelector('#start'),
      stopAnimation = document.querySelector('#stop'),
      circle = document.querySelector('#circle'),
      count = 50;

  let bigInterval;

  let bigAnimation = function () {
    bigInterval = requestAnimationFrame(bigAnimation);
    count++;
    if (count < 500) {
      circle.style.width = count + 'px';
      circle.style.height = count + 'px';
    } else{
      cancelAnimationFrame(bigInterval);
    }
  };
  let animation = false;
  startAnimation.addEventListener('click', function () {
    if (animation) {
      startAnimation.value = 'Остановить';
      bigInterval = requestAnimationFrame(bigAnimation);
      animation = false;
    } else {
      startAnimation.value = 'Начать';
      animation = true;
      cancelAnimationFrame(bigInterval);
    }
  });

  stopAnimation.addEventListener('click', function () {
    cancelAnimationFrame(bigInterval);
    count = 50;
    circle.style.width = count + 'px';
    circle.style.height = count + 'px';
  });
});