const giftModal = () => {
  const giftImg = document.querySelector('.fixed-gift'),
        giftModal = document.getElementById('gift');

  if (giftImg) {
    giftImg.addEventListener('click', () => {
      giftModal.style.display = 'flex';
      giftImg.style.display = 'none';
    });

    giftModal.addEventListener('click', (event) => {
      let target = event.target;
      if (target.classList.contains('close_icon')) {
        giftModal.style.display = 'none';
      } else if (target.classList.contains('close-btn')) {
        giftModal.style.display = 'none';
      } else {
        target = target.closest('.form-wrapper');
        if (!target) {
          giftModal.style.display = 'none';
        }
      }
    });
  }
};

export default giftModal;