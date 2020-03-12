const callbackModal = () => {
  const callbackButton = document.querySelector('.callback-btn'),
        callbackPopup = document.getElementById('callback_form');

  callbackButton.addEventListener('click', () => {
    callbackPopup.style.display = 'flex';
  });

  callbackPopup.addEventListener('click', (event) => {
    let target = event.target;
    if (target.classList.contains('close_icon')) {
      callbackPopup.style.display = 'none';
    } else {
      target = target.closest('.form-wrapper');
      if (!target) {
        callbackPopup.style.display = 'none';
      }
    }
  });
};

export default callbackModal;