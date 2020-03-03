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
          (progress) => {
            totalValue.textContent = Math.ceil((to - from) * progress + from);
          }
        );
      }
      animateRes(+totalValue.textContent, Math.ceil(total));
    };
    if (target.matches('select') || target.matches('input')) {
      countSum();
    }
  });
};

export default calc;