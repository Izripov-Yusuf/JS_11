const calc = () => {
  const time = document.querySelector('.time'),
  promocode = document.getElementById('promocode'),
  inputMozaika = document.getElementById('card_leto_mozaika'),
  inputSchelkovo = document.getElementById('card_leto_schelkovo'),
  club = document.querySelectorAll('.club');

  let priceTotal = document.getElementById('price-total');

  if (time) {
    const sale = () => {
      promocode.addEventListener('change', () => {
        if (promocode.value === 'ТЕЛО2020') {
          priceTotal.textContent = priceTotal.textContent - Math.ceil(((priceTotal.textContent / 100) * 30));
        }
      });
    };

    const check = () => {
      if (inputMozaika.checked) {
        priceTotal.textContent = 1999;
        let firstInput = time.querySelector('input');
        firstInput.checked = true;
        time.addEventListener('change', (event) => {
          let target = event.target;
          if (+target.value === 6) {
            priceTotal.textContent = 9900;
          } else if (+target.value === 9) {
            priceTotal.textContent = 14900;
          } else if (+target.value === 12) {
            priceTotal.textContent = 19900;
          } else if (+target.value === 1) {
            priceTotal.textContent = 1999;
          }
        });
        sale();
      } else if (inputSchelkovo.checked) {
        priceTotal.textContent = 2999;
        let firstInput = time.querySelector('input');
        firstInput.checked = true;
        time.addEventListener('change', (event) => {
          let target = event.target;
          if (+target.value === 6) {
            priceTotal.textContent = 14990;
          } else if (+target.value === 9) {
            priceTotal.textContent = 21990;
          } else if (+target.value === 12) {
            priceTotal.textContent = 24990;
          } else if (+target.value === 1) {
            priceTotal.textContent = 2999;
          }
        });
        sale();
      }
    };
    check();

    club.forEach((elem) => {
      elem.addEventListener('change', check);
    });
  }
};

export default calc;