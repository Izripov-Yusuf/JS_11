// Popup
const togglePopup = () => {
  let popupInterval,
    count = 0,
    userWidth = window.innerWidth;
  const popup = document.querySelector('.popup'),
    popupBtn = document.querySelectorAll('.popup-btn'),
    popupBlock = document.querySelector('.popup-content');

  const popupAnimation = () => {
    popupInterval = requestAnimationFrame(popupAnimation);
    count += 15;
    if (count <= (((document.documentElement.clientWidth - popupBlock.scrollWidth) / 2) + 15)) {
      popupBlock.style.left = count + 'px';
      popupBlock.style.transform = 'translateX(0px)';
    } else {
      cancelAnimationFrame(popupInterval);
      count = 0;
    }
  };

  popupBtn.forEach((elem) => {
    elem.addEventListener('click', () => {
      popup.style.display = 'block';
      popupBlock.style.left = '-20%';
      if (!popup.style.display || popup.style.display === `block` && userWidth >= 768) {
        popupInterval = requestAnimationFrame(popupAnimation);
      } else if (userWidth < 768) {
        cancelAnimationFrame(popupInterval);
        popupBlock.style.left = '30%';
      }
    });
  });

  popup.addEventListener('click', (event) => {
    let target = event.target;
    if (target.classList.contains('popup-close')) {
      popup.style.display = 'none';
    } else {
      target = target.closest('.popup-content');
      if (!target) {
        popup.style.display = 'none';
      }
    }
  });
};
export default togglePopup;