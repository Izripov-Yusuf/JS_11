const arrowUp = () => {
  const upArrow = document.getElementById('totop'),
        nextBlock = document.getElementById('next-block');

  if (nextBlock) {
    upArrow.style.display = 'none';

    const scrollToNext = () => {
      let nextBlockTop = Math.ceil(nextBlock.getBoundingClientRect().top);

      if (nextBlockTop <= 0) {
        upArrow.style.display = 'block';
      } else if (nextBlockTop > 0) {
        upArrow.style.display = 'none';
      }
    };
    scrollToNext();

    window.addEventListener('scroll', scrollToNext);
  }
};

export default arrowUp;