const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...',
    loadMessage = 'Загрузка...',
    successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = 'font-size: 2rem; color: white;';

  const postData = (body) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  };


  let body = document.querySelector('body');

  body.addEventListener('submit', (event) => {
    event.preventDefault();
    let target = event.target;
    if (target.matches('form')) {
      let allInputs = target.querySelectorAll('input');
      for (let i = 0; i < allInputs.length; i++) {
        if (allInputs[i].value === '') {
          return;
        }
      }
      const checkInput = target.querySelector('input[type="checkbox"]'),
            submitButton = target.querySelector('button');
      if (checkInput.checked === false) {
        alert('Поставьте галочку, что вы согласны на обработку персональных данных');
        submitButton.disabled = true;
      } else if (checkInput.checked === true) {
        submitButton.disabled = false;
      }
      target.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;

      let body = {};

      postData(body)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('status network not 200');
          }
          target.reset();
          statusMessage.textContent = successMessage;
        })
        .catch((error) => {
          statusMessage.textContent = errorMessage;
          console.error(error);
        });
    }
  });
};

export default sendForm;