const photoGallery = () => {
  const slidesWrap = document.querySelector('.gallery-slider'),
        slides = slidesWrap.querySelectorAll('.slide'),
        dotsList = slidesWrap.querySelector('.gallery-dots');

  let dot;

  const createDots = () => {
    for (let i = 0; i < slides.length; i++) {
      dot = document.createElement('li');
      dot.classList.add('dot');
      dotsList.appendChild(dot);
    }
  };
  createDots();

  let currentSlide = 0,
    interval;

  dot = document.querySelectorAll('.dot');
  dot[0].classList.add('dot-active');

  const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };

  const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };

  const autoPlaySlide = () => {
    prevSlide(slides, currentSlide, 'slide-active');
    prevSlide(dot, currentSlide, 'dot-active');
    currentSlide++;
    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }
    nextSlide(slides, currentSlide, 'slide-active');
    nextSlide(dot, currentSlide, 'dot-active');
  };

  const startSlide = (time = 3000) => {
    interval = setInterval(autoPlaySlide, time);
  };

  const stopSlide = () => {
    clearInterval(interval);
  };

  slidesWrap.addEventListener('click', (event) => {
    event.preventDefault();
    let target = event.target;

    if (!target.matches('.gallery-btn, .dot')) {
      return;
    }

    prevSlide(slides, currentSlide, 'slide-active');
    prevSlide(dot, currentSlide, 'dot-active');

    if (target.matches('#arrow-right')) {
      currentSlide++;
    } else if (target.matches('#arrow-left')) {
      currentSlide--;
    } else if (target.matches('.dot')) {
      dot.forEach((elem, index) => {
        if (elem === target) {
          currentSlide = index;
        }
      });
    }

    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }

    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }
    nextSlide(slides, currentSlide, 'slide-active');
    nextSlide(dot, currentSlide, 'dot-active');
  });

  slidesWrap.addEventListener('mouseover', (event) => {
    if (event.target.matches('.gallery-btn') ||
      event.target.matches('.dot')) {
      stopSlide();
    }
  });

  slidesWrap.addEventListener('mouseout', (event) => {
    if (event.target.matches('.gallery-btn') ||
      event.target.matches('.dot')) {
      startSlide();
    }
  });

  startSlide(2000);
};

export default photoGallery;