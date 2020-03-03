// Заменяем картинки в блоке "наша команда" с помощью data атрибутов
const changeImg = () => {
  const commandWrap = document.querySelector('div#command>div.container>div.row');

  let stockSrc;

  commandWrap.addEventListener('mouseover', (event) => {
    let target = event.target;
    if (target.matches('img')) {
      stockSrc = target.src;
      target.src = target.dataset.img;
    }
  });

  commandWrap.addEventListener('mouseout', (event) => {
    let target = event.target;
    if (target.matches('img')) {
      target.src = stockSrc;
    }
  });
};
export default changeImg;