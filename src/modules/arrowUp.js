const arrowUp = () => {
  const upArrow = document.getElementById('totop');

  upArrow.style.display = 'none';

  const scrollToNext = () => {

    if (window.pageYOffset >= 15) {
      upArrow.style.display = 'block';
    } else if (window.pageYOffset <= 15) {
      upArrow.style.display = 'none';
    }
  };
  scrollToNext();

  window.addEventListener('scroll', scrollToNext);
};

export default arrowUp;